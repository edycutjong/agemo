# Agemo — Full Project Brief

## PRD
> **Hook**: A Solana project burned $8K on referral rewards but couldn't tell which campaign drove retention. Agemo's AI would have cut spend by 60% and doubled conversions.

**Problem**: Growth campaigns on Solana are manually managed. No feedback loop between campaign performance and strategy optimization.

**Solution**: Autonomous AI growth loop agent via Torque MCP. Analyze user behavior → Optimize reward distribution → Execute campaign adjustments — full loop.

**Core Features**:
1. Campaign creation via Torque MCP
2. User journey tracking and analysis
3. AI optimization engine (suggest reward changes)
4. Autonomous execution (adjust campaigns based on data)
5. Dashboard showing AI decision trail

**Out of Scope**: Custom reward tokens, multi-chain campaigns

---

## ARCHITECTURE
| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind v4 |
| Agent | Torque MCP SDK, OpenAI API |
| Database | Supabase (campaign data, AI logs) |

**Torque MCP depth**: Campaigns, journeys, rewards, analytics, MCP integration — 5 features.

---

## BUILD PLAN (3 Days)
- **Day 1**: Torque MCP connection, campaign CRUD, journey tracking
- **Day 2**: AI optimization loop (analyze → suggest → execute), dashboard
- **Day 3**: Demo the loop live, video, deploy

---

## SUBMISSION
**Demo**: Create campaign → 100 simulated users → AI analyzes → "Cut reward 40%, add referral bonus" → executes → conversion goes up. Loop visualized.

---

## SEED DATA
3 campaigns, 100 simulated user journeys, 5 AI optimization decisions.

---

## UI
Growth dashboard, campaign cards, funnel visualization, AI decision log with reasoning, before/after metrics.
