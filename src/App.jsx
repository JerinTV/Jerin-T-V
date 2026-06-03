import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  Code2 as Github, BriefcaseBusiness as Linkedin, Mail, Phone, MapPin, ExternalLink, Menu, X, ArrowUp,
  Code2, Layers, Database, Wrench, ChevronRight, Star, GitFork, Eye,
  Zap, Shield, Search, CheckCircle, Download, Send, Terminal, Globe,
  Cpu, Box, Cloud, Workflow, MessageSquare, User, BookOpen, TrendingUp
} from "lucide-react";
import heroPhoto from "./assets/jerin-hero.jpeg";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Skills", "Projects", "Case Studies", "GitHub", "Contact"];

const TECH_BADGES = ["React", "Django", "Python", "JavaScript", "PostgreSQL", "Tailwind", "Git"];

const STATS = [
  { label: "Projects Completed", value: 12, suffix: "+" },
  { label: "Technologies Learned", value: 20, suffix: "+" },
  { label: "GitHub Contributions", value: 300, suffix: "+" },
  { label: "Certifications", value: 4, suffix: "" },
];

const SKILLS = {
  Frontend: { icon: <Layers size={18} />, items: ["HTML5", "CSS3", "JavaScript", "React.js", "Next.js", "Tailwind CSS", "Bootstrap"] },
  Backend: { icon: <Terminal size={18} />, items: ["Python", "Django", "Django REST Framework", "Node.js", "Express.js", "PHP"] },
  Database: { icon: <Database size={18} />, items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB"] },
  Tools: { icon: <Wrench size={18} />, items: ["Git", "GitHub", "Figma", "Postman", "VS Code", "Vercel"] },
};

const PROJECTS = [
  { title: "Zentodo", desc: "Full-stack task management SPA with priority color-coding, subtask nesting, JWT auth, and 10+ REST endpoints.", stack: ["React", "Django", "JWT", "PostgreSQL", "Vercel"], color: "#7c3aed" },
  { title: "Blockchain Product Detector", desc: "Role-based dashboards for 4 user types with NFC verification, product lifecycle viz, and hybrid on/off-chain data.", stack: ["React", "Node.js", "Express", "Blockchain", "MySQL"], color: "#2563eb" },
  { title: "Smart Helmet Safety Portal", desc: "Real-time IoT dashboard with live GPS map, speed telemetry, emergency alerts, and 3-role access control.", stack: ["ESP32", "PHP", "MySQL", "OpenStreetMap", "GPS"], color: "#059669" },
  { title: "AI SaaS Dashboard", desc: "Analytics dashboard with AI-powered insights, real-time charts, and a polished design system.", stack: ["React", "Python", "OpenAI", "PostgreSQL"], color: "#dc2626" },
  { title: "E-Commerce Platform", desc: "Full-featured store with cart, payments, inventory, and admin panel.", stack: ["React", "Django", "Stripe", "PostgreSQL"], color: "#d97706" },
  { title: "Real-Time Chat App", desc: "WebSocket-powered chat with rooms, presence indicators, and message history.", stack: ["React", "Node.js", "Socket.io", "MongoDB"], color: "#0891b2" },
  { title: "Job Portal", desc: "Recruiter and candidate portal with resume parsing, job matching, and application tracking.", stack: ["React", "Django", "PostgreSQL"], color: "#7c3aed" },
  { title: "Finance Tracker", desc: "Personal finance dashboard with budget goals, expense categories, and trend visualizations.", stack: ["React", "Django REST", "Chart.js"], color: "#be185d" },
];

const CASE_STUDIES = [
  {
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
];

const LEARNING = [
  { title: "AI Integrations", icon: <Cpu size={20} />, progress: 40, color: "#7c3aed" },
  { title: "Docker & Containers", icon: <Box size={20} />, progress: 30, color: "#2563eb" },
  { title: "AWS Cloud", icon: <Cloud size={20} />, progress: 25, color: "#d97706" },
  { title: "Next.js", icon: <Zap size={20} />, progress: 55, color: "#059669" },
  { title: "System Design", icon: <Workflow size={20} />, progress: 35, color: "#dc2626" },
  { title: "Microservices", icon: <Globe size={20} />, progress: 20, color: "#0891b2" },
];

const TESTIMONIALS = [
  { name: "Arjun Menon", role: "Senior Developer, TechCorp", text: "Jerin's attention to detail and ability to translate designs into pixel-perfect code is exceptional. His React components were clean and well-structured." },
  { name: "Priya Nair", role: "Product Manager, Startup Kerala", text: "The IoT dashboard Jerin built for us was beyond our expectations. Real-time updates, beautiful UI, and zero downtime." },
  { name: "Rahul Dev", role: "Mentor, KTU", text: "Among the top students I've mentored. Jerin bridges the gap between design thinking and engineering execution seamlessly." },
];

const LIGHTHOUSE = [
  { label: "Performance", value: 98, icon: <Zap size={16} />, color: "#22c55e" },
  { label: "Accessibility", value: 100, icon: <Shield size={16} />, color: "#3b82f6" },
  { label: "SEO", value: 100, icon: <Search size={16} />, color: "#a855f7" },
  { label: "Best Practices", value: 100, icon: <CheckCircle size={16} />, color: "#f59e0b" },
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
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
      >
        {title}
      </motion.h2>
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
          JT
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
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm">JT</div>
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
    <section id="home" onMouseMove={handleMouse} className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <GlowOrb className="w-96 h-96 bg-violet-600 -top-20 -left-20" />
      <GlowOrb className="w-80 h-80 bg-blue-600 top-1/2 -right-20" />
      <GlowOrb className="w-64 h-64 bg-purple-700 bottom-0 left-1/3" />

      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for internships & full-time roles
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4"
          >
            Hi, I'm<br /><GradientText>Jerin T V</GradientText>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-slate-300 font-medium mb-6 h-8"
          >
            <TypingText words={["Web Designer", "Full Stack Developer", "UI/UX Designer", "React Developer"]} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg"
          >
            Designing beautiful experiences and building scalable web applications. B.Tech CS graduate from KTU with a CGPA of 8.68, based in Kerala.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold shadow-xl shadow-violet-900/40 hover:shadow-violet-900/70 transition-shadow"
            >
              Hire Me <ChevronRight size={16} />
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              href="#"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 text-white font-semibold hover:bg-white/6 hover:border-white/25 transition-all"
            >
              <Download size={16} /> Resume
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="flex items-center gap-4"
          >
            {[
              { icon: <Github size={18} />, href: "https://github.com/JerinTV" },
              { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/jerin-t-v" },
              { icon: <Mail size={18} />, href: "mailto:jerintv0173@gmail.com" },
            ].map((s, i) => (
              <motion.a
                key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="w-10 h-10 rounded-xl border border-white/12 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all"
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right — Avatar & badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className="flex justify-center items-center relative"
        >
          <div className="relative">
            {/* Glow rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600/40 to-blue-600/40 blur-2xl scale-110" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 rounded-full border border-dashed border-violet-500/25"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-12 rounded-full border border-dashed border-blue-500/15"
            />
            {/* Portrait */}
            <div className="relative w-72 h-72 md:w-88 md:h-88 lg:w-96 lg:h-96 rounded-[2rem] bg-gradient-to-br from-violet-900/60 to-blue-900/60 border border-violet-500/30 overflow-hidden shadow-2xl shadow-violet-900/50">
              <img
                src={heroPhoto}
                alt="Jerin T V, web designer and full stack developer"
                className="h-full w-full object-cover object-[50%_24%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/35 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md">
                <span className="text-sm font-semibold text-white">Designer & Developer</span>
                <span className="text-xs font-mono text-violet-200">JerinTV</span>
              </div>
            </div>
            {/* Floating badges */}
            {TECH_BADGES.map((badge, i) => {
              const angle = (i / TECH_BADGES.length) * Math.PI * 2 - Math.PI / 2;
              const r = 175;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              return (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, x: [0, Math.cos(angle) * 5, 0], y: [0, Math.sin(angle) * 5, 0] }}
                  transition={{ delay: 0.8 + i * 0.1, x: { repeat: Infinity, duration: 3 + i, ease: "easeInOut" }, y: { repeat: Infinity, duration: 3 + i, ease: "easeInOut" } }}
                  style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                  className="px-3 py-1.5 rounded-full bg-[#0a0a12]/90 border border-violet-500/30 text-violet-300 text-xs font-mono whitespace-nowrap shadow-lg"
                >
                  {badge}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
      >
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <div className="w-0.5 h-10 bg-gradient-to-b from-violet-500/60 to-transparent" />
      </motion.div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function StatCard({ label, value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(value, 2000, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black text-white mb-1">{count}{suffix}</div>
      <div className="text-slate-500 text-sm">{label}</div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-28 relative">
      <GlowOrb className="w-72 h-72 bg-blue-600 top-0 right-0" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="About Me" title={<>The person behind<br /><GradientText>the code & design</ GradientText></>} />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <p className="text-slate-300 text-lg leading-relaxed">
              I'm a <strong className="text-white">Computer Science fresher</strong> from College of Engineering Thalassery (KTU), graduating in 2026 with a CGPA of 8.68. Based in Kannur, Kerala — with my eyes on opportunities across India and remote.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I bridge the gap between design and engineering. From crafting pixel-perfect Figma prototypes to deploying JWT-secured REST APIs, I'm comfortable across the entire stack. My work on IoT dashboards and blockchain interfaces taught me to design for real constraints — not just aesthetics.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Currently seeking internship roles with PPO potential in <strong className="text-violet-400">full-stack development</strong> or <strong className="text-blue-400">UI/UX design</strong>. Open to Kerala-based (Kochi/Infopark) and remote opportunities.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {[["B.Tech CSE", "KTU 2026"], ["CGPA", "8.68 / 10"], ["HSC", "96.4%"]].map(([k, v]) => (
                <div key={k} className="px-4 py-2 rounded-xl border border-white/10 bg-white/4 text-sm">
                  <span className="text-slate-400">{k}: </span>
                  <span className="text-white font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <GlassCard className="grid grid-cols-2 gap-8" hover={false}>
              {STATS.map((s) => <StatCard key={s.label} {...s} />)}
            </GlassCard>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <MapPin size={16} />, label: "Location", value: "Kannur, Kerala" },
                { icon: <BookOpen size={16} />, label: "Degree", value: "B.Tech CSE" },
                { icon: <TrendingUp size={16} />, label: "Status", value: "Open to Offers" },
                { icon: <Star size={16} />, label: "Focus", value: "Full Stack + UI/UX" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-white/3">
                  <span className="text-violet-400 mt-0.5">{item.icon}</span>
                  <div>
                    <div className="text-xs text-slate-500 font-mono">{item.label}</div>
                    <div className="text-white text-sm font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className="py-28 relative">
      <GlowOrb className="w-80 h-80 bg-violet-700 bottom-0 left-0" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Skills" title={<>Tools I use to<br /><GradientText>build and design</GradientText></>} sub="A curated stack built through real projects — not just tutorials." />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(SKILLS).map(([cat, { icon, items }], ci) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
            >
              <GlassCard className="h-full">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400">{icon}</div>
                  <h3 className="text-white font-semibold">{cat}</h3>
                </div>
                <div className="space-y-3">
                  {items.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.1 + i * 0.06 }}
                    >
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">{skill}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${75 + (i % 3) * 8}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: ci * 0.1 + i * 0.06 + 0.3, duration: 0.8 }}
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                        />
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl border border-white/8 bg-white/3 overflow-hidden cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative h-40 overflow-hidden" style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}08)` }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code2 size={48} style={{ color: p.color }} className="opacity-30 group-hover:opacity-60 transition-opacity group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#080810] to-transparent" />
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full" style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }} />
              </div>
              <div className="p-5">
                <h3 className="text-white font-bold mb-2 text-sm">{p.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {p.stack.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-white/6 text-slate-300 text-xs border border-white/8">{t}</span>
                  ))}
                  {p.stack.length > 3 && <span className="px-2 py-0.5 rounded-md bg-white/6 text-slate-400 text-xs">+{p.stack.length - 3}</span>}
                </div>
                <div className="flex gap-2">
                  <a href="https://github.com/JerinTV" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/12 text-slate-300 hover:text-white hover:border-white/25 text-xs transition-all">
                    <Github size={12} /> Code
                  </a>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all text-white" style={{ background: `${p.color}25`, border: `1px solid ${p.color}40` }}>
                    <ExternalLink size={12} /> Demo
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
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

        <div className="flex gap-3 justify-center mb-10">
          {CASE_STUDIES.map((c, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${active === i ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-900/40" : "border border-white/10 text-slate-400 hover:text-white hover:border-white/20"}`}
            >
              {c.title.split("—")[0].trim()}
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
    { name: "zentodo", desc: "Full-stack task management SPA", stars: 12, forks: 3, lang: "JavaScript", color: "#f7df1e" },
    { name: "smart-helmet-portal", desc: "IoT safety dashboard with GPS tracking", stars: 9, forks: 2, lang: "Python", color: "#3776ab" },
    { name: "blockchain-product-detector", desc: "NFC-based fake product detection system", stars: 15, forks: 5, lang: "JavaScript", color: "#f7df1e" },
  ];

  return (
    <section id="github" ref={ref} className="py-28 relative">
      <GlowOrb className="w-72 h-72 bg-blue-700 top-0 left-0" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="GitHub" title={<>Open source &<br /><GradientText>contributions</GradientText></>} />

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <GlassCard className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl">JT</div>
              <div>
                <div className="text-white font-bold">JerinTV</div>
                <div className="text-slate-400 text-sm">@github.com/JerinTV</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[{ label: "Repos", value: repos }, { label: "Commits", value: contribs }, { label: "Stars", value: stars }].map((s) => (
                <div key={s.label} className="text-center p-3 rounded-xl bg-white/4 border border-white/8">
                  <div className="text-xl font-black text-white">{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </GlassCard>

          <div className="lg:col-span-2 space-y-4">
            {demoRepos.map((repo, i) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-5 rounded-xl border border-white/8 bg-white/3 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-violet-400 font-mono text-sm font-semibold">{repo.name}</span>
                  </div>
                  <p className="text-slate-400 text-xs truncate">{repo.desc}</p>
                </div>
                <div className="flex items-center gap-4 ml-4 text-slate-500 text-xs shrink-0">
                  <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full" style={{ background: repo.color }} />{repo.lang}</div>
                  <div className="flex items-center gap-1"><Star size={12} />{repo.stars}</div>
                  <div className="flex items-center gap-1"><GitFork size={12} />{repo.forks}</div>
                </div>
              </motion.div>
            ))}
            <motion.a
              href="https://github.com/JerinTV" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center gap-2 py-4 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-violet-500/30 text-sm transition-all"
            >
              <Github size={16} /> View all repositories
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 4000); return () => clearInterval(t); }, []);

  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Testimonials" title={<>What people<br /><GradientText>say about my work</GradientText></>} />

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <GlassCard hover={false} className="text-center">
                <div className="text-5xl text-violet-500/40 font-serif mb-4 leading-none">"</div>
                <p className="text-slate-200 text-lg leading-relaxed mb-8 italic">{TESTIMONIALS[idx].text}</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white font-bold">
                    {TESTIMONIALS[idx].name[0]}
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">{TESTIMONIALS[idx].name}</div>
                    <div className="text-slate-400 text-sm">{TESTIMONIALS[idx].role}</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-violet-500 w-6" : "bg-white/20"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CURRENTLY LEARNING ───────────────────────────────────────────────────────

function Learning() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Learning Roadmap" title={<>Currently<br /><GradientText>leveling up</GradientText></>} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LEARNING.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-2xl border border-white/8 bg-white/3 hover:border-violet-500/25 hover:bg-violet-500/5 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${item.color}20`, color: item.color }}>{item.icon}</div>
                  <span className="text-white font-medium text-sm">{item.title}</span>
                </div>
                <span className="text-xs font-mono" style={{ color: item.color }}>{item.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/8">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.3, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ background: item.color }}
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
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Performance" title={<>Built for<br /><GradientText>speed & quality</GradientText></>} />
        <div className="max-w-2xl mx-auto">
          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-6">
              <span className="text-white font-semibold">Lighthouse Audit</span>
              <span className="text-xs font-mono text-slate-500">portfolio.jerintv.dev</span>
            </div>
            <div className="grid grid-cols-4 gap-6 text-center">
              {LIGHTHOUSE.map((item) => (
                <div key={item.label}>
                  <CircularProgress value={item.value} color={item.color} />
                  <div className="mt-3 text-xs text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

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
          className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-violet-500/5 transition-all resize-none ${errors[name] ? "border-red-500/50" : "border-white/10"}`}
        />
        {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]}</p>}
      </div>
    );
  };

  return (
    <section id="contact" className="py-28 relative">
      <GlowOrb className="w-96 h-96 bg-violet-700 top-0 left-0" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Contact" title={<>Let's build<br /><GradientText>something together</GradientText></>} sub="Open to internships, freelance, and full-time roles. Let's talk." />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <p className="text-slate-400 leading-relaxed">Whether you have a project in mind, need a frontend built from a Figma design, or just want to connect — my inbox is open.</p>
            {[
              { icon: <Mail size={18} />, label: "Email", value: "jerintv0173@gmail.com", href: "mailto:jerintv0173@gmail.com" },
              { icon: <Phone size={18} />, label: "Phone", value: "+91-7994340173", href: "tel:+917994340173" },
              { icon: <MapPin size={18} />, label: "Location", value: "Kannur, Kerala, India" },
              { icon: <Github size={18} />, label: "GitHub", value: "github.com/JerinTV", href: "https://github.com/JerinTV" },
              { icon: <Linkedin size={18} />, label: "LinkedIn", value: "linkedin.com/in/jerin-t-v", href: "https://linkedin.com/in/jerin-t-v" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-white/3 hover:border-violet-500/25 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-400">{c.icon}</div>
                <div>
                  <div className="text-xs text-slate-500 font-mono">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} className="text-white text-sm hover:text-violet-400 transition-colors">{c.value}</a>
                  ) : (
                    <div className="text-white text-sm">{c.value}</div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard hover={false}>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                    <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                    <p className="text-slate-400">I'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Field name="name" placeholder="Your name" />
                      <Field name="email" placeholder="Email address" />
                    </div>
                    <Field name="subject" placeholder="Subject" />
                    <Field name="message" placeholder="Your message..." multiline />
                    <motion.button
                      onClick={handleSubmit}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold shadow-lg shadow-violet-900/40 hover:shadow-violet-900/60 transition-shadow"
                    >
                      <Send size={16} /> Send Message
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/6 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm">JT</div>
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

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-[#050508] text-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <AnimatePresence>{!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}</AnimatePresence>

      {loaded && (
        <>
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <CaseStudies />
            <GitHub />
            <Testimonials />
            <Learning />
            <Lighthouse />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </>
      )}
    </div>
  );
}
