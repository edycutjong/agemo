"use client";

import type { FunnelStage } from "@/lib/torque";

interface FunnelVisualizationProps {
  stages: FunnelStage[];
}

export function FunnelVisualization({ stages }: FunnelVisualizationProps) {
  return (
    <div className="space-y-3">
      {stages.map((stage, i) => {
        const widthPercent = Math.max(stage.percentage, 8);
        const dropoff = i > 0 ? ((stages[i - 1].count - stage.count) / stages[i - 1].count * 100).toFixed(1) : null;
        
        return (
          <div key={stage.name} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
            {/* Dropoff indicator */}
            {dropoff && (
              <div className="flex items-center gap-2 mb-1 ml-4">
                <div className="h-4 border-l border-dashed border-slate-600" />
                <span className="text-[10px] font-mono text-red-400/80">
                  ↓ {dropoff}% drop-off
                </span>
              </div>
            )}
            
            <div className="relative group">
              {/* Bar */}
              <div
                className="relative h-14 rounded-lg overflow-hidden transition-all duration-700 ease-out group-hover:scale-[1.01]"
                style={{ width: `${widthPercent}%` }}
              >
                {/* Gradient fill */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundColor: stage.color }}
                />
                <div
                  className="absolute inset-0 shimmer"
                />
                
                {/* Left accent */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
                  style={{ backgroundColor: stage.color }}
                />
                
                {/* Content */}
                <div className="relative flex items-center justify-between h-full px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: stage.color, boxShadow: `0 0 8px ${stage.color}60` }}
                    />
                    <span className="text-sm font-medium text-white">{stage.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold font-mono text-white">
                      {stage.count.toLocaleString()}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {stage.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
