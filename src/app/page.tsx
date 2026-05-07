"use client";

import { useState, useEffect } from "react";
import { 
  Activity, 
  BarChart2, 
  Settings, 
  TrendingUp,
  Zap,
  RefreshCw,
  Terminal,
  Filter
} from "lucide-react";
import { runTorqueOptimization, CampaignData } from "@/lib/torque";

export default function Home() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "[10:00:00] Initialized Torque MCP integration",
    "[10:00:05] Analyzing campaign 'Spring DeFi Push'",
  ]);

  const [campaigns, setCampaigns] = useState<CampaignData[]>([
    { id: 1, name: "Spring DeFi Push", status: "Active", budget: "$1,200", cac: "$4.50", roi: "+12%" },
    { id: 2, name: "Referral V2", status: "Optimizing", budget: "$800", cac: "$6.20", roi: "-2%" },
    { id: 3, name: "Retargeting Alpha", status: "Paused", budget: "$500", cac: "$12.00", roi: "-15%" },
  ]);

  const handleOptimize = async () => {
    if (isOptimizing) return;
    setIsOptimizing(true);
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Optimization triggered... Connecting to Torque MCP.`]);
    
    const result = await runTorqueOptimization(campaigns);
    setLogs((prev) => [...prev, ...result.logs]);
    setCampaigns(result.updatedCampaigns);
    
    setIsOptimizing(false);
  };

  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-border bg-surface/50 px-6 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-500 text-white">
            <Zap className="h-5 w-5" />
          </div>
          <span className="font-mono text-xl font-bold tracking-tight text-white">Agemo</span>
          <span className="rounded-full bg-primary-500/10 px-2 py-0.5 text-xs font-medium text-primary-400">Torque MCP</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Torque Connected
          </div>
          <button className="rounded-md p-2 hover:bg-surface-hover">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden p-6 gap-6">
        
        {/* Left Column: Campaigns & Funnel */}
        <div className="flex flex-col flex-1 gap-6 overflow-y-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-sm font-medium">Total Active Spend</span>
                <Activity className="h-4 w-4 text-primary-400" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">$2,000</div>
              <div className="text-xs text-green-400 mt-1">+14% vs last week</div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-sm font-medium">Blended CAC</span>
                <Filter className="h-4 w-4 text-primary-400" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">$5.35</div>
              <div className="text-xs text-red-400 mt-1">+$0.40 vs target</div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-sm font-medium">Torque ROI</span>
                <TrendingUp className="h-4 w-4 text-primary-400" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">+18.5%</div>
              <div className="text-xs text-green-400 mt-1">AI-driven alpha</div>
            </div>
          </div>

          {/* Campaign Manager */}
          <div className="rounded-xl border border-border bg-surface flex-1 flex flex-col min-h-[300px]">
            <div className="border-b border-border p-4 flex justify-between items-center">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-primary-400" />
                Campaign Manager
              </h2>
              <button 
                onClick={handleOptimize}
                disabled={isOptimizing}
                className="flex items-center gap-2 rounded-md bg-primary-500 hover:bg-primary-600 px-3 py-1.5 text-sm font-medium text-white transition-colors disabled:opacity-50"
              >
                {isOptimizing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                Run Torque Optimization
              </button>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-surface-hover text-xs uppercase text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Campaign</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Budget</th>
                    <th className="px-4 py-3">CAC</th>
                    <th className="px-4 py-3">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((camp) => (
                    <tr key={camp.id} className="border-b border-border hover:bg-surface-hover/50 transition-colors">
                      <td className="px-4 py-4 font-medium text-white">{camp.name}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
                          ${camp.status === 'Active' ? 'bg-green-500/10 text-green-400' : 
                            camp.status === 'Optimizing' ? 'bg-primary-500/10 text-primary-400 animate-pulse' : 
                            'bg-slate-500/10 text-slate-400'}
                        `}>
                          {camp.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-mono">{camp.budget}</td>
                      <td className="px-4 py-4 font-mono">{camp.cac}</td>
                      <td className={`px-4 py-4 font-mono ${camp.roi.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {camp.roi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: AI Decision Log */}
        <div className="w-96 flex flex-col rounded-xl border border-border bg-surface overflow-hidden">
          <div className="border-b border-border p-4 bg-surface-hover">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary-400" />
              Torque Decision Log
            </h2>
            <p className="text-xs text-slate-400 mt-1">Autonomous MCP execution trail</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-slate-300 space-y-2">
            {logs.map((log, i) => (
              <div key={i} className={`${log.includes('Torque Agent') ? 'text-primary-400' : log.includes('complete') ? 'text-green-400' : ''}`}>
                {log}
              </div>
            ))}
            {isOptimizing && (
              <div className="flex items-center gap-2 text-primary-400">
                <RefreshCw className="h-3 w-3 animate-spin" />
                <span>Torque MCP analyzing on-chain behavior...</span>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
