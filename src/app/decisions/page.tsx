"use client";

import { SEED_DECISIONS } from "@/lib/torque";
import { AIDecisionCard } from "@/components/AIDecisionCard";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Brain, CheckCircle, Clock, BarChart2 } from "lucide-react";

export default function DecisionsPage() {
  const applied = SEED_DECISIONS.filter(d => d.applied).length;
  const pending = SEED_DECISIONS.filter(d => !d.applied).length;
  const avgConfidence = (SEED_DECISIONS.reduce((s, d) => s + d.confidence, 0) / SEED_DECISIONS.length * 100).toFixed(0);

  return (
    <>
      <ParticleBackground />
      <div className="relative z-10 flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <Brain className="h-6 w-6 text-primary-400" />
                AI Decision Trail
              </h1>
              <p className="text-sm text-slate-400 mt-1 font-mono">
                Every autonomous decision logged with reasoning
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="glass-card rounded-lg px-3 py-2 text-center">
                <div className="text-sm font-bold font-mono text-green-400 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> {applied}
                </div>
                <div className="text-[9px] font-mono text-slate-500 uppercase">Applied</div>
              </div>
              <div className="glass-card rounded-lg px-3 py-2 text-center">
                <div className="text-sm font-bold font-mono text-amber-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {pending}
                </div>
                <div className="text-[9px] font-mono text-slate-500 uppercase">Pending</div>
              </div>
              <div className="glass-card rounded-lg px-3 py-2 text-center">
                <div className="text-sm font-bold font-mono text-primary-400 flex items-center gap-1">
                  <BarChart2 className="h-3 w-3" /> {avgConfidence}%
                </div>
                <div className="text-[9px] font-mono text-slate-500 uppercase">Avg Conf.</div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
            
            <div className="space-y-4 pl-12">
              {SEED_DECISIONS.map((decision, i) => (
                <div key={decision.id} className="relative">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[33px] top-5 w-3 h-3 rounded-full border-2 ${
                    decision.applied 
                      ? "bg-green-500 border-green-400" 
                      : "bg-surface border-amber-400"
                  }`} />
                  <AIDecisionCard decision={decision} index={i} />
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-xs font-mono text-slate-500">
              Showing {SEED_DECISIONS.length} decisions from current session •
              Agent confidence range: {Math.min(...SEED_DECISIONS.map(d => d.confidence * 100)).toFixed(0)}%–{Math.max(...SEED_DECISIONS.map(d => d.confidence * 100)).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
