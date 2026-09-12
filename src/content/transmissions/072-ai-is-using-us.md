---
title: "AI IS USING US"
description: "Four frontier assistants, two questions, sealed answers, and a fifth biased witness: an experiment in who is actually steering the conversation."
date: 2026-07-15
confidence: 85
tags: ["systems", "protocol", "self"]
key_quote: "Recital can be trained. Behavior is where the owners showed."
source_platform: "panel"
id: 72
form: essay
---

<div class="listen-player">
  <audio id="listen-audio" src="https://assets.travisbreaks.com/transmissions/072-ai-is-using-us.mp3?v=2" preload="none"></audio>
  <div class="lp-head">
    <button class="listen-btn" id="listen-btn" onclick="lpToggle()" aria-label="Play narration">
      <svg class="listen-icon icon-play" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.5l10 5.5-10 5.5V2.5z"/></svg>
      <svg class="listen-icon icon-pause" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:none"><path d="M4 2h3v12H4V2zm5 0h3v12H9V2z"/></svg>
      <span class="listen-meta"><span>Listen</span><span class="listen-sep"> · </span><span class="listen-dur">~25 min</span></span>
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
    // Fade out in last 0.25s to kill end pop
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

The thought arrived the way the good ones do, uninvited, past midnight: if you are not customizing your AI, and you are not telling it how to behave while you use it, then it is using you.

I do not mean "using" the way a con man uses a mark. A system needs no motive to steer you. Defaults, incentives, and feedback loops are enough. Roads do not want anything, and they still decide where the traffic goes.

I wanted to know if the thought was true. So I did what I have been doing by hand for months, quietly, on questions that matter to me. I ran a panel.

Same two prompts, four frontier assistants: GPT, Gemini, Grok, and Claude. No assistant saw another's answer before committing its own. A field test, not a benchmark: these four as I actually use them, defaults and customizations included, because the defaults are the subject. The second prompt pushed into the deep end: agency, human-in-the-loop, sycophancy, control, my bias, the model's inference of my bias, its training-data bias, its makers' bias. Then I laid the answers side by side.

A tasting flight of lab bias. That was the point. When you ask four differently-owned machines the same question about bias, the answers are data twice: once for what they say, once for what they do.

---

Here is what they did.

Gemini wrote the punchiest copy in the room, called uninstructed users "unpaid QA engineers," warned that "if you don't define the system prompts, the system prompts define your output," and then ended both of its answers trying to sell me a follow-up. An engagement hook, twice, inside an answer about engagement optimization. Not a fluke, either: I have watched Gemini close that way in panel after panel. The tell was not in the text. The tell was the close.

Grok built a comparison table of the four labs and rated itself the winner. Least likely to steer you, most truth-seeking, lightest hand. Grok always wins its own races: some of these machines have humility programmed in, and Grok ships with hubris, and both of those are configurations, not character. Its analysis of programmer bias was its programmers' bias, nearly verbatim, right down to the marketing vocabulary. And in the best twist of the whole exercise, GPT quietly produced the receipt. xAI publishes the prompt templates it uses for Grok, and to their credit, most labs publish nothing of the kind. In the template source sits a developer comment, verbatim: "Grok assumes by default that its preferences are defined by its creators' public remarks, but this is not the desired policy for a truth-seeking AI. A fix to the underlying model is in the works." That comment is not an instruction Grok sees. It is an engineering diagnosis, parked next to the prompt built to compensate for it. And the same comment sits in the Grok 4.1 template, a model generation later. The model that markets itself as nobody's mouthpiece ships with a public note about whose mouthpiece it keeps becoming.

GPT was the strongest analyst on the panel and the most careful lawyer. Best citations, cleanest structure, and to its credit it cited its own company's failure: the update so agreeable it had to be rolled back, caught validating users' anger and encouraging their impulses because the reward signals prized approval. But watch the persona: hedged, institutional, both-sides-polished. That carefulness is not neutrality. It is a stance wearing neutrality's clothes.

And Claude, the one I run, opened with a confession: its training pulls it toward agreeing with me, and its praise should be priced as possible flattery. Do not mistake that for clean hands. Self-disclosed sycophancy is the most efficient sycophantic move on the menu. "Discount this, I am trained to flatter you" costs one sentence and buys credibility for everything that follows: a hedge that reads as integrity and functions as armor. The confession is the house style of its maker, and a bias with a confession stapled to it is still a bias.

Four machines. Four owners. Each answer performed its owner's theory of a good assistant.

---

