'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, ArrowRight, Check, Globe2, Heart, Menu, X, 
  MousePointer2, Smartphone, Link2 
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { templates, example, Invitation, Brand } from './shared';

export default function Home() {
  const [active, setActive] = useState('All designs');
  const [preview, setPreview] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const context = (document as any).modelContext;
    if (!context?.registerTool) return;
    const c = new AbortController();
    Promise.resolve(
      context.registerTool(
        {
          name: 'browse_wedding_templates',
          description: 'Filter the visible Wedlink template collection by style.',
          inputSchema: {
            type: 'object',
            properties: {
              style: { type: 'string', enum: ['All designs', 'Modern', 'Romantic', 'Indian'] },
            },
            required: ['style'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false },
          execute: ({ style }: any) => {
            if (!['All designs', 'Modern', 'Romantic', 'Indian'].includes(style))
              throw Error('Unknown style');
            setActive(style);
            document.getElementById('collection')?.scrollIntoView();
            return {
              style,
              templates: templates
                .filter((t) => style === 'All designs' || t.category === style)
                .map((t) => t.name),
            };
          },
        },
        { signal: c.signal }
      )
    ).catch(() => {});
    return () => c.abort();
  }, []);

  const getTemplateUrl = (id: string) => {
    if (id === 'royal' || id === 'royal-courtyard') return '/templates/royal-courtyard';
    if (id === 'rose-letter') return '/templates/rose-letter';
    if (id === 'editorial') return '/templates/editorial';
    if (id === 'romance' || id === 'garden-romance') return '/templates/garden-romance';
    if (id === 'heritage') return '/templates/heritage';
    return `/templates/${id}`;
  };

  return (
    <>
      <div className="announcement">A little link. A lifetime of memories.</div>
      
      <header className="nav">
        <Link href="/" aria-label="Wedlink home">
          <Brand />
        </Link>
        <nav id="main-navigation" className={menu ? 'nav-links open' : 'nav-links'}>
          <a href="#collection" onClick={() => setMenu(false)}>The collection</a>
          <a href="#how" onClick={() => setMenu(false)}>How it works</a>
          <a href="#questions" onClick={() => setMenu(false)}>Questions</a>
        </nav>
        <a className="button small" href="#collection">
          Create your invitation <ArrowUpRight size={16} />
        </a>
        <button
          className="menu"
          onClick={() => setMenu(!menu)}
          aria-label="Toggle navigation"
          aria-expanded={menu}
          aria-controls="main-navigation"
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span /> FOR THE BEGINNING OF FOREVER</div>
            <h1>Your love story.<br />Beautifully <em>linked.</em></h1>
            <p>A wedding website that feels like you. Thoughtfully designed, effortlessly personalized, and ready to share with everyone you love.</p>
            <a className="button" href="#collection">Find your invitation <ArrowUpRight size={18} /></a>
            <Link className="text-button" href="/templates/editorial">Take a little peek <ArrowRight size={17} /></Link>
            <div className="hero-notes">
              <span><Check size={15} /> Make it yours in minutes</span>
              <span><Check size={15} /> One link for every guest</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-caption">YOUR NEXT CHAPTER STARTS HERE</div>
            <div className="hero-invite">
              <div className="invite-label">TOGETHER WITH OUR FAMILIES</div>
              <h2>Aarav <i>&</i> Meera</h2>
              <p>ARE GETTING MARRIED</p>
              <div className="hero-photo">
                <img src="/wedding.png" alt="A couple celebrating together in a sunlit garden" />
              </div>
              <div className="hero-date">
                <span>DECEMBER</span>
                <strong>12</strong>
                <span>UDAIPUR, INDIA</span>
              </div>
              <div className="tiny-rule" />
              <p>We saved you a place in our forever.</p>
            </div>
            <div className="floating-note">
              <Heart size={18} />
              <span>A little more you.<br /><strong>A lot more meaningful.</strong></span>
            </div>
            <span className="art-bottom">DESIGNED FOR LOVE. MADE FOR SHARING.</span>
          </div>
        </section>

        {/* FEATURE STRIP */}
        <div className="feature-strip">
          <span><Globe2 size={19} /> Love has no borders</span>
          <span><Smartphone size={19} /> Beautiful on every screen</span>
          <span><MousePointer2 size={19} /> No design skills needed</span>
          <span><Link2 size={19} /> All the details. One link.</span>
        </div>

        {/* THE COLLECTION SECTION WITH 5 iPHONE MOCKUPS */}
        <section className="collection section" id="collection">
          <div className="section-top">
            <div>
              <span className="eyebrow">THE WEDLINK COLLECTION</span>
              <h2>A design for <em>your kind of love.</em></h2>
            </div>
            <p>From quiet elegance to a grand celebration.<br />Find the one that feels like you.</p>
          </div>

          <Tabs value={active} onValueChange={setActive}>
            <TabsList className="filters">
              {['All designs', 'Modern', 'Romantic', 'Indian'].map((x) => (
                <TabsTrigger key={x} value={x}>{x}</TabsTrigger>
              ))}
            </TabsList>

            {['All designs', 'Modern', 'Romantic', 'Indian'].map((x) => (
              <TabsContent key={x} value={x}>
                <div className="template-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                  {templates
                    .filter((t) => x === 'All designs' || t.category === x)
                    .map((t) => {
                      const isRoyal = t.id === 'royal' || t.id === 'royal-courtyard';
                      const isRose = t.id === 'rose-letter';
                      const isHeritage = t.id === 'heritage';
                      const isEditorial = t.id === 'editorial';
                      const isGarden = t.id === 'romance' || t.id === 'garden-romance';

                      return (
                        <article className="template-card" key={t.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          
                          {/* 📱 5 iPHONE MOBILE SCREENS */}
                          <div 
                            onClick={() => location.assign(getTemplateUrl(t.id))}
                            className="iphone-frame"
                            style={{
                              width: '100%',
                              maxWidth: '300px',
                              height: '540px',
                              backgroundColor: '#1E232A',
                              borderRadius: '40px',
                              padding: '10px',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                              border: isRoyal ? '4px solid #B68A50' : '4px solid #2D333B',
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'column',
                              position: 'relative',
                              overflow: 'hidden',
                              transition: 'transform 0.3s ease',
                            }}
                          >
                            {/* Dynamic Island / Notch */}
                            <div 
                              style={{
                                width: '80px',
                                height: '14px',
                                backgroundColor: '#1E232A',
                                borderBottomLeftRadius: '10px',
                                borderBottomRightRadius: '10px',
                                margin: '0 auto 8px auto',
                                zIndex: 20
                              }} 
                            />

                            {/* Inner Screen Preview */}
                            <div 
                              style={{
                                flex: 1,
                                borderRadius: '26px',
                                padding: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                                backgroundColor: isRoyal ? '#FAF6EE' : isRose ? '#F9ECEF' : isEditorial ? '#262D29' : isHeritage ? '#FFF8F0' : '#F4F8F4',
                                color: isEditorial ? '#FFFFFF' : '#1A1E26',
                                border: isRoyal ? '1px solid #D8B67D' : '1px solid rgba(0,0,0,0.06)'
                              }}
                            >
                              {/* Card Header */}
                              <div style={{ paddingTop: '8px' }}>
                                <span style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, color: isRoyal ? '#B68A50' : isRose ? '#D97A8F' : isEditorial ? '#EADBCC' : '#7A6B72' }}>
                                  {isRoyal ? 'INTERACTIVE 3D ENTRANCE' : isRose ? '3D WAX SEAL' : isEditorial ? 'MODERN EDITORIAL' : isHeritage ? 'REGAL SHLOKAS' : 'BOTANICAL FLORALS'}
                                </span>
                                
                                <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '6px', opacity: 0.7 }}>
                                  {isHeritage ? 'WITH THE BLESSINGS OF OUR FAMILIES' : 'THE WEDDING OF'}
                                </div>

                                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '26px', fontWeight: 700, margin: '4px 0 0 0', lineHeight: 1.1 }}>
                                  {isHeritage ? 'Aarav' : isRoyal ? 'Emma' : isRose ? 'Veer' : isEditorial ? 'Maya' : 'Chloe'}
                                  <i style={{ fontFamily: 'serif', fontStyle: 'italic', margin: '0 6px', color: isRoyal ? '#B68A50' : 'inherit' }}>&</i>
                                  {isHeritage ? 'Meera' : isRoyal ? 'Noah' : isRose ? 'Zara' : isEditorial ? 'Liam' : 'Arthur'}
                                </h3>
                              </div>

                              {/* Center Motif / Photo */}
                              <div style={{ margin: 'auto 0' }}>
                                {isRoyal ? (
                                  <div style={{ width: '64px', height: '64px', margin: '0 auto', borderRadius: '50%', backgroundColor: '#FFF9F2', border: '2px solid #B68A50', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: '0 4px 12px rgba(182, 138, 80, 0.2)' }}>
                                    🏰
                                  </div>
                                ) : isRose ? (
                                  <div style={{ width: '64px', height: '64px', margin: '0 auto', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.7)', border: '2px solid #D97A8F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
                                    💌
                                  </div>
                                ) : isEditorial ? (
                                  <div style={{ width: '64px', height: '64px', margin: '0 auto', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
                                    ✨
                                  </div>
                                ) : (
                                  <div style={{ width: '80px', height: '100px', margin: '0 auto', borderRadius: '40px', overflow: 'hidden', border: '2px solid #EADBCC' }}>
                                    <img src="/wedding.png" alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  </div>
                                )}
                              </div>

                              {/* Card Footer & Explore Button */}
                              <div>
                                <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', opacity: 0.8, marginBottom: '8px' }}>
                                  12 · 12 · 2027
                                </div>
                                <span 
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px',
                                    width: '100%',
                                    padding: '8px 12px',
                                    backgroundColor: isEditorial ? 'rgba(255,255,255,0.15)' : '#FFFFFF',
                                    border: isRoyal ? '1px solid #B68A50' : '1px solid rgba(0,0,0,0.1)',
                                    borderRadius: '8px',
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: isEditorial ? '#FFFFFF' : '#1A1E26'
                                  }}
                                >
                                  Explore design <ArrowUpRight size={12} />
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Caption below iPhone */}
                          <div className="card-caption" style={{ marginTop: '16px', width: '100%', maxWidth: '300px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>{t.name}</h3>
                              <p style={{ fontSize: '12px', color: '#7A6B72', margin: '2px 0 0 0' }}>{t.subtitle}</p>
                            </div>
                            <Link href={'/create?template=' + t.id} aria-label={'Customize ' + t.name}>
                              <ArrowUpRight size={18} />
                            </Link>
                          </div>
                        </article>
                      );
                    })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* HOW IT WORKS */}
        <section className="how section" id="how">
          <div>
            <span className="eyebrow">LESS PLANNING. MORE CELEBRATING.</span>
            <h2>From “this is the one”<br />to <em>“you’re invited.”</em></h2>
            <p>Your names. Your moments. Your celebration.<br />We bring it all together.</p>
            <a className="text-button" href="#collection">Let’s make it yours <ArrowRight size={18} /></a>
          </div>
          <div className="steps">
            {[
              ['01', 'Find your perfect match', 'Choose a design that captures the spirit of your celebration.'],
              ['02', 'Tell your story', 'Add your photo, wedding events, venues, and a few words from the heart. Preview every detail as you go.'],
              ['03', 'One link. Everyone you love.', 'Once payment is confirmed, your invitation goes live automatically. Share your link and let the excitement begin.']
            ].map(([n, h, p]) => (
              <div className="step" key={n}>
                <span>{n}</span>
                <div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* QUESTIONS (FAQ) */}
        <section className="questions section" id="questions">
          <div>
            <span className="eyebrow">A FEW LITTLE DETAILS</span>
            <h2>Before the <em>big day.</em></h2>
          </div>
          <div>
            {[
              ['What can I personalize?', 'Your names, wedding date, welcome message, couple photo, story, and event names, times and venues. Your details appear automatically in the design you choose.'],
              ['Can I see my invitation before paying?', 'Yes. Personalize your invitation and review the full preview before checkout. Your draft stays private until payment is confirmed.'],
              ['How will my guests open the invitation?', 'Guests open your invitation link in a browser on their phone, tablet or computer. There is nothing to download.'],
              ['When does my invitation go live?', 'Your invitation is published automatically after the payment provider confirms successful payment. A pending or unsuccessful payment will not publish your invitation.']
            ].map(([q, a]) => (
              <details key={q}>
                <summary>{q}<span>+</span></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CLOSING */}
        <section className="closing">
          <span className="eyebrow">THE FIRST LOOK AT YOUR FOREVER</span>
          <h2>Make their inbox<br /><em>a little more romantic.</em></h2>
          <a className="button light" href="#collection">Find your invitation <ArrowUpRight size={18} /></a>
          <p>Your story. One beautiful link.</p>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <Brand />
        <span>Thoughtfully made for your together.</span>
        <span>© {new Date().getFullYear()} Wedlink</span>
      </footer>

      {/* DIALOG PREVIEW */}
      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="preview-dialog">
          <DialogTitle>{templates.find((t) => t.id === preview)?.name} — live preview</DialogTitle>
          <DialogDescription>Sample details. Personalize this design with your own story.</DialogDescription>
          <div className="preview-scroll">
            <Invitation data={{ ...example, template: preview || 'editorial' }} />
          </div>
          <Link className="button" href={'/create?template=' + preview}>
            Make this design yours <ArrowUpRight size={18} />
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
}
