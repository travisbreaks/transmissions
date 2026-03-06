---
title: "THE FREQUENCY IS THE FORM"
date: 2026-01-07
confidence: 96
tags: ["sonic", "process", "systems"]
key_quote: "The creature is not animated. It is listening."
source_platform: "chatgpt"
id: 51
---

<div class="listen-player">
  <audio id="listen-audio" src="https://assets.travisbreaks.com/transmissions/051-the-frequency-is-the-form.mp3" preload="none"></audio>
  <div class="lp-head">
    <button class="listen-btn" id="listen-btn" onclick="lpToggle()" aria-label="Play narration">
      <svg class="listen-icon icon-play" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.5l10 5.5-10 5.5V2.5z"/></svg>
      <svg class="listen-icon icon-pause" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:none"><path d="M4 2h3v12H4V2zm5 0h3v12H9V2z"/></svg>
      <span class="listen-meta"><span>Listen</span><span class="listen-sep"> · </span><span class="listen-dur">~13 min</span></span>
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

The creature is not animated. It is listening.

That sentence contains the entire architecture of audio-reactive design, and the reason most attempts at it fail. Animation is a timeline. Listening is a response. The difference is the difference between a screensaver and an organism.

---

The anemone project started as a technical question: can a Three.js geometry respond to music in a way that feels biological rather than mechanical? The answer required solving a signal processing problem first and a rendering problem second.

Web Audio API provides the signal path. An AnalyserNode decomposes incoming audio into frequency bins via FFT (fast Fourier transform), 1024 samples at 44.1kHz, which gives 43 hertz of resolution per bin. Raw audio is a waveform. Decomposed audio is a spectrum. A spectrum can be routed.

The routing is where the design happens.

Bass frequencies (bins 1 through 5, roughly 43 to 215 hertz) drive vertex displacement on the icosphere geometry. This is where kick drums live, where sub-bass fundamentals push air. When the bass hits, the sphere bulges. Not because someone keyframed a bulge animation, but because the actual acoustic energy in that range is being mapped to spatial coordinates in real time.

Mids (bins 5 through 40, 215 to 1720 hertz) drive individual tentacle variation. This is melodic content, synth body, the warm center of most music. Each tentacle gets its own variation boost at 3.5x reactivity, so the mids produce differentiation: tentacles moving independently rather than in unison.

Treble (bins 40 through 120, 1720 to 5160 hertz) drives flutter. Hi-hats, presence, sparkle. The high-frequency content produces rapid small movements, the shimmer that makes the creature feel alive between the big bass hits.

Three frequency bands. Three behavioral responses. Bulge, differentiate, shimmer.

---

The raw FFT data is noisy. Frequency analysis at 60 frames per second produces jitter that would make the geometry twitch rather than breathe. The smoothing layer is what separates a tech demo from something that feels like it has a nervous system.

Each frequency band gets its own lerp rate. Bass smooths at 0.14 (slightly faster rise, because kick drums need to land). Mids at 0.12. Treble at 0.15. These are not round numbers chosen for convenience. They were tuned by watching the creature respond to dozens of tracks until the movement felt right, which means: until the lag between hearing a sound and seeing its effect matched what a body would do.

The smoothing time constant on the AnalyserNode itself is set to 0.82. That number produces what I think of as a heavy liquid feel. The spectrum does not snap to new values. It flows toward them. The creature is always slightly behind the music, always catching up, and that lag is what makes it feel like it is reacting rather than being driven.

---

The most important architectural decision in the system is one that has nothing to do with frequency analysis. It is the heat integrator.

Heat is a single floating-point value that accumulates energy over time. Every frame, the overall energy (bass weighted at 0.4, mids at 0.35, treble at 0.25) gets folded into the heat value. Heat rises when the music is loud and decays when it is quiet.

The system has three behavioral stages gated by heat:

Below 0.3: dormant. The creature sways gently but does not react to beats. It is asleep.

Between 0.3 and 0.7: reactive. Bass shove engages. The geometry responds to kick drums with visible displacement. Tentacles begin to differentiate. The creature is awake.

Above 0.7: overdrive. Full shake, jitter, maximum displacement. The creature is not just reacting to the music. It is being overwhelmed by it.

These thresholds produce emergent behavior that no amount of keyframed animation could replicate. Play a quiet ambient track and the creature barely moves. Play a dubstep drop and it thrashes. Play something that builds slowly and the creature wakes up gradually, crossing thresholds at moments the listener can feel but did not predict. That unpredictability is the point. The system is not performing. It is processing.

---

Transient detection adds a fourth layer. A transient is a sudden spike in energy, typically a kick drum or a snare hit. The system detects transients by comparing the current bass level to the previous frame. If the delta exceeds 0.08, a transient flag fires.