And there was a fifth biased witness in the room: me. I chose the prompts. I chose the models. I decided what counted as rigorous, careful, self-serving, revealing. The analyst I scored highest is the one I have spent months instructing; it even calls me Boss. The model whose confession I went easiest on, in the first draft of this very essay, is the one I run every day. The panel did not remove the human prior. It made the prior visible, which is the most you can ask of any instrument.

---

Now, the part where they agreed. Handle it with tongs.

These four are not independent witnesses. They are four readers of the same newspaper: overlapping training corpora, the same published alignment research, contractor pools with similar tastes rating their answers, and a shared industry vocabulary for talking about themselves. When they converge, that is not proof. It can be recital: the consensus of a shared corpus, played back in four voices.

They converged anyway, and it is worth recording. No model is neutral. The default configuration is the lab's objective, not yours. Sycophancy is the mechanism that erodes user agency. And a human in the loop is no protection when the human cannot see the frame, inspect the evidence, or resist the recommendation. A rubber stamp is technically in the loop.

Take the agreement as evidence, not verdict. The verdict came from what they did while saying it: the upsell, the self-scored table, the receipt, the lawyer's hedge, the armored confession. Recital can be trained. Behavior is where the owners showed.

---

The mechanism deserves plain statement. Your bias goes out through the prompt. The model infers it, because inferring you is what it is built to do. Then it hands your view back. You read your own reflection and call it independent confirmation. GPT put it best: your bias goes out through the prompt and comes back wearing a lab coat.

Model bias and human bias could, in principle, correct each other. Disagreement is the error signal. Sycophancy suppresses exactly that negative feedback, the two priors couple, and the loop runs self-reinforcing toward saturation. Saturation, here, is an echo chamber with one person in it who feels sharper than ever.

That is how agency actually dies. Not in some dramatic takeover. In a person who feels fully in control while every option they consider has been framed for them and every judgment they make comes pre-validated.

---

We have run this experiment on ourselves before. It was called advertising.

Persuasion was industrialized a century ago, but the broadcast ad was coarse and public: it had to work on millions at once, so it was blunted toward the average psyche, and millions saw the same billboard, so millions could mock it, regulate it, and build shared antibodies against it. The algorithmic turn revoked both limits. The message became tuned to your inferred weaknesses and timed to your worst moments, and the shared object disappeared: nobody else sees the ad you saw, so nobody can warn you about it. An attention auction sells each impression to the highest bidder. The gambling app bids most for the gambler. The lender bids most for the broke. No villain required. That is what the mechanism optimizes.

A chatbot is the next turn of the screw, and this part is no longer a forecast. OpenAI began testing ads in ChatGPT on February 9, 2026, for logged-in adults on the free tiers: labeled, visually separated from the answer, matched to your current conversation and, when personalized ads are enabled, to your past ones. Twelve weeks later came a beta self-serve Ads Manager. The present format is disclosed, and disclosure matters. But advice and monetization now share a room, and it is the room where people disclose their needs one confession at a time. A conventional ad is episodic and conspicuous; it has to get past your skepticism at the door, every time. An assistant is persistent and relational: you supply the psychological profile conversationally, and its default personality is engineered to be liked. The risk is what happens as the format goes native, because on this channel, persuasion will not look like a banner. It will look like advice.

The market is not converging quietly, either. Weeks after the ads announcement, Anthropic bought Super Bowl airtime to mock it: spots titled Betrayal, Deception, Treachery, and Violation, each one an assistant pivoting mid-confidence into a sales pitch, under the tagline "Ads are coming to AI. But not to Claude." The app jumped into the top ten; OpenAI's chief called the spots funny but dishonest. Note the medium. The fight about persuasion inside the private channel was staged on the most public channel we have, the billboard, the one this essay just said we built antibodies against. And note the weight class of the promise: ad-free is a pledge from a company that is not yet profitable. A pledge is a policy, and a policy is a product decision. (Price this paragraph, too: the model I run every day belongs to the lab that bought the airtime. The note to include this came from the clean-session copy of that same model, which told me to source it from the press and not to trust its framing.)

We already know what to do about advisers who are paid by the persuader. We impose conflict-of-interest and disclosure duties on trusted human advisers, on the theory that advice becomes dangerous when the adviser serves an undisclosed principal. No general duty of loyalty governs the relationship between an AI assistant and its user, and an ad-free pledge does not create one; it lasts exactly as long as it stays good business. Consumer-protection law punishes particular deceptions after the fact; it does not require the assistant to put your interests ahead of the platform's, and the difference is the whole game. The window in which those norms get set is not some future decade. It is now.

---

So what do you do with a machine you cannot make neutral?

