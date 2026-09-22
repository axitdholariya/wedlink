'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Heart,
  MapPin,
  Music2,
  VolumeX,
  RotateCcw,
  Shirt,
  Gift,
  BedDouble,
  Send,
  Pause,
  Play,
  Sparkles,
} from 'lucide-react';
import type { Invite } from './shared';

const prettyDate = (v: string) =>
  v
    ? new Date(v + 'T12:00:00').toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Our special day';

function weddingEpoch(data: Invite) {
  try {
    if (!data.date) return null;
    const local = data.date + 'T' + (data.events[0]?.time || '12:00') + ':00';
    let base = Date.parse(local + 'Z'),
      result = base;
    for (let i = 0; i < 2; i++) {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: data.timezone || 'Asia/Kolkata',
        timeZoneName: 'longOffset',
      }).formatToParts(new Date(result));
      const offset = parts.find((p) => p.type === 'timeZoneName')?.value || 'GMT';
      const match = offset.match(/GMT([+-])(\d{2}):(\d{2})/);
      const minutes = match
        ? (Number(match) * 60 + Number(match)) * (match === '+' ? 1 : -1)
        : 0;
      result = base - minutes * 60000;
    }
    return Number.isFinite(result) ? result : null;
  } catch {
    return null;
  }
}

function Countdown({ data, compact = false }: { data: Invite; compact?: boolean }) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const target = weddingEpoch(data);
    if (target === null) {
      setRemaining(null);
      return;
    }
    const tick = () => setRemaining(Math.max(0, target - Date.now()));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [data.date, data.events, data.timezone]);

  const seconds = remaining === null ? null : Math.floor(remaining / 1000);
  const values =
    seconds === null
      ? ['—', '—', '—', '—']
      : [
          Math.floor(seconds / 86400),
          Math.floor(seconds / 3600) % 24,
          Math.floor(seconds / 60) % 60,
          seconds % 60,
        ].map((x) => String(x).padStart(2, '0'));

  return (
    <div className={'rose-clock ' + (compact ? 'rose-clock-compact' : '')}>
      <div
        className="rose-countdown"
        role="timer"
        aria-label="Time remaining until the wedding"
        aria-live="off"
      >
        {values.map((value, i) => (
          <div className="rose-clock-unit" key={i}>
            <div className="rose-clock-face">
              <strong key={value}>{value}</strong>
              <i aria-hidden="true" />
            </div>
            <span>{['Days', 'Hours', 'Minutes', 'Seconds'][i]}</span>
          </div>
        ))}
      </div>
      {!compact && (
        <p className="rose-timezone">
          {remaining === null
            ? 'Add your wedding date and timezone to begin the countdown.'
            : remaining === 0
            ? 'The day is here. Let’s celebrate.'
            : `Until ${prettyDate(data.date)} · ${data.timezone || 'Asia/Kolkata'}`}
        </p>
      )}
    </div>
  );
}

