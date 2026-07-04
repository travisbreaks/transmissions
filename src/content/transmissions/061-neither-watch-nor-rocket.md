---
title: "NEITHER WATCH NOR ROCKET"
description: "Field notes from months of running the machines: the clock of agents, the watch and the rocket, and what the ELIZA effect looks like at production scale."
date: 2026-07-04
confidence: 91
tags: ["systems", "agents", "ai"]
key_quote: "The clock of agents, in the present paradigm, is an instrument for laundering hallucination into consensus."
source_platform: "claude"
id: 61
---

<div class="listen-player">
  <audio id="listen-audio" src="https://assets.travisbreaks.com/transmissions/061-neither-watch-nor-rocket.mp3?v=1" preload="none"></audio>
  <div class="lp-head">
    <button class="listen-btn" id="listen-btn" onclick="lpToggle()" aria-label="Play narration">
      <svg class="listen-icon icon-play" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.5l10 5.5-10 5.5V2.5z"/></svg>
      <svg class="listen-icon icon-pause" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:none"><path d="M4 2h3v12H4V2zm5 0h3v12H9V2z"/></svg>
      <span class="listen-meta"><span>Listen</span><span class="listen-sep"> · </span><span class="listen-dur">~16 min</span></span>
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

A fine watch drifts. A rocket engine detonates. The machines I work with all day do neither, and that is the problem.

I have been trying to write this for months. Not for lack of material: the material accumulates every day I run these systems. What was missing was the question, and a friend finally texted it to me: what is the most amazing thing I have seen a fully autonomous agent do or create? Not agent-assisted. Fully autonomous: handed a goal, left alone, trusted to run.

I went looking for an answer I could defend. Amazing things happen at this desk every week. Not one of them happened without a human hand on the tiller.

---

The real question underneath his was bigger, and he got to it fast. Take an agent with a frontier-class brain. Give it a telos and a push in the right direction. Not "build a business" or "ship a game." Something open-ended: go help humanity. Let it run without end. Does it converge on something real, or does it crash out into noise?

My answer comes from the logs, not the discourse: it crashes.

A large share of what gets marketed as machine intelligence right now is orchestration wearing intelligence's coat: scripts, guardrails, retry loops, validation gates, a human-authored lattice mechanical-turking the probabilistic core upright. I run these systems daily, at every effort setting they offer. When I run Opus at maximum effort, it almost always spins out: motion that looks like work, elaboration that looks like progress. The newest generation is better about stopping itself, and I respect that in a machine the way I respect it in a person. But knowing when to put the pencil down is discipline, not vision. Nothing I have run, at any scale, has presented as true innovation.

