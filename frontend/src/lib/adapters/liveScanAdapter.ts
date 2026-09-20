import { Finding, Remediation, Validation, PullRequest, AuditEvent, Repository, DashboardMetrics } from '../types';
import { IOrchestratorAdapter } from './adapterInterface';

type ScanPayload={scan?:{id?:string;captured_at?:string;workflow_run_id?:string;workflow_url?:string;trigger?:string};repository?:{full_name?:string;default_branch?:string};commit?:{before?:string;after?:string;branch?:string;message?:string};change_summary?:{files_changed?:number;additions?:number;deletions?:number};security_engine?:{status?:string;scanner?:string;findings?:Array<Record<string,unknown>>}};
const DEFAULT_URL='https://dis-craft.github.io/Pre-prod-tester/data/latest.json';

async function fetchScan():Promise<ScanPayload>{const r=await fetch(process.env.NEXT_PUBLIC_SCAN_DATA_URL||DEFAULT_URL,{cache:'no-store'});if(!r.ok)throw new Error(`Live scan fetch failed: HTTP ${r.status}`);return r.json();}
type PublishedPR={number:number;title?:string;state?:string;merged?:boolean;head?:string;base?:string;url?:string;created_at?:string;updated_at?:string};
async function fetchPublishedPRs():Promise<PublishedPR[]>{
  try{
    const base=(process.env.NEXT_PUBLIC_SCAN_DATA_URL||DEFAULT_URL).replace(/\/data\/latest\.json$/,'');
    const r=await fetch(`${base}/data/pull-requests.json`,{cache:'no-store'});
    if(r.ok){
      const data=await r.json();
      if(Array.isArray(data))return data;
    }
  }catch{
    // Ignore and fallback
  }

  try{
    const r=await fetch('https://api.github.com/repos/dis-craft/Pre-prod-tester/pulls?state=all&per_page=30&sort=updated&direction=desc',{
      cache:'no-store',
      headers:{Accept:'application/vnd.github+json'}
    });
    if(r.ok){
      const prs=await r.json();
      if(Array.isArray(prs)){
        return prs.map((p:Record<string,unknown>)=>({
          number:Number(p.number),
          title:String(p.title||''),
          state:String(p.state||'open'),
          merged:Boolean(p.merged_at),
          head:String((p.head as Record<string,unknown>|undefined)?.ref||''),
          base:String((p.base as Record<string,unknown>|undefined)?.ref||'main'),
          url:String(p.html_url||''),
          created_at:String(p.created_at||''),
          updated_at:String(p.updated_at||'')
        }));
      }
    }
  }catch{
    // Fallback to empty array
  }

  return [];
}
function mapFinding(raw:Record<string,unknown>,s:ScanPayload):Finding{const line=Number(raw.line??1),confidence=Number(raw.confidence??0),severity=String(raw.severity??'INFO').toUpperCase() as Finding['severity'],location=String(raw.location_detail??'');return{id:String(raw.id??`${raw.rule}-${raw.file}-${line}`),repository:s.repository?.full_name||'dis-craft/Pre-prod-tester',pullRequest:'',commitSha:s.commit?.after||'',tool:String(raw.tool??'rule_engine'),ruleId:String(raw.rule??''),title:String(raw.rule??raw.message??'Security finding'),message:String(raw.message??''),severity,confidence:confidence<=1?Math.round(confidence*100):confidence,file:String(raw.file??''),startLine:line,endLine:Number(raw.end_line??line),cwe:raw.cwe?`CWE-${raw.cwe}`:'CWE-Other',owasp:String(raw.category??''),introducedByPR:'',fixability:['AUTO','AI_ASSISTED'].includes(String(raw.fixability??'').toUpperCase())?'AUTO_REMEDIABLE':'REQUIRES_HUMAN_TRIAGE',status:'OPEN',evidence:{snippet:location,vulnerableLine:location.split('\n').pop()||String(raw.message??''),contextBefore:[],contextAfter:[],explanation:String(raw.what_and_why??raw.message??'')}};}
class LiveScanAdapter implements IOrchestratorAdapter{
 private listeners=new Set<()=>void>();
 subscribe(l:()=>void){this.listeners.add(l);return()=>this.listeners.delete(l);}
 private async payload(){return fetchScan();}
 async getFindings(){const s=await this.payload();return(s.security_engine?.findings||[]).map(f=>mapFinding(f,s));}
 async getFindingById(id:string){return(await this.getFindings()).find(f=>f.id===id);}
 async getMetrics():Promise<DashboardMetrics>{const f=await this.getFindings(),p=await this.getPullRequests();return{openFindings:f.length,criticalCount:f.filter(x=>x.severity==='CRITICAL').length,highCount:f.filter(x=>x.severity==='HIGH').length,fixCandidates:f.filter(x=>x.fixability==='AUTO_REMEDIABLE').length,validationPassRate:0,remediationPRs:p.filter(x=>x.status==='OPEN').length};}
 async getRepositories():Promise<Repository[]>{const s=await this.payload(),f=await this.getFindings(),repo=s.repository?.full_name||'dis-craft/Pre-prod-tester',[owner,...rest]=repo.split('/');return[{id:repo,name:rest.join('/')||repo,owner,defaultBranch:s.repository?.default_branch||'main',securityStatus:f.some(x=>['CRITICAL','HIGH'].includes(x.severity))?'CRITICAL_RISK':f.length?'NEEDS_ATTENTION':'COMPLIANT',openFindingsCount:f.length,criticalCount:f.filter(x=>x.severity==='CRITICAL').length,highCount:f.filter(x=>x.severity==='HIGH').length,mediumCount:f.filter(x=>x.severity==='MEDIUM').length,lowCount:f.filter(x=>x.severity==='LOW').length,lastScanAt:s.scan?.captured_at||new Date().toISOString(),policy:'Pre-Prod Security Policy'}];}
 async getRepositoryByName(name:string){return(await this.getRepositories()).find(r=>`${r.owner}/${r.name}`===name);}
 async getAuditEvents():Promise<AuditEvent[]>{const s=await this.payload();return[{id:s.scan?.id||'latest-scan',timestamp:s.scan?.captured_at||new Date().toISOString(),actor:'GitHub Actions',component:'SCANNER',action:'LIVE SECURITY SCAN',status:s.security_engine?.status==='FAILED'?'FAILURE':'SUCCESS',evidence:{repository:s.repository?.full_name,commit:s.commit?.after,workflowRun:s.scan?.workflow_run_id,workflowUrl:s.scan?.workflow_url,scanner:s.security_engine?.scanner,trigger:s.scan?.trigger,filesChanged:s.change_summary?.files_changed,additions:s.change_summary?.additions,deletions:s.change_summary?.deletions}}];}
 async getPullRequests():Promise<PullRequest[]>{const s=await this.payload(),repo=s.repository?.full_name||'dis-craft/Pre-prod-tester',prs=await fetchPublishedPRs();return prs.map(p=>({id:String(p.number),number:p.number,title:String(p.title||''),repository:repo,branch:String(p.head||''),targetBranch:String(p.base||'main'),originalPR:`#${p.number}`,remediationId:'',findingId:'',status:p.merged?'MERGED':p.state==='closed'?'CLOSED':'OPEN',validationStatus:'pending',url:String(p.url||''),createdAt:String(p.created_at||''),updatedAt:String(p.updated_at||'')}));}
 async getPullRequestById(id:string){return(await this.getPullRequests()).find(p=>p.id===id||String(p.number)===id);}
 async getRemediationByFindingId(_id:string):Promise<Remediation|undefined>{return undefined;}
 async getRemediationById(_id:string):Promise<Remediation|undefined>{return undefined;}
 async getValidationByRemediationId(_id:string):Promise<Validation|undefined>{return undefined;}
 async getValidationById(_id:string):Promise<Validation|undefined>{return undefined;}
 async startRemediation(_id:string):Promise<Remediation>{throw new Error('Remediation is executed by GitHub Actions.');}
 async runValidation(_id:string):Promise<Validation>{throw new Error('Validation is executed by GitHub Actions.');}
 async resetState():Promise<void>{}
}
export const liveScanAdapter=new LiveScanAdapter();