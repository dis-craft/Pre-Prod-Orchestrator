'use client';

import React,{useEffect,useState,use} from 'react';
import Link from 'next/link';
import {AppShell} from '../../../components/layout/AppShell';
import {orchestratorService} from '../../../lib/services/orchestrator';
import {PullRequest} from '../../../lib/types';
import {StatusBadge} from '../../../components/ui/StatusBadge';
import {ArrowLeft,ExternalLink,ShieldCheck} from 'lucide-react';

export default function PRDetailPage({params}:{params:Promise<{prId:string}>}){
 const resolvedParams=use(params); const [pr,setPR]=useState<PullRequest|null>(null);
 useEffect(()=>{orchestratorService.getPullRequestById(resolvedParams.prId).then(p=>{if(p)setPR(p);});},[resolvedParams.prId]);
 if(!pr)return <AppShell><div className="py-12 text-center text-gray-400 font-mono text-xs">Loading pull request details #{resolvedParams.prId}...</div></AppShell>;
 return <AppShell><div className="space-y-4 sm:space-y-5 max-w-full">
  <Link href="/pull-requests" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 font-mono"><ArrowLeft className="w-3.5 h-3.5"/><span>Back to Pull Requests</span></Link>
  <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
   <div><div className="flex flex-wrap items-center gap-2 font-mono text-xs"><span className="font-bold text-gray-100">#{pr.number}</span><StatusBadge status={pr.status} type="pr"/><span className="text-gray-400">Repo: {pr.repository}</span></div>
    <h1 className="text-base sm:text-lg font-bold text-gray-100 font-sans mt-1.5">{pr.title}</h1>
    <p className="text-xs text-gray-400 font-mono mt-0.5">Branch: <span className="text-gray-200 font-semibold">{pr.branch}</span> → <span className="text-gray-300">{pr.targetBranch}</span></p>
   </div>
   <a href={pr.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-200 border border-[#30363d] text-xs font-semibold shrink-0"><ExternalLink className="w-3.5 h-3.5"/><span>Open GitHub PR #{pr.number}</span></a>
  </div>
  <div className="bg-[#161b22] border border-[#30363d] rounded p-3.5 sm:p-4 space-y-3">
   <div className="flex items-center gap-2 border-b border-[#30363d] pb-2.5"><ShieldCheck className="w-4 h-4 text-emerald-400"/><h2 className="text-sm font-semibold text-gray-200">Live GitHub PR</h2></div>
   <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
    <div className="bg-[#0d1117] p-2.5 rounded border border-[#30363d]"><span className="text-gray-500 text-[10px] block">STATUS</span><span className="text-gray-200 font-bold">{pr.status}</span></div>
    <div className="bg-[#0d1117] p-2.5 rounded border border-[#30363d]"><span className="text-gray-500 text-[10px] block">BRANCH</span><span className="text-gray-200 font-bold break-all">{pr.branch}</span></div>
    <div className="bg-[#0d1117] p-2.5 rounded border border-[#30363d]"><span className="text-gray-500 text-[10px] block">UPDATED</span><span className="text-gray-200 font-bold">{pr.updatedAt}</span></div>
   </div>
  </div>
 </div></AppShell>;
}