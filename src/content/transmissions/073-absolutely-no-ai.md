---
title: "ABSOLUTELY NO AI"
description: "A film gig closed by a one-bit rule, the settlements already dissolving it, and why a policy that cannot read punishes the maker who documents and rewards the one who lied."
date: 2026-07-20
confidence: 88
tags: ["systems", "sonic", "process"]
key_quote: "A rule that cannot tell an instrument from a forgery will ban the instrument every time, and keep the forger who lied on the intake form."
source_platform: "chatgpt"
id: 73
form: essay
---

<div class="listen-player">
  <audio id="listen-audio" src="https://assets.travisbreaks.com/transmissions/073-absolutely-no-ai.mp3?v=4" preload="none"></audio>
  <div class="lp-head">
    <button class="listen-btn" id="listen-btn" onclick="lpToggle()" aria-label="Play narration">
      <svg class="listen-icon icon-play" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.5l10 5.5-10 5.5V2.5z"/></svg>
      <svg class="listen-icon icon-pause" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:none"><path d="M4 2h3v12H4V2zm5 0h3v12H9V2z"/></svg>
      <span class="listen-meta"><span>Listen</span><span class="listen-sep"> · </span><span class="listen-dur">~14 min</span></span>
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

A friend was sourcing music for a film and could not use mine, because someone above him had set the policy: absolutely no AI.

It stung twice. Once as a person, because the rule reached me through a friend, and a policy in a friend's mouth still closes like a door. And once as a builder, because the rule that closed the door cannot read. It does not know how I work, though I publish that in plain language at a public URL. It does not know what "AI in the workflow" means on my records versus someone else's. It reads a checkbox, and a checkbox has one bit of resolution.

One sentence holds the whole problem. The rest is what the checkbox cannot see.

---

Here is what "AI in my workflow" actually means, because the phrase has been flattened into something it is not.

The process runs in five stages: words, instruments, arrangement, mix, master. Suno and the other generative systems enter as instruments in the rack, and I do not police which stage the instrument touches. A tool that suggests a chord voicing or an arrangement is still an instrument. Splice ships one that proposes progressions; Output's Arcade generates and mangles loops on the fly. Nobody discloses those, because a device that helps with the composing is a device, not a co-author. The generative tools sit in that same rack. Voice modeling, phrasing, cadence. Trying a different vowel sound, take after take, the way a session singer would if I could afford twelve of them for an afternoon. That is a substitution, and I will name it instead of hiding it: the software iterates where hiring was never in the budget. Then the material comes into Ableton and gets treated like any other raw take: dissected, recombined, re-performed, comped, mixed against the bias I know I build toward my own records, mastered one track at a time.

Generative AI does not finish records here. It hands over raw material: performance iterations, happy accidents, parts to cut apart, and a steady supply of examples of what not to do. Humans own the composition and the final decisions; what the machine contributes arrives as material and survives only as a choice somebody made. My label ships a plain-language account of where the machine entered and what stayed authored by a person, and the human-written elements are registered with the PROs the same as any other song.

None of that survives contact with "absolutely no AI." On or off is all the rule can hold. It cannot distinguish the producer who logs every iteration and discloses it from the one who generated a full track, changed the file name, and swore on the intake form that no machine was involved.

A rule that cannot tell an instrument from a forgery will ban the instrument every time, and keep the forger who lied on the intake form.

---

I understand where the rule comes from. Not stupidity: triage under legal fear, and the fear has real court dates attached.

The record labels sued the two big generative-music companies on June 24, 2024. Universal, Sony, and Warner against Suno in federal court in Massachusetts. A parallel case against Udio in New York. The complaints were not subtle: they alleged the models were trained on copyrighted recordings without a license, at industrial scale.

Then the settlements started. Universal settled with Udio on October 29, 2025. Warner was the first major to settle with Suno, on November 25, 2025. The closed deals rhyme rather than repeat: drop the suit, license the catalog, build the next platform on authorized data. Warner's deal retires Suno's current models and gives the label's rostered artists an opt-in on voice and likeness; Universal's walls Udio's old product into a garden while the licensed one gets built. New revenue where there was a lawsuit.

Look at what that deprecation sits on. Suno had already told the court, in its own filing, that the model trained on tens of millions of recordings, presumably including the plaintiffs'. Now the deal retires those models and trains the next ones on licensed data, and reporting on leaked code this month described scraped streaming audio among the earlier sources. The machine that could not be licensed is being retired and rebuilt clean. The tool does not stop existing. It gets a receipt.

Independents are not party to any of these deals; the opt-ins the settlements built are for label rosters. The settlements protect the catalog. They were not built to protect the person at the entry point, which is worth saying plainly rather than resenting quietly.

Sony and Universal have not settled with Suno; that case is still live in Massachusetts, with the deciding motions not due until 2027. Suno's defense is that training on music is fair use, and it points at the case everyone in my position has already heard about.

---

The case is Bartz v. Anthropic, and it did not end the way the panic wanted it to.

In September 2025, Anthropic settled the authors' class action for one and a half billion dollars. Roughly three thousand a book, across nearly half a million titles. The headline wrote itself: they stole the books, they paid for it, move on.

