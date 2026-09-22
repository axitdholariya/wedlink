import HeritageInvitation from './heritage-invitation';
import GardenRomance from './garden-romance';
import EditorialInvitation from './editorial-invitation';
import RoseLetter from './rose-letter';
import RoyalCourtyard from './royal-courtyard';
import { MapPin, ArrowUpRight } from 'lucide-react';

export const templates = [
  { id: 'rose-letter', name: 'The Rose Letter', category: 'Romantic', subtitle: 'Envelope opening · Scratch to reveal' },
  { id: 'royal', name: 'The Royal Courtyard', category: 'Indian', subtitle: '3D palace entrance · Cinematic' },
  { id: 'editorial', name: 'The Editorial', category: 'Modern', subtitle: 'Cinematic opening · Live countdown' },
  { id: 'romance', name: 'The Garden Romance', category: 'Romantic', subtitle: '3D folding card · Botanical romance' },
  { id: 'heritage', name: 'The Heritage', category: 'Indian', subtitle: '3D keepsake opening · Royal romance' }
];

export interface EventItem {
  name: string;
  date: string;
  time: string;
  venue: string;
  address?: string;
  oneLiner?: string;      // ShaadiPath poetic note
  mapsUrl?: string;       // ShaadiPath Google Maps link
}

export interface Invite {
  // Core Fields
  template: string;
  first: string;
  second: string;
  date: string;
  message?: string;
  story?: string;
  photo?: string;
  timezone?: string;
  firstFamily?: string;
  secondFamily?: string;
  dressCode?: string;
  accommodation?: string;
  gifts?: string;
  events: EventItem[];

  // ShaadiPath Essentials
  orderBrideFirst?: boolean;
  whatsapp?: string;
  hashtag?: string;
  mainVenue?: string;
  showCountdown?: boolean;

  // ShaadiPath Invitation Card & Lineage
  showInvitation?: boolean;
  openingBlessing?: string;
  brideFather?: string;
  brideMother?: string;
  groomFather?: string;
  groomMother?: string;
  parentsBrideFirst?: boolean;
  includeGrandparents?: boolean;

  // ShaadiPath Story & Personality Tags
  showStory?: boolean;
  storyMode?: 'tags' | 'written';
  meetWay?: string;
  coupleVibe?: string;
  morningVibe?: string;
  loveDescription?: string;
  customHashtag?: string;
  extraTags?: string;

  // ShaadiPath Gallery
  showGallery?: boolean;
  galleryLayout?: 'skip' | '1' | '2' | '4';
  galleryPhotos?: string[];

  // ShaadiPath Things to Know (Info)
  showInfo?: boolean;
  activeInfoCards?: string[];
  infoCards?: Record<string, { value: string; mapsUrl?: string }>;
}

export const example: Invite = {
  template: 'editorial',
  first: 'Aarav',
  second: 'Meera',
  date: '2027-12-12',
  message: 'With full hearts and the people we love, we’re beginning our forever. We would love for you to be there.',
  story: 'A chance meeting. A thousand little moments. And a love that feels like coming home. We can’t wait to celebrate our next chapter with you.',
  photo: '/wedding.png',
  orderBrideFirst: true,
  whatsapp: '+91 98765 43210',
  hashtag: '#AaravWedsMeera',
  mainVenue: 'The Garden Palace, Udaipur',
  showCountdown: true,
  showInvitation: true,
  openingBlessing: 'With the blessings of the divine and the love of our families',
  brideFather: 'Mr. Rajesh Sharma',
  brideMother: 'Mrs. Sunita Sharma',
  groomFather: 'Mr. Vikram Mehta',
  groomMother: 'Mrs. Meenakshi Mehta',
  parentsBrideFirst: true,
  events: [
    {
      name: 'The wedding',
      date: '2027-12-12',
      time: '16:00',
      venue: 'The Garden Palace',
      address: 'Udaipur, Rajasthan, India',
      oneLiner: 'Seven vows, one lifetime — the ceremony that begins forever.',
      mapsUrl: 'https://maps.google.com/?q=The+Garden+Palace+Udaipur'
    },
    {
      name: 'Dinner & dancing',
      date: '2027-12-12',
      time: '19:00',
      venue: 'The Courtyard',
      address: 'Udaipur, Rajasthan, India',
      oneLiner: 'A grand evening of dinner, music, and celebrations.',
      mapsUrl: 'https://maps.google.com/?q=The+Courtyard+Udaipur'
    }
  ]
};

export function Brand() {
  return (
    <span className="brand">
      <img src="/logo.svg" alt="" />
      <span>Wedlink</span>
    </span>
  );
}

