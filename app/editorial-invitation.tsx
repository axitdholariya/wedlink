'use client';
import { type Invite, formatDate } from './shared';
import { MapPin, ArrowUpRight, Heart, Sparkles } from 'lucide-react';

export default function EditorialInvitation({ data }: { data: Invite }) {
  const isBrideFirst = data.orderBrideFirst !== false;
  const firstName = isBrideFirst ? (data.first || 'Your name') : (data.second || 'Your partner');
  const secondName = isBrideFirst ? (data.second || 'Your partner') : (data.first || 'Your name');
  const coupleTitle = `${firstName} & ${secondName}`;

  // Filter all uploaded photos
  const rawPhotos = (data.galleryPhotos && data.galleryPhotos.filter(Boolean).length > 0)
    ? data.galleryPhotos.filter(Boolean)
    : (data.photo ? [data.photo] : ['/wedding.png']);

  const layout = data.galleryLayout || (rawPhotos.length >= 4 ? '4' : rawPhotos.length === 2 ? '2' : '1');

  return (
    <article className="editorial-invitation bg-[#FAF7F2] text-[#2C2723] min-h-full pb-16 font-sans">
      
      {/* HERO SECTION */}
      <div className="text-center pt-10 px-4">
        <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-neutral-500 mb-2">
          TOGETHER WITH OUR FAMILIES
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#1E1B18]">
          <span>{firstName}</span>
          <span className="italic font-serif mx-2 text-amber-800 font-light">&</span>
          <span>{secondName}</span>
        </h1>
        <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mt-2 font-medium">
          ARE GETTING MARRIED
        </p>
        {data.hashtag && (
          <p className="text-xs font-serif italic text-amber-800/80 mt-1">
            {data.hashtag}
          </p>
        )}
      </div>

      {/* ========================================================================= */}
      {/* DYNAMIC ANIMATED PHOTO GALLERY (1 PHOTO, 2 PHOTOS STACK, OR 4 PHOTOS GRID) */}
      {/* ========================================================================= */}
      {data.showGallery !== false && layout !== 'skip' && (
        <section className="my-6 px-2">
          
          {/* OPTION 1: 1 PHOTO (ELEGANT ARCH PORTRAIT) */}
          {(layout === '1' || rawPhotos.length === 1) && (
            <div className="max-w-[260px] mx-auto bg-white p-2.5 pb-6 rounded-t-full shadow-xl border border-neutral-200/80 text-center transform hover:scale-[1.02] transition-all duration-300">
              <div className="w-full aspect-[4/5] rounded-t-full overflow-hidden bg-neutral-100">
                <img src={rawPhotos[0]} alt="Couple" className="w-full h-full object-cover" />
              </div>
              <p className="font-serif italic text-xs text-neutral-800 mt-3 tracking-widest uppercase">
                {coupleTitle}
              </p>
            </div>
          )}

          {/* OPTION 2: 2 PHOTOS (LAYERED TILTED POLAROID STACK WITH HOVER ANIMATION) */}
          {(layout === '2' || rawPhotos.length === 2) && (
            <div className="relative flex justify-center items-center py-6 min-h-[300px] overflow-visible">
              {/* Photo 1: tilted -6deg */}
              <div className="absolute left-2 sm:left-6 w-[160px] sm:w-[175px] bg-white p-2 pb-5 shadow-2xl rounded-2xl transform -rotate-6 hover:rotate-0 hover:scale-110 hover:z-30 transition-all duration-500 border border-neutral-200/90 cursor-pointer">
                <div className="w-full aspect-[4/5] rounded-t-xl overflow-hidden bg-neutral-100">
                  <img src={rawPhotos[0]} alt="Moment 1" className="w-full h-full object-cover" />
                </div>
                <p className="font-serif italic text-[11px] text-center mt-2 text-neutral-800">
                  {firstName} ♡
                </p>
              </div>

              {/* Photo 2: tilted +6deg overlapping */}
              <div className="absolute right-2 sm:right-6 w-[160px] sm:w-[175px] bg-white p-2 pb-5 shadow-2xl rounded-2xl transform rotate-6 hover:rotate-0 hover:scale-110 hover:z-30 transition-all duration-500 border border-neutral-200/90 cursor-pointer z-10">
                <div className="w-full aspect-[4/5] rounded-t-xl overflow-hidden bg-neutral-100">
                  <img src={rawPhotos || rawPhotos[0]} alt="Moment 2" className="w-full h-full object-cover" />
                </div>
                <p className="font-serif italic text-[11px] text-center mt-2 text-neutral-800">
                  ♡ {secondName}
                </p>
              </div>
            </div>
          )}

          {/* OPTION 3: 4 PHOTOS (2X2 ANIMATED COLLAGE GRID) */}
          {(layout === '4' || rawPhotos.length >= 3) && (
            <div className="grid grid-cols-2 gap-2.5 max-w-[320px] mx-auto py-2">
              {Array.from({ length: 4 }).map((_, idx) => {
                const src = rawPhotos[idx] || rawPhotos[0];
                const tilts = ['-rotate-2 hover:rotate-0', 'rotate-2 hover:rotate-0', 'rotate-1 hover:rotate-0', '-rotate-2 hover:rotate-0'];
                const captions = [firstName, secondName, 'Together', 'Forever'];
                return (
                  <div
                    key={idx}
                    className={`bg-white p-2 pb-3.5 rounded-xl shadow-md border border-neutral-200/80 transform ${tilts[idx]} hover:scale-105 hover:z-20 transition-all duration-300 cursor-pointer text-center`}
                  >
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-neutral-100">
                      <img src={src} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                    </div>
                    <p className="font-serif italic text-[10px] text-neutral-700 mt-1.5 truncate">
                      {captions[idx]}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-center text-[10px] tracking-[0.25em] uppercase text-neutral-500 font-semibold mt-4">
            EVERY ROAD LED ME TO YOU.
          </p>
        </section>
      )}

      {/* WEDDING DATE & WELCOME */}
      <div className="text-center px-4 my-6">
        <p className="font-serif text-lg text-amber-900 font-medium">
          {formatDate(data.date)}
        </p>
        {data.mainVenue && (
          <p className="text-xs text-neutral-600 mt-0.5">
            {data.mainVenue}
          </p>
        )}
        <div className="w-8 h-[1px] bg-amber-800/40 mx-auto my-3" />
        <p className="text-xs text-neutral-600 max-w-xs mx-auto leading-relaxed italic font-serif">
          {data.message || data.openingBlessing || 'With full hearts and joyful smiles, we invite you to be part of our forever.'}
        </p>
      </div>

      {/* FAMILY BLESSINGS */}
      {data.showInvitation !== false && (data.brideFather || data.groomFather) && (
        <section className="my-8 px-4 text-center border-t border-b border-neutral-200/60 py-6 bg-white/50">
          <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-bold mb-3">
            WITH THE BLESSINGS OF OUR FAMILIES
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs max-w-sm mx-auto">
            {data.parentsBrideFirst !== false ? (
              <>
                <div className="border-r border-neutral-200 pr-2">
                  <p className="text-[10px] uppercase text-neutral-400 font-medium">Daughter of</p>
                  <p className="font-serif font-bold text-neutral-800 mt-0.5">{data.brideMother}</p>
                  <p className="font-serif font-bold text-neutral-800">& {data.brideFather}</p>
                </div>
                <div className="pl-2">
                  <p className="text-[10px] uppercase text-neutral-400 font-medium">Son of</p>
                  <p className="font-serif font-bold text-neutral-800 mt-0.5">{data.groomMother}</p>
                  <p className="font-serif font-bold text-neutral-800">& {data.groomFather}</p>
                </div>
              </>
            ) : (
              <>
                <div className="border-r border-neutral-200 pr-2">
                  <p className="text-[10px] uppercase text-neutral-400 font-medium">Son of</p>
                  <p className="font-serif font-bold text-neutral-800 mt-0.5">{data.groomMother}</p>
                  <p className="font-serif font-bold text-neutral-800">& {data.groomFather}</p>
                </div>
                <div className="pl-2">
                  <p className="text-[10px] uppercase text-neutral-400 font-medium">Daughter of</p>
                  <p className="font-serif font-bold text-neutral-800 mt-0.5">{data.brideMother}</p>
                  <p className="font-serif font-bold text-neutral-800">& {data.brideFather}</p>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* STORY & PERSONALITY TAGS */}
      {data.showStory !== false && (data.story || data.coupleVibe || data.meetWay) && (
        <section className="my-8 px-5 text-center">
          <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-bold mb-1">
            CHAPTER ONE — OUR STORY
          </p>
          <h2 className="font-serif text-xl italic text-neutral-800 mb-3">
            Our kind of forever.
          </h2>
          {data.story ? (
            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm mx-auto">
              {data.story}
            </p>
          ) : (
            <div className="flex flex-wrap justify-center gap-1.5 max-w-xs mx-auto mt-2">
              {data.meetWay && <span className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-amber-200 text-amber-900 font-medium">{data.meetWay}</span>}
              {data.coupleVibe && <span className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-amber-200 text-amber-900 font-medium">{data.coupleVibe}</span>}
              {data.morningVibe && <span className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-amber-200 text-amber-900 font-medium">{data.morningVibe}</span>}
              {data.loveDescription && <span className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-amber-200 text-amber-900 font-medium">{data.loveDescription}</span>}
            </div>
          )}
        </section>
      )}

      {/* EVENTS / ITINERARY */}
      <section className="my-8 px-4">
        <div className="text-center mb-5">
          <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-bold">
            CHAPTER TWO — GATHER WITH US
          </p>
          <h2 className="font-serif text-2xl text-neutral-900 mt-1">
            Moments to remember.
          </h2>
          <p className="text-xs text-neutral-500 italic font-serif mt-0.5">
            Come for the celebration. Stay for the memories.
          </p>
        </div>

        <div className="space-y-4 max-w-sm mx-auto">
          {data.events.map((e, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-sm text-center">
              <span className="text-[10px] font-bold text-amber-800 tracking-widest uppercase block mb-1">
                0{i + 1} • {e.name}
              </span>
              <p className="font-serif text-sm font-bold text-neutral-800">
                {formatDate(e.date)} {e.time ? `· ${e.time}` : ''}
              </p>
              <strong className="block text-xs text-neutral-700 mt-1">{e.venue}</strong>
              {e.oneLiner && (
                <p className="text-[11px] text-neutral-500 italic mt-1 px-2">
                  "{e.oneLiner}"
                </p>
              )}
              {(e.mapsUrl || e.address) && (
                <a
                  href={e.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.venue + ' ' + (e.address || ''))}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-[11px] text-amber-800 font-semibold underline mt-2 hover:text-amber-900"
                >
                  <MapPin size={12} />
                  <span>View Location on Map</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* THINGS TO KNOW */}
      {data.showInfo !== false && data.activeInfoCards && data.activeInfoCards.length > 0 && (
        <section className="my-8 px-4 max-w-sm mx-auto">
          <div className="text-center mb-3">
            <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-bold">
              HELPFUL DETAILS
            </p>
            <h3 className="font-serif text-lg text-neutral-800">Things to know</h3>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {data.activeInfoCards.map(id => {
              const card = data.infoCards?.[id];
              if (!card?.value) return null;
              return (
                <div key={id} className="bg-white p-3 rounded-xl border border-neutral-200/80 text-xs">
                  <strong className="capitalize text-amber-900 block font-serif">{id.replace(/([A-Z])/g, ' $1')}</strong>
                  <p className="text-neutral-600 mt-0.5">{card.value}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* CLOSING NOTE */}
      <div className="text-center mt-12 px-4">
        <h2 className="font-serif text-xl italic text-neutral-800">
          We can't wait to celebrate with you.
        </h2>
        <p className="font-serif font-bold text-sm text-neutral-700 mt-1">{coupleTitle}</p>
        <div className="text-[9px] tracking-[0.2em] uppercase text-neutral-400 mt-6">
          MADE WITH LOVE, ON WEDLINK
        </div>
      </div>

    </article>
  );
}
