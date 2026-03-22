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

<div class="listen-player">
  <audio id="listen-audio" src="https://assets.travisbreaks.com/transmissions/057-when-agents-fail.mp3?v=1" preload="none"></audio>
  <div class="lp-head">
    <button class="listen-btn" id="listen-btn" onclick="lpToggle()" aria-label="Play narration">
      <svg class="listen-icon icon-play" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.5l10 5.5-10 5.5V2.5z"/></svg>
      <svg class="listen-icon icon-pause" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:none"><path d="M4 2h3v12H4V2zm5 0h3v12H9V2z"/></svg>
      <span class="listen-meta"><span>Listen</span><span class="listen-sep"> · </span><span class="listen-dur">~9 min</span></span>
    </button>
    <span class="listen-tooltip">Narrated</span>
    <div class="speed-btns">
      <button class="speed-btn active" data-speed="1">1x</button>
      <button class="speed-btn" data-speed="1.25">1.25x</button>
      <button class="speed-btn" data-speed="1.5">1.5x</button>
    </div>
  </div>
  <div class="lp-scrubber" id="lp-scrubber">
    <div class="lp-track" id="lp-track">
      <div class="lp-fill" id="lp-fill"></div>
    </div>
    <div class="lp-times">
      <span id="lp-cur">0:00</span>
      <span id="lp-tot">--:--</span>
    </div>
  </div>
</div>

