import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, Code2, Copy, ExternalLink, Github, Layers3, Linkedin, Mail, Menu, PenTool, Sparkles, X } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  type: 'arayüz' | 'kod' | 'deney';
  art: string;
  accent: string;
  href: string;
};

const projects: Project[] = [
  {
    id: 'mavi-saat',
    title: 'Mavi Saat',
    eyebrow: '01 / Portföy denemesi',
    description: 'Bir fotoğrafçının hikâyelerini, gece mavisi ve sıcak kâğıt dokusuyla buluşturan editoryal bir ana sayfa.',
    tags: ['Figma', 'HTML / CSS', 'Responsive'],
    type: 'arayüz',
    art: 'art-saat',
    accent: 'hsl(192 36% 33%)',
    href: 'https://www.figma.com/',
  },
  {
    id: 'rota',
    title: 'Rota',
    eyebrow: '02 / Web uygulaması',
    description: 'İstanbul içinde küçük kaçamakları kaydetmek için geliştirdiğim; harita, not ve merak duygusunu birleştiren arayüz.',
    tags: ['React', 'TypeScript', 'Harita'],
    type: 'kod',
    art: 'art-rota',
    accent: 'hsl(9 73% 50%)',
    href: 'https://github.com/',
  },
  {
    id: 'sesli-notlar',
    title: 'Sesli Notlar',
    eyebrow: '03 / Arayüz araştırması',
    description: 'Düşünceleri düzenlemek yerine yakalamaya odaklanan, ses dalgalarından ilham alan küçük bir mobil deney.',
    tags: ['UX Writing', 'Prototip', 'Motion'],
    type: 'deney',
    art: 'art-ses',
    accent: 'hsl(48 85% 59%)',
    href: 'https://dribbble.com/',
  },
];

