"use client";

import { useState } from "react";
import { 
  Activity, 
  Filter, 
  TrendingUp,
  Zap,
  RefreshCw,
  Terminal,
  BarChart2,
  Users,
  Target,
} from "lucide-react";
import { runTorqueOptimization, SEED_CAMPAIGNS, SEED_FUNNEL, type CampaignData, type AIDecision } from "@/lib/torque";
import { ParticleBackground } from "@/components/ParticleBackground";
import { LoopVisualization } from "@/components/LoopVisualization";
import { FunnelVisualization } from "@/components/FunnelVisualization";

export default function Home() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [logs, setLogs] = useState<string[]>(() => [
    "[10:00:00] Initialized Torque MCP integration",
    "[10:00:05] Loaded 3 campaigns from Solana",
    "[10:00:08] Agent ready. Awaiting optimization trigger.",
  ]);

  const [campaigns, setCampaigns] = useState<CampaignData[]>(() => SEED_CAMPAIGNS);
  const [decisions, setDecisions] = useState<AIDecision[]>(() => []);
  const [optimizationCount, setOptimizationCount] = useState(0);

  const handleOptimize = async () => {
    if (isOptimizing) return;
    setIsOptimizing(true);
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ⚡ Optimization cycle #${optimizationCount + 1} triggered...`]);
    
    const result = await runTorqueOptimization(campaigns);
    setLogs((prev) => [...prev, ...result.logs]);
    setCampaigns(result.updatedCampaigns);
    setDecisions((prev) => [...prev, ...result.decisions]);
    setOptimizationCount((c) => c + 1);
    
    setIsOptimizing(false);
  };

  const totalSpend = campaigns.reduce((sum, c) => {
    const val = parseFloat(c.budget.replace(/[$,]/g, ""));
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  const blendedCAC = campaigns
    .filter(c => c.cac !== "N/A")
    .reduce((sum, c, _, arr) => sum + parseFloat(c.cac.replace("$", "")) / arr.length, 0);

  return (
    <>
      <ParticleBackground />
      <div className="relative z-10 flex flex-1 overflow-hidden">

        {/* Main Content Area */}
        <main className="flex flex-1 overflow-hidden p-6 gap-6">
          
          {/* Left Column */}
          <div className="flex flex-col flex-1 gap-6 overflow-y-auto pr-2">
            
            {/* Loop Visualization + Stats Row */}
            <div className="grid grid-cols-4 gap-4 stagger-children">
              {/* Loop Viz Card */}
              <div className="glass-card rounded-xl p-4 flex flex-col items-center justify-center scanlines relative overflow-hidden">
                <LoopVisualization isRunning={isOptimizing} />
                <button
                  onClick={handleOptimize}
                  disabled={isOptimizing}
                  className="mt-2 flex items-center gap-2 rounded-lg bg-primary-500 hover:bg-primary-600 px-4 py-2 text-sm font-bold text-white transition-all duration-200 disabled:opacity-50 hover:glow-cyan hover:scale-105 active:scale-95"
                >
                  {isOptimizing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                  {isOptimizing ? "Running..." : "Run Loop"}
                </button>
              </div>

              {/* Stats */}
              <div className="glass-card rounded-xl p-4 group hover:border-primary-400/30 transition-all">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider">Active Spend</span>
                  <Activity className="h-4 w-4 text-primary-400 group-hover:animate-pulse" />
                </div>
                <div className="text-2xl font-bold text-white font-mono text-glow-cyan">${totalSpend.toLocaleString()}</div>
                <div className="text-[10px] text-green-400 mt-1 font-mono">+14% vs last week</div>
              </div>

              <div className="glass-card rounded-xl p-4 group hover:border-primary-400/30 transition-all">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider">Blended CAC</span>
                  <Filter className="h-4 w-4 text-primary-400 group-hover:animate-pulse" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">${blendedCAC.toFixed(2)}</div>
                <div className="text-[10px] text-red-400 mt-1 font-mono">+$0.40 vs target</div>
              </div>

              <div className="glass-card rounded-xl p-4 group hover:border-primary-400/30 transition-all">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider">Portfolio ROI</span>
                  <TrendingUp className="h-4 w-4 text-primary-400 group-hover:animate-pulse" />
                </div>
                <div className="text-2xl font-bold text-white font-mono text-glow-cyan">+18.5%</div>
                <div className="text-[10px] text-green-400 mt-1 font-mono">AI-optimized alpha</div>
              </div>
            </div>

            {/* Campaign Manager */}
            <div className="glass-card rounded-xl flex-1 flex flex-col min-h-[280px] overflow-hidden">
              <div className="border-b border-border p-4 flex justify-between items-center bg-surface-hover/30">
                <h2 className="font-semibold text-white flex items-center gap-2 text-sm">
                  <BarChart2 className="h-4 w-4 text-primary-400" />
                  Campaign Manager
                  <span className="text-[10px] font-mono text-slate-500 bg-surface-hover px-2 py-0.5 rounded-full">
                    {campaigns.length} campaigns
                  </span>
                </h2>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Users className="h-3.5 w-3.5" />
                  {campaigns.reduce((s, c) => s + (c.conversions || 0), 0)} conversions
                  <span className="text-slate-700">|</span>
                  <Target className="h-3.5 w-3.5" />
                  {optimizationCount} optimizations
                </div>
              </div>
              <div className="p-0 overflow-x-auto flex-1">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-surface-hover/50 text-[10px] uppercase text-slate-500 font-mono tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Campaign</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Budget</th>
                      <th className="px-4 py-3">CAC</th>
                      <th className="px-4 py-3">ROI</th>
                      <th className="px-4 py-3">Conversions</th>
                      <th className="px-4 py-3">Reward</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((camp) => (
                      <tr key={camp.id} className="border-b border-border/50 hover:bg-surface-hover/30 transition-colors">
                        <td className="px-4 py-3.5 font-medium text-white">{camp.name}</td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider
                            ${camp.status === "Active" ? "bg-green-500/10 text-green-400 border border-green-500/20" : 
                              camp.status === "Optimizing" ? "bg-primary-500/10 text-primary-400 border border-primary-500/20" : 
                              "bg-slate-500/10 text-slate-400 border border-slate-500/20"}`}
                          >
                            {camp.status === "Optimizing" && <RefreshCw className="h-2.5 w-2.5 animate-spin" />}
                            {camp.status === "Active" && <span className="w-1.5 h-1.5 rounded-full bg-green-400" />}
                            {camp.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-white">{camp.budget}</td>
                        <td className="px-4 py-3.5 font-mono">{camp.cac}</td>
                        <td className={`px-4 py-3.5 font-mono font-bold ${
                          camp.roi === "N/A" ? "text-slate-500" :
                          camp.roi.startsWith("+") ? "text-green-400" : "text-red-400"
                        }`}>
                          {camp.roi}
                        </td>
                        <td className="px-4 py-3.5 font-mono text-slate-300">{camp.conversions?.toLocaleString() || "—"}</td>
                        <td className="px-4 py-3.5">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
                            {camp.rewardType || "—"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mini Funnel Preview */}
            <div className="glass-card rounded-xl p-4">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-primary-400">◆</span> Conversion Funnel
              </h3>
              <FunnelVisualization stages={SEED_FUNNEL} />
            </div>
          </div>

          {/* Right Column: Decision Log */}
          <div className="w-[380px] flex flex-col glass-card rounded-xl overflow-hidden shrink-0">
            <div className="border-b border-border p-4 bg-surface-hover/30">
              <h2 className="font-semibold text-white flex items-center gap-2 text-sm">
                <Terminal className="h-4 w-4 text-primary-400" />
                Torque Decision Log
              </h2>
              <p className="text-[10px] text-slate-500 mt-1 font-mono tracking-wider">AUTONOMOUS MCP EXECUTION TRAIL</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] text-slate-400 space-y-1">
              {logs.map((log, i) => (
                <div key={i} className={`leading-relaxed py-0.5 ${
                  log.includes("PHASE") ? "text-primary-400 font-bold mt-2 border-t border-border/30 pt-2" :
                  log.includes("Torque Agent") || log.includes("Decision:") ? "text-primary-300" : 
                  log.includes("✓") || log.includes("complete") ? "text-green-400" :
                  log.includes("⚡") ? "text-amber-400 font-bold" :
                  log.includes("Error") ? "text-red-400" :
                  ""
                }`}>
                  {log}
                </div>
              ))}
              {isOptimizing && (
                <div className="flex items-center gap-2 text-primary-400 mt-2 pt-2 border-t border-border/30">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  <span className="typewriter-cursor pr-1">Processing via Torque MCP...</span>
                </div>
              )}
              {decisions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/30">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">
                    {decisions.length} decision(s) logged this session
                  </span>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
