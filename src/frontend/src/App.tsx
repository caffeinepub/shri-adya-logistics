import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useMutation } from "@tanstack/react-query";
import {
  AlertCircle,
  Award,
  CheckCircle2,
  ChevronDown,
  Facebook,
  Instagram,
  Leaf,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Shield,
  Target,
  Truck,
  Twitter,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

/* ─── Types ─────────────────────────────────────────────────────── */
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/* ─── Fade-in on scroll hook ─────────────────────────────────────── */
function useFadeInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Navbar ────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Home", href: "#home", ocid: "nav.home.link" },
  { label: "About", href: "#about", ocid: "nav.about.link" },
  { label: "Services", href: "#services", ocid: "nav.services.link" },
  { label: "Clients", href: "#clients", ocid: "nav.clients.link" },
  { label: "Resources", href: "#resources", ocid: "nav.resources.link" },
  { label: "Contact Us", href: "#contact", ocid: "nav.contact.link" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(href: string) {
    setIsOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md"
          : "bg-white/90 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-3 focus:outline-none"
          >
            <img
              src="/assets/uploads/Old-Logo-1.png"
              alt="Shri Adya Logistics Logo"
              className="h-10 lg:h-12 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <p className="font-display font-bold text-navy text-sm lg:text-base leading-tight">
                SHRI ADYA LOGISTICS
              </p>
              <p className="text-xs text-muted-foreground tracking-wide leading-tight">
                We are always there for you
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.label}
                data-ocid={item.ocid}
                onClick={() => handleNavClick(item.href)}
                className="nav-link text-foreground/80 hover:text-navy font-heading font-semibold text-sm"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-navy hover:bg-navy/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-border bg-white shadow-lg overflow-hidden"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  type="button"
                  key={item.label}
                  data-ocid={item.ocid}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left py-3 px-4 rounded-md font-heading font-semibold text-sm text-foreground/80 hover:text-navy hover:bg-navy/5 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Hero Section ──────────────────────────────────────────────── */
function HeroSection() {
  function handleContactClick() {
    const el = document.getElementById("contact");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center"
      style={{
        backgroundImage: `url('/assets/generated/hero-bg.dim_1600x700.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deeper/92 via-navy-dark/80 to-navy/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-crimson/20 border border-crimson/40 text-crimson px-4 py-1.5 rounded-full text-sm font-heading font-semibold tracking-wide mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
            Established 2017 · Jharkhand, Odisha & West Bengal
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-4"
          >
            Welcome to
            <br />
            <span className="text-crimson">SHRI ADYA</span>
            <br />
            LOGISTICS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl sm:text-2xl font-heading font-light text-white/90 italic mb-6"
          >
            "We are always there for you."
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-base sm:text-lg text-white/75 leading-relaxed mb-8 max-w-2xl"
          >
            We offer comprehensive mining solutions tailored to meet your
            specific mining needs. Shri Adya Logistics is a leading player in
            the mining sector in the mineral rich states of Jharkhand, Odisha
            and West Bengal. The company was established in the year 2017 by
            young entrepreneurs with technical background.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-sm text-white/55 mb-8 font-body"
          >
            Registered under Enterprise firm &middot; Proprietary: Anirudh Bose
            &middot; Registered: 26 July 2017
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              data-ocid="hero.contact.primary_button"
              onClick={handleContactClick}
              size="lg"
              className="bg-crimson hover:bg-crimson-dark text-white font-heading font-bold px-8 py-4 text-base rounded-sm tracking-wide transition-all duration-200 hover:scale-[1.02] shadow-lg"
            >
              Contact Us
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const el = document.getElementById("about");
                if (el)
                  window.scrollTo({
                    top: el.getBoundingClientRect().top + window.scrollY - 80,
                    behavior: "smooth",
                  });
              }}
              className="border-white/40 text-white hover:bg-white/10 font-heading font-semibold px-8 py-4 text-base rounded-sm tracking-wide backdrop-blur-sm"
            >
              Learn More
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

/* ─── Section wrapper ────────────────────────────────────────────── */
function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12 lg:mb-16">
      {eyebrow && (
        <p className="text-crimson font-heading font-bold text-sm tracking-[0.15em] uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="section-divider mx-auto mt-5" />
    </div>
  );
}

/* ─── About Section ─────────────────────────────────────────────── */
const CORE_VALUES = [
  {
    icon: Shield,
    title: "Safety",
    desc: "Safety is our first priority. We achieve this through training our drivers and employees to focus on driver compliance with all applicable government requirements.",
  },
  {
    icon: Award,
    title: "Integrity",
    desc: "What we say, we do. We respect the rights of all people and value their diversity. We protect the culture and heritage of the environments and communities in which we operate.",
  },
  {
    icon: Target,
    title: "Excellence",
    desc: "We strive for excellence in everything we do, taking pride in our people, plant and process. We exceed customer expectations through innovation and continuous improvement.",
  },
  {
    icon: Leaf,
    title: "Environment",
    desc: "We are committed to a sustainable future. Effective environmental control is integral to our operations, with comprehensive management plans for each operation.",
  },
];

const TIMELINE_EVENTS = [
  {
    date: "29 Sep 2014",
    title: "Company Founded",
    desc: "Anirudh Bose established the company, initially without operations.",
  },
  {
    date: "17 Nov 2014",
    title: "First Work Order",
    desc: "Secured first work order for explosive transportation. Operating as sub-contractor alongside cousin Sabyasachi Bose as partner.",
  },
  {
    date: "2015–2016",
    title: "Sole Leadership",
    desc: "Sabyasachi Bose stepped down. Anirudh Bose took full charge and completed orders successfully.",
  },
  {
    date: "26 Jul 2017",
    title: "Official Registration",
    desc: "Registered as 'SHRI ADYA LOGISTICS' under Enterprise firm after three successful years.",
  },
];

function AboutSection() {
  const { ref, visible } = useFadeInView();

  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Who We Are"
          title="About Us"
          subtitle="A trusted name in Explosive Transport and Blasting Contract solutions across Eastern India."
        />

        {/* Corporate Profile */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <p className="text-crimson font-heading font-bold text-sm tracking-[0.15em] uppercase mb-3">
              Corporate Profile
            </p>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-navy mb-5 leading-snug">
              Leading the Way in Mining Solutions
            </h3>
            <p className="text-foreground/75 leading-relaxed mb-4">
              Welcome to Shri Adya Logistics, a reputed Explosive Transport and
              blasting contract solution-based company in Jharkhand, Odisha and
              West Bengal. Established on 29 September 2014 by Mr. Anirudh Bose,
              we have grown into a highly renowned company backed by vast
              experience in raising, crushing, excavation, transportation and
              sales.
            </p>
            <p className="text-foreground/75 leading-relaxed mb-6">
              Our company has deployed excavators, crushing plants, dozers,
              hyva, tippers and various other equipment in projects across the
              region. Through responsible Explosive Transport and blasting
              contract solution services, we create stronger business value for
              all our customers.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Est.", value: "2014" },
                { label: "States", value: "3" },
                { label: "Registered", value: "2017" },
                { label: "Equipment", value: "6+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-navy/5 border border-navy/10 rounded-lg p-4 text-center"
                >
                  <p className="font-display text-2xl font-bold text-crimson">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground font-heading font-semibold mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-navy rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-crimson/10 rounded-full -translate-y-24 translate-x-24" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16" />
            <div className="relative z-10">
              <blockquote className="text-lg font-display font-medium italic leading-relaxed text-white/90 mb-6">
                "As long as you are the last man standing and are adding value,
                you would continue to grow. The last man standing has the best
                chance at being the first man forward."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-crimson flex items-center justify-center font-display font-bold text-white">
                  AB
                </div>
                <div>
                  <p className="font-heading font-bold text-white">
                    Anirudh Bose
                  </p>
                  <p className="text-white/60 text-sm">
                    Proprietor, Shri Adya Logistics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <p className="text-crimson font-heading font-bold text-sm tracking-[0.15em] uppercase mb-2">
              Our Journey
            </p>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-navy">
              Our History
            </h3>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-navy/20 md:-translate-x-px" />
            <div className="space-y-8 md:space-y-0">
              {TIMELINE_EVENTS.map((event, i) => (
                <motion.div
                  key={event.date}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex md:items-center gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } pl-12 md:pl-0`}
                >
                  {/* Dot */}
                  <div className="absolute left-3 md:left-1/2 top-1.5 md:top-1/2 w-3 h-3 rounded-full bg-crimson border-2 border-white shadow md:-translate-x-1.5 md:-translate-y-1.5 z-10" />
                  {/* Content */}
                  <div
                    className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                  >
                    <span className="inline-block bg-crimson/10 text-crimson font-heading font-bold text-xs px-3 py-1 rounded-full mb-2">
                      {event.date}
                    </span>
                    <h4 className="font-display font-bold text-navy text-lg">
                      {event.title}
                    </h4>
                    <p className="text-foreground/65 text-sm leading-relaxed mt-1">
                      {event.desc}
                    </p>
                  </div>
                  <div className="md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {[
            {
              icon: "👁️",
              label: "Our Vision",
              text: "We will provide the best transport system which is safe, reliable, efficient, environmentally friendly and satisfying to both users and operators.",
              bg: "bg-navy",
              textColor: "text-white",
            },
            {
              icon: "🎯",
              label: "Our Mission",
              text: "To constantly seek high levels of productivity and technical efficiency; to maintain technological superiority over competitors. Customer satisfaction has always topped our priority list.",
              bg: "bg-crimson",
              textColor: "text-white",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`${item.bg} rounded-2xl p-8 ${item.textColor}`}
            >
              <span className="text-3xl mb-4 block">{item.icon}</span>
              <h3 className="font-display text-xl font-bold mb-3">
                {item.label}
              </h3>
              <p className="text-white/85 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center mb-10">
            <p className="text-crimson font-heading font-bold text-sm tracking-[0.15em] uppercase mb-2">
              What Drives Us
            </p>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-navy mb-3">
              Core Values
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Shri Adya Logistics values are fundamental to the overall success
              of our business and the foundation upon which we operate every
              day.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-navy/8 flex items-center justify-center mb-4 group-hover:bg-crimson/10 transition-colors">
                  <val.icon className="w-6 h-6 text-navy group-hover:text-crimson transition-colors" />
                </div>
                <h4 className="font-display font-bold text-navy mb-2">
                  {val.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Services Section ─────────────────────────────────────────── */
const SERVICES = [
  {
    icon: Truck,
    title: "Explosive Transportation",
    badge: "Core Service",
    desc: "SHRI ADYA LOGISTICS is an Explosive Transportation Company primarily focused on site Explosive Supply for mining. We operate a well-designed, dedicated fleet of approved trucks ranging from 1 to 15 metric tons capacity.",
    features: [
      "All types of Explosives & Accessories",
      "Transport to Licensed Locations",
      "Government Overburden & Ore Transportation",
      "Fleet: 1 MT – 15 MT capacity trucks",
    ],
    bg: "bg-navy",
    accentColor: "text-gold",
  },
  {
    icon: Target,
    title: "Logistics",
    badge: "Extended Service",
    desc: "We transport minerals from different loading points across India, carrying out transportation from various mines. Our logistic division abides by all imperative rules and regulations per fundamental mining guidelines.",
    features: [
      "Mineral Transport Nationwide",
      "Tippers & Heavy Duty Trucks",
      "Rack Loading & Shipment",
      "Premium Iron Ore Supply",
    ],
    bg: "bg-crimson",
    accentColor: "text-white/80",
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="What We Do" title="Our Services" />

        <div className="bg-navy/5 border border-navy/10 rounded-xl p-6 mb-10 text-center">
          <p className="text-navy font-display font-medium text-lg italic">
            "Service is what we sell. It is our quality of service that will set
            us apart from our competition. We will proactively communicate with
            our customers and drivers so their expectations are fulfilled."
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              data-ocid={`services.item.${i + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`${svc.bg} rounded-2xl p-8 lg:p-10 text-white relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 shadow-card`}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                    <svc.icon className="w-7 h-7 text-white" />
                  </div>
                  <span
                    className={`text-xs font-heading font-bold tracking-widest uppercase ${svc.accentColor} bg-white/10 px-3 py-1 rounded-full`}
                  >
                    {svc.badge}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  {svc.title}
                </h3>
                <p className="text-white/80 leading-relaxed mb-6">{svc.desc}</p>
                <ul className="space-y-2">
                  {svc.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-white/75"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Clients Section ──────────────────────────────────────────── */
const CLIENTS = [
  {
    name: "Central Coal Fields Limited",
    abbr: "CCL",
    desc: "A Miniratna Category-I Central Public Sector Enterprise and subsidiary of Coal India Limited.",
    category: "Public Sector · Coal",
  },
  {
    name: "Damodar Valley Corporation",
    abbr: "DVC",
    desc: "One of India's oldest multi-purpose river valley development project, serving power and irrigation.",
    category: "Public Sector · Power",
  },
  {
    name: "BKB Transport Pvt. Ltd.",
    abbr: "BKB",
    desc: "A leading private transport and logistics company in the Eastern India mining sector.",
    category: "Private Sector · Transport",
  },
];

function ClientsSection() {
  return (
    <section id="clients" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Who We Serve"
          title="Our Clients"
          subtitle="Trusted by leading public and private sector organizations across Eastern India."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.name}
              data-ocid={`clients.item.${i + 1}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Card className="h-full border-border hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center text-white font-display font-black text-lg group-hover:bg-crimson transition-colors duration-300">
                      {client.abbr}
                    </div>
                    <div>
                      <span className="text-xs font-heading font-semibold text-crimson bg-crimson/10 px-2 py-0.5 rounded-full">
                        {client.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-navy text-lg mb-2 leading-snug">
                    {client.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {client.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Resources Section ─────────────────────────────────────────── */
function ResourcesSection() {
  return (
    <section id="resources" className="py-20 lg:py-28 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-crimson font-heading font-bold text-sm tracking-[0.15em] uppercase mb-3">
            Our Strength
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Resources
          </h2>
          <div className="w-16 h-1 bg-crimson rounded-full mx-auto mt-5" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: Users,
              title: "Management Team",
              desc: "The diversity of techno-managerial skills, coupled with the depth of specialist mining skills held by the executive team provides Shri Adya Logistics with a solid platform for achieving aggressive business performance and growth objectives set by the boards.",
              stats: [
                { label: "Technical Expertise", value: "Deep" },
                { label: "Experience", value: "10+ yrs" },
              ],
            },
            {
              icon: Shield,
              title: "Manpower",
              desc: "We've earned our reputation as a respected employer by serving almost every Mining & Exploration customer representing through global portfolio of technology & operations. As the Company's steadfast and unwavering commitment to the Mining, Shri Adya Logistics commits its people a secure future and knowledge base.",
              stats: [
                { label: "Trained Drivers", value: "✓" },
                { label: "Skilled Operators", value: "✓" },
              ],
            },
          ].map((res, i) => (
            <motion.div
              key={res.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8 hover:bg-white/15 transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-crimson/20 border border-crimson/30 flex items-center justify-center mb-5">
                <res.icon className="w-7 h-7 text-crimson" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-4">
                {res.title}
              </h3>
              <p className="text-white/70 leading-relaxed text-sm mb-6">
                {res.desc}
              </p>
              <div className="flex gap-4">
                {res.stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex-1 bg-white/8 rounded-lg p-3 text-center"
                  >
                    <p className="font-display font-bold text-crimson text-sm">
                      {s.value}
                    </p>
                    <p className="text-white/55 text-xs mt-0.5 font-heading">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Section ───────────────────────────────────────────── */
function ContactSection() {
  const { actor } = useActor();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      if (!actor)
        throw new Error("Service unavailable. Please try again later.");
      await actor.submitContactForm(data.name, data.email, data.message);
    },
    onSuccess: () => {
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to send message. Please try again.");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    contactMutation.mutate(formData);
  }

  const CONTACT_INFO = [
    {
      icon: MapPin,
      label: "Registered Office",
      value:
        "Bermo Magazine Loadhar Bera Basti, Bermo, Bokaro, Jharkhand 829127",
    },
    { icon: Phone, label: "Phone", value: "+91-9835410009" },
    { icon: Mail, label: "Email", value: "hello@shriadyalogistics.com" },
  ];

  const SOCIAL_LINKS = [
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://fb.me/shriadyalogistics",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/shriadyalogistics",
    },
    { icon: Twitter, label: "Twitter/X", href: "https://twitter.com/shriadya" },
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Get In Touch"
          title="Contact Us"
          subtitle="Have a project in mind or need more information? We'd love to hear from you."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-display text-2xl font-bold text-navy mb-6">
              Reach Out to Us
            </h3>
            <div className="space-y-5 mb-8">
              {CONTACT_INFO.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center flex-shrink-0 mt-0.5">
                    <info.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-heading font-bold text-crimson uppercase tracking-widest mb-0.5">
                      {info.label}
                    </p>
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-heading font-bold text-navy uppercase tracking-widest mb-4">
                Follow Us
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.label}
                    className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center hover:bg-crimson transition-colors duration-200"
                  >
                    <soc.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-card rounded-2xl p-8 shadow-card border border-border"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <Label
                  htmlFor="contact-name"
                  className="font-heading font-semibold text-sm text-foreground/80 mb-1.5 block"
                >
                  Full Name <span className="text-crimson">*</span>
                </Label>
                <Input
                  id="contact-name"
                  data-ocid="contact.name.input"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  disabled={contactMutation.isPending}
                  className="border-border focus-visible:ring-crimson rounded-md"
                  autoComplete="name"
                />
              </div>

              <div>
                <Label
                  htmlFor="contact-email"
                  className="font-heading font-semibold text-sm text-foreground/80 mb-1.5 block"
                >
                  Email Address <span className="text-crimson">*</span>
                </Label>
                <Input
                  id="contact-email"
                  data-ocid="contact.email.input"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  disabled={contactMutation.isPending}
                  className="border-border focus-visible:ring-crimson rounded-md"
                  autoComplete="email"
                />
              </div>

              <div>
                <Label
                  htmlFor="contact-message"
                  className="font-heading font-semibold text-sm text-foreground/80 mb-1.5 block"
                >
                  Message <span className="text-crimson">*</span>
                </Label>
                <Textarea
                  id="contact-message"
                  data-ocid="contact.message.textarea"
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, message: e.target.value }))
                  }
                  disabled={contactMutation.isPending}
                  rows={5}
                  className="border-border focus-visible:ring-crimson rounded-md resize-none"
                />
              </div>

              {/* Status surfaces */}
              {contactMutation.isPending && (
                <div
                  data-ocid="contact.loading_state"
                  className="flex items-center gap-2 text-sm text-navy/70 font-heading"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending your message...</span>
                </div>
              )}
              {contactMutation.isSuccess && (
                <div
                  data-ocid="contact.success_state"
                  className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Message sent successfully!</span>
                </div>
              )}
              {contactMutation.isError && (
                <div
                  data-ocid="contact.error_state"
                  className="flex items-center gap-2 text-sm text-crimson bg-crimson/5 border border-crimson/20 rounded-md px-3 py-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>
                    {contactMutation.error?.message ||
                      "Failed to send. Please try again."}
                  </span>
                </div>
              )}

              <Button
                data-ocid="contact.submit_button"
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full bg-navy hover:bg-navy-dark text-white font-heading font-bold py-3 rounded-md tracking-wide transition-all duration-200"
                size="lg"
              >
                {contactMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();

  const QUICK_LINKS = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Clients", href: "#clients" },
    { label: "Resources", href: "#resources" },
    { label: "Contact Us", href: "#contact" },
  ];

  const SOCIAL_LINKS = [
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://fb.me/shriadyalogistics",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/shriadyalogistics",
    },
    { icon: Twitter, label: "Twitter/X", href: "https://twitter.com/shriadya" },
  ];

  function handleNavClick(href: string) {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <footer className="bg-navy-deeper text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/assets/uploads/Old-Logo-1.png"
                alt="Shri Adya Logistics Logo"
                className="h-12 w-auto object-contain"
              />
              <div>
                <p className="font-display font-bold text-white text-sm leading-tight">
                  SHRI ADYA LOGISTICS
                </p>
                <p className="text-white/50 text-xs leading-tight">
                  Enterprise · Est. 2014
                </p>
              </div>
            </div>
            <p className="text-white/65 text-sm leading-relaxed max-w-sm mb-5">
              A leading Explosive Transport and Blasting contract solution
              company in Jharkhand, Odisha and West Bengal. Trusted by CCL, DVC
              and more.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.label}
                  className="w-9 h-9 rounded-full bg-white/10 text-white/60 flex items-center justify-center hover:bg-crimson hover:text-white transition-all duration-200"
                >
                  <soc.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="text-white/60 hover:text-crimson text-sm font-heading transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-5">
              Contact Info
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-crimson mt-0.5 flex-shrink-0" />
                <span>Bermo, Bokaro, Jharkhand 829127</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-crimson flex-shrink-0" />
                <a
                  href="tel:+919835410009"
                  className="hover:text-white transition-colors"
                >
                  +91-9835410009
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-crimson flex-shrink-0" />
                <a
                  href="mailto:hello@shriadyalogistics.com"
                  className="hover:text-white transition-colors text-xs break-all"
                >
                  hello@shriadyalogistics.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
          <p>© {year} Shri Adya Logistics. All rights reserved.</p>
          <p>
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── WhatsApp SVG Icon ─────────────────────────────────────────── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── Arattai Chat Panel ─────────────────────────────────────────── */
interface ArattaiFormData {
  name: string;
  message: string;
}

function ArattaiPanel({ onClose }: { onClose: () => void }) {
  const { actor } = useActor();
  const [formData, setFormData] = useState<ArattaiFormData>({
    name: "",
    message: "",
  });

  const arattaiMutation = useMutation({
    mutationFn: async (data: ArattaiFormData) => {
      if (!actor)
        throw new Error("Service unavailable. Please try again later.");
      await actor.submitContactForm(
        data.name,
        "arattai@chat.com",
        data.message,
      );
    },
    onSuccess: () => {
      setFormData({ name: "", message: "" });
    },
    onError: () => {
      // error shown in UI
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      toast.error("Please fill in your name and message.");
      return;
    }
    arattaiMutation.mutate(formData);
  }

  return (
    <motion.div
      data-ocid="arattai.panel"
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-navy/15 overflow-hidden"
      style={{ transformOrigin: "bottom right" }}
    >
      {/* Header */}
      <div className="bg-navy px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-crimson/30 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-display font-bold text-white text-sm leading-tight">
              Arattai
            </p>
            <p className="text-white/60 text-xs">Quick Chat</p>
          </div>
        </div>
        <button
          type="button"
          data-ocid="arattai.close_button"
          onClick={onClose}
          aria-label="Close chat panel"
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        {arattaiMutation.isSuccess ? (
          <motion.div
            data-ocid="arattai.success_state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-6 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <p className="font-display font-bold text-navy text-sm mb-1">
              Message Sent!
            </p>
            <p className="text-muted-foreground text-xs mb-4">
              We'll get back to you soon.
            </p>
            <button
              type="button"
              onClick={() => arattaiMutation.reset()}
              className="text-xs text-navy font-heading font-semibold underline underline-offset-2 hover:text-crimson transition-colors"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Send us a quick message and we'll respond shortly.
            </p>

            <div>
              <Label
                htmlFor="arattai-name"
                className="text-xs font-heading font-semibold text-foreground/70 mb-1 block"
              >
                Your Name
              </Label>
              <Input
                id="arattai-name"
                data-ocid="arattai.name.input"
                type="text"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                disabled={arattaiMutation.isPending}
                className="h-8 text-sm border-border focus-visible:ring-navy rounded-md"
                autoComplete="name"
              />
            </div>

            <div>
              <Label
                htmlFor="arattai-message"
                className="text-xs font-heading font-semibold text-foreground/70 mb-1 block"
              >
                Message
              </Label>
              <Textarea
                id="arattai-message"
                data-ocid="arattai.message.textarea"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, message: e.target.value }))
                }
                disabled={arattaiMutation.isPending}
                rows={3}
                className="text-sm border-border focus-visible:ring-navy rounded-md resize-none"
              />
            </div>

            {/* Error state */}
            {arattaiMutation.isError && (
              <div
                data-ocid="arattai.error_state"
                className="flex items-center gap-1.5 text-xs text-crimson bg-crimson/5 border border-crimson/20 rounded-md px-2.5 py-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Failed to send. Please try again.</span>
              </div>
            )}

            {/* Loading state */}
            {arattaiMutation.isPending && (
              <div
                data-ocid="arattai.loading_state"
                className="flex items-center gap-1.5 text-xs text-navy/60 font-heading"
              >
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Sending...</span>
              </div>
            )}

            <Button
              data-ocid="arattai.submit_button"
              type="submit"
              disabled={arattaiMutation.isPending}
              size="sm"
              className="w-full bg-navy hover:bg-navy-dark text-white font-heading font-bold text-xs rounded-md tracking-wide"
            >
              {arattaiMutation.isPending ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-1.5 h-3.5 w-3.5" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Floating Chat Buttons ─────────────────────────────────────── */
function FloatingChatButtons() {
  const [arattaiOpen, setArattaiOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Arattai Panel */}
      <div className="relative">
        <AnimatePresence>
          {arattaiOpen && (
            <ArattaiPanel onClose={() => setArattaiOpen(false)} />
          )}
        </AnimatePresence>

        {/* Arattai Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.2,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="flex items-center gap-2"
        >
          {/* Tooltip label */}
          <AnimatePresence>
            {!arattaiOpen && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="bg-navy text-white text-xs font-heading font-bold px-2.5 py-1 rounded-full shadow-md whitespace-nowrap pointer-events-none"
              >
                Arattai Chat
              </motion.span>
            )}
          </AnimatePresence>

          <button
            type="button"
            data-ocid="arattai.open_modal_button"
            onClick={() => setArattaiOpen((prev) => !prev)}
            aria-label={
              arattaiOpen ? "Close Arattai chat" : "Open Arattai chat"
            }
            aria-expanded={arattaiOpen}
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy ${
              arattaiOpen
                ? "bg-navy-dark text-white scale-105"
                : "bg-navy text-white hover:bg-navy-dark"
            }`}
          >
            <AnimatePresence mode="wait">
              {arattaiOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <MessageCircle className="w-6 h-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </div>

      {/* WhatsApp Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="flex items-center gap-2"
      >
        {/* Tooltip label */}
        <span className="bg-[#25D366] text-white text-xs font-heading font-bold px-2.5 py-1 rounded-full shadow-md whitespace-nowrap pointer-events-none">
          WhatsApp
        </span>

        <a
          href="https://wa.me/919835410009"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="whatsapp.button"
          aria-label="Chat with us on WhatsApp"
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
          style={{ backgroundColor: "#25D366" }}
        >
          <WhatsAppIcon className="w-7 h-7 text-white" />
        </a>
      </motion.div>
    </div>
  );
}

/* ─── App Root ──────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ClientsSection />
        <ResourcesSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingChatButtons />
    </>
  );
}
