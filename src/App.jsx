import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  Code2 as Github, BriefcaseBusiness as Linkedin, Mail, Phone, MapPin, ExternalLink, Menu, X, ArrowUp,
  Code2, Layers, Database, Wrench, ChevronRight, Star, GitFork, Eye,
  Zap, Shield, Search, CheckCircle, Download, Send, Terminal,
  Cpu, Box, Cloud, Workflow, MessageSquare, User, BookOpen, TrendingUp,
  Award, BadgeCheck, FileText, BriefcaseBusiness
} from "lucide-react";
import heroPhoto from "./assets/jerin-hero.png";
import zentodoCover from "./assets/zentodo-cover.png";
import blockchainCover from "./assets/blockchain-cover.png";
import smartHelmetCover from "./assets/smart-helmet-cover.png";
import shopShowcaseCover from "./assets/shop-showcase-cover.png";
import iipWebAppCover from "./assets/iip-web-app-cover.png";
import watchGalleryCover from "./assets/watch-gallery-cover.png";
import movieExperienceCover from "./assets/movie-experience-cover.png";
import northloomCover from "./assets/northloom-cover.png";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Skills", "Projects", "Case Studies", "Credentials", "GitHub", "Contact"];

const STATS = [
  { label: "Projects Completed", value: 12, suffix: "+" },
  { label: "Technologies Learned", value: 20, suffix: "+" },
  { label: "GitHub Contributions", value: 300, suffix: "+" },
  { label: "Certifications", value: 4, suffix: "" },
];

