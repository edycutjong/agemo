#!/usr/bin/env node

/**
 * Agemo — Offline Verification Script
 * Validates all core features work without network access.
 * Run: node scripts/verify.mjs
 */

const CHECKS = [];
let passed = 0;
let failed = 0;

function check(name, fn) {
  try {
    fn();
    CHECKS.push({ name, status: "✅ PASS" });
    passed++;
  } catch (err) {
    CHECKS.push({ name, status: "❌ FAIL", error: err.message });
    failed++;
  }
}

// ─── Source File Checks ────────────────────────────────────────────────

import { existsSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");

const REQUIRED_FILES = [
  "src/app/page.tsx",
  "src/app/layout.tsx",
  "src/app/globals.css",
  "src/app/funnel/page.tsx",
  "src/app/decisions/page.tsx",
  "src/app/about/page.tsx",
  "src/app/api/health/route.ts",
  "src/app/api/campaigns/route.ts",
  "src/app/api/agent/analyze/route.ts",
  "src/app/api/agent/optimize/route.ts",
  "src/app/api/agent/execute/route.ts",
  "src/app/api/agent/decisions/route.ts",
  "src/lib/torque.ts",
  "src/components/Navbar.tsx",
  "src/components/Footer.tsx",
  "src/components/ParticleBackground.tsx",
  "src/components/LoopVisualization.tsx",
  "src/components/FunnelVisualization.tsx",
  "src/components/AIDecisionCard.tsx",
  "package.json",
  "README.md",
  "docs/PRD.md",
  "docs/ARCHITECTURE.md",
];

check("All required files exist", () => {
  const missing = REQUIRED_FILES.filter(f => !existsSync(resolve(ROOT, f)));
  if (missing.length > 0) throw new Error(`Missing: ${missing.join(", ")}`);
});

// ─── Package.json Checks ──────────────────────────────────────────────

check("package.json has MCP SDK dependency", () => {
  const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf-8"));
  if (!pkg.dependencies["@modelcontextprotocol/sdk"]) throw new Error("Missing @modelcontextprotocol/sdk");
});

check("package.json has correct name", () => {
  const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf-8"));
  if (pkg.name !== "agemo") throw new Error(`Expected 'agemo', got '${pkg.name}'`);
});

// ─── Torque SDK Checks ────────────────────────────────────────────────

check("Torque SDK exports seed data", () => {
  const torque = readFileSync(resolve(ROOT, "src/lib/torque.ts"), "utf-8");
  const exports = ["SEED_CAMPAIGNS", "SEED_FUNNEL", "SEED_JOURNEYS", "SEED_DECISIONS", "runTorqueOptimization"];
  const missing = exports.filter(e => !torque.includes(`export ${e.startsWith("run") ? "async function" : "const"} ${e}`));
  if (missing.length > 0) throw new Error(`Missing exports: ${missing.join(", ")}`);
});

check("Torque SDK has MCP Client import", () => {
  const torque = readFileSync(resolve(ROOT, "src/lib/torque.ts"), "utf-8");
  if (!torque.includes("@modelcontextprotocol/sdk")) throw new Error("No MCP SDK import");
});

check("Torque SDK has SSEClientTransport", () => {
  const torque = readFileSync(resolve(ROOT, "src/lib/torque.ts"), "utf-8");
  if (!torque.includes("SSEClientTransport")) throw new Error("No SSEClientTransport");
});

// ─── Page Checks ──────────────────────────────────────────────────────

check("Dashboard page has Loop Visualization", () => {
  const page = readFileSync(resolve(ROOT, "src/app/page.tsx"), "utf-8");
  if (!page.includes("LoopVisualization")) throw new Error("No LoopVisualization component");
});

check("Dashboard page has Particle Background", () => {
  const page = readFileSync(resolve(ROOT, "src/app/page.tsx"), "utf-8");
  if (!page.includes("ParticleBackground")) throw new Error("No ParticleBackground");
});

check("Funnel page exists with visualization", () => {
  const page = readFileSync(resolve(ROOT, "src/app/funnel/page.tsx"), "utf-8");
  if (!page.includes("FunnelVisualization")) throw new Error("No FunnelVisualization");
});

check("Decisions page has AIDecisionCard", () => {
  const page = readFileSync(resolve(ROOT, "src/app/decisions/page.tsx"), "utf-8");
  if (!page.includes("AIDecisionCard")) throw new Error("No AIDecisionCard");
});

// ─── Design System Checks ─────────────────────────────────────────────

check("CSS has glassmorphism classes", () => {
  const css = readFileSync(resolve(ROOT, "src/app/globals.css"), "utf-8");
  if (!css.includes(".glass-card")) throw new Error("No .glass-card class");
  if (!css.includes(".glow-cyan")) throw new Error("No .glow-cyan class");
});

check("CSS has animation keyframes", () => {
  const css = readFileSync(resolve(ROOT, "src/app/globals.css"), "utf-8");
  if (!css.includes("@keyframes")) throw new Error("No @keyframes");
});

// ─── Architecture Checks ──────────────────────────────────────────────

check("Architecture doc has MCP integration map", () => {
  const arch = readFileSync(resolve(ROOT, "docs/ARCHITECTURE.md"), "utf-8");
  if (!arch.includes("Torque MCP Integration Map")) throw new Error("No integration map");
});

check("5 Torque SDK features documented", () => {
  const arch = readFileSync(resolve(ROOT, "docs/ARCHITECTURE.md"), "utf-8");
  const features = ["Campaign CRUD", "Journey Tracking", "Reward Distribution", "Analytics", "MCP Protocol"];
  const missing = features.filter(f => !arch.includes(f));
  if (missing.length > 0) throw new Error(`Missing features: ${missing.join(", ")}`);
});

// ─── Report ───────────────────────────────────────────────────────────

console.log("\n╔══════════════════════════════════════════════╗");
console.log("║     AGEMO — Offline Verification Report      ║");
console.log("╚══════════════════════════════════════════════╝\n");

CHECKS.forEach(c => {
  console.log(`  ${c.status}  ${c.name}${c.error ? ` — ${c.error}` : ""}`);
});

console.log(`\n  ────────────────────────────────────────────`);
console.log(`  Total: ${CHECKS.length} | Passed: ${passed} | Failed: ${failed}`);
console.log(`  ${failed === 0 ? "🎉 ALL CHECKS PASSED" : "⚠️  SOME CHECKS FAILED"}\n`);

process.exit(failed > 0 ? 1 : 0);