The ruling underneath the settlement is the part nobody quotes. On June 23, 2025, before the money, the judge split the question in two. Training the model on the books was ruled transformative. Fair use. Legal. The pirated library was the other half: Anthropic had also downloaded copies it never paid for and kept them as a library, and the judge refused to call that fair use. He called it theft, and reserved those copies and the damages for trial. The settlement avoided the scheduled trial. But the shape of the ruling is clear enough: in that courtroom, the training was not the sin. The stealing to obtain the training material was.

One district court, one medium: books, not music. The labels argue the reasoning may not transfer, because a music model's outputs compete with the recordings it trained on in a way a chatbot's do not. Maybe so. The distinction still stands, and the blanket rule cannot hold it. "They stole the books" is half of what the court found. The other half is that how the material was obtained is one legal question and what the model does with it is a separate one. A single bit cannot carry a two-part holding.

---

We have watched this movie before, and we already know the ending, because the credits ran in the nineties.

When digital sampling arrived, the position was nearly identical. Absolutely no sampling. It was theft, it was lazy, it was the death of musicianship, and it generated a decade of lawsuits that a producer could lose a career inside. Then the licensing frameworks got built. Sample clearance became a line item. The panic did not win and it did not lose. It got metabolized into paperwork, and the sampler became an instrument that nobody flinches at, sitting in the same rack as the ones that were once going to end music.

There is an asymmetry inside that history that the panic never mentions. The producer at the entry point half hopes a famous act lifts something of theirs, because the lift is a lottery ticket: exposure, a licensing check, sometimes a settlement worth more than the whole catalog. The same lift running the other way draws a cease and desist. The crime was never the copying. It was copying upward. The training sets ran that asymmetry at industrial scale: the models copied everything in reach, the majors negotiated their price, and the entry point got scraped for free.

The arc rarely varies. Outrage, lawsuit, settlement, license, normalization, forgetting. The moral certainty burns hottest right before the checks clear, and it fades the moment there is a compliant way to pay. I do not say that with any joy. I say it because it is what the record shows every time, and pretending this cycle is the exception is how a person ends up on the wrong side of a rule the industry's own settlements are already dissolving.

---

Which is what stings about the closed door.

The rule is temporary. It is the sampling panic on its second lap, and it is already dissolving in the exact courtrooms that are supposed to be justifying it. Watch the top of the industry and the direction is not toward a ban. It is toward licensed and disclosed. Give it a few settlement cycles and "absolutely no AI" softens into "disclose the AI," and disclosure is the thing I already do, unprompted, on a public page, because I decided the honest version was worth building before anyone required it.

That is the part the checkbox punishes. Right now, the producer hiding it and the producer documenting it look identical to the rule, except the one documenting it is easier to catch. Transparency reads as confession. The intake form rewards the person who says nothing, and the whole equilibrium reduces to a single instruction the industry already whispers to itself: just don't get caught.

So I did the only thing that stays true regardless of how the court rules. I kept the paper trail. When the rule finally learns to tell an instrument from a forgery, the log will already be there, timestamped, from back when disclosing cost a door instead of opening one.

The machine did not take the work. A rule that could not read did.

---

**Sources**

[Record companies bring landmark cases against Suno and Udio](https://www.riaa.com/record-companies-bring-landmark-cases-for-responsible-ai-againstsuno-and-udio-in-boston-and-new-york-federal-courts-respectively/) (RIAA, June 24, 2024)

[Suno's answer to the copyright complaint](https://www.musicbusinessworldwide.com/files/2024/08/SUNO-response-to-copyright-suit.pdf) (filed August 1, 2024; the training admission)

[Universal Music Group and Udio announce agreements for a licensed AI music platform](https://www.prnewswire.com/news-releases/universal-music-group-and-udio-announce-udios-first-strategic-agreements-for-new-licensed-ai-music-creation-platform-302599129.html) (October 29, 2025)

[Warner Music Group and Suno forge groundbreaking partnership](https://www.prnewswire.com/news-releases/warner-music-group-and-suno-forge-groundbreaking-partnership-302626017.html) (November 25, 2025)

[Why a fight over 61,000 recordings could shape the future of AI music licensing](https://www.musicbusinessworldwide.com/why-a-fight-over-61000-recordings-could-shape-the-future-of-ai-music-licensing/) (Music Business Worldwide)

[Hack reveals Suno AI music generator scraped YouTube, Deezer, and Genius](https://www.404media.co/hack-reveals-suno-ai-music-generator-scraped-youtube-deezer-and-genius/) (404 Media, July 2026; original reporting on the leaked code)

[Hack suggests AI music generator Suno scraped YouTube for training data](https://techcrunch.com/2026/07/15/hack-suggests-ai-music-generator-suno-scraped-youtube-for-training-data/) (TechCrunch, July 15, 2026; corroborating coverage)

[What authors need to know about the Anthropic settlement](https://authorsguild.org/advocacy/artificial-intelligence/what-authors-need-to-know-about-the-anthropic-settlement/) (Authors Guild)

[Bartz v. Anthropic: first court decision on the fair use defense in LLM training](https://www.wiggin.com/publication/bartz-v-anthropic-first-court-decision-on-fair-use-defense-in-llm-training/) (Wiggin and Dana)

*Correction, September 7, 2026: an earlier version of this piece said the court had left the piracy question unanswered and that "they stole the books" was not what it found. The June 23, 2025 order denied fair use for the pirated library, called it theft, and reserved those copies and the damages for trial; the training holding was not limited to lawfully acquired books. The two paragraphs on the ruling were rewritten and re-narrated the same day.*
