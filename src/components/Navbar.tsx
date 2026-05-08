"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, GitBranch, Brain, Zap, Info } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: BarChart2 },
  { href: "/funnel", label: "Funnel", icon: GitBranch },
  { href: "/decisions", label: "AI Decisions", icon: Brain },
  { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="relative z-10 flex h-16 items-center justify-between border-b border-border bg-surface/60 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white transition-all group-hover:glow-cyan group-hover:scale-105">
            <Zap className="h-5 w-5" />
          </div>
          <span className="font-mono text-xl font-bold tracking-tight text-white">
            Agemo
          </span>
          <span className="rounded-full bg-primary-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-primary-400 tracking-wider">
            MCP
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                    : "text-slate-400 hover:text-white hover:bg-surface-hover border border-transparent"
                  }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Status */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-xs font-mono">Torque Connected</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span>LATENCY: <span className="text-cyan-400">12ms</span></span>
          <span className="text-slate-700">|</span>
          <span>v1.0.0</span>
        </div>
      </div>
    </header>
  );
}
