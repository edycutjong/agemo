"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Activity, Filter, Target, ChevronRight, Zap } from "lucide-react";
import { ParticleBackground } from "@/components/ParticleBackground";

export default function LandingPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <>
      <ParticleBackground />
      <div className="min-h-screen text-slate-200 font-sans selection:bg-primary-500/30 overflow-hidden relative flex flex-col justify-center">
        
        {/* Background Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-primary-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] left-[20%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <main className="relative z-10 max-w-6xl mx-auto px-6 py-20 lg:py-32 w-full flex-1 flex flex-col items-center justify-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 flex flex-col items-center max-w-4xl"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-mono mb-4 glass-card">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              Torque MCP Live Engine
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              Autonomous Capital Allocation via <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-400 to-purple-500 text-glow-cyan">Agemo</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl font-mono">
              Deploy fully autonomous agents to monitor on-chain events, optimize blended CAC, and execute high-yield portfolio rebalancing at machine speed.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-6 w-full justify-center">
              <Link href="/dashboard" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-400 text-slate-950 font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Zap className="w-5 h-5" />
                Enter Command Center
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 w-full mt-12 text-left">
              <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl group hover:scale-[1.02] transition-transform cursor-default">
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse">
                  <Activity className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-mono">Real-Time Sync</h3>
                <p className="text-sm text-slate-400">Continuous observation of on-chain state to optimize active campaign spend dynamically.</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl group hover:scale-[1.02] transition-transform cursor-default">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse">
                  <Filter className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-mono">CAC Minimization</h3>
                <p className="text-sm text-slate-400">Algorithmic funnel optimization to continuously lower blended Customer Acquisition Cost.</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl group hover:scale-[1.02] transition-transform cursor-default">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-mono">ROI Maximization</h3>
                <p className="text-sm text-slate-400">Automated capital re-allocation targeting the highest-yielding asset strategies available.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