const skills = [
  { name: 'Arayüz tasarımı', detail: 'Figma · Grid · Prototipleme', icon: PenTool },
  { name: 'Frontend geliştirme', detail: 'HTML · CSS · JavaScript · React', icon: Code2 },
  { name: 'Ürün düşüncesi', detail: 'Araştırma · Akış · İçerik', icon: Layers3 },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'hepsi' | Project['type']>('hepsi');
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const filteredProjects = useMemo(
    () => filter === 'hepsi' ? projects : projects.filter((project) => project.type === filter),
    [filter],
  );

  const copyEmail = async () => {
    await navigator.clipboard?.writeText('merhaba@kubra.dev');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(form.get('konu') || 'Birlikte üretelim'));
    const body = encodeURIComponent(`Merhaba Kübra,\n\n${String(form.get('mesaj') || '')}\n\nİletişim: ${String(form.get('email') || '')}`);
    window.location.href = `mailto:merhaba@kubra.dev?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const closeMenuAndScroll = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <main className="grain min-h-[100dvh] overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[hsl(var(--border)/.72)] bg-[hsl(var(--background)/.86)] backdrop-blur-md">
        <nav className="mx-auto flex h-[4.6rem] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12" aria-label="Ana navigasyon">
          <button data-testid="button-logo" onClick={() => scrollToId('baslangic')} className="group flex items-center gap-3 text-left" aria-label="Başlangıca git">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--primary))] font-display text-lg font-bold text-[hsl(var(--primary-foreground))] transition-transform group-hover:rotate-12">k.</span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">Kübra<span className="text-[hsl(var(--primary))]"> /</span> web meraklısı</span>
          </button>
          <div className="hidden items-center gap-8 md:flex">
            {[
              ['Hakkımda', 'hakkimda'],
              ['İşlerim', 'islerim'],
              ['Yolculuk', 'yolculuk'],
              ['İletişim', 'iletisim'],
            ].map(([label, id]) => (
              <button key={id} data-testid={`button-nav-${id}`} onClick={() => scrollToId(id)} className="line-link text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]">{label}</button>
            ))}
          </div>
          <button data-testid="button-menu" className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--border))] md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] px-5 py-5 md:hidden">
            {[
              ['Hakkımda', 'hakkimda'],
              ['İşlerim', 'islerim'],
              ['Yolculuk', 'yolculuk'],
              ['İletişim', 'iletisim'],
            ].map(([label, id]) => (
              <button key={id} data-testid={`button-mobile-nav-${id}`} onClick={() => closeMenuAndScroll(id)} className="block w-full border-b border-[hsl(var(--border))] py-3 text-left font-display text-xl">{label}</button>
            ))}
          </div>
        )}
      </header>

      <section id="baslangic" className="relative mx-auto grid min-h-[700px] max-w-7xl items-center px-5 pb-24 pt-36 sm:px-8 lg:min-h-[800px] lg:grid-cols-[1.12fr_.88fr] lg:gap-10 lg:px-12 lg:pt-32">
        <div className="relative z-10">
          <div className="reveal mb-7 flex items-center gap-3 font-code text-[11px] uppercase tracking-[.18em] text-[hsl(var(--secondary))]">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_0_5px_hsl(var(--primary)/.14)]" />
            Ankara'dan selamlar · 2026
          </div>
          <h1 data-testid="text-hero-title" className="reveal reveal-delay-1 max-w-3xl font-display text-[clamp(3.6rem,9vw,8.6rem)] font-bold leading-[.9] tracking-[-.075em] text-[hsl(var(--foreground))]">
            Kodla<br /><span className="text-[hsl(var(--primary))]">düşünüyorum.</span>
          </h1>
          <p data-testid="text-hero-description" className="reveal reveal-delay-2 mt-9 max-w-xl text-lg leading-8 text-[hsl(var(--muted-foreground))] sm:text-xl">
            Ben Kübra. Ankara Üniversitesi'nde okuyor, web tasarımı ve kodlama öğreniyorum. Merakımı küçük ekranlara ve çalışan prototiplere dönüştürüyorum; yolun başında olduğum için her gün yeni bir şey deniyorum.
          </p>
          <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-center gap-5">
            <button data-testid="button-hero-projects" onClick={() => scrollToId('islerim')} className="group flex items-center gap-3 rounded-full bg-[hsl(var(--primary))] px-6 py-3.5 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-transform hover:-translate-y-1">
              Neler yaptım <ArrowDownRight size={17} className="transition-transform group-hover:translate-y-1" />
            </button>
            <button data-testid="button-hero-cv" onClick={() => scrollToId('yolculuk')} className="line-link flex items-center gap-2 text-sm font-semibold">
              Yolculuğuma bak <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div className="reveal reveal-delay-2 relative mt-12 min-h-[330px] lg:mt-0 lg:min-h-[500px]" aria-label="Yaratıcı portre alanı">
          <div className="absolute right-0 top-3 h-[82%] w-[82%] rounded-[47%_53%_42%_58%/49%_39%_61%_51%] bg-[hsl(var(--secondary))] transition-transform duration-700 hover:rotate-3" />
          <div className="absolute bottom-2 left-[4%] h-[75%] w-[78%] rotate-[-8deg] rounded-[3rem] border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--accent))]" />
          <div className="absolute left-[10%] top-[12%] flex h-[68%] w-[73%] rotate-[5deg] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[hsl(var(--primary))] p-7 text-[hsl(var(--primary-foreground))] shadow-[12px_14px_0_hsl(var(--foreground)/.08)] sm:p-9">
            <div className="flex justify-between font-code text-[10px] uppercase tracking-widest">
              <span>öğrenme günlüğü</span><span>no. 014</span>
            </div>
            <div>
              <div className="mb-5 h-16 w-16 rounded-full border border-current/30 bg-[hsl(var(--accent))] p-2">
                <div className="h-full w-full rounded-full border border-dashed border-[hsl(var(--foreground)/.35)]" />
              </div>
              <p className="font-display text-4xl font-bold leading-[.95] tracking-tight sm:text-5xl">Her fikir<br />bir arayüz.</p>
            </div>
            <div className="flex items-end justify-between text-xs">
              <span>HTML / CSS / merak</span><ArrowUpRight size={20} />
            </div>
          </div>
          <span className="absolute bottom-0 right-0 rotate-[-8deg] font-code text-[10px] uppercase tracking-[.18em] text-[hsl(var(--muted-foreground))]">scroll ↓</span>
        </div>
      </section>

      <div className="border-y border-[hsl(var(--foreground)/.12)] bg-[hsl(var(--secondary))] py-3 text-[hsl(var(--background))]">
        <div className="flex w-max animate-[marquee_24s_linear_infinite] items-center gap-8 whitespace-nowrap font-code text-[11px] uppercase tracking-[.18em]">
          <span>merakla yapıyorum</span><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" /><span>öğrenirken paylaşıyorum</span><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" /><span>arayüz · kod · hikâye</span><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" /><span>merakla yapıyorum</span><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" /><span>öğrenirken paylaşıyorum</span>
        </div>
      </div>

      <section id="hakkimda" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div className="reveal">
            <p className="font-code text-[11px] uppercase tracking-[.18em] text-[hsl(var(--primary))]">01 / Hakkımda</p>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[.98] tracking-tight sm:text-5xl">Biraz<br />kendimden.</h2>
          </div>
          <div className="reveal reveal-delay-1">
            <p className="max-w-3xl font-display text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              İyi bir web sitesinin sadece güzel görünmediğine, bir şey hissettirdiğine inanıyorum.
            </p>
            <div className="mt-8 grid gap-7 text-[hsl(var(--muted-foreground))] sm:grid-cols-2 sm:gap-10">
              <p className="leading-7">Ankara Üniversitesi'nde okuyorum. Boş zamanlarımda bir fikri alıp önce kâğıda çiziyor, sonra tarayıcıda ayağa kaldırıyorum. Tasarım ve kod arasında gidip gelmek bana iyi geliyor.</p>
              <p className="leading-7">Bu site de bunun bir parçası: kusursuz görünmek için değil, ne öğrendiğimi ve nereye gitmek istediğimi açıkça göstermek için var. Birlikte küçük ama iyi bir şey yapmak istersen, konuşalım.</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {['Ankara, TR', 'Ankara Üniversitesi', 'Yeni fikirlere açık'].map((item) => <span key={item} data-testid={`badge-${item}`} className="rounded-full border border-[hsl(var(--border))] px-4 py-2 font-code text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{item}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--muted)/.48)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-24 lg:px-12 lg:py-28">
          <div className="reveal">
            <p className="font-code text-[11px] uppercase tracking-[.18em] text-[hsl(var(--primary))]">02 / Araç kutum</p>
            <h2 className="mt-5 max-w-xs font-display text-4xl font-bold leading-[.98] tracking-tight">Öğrenirken kullandıklarım.</h2>
            <p className="mt-6 max-w-xs leading-7 text-[hsl(var(--muted-foreground))]">Liste değişiyor, merak sabit kalıyor. Şu an odağım sağlam temeller ve iyi detaylar.</p>
          </div>
          <div className="grid gap-0 border-t border-[hsl(var(--border))]">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={skill.name} data-testid={`skill-${index}`} className="reveal group grid gap-4 border-b border-[hsl(var(--border))] py-6 sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-5">
                  <Icon size={23} strokeWidth={1.5} className="text-[hsl(var(--primary))]" />
                  <div><h3 className="font-display text-2xl font-semibold">{skill.name}</h3><p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{skill.detail}</p></div>
                  <span className="font-code text-xs text-[hsl(var(--muted-foreground))]">0{index + 1}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="islerim" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div className="reveal">
            <p className="font-code text-[11px] uppercase tracking-[.18em] text-[hsl(var(--primary))]">03 / Seçili işler</p>
            <h2 className="mt-5 font-display text-5xl font-bold leading-[.9] tracking-[-.04em] sm:text-7xl">Denemeler,<br /><span className="text-[hsl(var(--primary))]">notlar,</span> işler.</h2>
          </div>
          <div className="reveal flex flex-wrap gap-2 sm:max-w-xs sm:justify-end">
            {(['hepsi', 'arayüz', 'kod', 'deney'] as const).map((item) => (
              <button key={item} data-testid={`button-filter-${item}`} onClick={() => setFilter(item)} className={`rounded-full border px-3.5 py-2 font-code text-[10px] uppercase tracking-wider transition-colors ${filter === item ? 'border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))] text-[hsl(var(--background))]' : 'border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--foreground))] hover:text-[hsl(var(--foreground))]'}`}>{item}</button>
            ))}
          </div>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <a key={project.id} data-testid={`link-project-${project.id}`} href={project.href} target="_blank" rel="noreferrer" className={`project-card reveal group block ${index === 0 && filteredProjects.length > 1 ? 'lg:row-span-2' : ''}`}>
              <div className={`project-art ${project.art} relative min-h-[330px] overflow-hidden rounded-[1.5rem] border border-[hsl(var(--foreground)/.1)] p-7 sm:min-h-[380px]`}>
                <div className="flex items-start justify-between font-code text-[10px] uppercase tracking-widest text-[hsl(var(--foreground)/.65)]"><span>{project.eyebrow}</span><ArrowUpRight className="project-arrow" size={19} /></div>
                {project.id === 'mavi-saat' && <><div className="absolute bottom-[-15%] right-[-8%] h-[70%] w-[74%] rounded-tl-[9rem] bg-[hsl(var(--background)/.9)] shadow-[-20px_-20px_0_hsl(var(--accent)/.7)]" /><div className="absolute bottom-[12%] right-[13%] h-24 w-24 rounded-full border-[14px] border-[hsl(var(--primary))] bg-[hsl(var(--secondary))]" /></>}
                {project.id === 'rota' && <><div className="absolute inset-x-[13%] bottom-[13%] top-[22%] rotate-[-7deg] rounded-[1.2rem] border border-[hsl(var(--background)/.35)] bg-[hsl(var(--background)/.86)] p-5 shadow-[10px_11px_0_hsl(var(--foreground)/.11)]"><div className="h-2 w-24 rounded-full bg-[hsl(var(--primary))]" /><div className="mt-5 grid grid-cols-6 gap-2">{Array.from({ length: 24 }).map((_, i) => <span key={i} className={`h-5 rounded-sm ${i % 5 === 0 ? 'bg-[hsl(var(--accent))]' : 'bg-[hsl(var(--secondary)/.15)]'}`} />)}</div></div><span className="absolute bottom-[17%] right-[14%] h-9 w-9 rounded-full border-4 border-[hsl(var(--background))] bg-[hsl(var(--primary))]" /></>}
                {project.id === 'sesli-notlar' && <><div className="absolute bottom-[22%] left-[13%] right-[13%] flex h-28 items-center justify-center gap-1">{Array.from({ length: 23 }).map((_, i) => <span key={i} className="w-1.5 rounded-full bg-[hsl(var(--foreground)/.72)]" style={{ height: `${24 + ((i * 17) % 68)}%` }} />)}</div><div className="absolute bottom-[15%] left-[13%] right-[13%] border-t border-[hsl(var(--foreground)/.35)]" /><div className="absolute left-[13%] top-[30%] font-display text-5xl font-bold">dinle.</div></>}
              </div>
              <div className="flex items-start justify-between gap-5 border-b border-[hsl(var(--border))] py-5">
                <div><h3 className="font-display text-3xl font-bold">{project.title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-[hsl(var(--muted-foreground))]">{project.description}</p></div>
                <div className="flex shrink-0 flex-wrap justify-end gap-1.5 sm:max-w-[150px]">{project.tags.map((tag) => <span key={tag} className="rounded-full bg-[hsl(var(--muted))] px-2.5 py-1 font-code text-[9px] text-[hsl(var(--muted-foreground))]">{tag}</span>)}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="yolculuk" className="scroll-mt-20 bg-[hsl(var(--secondary))] text-[hsl(var(--background))]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-28 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-24 lg:px-12 lg:py-36">
          <div className="reveal">
            <p className="font-code text-[11px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">04 / Öğrenme günlüğü</p>
            <h2 className="mt-5 font-display text-5xl font-bold leading-[.9] tracking-tight sm:text-6xl">Yolun<br />kendisi.</h2>
            <p className="mt-7 max-w-xs leading-7 text-[hsl(var(--background)/.7)]">Büyük planlardan çok, düzenli küçük adımlara güveniyorum. Takvimim böyle görünüyor.</p>
          </div>
          <div className="reveal reveal-delay-1 border-t border-[hsl(var(--background)/.22)]">
            {[
              ['2024 / Kış', 'Kodla tanışma', 'İlk HTML sayfamı yaptım. CSS ile neden bu kadar vakit geçirdiğimi hâlâ açıklayamıyorum.'],
              ['2024 / Yaz', 'Tasarımın dilini aramak', 'Figma, grid sistemleri ve iyi bir boşluğun ne kadar şey anlatabileceği üzerine çalıştım.'],
              ['2025 / Şimdi', 'Birlikte üretmek', 'React ve TypeScript öğreniyorum. Açık kaynak katkıları ve gerçek projeler için hazırım.'],
            ].map(([date, title, text], index) => (
              <div key={date} data-testid={`timeline-item-${index}`} className="grid gap-4 border-b border-[hsl(var(--background)/.22)] py-7 sm:grid-cols-[8rem_1fr] sm:gap-8">
                <span className="font-code text-[10px] uppercase tracking-wider text-[hsl(var(--accent))]">{date}</span>
                <div><h3 className="font-display text-2xl font-semibold">{title}</h3><p className="mt-2 max-w-lg leading-7 text-[hsl(var(--background)/.68)]">{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="iletisim" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
        <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
          <div className="reveal">
            <p className="font-code text-[11px] uppercase tracking-[.18em] text-[hsl(var(--primary))]">05 / İletişim</p>
            <h2 className="mt-5 max-w-xl font-display text-5xl font-bold leading-[.9] tracking-tight sm:text-7xl">Bir fikir<br /><span className="text-[hsl(var(--primary))]">var mı?</span></h2>
            <p className="mt-7 max-w-sm text-lg leading-7 text-[hsl(var(--muted-foreground))]">Bir proje, bir soru veya sadece merhaba demek için yazabilirsin. Gelen kutum açık.</p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
               <button data-testid="button-copy-email" onClick={copyEmail} className="group flex items-center gap-2 font-code text-xs text-[hsl(var(--secondary))]"><span className="border-b border-[hsl(var(--secondary))] pb-1">merhaba@kubra.dev</span>{copied ? <Check size={15} /> : <Copy size={15} className="transition-transform group-hover:scale-110" />}</button>
              <span className="text-[hsl(var(--border))]">/</span>
              <a data-testid="link-linkedin" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a data-testid="link-github" href="https://github.com/" target="_blank" rel="noreferrer" className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]" aria-label="GitHub"><Github size={18} /></a>
            </div>
          </div>
          <form data-testid="form-contact" onSubmit={sendMessage} className="reveal reveal-delay-1 rounded-[1.5rem] border border-[hsl(var(--border))] bg-[hsl(var(--card)/.7)] p-6 sm:p-9">
            <div className="grid gap-7">
              <label className="grid gap-2"><span className="font-code text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Adın</span><input data-testid="input-name" name="ad" required placeholder="Nasıl hitap edeyim?" className="border-b border-[hsl(var(--border))] bg-transparent py-2 outline-none transition-colors placeholder:text-[hsl(var(--muted-foreground)/.7)] focus:border-[hsl(var(--primary))]" /></label>
              <label className="grid gap-2"><span className="font-code text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">E-posta</span><input data-testid="input-email" name="email" type="email" required placeholder="sen@ornek.com" className="border-b border-[hsl(var(--border))] bg-transparent py-2 outline-none transition-colors placeholder:text-[hsl(var(--muted-foreground)/.7)] focus:border-[hsl(var(--primary))]" /></label>
              <label className="grid gap-2"><span className="font-code text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Konu</span><input data-testid="input-subject" name="konu" required placeholder="Birlikte ne yapalım?" className="border-b border-[hsl(var(--border))] bg-transparent py-2 outline-none transition-colors placeholder:text-[hsl(var(--muted-foreground)/.7)] focus:border-[hsl(var(--primary))]" /></label>
              <label className="grid gap-2"><span className="font-code text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Mesajın</span><textarea data-testid="input-message" name="mesaj" required rows={3} placeholder="Aklından geçenleri anlat..." className="resize-none border-b border-[hsl(var(--border))] bg-transparent py-2 outline-none transition-colors placeholder:text-[hsl(var(--muted-foreground)/.7)] focus:border-[hsl(var(--primary))]" /></label>
              <button data-testid="button-send-message" type="submit" className="group mt-2 flex w-fit items-center gap-3 rounded-full bg-[hsl(var(--foreground))] px-6 py-3.5 text-sm font-semibold text-[hsl(var(--background))] transition-transform hover:-translate-y-1">{sent ? 'Mail uygulaman açılıyor' : 'Mesajı gönder'} <Mail size={16} className="transition-transform group-hover:translate-x-1" /></button>
            </div>
          </form>
        </div>
      </section>

      <footer className="border-t border-[hsl(var(--border))]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
           <p data-testid="text-footer" className="font-code text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">© 2026 Kübra · merakla yapıldı</p>
          <button data-testid="button-back-top" onClick={() => scrollToId('baslangic')} className="group flex items-center gap-2 self-start font-code text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] md:self-auto">Başa dön <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></button>
        </div>
      </footer>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-38%) } } .art-saat { background: hsl(48 85% 59%); } .art-rota { background: hsl(9 73% 50%); } .art-ses { background: hsl(192 36% 33%); color: hsl(35 42% 96%); }`}</style>
    </main>
  );
}

export default App;
