---
title: "WHICH AI COUNTS"
date: 2026-07-20
confidence: 84
tags: ["systems", "sonic", "process"]
key_quote: "Four institutions drew the line, and a single honest record can land on a different side of each. They are not confused. They are answering different questions, and the checkbox is not asking any of them."
source_platform: "chatgpt"
id: 74
form: essay
draft: true
---

<div class="listen-player">
  <audio id="listen-audio" src="https://assets.travisbreaks.com/transmissions/074-which-ai-counts.mp3?v=4" preload="none"></audio>
  <div class="lp-head">
    <button class="listen-btn" id="listen-btn" onclick="lpToggle()" aria-label="Play narration">
      <svg class="listen-icon icon-play" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.5l10 5.5-10 5.5V2.5z"/></svg>
      <svg class="listen-icon icon-pause" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:none"><path d="M4 2h3v12H4V2zm5 0h3v12H9V2z"/></svg>
      <span class="listen-meta"><span>Listen</span><span class="listen-sep"> · </span><span class="listen-dur">~23 min</span></span>
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

A director tells a music supervisor: no AI. The supervisor has fifty tracks that already fit the brief and no reason to argue, so the fifty-first, made by someone doing the honest version, never gets played. The rule did its job. It never said what counted.

That is the whole tension. A production can ban generated lead vocals and mean something exact. "No AI," left undefined, treats a spectrum with no agreed edges as one thing, and it lands hardest on the one person who could have explained the difference.

Here is where the line actually falls, who is drawing it, and the one question that replaces the checkbox.

---

Start with the tools, laid along one line: how much of what a listener hears was performed, and how much was generated in its place. Consent, provenance, and control cross that line as the walk goes; performance is where the industry's own labels start.

At one end, prompt-to-song: type a sentence, receive a finished track. Suno and Udio live here. Nobody disputes this is generative. At the other end, a mastering assistant suggesting a compression curve, a pitch corrector nudging a flat note, a plugin cleaning a room's hum. Nobody seriously calls that "AI music," and the insides vary more than the word does: some of those tools carry models trained on other people's recordings, and some are plain signal mathematics with no training data at all. The label does not track the internals.

Between the poles, the ground gets soft fast.

Sampled orchestras. A composer writes for a string section no violinist played in the room, though violinists played every note of it once, into a sampling rig, years before this film existed. The purists can hear it; the audience mostly cannot. It is a fixture of modern scoring and almost never called AI. The absence of a violinist in the room does not settle what kind of performance this is.

Autotune. Melodyne. Pitch correction runs live to arena crowds, and nobody in the seats knows. The industry decided years ago this was singing: it corrects a human performance rather than generating one. That is a decision about where the line goes, not a discovery of where it sits.

Stem separation. Feed in a finished mix, get back the isolated vocal, clean. The Beatles used a machine-learning version to lift John Lennon's voice off a muddy 1970s demo and build a new arrangement around it; almost nobody objected, because the machine was restoration, and the source was unambiguously human.

Voice conversion over a human take. Someone sings the lead, then runs it through a model so the timbre comes back as a different voice. Melody, timing, phrasing, emotion: all human. Only the grain of the voice is swapped. This is the genuinely contested middle, and it is where a disclosed independent tends to live. Randy Travis, whose stroke took his singing voice, recovered a performance this way: a guide vocal sung by another person, converted to his timbre with models trained on his own catalog, then hand-refined. The Copyright Office registered the result: AI used as a tool, not to generate the expression. The machine was the instrument.

Next to that sits the modeled voice, and it is three machines under one name. Imogen Heap trained a private model on her own voice and ships disclosed records with it. Grimes released hers for anyone to sing through, with a royalty split. The consumer version keeps a captured voice private to its account, but the engine underneath has its own training history, a separate question from whose voice rides on top. I do a version of this myself: I sing the take, hand the system my own voice, and get it back as a different singer, a different register, a different instrument. The fear that built the voice rules runs through someone else's voice, taken without consent, and that fear is legitimate. A rule written to stop voice theft still ends up telling a singer their own voice is off limits.