const SKILLS = {
  Frontend: { icon: <Layers size={18} />, items: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Bootstrap"] },
  Backend: { icon: <Terminal size={18} />, items: ["Python", "Django", "Django REST Framework", "Node.js", "Express.js", "PHP"] },
  Database: { icon: <Database size={18} />, items: ["PostgreSQL", "MySQL", "SQLite"] },
  Tools: { icon: <Wrench size={18} />, items: ["Git", "GitHub", "Figma", "Postman", "VS Code", "Vercel"] },
};

const TECH_LOGOS = {
  "HTML5": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Bootstrap": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Django": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  "Django REST Framework": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/djangorest/djangorest-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "SQLite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "Postman": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  "Vercel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  "AI Integrations": "https://cdn.simpleicons.org/openai/ffffff",
  "Docker & Containers": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
};

const SKILL_SCORES = {
  "HTML5": 97,
  "CSS3": 95,
  "JavaScript": 94,
  "React.js": 95,
  "Tailwind CSS": 96,
  "Bootstrap": 92,
  "Python": 94,
  "Django": 93,
  "Django REST Framework": 91,
  "Node.js": 88,
  "Express.js": 86,
  "PHP": 84,
  "PostgreSQL": 89,
  "MySQL": 88,
  "SQLite": 85,
  "Git": 95,
  "GitHub": 94,
  "Figma": 93,
  "Postman": 87,
  "VS Code": 96,
  "Vercel": 88,
};

const PROJECTS = [
  { title: "Zentodo", desc: "Full-stack task management SPA with priority color-coding, subtask nesting, JWT auth, and 10+ REST endpoints.", stack: ["React", "Django", "JWT", "PostgreSQL", "Vercel"], color: "#7c3aed", image: zentodoCover, codeUrl: "https://github.com/JerinTV/TODO.git", demoUrl: "https://todo-kfdoya5n6-jerintvs-projects.vercel.app" },
  { title: "Blockchain Product Detector", desc: "Role-based dashboards for 4 user types with NFC verification, product lifecycle viz, and hybrid on/off-chain data.", stack: ["React", "Node.js", "Express", "Blockchain", "MySQL"], color: "#2563eb", image: blockchainCover, codeUrl: "https://github.com/JerinTV/blockchain.git", demoUrl: "https://supply-chain-1-0rut.onrender.com/" },
  { title: "Smart Helmet Safety Portal", desc: "Real-time IoT dashboard with live GPS map, speed telemetry, emergency alerts, and 3-role access control.", stack: ["ESP32", "PHP", "MySQL", "OpenStreetMap", "GPS"], color: "#059669", image: smartHelmetCover, codeUrl: "https://github.com/JerinTV/SMART_HELMET.git", demoUnavailable: true },
];

const LIVE_PROJECTS = [
  {
    title: "Shopping Experience",
    type: "E-commerce UI",
    desc: "A polished storefront experience focused on product browsing, visual hierarchy, and conversion-ready interaction design.",
    url: "https://frontend-test-blond.vercel.app",
    color: "#f97316",
    image: shopShowcaseCover,
    icon: <BriefcaseBusiness size={18} />,
    signal: "Retail flow",
  },
  {
    title: "IIP Web App",
    type: "Interactive Build",
    desc: "A deployed project that demonstrates fast iteration, component-based frontend thinking, and production hosting workflow.",
    url: "https://iip-j9nc265fz-jerintvs-projects.vercel.app",
    color: "#38bdf8",
    image: iipWebAppCover,
    icon: <Cpu size={18} />,
    signal: "Live deployed",
  },
  {
    title: "Watch Gallery",
    type: "Product Landing",
    desc: "An aesthetic watch-focused interface with premium spacing, rich presentation, and strong first-screen brand impact.",
    url: "https://watch-gamma-ashen.vercel.app",
    color: "#a78bfa",
    image: watchGalleryCover,
    icon: <Eye size={18} />,
    signal: "Premium UI",
  },
  {
    title: "NORTHLOOM",
    type: "Streetwear Storefront",
    desc: "A premium unisex streetwear storefront with bold hero messaging, smooth product navigation, and conversion-focused checkout cues.",
    url: "https://shop-delta-vert.vercel.app",
    color: "#c09a5b",
    image: northloomCover,
    icon: <BriefcaseBusiness size={18} />,
    signal: "Fashion retail",
  },
  {
    title: "Movie Experience",
    type: "Entertainment UI",
    desc: "A movie-themed frontend built for visual appeal, card scanning, and immersive browsing across modern devices.",
    url: "https://movie-liart-pi.vercel.app",
    color: "#ef4444",
    image: movieExperienceCover,
    icon: <Star size={18} />,
    signal: "Media layout",
  },
];

const CASE_STUDIES = [
  {
    shortTitle: "Zentodo",
    title: "Zentodo — From Chaos to Clarity",
    subtitle: "Designing a task app users actually love",
    color: "#7c3aed",
    steps: [
      { phase: "Problem", text: "Existing task apps overwhelm users with features. Goal: a focused, fast-loading SPA that reduces cognitive load." },
      { phase: "Research", text: "Surveyed 15 students and developers. Pain points: poor mobile UX, no subtask support, ugly color coding." },
      { phase: "UI Design", text: "Built a Figma prototype with a card-first layout, priority hues, and a persistent sidebar. Iterated 3 rounds." },
      { phase: "Development", text: "React + Django REST. JWT refresh tokens, soft-delete animations, CORS-ready API deployed on Vercel." },
      { phase: "Results", text: "10+ API endpoints, sub-200ms response times, zero reported UX blockers in peer testing." },
    ],
  },
  {
    shortTitle: "Smart Helmet",
    title: "Smart Helmet — Safety Meets Design",
    subtitle: "IoT dashboard for emergency response",
    color: "#0891b2",
    steps: [
      { phase: "Problem", text: "Helmet crash data was logged but invisible. Families had no visibility into rider safety in real-time." },
      { phase: "Research", text: "Studied emergency alert UX, GPS accuracy tradeoffs, and IoT data latency constraints with ESP32." },
      { phase: "UI Design", text: "Designed 3 distinct dashboards (rider, family, admin) with color-coded alert states and map widgets." },
      { phase: "Development", text: "ESP32 + NEO-6M GPS + Hall sensor → MySQL → PHP backend → React dashboard. MVC pattern throughout." },
      { phase: "Results", text: "Live location updated every 2s, crash alert delivered in under 5s, 3-role access fully functional." },
    ],
  },
  {
    shortTitle: "Blockchain",
    title: "Blockchain Product Detector",
    subtitle: "Trust-first product verification with role-based workflows",
    color: "#2563eb",
    steps: [
      { phase: "Problem", text: "Product authenticity data was fragmented across manufacturers, sellers, and customers. Users needed a simple way to verify origin and lifecycle events." },
      { phase: "Research", text: "Mapped 4 user roles and studied where NFC verification, database records, and blockchain proofs should meet." },
      { phase: "UI Design", text: "Designed separate dashboards for each role, keeping verification status, ownership events, and product history easy to scan." },
      { phase: "Development", text: "Built a React interface with Node.js and Express APIs, using hybrid on-chain and off-chain data to balance trust, speed, and cost." },
      { phase: "Results", text: "Delivered product verification, lifecycle tracking, and role-aware flows that make authenticity checks understandable to non-technical users." },
    ],
  },
];

const LEARNING = [
  { title: "AI Integrations", progress: 40, color: "#A78BFA", copy: "Building practical AI-assisted interfaces and workflow automations." },
  { title: "Docker & Containers", progress: 30, color: "#2496ed", copy: "Packaging apps cleanly for repeatable development and deployment." },
  { title: "System Design", progress: 35, color: "#60a5fa", copy: "Studying scalable architecture, service boundaries, and resilient product systems." },
];

const CREDENTIAL_GROUPS = [
  {
    category: "Technical Core",
    summary: "Engineering credentials that reinforce practical full-stack, software development, and Python foundations.",
    credentials: [
      {
        title: "Full Stack Developer Course",
        issuer: "Certificate of Completion",
        impact: "Validated hands-on training across frontend, backend, and deployment-oriented web development workflows.",
        href: "/certificates/full-stack-developer-course.pdf",
      },
      {
        title: "Career Essentials in Software Development",
        issuer: "Microsoft & LinkedIn Learning",
        impact: "Completed career-focused software development training covering engineering fundamentals and workplace practices.",
        href: "/certificates/career-essentials-software-development.pdf",
      },
      {
        title: "Python Programming Certificate",
        issuer: "Course Completion Credential",
        impact: "Strengthened Python fundamentals used across backend logic, automation, and problem-solving workflows.",
        href: "/certificates/python-certificate.pdf",
      },
    ],
  },
  {
    category: "Leadership & Impact",
    summary: "Recognition that highlights initiative, communication, and campus-level community contribution.",
    credentials: [
      {
        title: "UI/UX Design Credential",
        issuer: "Design Learning Credential",
        impact: "Strengthened interface design, visual hierarchy, and user-centered product thinking for web experiences.",
        href: "/certificates/jerin-tv-2025-06-10.pdf",
      },
    ],
  },
];

const LIGHTHOUSE = [
  { label: "Performance", value: 92, icon: <Zap size={16} />, color: "#22c55e" },
  { label: "Accessibility", value: 94, icon: <Shield size={16} />, color: "#3b82f6" },
  { label: "SEO", value: 91, icon: <Search size={16} />, color: "#a855f7" },
  { label: "Best Practices", value: 89, icon: <CheckCircle size={16} />, color: "#f59e0b" },
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────

function GlowOrb({ className }) {
  return <div className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`} />;
}

function TriangleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 3 22 20H2L12 3Z" />
    </svg>
  );
}

function TechLogo({ name, className = "h-5 w-5" }) {
  const [failed, setFailed] = useState(false);
  const src = TECH_LOGOS[name];

  if (!src || failed) {
    return <Code2 size={18} className="text-slate-300" />;
  }

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`${className} object-contain`}
      onError={() => setFailed(true)}
    />
  );
}

function SkillScore({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const score = useCounter(value, 900, inView);

  return (
    <span
      ref={ref}
      className="inline-flex h-7 min-w-10 shrink-0 items-center justify-center rounded-lg border border-violet-300/15 bg-violet-300/[0.055] px-2 text-xs font-bold tabular-nums text-violet-100"
    >
      {inView ? score : 0}
    </span>
  );
}

function GradientText({ children, className = "" }) {
  return (
    <span className={`bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-mono tracking-widest uppercase mb-4"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
      {children}
    </motion.div>
  );
}

function SectionHeading({ label, title, sub }) {
  return (
    <div className="text-center mb-16">
      <SectionLabel>{label}</SectionLabel>
      <div className="section-heading-shell relative mx-auto max-w-4xl">
        <svg className="section-heading-lines" viewBox="0 0 820 150" aria-hidden="true">
          <path className="section-heading-base section-heading-base-left" d="M28 94 C102 42 174 42 236 80 C292 114 342 112 392 76" />
          <path className="section-heading-base section-heading-base-right" d="M792 94 C718 42 646 42 584 80 C528 114 478 112 428 76" />
          <path className="section-heading-glint section-heading-glint-left" pathLength="1000" d="M28 94 C102 42 174 42 236 80 C292 114 342 112 392 76" />
          <path className="section-heading-glint section-heading-glint-right" pathLength="1000" d="M792 94 C718 42 646 42 584 80 C528 114 478 112 428 76" />
        </svg>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative z-10 text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
        >
          {title}
        </motion.h2>
      </div>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

function GlassCard({ children, className = "", hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      className={`relative rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-6 overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {children}
    </motion.div>
  );
}

// ─── LOADING SCREEN ────────────────────────────────────────────────────────────

function LoadingScreen({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050508]"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white font-bold text-3xl shadow-2xl shadow-violet-900/60">
          J
        </div>
        <motion.div
          className="absolute -inset-3 rounded-3xl border border-violet-500/40"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-slate-400 font-mono text-sm tracking-widest"
      >
        LOADING PORTFOLIO...
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 200 }}
        transition={{ delay: 0.7, duration: 1.2, ease: "easeInOut" }}
        className="mt-4 h-0.5 bg-gradient-to-r from-violet-600 to-blue-500 rounded-full"
      />
    </motion.div>
  );
}

// ─── SCROLL PROGRESS ──────────────────────────────────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-600 via-purple-500 to-blue-500 z-[100] origin-left"
    />
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase().replace(" ", "-"))?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-[#050508]/90 backdrop-blur-xl border-b border-white/6 shadow-lg" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm">J</div>
          <span className="text-white font-semibold text-sm hidden sm:block">Jerin T V</span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button key={link} onClick={() => scrollTo(link)} className="px-4 py-2 text-slate-400 hover:text-white text-sm rounded-lg hover:bg-white/6 transition-all duration-200">
              {link}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <motion.a
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            href="#"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold shadow-lg shadow-violet-900/40 hover:shadow-violet-900/60 transition-shadow"
          >
            <Download size={14} /> Resume
          </motion.a>
          <button className="md:hidden text-slate-300 p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a12]/98 backdrop-blur-xl border-t border-white/6 px-6 py-4 flex flex-col gap-2"
          >
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => scrollTo(link)} className="text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-white/6 rounded-xl text-sm transition-all">
                {link}
              </button>
            ))}
            <a href="#" className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold">
              <Download size={14} /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function TypingText({ words }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    const timeout = deleting
      ? setTimeout(() => {
          setDisplayed((p) => p.slice(0, -1));
          if (displayed.length === 1) { setDeleting(false); setIdx((i) => (i + 1) % words.length); }
        }, 60)
      : setTimeout(() => {
          setDisplayed(word.slice(0, displayed.length + 1));
          if (displayed.length === word.length - 1) setTimeout(() => setDeleting(true), 1800);
        }, 100);
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, words]);

  return (
    <span className="text-violet-400 font-mono">
      {displayed}<span className="animate-pulse">|</span>
    </span>
  );
}

function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouse = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };

  return (
    <section id="home" onMouseMove={handleMouse} className="relative flex min-h-[88vh] items-center overflow-hidden pt-20 lg:min-h-[86vh]">
      <GlowOrb className="w-96 h-96 bg-violet-600 -top-20 -left-20" />
      <GlowOrb className="w-80 h-80 bg-blue-600 top-1/2 -right-20" />
      <GlowOrb className="w-64 h-64 bg-purple-700 bottom-0 left-1/3" />

      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="max-w-7xl mx-auto px-6 grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16 items-center w-full">
        {/* Left */}
        <div className="order-2 mx-auto w-full max-w-2xl pt-3 text-center lg:order-1 lg:mx-0 lg:max-w-none lg:pl-10 lg:pt-0 lg:text-left xl:pl-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mb-4 leading-tight"
          >
            <span className="block text-3xl font-semibold text-white md:text-4xl lg:text-5xl">Hi, I'm</span>
            <motion.span
              className="mt-1 block bg-gradient-to-r from-violet-300 via-white to-blue-300 bg-[length:220%_100%] bg-clip-text text-6xl font-black text-transparent drop-shadow-[0_0_28px_rgba(96,165,250,0.24)] md:text-7xl lg:text-8xl"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              Jerin T V
            </motion.span>
            <motion.span
              className="mx-auto mt-3 block max-w-xl text-2xl font-bold text-white md:text-3xl lg:mx-0"
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.32, duration: 0.65 }}
            >
              I design digital experiences that feel crafted, clear, and unforgettable.
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 h-8 text-2xl font-medium text-slate-300"
          >
            <TypingText words={["UI/UX Designer", "Product Interface Designer", "Frontend Experience Designer", "Design-minded Developer"]} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-slate-400 lg:mx-0"
          >
            A UI/UX designer with frontend depth, shaping elegant visual systems, smooth micro-interactions, and premium web interfaces for products that need to stand out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-10 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="flex min-w-[148px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-3.5 font-semibold text-white shadow-xl shadow-violet-900/40 transition-shadow hover:shadow-violet-900/70"
            >
              Hire Me <ChevronRight size={16} />
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              href="#"
              className="flex min-w-[148px] items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 font-semibold text-white transition-all hover:border-white/25 hover:bg-white/6"
            >
              <Download size={16} /> Resume
            </motion.a>
          </motion.div>
        </div>

        {/* Right — Avatar & badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className="order-1 relative flex items-center justify-center pb-4 sm:pb-5 lg:order-2 lg:pb-0"
        >
          <div className="hero-energy-field relative w-full max-w-[330px] sm:max-w-[390px] lg:max-w-[420px]">
            <motion.div
              aria-hidden="true"
              className="absolute inset-[8%] rounded-full bg-blue-500/20 blur-3xl scale-110"
              animate={{ scale: [0.92, 1.08, 0.96], opacity: [0.38, 0.68, 0.44], x: [-10, 16, -6], y: [8, -12, 10] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute inset-[14%] rounded-full bg-violet-500/18 blur-2xl scale-110"
              animate={{ scale: [1.06, 0.94, 1.04], opacity: [0.32, 0.58, 0.36], x: [14, -12, 10], y: [-8, 12, -10] }}
              transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <svg
              className="hero-energy-svg hero-energy-triangle"
              viewBox="0 0 420 560"
              aria-hidden="true"
            >
              <path className="hero-energy-path hero-energy-triangle-outer" pathLength="1000" d="M55 120 L365 120 L210 462 Z" />
              <path className="hero-energy-path hero-energy-triangle-middle" pathLength="1000" d="M78 138 L342 138 L210 433 Z" />
              <path className="hero-energy-path hero-energy-triangle-inner" pathLength="1000" d="M102 156 L318 156 L210 403 Z" />
              <path className="hero-energy-comet hero-energy-triangle-comet" pathLength="1000" d="M55 120 L365 120 L210 462 Z" />
            </svg>
            <motion.img
              src={heroPhoto}
              alt="Jerin T V, web designer and full stack developer"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative z-10 mx-auto block w-full scale-[1.18] object-contain saturate-110 contrast-105 drop-shadow-[0_30px_48px_rgba(0,0,0,0.45)] lg:scale-[1.24]"
            />
          </div>
        </motion.div>
      </div>

    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function StatCard({ label, value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(value, 2000, inView);
  const displayValue = inView ? count : value;
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black text-white mb-1">{displayValue}{suffix}</div>
      <div className="text-slate-500 text-sm">{label}</div>
    </div>
  );
}

function About() {
  const profileTags = ["KTU 2026", "CGPA 8.68", "Full Stack", "UI/UX"];
  const profileMetrics = [
    ["B.Tech CSE", "KTU 2026"],
    ["CGPA", "8.68 / 10"],
    ["HSC", "96.4%"],
  ];
  const orbitItems = [
    { icon: <MapPin size={16} />, label: "Location", value: "Kannur, Kerala" },
    { icon: <BookOpen size={16} />, label: "Degree", value: "B.Tech CSE" },
    { icon: <TrendingUp size={16} />, label: "Status", value: "Open to Offers" },
    { icon: <Star size={16} />, label: "Focus", value: "Full Stack + UI/UX" },
  ];

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A78BFA]/30 to-transparent" />
      <GlowOrb className="w-72 h-72 bg-[#A78BFA] top-0 right-0" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Profile" title={<>Designed mind,<br /><GradientText>engineering hands</GradientText></>} />

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="profile-panel relative overflow-hidden rounded-3xl border border-white/10 bg-[#08090f]/90 p-7 md:p-9 shadow-2xl shadow-black/30"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A78BFA]/60 to-transparent" />
            <div className="profile-scanline" aria-hidden="true" />
            <div className="mb-8 flex flex-wrap items-center gap-3">
              {profileTags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-full border border-[#A78BFA]/20 bg-[#A78BFA]/10 px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-[#A78BFA]"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <h3 className="mb-5 max-w-2xl bg-gradient-to-r from-white via-violet-100 to-blue-200 bg-clip-text text-3xl font-black leading-tight text-transparent md:text-5xl">
              Design-minded CSE fresher building polished web experiences.
            </h3>
            <div className="max-w-2xl space-y-5 text-base leading-relaxed text-slate-400">
              <p>
                I am from College of Engineering Thalassery, graduating in 2026, based in Kannur, Kerala, and looking toward strong product teams across India and remote.
              </p>
              <p>
                My strength is the bridge: Figma-level visual thinking, React interfaces, Django/REST APIs, and project work across IoT dashboards and blockchain verification systems.
              </p>
              <p>
                I am targeting internships with PPO potential in <strong className="text-[#A78BFA]">full-stack development</strong> and <strong className="text-white">UI/UX design</strong>, where craft, speed, and reliability matter.
              </p>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              {profileMetrics.map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-all hover:border-[#A78BFA]/30 hover:bg-[#A78BFA]/[0.055]"
                >
                  <div className="text-xs font-mono uppercase tracking-widest text-slate-500">{k}</div>
                  <div className="mt-2 text-lg font-bold text-white">{v}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid gap-5"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#08090f]/90 p-5 shadow-2xl shadow-black/30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.13),transparent_58%)]" />
              <div className="profile-orbit relative mx-auto flex aspect-square max-h-[420px] min-h-[310px] items-center justify-center">
                <div className="profile-orbit-ring" aria-hidden="true" />
                <div className="profile-orbit-ring profile-orbit-ring-two" aria-hidden="true" />
                <div className="relative z-10 flex h-40 w-40 flex-col items-center justify-center rounded-full border border-[#A78BFA]/25 bg-[#0d0e16]/90 text-center shadow-[0_0_70px_rgba(167,139,250,0.18)]">
                  <div className="bg-gradient-to-r from-violet-200 via-white to-blue-200 bg-clip-text text-6xl font-black text-transparent">J</div>
                </div>
                {orbitItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={`profile-orbit-chip profile-orbit-chip-${i + 1}`}
                  >
                    <span>{item.icon}</span>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{item.label}</div>
                      <div className="text-sm font-bold text-white">{item.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -5 }}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#08090f]/90 p-5 shadow-xl shadow-black/20 transition-all hover:border-[#A78BFA]/30"
                >
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#A78BFA]/10 blur-2xl" />
                  <StatCard {...stat} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const categoryCopy = {
    Frontend: "Interfaces, motion systems, responsive layouts, and component craft.",
    Backend: "APIs, auth flows, database-backed logic, and reliable service layers.",
    Database: "Schema thinking, relational data, queries, and practical persistence.",
    Tools: "Shipping workflow, design handoff, testing habits, and deployment discipline.",
  };

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#A78BFA]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Capabilities" title={<>Stack with<br /><GradientText>visual command</GradientText></>} />

        <div className="grid gap-6 lg:grid-cols-2">
          {Object.entries(SKILLS).map(([cat, { icon, items }], ci) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
              whileHover={{ y: -6 }}
              className="skill-suite group relative h-full"
            >
              <GlassCard className="h-full border-white/10 bg-[#08090f]/90 shadow-2xl shadow-black/30">
                <div className="mb-6 flex items-start justify-between gap-5">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#A78BFA]/20 bg-[#A78BFA]/10 text-[#A78BFA] shadow-[0_0_34px_rgba(167,139,250,0.14)]">{icon}</div>
                    <div>
                      <h3 className="text-2xl font-black text-white">{cat}</h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">{categoryCopy[cat]}</p>
                    </div>
                  </div>
                  <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-lg font-black text-white sm:flex">
                    {items.length}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.05 + i * 0.025 }}
                      whileHover={{ x: 5 }}
                      className="group/item rounded-2xl border border-white/[0.08] bg-white/[0.032] p-3.5 text-sm text-slate-200 transition-all hover:border-[#A78BFA]/30 hover:bg-[#A78BFA]/[0.055]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-100 p-2 shadow-lg shadow-black/20">
                          <TechLogo name={skill} className="h-6 w-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <span className="block truncate font-bold text-slate-100">{skill}</span>
                            <SkillScore value={SKILL_SCORES[skill] || 80} />
                          </div>
                          <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-white/10">
                            <motion.span
                              initial={{ width: 0 }}
                              whileInView={{ width: `${SKILL_SCORES[skill] || 80}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: i * 0.035 }}
                              className="block h-full rounded-full bg-gradient-to-r from-violet-300 via-purple-300 to-blue-300 shadow-[0_0_16px_rgba(167,139,250,0.5)]"
                            />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects" className="py-28 relative">
      <GlowOrb className="w-80 h-80 bg-blue-600 top-20 right-0" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Projects" title={<>Things I've<br /><GradientText>built & shipped</GradientText></>} sub="Real projects with real constraints — from IoT hardware to blockchain interfaces." />

        <div className="grid lg:grid-cols-3 gap-7">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.035] overflow-hidden cursor-pointer shadow-2xl shadow-black/20"
            >
              {/* Thumbnail */}
              <div className="relative h-56 overflow-hidden" style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}08)` }}>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.title} project cover`}
                    className="h-full w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code2 size={58} style={{ color: p.color }} className="opacity-30 group-hover:opacity-60 transition-opacity group-hover:scale-110 transition-transform duration-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080810] to-transparent" />
                {p.image && <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />}
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full" style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }} />
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold mb-3 text-lg leading-snug">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.stack.slice(0, 3).map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-white/6 text-slate-300 text-xs border border-white/8">{t}</span>
                  ))}
                  {p.stack.length > 3 && <span className="px-2.5 py-1 rounded-md bg-white/6 text-slate-400 text-xs">+{p.stack.length - 3}</span>}
                </div>
                <div className="flex gap-2">
                  <a href={p.codeUrl || "https://github.com/JerinTV"} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-white/12 text-slate-300 hover:text-white hover:border-white/25 text-sm transition-all">
                    <Github size={14} /> Code
                  </a>
                  {p.demoUnavailable ? (
                    <span className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-white/8 bg-white/4 text-slate-500 text-sm font-medium cursor-not-allowed">
                      <ExternalLink size={14} /> No demo
                    </span>
                  ) : (
                    <a href={p.demoUrl || "https://github.com/JerinTV"} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all text-white" style={{ background: `${p.color}25`, border: `1px solid ${p.color}40` }}>
                      <ExternalLink size={14} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mb-10 overflow-hidden py-6"
          >
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-5 h-px w-24 bg-gradient-to-r from-[#A78BFA] to-transparent" />
                <h3 className="text-4xl font-black leading-none text-white md:text-6xl">
                  Interface<br />
                  <span className="bg-gradient-to-r from-violet-300 via-white to-blue-300 bg-clip-text text-transparent">Atelier</span>
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {LIVE_PROJECTS.map((project) => (
                  <span
                    key={project.title}
                    className="h-2.5 w-10 rounded-full opacity-80"
                    style={{ background: project.color }}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {LIVE_PROJECTS.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#08090f]/90 shadow-xl shadow-black/20 transition-all hover:border-white/20 ${i === 0 ? "xl:col-span-2" : ""}`}
              >
                <div className="absolute inset-x-0 top-0 h-1 opacity-80" style={{ background: project.color }} />
                <div className="relative">
                  <div className={`relative overflow-hidden bg-white/[0.035] ${i === 0 ? "aspect-[16/8.5]" : "aspect-[16/10]"}`}>
                    <img
                      src={project.image}
                      alt={`${project.title} front page preview`}
                      loading="lazy"
                      className="h-full w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-75" />
                    <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-[#08090f]/75 text-white shadow-lg shadow-black/30 backdrop-blur-md" style={{ color: project.color }}>
                      {project.icon}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                      <div>
                        <div className="mb-2 text-xs font-mono uppercase tracking-widest" style={{ color: project.color }}>
                          {project.type}
                        </div>
                        <h4 className="text-2xl font-black leading-tight text-white">{project.title}</h4>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur-md transition-all group-hover:border-white/30 group-hover:bg-white/15">
                        <ExternalLink size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDIES ─────────────────────────────────────────────────────────────

function CaseStudies() {
  const [active, setActive] = useState(0);
  const cs = CASE_STUDIES[active];

  return (
    <section id="case-studies" className="py-28 relative">
      <GlowOrb className="w-96 h-96 bg-violet-800 bottom-0 right-0" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Case Studies" title={<>Design thinking<br /><GradientText>in practice</GradientText></>} sub="End-to-end product stories — from user problem to shipped solution." />

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {CASE_STUDIES.map((c, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${active === i ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-900/40" : "border border-white/10 text-slate-400 hover:text-white hover:border-white/20"}`}
            >
              {c.shortTitle || c.title.split("—")[0].trim()}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <GlassCard hover={false}>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">{cs.title}</h3>
              <p className="text-slate-400">{cs.subtitle}</p>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-600/60 to-transparent" />
              <div className="space-y-8 pl-12">
                {cs.steps.map((step, i) => (
                  <motion.div
                    key={step.phase}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-8 top-1 w-4 h-4 rounded-full border-2 border-violet-500 bg-[#080810] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    </div>
                    <div className="inline-block px-3 py-0.5 rounded-md bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-mono mb-2">{step.phase}</div>
                    <p className="text-slate-300 leading-relaxed">{step.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

// ─── GITHUB ───────────────────────────────────────────────────────────────────

function GitHub() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const repos = useCounter(18, 1500, inView);
  const contribs = useCounter(312, 2000, inView);
  const stars = useCounter(47, 1800, inView);

  const demoRepos = [
    { name: "zentodo", desc: "Full-stack task management SPA", stars: 12, forks: 3, lang: "JavaScript", color: "#f7df1e", accent: "#A78BFA" },
    { name: "smart-helmet-portal", desc: "IoT safety dashboard with GPS tracking", stars: 9, forks: 2, lang: "Python", color: "#3776ab", accent: "#60a5fa" },
    { name: "blockchain-product-detector", desc: "NFC product authenticity workflow", stars: 15, forks: 5, lang: "JavaScript", color: "#f7df1e", accent: "#a78bfa" },
  ];

  return (
    <section id="github" ref={ref} className="py-28 relative overflow-hidden">
      <GlowOrb className="w-72 h-72 bg-[#A78BFA] top-0 left-0" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="GitHub" title={<>Open source &<br /><GradientText>contribution signal</GradientText></>} />

        <div className="grid lg:grid-cols-[0.95fr_1.45fr] gap-7">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#08090f]/90 p-6 shadow-2xl shadow-black/30"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A78BFA]/55 to-transparent" />
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#A78BFA]/25 bg-[#A78BFA]/10 text-xl font-black text-[#A78BFA]">J</div>
              <div>
                <div className="flex items-center gap-2 text-white font-bold text-lg"><Github size={18} /> JerinTV</div>
                <div className="text-sm text-slate-400">github.com/JerinTV</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Repos", value: repos, icon: <BookOpen size={16} /> },
                { label: "Commits", value: contribs, icon: <GitFork size={16} /> },
                { label: "Stars", value: stars, icon: <Star size={16} /> },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-center"
                >
                  <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-[#A78BFA]/20 bg-[#A78BFA]/10 text-[#A78BFA]">{item.icon}</div>
                  <div className="text-2xl font-black text-white">{item.value}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-slate-500">{item.label}</div>
                </motion.div>
              ))}
            </div>

            <a href="https://github.com/JerinTV" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-violet-900/30 transition-all hover:shadow-violet-900/50">
              View all repositories
              <ExternalLink size={16} />
            </a>
          </motion.div>

          <div className="grid gap-4">
            {demoRepos.map((repo, i) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 8, scale: 1.01 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#08090f]/90 p-5 shadow-xl shadow-black/20 transition-all hover:border-[#A78BFA]/30"
              >
                <div className="absolute inset-y-0 left-0 w-1 opacity-80" style={{ background: repo.accent }} />
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full shadow-[0_0_14px_currentColor]" style={{ background: repo.color, color: repo.color }} />
                      <h3 className="font-mono text-lg font-bold text-white">{repo.name}</h3>
                    </div>
                    <p className="text-sm text-slate-400">{repo.desc}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 text-xs text-slate-400">
                    <span className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2">{repo.lang}</span>
                    <span className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2"><Star size={13} />{repo.stars}</span>
                    <span className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2"><GitFork size={13} />{repo.forks}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Credentials() {
  const [activeCredential, setActiveCredential] = useState(null);
  const credentials = CREDENTIAL_GROUPS.flatMap((group) => group.credentials.map((credential) => ({ ...credential, category: group.category })));
  const credentialLoop = [...credentials, ...credentials];

  useEffect(() => {
    if (!activeCredential) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveCredential(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCredential]);

  return (
    <section id="credentials" className="py-28 relative overflow-hidden">
      <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-[#A78BFA]/25 to-transparent" />
      <div className="max-w-[1500px] mx-auto px-6">
        <SectionHeading
          label="Credentials"
          title={<>Proof wall<br /><GradientText>for the craft</GradientText></>}
        />

        <div className="credential-marquee relative overflow-x-auto overflow-y-hidden md:overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#050508] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#050508] to-transparent" />
          <div className="credential-track flex w-max gap-5">
          {credentialLoop.map((credential, i) => (
            <motion.article
              key={`${credential.title}-${i}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % credentials.length) * 0.05 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: i % 2 ? -2 : 2 }}
              className="group relative flex h-[390px] w-[310px] shrink-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#08090f]/95 p-3 shadow-2xl shadow-black/30 transition-all hover:border-[#A78BFA]/40 hover:shadow-[#A78BFA]/10 md:w-[360px]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(167,139,250,0.14),transparent_42%)] opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A78BFA]/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <button
                type="button"
                onClick={() => setActiveCredential(credential)}
                className="relative z-10 block aspect-[1.42/1] w-full overflow-hidden rounded-2xl border border-white/10 bg-white"
                aria-label={"View " + credential.title}
              >
                <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#f8fafc] p-4 text-left text-slate-950">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-200/70 blur-xl" />
                  <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-blue-200/70 blur-xl" />
                  <div className="relative flex items-center justify-between">
                    <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-600">
                      Certificate
                    </span>
                    <BadgeCheck size={18} className="text-violet-600" />
                  </div>
                  <div className="relative">
                    <FileText size={28} className="mb-3 text-violet-600" />
                    <h4 className="text-base font-black leading-tight text-slate-950">{credential.title}</h4>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500">{credential.issuer}</p>
                  </div>
                  <div className="relative h-px w-full bg-gradient-to-r from-violet-500 via-blue-500 to-transparent" />
                </div>
              </button>

              <div className="relative z-10 flex flex-1 flex-col px-2 pb-2 pt-4">
                <div className="mb-3 inline-flex rounded-lg border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  {credential.category}
                </div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-[#A78BFA]">
                  <BadgeCheck size={13} />
                  {credential.issuer}
                </p>
                <h3 className="min-h-[52px] text-base font-bold leading-snug text-white">{credential.title}</h3>
                <p className="mt-3 min-h-[84px] text-sm leading-relaxed text-slate-400">{credential.impact}</p>
                <button
                  type="button"
                  onClick={() => setActiveCredential(credential)}
                  className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-400/25 bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-violet-900/25 transition-all hover:shadow-violet-900/45"
                >
                  View Credential
                  <Eye size={15} />
                </button>
              </div>
            </motion.article>
          ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeCredential && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#050508]/88 px-4 py-6 backdrop-blur-xl"
            onClick={() => setActiveCredential(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 18 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#A78BFA]/25 bg-[#090a12] shadow-2xl shadow-black/60"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/8 px-5 py-4">
                <div className="min-w-0">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#A78BFA]">Credential Preview</p>
                  <h3 className="truncate text-base font-semibold text-white">{activeCredential.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCredential(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition-colors hover:border-white/20 hover:bg-white/6 hover:text-white"
                  aria-label="Close credential preview"
                >
                  <X size={18} />
                </button>
              </div>
              <iframe
                title={activeCredential.title}
                src={activeCredential.href + "#view=FitH"}
                className="h-full w-full bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Learning() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#A78BFA]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Learning Roadmap" title={<>Currently<br /><GradientText>leveling up</GradientText></>} />
        <div className="grid max-w-5xl mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LEARNING.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#08090f]/90 p-5 shadow-2xl shadow-black/20 transition-all hover:border-[#A78BFA]/35 hover:bg-[#101017]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A78BFA]/45 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative mb-6 flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white p-2 shadow-lg shadow-black/20">
                  <TechLogo name={item.title} className="h-8 w-8" />
                </div>
                <SkillScore value={item.progress} />
              </div>
              <h3 className="mb-2 text-base font-bold text-white">{item.title}</h3>
              <p className="mb-5 min-h-[60px] text-sm leading-relaxed text-slate-400">{item.copy}</p>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.3, duration: 0.8 }}
                  className="h-full rounded-full shadow-[0_0_18px_currentColor]"
                  style={{ background: "linear-gradient(90deg, #A78BFA, #C084FC, #60A5FA)", color: "#A78BFA" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LIGHTHOUSE ───────────────────────────────────────────────────────────────

function CircularProgress({ value, color, size = 80 }) {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [dash, setDash] = useState(circ);
  useEffect(() => { if (inView) setTimeout(() => setDash(circ * (1 - value / 100)), 300); }, [inView, circ, value]);
  return (
    <div ref={ref} className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={dash} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s ease" }} />
      </svg>
      <span className="absolute text-white font-bold text-sm">{value}</span>
    </div>
  );
}

function Lighthouse() {
  const overall = Math.round(LIGHTHOUSE.reduce((sum, item) => sum + item.value, 0) / LIGHTHOUSE.length);
  const channels = {
    Performance: "Fast first paint, disciplined assets, and restrained motion cost.",
    Accessibility: "Readable contrast, semantic flow, and keyboard-safe interaction states.",
    SEO: "Clear document structure, descriptive content, and crawler-friendly routing.",
    "Best Practices": "Secure links, modern React patterns, and production-minded defaults.",
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#A78BFA]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Performance" title={<>Quality system,<br /><GradientText>not just numbers</GradientText></>} />

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#08090f]/90 p-8 shadow-2xl shadow-black/30"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A78BFA]/60 to-transparent" />
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#A78BFA]">Audit Core</p>
                <h3 className="mt-2 text-2xl font-bold text-white">portfolio.jerintv.dev</h3>
              </div>
              <span className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">Stable</span>
            </div>

            <div className="relative mx-auto flex h-64 w-64 items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border border-[#A78BFA]/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-5 rounded-full border border-dashed border-white/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative flex h-44 w-44 flex-col items-center justify-center rounded-full border border-[#A78BFA]/30 bg-[#A78BFA]/10 shadow-[0_0_60px_rgba(167,139,250,0.12)]">
                <div className="text-6xl font-black text-white">{overall}</div>
                <div className="mt-1 text-xs font-mono uppercase tracking-widest text-[#A78BFA]">Overall</div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {LIGHTHOUSE.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 6 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#08090f]/90 p-5 shadow-xl shadow-black/20 transition-all hover:border-[#A78BFA]/30"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#070708] text-[#A78BFA]">{item.icon}</div>
                    <div>
                      <div className="text-lg font-bold text-white">{item.label}</div>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">{channels[item.label]}</p>
                    </div>
                  </div>
                  <div className="flex min-w-[180px] items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/8">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: item.value + "%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.08 }}
                        className="h-full rounded-full bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 shadow-[0_0_18px_rgba(167,139,250,0.55)]"
                      />
                    </div>
                    <span className="w-10 text-right text-lg font-black text-white">{item.value}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (form.message.length < 10) e.message = "Message too short";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }, 3000);
  };

  const Field = ({ name, placeholder, multiline = false }) => {
    const Tag = multiline ? "textarea" : "input";
    return (
      <div>
        <Tag
          value={form[name]}
          onChange={(e) => { setForm((p) => ({ ...p, [name]: e.target.value })); setErrors((p) => ({ ...p, [name]: "" })); }}
          placeholder={placeholder}
          rows={multiline ? 5 : undefined}
          className={"w-full rounded-2xl border bg-[#070708]/70 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all resize-none " + (errors[name] ? "border-red-500/50" : "border-white/10 focus:border-[#A78BFA]/50 focus:bg-[#A78BFA]/[0.035]")}
        />
        {errors[name] && <p className="mt-1 text-xs text-red-400">{errors[name]}</p>}
      </div>
    );
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <GlowOrb className="w-96 h-96 bg-[#A78BFA] top-0 left-0" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Contact" title={<>Ready for a<br /><GradientText>refined build</GradientText></>} sub="Open to internships, PPO-track roles, and thoughtful product work across full-stack development and UI/UX." />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#08090f]/90 p-6 shadow-2xl shadow-black/30"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A78BFA]/55 to-transparent" />
            <h3 className="mb-3 text-2xl font-bold text-white">Let the next conversation be concrete.</h3>
            <p className="mb-6 leading-relaxed text-slate-400">
              Send a role, project brief, or design challenge. I will respond with clear next steps and the context needed to move quickly.
            </p>
            <div className="space-y-3">
              {[
                { icon: <Mail size={18} />, label: "Email", value: "jerintv0173@gmail.com", href: "mailto:jerintv0173@gmail.com" },
                { icon: <Phone size={18} />, label: "Phone", value: "+91-7994340173", href: "tel:+917994340173" },
                { icon: <MapPin size={18} />, label: "Location", value: "Kannur, Kerala, India" },
                { icon: <Github size={18} />, label: "GitHub", value: "github.com/JerinTV", href: "https://github.com/JerinTV" },
                { icon: <Linkedin size={18} />, label: "LinkedIn", value: "linkedin.com/in/jerin-t-v", href: "https://linkedin.com/in/jerin-t-v" },
              ].map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-all hover:border-[#A78BFA]/30 hover:bg-[#A78BFA]/[0.055]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#A78BFA]/20 bg-[#A78BFA]/10 text-[#A78BFA]">{c.icon}</div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono uppercase tracking-widest text-slate-500">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined} className="break-all text-sm font-medium text-white transition-colors hover:text-[#A78BFA]">{c.value}</a>
                    ) : (
                      <div className="text-sm font-medium text-white">{c.value}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#08090f]/90 p-6 shadow-2xl shadow-black/30"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A78BFA]/55 to-transparent" />
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <CheckCircle size={52} className="mb-4 text-emerald-400" />
                  <h3 className="mb-2 text-2xl font-bold text-white">Message Sent</h3>
                  <p className="text-slate-400">I will get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.div key="form" className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field name="name" placeholder="Your name" />
                    <Field name="email" placeholder="Email address" />
                  </div>
                  <Field name="subject" placeholder="Role, project, or opportunity" />
                  <Field name="message" placeholder="Tell me what you want to build..." multiline />
                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.015, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-4 font-bold text-white shadow-lg shadow-violet-900/30 transition-all hover:shadow-violet-900/50"
                  >
                    <Send size={17} /> Send Message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/6 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm">J</div>
            <div>
              <div className="text-white font-semibold text-sm">Jerin T V</div>
              <div className="text-slate-500 text-xs">Web Designer & Full Stack Developer</div>
            </div>
          </div>
          <div className="flex gap-2">
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => document.getElementById(link.toLowerCase().replace(" ", "-"))?.scrollIntoView({ behavior: "smooth" })} className="px-3 py-1.5 text-slate-500 hover:text-slate-300 text-xs transition-colors">
                {link}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {[{ icon: <Github size={15} />, href: "https://github.com/JerinTV" }, { icon: <Linkedin size={15} />, href: "https://linkedin.com/in/jerin-t-v" }, { icon: <Mail size={15} />, href: "mailto:jerintv0173@gmail.com" }].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-white/10 bg-white/4 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/40 transition-all">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-slate-600 text-xs">
          © {new Date().getFullYear()} Jerin T V. Designed & built with React, Tailwind CSS & Framer Motion.
        </div>
      </div>
    </footer>
  );
}

// ─── BACK TO TOP ──────────────────────────────────────────────────────────────

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-30 w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-violet-900/50 hover:shadow-violet-900/80 transition-shadow"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

function PremiumCaseStudies() {
  const [active, setActive] = useState(0);
  const cs = CASE_STUDIES[active];
  const project = PROJECTS[active] || PROJECTS[0];
  const next = () => setActive((value) => (value + 1) % CASE_STUDIES.length);
  const previous = () => setActive((value) => (value - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);

  useEffect(() => {
    const timer = window.setInterval(next, 6500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="case-studies" className="py-28 relative overflow-hidden">
      <GlowOrb className="w-96 h-96 bg-violet-800 bottom-0 right-0" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Case Studies" title={<>Product stories<br /><GradientText>in motion</GradientText></>} />
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {CASE_STUDIES.map((c, i) => (
            <button key={c.shortTitle || c.title} type="button" onClick={() => setActive(i)} className={`group relative overflow-hidden rounded-2xl px-5 py-3 text-sm font-bold transition-all ${active === i ? "border border-[#A78BFA]/40 bg-[#A78BFA]/15 text-white shadow-lg shadow-[#A78BFA]/10" : "border border-white/10 bg-white/[0.025] text-slate-400 hover:border-white/20 hover:text-white"}`}>
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform group-hover:scale-x-100" style={{ background: c.color }} />
              {c.shortTitle || c.title.split("—")[0].trim()}
            </button>
          ))}
        </div>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#08090f]/92 shadow-2xl shadow-black/40">
          <div className="absolute inset-0 opacity-50" style={{ background: `radial-gradient(circle at 82% 10%, ${cs.color}28, transparent 34%)` }} />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, x: 40, filter: "blur(10px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -40, filter: "blur(10px)" }} transition={{ duration: 0.45 }} className="relative p-5 md:p-7 lg:p-8">
              <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="mb-3 text-xs font-mono uppercase tracking-[0.28em]" style={{ color: cs.color }}>{String(active + 1).padStart(2, "0")} / {String(CASE_STUDIES.length).padStart(2, "0")}</p>
                  <h3 className="max-w-4xl bg-gradient-to-r from-white via-violet-100 to-blue-200 bg-clip-text text-3xl font-black leading-tight text-transparent md:text-5xl">{cs.title}</h3>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">{cs.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack?.slice(0, 5).map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-4 md:p-5">
                <motion.div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                <div className="relative grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                  {cs.steps.map((step, i) => (
                    <motion.div key={step.phase} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 + 0.15 }} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-all hover:border-white/20 hover:bg-white/[0.055]">
                      <div className="absolute inset-y-0 left-0 w-1" style={{ background: cs.color }} />
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#050508] text-sm font-black text-white">{i + 1}</div>
                        <div>
                          <div className="mb-1 text-xs font-mono uppercase tracking-widest" style={{ color: cs.color }}>{step.phase}</div>
                          <p className="text-sm leading-relaxed text-slate-300">{step.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="relative flex flex-col gap-4 border-t border-white/8 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="flex gap-2">
              {CASE_STUDIES.map((c, i) => <button key={c.shortTitle || c.title} type="button" onClick={() => setActive(i)} className={`h-2.5 rounded-full transition-all ${active === i ? "w-12" : "w-2.5 bg-white/20 hover:bg-white/40"}`} style={active === i ? { background: c.color } : undefined} aria-label={`Open ${c.shortTitle || c.title}`} />)}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={previous} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] text-white transition-all hover:border-white/25 hover:bg-white/[0.07]" aria-label="Previous case study"><ChevronRight size={18} className="rotate-180" /></button>
              <button type="button" onClick={next} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] text-white transition-all hover:border-white/25 hover:bg-white/[0.07]" aria-label="Next case study"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050508] text-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div className="galaxy-dust" aria-hidden="true" />
      <AnimatePresence>{!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}</AnimatePresence>

      {loaded && (
        <div className="relative z-10">
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <PremiumCaseStudies />
            <Credentials />
            <GitHub />
            <Learning />
            <Lighthouse />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </div>
      )}
    </div>
  );
}
