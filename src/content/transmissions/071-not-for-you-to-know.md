---
title: "NOT FOR YOU TO KNOW"
description: "A sermon, a Bible machine, and the discipline of refusing the clock."
date: 2026-07-12
confidence: 84
tags: ["protocol", "systems", "void"]
key_quote: "We mistook higher resolution for a nearer end."
source_platform: "claude"
id: 71
---

<div class="listen-player">
  <audio id="listen-audio" src="https://assets.travisbreaks.com/transmissions/071-not-for-you-to-know.mp3" preload="none"></audio>
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


The preacher said we are at the end of the end times. The machine I built to study scripture is forbidden, by a constitution I wrote, from telling me whether he is right.

That is the collision. What follows is the audit.

---

Jesus was asked for the schedule three times, on the record.

Asked for the day and hour: of that day and hour knoweth no man (Matthew 24:36). Mark's account preserves the harder clause, the one the early church had little reason to invent: neither the Son (Mark 13:32). Asked at the ascension whether the kingdom was coming now: it is not for you to know the times or the seasons (Acts 1:7). Asked by the Pharisees when: the kingdom of God cometh not with observation (Luke 17:20).

He did not leave a void where the date belonged. He left a command. Watch therefore: for ye know not what hour (Matthew 24:42).

And to be fair to the sign-readers, the same discourse points at a fig tree: when ye shall see all these things, know that it is near (Matthew 24:33). The text permits recognition. What it refuses is the conversion of recognition into a timetable. A season is not a schedule. Discernment is not chronology. Calculation turns readiness into schedule management. Watchfulness declines the bargain and stays awake anyway.

---

The church has run the experiment for twenty centuries, and the ledger reads like a relapse history.

Some in Thessalonica were shaken by reports that the day had already arrived; settling them down took two letters that are now scripture. William Miller read Daniel and pointed tens of thousands of Americans at October 22, 1844. The morning after is still called the Great Disappointment. Harold Camping put May 21, 2011 on billboards, then ruled it an invisible judgment and pointed everyone to October. Augustine had already called the computation vain in the fifth century, writing while the Roman world came apart around him. The church took the correction, held it for centuries, forgot it, calculated again.

Calculate, fail, repent, forget, repeat. Anyone who has sat in a recovery room knows that ledger by heart.

The books being mined for dates were not written as calendars. Critical scholarship puts Daniel under Antiochus and reads Revelation's Babylon as Rome. Apocalypse means unveiling. These books were written to sustain people under pressure, not to hand distant readers a countdown. Literature written as comfort for the desperate gets preached now as urgency for the comfortable.

---

So what changed, that a serious room full of serious people can be told this is finally it, and nod?

Not the signs. Wars, famines, false messiahs, strange weather. Name a century that lacked them. And here is the part the sermon skipped: on the axes it gestures at, the dials mostly point the other way. A child born today is [likelier to reach five](https://ourworldindata.org/child-mortality) than at any point in recorded history. Famine kills a [smaller share of the species](https://ourworldindata.org/famines) than it ever has. Extreme poverty went from most of humanity to [around a tenth of it](https://ourworldindata.org/extreme-poverty) in two centuries. Every generation that treated catastrophe as proof of lateness was reading a world measurably harsher than this one.

What changed is the instrument. This is the first age in which anyone can watch the whole planet at once. Every war is on a phone. Every famine has a livestream. The signs did not multiply. The resolution did.

We mistook higher resolution for a nearer end.

And the logic protects itself. Revival is evidence. Apostasy is evidence. Peace proves the lull; war proves the birth pains. Even improvement gets filed as the calm before. Heads the end is near, tails the end is near. When every outcome confirms the thesis, the thesis has stopped reading the world and started reading itself.

---

My industry has no standing to smirk. The people building AI trade a number called P(doom) over dinner. Timelines for superintelligence get published the way Miller published his. The singularity has been called the rapture of the nerds for decades, and the joke keeps landing because the appetite is identical: certainty, finality, a reserved seat at history's last meeting. A forecast is a tool, and some are good ones. It becomes theater the moment a probability hardens into a destiny. The preacher and the doomer are not using the same evidence. They are feeding the same hunger. Their scripture is arXiv.

---

Two months ago I ratified a constitution for a Bible study machine I built. It must attribute every interpretive claim to a named tradition. It must never manufacture urgency. And it must never predict world events, end times, or divine intent. I wrote those rules as engineering. A machine that predicts divine intent is hallucinating with extra confidence.

Sunday afternoon I asked that machine what the scriptures say about the end. It laid out the texts, named the traditions, attributed the disagreements, and declined, politely and completely, to tell me what time it is.

It kept the discipline the pulpit broke. Not because it is wiser. Because it is constrained. Its refusal is not revelation; it is governance doing its job. I had written a boundary into a tool before I understood I needed the same boundary installed in me. The essay is me catching up to my own config.

Recovery taught me the shape first. No one is handed the date of their last hard day. What shows up is today, and the only instruction that has ever held is to stay ready and not count. Reading the clock is a way of refusing to live in the present.

---

The first churches believed they were living in the last days, and much of historic Christianity says they were right: the last days began with Christ and Pentecost and have not closed. Every generation of the church has lived inside that claim. Every generation that turned it into a calendar was wrong. Both facts fit, once the question stops being when.

The Nicene Creed gives certainty four words: he shall come again. No date. No dial. Watch is a command, and the clock is not included.

The question was never when. The question is whether the hour, whenever it comes, finds me awake.

---

**Sources**

Scripture quoted from the King James Version: Matthew 24:33, 24:36, 24:42; Mark 13:32; Acts 1:7; Acts 2:16-17; Luke 17:20; 2 Thessalonians 2:1-3.

Augustine. *The City of God*, Book XVIII, chapter 53.

Numbers, Ronald L. and Jonathan M. Butler, eds. 1987. *The Disappointed: Millerism and Millenarianism in the Nineteenth Century.* Indiana University Press. On William Miller and October 22, 1844.

Harold Camping's May 21, 2011 prediction, its "invisible judgment" reframing, and the October 21 date were broadcast by his Family Radio network; see [The Washington Post, May 24, 2011](https://www.washingtonpost.com/local/harold-camping-reaffirms-october-date-for-the-end-of-the-world-says-may-21-date-was-invisible-judgment-day/2011/05/24/AFVsMhAH_story.html).

Long-run series linked in the text: [child mortality](https://ourworldindata.org/child-mortality), [famines](https://ourworldindata.org/famines), and [extreme poverty](https://ourworldindata.org/extreme-poverty), Our World in Data, drawing on UN IGME estimates, the World Peace Foundation famine dataset, and World Bank poverty lines.