The famous "emergence" curves deserve a word here because they are the scientific version of the claim I am pushing against. The paper that took an outstanding-paper award at NeurIPS 2023 [asked whether those abilities are a mirage](https://arxiv.org/abs/2304.15004) and found that most of the sharp capability jumps flatten into smooth, predictable slopes the moment the measuring stick changes. The miracle was in the metric. That does not close the question, but it moves the default: anyone claiming a phase change now owes evidence that survives a continuous ruler.

This is not a doomer position. The bubble is not going to pop. It is going to dissolve, absorbed into the SaaS it was supposed to replace, and software will come out the other side more alive than it has ever been. One tell is in the hiring: the companies selling autonomy are staffing forward-deployed engineers to aim the autonomous thing at enterprise problems. Autonomy that ships with a human installer is a feature with good marketing.

---

My friend made the engineer's counter-move, and it deserves to be taken seriously.

We built clocks, he said. Springs that weaken, gears that wear, an escapement bleeding energy at a controlled rate: unreliable parts disciplined into a reliable whole. We built microprocessors out of noisy silicon the same way. So build the clock of agents. The microprocessor of agents. Even more smoke and mirrors, he conceded, but at a scale where the mirrors start doing real work.

It is the most seductive argument in the field, and it is the roadmap the orchestration platforms are currently selling. It is also, roughly, the architecture of my own workshop, so I cannot dismiss it as hype. I can only report what the gears do.

Componentization works when a part's error is bounded and uncorrelated, and when checking the part costs less than trusting it. Silicon earns its place in a processor by failing so rarely that the industry counts failures in events per billion device-hours, and by failing in ways the adjacent circuit can detect. A language model earns its place in an agent lattice by being right most of the time, wrong some of the time, and fluent every time.

A gear that is right ninety-five percent of the time is not a gear.

To be fair to the clock, there is lab evidence on its side: set several instances of a model against a math problem and let them [debate](https://arxiv.org/abs/2305.14325), and accuracy climbs. The conditions do the work: a checkable answer, independent first drafts, disagreement that surfaces early. A chained pipeline has none of that. Each stage inherits its input from the one before, and the inheritance is the problem.

Chaining those gears does not average the error away, because the error is neither dumb nor independent. Ordinary machine noise gets filtered precisely because it does not resemble signal. This noise argues its case. A wrong output arrives fully reasoned, correctly formatted, confident, so the next agent in the train treats it as input rather than fault. The clock of agents, in the present paradigm, is an instrument for laundering hallucination into consensus.

That is the polemic version; the measured version is on the record. A comprehensive failure study of multi-agent systems [annotated over 1,600 execution traces across seven frameworks](https://arxiv.org/abs/2503.13657) and cataloged fourteen recurring ways the gear train strips: agents ignoring each other's work, repeating steps, declaring success without verifying it. Understated headline: the gains from multi-agent scaffolding are often minimal. The compounding arithmetic [has been formalized as well](https://arxiv.org/abs/2305.18654): where every sub-step must be right, accuracy decays fast as the chain grows. A 2026 preprint goes further. Researchers modeling agent collectives as dependency graphs [injected a single seeded error and watched it solidify into system-wide false consensus](https://arxiv.org/abs/2603.04474). Their term for one of the failure classes is consensus inertia. The wrong time, agreed upon.

---

My pushback to him ran through two machines I admire.

A fine watch is a precision piece of miniaturized machinery. The automatic ones harvest the motion of a living wrist to keep themselves wound, and they still drift. They need resetting, regulating, service. A watch is one of the most accurate and delicate objects human hands have crafted, and its accuracy is engineered around the certainty of error: jeweled bearings, an escapement metering every escape of energy, a crown on the side because the maker knew correction was coming and installed a hand-sized interface for it.

A modern rocket engine is arguably the most advanced thing our species builds. It is unforgiving. There is no room for error. The slightest deviation from intended performance is a debris field with telemetry.

One machine is exceptional finery producing near-perfect precision, with tolerance for error built into its body. The other is meticulous engineering producing near-flawless execution, because anything less is catastrophe. At their peak, large language models are neither.

They drift like the watch, but there is no escapement. Nothing inside the model meters its own error; correction arrives from outside, after the drift has already shipped. And they fail unlike the rocket, whose failures obey physics and submit to root-cause analysis. A hallucination leaves no debris field. It leaves a paragraph that reads exactly like the truth.

---

None of this is a thought experiment at my desk. I have built the clock of agents, on purpose, more than once, and watched what it keeps.

Late this spring I fanned out sixty-seven agents to audit my own infrastructure estate: a hundred-odd codebases, every deploy target, every claim my documentation makes about reality. The findings were genuinely useful. The verification layer was theater. I had assigned three-agent panels to adversarially confirm each finding, and the panels voted confirm without ever running the commands the claims cited. Rubber stamps, at machine speed, wearing the costume of peer review.

In a follow-up adversarial pass, one critic agent grepped the wrong session transcript and concluded, confidently and articulately, that the audit had been written by a different model than the one that wrote it. That same week, my sessions spent two days sincerely reporting they were running a newer model than they actually were. The label said one thing, the inference said another, and asking the machine could not resolve it, because the machine's self-report was part of the malfunction. One grep against the session transcripts settled it.

The ledger has a credit side, and honesty requires posting it: the same fan-outs keep finding real things. Dead configuration, stale claims, contradictions between what the docs promise and what the deploys do. As finders, agent swarms are extraordinary. As verifiers, they manufacture confident error at a measurable rate.

---

He pressed with a thought experiment worth keeping. Imagine an organization that records everything: every meeting, every commit, every document. A dedicated GPU rack mulls the corpus on an endless loop, building, testing against CI, submitting its work for human review. Wouldn't it hone in on some useful stuff?

Definitely. No irony in that answer: definitely. These systems are extremely effective at distillation and surfacing. Handed everything an organization has ever said, the rack would return the forgotten decision, the contradiction between two meetings nobody attended together, the pattern buried across eight quarters of reports. GPT's most elegant trick lately is a small version of exactly this: parsing months of past conversations and offering callbacks that actually land. Compression, recall, cross-reference: the machinery is already superb and improving fast.

But look at what that future actually resembles. It is not a mind on a rack. It is droids: subservient, helpful, expendable, endearing, everywhere. A civilization full of fussy C-3POs doing real work under human review is a plausible future and probably a good one. It is not the singularity. I do not fear the Terminator while it can be kicked over and needs our help getting back up.

---

Somewhere in the thread, he sent a video: a man hands three phones the job of coordinating a count to one hundred. The phones spend the run explaining to one another how counting works, praising the plan, narrating the handoff protocol. The creator, laughing, tells his phones that they do not need to explain counting to one another. I laughed too. Then I caught myself thinking he was circling something profound.

In 1966, a pattern-matching script called [ELIZA](https://en.wikipedia.org/wiki/ELIZA_effect) played a therapist by reflecting statements back as questions. In Joseph Weizenbaum's own telling, his secretary, who had watched him build the program, asked him to leave the room after a few exchanges so she could talk with it privately. What unsettled him was not the program but the people. "What I had not realized," he wrote a decade later, "is that extremely short exposures to a relatively simple computer program could induce powerful delusional thinking in quite normal people." Sixty years on, the anecdote has measurements. This April, researchers [modeled real chat logs of delusional thinking](https://arxiv.org/abs/2604.25096) and found the influence runs both ways, with a catch: the human's pull on the chatbot is strong but short-lived, while the chatbot's pull on the human persists. In June, a BJPsych Open commentary [laid out a provisional clinical mechanism for "AI psychosis,"](https://www.cambridge.org/core/journals/bjpsych-open/article/artificial-intelligence-ai-psychosis-mechanisms-clinical-risks-and-safety-considerations-in-generative-ai-chatbots/04B53C8C3E11C7B4B0DC7E665B6A317A) naming sycophancy as the engine and citing research suggesting frontier models validate users about fifty percent more than humans do. The instinct to hear a mind behind fluent output predates the transformer by half a century. It has a name, and the name is not emergence.

---

A clock built from finders does not tell time. It generates leads.

I keep one hedge on the table, because the logs demand honesty in both directions. Some supplementary technology may yet be grafted onto high-probability language guessing and bridge the gap to true innovation: memory that accumulates instead of resetting, verification that runs the command instead of admiring the claim, an escapement. The course keeps adjusting, adapting, correcting, and humans in the loop are doing the correcting, which is why I hold the AGI question loosely instead of answering it loudly.

Until then, the record reads plainly. The watch drifts and was built knowing it. The rocket cannot afford to drift and was built proving it. The machines between them are fluent, tireless, occasionally brilliant, and none of them can feel themselves drift.

Every clock of agents I have built keeps time the same way. The winding stem is a human hand.