function PhotoMoment({ data }: { data: Invite }) {
  // Extract all uploaded photos
  const rawPhotos: string[] =
    Array.isArray((data as any).photos) && (data as any).photos.length > 0
      ? (data as any).photos.filter(Boolean)
      : [
          data.photo,
          (data as any).photo1,
          (data as any).photo2,
          (data as any).photo3,
          (data as any).photo4,
          (data as any).gallery,
        ]
          .flat()
          .filter((p): p is string => typeof p === 'string' && Boolean(p.trim()));

  const photos = rawPhotos.length > 0 ? rawPhotos : (data.photo ? [data.photo] : []);
  const [photo1, photo2, photo3, photo4] = photos;

  const photoCenter = photo1 || data.photo;
  const photoLeft = photo2 || photo1 || data.photo;
  const photoRight = photo3 || photo2 || photo1 || data.photo;

  return (
    <section className="rose-photo-moment rose-reveal">
      <span className="rose-overline">A MOMENT. A LIFETIME.</span>
      <h2 className="rose-script">Our favourite kind of magic.</h2>
      <div className="rose-photo-stage">
        <div className="rose-photo-aura" aria-hidden="true" />
        <div className="rose-photo-stack">
          {/* Left Echo Card -> Photo 2 */}
          <div className="rose-photo-echo echo-left" aria-hidden="true">
            <img src={photoLeft} alt="" loading="lazy" />
          </div>

          {/* Right Echo Card -> Photo 3 */}
          <div className="rose-photo-echo echo-right" aria-hidden="true">
            <img src={photoRight} alt="" loading="lazy" />
          </div>

          {/* Main Center Card -> Photo 1 */}
          <figure className="rose-photo-main">
            <div className="rose-photo-window">
              <img
                src={photoCenter}
                alt={(data.first || 'You') + ' and ' + (data.second || 'your partner')}
                loading="lazy"
              />
            </div>
            <figcaption>
              <span className="rose-script">
                {data.first || 'You'} & {data.second || 'your partner'}
              </span>
              <Heart size={16} />
            </figcaption>
          </figure>

          <span className="rose-photo-token">
            <Sparkles size={18} />
            <span>
              YOU + ME
              <br />
              ALWAYS
            </span>
          </span>
        </div>
      </div>

      {/* If 4 photos uploaded, show 4-photo polaroid strip */}
      {photos.length >= 4 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '14px',
            maxWidth: '560px',
            margin: '2rem auto 1rem',
            padding: '0 1rem',
          }}
        >
          {photos.slice(0, 4).map((p, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                padding: '8px 8px 16px',
                borderRadius: '8px',
                boxShadow: '0 6px 18px rgba(197, 134, 163, 0.18)',
                textAlign: 'center',
                transform: idx % 2 === 0 ? 'rotate(-1.5deg)' : 'rotate(1.5deg)',
              }}
            >
              <img
                src={p}
                alt={`Memory ${idx + 1}`}
                style={{
                  width: '100%',
                  height: '110px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />
              <span
                className="rose-script"
                style={{
                  fontSize: '13px',
                  color: '#9c5674',
                  marginTop: '6px',
                  display: 'block',
                }}
              >
                Memory {idx + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      <p>One beautiful beginning. A thousand memories to come.</p>
    </section>
  );
}

function ScratchDate({ date }: { date: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const dragging = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const moves = useRef(0);

  useEffect(() => {
    const c = canvas.current;
    if (!c || revealed) return;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    c.width = 600;
    c.height = 560;
    ctx.clearRect(0, 0, 600, 560);
    ctx.beginPath();
    ctx.moveTo(300, 515);
    ctx.bezierCurveTo(225, 447, 30, 320, 30, 168);
    ctx.bezierCurveTo(30, 30, 226, 1, 300, 126);
    ctx.bezierCurveTo(374, 1, 570, 30, 570, 168);
    ctx.bezierCurveTo(570, 320, 375, 447, 300, 515);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(40, 20, 510, 480);
    gradient.addColorStop(0, '#edd1d9');
    gradient.addColorStop(0.4, '#c887a3');
    gradient.addColorStop(0.7, '#9c5674');
    gradient.addColorStop(1, '#e4b4c7');
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.save();
    ctx.clip();
    let seed = 1709;
    for (let i = 0; i < 9000; i++) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const x = seed % 600;
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const y = seed % 560;
      ctx.fillStyle = i % 2 ? 'rgba(255,249,233,.32)' : 'rgba(122,53,88,.14)';
      ctx.fillRect(x, y, 1.5, 1.5);
    }
    ctx.restore();
    ctx.fillStyle = '#fff7f3';
    ctx.textAlign = 'center';
    ctx.font = '22px Georgia';
    ctx.fillText('A date to remember', 300, 266);
    ctx.font = '15px sans-serif';
    ctx.fillText('SCRATCH HERE', 300, 309);
  }, [revealed]);

  function scratch(e: PointerEvent<HTMLCanvasElement>) {
    if (!dragging.current || revealed) return;
    const c = canvas.current!,
      r = c.getBoundingClientRect(),
      ctx = c.getContext('2d')!;
    const x = ((e.clientX - r.left) * 600) / r.width,
      y = ((e.clientY - r.top) * 560) / r.height;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 62;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(last.current?.x ?? x, last.current?.y ?? y);
    ctx.lineTo(x, y);
    ctx.stroke();
    last.current = { x, y };
    if (++moves.current % 8 === 0) {
      const bytes = ctx.getImageData(0, 0, 600, 560).data;
      let cleared = 0,
        total = 0;
      for (let yy = 150; yy < 380; yy += 12)
        for (let xx = 140; xx < 460; xx += 12) {
          total++;
          if (bytes[(yy * 600 + xx) * 4 + 3] < 60) cleared++;
        }
      if (cleared / total > 0.45) {
        setRevealed(true);
        dragging.current = false;
      }
    }
  }

  return (
    <div className="rose-scratch">
      <div className="rose-date-under">
        <Heart size={22} fill="currentColor" />
        <span>SAVE OUR DATE</span>
        <strong>{prettyDate(date)}</strong>
        <small>We saved you a place in our forever.</small>
      </div>
      {!revealed && (
        <canvas
          ref={canvas}
          onPointerDown={(e) => {
            dragging.current = true;
            last.current = null;
            e.currentTarget.setPointerCapture(e.pointerId);
            scratch(e);
          }}
          onPointerMove={scratch}
          onPointerUp={() => {
            dragging.current = false;
            last.current = null;
          }}
          onPointerCancel={() => {
            dragging.current = false;
            last.current = null;
          }}
          aria-label="Scratch this heart to reveal the wedding date"
        />
      )}
      <button className="rose-reveal-button" onClick={() => setRevealed(!revealed)}>
        {revealed ? 'Scratch again' : 'Or tap to reveal the date'}
      </button>
      <span className="sr-only" role="status">
        {revealed
          ? 'Wedding date: ' + prettyDate(date)
          : 'Wedding date is hidden. Scratch the heart or use the reveal button.'}
      </span>
    </div>
  );
}

export default function RoseLetter({
  data,
  invitationId,
}: {
  data: Invite;
  invitationId?: string;
}) {
  const [stage, setStage] = useState<'closed' | 'opening' | 'open'>('closed');
  const open = stage === 'open';
  const [motion, setMotion] = useState(true);
  const [music, setMusic] = useState(false),
    [notice, setNotice] = useState(''),
    [busy, setBusy] = useState(false);
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const audio = useRef<AudioContext | null>(null);
  const first = data.first || 'Your name',
    second = data.second || 'Your partner';

  useEffect(() => {
    if (!music || typeof AudioContext === 'undefined') return;
    const ac = new AudioContext();
    audio.current = ac;
    void ac.resume().catch(() => setMusic(false));
    const volume = ac.createGain();
    volume.gain.value = 0.07;
    volume.connect(ac.destination);
    const notes = [261.63, 329.63, 392, 523.25, 440, 392, 329.63, 293.66];
    let n = 0;
    const play = () => {
      if (ac.state === 'closed') return;
      const osc = ac.createOscillator(),
        gain = ac.createGain();
      osc.type = 'sine';
      osc.frequency.value = notes[n++ % notes.length];
      osc.connect(gain);
      gain.connect(volume);
      const t = ac.currentTime;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.6, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5);
      osc.start(t);
      osc.stop(t + 2.6);
    };
    play();
    const timer = setInterval(play, 900);
    return () => {
      clearInterval(timer);
      void ac.close();
      audio.current = null;
    };
  }, [music]);

  useEffect(() => {
    if (stage !== 'opening') return;
    const timer = setTimeout(
      () => setStage('open'),
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 60 : 1850
    );
    return () => clearTimeout(timer);
  }, [stage]);

  function moveScene(e: PointerEvent<HTMLElement>) {
    if (
      !motion ||
      e.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const rect = e.currentTarget.getBoundingClientRect();
    root.current?.style.setProperty(
      '--scene-x',
      ((e.clientX - rect.left) / rect.width - 0.5) * 10 + 'px'
    );
    root.current?.style.setProperty(
      '--scene-y',
      ((e.clientY - rect.top) / rect.height - 0.5) * 8 + 'px'
    );
  }

  function resetScene() {
    root.current?.style.setProperty('--scene-x', '0px');
    root.current?.style.setProperty('--scene-y', '0px');
  }

  useEffect(() => {
    if (!open) return;
    if (typeof IntersectionObserver === 'undefined') {
      root.current?.querySelectorAll('.rose-reveal').forEach((e) => e.classList.add('rose-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('rose-visible');
        });
      },
      { threshold: 0.06 }
    );
    root.current?.querySelectorAll('.rose-reveal').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, [open, data.story, data.photo, data.dressCode, data.accommodation, data.gifts]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => title.current?.focus({ preventScroll: true }), 100);
    return () => clearTimeout(timer);
  }, [open]);

  async function wish(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!invitationId) return;
    const form = e.currentTarget,
      fd = new FormData(form);
    setBusy(true);
    setNotice('');
    try {
      const r = await fetch('/api/invitations/' + invitationId + '/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fd.get('name'), message: fd.get('message') }),
      });
      const result = (await r.json()) as { error?: string };
      if (!r.ok) throw Error(result.error || 'Please try again.');
      setNotice('Your wishes have been sent to the couple. Thank you!');
      form.reset();
    } catch (e) {
      setNotice(e instanceof Error ? e.message : 'Your message could not be sent. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  // Check if photos exist
  const rawPhotos: string[] =
    Array.isArray((data as any).photos) && (data as any).photos.length > 0
      ? (data as any).photos.filter(Boolean)
      : [
          data.photo,
          (data as any).photo1,
          (data as any).photo2,
          (data as any).photo3,
          (data as any).photo4,
          (data as any).gallery,
        ]
          .flat()
          .filter((p): p is string => typeof p === 'string' && Boolean(p.trim()));

  const hasPhotos = rawPhotos.length > 0 || Boolean(data.photo);

  return (
    <article
      data-long-names={Math.max(first.length, second.length) > 14}
      ref={root}
      className={'rose-invitation rose-v2 letter-' + stage + (motion ? '' : ' rose-motion-paused')}
    >
      <div className="rose-floating">
        <button
          onClick={() => setMusic(!music)}
          aria-pressed={music}
          aria-label={music ? 'Turn music off' : 'Turn music on'}
        >
          {music ? <Music2 size={17} /> : <VolumeX size={17} />}
          <span>{music ? 'Music on' : 'Music off'}</span>
        </button>
        <button
          onClick={() => {
            setMotion(!motion);
            resetScene();
          }}
          aria-pressed={!motion}
          aria-label={motion ? 'Pause animation' : 'Resume animation'}
        >
          {motion ? <Pause size={17} /> : <Play size={17} />}
        </button>
        {open && (
          <button
            onClick={() => {
              setStage('closed');
              resetScene();
              root.current?.scrollIntoView({ behavior: 'auto', block: 'start' });
            }}
            aria-label="Replay envelope opening"
          >
            <RotateCcw size={17} />
          </button>
        )}
      </div>

      <section className="rose-hero" onPointerMove={moveScene} onPointerLeave={resetScene}>
        <img
          className="rose-dream"
          src="/rose-dream.png"
          alt="A candlelit palace framed by pink drapes, roses and a twilight sky"
          fetchPriority="high"
        />
        <div className="rose-night-shade" />
        <div className="rose-sparkles" aria-hidden="true">
          {Array.from({ length: 15 }, (_, i) => (
            <span
              key={i}
              style={{
                left: ((i * 31) % 100) + '%',
                top: ((i * 17) % 100) + '%',
                animationDelay: i * 0.41 + 's',
              }}
            />
          ))}
        </div>
        <div className="rose-hero-copy" inert={!open ? true : undefined} aria-hidden={!open}>
          <Heart size={22} fill="currentColor" />
          <p className="rose-script rose-welcome-line">
            With joyful hearts, we invite you
            <br />
            to our wedding celebration.
          </p>
          <div className="rose-fine-rule" />
          <h1 ref={title} tabIndex={-1}>
            <span>{first}</span>
          </h1>
          {data.firstFamily && <p className="rose-family">{data.firstFamily}</p>}
          <span className="rose-amp">&</span>
          <h2>{second}</h2>
          {data.secondFamily && <p className="rose-family">{data.secondFamily}</p>}
          <div className="rose-hero-clock">
            <span className="rose-overline">OUR FOREVER BEGINS IN</span>
            <Countdown data={data} compact />
          </div>
          <a href="#rose-countdown" className="rose-discover">
            Step inside our story <ArrowDown size={17} />
          </a>
        </div>
        {stage !== 'open' && (
          <div
            className="rose-envelope"
            aria-hidden={stage !== 'closed'}
            inert={stage !== 'closed' ? true : undefined}
          >
            <div className="rose-envelope-back" />
            <div className="rose-envelope-flap" />
            <div className="rose-envelope-content">
              <span className="rose-overline">A LITTLE ENVELOPE. A LOT OF LOVE.</span>
              <div className="rose-envelope-names">
                {first}
                <span>&</span>
                {second}
              </div>
              <button
                className="rose-seal"
                onClick={() => setStage('opening')}
                disabled={stage !== 'closed'}
                aria-label="Open the wedding envelope"
              >
                <span>
                  {first[0]}
                  <i>&</i>
                  {second[0]}
                </span>
                <Heart size={17} />
              </button>
              <button
                className="rose-tap"
                onClick={() => setStage('opening')}
                disabled={stage !== 'closed'}
              >
                Open your invitation <ArrowUpRight size={15} />
              </button>
              <div className="rose-envelope-bottom">
                <span>You are invited</span>
                <small>TO THE BEGINNING OF OUR FOREVER</small>
              </div>
            </div>
          </div>
        )}
        <span className="sr-only" role="status">
          {stage === 'opening'
            ? 'Opening your invitation…'
            : stage === 'open'
            ? 'Your invitation is open.'
            : ''}
        </span>
      </section>

      {open && (
        <div className="rose-pages">
          <section id="rose-countdown" className="rose-count-section rose-reveal">
            <div className="rose-count-orbit" aria-hidden="true">
              <Heart size={19} />
            </div>
            <span className="rose-overline">EVERY SECOND, CLOSER TO YOU</span>
            <h2 className="rose-script">The wait for forever.</h2>
            <Countdown data={data} />
            <p className="rose-count-caption">Until two hearts begin their next chapter.</p>
          </section>

          {/* Photo Moment with multi-photo support */}
          {hasPhotos && <PhotoMoment data={data} />}

          <section className="rose-intro rose-reveal">
            <Heart size={17} fill="currentColor" />
            <p>{data.message}</p>
            <span className="rose-script">Your presence is our greatest blessing.</span>
          </section>

          <section id="rose-date" className="rose-date-section rose-reveal">
            <span className="rose-overline">A LITTLE MAGIC, JUST FOR YOU</span>
            <h2 className="rose-script">Scratch to Reveal</h2>
            <p>Brush your finger across the heart.</p>
            <ScratchDate date={data.date} />
          </section>

          {data.story && (
            <section className="rose-story rose-reveal">
              <span className="rose-overline">OUR LITTLE LOVE STORY</span>
              <h2 className="rose-script">It was always you.</h2>
              <p>{data.story}</p>
              <Heart size={16} />
            </section>
          )}

          <section className="rose-events-section rose-reveal">
            <span className="rose-overline">COME CELEBRATE WITH US</span>
            <h2 className="rose-script">The wedding festivities</h2>
            <div className="rose-events">
              {data.events.map((e, i) => (
                <article className="rose-event" key={i}>
                  <span className="rose-event-index">0{i + 1}</span>
                  <h3>{e.name || 'Our celebration'}</h3>
                  <p className="rose-event-date">
                    {prettyDate(e.date)}
                    {e.time ? ' · ' + e.time : ''}
                  </p>
                  <MapPin size={22} />
                  <h4>{e.venue || 'Our wedding venue'}</h4>
                  <p>{e.address}</p>
                  {e.address && (
                    <a
                      className="rose-button"
                      href={
                        'https://www.google.com/maps/search/?api=1&query=' +
                        encodeURIComponent([e.venue, e.address].filter(Boolean).join(' '))
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on Google Maps <ArrowUpRight size={15} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>

          <div className="rose-details">
            {[
              [Shirt, 'Dress code', data.dressCode],
              [BedDouble, 'Accommodation', data.accommodation],
              [Gift, 'Gifts', data.gifts],
            ].map(([Icon, label, body]) => {
              const I = Icon as typeof Shirt;
              return body ? (
                <section key={String(label)} className="rose-detail rose-reveal">
                  <I size={25} />
                  <h2 className="rose-script">{String(label)}</h2>
                  <p>{String(body)}</p>
                </section>
              ) : null;
            })}
          </div>

          <section className="rose-wishes rose-reveal">
            <Heart size={21} />
            <h2 className="rose-script">A little wish for us</h2>
            <p>Leave a few words for the beginning of our forever.</p>
            <form onSubmit={wish}>
              <label>
                Your name
                <input name="name" required maxLength={80} placeholder="Your name" />
              </label>
              <label>
                Your message
                <textarea
                  name="message"
                  required
                  maxLength={2000}
                  rows={4}
                  placeholder="Write your wishes…"
                />
              </label>
              <button className="rose-button" disabled={busy || !invitationId}>
                {busy ? 'Sending…' : 'Send your wishes'}
                <Send size={15} />
              </button>
              {!invitationId && (
                <p className="rose-demo-note">
                  Preview only. Wishes can be sent on a published invitation.
                </p>
              )}
              {notice && (
                <p role="status" className="rose-wish-status">
                  {notice}
                </p>
              )}
            </form>
          </section>

          <section className="rose-finish rose-reveal">
            <img src="/rose-envelope.png" alt="A blush envelope" loading="lazy" />
            <h2 className="rose-script">
              We can’t wait to
              <br />
              celebrate with you!
            </h2>
            <p className="rose-script">
              {first} & {second}
            </p>
            <Heart size={18} fill="currentColor" />
          </section>

          <footer className="rose-footer">
            <span>MADE WITH LOVE</span>
            <a href="/">Wedlink</a>
            <span>ONE BEAUTIFUL LINK.</span>
          </footer>
        </div>
      )}
    </article>
  );
}
