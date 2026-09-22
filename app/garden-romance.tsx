'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Flower2,
  Heart,
  MapPin,
  Pause,
  Play,
  RotateCcw,
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
    : 'Our special day';

export default function GardenRomance({ data }: { data: Invite }) {
  const [stage, setStage] = useState<'closed' | 'opening' | 'open'>('closed');
  const [motion, setMotion] = useState<boolean>(true);

  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  const opened = stage === 'open';
  const first = data.first || 'Your name';
  const second = data.second || 'Your partner';

  // Extract all photos uploaded from builder (supports array or individual photo keys)
  const rawPhotos: string[] = Array.isArray((data as any).photos) && (data as any).photos.length > 0
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

  // Distinct photo assignments
  const photoCenter = photos[0] || data.photo || '/garden-romance.png';
  const photoLeft = photos || photos[0] || '/garden-romance.png';
  const photoRight = photos || photos || photos[0] || '/garden-romance.png';
  const hasPhotos = photos.length > 0;

  // Respect user preference for reduced motion
  useEffect(() => {
    const q = matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setMotion(!q.matches);
    change();
    q.addEventListener('change', change);
    return () => q.removeEventListener('change', change);
  }, []);

  // Stage transition
  useEffect(() => {
    if (stage !== 'opening') return;
    const t = setTimeout(() => setStage('open'), motion ? 1600 : 30);
    return () => clearTimeout(t);
  }, [stage, motion]);

  // Focus heading on open
  useEffect(() => {
    if (!opened) return;
    const t = setTimeout(() => heading.current?.focus({ preventScroll: true }), 100);
    return () => clearTimeout(t);
  }, [opened]);

  // Scroll reveal observer
  useEffect(() => {
    if (!opened) return;
    const nodes = root.current?.querySelectorAll('.garden-reveal');

    if (typeof IntersectionObserver === 'undefined') {
      nodes?.forEach((n) => n.classList.add('garden-visible'));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('garden-visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07 }
    );

    nodes?.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, [opened, photos, data.events, data.story, data.dressCode, data.accommodation, data.gifts]);

  function move(e: PointerEvent<HTMLElement>) {
    if (!motion || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    root.current?.style.setProperty(
      '--garden-tilt',
      ((e.clientX - rect.left) / rect.width - 0.5) * 5 + 'deg'
    );
  }

  function reset() {
    root.current?.style.setProperty('--garden-tilt', '0deg');
  }

  function replay() {
    setStage('closed');
    reset();
    root.current?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }

  const mainEvent =
    data.events?.find((e) => e.date === data.date) ||
    data.events?.[0];

  return (
    <article
      data-long-names={Math.max(first.length, second.length) > 14}
      ref={root}
      className={'garden-invitation garden-' + stage + (motion ? '' : ' garden-paused')}
    >
      {/* 1. HERO SECTION */}
      <section className="garden-hero" onPointerMove={move} onPointerLeave={reset}>
        <img
          className="garden-scenery"
          src="/garden-romance.png"
          alt="A sunlit botanical garden with white flowers, a stone arch and a reflecting pond"
          fetchPriority="high"
        />
        <div className="garden-scene-shade" />

        <div className="garden-controls">
          <button
            onClick={() => {
              setMotion(!motion);
              reset();
            }}
            aria-label={motion ? 'Pause animation' : 'Resume animation'}
            aria-pressed={!motion}
          >
            {motion ? <Pause size={16} /> : <Play size={16} />}
          </button>
          {opened && (
            <button onClick={replay} aria-label="Replay invitation opening">
              <RotateCcw size={16} />
            </button>
          )}
        </div>

        <div className="garden-book">
          <div className="garden-letter" aria-hidden={!opened} inert={!opened ? true : undefined}>
            <Flower2 size={26} strokeWidth={1} />
            <span className="garden-eyebrow">TOGETHER WITH OUR FAMILIES</span>
            <p className="garden-letter-intro">
              With love, we invite you
              <br />
              to celebrate our wedding.
            </p>
            <h1 ref={heading} tabIndex={-1}>
              {first}
              <i>&</i>
              {second}
            </h1>
            <span className="garden-letter-line" />
            <p className="garden-letter-date">{dateText(data.date)}</p>
            <p className="garden-letter-venue">
              {mainEvent?.venue || 'A beautiful place to begin'}
            </p>
            <Heart size={16} strokeWidth={1} />
          </div>

          {stage !== 'open' && (
            <div
              className="garden-cover"
              aria-hidden={stage !== 'closed'}
              inert={stage !== 'closed' ? true : undefined}
            >
              <div className="garden-cover-border">
                <div className="garden-cover-topline">
                  <span className="garden-eyebrow">THE WEDDING INVITATION</span>
                  <Flower2 size={19} strokeWidth={1} />
                </div>
                <div className="garden-cover-portrait">
                  <img
                    src={photoCenter}
                    alt={hasPhotos ? first + ' and ' + second : 'A garden in bloom'}
                  />
                  <div className="garden-cover-initials" aria-hidden="true">
                    {first[0]}
                    <i>&</i>
                    {second[0]}
                  </div>
                </div>
                <p className="garden-cover-names">
                  {first}
                  <span>
                    <i>&</i> {second}
                  </span>
                </p>
                <div className="garden-cover-dateline">
                  <span />
                  <span className="garden-cover-date">{dateText(data.date)}</span>
                  <span />
                </div>
                <p className="garden-cover-invite-line">A new season of us.</p>
                <button
                  onClick={() => setStage('opening')}
                  disabled={stage !== 'closed'}
                  className="garden-open-button"
                >
                  Unfold our invitation <ArrowUpRight size={17} />
                </button>
              </div>
            </div>
          )}
        </div>

        {opened && (
          <a className="garden-discover" href="#garden-countdown">
            Let love grow <ArrowDown size={19} />
          </a>
        )}
        <span className="sr-only" role="status">
          {stage === 'opening'
            ? 'Unfolding your invitation…'
            : opened
            ? 'Your invitation is open.'
            : ''}
        </span>
      </section>

      {opened && (
        <div className="garden-pages">
          {/* 2. COUNTDOWN */}
          <div id="garden-countdown" className="garden-clock garden-reveal">
            <WeddingCountdown data={data} />
          </div>

          {/* 3. WELCOME */}
          <section className="garden-welcome garden-reveal">
            <Flower2 size={25} strokeWidth={1} />
            <span className="garden-eyebrow">LOVE, IN FULL BLOOM</span>
            <h2>
              Our favourite day.
              <br />
              <em>Our favourite people.</em>
            </h2>
            <p>
              {data.message ||
                'Your presence would make our day even more beautiful.'}
            </p>
          </section>

          {/* 4. PHOTO GALLERY SECTION (Distinct photos for all 3 cards) */}
          {hasPhotos && (
            <section className="garden-photo-section garden-reveal" key={photoCenter}>
              <div className="garden-gallery-heading">
                <span className="garden-eyebrow">THE MOMENTS WE KEEP</span>
                <h2>
                  A little love.
                  <br />
                  <em>A lifetime of memories.</em>
                </h2>
              </div>

              <div className="garden-photo-stage" onPointerMove={move} onPointerLeave={reset}>
                <div className="garden-gallery-shadow" aria-hidden="true" />
                <div className="garden-gallery-orbit">
                  {/* Left Echo Card -> Photo 2 */}
                  <div className="garden-photo-echo garden-echo-left" aria-hidden="true">
                    <img src={photoLeft} alt="" loading="lazy" />
                  </div>

                  {/* Right Echo Card -> Photo 3 */}
                  <div className="garden-photo-echo garden-echo-right" aria-hidden="true">
                    <img src={photoRight} alt="" loading="lazy" />
                  </div>

                  {/* Center Main Card -> Photo 1 */}
                  <figure className="garden-photo">
                    <img src={photoCenter} alt={first + ' and ' + second} loading="lazy" />
                    <figcaption>
                      <Flower2 size={16} />
                      <span>
                        {first} <i>&</i> {second}
                      </span>
                      <Flower2 size={16} />
                    </figcaption>
                  </figure>

                  <span className="garden-photo-note">
                    Our kind
                    <br />
                    of <em>magic.</em>
                  </span>
                </div>
              </div>

              {/* If 4 photos exist, show all 4 in a polaroid layout */}
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
                        borderRadius: '4px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                        textAlign: 'center',
                        transform: idx % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)',
                      }}
                    >
                      <img
                        src={p}
                        alt={`Memory ${idx + 1}`}
                        style={{
                          width: '100%',
                          height: '110px',
                          objectFit: 'cover',
                          borderRadius: '2px',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#777',
                          marginTop: '6px',
                          display: 'block',
                          fontFamily: 'serif',
                        }}
                      >
                        Memory {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <button
                className="garden-gallery-pause"
                onClick={() => {
                  setMotion(!motion);
                  reset();
                }}
                aria-pressed={!motion}
              >
                {motion ? <Pause size={13} /> : <Play size={13} />}{' '}
                {motion ? 'Pause photo motion' : 'Resume photo motion'}
              </button>
            </section>
          )}

          {/* 5. STORY */}
          <section className="garden-story garden-reveal">
            <span className="garden-eyebrow">THE ROOTS OF OUR FOREVER</span>
            <h2>
              It started with <em>you.</em>
            </h2>
            <p>
              {data.story ||
                'Somewhere in the little moments, we found something extraordinary. We are so happy to share our next chapter with you.'}
            </p>
            <div className="garden-story-signature">
              {first} & {second}
            </div>
          </section>

          {/* 6. EVENTS */}
          <section className="garden-events garden-reveal">
            <span className="garden-eyebrow">MEET US WHERE THE LOVE IS</span>
            <h2>
              A day to <em>remember.</em>
            </h2>
            <div>
              {data.events?.map((event, i) => (
                <article key={event.name || i} className="garden-event garden-reveal">
                  <span className="garden-event-number">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{event.name || 'Our celebration'}</h3>
                  <p className="garden-event-date">
                    {dateText(event.date)}
                    {event.time ? ' · ' + event.time : ''}
                  </p>
                  <Flower2 size={20} strokeWidth={1} />
                  <h4>{event.venue || 'Venue to be announced'}</h4>
                  <p>{event.address}</p>
                  {event.address && (
                    <a
                      className="garden-map"
                      href={
                        'https://www.google.com/maps/search/?api=1&query=' +
                        encodeURIComponent([event.venue, event.address].filter(Boolean).join(' '))
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MapPin size={15} /> Find the garden <ArrowUpRight size={15} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* 7. DETAILS */}
          {(data.dressCode || data.accommodation || data.gifts) && (
            <section className="garden-details garden-reveal">
              <span className="garden-eyebrow">BEFORE YOU JOIN US</span>
              {[
                ['Dress code', data.dressCode],
                ['Your stay', data.accommodation],
                ['Gifts', data.gifts],
              ].map(
                ([name, body]) =>
                  body && (
                    <div key={name}>
                      <h3>{name}</h3>
                      <p>{body}</p>
                    </div>
                  )
              )}
            </section>
          )}

          {/* 8. FINALE */}
          <section className="garden-finale garden-reveal">
            <img src="/garden-romance.png" alt="" loading="lazy" />
            <div className="garden-finale-shade" />
            <div>
              <Flower2 size={26} />
              <span className="garden-eyebrow">A NEW SEASON OF US</span>
              <h2>
                Come for the love.
                <br />
                <em>Stay for the memories.</em>
              </h2>
              <p>
                {first} & {second}
              </p>
              <span className="garden-finale-date">{dateText(data.date)}</span>
            </div>
          </section>

          <footer className="garden-footer">
            <button onClick={replay}>
              Unfold again <RotateCcw size={14} />
            </button>
            <a href="/">Wedlink</a>
            <span>LOVE, BEAUTIFULLY SHARED.</span>
          </footer>
        </div>
      )}
    </article>
  );
}