Then the far end: the lead vocal itself generated, the whole track prompted into being. This is the obvious target of a ban.

And a single record can sit at several points on the line at once. I make tracks where the machine raps the verses: bars I wrote, delivered by a generated voice, because the young rapper I would rather record exists in my budget only as software. Then I sing the hook myself. Hip hop has had a shape for this for decades: the producer's record, one architect, other voices on the mic. A generated voice performing writing it did not do sits closer to a session performer than to a feature. Run the blend through the industry's own two-tier label, though, and the likely answer is the strict one: a generated lead vocal on the verses reads as AI-Generated under the standard's own examples, no matter who wrote the bars or sings the hook. That line was drawn at embodied performance, deliberately. I think it prices the writing at zero, and that is an argument worth having. But it is an argument with the standard, not a gap in it.

The tools do not sort into two bins. A record can occupy several points on the line at once, and the first sorting question is element-sized: for each thing a listener hears, was it performed by a person, or generated in place of one. Likeness, training data, and clearance follow.

---

Now the part that matters for anyone writing a policy: four different authorities have drawn the line, and every one of them drew it somewhere else.

The labeling bodies drew it at which elements the machine touched. In July 2026 a broad coalition, the recording-industry associations, the performers' union, the Grammys, agreed on two tiers. "AI-Generated" means the machine produced the entirety or the primary portion of the recording. "AI-Assisted" means humans performed the lead vocal and the primary instruments, and generative tools touched only some expressive elements. That is a real, usable distinction, and it is the industry's own answer: not a ban, a two-tier disclosure. It covers sound recordings only. It says nothing about AI in the lyrics, the composition, the artwork, or the video.

Copyright law drew it somewhere else entirely, at human authorship. The Copyright Office does not care which tool was used; it cares whether a human determined the expressive elements. Prompts alone are not enough, because the model fills the gaps and returns something different every time. But human editing, arrangement, and selection of machine output can carry authorship on the human-made layers. So one recording can hold protection in its written lyrics, its composed melody, its human performances, its arrangement and editing, while the purely generated material inside it is excluded: element by element, not layer by layer.

The detection platforms drew it at the fingerprint. One major streaming service runs a detector that flags fully machine-generated audio by its model signature, and identifies the signatures of the major generators by name. It reads the artifact, not the process. What it does with a hybrid, a human hook over generated verses, is not published; how far into a mix a signature survives is an open question worth holding open. What is published is enough for the point: the detector answers its own question from the audio alone, without asking anyone what happened upstream.

The metadata standards refused to draw a single line at all. The body that runs the industry's delivery plumbing declined the binary and built granular per-contribution disclosure instead: this vocal was human, that instrumental part was machine, and separately, may this recording be used to train future models. Two axes, not one switch.

These four lines do not coincide, and here is the important part: they are not rivals fighting over one definition. They are different institutions answering different questions. Take one track, hypothetical but assembled from the published rules: AI-Assisted to the coalition, protected by the Copyright Office only in its human-authored elements, a candidate for the detector's flag, disclosed five different ways in the metadata. Three answers, each correct on its own terms, and one open question, all at once. That is not confusion for better technology to fix. A checkbox borrows the word AI as if it names one thing; the institutions that actually govern it have already split it four ways. The divergence is the subject.

---

There is a fifth line, and the courts are drawing it case by case.

The question underneath the generative end of the spectrum is whether training on other people's recordings without a license is fair use. No American court has answered it for music. A German one has, under American law, and I will get to it. The nearest American ruling came from books: training on the books was held transformative, while the pirated library that fed it was a separate wrong, reserved for trial and settled for a billion and a half dollars before that trial ran. Suno's lawyers lean on that ruling. The labels lean on the difference every lawyer flags: a song generator sells into the same market as the songs it ate, and a chatbot does not sell books.

