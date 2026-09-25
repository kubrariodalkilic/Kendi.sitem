import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  ExternalLink,
  Gamepad2,
  Github,
  GraduationCap,
  Heart,
  Menu,
  MousePointer2,
  Pencil,
  Search,
  Sparkles,
  X,
} from 'lucide-react';

type Interest = {
  number: string;
  title: string;
  description: string;
  icon: typeof Pencil;
  accent: string;
};

type Project = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  kind: 'arayüz' | 'kod' | 'araştırma';
  visual: 'paper' | 'window' | 'signal';
};

const navigation = [
  ['Hakkımda', 'hakkimda'],
  ['İlgi alanlarım', 'ilgiler'],
  ['Denemeler', 'denemeler'],
  ['Küçük işletmeler', 'birlikte'],
  ['İletişim', 'iletisim'],
] as const;

const interests: Interest[] = [
  {
    number: '01',
    title: 'Çizim',
    description: 'Karakterler, tuhaf yaratıklar ve aklıma gelen her şey. Bazen bir sayfanın fikri önce kurşun kalemle beliriyor.',
    icon: Pencil,
    accent: 'lavender',
  },
  {
    number: '02',
    title: 'Kodlama',
    description: 'Web siteleri ve yeni deneyler. Bir fikrin ekranda gerçekten çalıştığı o küçük ana bayılıyorum.',
    icon: Code2,
    accent: 'pink',
  },
  {
    number: '03',
    title: 'Oyunlar',
    description: 'Özellikle korku ve atmosferik oyunlar. Sessizlik, ışık ve iyi bir hikâye bende uzun süre kalıyor.',
    icon: Gamepad2,
    accent: 'blue',
  },
  {
    number: '04',
    title: 'Korku',
    description: 'Korku hikâyeleri, filmleri ve oyunları. Gerilim, atmosfer ve akılda kalan hikâyeler ilgimi çekiyor.',
    icon: Search,
    accent: 'gold',
  },
  {
    number: '05',
    title: 'ARG tasarımı',
    description: 'Hikâyeyi web siteleri, küçük ipuçları ve parçalı anlatılarla kurduğum internet deneyleri.',
    icon: Sparkles,
    accent: 'pink',
  },
];

const projects: Project[] = [
  {
    number: '01',
    title: 'Kişisel Web Siteleri',
    description: 'Kendimi, öğrendiklerimi ve o sırada peşinden gittiğim fikri anlatan küçük web köşeleri.',
    tags: ['HTML', 'CSS', 'tasarım'],
    kind: 'arayüz',
    visual: 'paper',
  },
  {
    number: '02',
    title: 'Oyun Fikirleri',
    description: 'Kısa notlar, atmosfer eskizleri ve oynanabilir olmasını istediğim küçük dünyalar.',
    tags: ['hikâye', 'arayüz', 'deney'],
    kind: 'kod',
    visual: 'window',
  },
  {
    number: '03',
    title: 'ARG Projeleri',
    description: 'İnternetin köşelerine saklanan ipuçları, parçalı anlatılar ve birlikte çözülecek gizemler.',
    tags: ['araştırma', 'kurgu', 'merak'],
    kind: 'araştırma',
    visual: 'signal',
  },
];

