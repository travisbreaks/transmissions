---
title: "THE FREQUENCY IS THE FORM"
date: 2026-01-07
confidence: 99
tags: ["sonic", "process", "systems"]
key_quote: "The creature is not animated. It is listening."
source_platform: "chatgpt"
id: 51
---

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