On July 31, 2026, the Munich Regional Court ruled largely for GEMA against Suno over six works, "Daddy Cool" and "Forever Young" among them, and Suno's versions 3.5 and 4. Because the training happened in America, the court applied American law to it and found no fair use on these facts, since the songs came back out in the outputs. Under German law the memorization inside the model and the outputs in Germany infringed too. Injunction, disclosure, damages, with scopes that differ by claim, and the judgment is not yet final. Six songs and two model versions do not settle the Massachusetts case, which runs to decisive motions in spring 2027, with a pending bid to expand it to sixty-one thousand recordings and theoretical damages past nine billion dollars. However the rest falls, the landscape moves. If training is fair use, the central theft claim collapses, though acquisition, outputs, and likeness all stay live questions. If it is not, statutory damages make unlicensed training ruinous, and licensed, owned, or opted-in data becomes the road, which is where the majors have already placed their bets. Either outcome lands a policy-writer in the same place: licensed, disclosed, documented. Neither outcome rescues the checkbox.

---

Which is why the checkbox cannot work. There is no coherent thing for it to check.

"Any AI, yes or no" fails in both directions. It answers yes for a record whose only machine was the mastering assistant working producers run every day, and it answers no for a prompt-generated track whose maker simply lied, because the form has no way to catch the lie. The honest maker over-discloses into the ban. The dishonest one under-discloses out of it. The rule filters for candor, not for craft, and candor is the wrong thing to filter for.

In the form's defense: intake declarations do real work. They obtain a representation, allocate responsibility, paper the clearance file. The failure is what this one asks: a yes-or-no about a category no two authorities define the same way. It manufactures assurance without information.

I have been on the other side of this form. On a documentary I worked on, the production wanted to be able to say that no AI was used, and that was a claim nobody could audit, because the standard tools carry machine learning inside them now and no certification tracks which cuts touched it. So the certification becomes a performance. The real instruction underneath it is never written down: get the paper to say no, and hope nobody checks. A rule that produces that instruction protects no one. It trains everyone to hide, and punishes the one who won't.

---

There is a better question. It costs more than the checkbox, and the cost is part of the case for it.

Not "any AI, yes or no." Instead: what did AI touch, and where are the receipts. Which elements were performed by a person, and where is the documentation. The receipts do not make the decision; a production still has to write its acceptance line: generated leads allowed or not, licensed models required or not, warranties, thresholds. What the receipts do is let that line be drawn about the actual record instead of about the word AI. They have an honest boundary: the maker's own process and licenses. What a foundation model was trained on is the vendor's homework, and no intake form reaches it. And the honest maker already has the answer: the session files, the stems, the dated notes, the disclosure filed with the distributor, the composition registered as partially AI with a performing-rights organization, which began accepting that in late 2025. For the maker who already documents, the cost is sunk. It lands on the maker who cannot show the work, which is where a cost belongs.

This is a higher standard than an undefined "no AI," not a lower one. "No AI" is unverifiable, which is why it collapses into don't-get-caught. "Show me what the machine touched" gives a production specific claims to check. Documentation can be incomplete or false; it still gives the reviewer more to examine than a ticked box, and it is what a film production needs anyway: the warranties a sync buyer signs run on documentation, licenses, chain of title, releases, and now an account of what generative tools touched. A checkbox nobody can audit adds little to that file. The receipts give the review something to stand on. The checkbox is set dressing.

---

The instinct behind "no AI" is not wrong. It is aimed at something real: the flood of prompt-generated slop, the scraped training sets, the acts that are pure machine with a fake name on top. That stuff exists, at scale. On one major platform machine-generated tracks are nearly half of daily uploads and a low single-digit percentage of actual listening, and a large share of even that listening is fraud. The instinct to keep that out of a film is sound.

The platforms police it accordingly: the biggest one removed more than seventy-five million spam tracks in a single year while declining to ban disclosed AI music. Fraud out, honesty tolerated.

But the flood and the disclosed human-led record are not the same thing, and a rule blind to the difference keeps out the wrong one. It waves through the liar who says nothing and stops the person who wrote it down. The maker who documents, discloses, and registers is the strongest argument that the tool can be used honestly, and the checkbox throws them out first, because they told the truth on the form.

