'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight, MapPin, Move, RotateCcw } from 'lucide-react';
import type { Invite } from './shared';
import WeddingCountdown from './wedding-countdown';

const dateText = (v?: string) =>
  v
    ? new Date(v + 'T12:00:00').toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Our wedding day';

export default function RoyalCourtyard({ data }: { data: Invite }) {
  const [opened, setOpened] = useState(false);
  const [motion, setMotion] = useState(true);
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const reduced = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Saari photos nikalna (array ya single keys)
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
  const hasPhotos = photos.length > 0;

  useEffect(() => {
    const q = matchMedia('(prefers-reduced-motion: reduce)');
    reduced.current = q.matches;
    if (q.matches) setMotion(false);
    const listen = () => {
      reduced.current = q.matches;
      setMotion(!q.matches);
    };
    q.addEventListener('change', listen);
    return () => {
      q.removeEventListener('change', listen);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('is-visible');
        }),
      { threshold: 0.08 }
    );
    el.querySelectorAll('.royal-reveal').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, [opened]);

  function open() {
    setOpened(true);
    timer.current = setTimeout(
      () => heading.current?.focus({ preventScroll: true }),
      motion ? 1500 : 0
    );
  }

  function replay() {
    setOpened(false);
    root.current?.scrollIntoView({ behavior: motion ? 'smooth' : 'instant', block: 'start' });
    root.current?.style.setProperty('--mx', '0');
    root.current?.style.setProperty('--my', '0');
  }

  const first = data.first || 'Your name',
    second = data.second || 'Your partner';

  return (
    <article
      data-long-names={Math.max(first.length, second.length) > 14}
      ref={root}
      className={'royal-template ' + (opened ? 'is-open ' : '') + (!motion ? 'motion-off' : '')}
      style={{ '--mx': 0, '--my': 0 } as CSSProperties}
    >
      <section
        className="royal-scene"
        onPointerMove={(e) => {
          if (!motion || e.pointerType === 'touch') return;
          const b = e.currentTarget.getBoundingClientRect();
          root.current?.style.setProperty('--mx', String((e.clientX - b.left) / b.width - 0.5));
          root.current?.style.setProperty('--my', String((e.clientY - b.top) / b.height - 0.5));
        }}
        onPointerLeave={() => {
          root.current?.style.setProperty('--mx', '0');
          root.current?.style.setProperty('--my', '0');
        }}
        aria-label="Your palace invitation"
      >
        <img
          className="royal-palace"
          src="/royal-courtyard.png"
          alt="An ivory palace courtyard with flowers and a reflecting pool"
          fetchPriority="high"
        />
        <div className="royal-atmosphere" aria-hidden="true" />
        <div className="royal-dust" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              style={{
                left: ((i * 29) % 100) + '%',
                animationDelay: i * 0.63 + 's',
                animationDuration: 9 + (i % 4) + 's',
              }}
            />
          ))}
        </div>
        <div className="royal-controls">
          <button
            onClick={() => setMotion(!motion)}
            aria-pressed={!motion}
            aria-label={motion ? 'Pause decorative motion' : 'Enable decorative motion'}
          >
            <Move size={15} />
            <span>{motion ? 'Pause motion' : 'Motion paused'}</span>
          </button>
          {opened && (
            <button onClick={replay}>
              <RotateCcw size={15} />
              <span>Replay entrance</span>
            </button>
          )}
        </div>
        <div className="royal-revealed" aria-hidden={!opened} inert={!opened ? true : undefined}>
          <p className="royal-kicker">WITH OUR FAMILIES & ALL OUR LOVE</p>
          <div className="royal-vellum">
            <div className="royal-monogram" aria-hidden="true">
              {first[0]}
              <i>&</i>
              {second[0]}
            </div>
            <span className="royal-kicker">THE WEDDING CELEBRATION OF</span>
            <h1 ref={heading} tabIndex={-1}>
              {first}
              <i>&</i>
              {second}
            </h1>
            <div className="royal-hairline" />
            <p className="royal-date">{dateText(data.date)}</p>
            <p className="royal-venue">{data.events[0]?.venue || 'A beautiful place to begin'}</p>
            <p className="royal-welcome">
              {data.message || 'Your presence would make our celebration complete.'}
            </p>
          </div>
          <a className="royal-scroll" href="#royal-countdown">
            <span>OUR FOREVER BEGINS HERE</span>
            <ArrowDown size={20} />
          </a>
        </div>
        <div className="royal-gates" aria-hidden={opened} inert={opened ? true : undefined}>
          <div className="royal-leaf royal-left" />
          <div className="royal-leaf royal-right" />
          <div className="royal-gate-shade" />
          <div className="royal-entry">
            <span className="royal-kicker">SOME STORIES ARE WRITTEN IN THE STARS</span>
            <div className="royal-entry-seal">
              {first[0]}
              <i>&</i>
              {second[0]}
            </div>
            <p className="royal-entry-names">
              {first} <i>&</i> {second}
            </p>
            <p className="royal-entry-date">{dateText(data.date)}</p>
            <button className="royal-open-button" onClick={open}>
              Open your invitation <ArrowUpRight size={18} />
            </button>
            <span className="royal-entry-foot">A CELEBRATION. A PROMISE. A FOREVER.</span>
          </div>
        </div>
      </section>

      {opened && (
        <div className="royal-beyond">
          <div id="royal-countdown">
            <WeddingCountdown data={data} />
          </div>

          {/* STORY SECTION & ROYAL PHOTO SHOWCASE */}
          <section className="royal-story royal-reveal" id="royal-story">
            <div className="royal-story-copy">
              <span className="royal-kicker">CHAPTER ONE · YOU & ME</span>
              <h2>
                A little serendipity.
                <br />
                <em>A lifetime of us.</em>
              </h2>
              <p>
                {data.story ||
                  data.message ||
                  'Our favourite chapter begins with the people we love. We can’t wait to celebrate with you.'}
              </p>
              <div className="royal-signature">
                {first} <i>&</i> {second}
              </div>
            </div>

            {/* 1 Photo, 2 Photos, aur 4 Photos layout */}
            {hasPhotos && (
              <div style={{ width: '100%' }}>
                {photos.length === 1 && (
                  <figure className="royal-portrait">
                    <div>
                      <img src={photo1} alt={first + ' and ' + second} loading="lazy" />
                    </div>
                    <figcaption>EVERY ROAD LED ME TO YOU.</figcaption>
                  </figure>
                )}

                {photos.length === 2 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: '1.5rem',
                      maxWidth: '720px',
                      margin: '2rem auto 0',
                    }}
                  >
                    {[photo1, photo2].map((p, idx) => (
                      <figure
                        key={idx}
                        className="royal-portrait"
                        style={{
                          margin: 0,
                          flex: '1 1 260px',
                          maxWidth: '340px',
                        }}
                      >
                        <div>
                          <img
                            src={p}
                            alt={`${first} & ${second} memory ${idx + 1}`}
                            loading="lazy"
                            style={{
                              width: '100%',
                              height: '320px',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                        <figcaption>
                          {idx === 0 ? 'EVERY ROAD LED ME TO YOU.' : 'A ROYAL FOREVER.'}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}

                {photos.length >= 3 && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '1.25rem',
                      maxWidth: '780px',
                      margin: '2rem auto 0',
                    }}
                  >
                    {photos.slice(0, 4).map((p, idx) => (
                      <figure key={idx} className="royal-portrait" style={{ margin: 0 }}>
                        <div>
                          <img
                            src={p}
                            alt={`Memory ${idx + 1}`}
                            loading="lazy"
                            style={{
                              width: '100%',
                              height: '240px',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                        <figcaption style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}>
                          CHAPTER {idx + 1} · {first} & {second}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>

          <section className="royal-celebrations royal-reveal">
            <span className="royal-kicker">CHAPTER TWO · GATHER WITH US</span>
            <h2>
              Moments to <em>remember.</em>
            </h2>
            <p className="royal-section-intro">Come for the celebration. Stay for the memories.</p>
            <div className="royal-events">
              {data.events.map((e, i) => (
                <article key={e.name || i} className="royal-event royal-reveal">
                  <span className="royal-event-number">{String(i + 1).padStart(2, '0')}</span>
                  <div className="royal-event-main">
                    <span className="royal-kicker">{dateText(e.date)}</span>
                    <h3>{e.name || 'Our celebration'}</h3>
                    <p>{e.time ? e.time + ' · Local venue time' : ''}</p>
                    <div className="royal-event-line" />
                    <strong>{e.venue || 'Venue to be announced'}</strong>
                    <p>{e.address}</p>
                    {e.address && (
                      <a
                        href={
                          'https://www.google.com/maps/search/?api=1&query=' +
                          encodeURIComponent([e.venue, e.address].filter(Boolean).join(' '))
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MapPin size={15} /> Find your way <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="royal-finale royal-reveal">
            <img src="/royal-courtyard.png" alt="" loading="lazy" />
            <div className="royal-finale-copy">
              <span className="royal-kicker">CHAPTER THREE · THE BEGINNING OF FOREVER</span>
              <h2>
                Some days stay
                <br />
                <em>with us, always.</em>
              </h2>
              <p>We’d love for you to be part of ours.</p>
              <div className="royal-signature">
                {first} <i>&</i> {second}
              </div>
              <span className="royal-kicker">{dateText(data.date)}</span>
            </div>
          </section>

          <footer className="royal-footer">
            <span>WITH LOVE, ALWAYS.</span>
            <a href="/">WEDLINK</a>
            <button onClick={replay}>
              Relive the beginning <RotateCcw size={13} />
            </button>
          </footer>
        </div>
      )}
    </article>
  );
}
