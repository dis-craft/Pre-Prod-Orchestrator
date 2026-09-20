#!/usr/bin/env python3
from __future__ import annotations
import argparse,json,os,subprocess,sys,tempfile,shutil
from pathlib import Path
from remediation.sandbox_validate import validate as sandbox_validate

def rescan(repo):
 out=Path(tempfile.mkdtemp(prefix='preprod-rescan-'))
 try:
  r=subprocess.run([sys.executable,'-m','scanner','--repo',str(repo),'--model','none','--format','json','--output',str(out),'--quiet'],cwd=repo,text=True,capture_output=True)
  if r.returncode>1: return False,'scanner-error'
  p=out/'findings.json'
  if not p.exists(): return False,'no-report'
  d=json.loads(p.read_text()); xs=d.get('findings',d) if isinstance(d,dict) else d
  blocking=[x for x in xs if str(x.get('severity','')).upper() in ('HIGH','CRITICAL')]
  return blocking
 finally: shutil.rmtree(out,ignore_errors=True)

def main():
 p=argparse.ArgumentParser()
 p.add_argument('--repo',required=True); p.add_argument('--findings',required=True); p.add_argument('--output',required=True)
 p.add_argument('--primary-model',default='gemini-3.5-flash-lite'); p.add_argument('--fallback-model',default='grok-4.6')
 p.add_argument('--primary-attempts',type=int,default=3); p.add_argument('--fallback-attempts',type=int,default=2)
 a=p.parse_args(); repo=Path(a.repo).resolve(); findings=Path(a.findings); out=Path(a.output)
 base=subprocess.check_output(['git','rev-parse','HEAD'],cwd=repo,text=True).strip()
 data=json.loads(findings.read_text()); fs=data.get('findings',data) if isinstance(data,dict) else data
 fs=[x for x in fs if str(x.get('severity','')).upper() in ('HIGH','CRITICAL')]
 if not fs:
  out.parent.mkdir(parents=True,exist_ok=True); out.write_text(json.dumps({'status':'NO_FINDINGS','findings':0,'fixed':0,'source_commit':base,'attempts':[]},indent=2)+'\\n'); return 0
 attempts=[]; success=False
 providers=[('gemini',a.primary_model,a.primary_attempts)]
 if os.environ.get('XAI_API_KEY'): providers.append(('xai',a.fallback_model,a.fallback_attempts))
 for provider,model,count in providers:
  for n in range(1,max(0,count)+1):
   subprocess.run(['git','reset','--hard',base],cwd=repo,check=True,stdout=subprocess.DEVNULL)
   env=os.environ.copy(); env['REMEDIATION_PROVIDER']=provider
   tmp=repo/'.preprod'/'attempt-result.json'; tmp.parent.mkdir(exist_ok=True)
   cmd=[sys.executable,'-m','remediation.ci_entrypoint','--repo',str(repo),'--findings',str(findings),'--output',str(tmp),'--model',model,'--context-window','60']
   r=subprocess.run(cmd,cwd=repo,env=env,text=True,capture_output=True)
   fixed=0
   if tmp.exists():
    try: fixed=json.loads(tmp.read_text()).get('fixed',0)
    except Exception: pass
   attempts.append({'provider':provider,'model':model,'attempt':n,'status':'APPLIED' if fixed else 'FAILED','error':r.stderr[-2000:] if r.returncode not in (0,2) else ''})
   if fixed:
    remaining=rescan(repo)
    base_keys={(str(x.get('rule','')),str(x.get('file',''))) for x in fs}
    unresolved=[x for x in remaining if (str(x.get('rule','')),str(x.get('file',''))) in base_keys]
    new_findings=[x for x in remaining if (str(x.get('rule','')),str(x.get('file',''))) not in base_keys]
    passed=(not unresolved and not new_findings)
    files=subprocess.check_output(['git','diff','--name-only',base],cwd=repo,text=True).splitlines()
    sandbox=sandbox_validate(str(repo),files)
    attempts[-1]['sandbox']=sandbox
    attempts[-1]['rescan_passed']=passed
    attempts[-1]['remaining']=unresolved
    attempts[-1]['new_findings']=new_findings
    if passed and sandbox.get('passed'):
     success=True; break
  if success: break
 if not success: subprocess.run(['git','reset','--hard',base],cwd=repo,check=True); subprocess.run(['git','clean','-fd','-e','.preprod','-e','data'],cwd=repo,check=True)
 result={'status':'APPLIED' if success else 'FAILED','findings':len(fs),'fixed':len(fs) if success else 0,'source_commit':base,'attempts':attempts}
 out.parent.mkdir(parents=True,exist_ok=True); out.write_text(json.dumps(result,indent=2)+'\n')
 return 0 if success else 2
if __name__=='__main__': raise SystemExit(main())