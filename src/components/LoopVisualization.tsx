"use client";

import { useEffect, useState } from "react";

/**
 * Animated Analyze → Optimize → Execute loop visualization.
 * The "star feature" — shows the AI agent's autonomous decision cycle.
 */

const PHASES = [
  { name: "ANALYZE", icon: "🔍", color: "#22d3ee", description: "Scanning on-chain data" },
  { name: "OPTIMIZE", icon: "⚡", color: "#8b5cf6", description: "Computing best strategy" },
  { name: "EXECUTE", icon: "🚀", color: "#22c55e", description: "Applying via Torque MCP" },
];

export function LoopVisualization({ isRunning = false }: { isRunning?: boolean }) {
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % PHASES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="relative flex items-center justify-center py-6">
      {/* Orbital ring */}
      <div className="relative w-48 h-48">
        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-500 ${
            isRunning ? "glow-cyan gradient-border" : "border border-border bg-surface"
          }`}>
            {isRunning ? "🔄" : "⏸"}
          </div>
        </div>

        {/* Phase nodes */}
        {PHASES.map((phase, i) => {
          const angle = (i * 120 - 90) * (Math.PI / 180);
          const radius = 80;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isActive = activePhase === i && isRunning;

          return (
            <div
              key={phase.name}
              className={`absolute flex flex-col items-center gap-1 transition-all duration-500 ${
                isActive ? "scale-110" : "scale-100 opacity-60"
              }`}
              style={{
                left: `calc(50% + ${x}px - 32px)`,
                top: `calc(50% + ${y}px - 20px)`,
              }}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg border transition-all duration-300 ${
                  isActive ? "border-transparent shadow-lg" : "border-border bg-surface"
                }`}
                style={isActive ? { backgroundColor: `${phase.color}20`, boxShadow: `0 0 20px ${phase.color}40` } : {}}
              >
                {phase.icon}
              </div>
              <span
                className="text-[10px] font-mono font-bold tracking-wider"
                style={{ color: isActive ? phase.color : "#64748b" }}
              >
                {phase.name}
              </span>
            </div>
          );
        })}

        {/* Connection arcs */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 192 192">
          <circle
            cx="96"
            cy="96"
            r="80"
            fill="none"
            stroke={isRunning ? "#06b6d4" : "#334155"}
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity={isRunning ? 0.4 : 0.2}
            className={isRunning ? "animate-[spin_12s_linear_infinite]" : ""}
          />
        </svg>
      </div>

      {/* Status text */}
      {isRunning && (
        <div className="absolute bottom-0 text-center animate-slide-up">
          <p className="text-xs font-mono text-primary-400 typewriter-cursor inline-block pr-1">
            {PHASES[activePhase].description}
          </p>
        </div>
      )}
    </div>
  );
}