export function formatDate(date: string) {
  if (!date) return 'Your wedding date';
  return new Date(date + 'T12:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function Invitation({ data, invitationId }: { data: Invite; invitationId?: string }) {
  if (data.template === 'heritage') return <HeritageInvitation data={data} />;
  if (data.template === 'romance') return <GardenRomance data={data} />;
  if (data.template === 'editorial') return <EditorialInvitation data={data} />;
  if (data.template === 'rose-letter') return <RoseLetter data={data} invitationId={invitationId} />;
  if (data.template === 'royal') return <RoyalCourtyard data={data} />;

  const coupleNames = data.orderBrideFirst === false
    ? `${data.second || 'Groom'} & ${data.first || 'Bride'}`
    : `${data.first || 'Bride'} & ${data.second || 'Groom'}`;

  return (
    <article data-long-names={Math.max((data.first || '').length, (data.second || '').length) > 14} className={'invitation ' + data.template}>
      <div className="invitation-top">
        <span className="eyebrow">TOGETHER WITH OUR FAMILIES</span>
        <h1>
          {data.orderBrideFirst === false ? (
            <>{data.second || 'Your partner'}<i>&</i>{data.first || 'Your name'}</>
          ) : (
            <>{data.first || 'Your name'}<i>&</i>{data.second || 'Your partner'}</>
          )}
        </h1>
        <p className="spaced">ARE GETTING MARRIED</p>
        {data.hashtag && <p className="hashtag font-medium text-xs tracking-widest text-amber-700 mt-1">{data.hashtag}</p>}
        {data.photo && <img className="couple-photo" src={data.photo} alt={coupleNames} />}
        <p className="invitation-date">{formatDate(data.date)}</p>
        <div className="tiny-rule" />
        <p className="welcome">{data.message || data.openingBlessing}</p>
      </div>

      {/* PARENTS & LINEAGE SECTION */}
      {data.showInvitation !== false && (data.brideFather || data.groomFather) && (
        <section className="invitation-lineage text-center my-6">
          <span className="eyebrow">FAMILY BLESSINGS</span>
          <div className="grid grid-cols-2 gap-4 mt-2 text-xs">
            {data.parentsBrideFirst !== false ? (
              <>
                <div>
                  <p className="font-semibold text-neutral-500">Daughter of</p>
                  <p className="font-bold">{data.brideMother} & {data.brideFather}</p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-500">Son of</p>
                  <p className="font-bold">{data.groomMother} & {data.groomFather}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="font-semibold text-neutral-500">Son of</p>
                  <p className="font-bold">{data.groomMother} & {data.groomFather}</p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-500">Daughter of</p>
                  <p className="font-bold">{data.brideMother} & {data.brideFather}</p>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* STORY OR PERSONALITY SECTION */}
      {data.showStory !== false && (data.story || data.coupleVibe || data.meetWay) && (
        <section>
          <span className="eyebrow">A LITTLE ABOUT US</span>
          <h2>Our kind of <em>forever.</em></h2>
          {data.story ? (
            <p>{data.story}</p>
          ) : (
            <div className="personality-tags flex flex-wrap gap-2 mt-2">
              {data.meetWay && <span className="tag px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs">{data.meetWay}</span>}
              {data.coupleVibe && <span className="tag px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs">{data.coupleVibe}</span>}
              {data.morningVibe && <span className="tag px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs">{data.morningVibe}</span>}
              {data.loveDescription && <span className="tag px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs">{data.loveDescription}</span>}
            </div>
          )}
        </section>
      )}

      {/* CELEBRATION EVENTS */}
      <section>
        <span className="eyebrow">LET’S CELEBRATE TOGETHER</span>
        <h2>The <em>celebration.</em></h2>
        <div className="event-list">
          {data.events.map((e, i) => (
            <div className="event" key={i}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{e.name}</h3>
              <p>{formatDate(e.date)}{e.time ? ' · ' + e.time : ''}</p>
              <strong>{e.venue}</strong>
              {e.oneLiner && <p className="italic text-xs text-neutral-600 mt-1">"{e.oneLiner}"</p>}
              {e.address && <p>{e.address}</p>}
              {(e.mapsUrl || e.address) && (
                <a
                  href={e.mapsUrl || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(e.venue + ' ' + (e.address || '')))}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin size={15} /> View location <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* THINGS TO KNOW SECTION */}
      {data.showInfo !== false && data.activeInfoCards && data.activeInfoCards.length > 0 && (
        <section className="things-to-know my-6">
          <span className="eyebrow">THINGS TO KNOW</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {data.activeInfoCards.map(id => {
              const card = data.infoCards?.[id];
              if (!card?.value) return null;
              return (
                <div key={id} className="info-card p-3 rounded-xl bg-amber-50/50 border border-amber-200 text-xs">
                  <strong className="capitalize block text-amber-900 mb-1">{id.replace(/([A-Z])/g, ' $1')}</strong>
                  <p>{card.value}</p>
                  {card.mapsUrl && (
                    <a href={card.mapsUrl} target="_blank" rel="noreferrer" className="text-amber-800 underline mt-1 inline-flex items-center space-x-1">
                      <MapPin size={12} /> <span>Open in Maps</span>
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h2>We can’t wait<br />to celebrate <em>with you.</em></h2>
        <p>{coupleNames}</p>
      </section>

      <div className="invitation-credit">MADE WITH LOVE, ON <a href="/">WEDLINK</a></div>
    </article>
  );
}