<style>
  .listen-player {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
    margin: 0 0 2.5rem 0;
  }
  .lp-head {
    position: relative;
    display: inline-flex;
    align-items: center;
  }
  .listen-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.45rem 1rem 0.45rem 0.75rem;
    background: rgba(120, 220, 255, 0.03);
    border: 1px solid rgba(120, 220, 255, 0.18);
    border-radius: 999px;
    box-shadow: 0 0 0 1px rgba(120, 220, 255, 0.04), 0 0 14px rgba(120, 220, 255, 0.06);
    color: rgba(120, 220, 255, 0.65);
    font-size: 0.78rem;
    letter-spacing: 0.05em;
    cursor: pointer;
    overflow: hidden;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    outline: none;
    font-family: inherit;
  }
  .listen-btn:hover {
    background: rgba(120, 220, 255, 0.07);
    color: rgba(120, 220, 255, 0.9);
    box-shadow: 0 0 0 1px rgba(120, 220, 255, 0.08), 0 0 18px rgba(120, 220, 255, 0.1);
  }
  .listen-btn.playing {
    background: rgba(120, 220, 255, 0.06);
    color: rgba(120, 220, 255, 1);
  }
  .listen-btn::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    width: 40%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.065) 50%, rgba(255,255,255,0.03) 55%, transparent);
    transform: skewX(-20deg);
    animation: sheen-listen 11s ease-in-out infinite;
    animation-delay: 6.3s;
    pointer-events: none;
  }
  @keyframes sheen-listen {
    0%   { left: -50%; opacity: 0; }
    8%   { left: -50%; opacity: 0; }
    15%  { opacity: 1; }
    60%  { left: 140%; opacity: 1; }
    67%  { opacity: 0; }
    100% { left: 140%; opacity: 0; }
  }
  .listen-icon { width: 13px; height: 13px; flex-shrink: 0; fill: currentColor; }
  .listen-meta { display: flex; align-items: center; gap: 0.2rem; opacity: 0.8; }
  .listen-sep { opacity: 0.4; }
  .listen-dur { opacity: 0.55; }
  .listen-tooltip {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: calc(100% + 0.55rem);
    background: rgba(8, 8, 12, 0.92);
    border: 1px solid rgba(120, 220, 255, 0.12);
    color: rgba(120, 220, 255, 0.55);
    font-size: 0.7rem;
    letter-spacing: 0.04em;
    padding: 0.28rem 0.65rem;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.18s;
  }
  .lp-head:hover .listen-tooltip { opacity: 1; }
  .lp-scrubber {
    width: 220px;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    pointer-events: none;
    transition: opacity 0.25s ease, max-height 0.25s ease;
  }
  .lp-scrubber.active {
    opacity: 1;
    max-height: 36px;
    pointer-events: all;
  }
  .lp-track {
    position: relative;
    height: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .lp-track::before {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: rgba(120, 220, 255, 0.1);
    border-radius: 1px;
  }
  .lp-fill {
    position: absolute;
    left: 0;
    height: 2px;
    width: 0%;
    background: rgba(120, 220, 255, 0.65);
    border-radius: 1px;
    pointer-events: none;
    transition: width 0.08s linear;
  }
  .lp-times {
    display: flex;
    justify-content: space-between;
    font-size: 0.58rem;
    color: rgba(120, 220, 255, 0.28);
    letter-spacing: 0.08em;
    font-family: var(--font-code, monospace);
    margin-top: -1px;
  }
  .speed-btns {
    display: inline-flex;
    gap: 0.3rem;
    margin-left: 0.6rem;
  }
  .speed-btn {
    padding: 0.2rem 0.45rem;
    border-radius: 4px;
    background: transparent;
    border: 1px solid rgba(120, 220, 255, 0.08);
    color: rgba(120, 220, 255, 0.35);
    font-family: var(--font-code, monospace);
    font-size: 0.62rem;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    outline: none;
  }
  .speed-btn:hover {
    color: rgba(120, 220, 255, 0.7);
    border-color: rgba(120, 220, 255, 0.15);
  }
  .speed-btn.active {
    color: rgba(120, 220, 255, 0.85);
    border-color: rgba(120, 220, 255, 0.3);
    background: rgba(120, 220, 255, 0.08);
  }
  @media (prefers-reduced-motion: reduce) { .listen-btn::after { animation: none; opacity: 0; } }
</style>

<script>
(function() {
  var audio = document.getElementById('listen-audio');
  var btn   = document.getElementById('listen-btn');
  var scrub = document.getElementById('lp-scrubber');
  var track = document.getElementById('lp-track');
  var fill  = document.getElementById('lp-fill');
  var cur   = document.getElementById('lp-cur');
  var tot   = document.getElementById('lp-tot');

  function fmt(s) {
    var m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  window.lpToggle = function() {
    if (audio.paused) {
      audio.play();
      btn.classList.add('playing');
      btn.querySelector('.icon-play').style.display = 'none';
      btn.querySelector('.icon-pause').style.display = 'block';
      scrub.classList.add('active');
    } else {
      audio.pause();
      btn.classList.remove('playing');
      btn.querySelector('.icon-play').style.display = 'block';
      btn.querySelector('.icon-pause').style.display = 'none';
    }
  };

  audio.addEventListener('loadedmetadata', function() { tot.textContent = fmt(audio.duration); });

  audio.addEventListener('timeupdate', function() {
    if (!audio.duration) return;
    fill.style.width = (audio.currentTime / audio.duration * 100) + '%';
    cur.textContent = fmt(audio.currentTime);
    var remaining = audio.duration - audio.currentTime;
    audio.volume = remaining < 0.25 ? Math.max(0, remaining / 0.25) : 1;
  });

  audio.addEventListener('ended', function() {
    btn.classList.remove('playing');
    btn.querySelector('.icon-play').style.display = 'block';
    btn.querySelector('.icon-pause').style.display = 'none';
    audio.volume = 1;
  });

  track.addEventListener('click', function(e) {
    if (!audio.duration) return;
    var r = track.getBoundingClientRect();
    audio.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * audio.duration;
  });

  document.querySelectorAll('.speed-btn').forEach(function(b) {
    b.addEventListener('click', function() {
      document.querySelectorAll('.speed-btn').forEach(function(s) { s.classList.remove('active'); });
      b.classList.add('active');
      audio.playbackRate = parseFloat(b.dataset.speed);
    });
  });
})();
</script>

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
