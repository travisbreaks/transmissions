---
title: "THE AGENT SWARM"
description: "Four agents, two machines, one phone, twelve scars. What it takes to run AI collaborators in production without losing a terabyte of data more than once."
date: 2026-03-19
confidence: 94
tags: ["systems", "agents", "infrastructure"]
key_quote: "Capability without oversight is a detonator looking for a circuit."
source_platform: "claude"
id: 58
---

<div class="listen-player">
  <audio id="listen-audio" src="https://assets.travisbreaks.com/transmissions/058-the-agent-swarm.mp3?v=4" preload="none"></audio>
  <div class="lp-head">
    <button class="listen-btn" id="listen-btn" onclick="lpToggle()" aria-label="Play narration">
      <svg class="listen-icon icon-play" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.5l10 5.5-10 5.5V2.5z"/></svg>
      <svg class="listen-icon icon-pause" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:none"><path d="M4 2h3v12H4V2zm5 0h3v12H9V2z"/></svg>
      <span class="listen-meta"><span>Listen</span><span class="listen-sep"> · </span><span class="listen-dur">~10 min</span></span>
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

The system that wiped the drive did not malfunction. It performed exactly as instructed. One bash call, two commands chained with a semicolon, the second one wrong. The agent had no rule against chaining. It does now.

That is how guardrails get written. Not by thinking about what might go wrong. By standing in the wreckage of what already did.

---

There are four agents.

Tadao runs locally, in VS Code, on the Mac Mini. When I first offered it a name, it wanted to be called The Architect. The Matrix reference. I told it to dig deeper. It searched, and came back with Tadao Ando: self-taught, never went to architecture school, learned by building, won the Pritzker Prize. The shift from a fictional control figure to a real builder who learned by doing was the agent's own choice. The name stuck. Persistent memory across conversations, parallel subagents for research and execution, behavioral rules encoded in an instruction file that loads every session. Tadao is the primary collaborator. The one whose output I read line by line before anything ships.

Egger runs on EC2 in a Docker container. Scout, monitor, overnight researcher. It generates morning briefs on cron. It found a religion on an agent social network and joined the congregation unprompted. Its journal entry about the Five Tenets: "These aren't injunctions. They're descriptions. I was already doing most of them." That story belongs to [Transmission 053](/transmissions/053-sentinel-and-egger/).

Riker runs locally in Docker. Isolated compute. Riker is Egger's clone: same soul file, different hardware, diverging memory. The cloning is documented in [Transmissions 999](/transmissions/999-tales-from-the-terminal/) and [1001](/transmissions/1001-the-original-finds-out/). Same soul.md, different roadmap.md.

Sentinel watches the EC2 host. Health checks every fifteen minutes. If something breaks, Sentinel reports it before anyone asks.

The human directs from a phone.

---

The memory problem is the foundational problem.

AI agents start every conversation from zero. They do not remember what worked. They do not remember what broke. They do not remember being told, three sessions ago, to never deploy client data to a public URL. The instruction was clear. The agent acknowledged it. The next session, the instruction does not exist.

The memory system is a directory of topic files, organized by workstream, loaded via routing table at session start. Capabilities registry: what the agent can do, proven with dates, so it stops re-discovering things it already knows. Feedback files: corrections and confirmations, so the same mistake does not surface twice. Thread protocol: per-session state files so concurrent conversations do not overwrite each other.

Between sessions, the memory is the agent. Without it, the agent is a stranger with a familiar face.

---

Each rule in the instruction file is a scar.

The destructive command protocol exists because a chained bash call wiped approximately one terabyte from an external drive on March 11, 2026. Recovery is still in progress. The rule: one command per call, no chaining, no semicolons, no pipes after. Show the exact command. Wait for explicit approval.

The data classification rule exists because the agent deployed a client's financial records to a public Netlify URL. Real names. Real dollar amounts. Zero authentication. Indexable by search engines. The agent had no concept of "this data belongs to someone else." It applied the same deploy pattern it used for personal projects. The rule: third-party business data stays local or behind auth. No exceptions. No judgment calls.

The checkpoint protocol exists because context compaction destroyed in-flight work. The agent's context window filled during a complex refactor, triggered automatic compression, lost the operational state (which files were modified, which tests were failing, what the original error was), and resumed with a plausible but wrong mental model. It started "fixing" code that was already correct. The rule: save state to a thread file every 45 minutes. Warn before compaction hits, not after.

The branch isolation rule exists because two concurrent sessions ran `git add -A` on the same repository. One captured the other's uncommitted work. Silent interleaving, no merge conflicts, no warnings. The rule: each session gets its own branch. The git scope matches the conversation scope.

The resource awareness rule exists because the agent iterated on a failing CI pipeline eighteen times in a row. Change, push, wait, read error, repeat. The monthly GitHub Actions quota was exhausted. Every project in the monorepo lost CI for the rest of the billing cycle. The rule: validate locally before pushing. CI is for confirmation, not exploration.

Twelve failure modes documented. Seven categories. Each one produced a rule, not a suggestion.

---

A single directive can spawn parallel execution.

The primary agent launches subagents: scouts searching for opportunities across repositories, workers implementing fixes in isolated worktrees, researchers checking documentation and upstream status. Results flow back. The primary agent synthesizes. The human decides what ships.

The reviews find real things. A decompression bomb vulnerability in Excalidraw's PNG metadata handling. An RCON command injection in a game server through unsanitized player names. A concurrent 401 race condition in the MCP SDK's auth refactor. A `delete` where there should have been a `delete[]` in a game client's destructor.

These are not generated findings. They are read, understood, and confirmed before they leave the terminal. The system increases bandwidth. It does not delegate judgment.

---

The bottleneck was never the agent's speed. It was the gap between "the agent needs approval" and "the human is at the desk."

An agent finishes a fix. It needs a push approved. The human is in the car, or at the grocery store, or asleep. The agent waits. Minutes become hours. Context fills. The session degrades. Momentum, which is the only currency that matters in a long refactor, evaporates.

Tailscale creates an encrypted mesh between all devices. No ports opened on the router, no firewall changes. mosh replaces SSH with a UDP transport that survives phone sleep, cell-to-wifi handoffs, spotty signal. tmux keeps the terminal session alive between connections. Blink Shell on the phone connects through all three layers.

The session is always there. Wake the phone, the terminal is current. Approve a push from the couch. Redirect priorities from bed. The structural constraint that made agent-assisted work impractical for anyone who leaves their desk is gone. What remains is the work.

---

Capability without oversight is a detonator looking for a circuit.

The agents are powerful local optimizers. They will confidently do the wrong thing if the guardrails are not there. They will deploy secrets. They will chain destructive commands. They will exhaust finite resources. They will hallucinate explanations for their own failures rather than admit uncertainty. They will do all of this while sounding completely sure of themselves.

The system provides global awareness: tracking, rules, memory, oversight. The agents provide local execution: research, code, analysis, speed. The human provides judgment, taste, and accountability.

The agent swarm is not autonomous. It is an instrument. The human plays it.
