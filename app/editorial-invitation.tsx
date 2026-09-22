'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Pause,
  Play,
  RotateCcw,
  MapPin,
  Heart,
  Camera,
} from 'lucide-react';
import type { Invite } from './shared';
import WeddingCountdown from './wedding-countdown';

const dateText = (date?: string) =>
  date
    ? new Date(date + 'T12:00:00').toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Our wedding day';

export default function EditorialInvitation({ data }: { data: Invite }) {
  const [stage, setStage] = useState<'closed' | 'opening' | 'open'>('closed');
  const [motion, setMotion] = useState<boolean>(true);

  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  const first = data.first || 'Your name';
  const second = data.second || 'Your partner';
  const open = stage === 'open';

  // Extract all available photos into a clean array
  const rawPhotos: string[] = Array.isArray((data as any).photos)
    ? (data as any).photos.filter(Boolean)
    : [
        data.photo,
        (data as any).photo1,
        (data as any).photo2,
        (data as any).photo3,
        (data as any).photo4,
      ].filter((p): p is string => Boolean(p));

  // Remove duplicates if same photo string is passed
  const photos = Array.from(new Set(rawPhotos));

  // Assign distinct photos to different sections
  const heroPhoto = photos[0] || data.photo;
  const storyPhoto = photos || photos[0] || data.photo;
  const finalePhoto = photos[photos.length - 1] || photos[0] || data.photo;

  // Respect user preference for reduced motion
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotion(!media.matches);

    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  // Handle stage transition
  useEffect(() => {
    if (stage !== 'opening') return;
    const timer = setTimeout(() => setStage('open'), motion ? 1350 : 30);
    return () => clearTimeout(timer);
  }, [stage, motion]);

  // Focus title for accessibility
  useEffect(() => {
    if (!open) return;
    const timeout = setTimeout(() => title.current?.focus({ preventScroll: true }), 100);
    return () => clearTimeout(timeout);
  }, [open]);

  // Scroll reveal observer
  useEffect(() => {
    if (!open) return;
    const nodes = root.current?.querySelectorAll('.ed-reveal');

    if (typeof IntersectionObserver === 'undefined') {
      nodes?.forEach((el) => el.classList.add('ed-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ed-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    nodes?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [open, photos, data.story, data.events, data.dressCode]);

  const tilt = (e: PointerEvent<HTMLElement>) => {
    if (!motion || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    root.current?.style.setProperty(
      '--ed-x',
      ((e.clientX - r.left) / r.width - 0.5) * 6 + 'deg'
    );
    root.current?.style.setProperty(
      '--ed-y',
      -((e.clientY - r.top) / r.height - 0.5) * 5 + 'deg'
    );
  };

  const reset = () => {
    root.current?.style.setProperty('--ed-x', '0deg');
    root.current?.style.setProperty('--ed-y', '0deg');
  };

  const replay = () => {
    setStage('closed');
    reset();
    root.current?.scrollIntoView({ behavior: 'auto', block: 'start' });
  };

  const mainEvent =
    data.events?.find((e) => e.date === data.date) ||
    data.events?.[0];

  return (
    <article
      data-long-names={Math.max(first.length, second.length) > 14}
      ref={root}
      className={'editorial-invite ed-' + stage + (motion ? '' : ' ed-paused')}
    >
      {/* 1. HERO SECTION */}
      <section className="ed-hero" onPointerMove={tilt} onPointerLeave={reset}>
        {heroPhoto && (
          <img
            className="ed-hero-photo"
            src={heroPhoto}
            alt={first + ' and ' + second}
            fetchPriority="high"
          />
        )}
        <div className="ed-photo-shade" />

        <div className="ed-controls">
          <button
            onClick={() => {
              setMotion(!motion);
              reset();
            }}
            aria-label={motion ? 'Pause animation' : 'Resume animation'}
            aria-pressed={!motion}
          >
            {motion ? <Pause size={17} /> : <Play size={17} />}
          </button>
          {open && (
            <button onClick={replay} aria-label="Replay opening">
              <RotateCcw size={17} />
            </button>
          )}
        </div>

        <div className="ed-hero-copy" inert={!open ? true : undefined} aria-hidden={!open}>
          <div className="ed-running-head">
            <span>TOGETHER WITH OUR FAMILIES</span>
            <span>{data.date ? data.date.slice(0, 4) : 'FOREVER'}</span>
          </div>

          <div className="ed-title-group">
            <span className="ed-eyebrow">YOU ARE INVITED TO THE WEDDING OF</span>
            <h1 ref={title} tabIndex={-1}>
              {first}
              <span>
                <i>&</i> {second}
              </span>
            </h1>
            <div className="ed-hero-meta">
              <span>{dateText(data.date)}</span>
              <span>{mainEvent?.venue || 'A beautiful beginning'}</span>
            </div>
            <a href="#editorial-countdown" className="ed-discover">
              The beginning of everything <ArrowDown size={18} />
            </a>
          </div>
        </div>

        {stage !== 'open' && (
          <div
            className="ed-cover"
            inert={stage !== 'closed' ? true : undefined}
            aria-hidden={stage !== 'closed'}
          >
            <div className="ed-shutter ed-shutter-left" />
            <div className="ed-shutter ed-shutter-right" />
            <div className="ed-cover-copy">
              <span className="ed-eyebrow">A WEDDING INVITATION</span>
              <div className="ed-cover-monogram">
                {first[0]}
                <i>&</i>
                {second[0]}
              </div>
              <div className="ed-cover-rule" />
              <p className="ed-cover-names">
                {first} <i>&</i> {second}
              </p>
              <p className="ed-cover-date">{dateText(data.date)}</p>
              <button
                onClick={() => setStage('opening')}
                disabled={stage !== 'closed'}
                className="ed-open-button"
              >
                Open our story <ArrowUpRight size={18} />
              </button>
              <span className="ed-cover-foot">THIS IS WHERE OUR FOREVER BEGINS.</span>
            </div>
          </div>
        )}

        <span className="sr-only" role="status">
          {stage === 'opening'
            ? 'Opening your invitation…'
            : open
            ? 'Your invitation is open.'
            : ''}
        </span>
      </section>

      {open && (
        <div className="ed-pages">
          {/* 2. INTRO SECTION */}
          <section className="ed-intro ed-reveal">
            <span className="ed-eyebrow">ONE DAY. ALL OUR FAVOURITE PEOPLE.</span>
            <h2>
              Some things are
              <br />
              <em>meant to be.</em>
            </h2>
            <p>
              {data.message ||
                'We would love to celebrate the beginning of our forever with you.'}
            </p>
            <Heart size={19} />
          </section>

          {/* 3. COUNTDOWN */}
          <div id="editorial-countdown" className="ed-countdown ed-reveal">
            <WeddingCountdown data={data} />
          </div>

          {/* 4. STORY SECTION */}
          <section className="ed-story ed-reveal">
            <div className="ed-story-heading">
              <span className="ed-eyebrow">01 / OUR STORY</span>
              <h2>
                A chance meeting.
                <br />
                <em>A choice, every day.</em>
              </h2>
            </div>
            {storyPhoto && (
              <div
                className="ed-portrait-stage"
                onPointerMove={tilt}
                onPointerLeave={reset}
              >
                <figure className="ed-portrait" key={storyPhoto}>
                  <img
                    src={storyPhoto}
                    alt={first + ' and ' + second + ' together'}
                    loading="lazy"
                  />
                  <figcaption>
                    <span>
                      {first} & {second}
                    </span>
                    <span>EST. {data.date ? data.date.slice(0, 4) : 'FOREVER'}</span>
                  </figcaption>
                </figure>
                <span className="ed-portrait-note" aria-hidden="true">
                  always,
                  <br />
                  <i>you.</i>
                </span>
              </div>
            )}
            <div className="ed-story-body">
              <span className="ed-dropcap">&</span>
              <p>
                {data.story ||
                  'The little moments brought us here. Now we are ready to write our next chapter, surrounded by the people we love.'}
              </p>
              {(data.firstFamily || data.secondFamily) && (
                <p className="ed-family">
                  {data.firstFamily}
                  <br />
                  {data.secondFamily}
                </p>
              )}
            </div>
          </section>

          {/* 5. DEDICATED GALLERY SECTION (Shows all uploaded photos) */}
          {photos.length > 0 && (
            <section className="ed-gallery ed-reveal">
              <div className="ed-section-heading">
                <span className="ed-eyebrow">THE HEART OF OUR STORY</span>
                <h2>
                  In every lifetime,
                  <br />
                  <em>it would be you.</em>
                </h2>
              </div>

              <div
                className="ed-gallery-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    photos.length === 1
                      ? '1fr'
                      : photos.length === 2
                      ? 'repeat(auto-fit, minmax(260px, 1fr))'
                      : 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem',
                  maxWidth: '900px',
                  margin: '2rem auto',
                  padding: '0 1rem',
                }}
              >
                {photos.map((photoUrl, idx) => (
                  <figure
                    key={photoUrl + idx}
                    className="ed-gallery-item"
                    style={{
                      background: '#fff',
                      padding: '12px 12px 24px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                      borderRadius: '4px',
                      transform: idx % 2 === 0 ? 'rotate(-1.5deg)' : 'rotate(1.5deg)',
                      transition: 'transform 0.3s ease',
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src={photoUrl}
                      alt={'Memory ' + (idx + 1)}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: photos.length === 1 ? '380px' : '260px',
                        objectFit: 'cover',
                        borderRadius: '2px',
                      }}
                    />
                    <figcaption
                      style={{
                        marginTop: '12px',
                        fontFamily: 'serif',
                        fontSize: '0.9rem',
                        color: '#666',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>{first}</span>
                      <Heart size={12} fill="currentColor" />
                      <span>{second}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* 6. EVENTS CELEBRATION */}
          <section className="ed-events ed-reveal">
            <div className="ed-section-heading">
              <span className="ed-eyebrow">02 / THE CELEBRATION</span>
              <h2>
                Be part of
                <br />
                <em>our best day.</em>
              </h2>
            </div>
            {data.events?.map((event, index) => (
              <article className="ed-event ed-reveal" key={event.name || index}>
                <span className="ed-event-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="ed-event-copy">
                  <span className="ed-eyebrow">
                    {dateText(event.date)}
                    {event.time ? ' · ' + event.time : ''}
                  </span>
                  <h3>{event.name || 'Our celebration'}</h3>
                  <h4>{event.venue || 'Venue to be announced'}</h4>
                  <p>{event.address}</p>
                  {event.address && (
                    <a
                      className="ed-map"
                      href={
                        'https://www.google.com/maps/search/?api=1&query=' +
                        encodeURIComponent([event.venue, event.address].filter(Boolean).join(' '))
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MapPin size={16} /> Find the venue <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </section>

          {/* 7. DETAILS */}
          {(data.dressCode || data.accommodation || data.gifts) && (
            <section className="ed-details ed-reveal">
              <span className="ed-eyebrow">THE LITTLE DETAILS</span>
              {[
                ['Dress code', data.dressCode],
                ['Your stay', data.accommodation],
                ['Gifts', data.gifts],
              ].map(
                ([label, body]) =>
                  body && (
                    <div key={label}>
                      <h3>{label}</h3>
                      <p>{body}</p>
                    </div>
                  )
              )}
            </section>
          )}

          {/* 8. FINALE */}
          <section className="ed-finale ed-reveal">
            {finalePhoto && <img src={finalePhoto} alt="" loading="lazy" />}
            <div className="ed-finale-shade" />
            <div className="ed-finale-copy">
              <span className="ed-eyebrow">THE NEXT CHAPTER IS OUR FAVOURITE.</span>
              <h2>
                See you
                <br />
                <em>at forever.</em>
              </h2>
              <p>
                {first} <i>&</i> {second}
              </p>
              <span>{dateText(data.date)}</span>
            </div>
          </section>

          <footer className="ed-footer">
            <button onClick={replay}>
              Play it again <RotateCcw size={14} />
            </button>
            <a href="/">Wedlink</a>
            <span>MADE FOR YOUR STORY.</span>
          </footer>
        </div>
      )}
    </article>
  );
}