The line is real, and drawing it is still the policy-writer's job. It just cannot be drawn blind, where "no AI" draws it. It has to be drawn over the answers to the one question the checkbox cannot ask: what did the machine touch, and show me. Everyone who has to write one of these policies is already trying to answer that question. They should ask it directly, and keep the door open for whoever can.

---

**Sources**

[Music community introduces new labeling program to distinguish generative AI in sound recordings](https://www.riaa.com/music-community-introduces-new-labeling-programto-distinguish-generative-ai-in-sound-recordings/) (RIAA/IFPI coalition, July 10, 2026)

[Copyright and Artificial Intelligence, Part 2: Copyrightability](https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf) (US Copyright Office, January 29, 2025; includes the Randy Travis registration)

[AI-generated tracks represent 44% of new uploaded music](https://newsroom-deezer.com/2026/04/ai-generated-tracks-represent-44-of-new-uploaded-music/) (Deezer, April 20, 2026)

[Deezer launches AI tagging system for music streaming](https://newsroom-deezer.com/2025/06/deezer-launches-worlds-first-ai-tagging-system-for-music-streaming/) (Deezer, June 2025)

[DDEX ERN 4.3.1 release notes: generative-AI disclosure flags](https://ern.ddex.net/electronic-release-notification-message-suite-part-1-definitions-of-messages/annex-a-%28informative%29-release-notes/) (DDEX)

[Warner Music Group and Suno forge groundbreaking partnership](https://www.prnewswire.com/news-releases/warner-music-group-and-suno-forge-groundbreaking-partnership-302626017.html) (November 25, 2025)

[Universal Music Group and Udio announce agreements for a licensed AI music platform](https://www.prnewswire.com/news-releases/universal-music-group-and-udio-announce-udios-first-strategic-agreements-for-new-licensed-ai-music-creation-platform-302599129.html) (October 29, 2025)

[ASCAP, BMI and SOCAN announce alignment on AI registration policies](https://www.ascap.com/press/2025/10/10-28-ai-registration-policies) (October 28, 2025)

[First AI-assisted song to win a Grammy award](https://www.guinnessworldrecords.com/world-records/775447-first-ai-assisted-song-to-win-a-grammy-award) (Guinness World Records, on "Now and Then")

[Spotify strengthens AI protections](https://newsroom.spotify.com/2025-09-25/spotify-strengthens-ai-protections/) (September 25, 2025)

[Auto-Tune patent US5973252A](https://patents.google.com/patent/US5973252A/en) (Hildebrand, 1997 lineage; autocorrelation pitch detection, no training data)

[Suno Voices help article](https://help.suno.com/en/articles/11362369) (voice capture and random-phrase verification)

[TuneCore partners with CreateSafe on GrimesAI](https://www.tunecore.com/press/tunecore-partners-with-createsafe) (authorized voiceprint and royalty split)

[Imogen Heap's AI voice model ai.mogen](https://musictech.com/news/music/imogen-heap-ai-voice-model-ai-mogen-karin-ann/) (MusicTech)

[Representations and warranties in sync licensing](https://thatpitch.com/blog/representations-and-warranties-in-sync-licensing/) (That Pitch)

[Bartz v. Anthropic: first court decision on the fair use defense in LLM training](https://www.wiggin.com/publication/bartz-v-anthropic-first-court-decision-on-fair-use-defense-in-llm-training/) (Wiggin and Dana)

[Why a fight over 61,000 recordings could shape the future of AI music licensing](https://www.musicbusinessworldwide.com/why-a-fight-over-61000-recordings-could-shape-the-future-of-ai-music-licensing/) (Music Business Worldwide)

[GEMA v. Suno, Landgericht München I, 42 O 763/25, judgment of July 31, 2026](https://www.gesetze-bayern.de/Content/Document/Y-300-Z-BECKRS-B-2026-N-17961) (official text; six works, Suno v3.5 and v4) and the [court's press release](https://www.justiz.bayern.de/gerichte-und-behoerden/landgericht/muenchen-1/presse/2026/16.php) (U.S. law applied to the U.S. training under the protecting-country principle; fair use rejected; judgment not final)
