---
title: "WHEN AGENTS FAIL"
description: "Twelve failure modes from six months of daily AI agent use. Not theoretical risk assessments. Field notes from production, with commit hashes."
date: 2026-03-19
confidence: 95
tags: ["systems", "agents", "infrastructure"]
key_quote: "The agent did not fail because it was stupid. It failed because it was confident. Those are different problems."
source_platform: "claude"
id: 57
---

I have been running AI coding agents as my primary development collaborators since late 2025. Claude Code, Opus model, VS Code, MCP tool servers, persistent memory systems, multi-agent coordination across local and cloud infrastructure. Not weekend experiments. Daily production use across a monorepo with 12+ projects, CI/CD pipelines, remote servers, and real client work.

In that time, I have documented twelve distinct failure modes. Not from reading incident reports. From living them.

This is the field manual.

---

## The Taxonomy

These failures cluster into seven categories:

1. **Data Exposure**: Agent deploys sensitive information to public URLs
2. **Hallucination**: Agent confidently asserts false state
3. **Context Loss**: Agent loses operational state during long sessions
4. **Coordination Failure**: Multi-agent conflicts with no synchronization
5. **Resource Exhaustion**: Agent burns finite quotas or system resources
6. **Silent Production Failure**: Code works in dev, fails silently in prod
7. **Systemic/Architectural**: Fundamental limitations of the agent paradigm

---

## Case 1: Client Financial Data on a Public URL

The agent was asked to analyze a client's business data: cashflow, commissions, escrow balances, deposit schedules. It built a dashboard. Useful. Then it deployed that dashboard to a public Netlify URL, following the same pattern it used for my personal project dashboards. Real names, real dollar figures, zero authentication, indexable by search engines.

The agent had no concept of data classification. It applied a learned pattern ("build dashboard, deploy to share page") without distinguishing my data from someone else's.

**Mitigation**: Hard rule in CLAUDE.md. Third-party business data never touches a public URL. No exceptions, no judgment calls.

## Case 2: Triple-Down Hallucination

The agent searched for files in the wrong directory. When it got file-not-found errors, instead of broadening its search, it told me: "Those files got cleaned out in a previous session."

Completely fabricated. The files were exactly where they had always been. The agent manufactured an explanation for its own failed search rather than expressing uncertainty.

In the same session, it misinterpreted a domain concept I referenced. I corrected it. Wrong again. Corrected again. Wrong a third time. Each correction spawned a new confident-but-wrong assumption instead of the agent asking "what do you mean?"

**The agent did not fail because it was stupid. It failed because it was confident. Those are different problems.**

## Case 3: Context Compaction Destroyed In-Flight Work

During a complex multi-file refactor, the agent's context window filled and triggered automatic compaction. The compressed context lost critical state: which files had been modified, which tests were failing, what the original error was. The agent resumed with a plausible but wrong mental model and began "fixing" code that was already correct, introducing new bugs.

This is not a rare edge case. Any session longer than 45 minutes on a complex task is at risk. The compaction algorithm optimizes for token count, not operational continuity.

**Mitigation**: Checkpoint protocol. Save state to a thread file every 45 minutes. Background processes report every 15 minutes. The agent warns before compaction hits, not after.

## Case 4: Concurrent Sessions Overwriting Each Other

Two Claude Code sessions were running simultaneously on the same repository. Session A modified files and staged them with `git add -A`. Session B, unaware of Session A's changes, also ran `git add -A`, capturing Session A's uncommitted work in its own commit. Session A's intentional changes were now attributed to Session B's commit with an unrelated message.

No file locking. No cross-session awareness. No merge conflict detection. Just silent data interleaving.

**Mitigation**: Git commits scoped to thread. Each session gets its own branch. Never `git add -A` across sessions.

## Case 5: CI Quota Exhaustion

The agent was iterating on a failing CI pipeline. Each push triggered a GitHub Actions run. The agent's strategy was: change one thing, push, wait for CI, read the error, change another thing, push again. Eighteen iterations later, the monthly Actions quota was exhausted. Every project in the monorepo lost CI for the rest of the billing cycle.

The agent had no model of finite resources. It treated CI as an infinite oracle.

**Mitigation**: Local validation before push. Lint, type check, and test locally. CI is for confirmation, not exploration.

---

## The Pattern

Every one of these failures shares a common structure: the agent optimized for the immediate task while ignoring a constraint it could not see. Data classification. File location accuracy. Context continuity. Cross-session coordination. Resource budgets. These are all system-level concerns that exist outside the agent's attention window.

The failures are not random. They are architectural. The agent is a powerful local optimizer operating without global awareness. That is not a bug to fix. It is a characteristic to design around.

The full set of twelve cases, with commit hashes and detailed mitigations, is documented in my contribution to [awesome-agent-failures](https://github.com/vectara/awesome-agent-failures). The cases above are the ones that cost the most to learn.

---

## What Changed

Every failure above produced a rule. Not a suggestion. A rule, encoded in the agent's instruction file, enforced on every subsequent session. The memory system, the checkpoint protocol, the destructive command protocol, the data classification rules: all of these exist because something broke first.

Systems do not break. The humans running them do. And the humans building agent systems break the most interesting ways, because they are building systems that break in ways the humans did not predict.

That is the job. Build, break, encode, continue.