const tools = ['HTML', 'CSS', 'JavaScript', 'GitHub', 'SPCK Editor'];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'hepsi' | Project['kind']>('hepsi');
  const [copied, setCopied] = useState(false);
  const [messageReady, setMessageReady] = useState(false);
  const [activeSection, setActiveSection] = useState('baslangic');

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
    document.querySelectorAll('section[id]').forEach((element) => sectionObserver.observe(element));
    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const filteredProjects = useMemo(
    () => filter === 'hepsi' ? projects : projects.filter((project) => project.kind === filter),
    [filter],
  );

  const copyContactNote = async () => {
    const note = 'Merhaba Kübra,\\n\\nSana portföyündeki çalışmalar hakkında yazıyorum.\\n\\n';
    await navigator.clipboard?.writeText(note);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  };

  const prepareMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessageReady(true);
  };

  const closeMenuAndScroll = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="doodle-field" aria-hidden="true">
        <Heart className="doodle doodle-heart-one" size={28} strokeWidth={1} />
        <Sparkles className="doodle doodle-spark-one" size={22} strokeWidth={1} />
        <Heart className="doodle doodle-heart-two" size={18} strokeWidth={1} />
        <Sparkles className="doodle doodle-spark-two" size={30} strokeWidth={1} />
        <Heart className="doodle doodle-heart-three" size={38} strokeWidth={1} />
        <Sparkles className="doodle doodle-spark-three" size={18} strokeWidth={1} />
        <Heart className="doodle doodle-heart-four" size={22} strokeWidth={1} />
        <Sparkles className="doodle doodle-spark-four" size={26} strokeWidth={1} />
        <Sparkles className="doodle doodle-spark-five" size={16} strokeWidth={1} />
        <Heart className="doodle doodle-heart-five" size={20} strokeWidth={1} />
        <Sparkles className="doodle doodle-spark-six" size={24} strokeWidth={1} />
        <Heart className="doodle doodle-heart-six" size={30} strokeWidth={1} />
        <Sparkles className="doodle doodle-spark-seven" size={19} strokeWidth={1} />
        <Heart className="doodle doodle-heart-seven" size={16} strokeWidth={1} />
        <Sparkles className="doodle doodle-spark-eight" size={28} strokeWidth={1} />
        <Heart className="doodle doodle-heart-eight" size={24} strokeWidth={1} />
      </div>
      <header className="site-header">
        <nav className="nav-wrap" aria-label="Ana navigasyon">
          <button data-testid="button-logo" onClick={() => scrollToId('baslangic')} className="brand" aria-label="Başlangıca git">
            <span className="brand-mark"><Heart size={16} strokeWidth={1.5} /></span>
            <span className="brand-name">Kübra Dalkılıç<span className="brand-dot">.</span></span>
          </button>
          <div className="desktop-nav">
            {navigation.map(([label, id]) => (
              <button
                key={id}
                data-testid={`button-nav-${id}`}
                onClick={() => scrollToId(id)}
                className={`nav-link ${activeSection === id ? 'is-active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
          <button data-testid="button-menu" className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="mobile-menu">
            {navigation.map(([label, id]) => (
              <button key={id} data-testid={`button-mobile-nav-${id}`} onClick={() => closeMenuAndScroll(id)} className="mobile-nav-link">
                <span>{label}</span><ArrowUpRight size={16} />
              </button>
            ))}
          </div>
        )}
      </header>

      <section id="baslangic" className="hero section-anchor">
        <div className="hero-copy">
          <div className="eyebrow reveal"><span className="status-dot" /> Ankara’dan, küçük bir internet köşesi</div>
          <h1 data-testid="text-hero-title" className="hero-title reveal reveal-delay-1">
            Merhaba,<br /><em>ben Kübra.</em>
          </h1>
          <p data-testid="text-hero-description" className="hero-description reveal reveal-delay-2">
            Web tasarımı ve kodlamayla ilgileniyorum. Bir şeyler üretmeyi, yeni fikirler denemeyi ve internette garip şeylerin peşine düşmeyi seviyorum.
          </p>
          <div className="hero-actions reveal reveal-delay-3">
            <button data-testid="button-hero-about" onClick={() => scrollToId('hakkimda')} className="primary-button">
              Biraz daha bak <ArrowDown size={16} />
            </button>
            <span className="hero-note"><Sparkles size={14} /> kodlama · tasarım · oyun fikirleri</span>
          </div>
        </div>
        <div className="hero-orbit reveal reveal-delay-2" aria-label="Dekoratif çizim">
          <div className="hero-card">
            <span className="card-caption">şimdilik burada</span>
            <div className="card-scribble"><Heart className="neon-heart" size={104} strokeWidth={1.1} /></div>
            <div className="card-bottom"><span>html / css / merak</span><MousePointer2 size={17} /></div>
          </div>
          <span className="orbit-label label-top">bir fikir</span>
          <span className="orbit-label label-bottom">bir ekran</span>
        </div>
        <div className="scroll-cue"><span>kaydır</span><div className="scroll-line" /></div>
      </section>

      <div className="marquee-band" aria-hidden="true">
        <div className="marquee-track">
          <span>meraklı kal</span><Heart size={13} /><span>bir şeyler dene</span><Heart size={13} /><span>küçük internet köşeleri</span><Heart size={13} />
          <span>meraklı kal</span><Heart size={13} /><span>bir şeyler dene</span><Heart size={13} /><span>küçük internet köşeleri</span><Heart size={13} />
        </div>
      </div>

      <section id="hakkimda" className="intro section-anchor content-section">
          <div className="section-kicker reveal"><span>01</span><span>Benim hakkımda ufak bilgiler</span></div>
        <div className="intro-layout">
          <h2 className="section-title reveal">Meraklıyım.<br /><em>Önüme çıkanın peşinde.</em></h2>
          <div className="intro-body reveal reveal-delay-1">
            <p className="lead-copy">Ben Kübra. Ankara Üniversitesi’nde Web Tasarımı ve Kodlama okuyorum.</p>
            <p>Bir şeyi önce düşünüyor, bazen çiziyor, sonra tarayıcıda deniyorum. Güzel görünmesinden çok bir his bırakmasını seviyorum. Henüz yolun başındayım; bu köşe de öğrenirken biriktirdiklerimin küçük bir kaydı.</p>
            <div className="university-stamp"><GraduationCap size={19} /><span>Ankara Üniversitesi<br /><small>Web Tasarımı ve Kodlama</small></span></div>
          </div>
        </div>
      </section>

      <section id="ilgiler" className="interest-section section-anchor content-section">
        <div className="section-heading-row reveal">
          <div className="section-kicker"><span>02</span><span>İlgi alanlarım</span></div>
          <p className="section-aside">Beni ekranın başına oturtan<br />beş küçük merak.</p>
        </div>
        <div className="interest-grid">
          {interests.map((interest, index) => {
            const Icon = interest.icon;
            return (
              <article key={interest.title} data-testid={`card-interest-${index}`} className={`interest-card accent-${interest.accent} reveal reveal-delay-${Math.min(index + 1, 3)}`}>
                <div className="interest-top"><span>{interest.number}</span><Icon size={22} strokeWidth={1.4} /></div>
                <h3>{interest.title}</h3>
                <p>{interest.description}</p>
                <span className="card-line" />
              </article>
            );
          })}
        </div>
      </section>

      <section id="denemeler" className="project-section section-anchor content-section">
        <div className="section-heading-row reveal">
          <div>
            <div className="section-kicker"><span>03</span><span>Denemeler</span></div>
            <h2 className="section-title compact">Aklımdan ekrana<br /><em>geçenler.</em></h2>
          </div>
          <div className="filter-row" aria-label="Proje filtreleri">
            {(['hepsi', 'arayüz', 'kod', 'araştırma'] as const).map((item) => (
              <button key={item} data-testid={`button-filter-${item}`} onClick={() => setFilter(item)} className={`filter-button ${filter === item ? 'is-selected' : ''}`}>{item}</button>
            ))}
          </div>
        </div>
        <div className="project-list">
          {filteredProjects.map((project, index) => (
            <article key={project.title} data-testid={`card-project-${project.number}`} className={`project-row reveal reveal-delay-${Math.min(index + 1, 3)}`}>
              <div className={`project-visual visual-${project.visual}`}>
                {project.visual === 'paper' && <><span className="visual-eye" /><span className="visual-line one" /><span className="visual-line two" /><span className="visual-note">burada<br />bir site<br />yaşar</span></>}
                {project.visual === 'window' && <><span className="window-top"><i /><i /><i /></span><span className="window-content"><b>oyun fikri_</b><span>sessiz bir oda<br />gece 03:17</span><small>başlamak için tıkla</small></span></>}
                {project.visual === 'signal' && <><span className="signal-grid" /><span className="signal-copy">CAN YOU<br /><em>SEE IT?</em></span><span className="signal-cursor">_</span></>}
              </div>
              <div className="project-info">
                <div className="project-number">{project.number} / {project.kind}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <div className="project-arrow"><ArrowUpRight size={20} /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="tool-section content-section">
        <div className="tool-note reveal"><span className="tool-asterisk">*</span><p>Hangi araçla yaptığım kadar,<br /><em>neden yaptığım da önemli.</em></p></div>
        <div className="tools-wrap reveal reveal-delay-1">
          <div className="section-kicker"><span>04</span><span>Araç kutum</span></div>
          <div className="tool-list">{tools.map((tool, index) => <span data-testid={`text-tool-${index}`} key={tool}><b>0{index + 1}</b>{tool}</span>)}</div>
        </div>
      </section>

      <section id="birlikte" className="collab-section content-section section-anchor">
        <div className="section-kicker reveal"><span>05</span><span>Küçük işletmeler</span></div>
        <div className="collab-layout">
          <h2 className="section-title reveal">Birlikte<br /><em>güzel bir şey yapalım.</em></h2>
          <div className="collab-body reveal reveal-delay-1">
            <p className="collab-lead">Küçük işletmeler için sade, sıcak ve kullanışlı web siteleri hazırlamak istiyorum.</p>
            <p>Hem kendimi geliştirirken hem de işini internette daha iyi anlatmak isteyen insanlara yardımcı oluyorum. Şimdilik bu çalışmalar için ücret talep etmiyorum; birlikte öğrenip birlikte üretiyoruz.</p>
            <div className="collab-points">
              <span>ücretsiz ilk çalışma</span>
              <span>ihtiyaca göre tasarım</span>
              <span>birlikte öğrenme</span>
            </div>
            <button data-testid="button-collab-contact" onClick={() => scrollToId('iletisim')} className="primary-button">Bir fikrin varsa yaz <ArrowUpRight size={16} /></button>
          </div>
        </div>
      </section>

      <section id="iletisim" className="contact-section section-anchor content-section">
        <div className="contact-orbit" aria-hidden="true"><div /><Heart size={34} strokeWidth={1} /></div>
        <div className="section-kicker reveal"><span>06</span><span>İletişim</span></div>
        <div className="contact-layout">
          <div className="reveal">
            <h2 className="contact-title">Bir şey<br /><em>konuşalım mı?</em></h2>
            <p className="contact-copy">Bir fikir, bir soru ya da sadece merhaba. Mesaj taslağını hazırlayabilirsin; iletişim adresimi buraya yakında ekleyeceğim.</p>
            <button data-testid="button-copy-contact" onClick={copyContactNote} className="text-button">{copied ? <><Check size={15} /> Taslak kopyalandı</> : <><Copy size={15} /> Mesaj taslağını kopyala</>}</button>
          </div>
          <form data-testid="form-contact" onSubmit={prepareMessage} className="contact-form reveal reveal-delay-1">
            <label><span>Adın</span><input data-testid="input-name" name="ad" required placeholder="Nasıl hitap edeyim?" /></label>
            <label><span>Mesajın</span><textarea data-testid="input-message" name="mesaj" required rows={4} placeholder="Aklından geçenleri anlat..." /></label>
            <button data-testid="button-send-message" type="submit" className="primary-button">{messageReady ? 'Taslak hazır' : 'Mesajı hazırla'} <ArrowUpRight size={16} /></button>
            {messageReady && <p data-testid="status-message-ready" className="form-status">Mesajın hazır. İletişim adresi eklendiğinde buradan doğrudan gönderebilirsin.</p>}
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <p data-testid="text-footer"><Heart size={13} /> Kübra Dalkılıç’ın internet köşesi · merakla yapıldı</p>
        <div className="footer-links">
          <button data-testid="button-footer-top" onClick={() => scrollToId('baslangic')}>başa dön <ArrowUpRight size={13} /></button>
          <button data-testid="button-footer-github" onClick={() => scrollToId('iletisim')}><Github size={14} /> github bağlantısı yakında</button>
        </div>
      </footer>
    </main>
  );
}

export default App;