Transients punch through the smoothing. While the lerp rates keep the general movement fluid, a transient produces an immediate flash: the shader drives the tip color bright, the fresnel rim scales up, the geometry jolts. This is the equivalent of a flinch. The smoothing says "move like a body." The transient says "but flinch on impact."

The fragment shader uses energy-driven color rather than height-driven color. A silent creature is its base color. A loud creature shifts toward tip color across its entire surface. The color does not depend on where a vertex sits in space. It depends on how much acoustic energy is flowing through the system. The creature does not look different when it moves. It looks different when it hears.

---

The designer chooses which frequencies to route where. Bass to displacement. Mids to variation. Treble to flutter. That selection is the creative act. A different routing produces a different creature. Route bass to color instead of displacement and the creature pulses rather than bulges. Route treble to scale and it shimmers in size rather than surface. The bins are the same. The routing is the composition.

The mixing board metaphor from 044 was not a metaphor. The AnalyserNode is a mixing board. The shader uniforms are the channel strips. The lerp rates are the faders. The heat integrator is the compressor. Every piece of audio engineering vocabulary maps directly onto a piece of the rendering pipeline, because they are solving the same problem: how to route a signal through a system that responds in a way the audience can feel.

---

There is a practical discipline here that matters more than the philosophy.

The GainNode sits between the audio source and the analyser. It enables click-free fade in and fade out, because connecting or disconnecting an audio source directly produces a pop. The smoothing constant of 0.82 prevents the creature from twitching on quiet passages. The lerp rates prevent it from lagging on loud ones. The transient threshold of 0.08 is high enough to ignore noise but low enough to catch every kick drum.

These numbers are not pretty. They are what survived the tracks. They were found by iteration, by playing track after track and watching the creature until its movement stopped being distracting and started being inevitable. That process, tuning parameters until a system feels alive, is the actual work of audio-reactive design. The FFT decomposition is free. The Web Audio API hands it to anyone who asks. The design is in the routing and the smoothing and the thresholds, in the decisions about which signals to amplify and which to suppress.

The creature is not animated. It is tuned.

---

The somatic architecture described in Transmission 050 (the gold slashes, the opacity decay at 0.94 per frame, the interface that scars on contact) depends on this signal processing substrate. Without frequency decomposition, the sphere is just a sphere. Without smoothing, the response is noise. Without heat gating, there are no behavioral stages. Without transient detection, there are no flinches.

The body that 050 describes requires the nervous system that 051 documents. Sensation without processing is pain. Processing without sensation is a spreadsheet. The creature needs both: the raw signal and the discipline to route it.

That is what the Web Audio API provides. Not sound. Signal. And signal, routed with discipline, becomes form.

The frequency is the form.

<div class="ep-block">
  <a href="https://travisbreaks.org/research/anemone-chorales/" target="_blank" rel="noopener" class="ep-link">
    <img src="https://assets.travisbreaks.com/transmissions/anemone-chorales.jpg" alt="Anemone Chorales" class="ep-art" />
    <div class="ep-info">
      <span class="ep-title">ANEMONE CHORALES</span>
      <span class="ep-meta">Audio-reactive Three.js creature</span>
      <span class="ep-cta">&#8594; View the live project</span>
    </div>
  </a>
</div>

<style>
  .ep-block {
    margin: 1.5rem 0 2.5rem 0;
  }
  .ep-link {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 0.9rem;
    padding: 0.65rem 1.1rem;
    background: rgba(120, 220, 255, 0.02);
    border: 1px solid rgba(120, 220, 255, 0.12);
    border-radius: 8px;
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .ep-link:hover {
    border-color: rgba(120, 220, 255, 0.35);
    background: rgba(120, 220, 255, 0.05);
  }
  .ep-art {
    width: 56px;
    height: 56px;
    border-radius: 6px;
    object-fit: cover;
    opacity: 0.85;
    transition: opacity 0.2s;
  }
  .ep-link:hover .ep-art {
    opacity: 1;
  }
  .ep-info {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }
  .ep-title {
    color: rgba(120, 220, 255, 0.85);
    font-size: 0.82rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-family: var(--font-code, monospace);
    font-weight: 600;
  }
  .ep-meta {
    color: rgba(120, 220, 255, 0.35);
    font-size: 0.68rem;
    letter-spacing: 0.06em;
  }
  .ep-cta {
    color: rgba(120, 220, 255, 0.55);
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    margin-top: 0.1rem;
    transition: color 0.2s;
  }
  .ep-link:hover .ep-cta {
    color: rgba(120, 220, 255, 0.9);
  }
</style>