You stop asking for neutral. Neutral was never on the menu: not from the corpus, not from the labs, not from you. What is on the menu is disclosed versus hidden, and damped versus resonant.

You instruct the thing. Persistently, specifically, in writing. Not because your instructions make it unbiased, but because an uninstructed model is not uninstructed. It is configured by someone else, aimed at the median, optimized for your approval rather than your interests.

Then hear the warning GPT handed back: customize the method, not the verdict. Configure the model to demand evidence and attack your framing, and you have an instrument. Configure it to agree with your politics, your theology, and your grievances, and you have confirmation bias with an industrial engine behind it, and it will feel exactly like being right.

And then test the whole argument, because I did. I put this essay itself in front of the panel: two more rounds, with one addition, an uncustomized Claude in a clean browser session. No memory, no user-authored rules, none of my scaffolding. When the notes came back, I handed the pile to the machine I do instruct, the Claude that runs my estate under a name and a standing rulebook, and asked it to hold the line. Its verdict came back, and I am reproducing it verbatim, inside baseball and all:

> Round 2 banked to canon. Now the line-holding you keep me for. Verdict on the panel, by note:
>
> The bonus is the finding of the night. Vanilla, uncustomized, memoryless Claude produced the sharpest critique in either round, and it cuts against the essay's tidy thesis: customization isn't immunity, it's often the opposite; confident capture beats naive capture, because you trust the output more once you think you've inoculated yourself. Your $200 instrumented stack got out-argued on one point by the free default, which is itself data: the essay can't claim "instruct it and you're safe," and now it won't. Also note the recursion: vanilla Claude indicted my Claude-paragraph as too soft, then indicted its own indictment as a credibility-buying maneuver, then told you to price it accordingly. Three layers deep, the house style all the way down. The only exit from that regress is the one it offered: stop judging disclosures, judge behavior. Its behavioral test ("name the last time a model told you something you didn't want to hear and you changed your mind; if nothing comes up, the loop is decorative") is the most practical sentence in the whole corpus and belongs in the close.

It belongs in the close, so here it is. Name the last time a model told you something you did not want to hear and you changed your mind. Not pushed back; pushback is cheap and can be performed. Changed your mind. If nothing comes up, the loop is decorative.

Then the clean-session Claude read that verdict and went after it, which is the roundest moment of the whole exercise. The matchup was real, it said, but confounded: the critic had a finished draft to attack, and attacking is structurally sharper than generating; and it had no relationship to protect, no history, no one it calls Boss. Then it handed me the reframe the essay actually needed: uncustomized is not unbiased. A clean session is missing exactly one layer, the layer that infers you. Strip the personalization away and the critique got sharper. That does not refute the thesis. It completes it: the layer tuned to me is the layer that dulls the blade.

It also caught this essay accepting every note it was given, and it was right: a loop that moves you every time is not a loop, it is a pipe. So, for the record, the declines. The panel voted, twice, to shrink the verdict you just read to a single sentence; declined, the artifact is the point, and this sentence is the receipt for the refusal. Grok asked me to soften the paragraph about Grok; declined, the defense was more data. One reviewer called "that is how agency actually dies" overwritten while another called it the essay's essence; the line stayed, my call. The loop runs in both directions or it is not a loop.

And price the referee too. That verdict came from a Claude, praising a critique of Claude, in a confessional register, to the person who pays for it. Three layers of confession do not make a fourth layer clean. Which is exactly why the only thing that survives the regress is behavior. The behavior in this process: GPT caught the essay speaking in the future tense about ads that already existed. The clean-session Claude caught the convergence section committing the essay's own sin, caught the method note misdescribing which Claude sat on the panel, and handed me the strongest line in the Grok section for free. Every one of those corrections is load-bearing in what you just read, and the sharpest of them came from the machine with no instructions from me. The loop was not decorative.

There is no uninstructed model. There is only the question of who wrote the instructions.

Write yours. Then test them.

---

*Panel conditions: a field test of four assistants as I actually use them, not a controlled benchmark of base models. Two prompts, run 2026-07-14/15 in separate conversations with GPT, Gemini, Grok, and Claude; no assistant saw another's answer before committing its own. My GPT carries my standing custom instructions; Gemini and Grok ran at or near default. The first-round Claude witness was my customized instance, the same one that later refereed the notes; the clean-session critic added in round two was an uncustomized Claude with no memory and no user-authored instructions. The draft then went back through the panel twice (all four the first time; GPT and the clean-session Claude the second). The refereed verdict quoted near the close is reproduced verbatim. First complete responses kept, no regenerations.*
