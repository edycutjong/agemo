"use client";

import { CheckCircle, Clock, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { AIDecision } from "@/lib/torque";

interface AIDecisionCardProps {
  decision: AIDecision;
  index: number;
}

const ACTION_COLORS: Record<string, string> = {
  PAUSE_CAMPAIGN: "#ef4444",
  INCREASE_BUDGET: "#22c55e",
  ADJUST_REWARDS: "#f59e0b",
  ADD_REFERRAL_BONUS: "#8b5cf6",
  "LAUNCH_A/B_TEST": "#06b6d4",
};

const ACTION_ICONS: Record<string, string> = {
  PAUSE_CAMPAIGN: "⏸",
  INCREASE_BUDGET: "📈",
  ADJUST_REWARDS: "🎯",
  ADD_REFERRAL_BONUS: "🔗",
  "LAUNCH_A/B_TEST": "🧪",
};

export function AIDecisionCard({ decision, index }: AIDecisionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const color = ACTION_COLORS[decision.action] || "#06b6d4";
  const icon = ACTION_ICONS[decision.action] || "⚡";

  const relativeTime = getRelativeTime(decision.timestamp);

  return (
    <div
      className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:border-primary-400/30 animate-slide-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
          style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
        >
          {icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white truncate">{decision.campaignName}</span>
            {decision.applied ? (
              <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
            ) : (
              <Clock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className="text-[10px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded"
              style={{ color, backgroundColor: `${color}15` }}
            >
              {decision.action.replace(/_/g, " ")}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">{relativeTime}</span>
          </div>
        </div>

        {/* Confidence */}
        <div className="flex flex-col items-end shrink-0">
          <div className="flex items-center gap-1">
            <div className="w-12 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${decision.confidence * 100}%`,
                  backgroundColor: decision.confidence > 0.8 ? "#22c55e" : decision.confidence > 0.6 ? "#f59e0b" : "#ef4444",
                }}
              />
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {(decision.confidence * 100).toFixed(0)}%
            </span>
          </div>
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-slate-500 mt-1" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-slate-500 mt-1" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-3 animate-slide-up">
          {/* Reasoning */}
          <div className="bg-surface-hover/50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <AlertTriangle className="h-3 w-3 text-primary-400" />
              <span className="text-[10px] font-mono text-primary-400 uppercase tracking-wider">Agent Reasoning</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{decision.reasoning}</p>
          </div>

          {/* Before/After Metrics */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3">
              <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider">Before</span>
              <div className="mt-1.5 space-y-1 font-mono text-xs">
                <div className="flex justify-between"><span className="text-slate-400">Budget</span><span className="text-white">{decision.beforeMetrics.budget}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">CAC</span><span className="text-white">{decision.beforeMetrics.cac}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">ROI</span><span className="text-red-400">{decision.beforeMetrics.roi}</span></div>
              </div>
            </div>
            <div className="bg-green-500/5 border border-green-500/10 rounded-lg p-3">
              <span className="text-[10px] font-mono text-green-400 uppercase tracking-wider">After</span>
              <div className="mt-1.5 space-y-1 font-mono text-xs">
                <div className="flex justify-between"><span className="text-slate-400">Budget</span><span className="text-white">{decision.afterMetrics.budget}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">CAC</span><span className="text-white">{decision.afterMetrics.cac}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">ROI</span><span className="text-green-400">{decision.afterMetrics.roi}</span></div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-slate-500">Status</span>
            {decision.applied ? (
              <span className="text-green-400 font-mono flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> Applied via Torque MCP
              </span>
            ) : (
              <span className="text-amber-400 font-mono flex items-center gap-1">
                <Clock className="h-3 w-3" /> Pending approval
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function getRelativeTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}
