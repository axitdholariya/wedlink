'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Heart,
  MapPin,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import type { Invite } from './shared';
import WeddingCountdown from './wedding-countdown';

const dateText = (value?: string) =>
  value
    ? new Date(value + 'T12:00:00').toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Our wedding day';

export default function HeritageInvitation({ data }: { data: Invite }) {
  const [stage, setStage] = useState<'closed' | 'opening' | 'open'>('closed');
  const [motion, setMotion] = useState<boolean>(true);

  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  const open = stage === 'open';
  const first = data.first || 'Your name';
  const second = data.second || 'Your partner';

  // 1. Saari photos nikalna (array ya individual keys)
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
  const [photo1, photo2, photo3, photo4] = photos;
  const hasPhotos = photos.length > 0;

  // Respect user preference for reduced motion
  useEffect(() => {
    const q = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotion(!q.matches);
    update();
    q.addEventListener('change', update);
    return () => q.removeEventListener('change', update);
  }, []);

  // Stage transition
  useEffect(() => {
    if (stage !== 'opening') return;
    const timer = setTimeout(() => setStage('open'), motion ? 1500 : 30);
    return () => clearTimeout(timer);
  }, [stage, motion]);

  // Focus heading on open
  useEffect(() => {
    if (!open) return;
    heading.current?.focus({ preventScroll: true });

    const nodes = root.current?.querySelectorAll('.ht-reveal');
    if (typeof IntersectionObserver === 'undefined') {
      nodes?.forEach((n) => n.classList.add('ht-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ht-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 }
    );

    nodes?.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [open, photos, data.story, data.events, data.firstFamily, data.secondFamily, data.dressCode, data.accommodation, data.gifts]);

  function reset() {
    root.current?.style.setProperty('--ht-x', '0deg');
    root.current?.style.setProperty('--ht-y', '0deg');
  }

  function tilt(e: PointerEvent<HTMLElement>) {
    if (!motion || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    root.current?.style.setProperty('--ht-x', ((e.clientX - r.left) / r.width - 0.5) * 8 + 'deg');
    root.current?.style.setProperty('--ht-y', -((e.clientY - r.top) / r.height - 0.5) * 5 + 'deg');
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
      ref={root}
      className={'heritage-invite ht-' + stage + (motion ? '' : ' ht-paused')}
      data-long-names={Math.max(first.length, second.length) > 14}
    >
      {/* 1. HERO SECTION */}
      <section className="ht-hero" onPointerMove={tilt} onPointerLeave={reset}>
        <img className="ht-palace" src="/royal-courtyard.png" alt="" fetchPriority="high" />
        <div className="ht-hero-shade" />

        <div className="ht-controls">
          <button
            aria-label={motion ? 'Pause animation' : 'Resume animation'}
            aria-pressed={!motion}
            onClick={() => {
              setMotion(!motion);
              reset();
            }}
          >
            {motion ? <Pause size={17} /> : <Play size={17} />}
          </button>
          {open && (
            <button onClick={replay} aria-label="Replay Heritage opening">
              <RotateCcw size={17} />
            </button>
          )}
        </div>

        <div className="ht-folio">
          <div className="ht-letter" inert={!open ? true : undefined} aria-hidden={!open}>
            <span className="ht-eyebrow">WITH THE BLESSINGS OF OUR FAMILIES</span>
            <div className="ht-letter-symbol">
              <Sparkles size={24} strokeWidth={1} />
            </div>
            <p className="ht-invitation-line">
              A love to honour.
              <br />
              A lifetime to celebrate.
            </p>
            <h1 ref={heading} tabIndex={-1}>
              {first}
              <i>&</i>
              {second}
            </h1>
            <div className="ht-gold-rule" />
            <p className="ht-letter-date">{dateText(data.date)}</p>
            <p className="ht-letter-venue">
              {mainEvent?.venue || 'Together is our favourite place'}
            </p>
            <span className="ht-eyebrow ht-letter-bottom">
              YOUR PRESENCE IS OUR GREATEST GIFT
            </span>
          </div>

          {stage !== 'open' && (
            <div
              className="ht-cover"
              inert={stage !== 'closed' ? true : undefined}
              aria-hidden={stage !== 'closed'}
            >
              <div className="ht-cover-inner">
                <div className="ht-cover-heading">
                  <span className="ht-eyebrow">THE WEDDING CELEBRATION</span>
                  <Sparkles size={19} strokeWidth={1} />
                </div>
                <div className="ht-cover-monogram" aria-hidden="true">
                  <span>{first[0]}</span>
                  <i>&</i>
                  <span>{second[0]}</span>
                </div>
                <div className="ht-cover-rule" />
                <p className="ht-cover-names">
                  {first}
                  <i>&</i>
                  {second}
                </p>
                <p className="ht-cover-date">{dateText(data.date)}</p>
                <button className="ht-open-button" onClick={() => setStage('opening')}>
                  Open our celebration <ArrowUpRight size={18} />
                </button>
                <span className="ht-cover-foot">TWO FAMILIES. ONE BEAUTIFUL BEGINNING.</span>
              </div>
            </div>
          )}
        </div>

        {open && (
          <a className="ht-discover" href="#heritage-countdown">
            The celebration awaits <ArrowDown size={17} />
          </a>
        )}
        <span className="sr-only" role="status">
          {stage === 'opening'
            ? 'Opening your Heritage invitation…'
            : open
            ? 'Your invitation is open.'
            : ''}
        </span>
      </section>

      {open && (
        <div className="ht-pages">
          {/* 2. WELCOME */}
          <section className="ht-welcome ht-reveal">
            <span className="ht-eyebrow">A CELEBRATION OF LOVE & TOGETHERNESS</span>
            <h2>
              Some bonds are
              <br />
              <em>made for a lifetime.</em>
            </h2>
            <p>
              {data.message ||
                'With our families beside us, we invite you to celebrate the beginning of our forever.'}
            </p>
            <Heart size={20} strokeWidth={1} />
            {(data.firstFamily || data.secondFamily) && (
              <div className="ht-families">
                {data.firstFamily && <p>{data.firstFamily}</p>}
                {data.firstFamily && data.secondFamily && <span>&</span>}
                {data.secondFamily && <p>{data.secondFamily}</p>}
              </div>
            )}
          </section>

          {/* 3. COUNTDOWN */}
          <div id="heritage-countdown" className="ht-countdown ht-reveal">
            <WeddingCountdown data={data} />
          </div>

          {/* 4. GALLERY / MEMORIES (Supports 1, 2, and 4 Photos) */}
          {hasPhotos && (
            <section className="ht-memories ht-reveal">
              <div className="ht-section-heading">
                <span className="ht-eyebrow">THE HEART OF OUR STORY</span>
                <h2>
                  In every lifetime,
                  <br />
                  <em>it would be you.</em>
                </h2>
              </div>

              <div className="ht-photo-stage" onPointerMove={tilt} onPointerLeave={reset}>
                {/* Agar 1 Photo ho */}
                {photos.length === 1 && (
                  <div className="ht-photo-orbit">
                    <div className="ht-photo-back" aria-hidden="true" />
                    <figure className="ht-photo">
                      <img
                        src={photo1}
                        alt={first + ' and ' + second + ' together'}
                        loading="lazy"
                      />
                      <figcaption>
                        <span>{first}</span>
                        <Heart size={16} strokeWidth={1} />
                        <span>{second}</span>
                      </figcaption>
                    </figure>
                  </div>
                )}

                {/* Agar 2 Photos ho (Side by side poloroids) */}
                {photos.length === 2 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: '1.5rem',
                      maxWidth: '680px',
                      margin: '0 auto',
                    }}
                  >
                    {[photo1, photo2].map((p, idx) => (
                      <figure
                        key={idx}
                        className="ht-photo"
                        style={{
                          transform: idx === 0 ? 'rotate(-2deg)' : 'rotate(2deg)',
                          transition: 'transform 0.3s ease',
                          margin: 0,
                          flex: '1 1 240px',
                          maxWidth: '300px',
                        }}
                      >
                        <img
                          src={p}
                          alt={`${first} and ${second} memory ${idx + 1}`}
                          loading="lazy"
                          style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                        />
                        <figcaption>
                          <span>{first}</span>
                          <Heart size={16} strokeWidth={1} />
                          <span>{second}</span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}

                {/* Agar 3 ya 4 Photos ho (2x2 Grid) */}
                {photos.length >= 3 && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1.25rem',
                      maxWidth: '680px',
                      margin: '0 auto',
                      padding: '0 0.5rem',
                    }}
                  >
                    {photos.slice(0, 4).map((p, idx) => (
                      <figure
                        key={idx}
                        className="ht-photo"
                        style={{
                          transform: idx % 2 === 0 ? 'rotate(-1.5deg)' : 'rotate(1.5deg)',
                          transition: 'transform 0.3s ease',
                          margin: 0,
                        }}
                      >
                        <img
                          src={p}
                          alt={`Memory ${idx + 1}`}
                          loading="lazy"
                          style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                        />
                        <figcaption style={{ fontSize: '0.85rem' }}>
                          <span>{first}</span>
                          <Heart size={14} strokeWidth={1} />
                          <span>{second}</span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}

                <span className="ht-photo-caption">A MOMENT TO KEEP. A FOREVER TO COME.</span>
              </div>

              <button
                className="ht-motion-button"
                aria-pressed={!motion}
                onClick={() => {
                  setMotion(!motion);
                  reset();
                }}
              >
                {motion ? <Pause size={14} /> : <Play size={14} />}{' '}
                {motion ? 'Pause photo motion' : 'Resume photo motion'}
              </button>
            </section>
          )}

          {/* 5. STORY */}
          <section className="ht-story ht-reveal">
            <span className="ht-eyebrow">OUR STORY, SO FAR</span>
            <h2>
              A thousand little moments.
              <br />
              <em>One extraordinary love.</em>
            </h2>
            <p>
              {data.story ||
                'In the everyday moments, we found our forever. Now we begin a new chapter, surrounded by our favourite people.'}
            </p>
            <span className="ht-signature">
              {first} & {second}
            </span>
          </section>

          {/* 6. CELEBRATIONS / EVENTS */}
          <section className="ht-celebrations">
            <div className="ht-section-heading ht-reveal">
              <span className="ht-eyebrow">COME, MAKE MEMORIES WITH US</span>
              <h2>
                The days we’ll
                <br />
                <em>remember forever.</em>
              </h2>
            </div>
            <div className="ht-events">
              {data.events?.map((event, i) => (
                <article className="ht-event ht-reveal" key={event.name || i}>
                  <div className="ht-event-top">
                    <span className="ht-event-number">{String(i + 1).padStart(2, '0')}</span>
                    <span className="ht-eyebrow">YOU’RE INVITED</span>
                    <Sparkles size={19} strokeWidth={1} />
                  </div>
                  <h3>{event.name || 'Our celebration'}</h3>
                  <p className="ht-event-date">
                    {dateText(event.date)}
                    {event.time && <span>{event.time} · Local venue time</span>}
                  </p>
                  <div className="ht-gold-rule" />
                  <h4>{event.venue || 'Venue to be announced'}</h4>
                  <p>{event.address}</p>
                  {event.address && (
                    <a
                      className="ht-map"
                      href={
                        'https://www.google.com/maps/search/?api=1&query=' +
                        encodeURIComponent([event.venue, event.address].filter(Boolean).join(' '))
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MapPin size={16} /> View location <ArrowUpRight size={16} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* 7. DETAILS */}
          {(data.dressCode || data.accommodation || data.gifts) && (
            <section className="ht-details ht-reveal">
              <span className="ht-eyebrow">A FEW LITTLE DETAILS</span>
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
          <section className="ht-finale ht-reveal">
            <img src="/royal-courtyard.png" alt="" loading="lazy" />
            <div className="ht-finale-shade" />
            <div className="ht-finale-copy">
              <Sparkles size={26} strokeWidth={1} />
              <span className="ht-eyebrow">WITH FULL HEARTS & OPEN ARMS</span>
              <h2>
                Our joy is greater
                <br />
                <em>with you in it.</em>
              </h2>
              <p>
                {first} <i>&</i> {second}
              </p>
              <span className="ht-finale-date">{dateText(data.date)}</span>
            </div>
          </section>

          <footer className="ht-footer">
            <button onClick={replay}>
              <RotateCcw size={15} /> Open it again
            </button>
            <a href="/">Wedlink</a>
            <span>MADE FOR YOUR FOREVER.</span>
          </footer>
        </div>
      )}
    </article>
  );
}
