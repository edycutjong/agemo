"use client";

import { SEED_FUNNEL, SEED_JOURNEYS } from "@/lib/torque";
import { FunnelVisualization } from "@/components/FunnelVisualization";
import { ParticleBackground } from "@/components/ParticleBackground";
import { GitBranch, Users, ArrowRight, CheckCircle, XCircle } from "lucide-react";

export default function FunnelPage() {
  const completedJourneys = SEED_JOURNEYS.filter(j => j.completed).length;
  const totalJourneys = SEED_JOURNEYS.length;
  const conversionRate = ((completedJourneys / totalJourneys) * 100).toFixed(1);

  return (
    <>
      <ParticleBackground />
      <div className="relative z-10 flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <GitBranch className="h-6 w-6 text-primary-400" />
                User Funnel Analysis
              </h1>
              <p className="text-sm text-slate-400 mt-1 font-mono">
                Impression → Click → Wallet Connect → Quest Complete
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="glass-card rounded-lg px-4 py-2 text-center">
                <div className="text-lg font-bold font-mono text-primary-400">{conversionRate}%</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Conversion</div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-400" />
              Campaign Funnel
            </h2>
            <FunnelVisualization stages={SEED_FUNNEL} />
          </div>

          <div className="glass-card rounded-xl overflow-hidden">
            <div className="border-b border-border p-4 bg-surface-hover/30 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-primary-400" />
                User Journey Tracker
              </h2>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-green-400 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> {completedJourneys}</span>
                <span className="text-slate-600">|</span>
                <span className="text-red-400 flex items-center gap-1"><XCircle className="h-3 w-3" /> {totalJourneys - completedJourneys}</span>
              </div>
            </div>
            <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto">
              {SEED_JOURNEYS.map((journey, i) => (
                <div key={journey.userId} className="flex items-center gap-3 p-3 rounded-lg bg-surface-hover/20 hover:bg-surface-hover/40 transition-all animate-slide-up" style={{ animationDelay: `${i * 0.03}s` }}>
                  <span className="w-20 text-xs font-mono text-slate-400 shrink-0">{journey.userId}</span>
                  <div className="flex items-center gap-1 flex-1">
                    {journey.steps.map((step, si) => (
                      <div key={si} className="flex items-center gap-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          step.stage === "quest" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                          step.stage === "wallet" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                          "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        }`}>{step.stage}</span>
                        {si < journey.steps.length - 1 && <ArrowRight className="h-3 w-3 text-slate-600 shrink-0" />}
                      </div>
                    ))}
                  </div>
                  {journey.completed ? (
                    <span className="text-[10px] font-mono text-green-400"><CheckCircle className="h-3 w-3 inline" /> OK</span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500"><XCircle className="h-3 w-3 inline" /> DROP</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 stagger-children">
            <div className="glass-card rounded-xl p-4">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Biggest Drop-off</div>
              <div className="text-lg font-bold text-red-400 font-mono">Clicks → Wallet</div>
              <div className="text-xs text-slate-400 mt-1">75% abandon. Wallet friction is bottleneck.</div>
            </div>
            <div className="glass-card rounded-xl p-4">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">AI Recommendation</div>
              <div className="text-lg font-bold text-primary-400 font-mono">Gas Abstraction</div>
              <div className="text-xs text-slate-400 mt-1">Subsidize first tx to reduce friction ~40%.</div>
            </div>
            <div className="glass-card rounded-xl p-4">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Quest Rate</div>
              <div className="text-lg font-bold text-green-400 font-mono">20.3%</div>
              <div className="text-xs text-slate-400 mt-1">Above industry avg (15%).</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
