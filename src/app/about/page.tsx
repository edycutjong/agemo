import Link from "next/link";
import { Zap, ExternalLink } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-8 max-w-3xl mx-auto">
      <div className="w-full space-y-6 animate-slide-up">
        <div className="space-y-3 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center glow-cyan">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight text-glow-cyan">Agemo</h1>
          <p className="text-lg text-slate-400">Autonomous AI Growth Loop Agent</p>
        </div>

        <div className="glass-card rounded-xl p-6 space-y-3">
          <h2 className="text-[10px] font-mono font-bold text-primary-400 tracking-widest uppercase">What It Does</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            AI CMO agent that autonomously creates, monitors, and optimizes Torque growth campaigns on Solana.
            Full autonomous loop: <span className="text-primary-400 font-semibold">Analyze</span> user behavior → <span className="text-purple-400 font-semibold">Optimize</span> reward distribution → <span className="text-green-400 font-semibold">Execute</span> campaign adjustments via MCP.
          </p>
        </div>

        <div className="glass-card rounded-xl p-6 space-y-3">
          <h2 className="text-[10px] font-mono font-bold text-primary-400 tracking-widest uppercase">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {["Next.js 16", "React 19", "Tailwind v4", "TypeScript", "Torque MCP SDK", "Solana", "@modelcontextprotocol/sdk"].map((t) => (
              <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-400">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 space-y-3">
          <h2 className="text-[10px] font-mono font-bold text-primary-400 tracking-widest uppercase">MCP Integration</h2>
          <div className="space-y-2 text-sm text-slate-300">
            {[
              ["Campaign CRUD", "Create/update/delete growth campaigns"],
              ["Journey Tracking", "Track user paths through campaigns"],
              ["Reward Distribution", "Allocate/adjust referral rewards"],
              ["Analytics", "Campaign performance metrics"],
              ["MCP Protocol", "Agent communicates via Model Context Protocol"],
            ].map(([feature, desc]) => (
              <div key={feature} className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <div><span className="font-semibold text-white">{feature}</span> — {desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 space-y-3">
          <h2 className="text-[10px] font-mono font-bold text-primary-400 tracking-widest uppercase">Hackathon</h2>
          <p className="text-sm text-slate-300">
            Built for <span className="text-white font-semibold">Colosseum Frontier Hackathon 2026</span> — Torque MCP Track ($3,000 USDC).
          </p>
        </div>

        <div className="flex gap-3 justify-center pt-2">
          <Link href="/" className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3 rounded-lg transition-all text-sm hover:glow-cyan">
            Launch Dashboard →
          </Link>
          <a href="https://docs.torque.so/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border hover:border-primary-400/30 text-slate-300 font-medium px-6 py-3 rounded-lg transition-all text-sm">
            Torque Docs <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </main>
  );
}
