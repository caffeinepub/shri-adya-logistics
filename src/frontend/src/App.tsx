import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useMutation } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
} from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
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
  Star,
  Target,
  Truck,
  Twitter,
  Users,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

/* ─────────────────────────────────────────────────────────────── */
/*  SHARED UTILITIES                                               */
/* ─────────────────────────────────────────────────────────────── */

function useFadeInView(threshold = 0.12) {
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

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

/* ─────────────────────────────────────────────────────────────── */
/*  WHATSAPP ICON                                                  */
/* ─────────────────────────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────────────────────── */
/*  FLOATING CHAT BUTTONS                                          */
/* ─────────────────────────────────────────────────────────────── */

interface ArattaiFormData {
  name: string;
  message: string;
}

function ArattaiPanel({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<ArattaiFormData>({
    name: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      toast.error("Please fill in your name and message.");
      return;
    }
    setSent(true);
  }

  return (
    <motion.div
      data-ocid="arattai.chat.panel"
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-navy/15 overflow-hidden"
      style={{ transformOrigin: "bottom right" }}
    >
      <div className="bg-navy px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-gold" />
          </div>
          <div>
            <p className="font-display font-bold text-white text-sm leading-tight">
              Quick Chat
            </p>
            <p className="text-white/60 text-xs">We reply within hours</p>
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

      <div className="p-4">
        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-6 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <p className="font-display font-bold text-navy text-sm mb-1">
              Message Received!
            </p>
            <p className="text-muted-foreground text-xs mb-4">
              We'll get back to you soon.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setFormData({ name: "", message: "" });
              }}
              className="text-xs text-navy font-heading font-semibold underline underline-offset-2 hover:text-gold transition-colors"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
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
                rows={3}
                className="text-sm border-border focus-visible:ring-navy rounded-md resize-none"
              />
            </div>
            <Button
              data-ocid="arattai.send.button"
              type="submit"
              size="sm"
              className="w-full bg-navy hover:bg-navy-dark text-white font-heading font-bold text-xs rounded-md tracking-wide"
            >
              <Send className="mr-1.5 h-3.5 w-3.5" />
              Send Message
            </Button>
          </form>
        )}
      </div>
    </motion.div>
  );
}

function FloatingChatButtons() {
  const [arattaiOpen, setArattaiOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div className="relative">
        <AnimatePresence>
          {arattaiOpen && (
            <ArattaiPanel onClose={() => setArattaiOpen(false)} />
          )}
        </AnimatePresence>
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
        >
          <button
            type="button"
            data-ocid="arattai.chat.button"
            onClick={() => setArattaiOpen((prev) => !prev)}
            aria-label={arattaiOpen ? "Close chat" : "Open quick chat"}
            aria-expanded={arattaiOpen}
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-500 border-2 border-yellow-500 ${
              arattaiOpen
                ? "bg-yellow-500 text-white scale-105"
                : "bg-yellow-400 text-white hover:bg-yellow-500"
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
      >
        <a
          href="https://wa.me/919835410009"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="whatsapp.chat.button"
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

/* ─────────────────────────────────────────────────────────────── */
/*  NAVBAR                                                         */
/* ─────────────────────────────────────────────────────────────── */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleHomeNavClick(hash: string) {
    setMobileOpen(false);
    setAboutOpen(false);
    navigate({ to: "/" }).then(() => {
      setTimeout(() => scrollToSection(hash), 80);
    });
  }

  const NAV_LINKS = [
    { label: "Resources", hash: "resources", ocid: "nav.resources.link" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/98 backdrop-blur-md shadow-lg shadow-navy/20"
          : "bg-navy/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 focus:outline-none group"
            aria-label="Shri Adya Logistics Home"
          >
            <img
              src="/assets/uploads/Old-Logo-1-1.png"
              alt="Shri Adya Logistics Logo"
              className="h-10 lg:h-12 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="hidden sm:block">
              <p className="font-display font-bold text-white text-sm lg:text-base leading-tight tracking-wide">
                SHRI ADYA LOGISTICS
              </p>
              <p className="text-white text-xs leading-tight font-heading">
                We are always there for you
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-7"
            aria-label="Main navigation"
          >
            <button
              type="button"
              data-ocid="nav.home.link"
              onClick={() => handleHomeNavClick("home")}
              className="nav-link-desktop text-white/85 hover:text-gold font-heading font-semibold text-sm transition-colors duration-200"
            >
              Home
            </button>

            {/* About Dropdown */}
            <div ref={aboutRef} className="relative">
              <button
                type="button"
                data-ocid="nav.about.link"
                onClick={() => setAboutOpen((v) => !v)}
                className="nav-link-desktop text-white/85 hover:text-gold font-heading font-semibold text-sm flex items-center gap-1 transition-colors duration-200"
                aria-expanded={aboutOpen}
                aria-haspopup="true"
              >
                About
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    data-ocid="nav.about.dropdown_menu"
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-52 bg-navy-deeper border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    <Link
                      to="/about"
                      data-ocid="nav.about.corporate_profile.link"
                      onClick={() => setAboutOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-heading font-semibold text-white/80 hover:text-gold hover:bg-white/5 transition-colors"
                    >
                      <Award className="w-4 h-4 text-gold/60" />
                      Corporate Profile
                    </Link>
                    <Link
                      to="/about"
                      data-ocid="nav.about.our_history.link"
                      onClick={() => setAboutOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-heading font-semibold text-white/80 hover:text-gold hover:bg-white/5 transition-colors"
                    >
                      <Star className="w-4 h-4 text-gold/60" />
                      Our History
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/services"
              data-ocid="nav.services.link"
              className="nav-link-desktop text-white/85 hover:text-gold font-heading font-semibold text-sm transition-colors duration-200"
            >
              Services
            </Link>

            {NAV_LINKS.map((item) => (
              <button
                type="button"
                key={item.label}
                data-ocid={item.ocid}
                onClick={() => handleHomeNavClick(item.hash)}
                className="nav-link-desktop text-white/85 hover:text-gold font-heading font-semibold text-sm transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/contact"
              data-ocid="nav.contact.link"
              onClick={() => setMobileOpen(false)}
              className="nav-link-desktop text-white/85 hover:text-gold font-heading font-semibold text-sm transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              to="/erp"
              data-ocid="nav.erp.link"
              className="nav-link-desktop text-white/85 hover:text-gold font-heading font-semibold text-sm transition-colors duration-200"
            >
              ERP
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-white/80 hover:text-gold hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-white/10 bg-navy-deeper shadow-xl overflow-hidden"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              <button
                type="button"
                data-ocid="nav.home.link"
                onClick={() => {
                  setMobileOpen(false);
                  handleHomeNavClick("home");
                }}
                className="text-left py-3 px-4 rounded-md font-heading font-semibold text-sm text-white/80 hover:text-gold hover:bg-white/5 transition-colors"
              >
                Home
              </button>

              <div>
                <button
                  type="button"
                  data-ocid="nav.about.link"
                  onClick={() => setMobileAboutOpen((v) => !v)}
                  className="w-full text-left py-3 px-4 rounded-md font-heading font-semibold text-sm text-white/80 hover:text-gold hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  About
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${mobileAboutOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileAboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden pl-4"
                    >
                      <Link
                        to="/about"
                        data-ocid="nav.about.corporate_profile.link"
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileAboutOpen(false);
                        }}
                        className="flex items-center gap-2 py-2.5 px-4 rounded-md text-sm text-white/70 hover:text-gold hover:bg-white/5 transition-colors font-heading font-medium"
                      >
                        <Award className="w-3.5 h-3.5" />
                        Corporate Profile
                      </Link>
                      <Link
                        to="/about"
                        data-ocid="nav.about.our_history.link"
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileAboutOpen(false);
                        }}
                        className="flex items-center gap-2 py-2.5 px-4 rounded-md text-sm text-white/70 hover:text-gold hover:bg-white/5 transition-colors font-heading font-medium"
                      >
                        <Star className="w-3.5 h-3.5" />
                        Our History
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/services"
                data-ocid="nav.services.link"
                onClick={() => setMobileOpen(false)}
                className="block text-left py-3 px-4 rounded-md font-heading font-semibold text-sm text-white/80 hover:text-gold hover:bg-white/5 transition-colors"
              >
                Services
              </Link>

              {NAV_LINKS.map((item) => (
                <button
                  type="button"
                  key={item.label}
                  data-ocid={item.ocid}
                  onClick={() => {
                    setMobileOpen(false);
                    handleHomeNavClick(item.hash);
                  }}
                  className="text-left py-3 px-4 rounded-md font-heading font-semibold text-sm text-white/80 hover:text-gold hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <Link
                to="/contact"
                data-ocid="nav.contact.link"
                onClick={() => setMobileOpen(false)}
                className="block text-left py-3 px-4 rounded-md font-heading font-semibold text-sm text-white/80 hover:text-gold hover:bg-white/5 transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/erp"
                data-ocid="nav.erp.link"
                onClick={() => setMobileOpen(false)}
                className="block text-left py-3 px-4 rounded-md font-heading font-semibold text-sm text-white/80 hover:text-gold hover:bg-white/5 transition-colors"
              >
                ERP
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  FOOTER                                                         */
/* ─────────────────────────────────────────────────────────────── */

function Footer() {
  const year = new Date().getFullYear();

  const QUICK_LINKS = [
    { label: "Home", hash: "home" },
    { label: "About Us", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Clients", hash: "clients" },
    { label: "Resources", hash: "resources" },
    { label: "Contact Us", to: "/contact" },
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
      href: "https://instagram.com/shriadyalogistics9",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/shriadya",
    },
    {
      icon: Youtube,
      label: "YouTube",
      href: "https://youtube.com/@shriadyalogistics",
    },
  ];

  return (
    <footer className="bg-navy-deeper text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/assets/uploads/Old-Logo-1-1.png"
                alt="Shri Adya Logistics"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div>
                <p className="font-display font-bold text-white text-sm leading-tight">
                  SHRI ADYA LOGISTICS
                </p>
                <p className="text-gold/60 text-xs">Enterprise · Est. 2014</p>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed max-w-sm mb-5">
              A leading Explosive Transport and Blasting contract solution
              company serving Jharkhand, Odisha and West Bengal. Trusted by CCL,
              DVC and more.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.label}
                  className="w-9 h-9 rounded-full bg-white/8 text-white/50 flex items-center justify-center hover:bg-gold hover:text-navy transition-all duration-200"
                >
                  <soc.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-gold text-sm uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="text-white/55 hover:text-gold text-sm font-heading transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.hash!)}
                      className="text-white/55 hover:text-gold text-sm font-heading transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-gold text-sm uppercase tracking-widest mb-5">
              Contact Info
            </h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  Bermo Magazine Loadhar, Bermo, Bokaro, Jharkhand 829127
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href="tel:+919835410009"
                  className="hover:text-gold transition-colors"
                >
                  +91-9835410009
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href="mailto:hello@shriadyalogistics.com"
                  className="hover:text-gold transition-colors text-xs break-all"
                >
                  hello@shriadyalogistics.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/35">
          <p>© {year} Shri Adya Logistics. All rights reserved.</p>
          <p>
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-gold transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  SHARED SECTION TITLE                                           */
/* ─────────────────────────────────────────────────────────────── */

function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`mb-12 lg:mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      {eyebrow && (
        <p className="text-gold font-heading font-bold text-xs tracking-[0.2em] uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-muted-foreground text-base max-w-2xl leading-relaxed ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`w-14 h-1 bg-gold rounded-full mt-5 ${align === "center" ? "mx-auto" : ""}`}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  HOME PAGE SECTIONS                                             */
/* ─────────────────────────────────────────────────────────────── */

/* Hero */
function HeroSection() {
  const navigate = useNavigate();

  function goToContact() {
    navigate({ to: "/" }).then(() => {
      setTimeout(() => scrollToSection("contact"), 80);
    });
  }

  function goToServices() {
    navigate({ to: "/" }).then(() => {
      setTimeout(() => scrollToSection("services"), 80);
    });
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/generated/hero-mining-bg.dim_1920x1080.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deeper/95 via-navy/88 to-navy/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/80 via-transparent to-transparent" />

      {/* Decorative geometric accents */}
      <div className="absolute top-24 right-8 lg:right-20 w-48 h-48 border border-gold/10 rounded-full opacity-40" />
      <div className="absolute top-32 right-14 lg:right-28 w-28 h-28 border border-gold/15 rounded-full opacity-50" />
      <div className="absolute bottom-20 left-8 w-32 h-32 border border-white/5 rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">
          {/* Welcome label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 bg-gold/10 border border-gold/25 text-gold px-4 py-2 rounded-full text-xs font-heading font-bold tracking-[0.15em] uppercase mb-7 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Welcome to
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-5"
          >
            SHRI ADYA
            <br />
            <span className="text-gold">LOGISTICS</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-xl sm:text-2xl font-heading font-light text-white/80 italic mb-5 border-l-2 border-gold/50 pl-4"
          >
            "We are always there for you."
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-base sm:text-lg text-white/65 leading-relaxed mb-4 max-w-2xl"
          >
            We offer comprehensive mining solutions tailored to meet your
            specific mining needs. Shri Adya Logistics is a leading player in
            the mining sector in the mineral rich states of{" "}
            <span className="text-white/85 font-medium">
              Jharkhand, Odisha and West Bengal
            </span>
            .
          </motion.p>

          {/* Company register info */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-xs text-white/45 font-heading mb-8 flex flex-wrap gap-x-4 gap-y-1"
          >
            <span>Registered Enterprise Firm</span>
            <span className="text-gold/40">·</span>
            <span>Proprietary: Anirudh Bose</span>
            <span className="text-gold/40">·</span>
            <span>Est. 26 July 2017</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              data-ocid="hero.services.primary_button"
              onClick={goToServices}
              size="lg"
              className="bg-gold hover:bg-gold/90 text-navy font-heading font-bold px-8 py-4 text-sm rounded-none tracking-[0.08em] uppercase transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-gold/20"
            >
              Our Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              data-ocid="hero.contact.secondary_button"
              variant="outline"
              size="lg"
              onClick={goToContact}
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-heading font-semibold px-8 py-4 text-sm rounded-none tracking-[0.08em] uppercase backdrop-blur-sm"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs font-heading tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

/* About Preview */
function AboutPreviewSection() {
  const { ref, visible } = useFadeInView();

  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-14 lg:gap-20 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Left: Text */}
          <div>
            <p className="text-gold font-heading font-bold text-xs tracking-[0.2em] uppercase mb-3">
              Who We Are
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-2">
              About Shri Adya
              <br />
              <span className="text-gold">Logistics</span>
            </h2>
            <div className="w-14 h-1 bg-gold rounded-full mb-6" />

            <p className="text-foreground/70 leading-relaxed mb-5 text-[15px]">
              Shri Adya Logistics is a leading player in the mining sector in
              the mineral rich states of Jharkhand, Odisha and West Bengal. The
              company was established in the year 2017 by young entrepreneurs
              with technical background.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-7 text-[15px]">
              The Company is registered under Enterprise firm under the name{" "}
              <strong className="text-navy font-semibold">
                'SHRI ADYA LOGISTICS'
              </strong>
              , Proprietary:{" "}
              <strong className="text-navy font-semibold">Anirudh Bose</strong>,
              Registered: 26 July 2017.
            </p>

            <Link to="/about">
              <Button
                data-ocid="about.learn_more.button"
                className="bg-navy hover:bg-navy-dark text-white font-heading font-bold px-7 py-3 rounded-none tracking-[0.08em] uppercase text-sm transition-all duration-200 hover:scale-[1.02] group"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right: Highlight cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                icon: Zap,
                value: "Est. 2017",
                label: "Registered Enterprise",
                bg: "bg-navy",
              },
              {
                icon: MapPin,
                value: "3 States",
                label: "Jharkhand · Odisha · West Bengal",
                bg: "bg-gold",
              },
              {
                icon: Users,
                value: "Expert Team",
                label: "Technical Background",
                bg: "bg-navy-dark",
              },
            ].map((item, i) => (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`${item.bg} rounded-2xl p-5 text-center ${item.bg === "bg-gold" ? "text-navy" : "text-white"}`}
              >
                <item.icon
                  className={`w-6 h-6 mx-auto mb-3 ${item.bg === "bg-gold" ? "text-navy" : "text-gold"}`}
                />
                <p
                  className={`font-display font-bold text-lg leading-tight mb-1 ${item.bg === "bg-gold" ? "text-navy" : "text-white"}`}
                >
                  {item.value}
                </p>
                <p
                  className={`text-xs font-heading leading-tight ${item.bg === "bg-gold" ? "text-navy/70" : "text-white/60"}`}
                >
                  {item.label}
                </p>
              </motion.div>
            ))}

            {/* Large stat below */}
            <div className="col-span-3 bg-secondary/50 rounded-2xl p-5 border border-border flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="font-display font-bold text-navy text-sm leading-tight">
                  Safety First — Always
                </p>
                <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                  All drivers trained to comply with applicable government
                  requirements for explosive transport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Services Preview */
function ServicesSection() {
  return (
    <section
      id="services"
      className="py-20 lg:py-28 bg-navy relative overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-gold font-heading font-bold text-xs tracking-[0.2em] uppercase mb-3">
            What We Do
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Our Services
          </h2>
          <p className="mt-4 text-white/55 text-base max-w-2xl mx-auto leading-relaxed">
            "Service is what we sell. It is our quality of service that will set
            us apart from our competition."
          </p>
          <div className="w-14 h-1 bg-gold rounded-full mx-auto mt-5" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[
            {
              icon: Truck,
              title: "Explosive Transportation",
              badge: "Core Service",
              desc: "SHRI ADYA LOGISTICS has a well designed and dedicated approved fleet of trucks ranging from 1 MT to 15 MT capacity for transporting all types of Explosives and Accessories to License locations.",
              features: [
                "All types of Explosives & Accessories",
                "Transport to Licensed Locations",
                "Government Overburden & Ore Transportation",
                "Fleet: 1 MT – 15 MT capacity trucks",
              ],
            },
            {
              icon: Target,
              title: "Logistics & Minerals",
              badge: "Extended Service",
              desc: "We transport Minerals from different loading points across India. Our logistic division abides by all imperative rules and regulations per fundamental mining guidelines.",
              features: [
                "Mineral Transport Nationwide",
                "Tippers & Heavy Duty Trucks",
                "Rack Loading & Shipment",
                "Premium Iron Ore Supply",
              ],
            },
          ].map((svc, i) => (
            <motion.div
              key={svc.title}
              data-ocid={`services.item.${i + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10 hover:bg-white/8 hover:border-gold/20 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center group-hover:bg-gold/25 transition-colors">
                  <svc.icon className="w-7 h-7 text-gold" />
                </div>
                <span className="text-xs font-heading font-bold tracking-widest uppercase text-gold/70 bg-gold/10 px-3 py-1 rounded-full">
                  {svc.badge}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                {svc.title}
              </h3>
              <p className="text-white/65 leading-relaxed mb-6 text-sm">
                {svc.desc}
              </p>
              <ul className="space-y-2.5">
                {svc.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm text-white/60"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            data-ocid="services.view_all.button"
            onClick={() => scrollToSection("services")}
            className="inline-flex items-center gap-2 text-gold font-heading font-bold text-sm tracking-wider uppercase border border-gold/30 hover:border-gold/60 hover:bg-gold/10 px-6 py-3 rounded-none transition-all duration-200"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* Clients */
function ClientsSection() {
  return (
    <section id="clients" className="py-20 lg:py-28 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Who We Serve"
          title="Our Trusted Clients"
          subtitle="Trusted by leading public and private sector organizations across Eastern India."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Central Coal Fields Limited",
              abbr: "CCL",
              logo: "/assets/uploads/Vcpl-Logo-1-2.png",
              desc: "A Miniratna Category-I Central Public Sector Enterprise and subsidiary of Coal India Limited.",
              category: "Public Sector · Coal",
            },
            {
              name: "Damodar Valley Corporation",
              abbr: "DVC",
              logo: "/assets/uploads/DVC-1-1.png",
              desc: "One of India's oldest multi-purpose river valley development projects, serving power and irrigation.",
              category: "Public Sector · Power",
            },
            {
              name: "BKB Transport Private Limited",
              abbr: "BKB",
              logo: "/assets/uploads/bkbLogo-3-3.png",
              desc: "A leading private transport and logistics company in the Eastern India mining sector.",
              category: "Private Sector · Transport",
            },
          ].map((client, i) => (
            <motion.div
              key={client.name}
              data-ocid={`clients.item.${i + 1}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Card className="h-full border-border hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group bg-card overflow-hidden">
                <CardContent className="p-7 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-20 h-16 rounded-xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden p-1 shadow-sm">
                      <img
                        src={client.logo}
                        alt={`${client.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-heading font-bold text-gold bg-gold/8 px-2.5 py-1 rounded-full border border-gold/20">
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

/* Resources */
function ResourcesSection() {
  return (
    <section id="resources" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Our Strength"
          title="Resources"
          subtitle="Our team of techno-managerial experts and skilled workforce is the backbone of our success."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: Users,
              title: "Management Team",
              desc: "The diversity of techno-managerial skills, coupled with the depth of specialist mining skills held by the executive team provides Shri Adya Logistics with a solid platform for achieving aggressive business performance and growth objectives set by the boards.",
              stats: [
                "Technical Expertise",
                "Strategic Vision",
                "10+ Years Experience",
              ],
            },
            {
              icon: Shield,
              title: "Manpower",
              desc: "We've earned our reputation as a respected employer by serving almost every Mining & Exploration customer representing through global portfolio of technology & operations. Shri Adya Logistics commits its people a secure future and knowledge base.",
              stats: [
                "Trained Drivers",
                "Skilled Operators",
                "Safety Compliant",
              ],
            },
          ].map((res, i) => (
            <motion.div
              key={res.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-navy/8 border border-navy/15 flex items-center justify-center mb-6 group-hover:bg-gold/10 group-hover:border-gold/20 transition-all">
                <res.icon className="w-7 h-7 text-navy group-hover:text-gold transition-colors" />
              </div>
              <h3 className="font-display text-xl font-bold text-navy mb-4">
                {res.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                {res.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {res.stats.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-heading font-semibold text-navy bg-navy/6 border border-navy/12 px-3 py-1 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Contact form data interface */
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/* ─────────────────────────────────────────────────────────────── */
/*  HOME PAGE                                                      */
/* ─────────────────────────────────────────────────────────────── */

function HomePage() {
  useEffect(() => {
    document.title = "Shri Adya Logistics — We are always there for you";
  }, []);

  return (
    <motion.div
      key="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <main>
        <HeroSection />
        <AboutPreviewSection />
        <ServicesSection />
        <ClientsSection />
        <ResourcesSection />
      </main>
      <Footer />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  ABOUT PAGE                                                     */
/* ─────────────────────────────────────────────────────────────── */

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

function AboutPage() {
  useEffect(() => {
    document.title = "About Us — Shri Adya Logistics";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.div
      key="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page Banner */}
      <section className="relative bg-navy-deeper pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/3 rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-white/40 text-sm font-heading mb-6"
          >
            <Link to="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gold font-semibold">About Us</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl leading-relaxed"
          >
            A trusted name in Explosive Transport and Blasting Contract
            solutions across Jharkhand, Odisha and West Bengal.
          </motion.p>
        </div>
      </section>

      <main className="bg-background">
        {/* Corporate Profile */}
        <section id="corporate-profile" className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Who We Are"
              title="Corporate Profile"
              align="left"
            />

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-foreground/70 leading-relaxed mb-5">
                  Welcome to Shri Adya Logistics, a reputed Explosive Transport
                  and blasting contract solution-based company in Jharkhand,
                  Odisha and West Bengal. In 29-September-2014, we had
                  established a proprietary unit Mr. Anirudh Bose. Fast forward
                  to 2026 and today we are a highly renowned Explosive Transport
                  and Blasting contract solution company in the Jharkhand,
                  Odisha and West Bengal.
                </p>
                <p className="text-foreground/70 leading-relaxed mb-5">
                  Backed by a vast experience in raising, crushing, excavation,
                  transportation and sales, we have successfully generated a
                  loyal chain of followers today. Our company has deployed
                  excavators, crushing plant, dozers, hyva, tippers, etc. in
                  various projects. These apart, we have also rented and leased
                  out different kinds of mining and crushing equipment.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  Through responsible Explosive Transport and blasting contract
                  solution services, we believe we can create a stronger
                  business and value for all our customers.
                </p>
              </div>

              <div className="space-y-5">
                <div className="bg-navy rounded-2xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -translate-y-16 translate-x-16" />
                  <div className="relative z-10">
                    <p className="text-xs font-heading font-bold text-gold uppercase tracking-widest mb-3">
                      Founder's Quote
                    </p>
                    <blockquote className="text-base font-display font-medium italic leading-relaxed text-white/85 mb-5">
                      "As long as you are the last man standing and are adding
                      value, you would continue to grow. The last man standing
                      has the best chance at being the first man forward."
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center font-display font-bold text-navy text-sm">
                        AB
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-sm">
                          Anirudh Bose
                        </p>
                        <p className="text-white/55 text-xs">
                          Proprietor, Shri Adya Logistics
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Founded", value: "2014" },
                    { label: "Registered", value: "2017" },
                    { label: "States", value: "3" },
                    { label: "Equipment Types", value: "6+" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-secondary/50 border border-border rounded-xl p-4 text-center"
                    >
                      <p className="font-display text-2xl font-bold text-gold">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground font-heading font-semibold mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our History */}
        <section id="our-history" className="py-20 lg:py-28 bg-secondary/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Our Journey"
              title="Our History"
              align="left"
            />

            <div className="max-w-3xl">
              <div className="bg-gold/8 border-l-4 border-gold rounded-r-xl px-6 py-4 mb-8">
                <p className="text-navy font-display font-semibold text-lg leading-snug">
                  From a humble beginning in 2014 to a registered enterprise —
                  the inspiring story of Shri Adya Logistics.
                </p>
              </div>

              <div className="space-y-5 text-foreground/75 leading-relaxed">
                <p>
                  The Company was started on{" "}
                  <span className="inline-flex items-center bg-navy text-white font-heading font-bold text-xs px-2.5 py-0.5 rounded-full mx-0.5 align-middle">
                    29 Sep 2014
                  </span>{" "}
                  by{" "}
                  <strong className="text-navy font-semibold">
                    Anirudh Bose
                  </strong>
                  , but the company didn't have any work at the time. After a
                  few months, Anirudh decided he should work with his cousin
                  brother{" "}
                  <strong className="text-navy font-semibold">
                    Sabyasachi Bose
                  </strong>{" "}
                  as partners — together they decided to create an Explosive
                  Transportation Company.
                </p>

                <p>
                  After a few months, they got their first Work Order on{" "}
                  <span className="inline-flex items-center bg-navy text-white font-heading font-bold text-xs px-2.5 py-0.5 rounded-full mx-0.5 align-middle">
                    17 Nov 2014
                  </span>{" "}
                  for transporting explosives. However, at that time they did
                  not have a truck nor a registered company, so they offered the
                  work to another company and started work as a{" "}
                  <em className="text-foreground/60">Sub-contractor</em> on
                  behalf of that company.
                </p>

                <p>
                  Later on, after approximately one year, Sabyasachi Bose was
                  discontinued from the partnership. From there, Anirudh Bose
                  took over all the charges of the company and completed the
                  order successfully.
                </p>

                <p>
                  After completing three successful years, Anirudh decided to
                  register his own company. He registered the company on{" "}
                  <span className="inline-flex items-center bg-gold text-navy font-heading font-bold text-xs px-2.5 py-0.5 rounded-full mx-0.5 align-middle">
                    26 Jul 2017
                  </span>{" "}
                  under the name{" "}
                  <strong className="text-navy font-semibold">
                    "SHRI ADYA LOGISTICS"
                  </strong>{" "}
                  under Enterprise firm — a milestone that marked the formal
                  beginning of a thriving logistics business.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { date: "29 Sep 2014", label: "Company Founded" },
                  { date: "17 Nov 2014", label: "First Work Order" },
                  { date: "26 Jul 2017", label: "Official Registration" },
                ].map((m) => (
                  <div
                    key={m.date}
                    className="bg-navy text-white rounded-xl p-4 text-center"
                  >
                    <p className="font-display font-bold text-gold text-sm leading-tight mb-1">
                      {m.date}
                    </p>
                    <p className="text-white/70 text-xs font-heading font-semibold leading-snug">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Our Direction"
              title="Vision &amp; Mission"
            />
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: "👁️",
                  label: "Our Vision",
                  text: "We will provide the best transport system which is safe, reliable, efficient, environmentally friendly and satisfying to both users and operators.",
                  bg: "bg-navy",
                },
                {
                  icon: "🎯",
                  label: "Our Mission",
                  text: "To constantly seek high levels of productivity and technical efficiency; to maintain technological superiority over competitors. Customer satisfaction has always topped our priority list.",
                  bg: "bg-gold",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className={`${item.bg} rounded-2xl p-8 ${item.bg === "bg-gold" ? "text-navy" : "text-white"}`}
                >
                  <span className="text-3xl mb-4 block">{item.icon}</span>
                  <h3 className="font-display text-xl font-bold mb-3">
                    {item.label}
                  </h3>
                  <p
                    className={`leading-relaxed ${item.bg === "bg-gold" ? "text-navy/75" : "text-white/80"}`}
                  >
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 lg:py-24 bg-secondary/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="What Drives Us"
              title="Core Values"
              subtitle="Shri Adya Logistics values are fundamental to the overall success of our business and the foundation upon which we operate every day."
            />
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
                  <div className="w-12 h-12 rounded-lg bg-navy/6 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors">
                    <val.icon className="w-6 h-6 text-navy group-hover:text-gold transition-colors" />
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
        </section>

        {/* Our Values Extended */}
        <section className="py-16 bg-navy-deeper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-white/60 font-heading text-base max-w-2xl mx-auto leading-relaxed mb-8">
                Shri Adya Logistics strongly believes in giving back to the
                society and its Corporate Social Responsibility. It facilitates
                periphery development across verticals including medical
                welfare, afforestation, education, infrastructure development
                and cultural activities.
              </p>
              <Link to="/">
                <Button
                  onClick={() =>
                    setTimeout(() => scrollToSection("contact"), 80)
                  }
                  className="bg-gold hover:bg-gold/90 text-navy font-heading font-bold px-8 py-3 rounded-none tracking-[0.08em] uppercase text-sm"
                >
                  Work With Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  COMING SOON PAGE TEMPLATE                                      */
/* ─────────────────────────────────────────────────────────────── */

function ComingSoonPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  useEffect(() => {
    document.title = `${title} — Shri Adya Logistics`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [title]);

  return (
    <motion.div
      key={`page-${title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Banner */}
      <section className="relative bg-navy-deeper pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 text-white/40 text-sm font-heading mb-6">
            <Link to="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gold font-semibold">{title}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            {title}
          </h1>
          <p className="text-white/55 text-lg max-w-xl leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      <main className="bg-background min-h-[50vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-navy/8 border border-navy/12 flex items-center justify-center mx-auto mb-6">
              <Truck className="w-10 h-10 text-gold" />
            </div>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">
              Page Coming Soon
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              This page is under construction. We're working hard to bring you
              all the details. In the meantime, contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <Button className="bg-navy hover:bg-navy-dark text-white font-heading font-bold px-6 py-3 rounded-none uppercase tracking-wider text-sm">
                  Back to Home
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  onClick={() =>
                    setTimeout(() => scrollToSection("contact"), 80)
                  }
                  className="border-navy/30 text-navy hover:bg-navy/5 font-heading font-semibold px-6 py-3 rounded-none uppercase tracking-wider text-sm"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  CONTACT PAGE                                                   */
/* ─────────────────────────────────────────────────────────────── */

function ContactPage() {
  const { actor } = useActor();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    document.title = "Contact Us — Shri Adya Logistics";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      if (!actor)
        throw new Error("Service unavailable. Please try again later.");
      await actor.submitContactForm(
        data.name,
        data.email,
        `${data.message}${data.phone ? ` | Phone: ${data.phone}` : ""}`,
      );
    },
    onSuccess: () => {
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to send. Please try again.");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    contactMutation.mutate(formData);
  }

  const CONTACT_DETAILS = [
    {
      icon: MapPin,
      label: "Registered Office",
      value:
        "Bermo Magazine Loadhar Bera Basti, Bermo, Bokaro, Jharkhand 829127",
      href: null,
    },
    {
      icon: Mail,
      label: "Email",
      value: "hello@shriadyalogistics.com",
      href: "mailto:hello@shriadyalogistics.com",
    },
    {
      icon: Phone,
      label: "Contact No",
      value: "+91-9835410009",
      href: "tel:+919835410009",
    },
  ];

  const SOCIAL_LINKS = [
    {
      icon: Facebook,
      label: "Facebook",
      handle: "fb.me/shriadyalogistics",
      href: "https://fb.me/shriadyalogistics",
      color: "#1877F2",
    },
    {
      icon: Instagram,
      label: "Instagram",
      handle: "@shriadyalogistics9",
      href: "https://instagram.com/shriadyalogistics9",
      color: "#E4405F",
    },
    {
      icon: Twitter,
      label: "Twitter / X",
      handle: "/shriadya",
      href: "https://twitter.com/shriadya",
      color: "#1DA1F2",
    },
    {
      icon: Youtube,
      label: "YouTube",
      handle: "@shriadyalogistics",
      href: "https://youtube.com/@shriadyalogistics",
      color: "#FF0000",
    },
  ];

  return (
    <motion.div
      key="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page Banner */}
      <section className="relative bg-navy-deeper pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/3 rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-white/40 text-sm font-heading mb-6"
          >
            <Link to="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gold font-semibold">Contact Us</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl leading-relaxed"
          >
            We'd love to hear from you. Reach out to us for inquiries,
            partnerships or any information about our services.
          </motion.p>
        </div>
      </section>

      <main className="bg-background">
        {/* Contact Details + Map */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: Info + Social + Map */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <p className="text-gold font-heading font-bold text-xs tracking-[0.2em] uppercase mb-3">
                  Get In Touch
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy leading-tight mb-2">
                  Our Office
                </h2>
                <div className="w-14 h-1 bg-gold rounded-full mb-8" />

                {/* Contact Details */}
                <div className="space-y-5 mb-10">
                  {CONTACT_DETAILS.map((info) => (
                    <div
                      key={info.label}
                      className="flex items-start gap-4 p-4 rounded-xl bg-secondary/40 border border-border hover:border-gold/30 transition-colors"
                    >
                      <div className="w-11 h-11 rounded-xl bg-navy flex items-center justify-center flex-shrink-0 mt-0.5">
                        <info.icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-xs font-heading font-bold text-navy/50 uppercase tracking-widest mb-0.5">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-navy font-heading font-semibold text-sm leading-relaxed hover:text-gold transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-navy font-heading font-semibold text-sm leading-relaxed">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Media */}
                <div className="mb-10">
                  <p className="font-display font-bold text-navy text-lg mb-5">
                    Follow Us
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {SOCIAL_LINKS.map((soc) => (
                      <a
                        key={soc.label}
                        href={soc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-ocid={`contact.social.${soc.label.toLowerCase().replace(/[^a-z0-9]/g, "")}.link`}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${soc.color}15` }}
                        >
                          <soc.icon
                            className="w-4 h-4"
                            style={{ color: soc.color }}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-heading font-bold text-navy/50 uppercase tracking-wider leading-none mb-0.5">
                            {soc.label}
                          </p>
                          <p className="text-xs font-heading font-semibold text-navy truncate group-hover:text-gold transition-colors">
                            {soc.handle}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Google Map */}
                <div>
                  <p className="font-display font-bold text-navy text-lg mb-5">
                    Our Location
                  </p>
                  <div
                    data-ocid="contact.map_marker"
                    className="rounded-2xl overflow-hidden border border-border shadow-md"
                  >
                    <iframe
                      title="Shri Adya Logistics Office Location"
                      src="https://maps.google.com/maps?q=Bermo+Magazine+Loadhar+Bera+Basti+Bermo+Bokaro+Jharkhand+829127&output=embed&iwloc=&z=15"
                      width="100%"
                      height="320"
                      style={{ border: 0, display: "block" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-gold flex-shrink-0" />
                      Bermo Magazine Loadhar Bera Basti, Bermo, Bokaro,
                      Jharkhand 829127
                    </p>
                    <a
                      href="https://maps.app.goo.gl/GLAy2pCMuHtPotCt8"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid="contact.map_marker"
                      className="text-xs font-heading font-semibold text-gold hover:underline flex items-center gap-1 flex-shrink-0 ml-3"
                    >
                      Open in Maps
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Right: Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-navy-deeper rounded-2xl p-8 shadow-2xl sticky top-24"
              >
                <p className="text-gold font-heading font-bold text-xs tracking-[0.2em] uppercase mb-3">
                  Send a Message
                </p>
                <h3 className="font-display text-2xl font-bold text-white mb-6">
                  Write to Us
                </h3>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <Label
                      htmlFor="cp-contact-name"
                      className="font-heading font-semibold text-xs text-white/60 uppercase tracking-wider mb-1.5 block"
                    >
                      Full Name <span className="text-gold">*</span>
                    </Label>
                    <Input
                      id="cp-contact-name"
                      data-ocid="contact.form.input"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      disabled={contactMutation.isPending}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-gold rounded-md"
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="cp-contact-email"
                      className="font-heading font-semibold text-xs text-white/60 uppercase tracking-wider mb-1.5 block"
                    >
                      Email Address <span className="text-gold">*</span>
                    </Label>
                    <Input
                      id="cp-contact-email"
                      data-ocid="contact.form.email.input"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                      disabled={contactMutation.isPending}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-gold rounded-md"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="cp-contact-phone"
                      className="font-heading font-semibold text-xs text-white/60 uppercase tracking-wider mb-1.5 block"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="cp-contact-phone"
                      data-ocid="contact.form.phone.input"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, phone: e.target.value }))
                      }
                      disabled={contactMutation.isPending}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-gold rounded-md"
                      autoComplete="tel"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="cp-contact-message"
                      className="font-heading font-semibold text-xs text-white/60 uppercase tracking-wider mb-1.5 block"
                    >
                      Message <span className="text-gold">*</span>
                    </Label>
                    <Textarea
                      id="cp-contact-message"
                      data-ocid="contact.form.textarea"
                      placeholder="Tell us about your requirements..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      disabled={contactMutation.isPending}
                      rows={5}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-gold rounded-md resize-none"
                    />
                  </div>

                  {contactMutation.isPending && (
                    <div
                      data-ocid="contact.loading_state"
                      className="flex items-center gap-2 text-sm text-white/60 font-heading"
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending your message...</span>
                    </div>
                  )}
                  {contactMutation.isSuccess && (
                    <div
                      data-ocid="contact.success_state"
                      className="flex items-center gap-2 text-sm text-green-300 bg-green-900/30 border border-green-700/40 rounded-md px-3 py-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Message sent successfully!</span>
                    </div>
                  )}
                  {contactMutation.isError && (
                    <div
                      data-ocid="contact.error_state"
                      className="flex items-center gap-2 text-sm text-red-300 bg-red-900/30 border border-red-700/40 rounded-md px-3 py-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>Failed to send. Please try again.</span>
                    </div>
                  )}

                  <Button
                    data-ocid="contact.form.submit_button"
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-gold hover:bg-gold/90 text-navy font-heading font-bold py-3 rounded-none tracking-[0.08em] uppercase text-sm transition-all duration-200"
                    size="lg"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  SERVICES PAGE                                                  */
/* ─────────────────────────────────────────────────────────────── */

function ServicesPage() {
  useEffect(() => {
    document.title = "Services — Shri Adya Logistics";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const EXPLOSIVE_FEATURES = [
    "Transport of all types of Explosives & Accessories",
    "Transport to Licensed Locations",
    "Government Overburden & Ore Transportation",
    "Fleet capacity: 1 Metric Ton – 15 Metric Tons",
    "Dedicated approved fleet of trucks",
    "Compliant with all applicable government requirements",
  ];

  const LOGISTICS_FEATURES = [
    "Mineral transport from multiple loading points across India",
    "Transportation from different mines nationwide",
    "Tippers, Heavy Duty Trucks, Rack Loading & Shipment",
    "Premium quality iron ore supply to global industry",
    "Compliant with fundamental mining rules and regulations",
    "Cost-effective guaranteed assistance",
  ];

  const CLIENTS = [
    {
      name: "Central Coal Fields Limited",
      logo: "/assets/uploads/Vcpl-Logo-3-2.png",
      category: "Public Sector · Coal",
      desc: "A Miniratna Category-I Central Public Sector Enterprise and subsidiary of Coal India Limited.",
    },
    {
      name: "Damodar Valley Corporation",
      logo: "/assets/uploads/DVC-3-1.png",
      category: "Public Sector · Power",
      desc: "One of India's oldest multi-purpose river valley development projects, serving power and irrigation.",
    },
    {
      name: "BKB Transport Private Limited",
      logo: "/assets/uploads/bkbLogo-5-3.png",
      category: "Private Sector · Transport",
      desc: "A leading private transport and logistics company in the Eastern India mining sector.",
    },
  ];

  return (
    <motion.div
      key="services-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Banner */}
      <section className="relative bg-navy-deeper pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/3 rounded-full translate-y-1/2 -translate-x-1/4" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 60%, white 1px, transparent 1px), radial-gradient(circle at 70% 30%, white 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-white/40 text-sm font-heading mb-6"
          >
            <Link to="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gold font-semibold">Services</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-gold font-heading font-bold text-xs tracking-[0.2em] uppercase mb-3">
              What We Offer
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Our Services
            </h1>
            <div className="bg-white/5 border-l-4 border-gold rounded-r-xl px-6 py-4 max-w-2xl">
              <p className="text-white/80 text-base leading-relaxed italic font-heading">
                "Service is what we sell. It is our quality of service that will
                set us apart from our competition. We will proactively
                communicate with our customers and drivers so their expectations
                are fulfilled."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="bg-background">
        {/* Explosive Transportation */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/25 text-gold px-4 py-1.5 rounded-full text-xs font-heading font-bold tracking-widest uppercase mb-5">
                  <Zap className="w-3.5 h-3.5" />
                  Core Service
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy leading-tight mb-2">
                  Explosive Transportation
                </h2>
                <div className="w-14 h-1 bg-gold rounded-full mb-6" />
                <p className="text-foreground/70 leading-relaxed mb-4 text-[15px]">
                  SHRI ADYA LOGISTICS is an Explosive Transportation Company.
                  The Company is mainly into site Explosive Supply for mining
                  and has a well designed and dedicated approved fleet of trucks
                  ranging from{" "}
                  <strong className="text-navy font-semibold">
                    1 Metric Ton – 15 Metric Tons
                  </strong>{" "}
                  capacity for transporting all types of Explosives, Accessories
                  to License locations and Government transportation of
                  'overburden' and ore.
                </p>
                <p className="text-foreground/70 leading-relaxed mb-8 text-[15px]">
                  In the past few years, SHRI ADYA LOGISTICS has undergone rapid
                  changes with activities compounding throughout the country and
                  overseas.
                </p>
                <ul className="space-y-3">
                  {EXPLOSIVE_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-gold" />
                      </span>
                      <span className="text-sm text-foreground/75 leading-relaxed">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-5"
              >
                <div className="bg-navy rounded-2xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full -translate-y-20 translate-x-20 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center mb-5">
                      <Truck className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3">
                      Our Fleet
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-5">
                      A dedicated approved fleet of trucks specifically designed
                      and maintained for safe explosive transportation, meeting
                      all regulatory requirements.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "1 MT", label: "Minimum Capacity" },
                        { value: "15 MT", label: "Maximum Capacity" },
                        { value: "100%", label: "Regulatory Compliant" },
                        { value: "Pan India", label: "Service Coverage" },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="bg-white/8 rounded-xl p-3 text-center"
                        >
                          <p className="font-display font-bold text-gold text-lg">
                            {stat.value}
                          </p>
                          <p className="text-white/55 text-xs font-heading mt-0.5">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gold/8 border border-gold/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5 text-gold flex-shrink-0" />
                    <p className="font-display font-bold text-navy text-sm">
                      Safety Commitment
                    </p>
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    "Safety is our first priority. We will achieve this through
                    training our drivers and employees to focus on driver
                    compliance with all applicable government requirements."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Logistics */}
        <section className="py-20 lg:py-28 bg-navy relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:order-2"
              >
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-gold px-4 py-1.5 rounded-full text-xs font-heading font-bold tracking-widest uppercase mb-5">
                  <Target className="w-3.5 h-3.5" />
                  Extended Service
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-2">
                  Logistics & Minerals
                </h2>
                <div className="w-14 h-1 bg-gold rounded-full mb-6" />
                <p className="text-white/75 leading-relaxed mb-4 text-[15px]">
                  Here at Shri Adya Logistics, we also transport Minerals from
                  different loading points in India. We also carry out
                  transportation from different mines from many other areas.
                </p>
                <p className="text-white/75 leading-relaxed mb-4 text-[15px]">
                  Today we take pride in announcing that we successfully
                  transport the premium quality materials all across the
                  country. Our logistic division abides by all the imperative
                  rules and regulations as per the fundamental mining rules.
                </p>
                <p className="text-white/75 leading-relaxed mb-8 text-[15px]">
                  We nestle Tippers, Heavy Duty Truck, Rack loading, shipment,
                  etc. We aim at securing our future together as a successful
                  supplier of the best quality iron ore products to the global
                  industry. We can provide you the guaranteed assistance without
                  burning a hole in your pocket.
                </p>
                <ul className="space-y-3">
                  {LOGISTICS_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-gold" />
                      </span>
                      <span className="text-sm text-white/65 leading-relaxed">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:order-1 space-y-5"
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="w-16 h-16 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center mb-5">
                    <MapPin className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">
                    Nationwide Coverage
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-5">
                    From mineral-rich Jharkhand, Odisha and West Bengal to mines
                    across India — we connect loading points to destinations
                    reliably and efficiently.
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: "🏗️", label: "Tippers" },
                      { icon: "🚛", label: "Heavy Duty Trucks" },
                      { icon: "📦", label: "Rack Loading" },
                      { icon: "🚢", label: "Shipment" },
                      { icon: "⛏️", label: "Mining Routes" },
                      { icon: "🌍", label: "Pan India" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-white/8 rounded-xl p-3 text-center"
                      >
                        <span className="text-xl block mb-1">{item.icon}</span>
                        <p className="text-white/60 text-xs font-heading font-semibold">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section className="py-20 lg:py-28 bg-secondary/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Who We Serve"
              title="Our Trusted Clients"
              subtitle="Trusted by leading public and private sector organizations across Eastern India."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CLIENTS.map((client, i) => (
                <motion.div
                  key={client.name}
                  data-ocid={`services.client.item.${i + 1}`}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                >
                  <Card className="h-full border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group bg-card overflow-hidden">
                    <CardContent className="p-7 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-20 h-16 rounded-xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden p-1 shadow-sm">
                          <img
                            src={client.logo}
                            alt={`${client.name} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <span className="text-xs font-heading font-bold text-gold bg-gold/8 px-2.5 py-1 rounded-full border border-gold/20">
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

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-navy-deeper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to Work With Us?
              </h2>
              <p className="text-white/55 text-base leading-relaxed max-w-xl mx-auto mb-8">
                Contact us today to discuss your explosive transportation or
                logistics requirements. We offer reliable, cost-effective
                solutions tailored to your needs.
              </p>
              <Link to="/contact">
                <Button
                  data-ocid="services.contact.primary_button"
                  className="bg-gold hover:bg-gold/90 text-navy font-heading font-bold px-8 py-3 rounded-none tracking-[0.08em] uppercase text-sm"
                >
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  ERP PAGE                                                       */
/* ─────────────────────────────────────────────────────────────── */

function ErpPage() {
  useEffect(() => {
    document.title = "ERP — Shri Adya Logistics";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const ERP_MODULES = [
    {
      icon: Truck,
      title: "Fleet Management",
      desc: "Track and manage your entire fleet of explosive transport trucks, assign routes, and monitor vehicle compliance in real time.",
      status: "Coming Soon",
    },
    {
      icon: Shield,
      title: "Compliance Portal",
      desc: "Centralise all government compliance documents, licenses, and regulatory approvals for explosive transportation in one place.",
      status: "Coming Soon",
    },
    {
      icon: Users,
      title: "Team Dashboard",
      desc: "Manage drivers, operators, and staff profiles, track certifications, assign jobs, and monitor workforce performance.",
      status: "Coming Soon",
    },
    {
      icon: Target,
      title: "Order & Job Tracking",
      desc: "End-to-end visibility of work orders — from first assignment to final delivery — across all active mining sites.",
      status: "Coming Soon",
    },
    {
      icon: MapPin,
      title: "Route & Site Planning",
      desc: "Plan and optimise transport routes for explosive deliveries across Jharkhand, Odisha and West Bengal mining sites.",
      status: "Coming Soon",
    },
    {
      icon: Award,
      title: "Reports & Analytics",
      desc: "Generate operational reports, track KPIs, and gain business insights to drive better decisions and growth.",
      status: "Coming Soon",
    },
  ];

  return (
    <motion.div
      key="erp-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Banner */}
      <section className="relative bg-navy-deeper pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/3 rounded-full translate-y-1/2 -translate-x-1/4" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 60%, white 1px, transparent 1px), radial-gradient(circle at 70% 30%, white 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-white/40 text-sm font-heading mb-6"
          >
            <Link to="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gold font-semibold">ERP</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/25 text-gold px-4 py-1.5 rounded-full text-xs font-heading font-bold tracking-widest uppercase mb-5">
              <Zap className="w-3.5 h-3.5" />
              Enterprise Resource Planning
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              ERP System
            </h1>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
              A dedicated enterprise platform for Shri Adya Logistics — managing
              fleet, compliance, workforce, and operations all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="bg-background">
        {/* Coming Soon Banner */}
        <section className="py-12 bg-gold/8 border-y border-gold/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="font-display font-bold text-navy text-base">
                    ERP Module Under Development
                  </p>
                  <p className="text-muted-foreground text-sm">
                    We are actively building these tools. Stay tuned for launch
                    updates.
                  </p>
                </div>
              </div>
              <Link to="/contact">
                <Button
                  data-ocid="erp.notify.primary_button"
                  className="bg-navy hover:bg-navy-dark text-white font-heading font-bold px-6 py-2.5 rounded-none tracking-[0.08em] uppercase text-xs whitespace-nowrap"
                >
                  Get Notified
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ERP Module Cards */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Platform Overview"
              title="ERP Modules"
              subtitle="Powerful tools designed specifically for the explosive transport and logistics industry — built to streamline every aspect of operations."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ERP_MODULES.map((mod, i) => (
                <motion.div
                  key={mod.title}
                  data-ocid={`erp.module.item.${i + 1}`}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-card border border-border rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 hover:border-gold/25 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-heading font-bold tracking-widest uppercase text-gold/70 bg-gold/8 border border-gold/15 px-2.5 py-1 rounded-full">
                      {mod.status}
                    </span>
                  </div>
                  <div className="w-13 h-13 w-12 h-12 rounded-xl bg-navy/6 border border-navy/12 flex items-center justify-center mb-5 group-hover:bg-gold/10 group-hover:border-gold/20 transition-all">
                    <mod.icon className="w-6 h-6 text-navy group-hover:text-gold transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-navy text-lg mb-3 pr-16">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {mod.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-navy-deeper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                Interested in Early Access?
              </h2>
              <p className="text-white/55 text-base leading-relaxed max-w-xl mx-auto mb-8">
                Contact us to learn more about our upcoming ERP platform and how
                it can help streamline your mining logistics operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    data-ocid="erp.contact.primary_button"
                    className="bg-gold hover:bg-gold/90 text-navy font-heading font-bold px-8 py-3 rounded-none tracking-[0.08em] uppercase text-sm"
                  >
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/">
                  <Button
                    data-ocid="erp.home.secondary_button"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-heading font-semibold px-8 py-3 rounded-none tracking-[0.08em] uppercase text-sm backdrop-blur-sm"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  ROOT LAYOUT                                                    */
/* ─────────────────────────────────────────────────────────────── */

function RootLayout() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Navbar />
      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
      <FloatingChatButtons />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  ROUTER SETUP                                                   */
/* ─────────────────────────────────────────────────────────────── */

const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: ServicesPage,
});

const clientsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/clients",
  component: () => (
    <ComingSoonPage
      title="Our Clients"
      description="Learn about the trusted organizations we serve across Eastern India."
    />
  ),
});

function ResourcesPage() {
  useEffect(() => {
    document.title = "Resources — Shri Adya Logistics";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.div
      key="resources-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Banner */}
      <section className="relative bg-navy-deeper pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/3 rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-white/40 text-sm font-heading mb-6"
          >
            <Link to="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gold font-semibold">Resources</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          >
            Resources
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl leading-relaxed"
          >
            Our people are our greatest asset — a skilled management team and a
            committed workforce driving excellence every day.
          </motion.p>
        </div>
      </section>

      <main className="bg-background">
        {/* Management Team Section */}
        <section id="management-team" className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Leadership"
              title="Management Team"
              align="left"
            />
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-foreground/70 leading-relaxed mb-6 text-[15px]">
                  The diversity of techno-managerial skills, coupled with the
                  depth of specialist mining skills held by the executive team
                  provides Shri Adya Logistics with a solid platform for
                  achieving the aggressive business performance and growth
                  objectives set by the boards.
                </p>
                <p className="text-foreground/70 leading-relaxed text-[15px]">
                  Our management team brings together deep domain expertise in
                  explosive transportation, logistics, and mining operations —
                  ensuring every project is executed with precision, safety, and
                  operational excellence.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    icon: Target,
                    title: "Techno-Managerial Expertise",
                    desc: "A rare blend of technical know-how and strategic management capability that drives business performance.",
                  },
                  {
                    icon: Award,
                    title: "Specialist Mining Skills",
                    desc: "Deep specialist knowledge of mining operations, explosive handling, and compliance requirements.",
                  },
                  {
                    icon: Zap,
                    title: "Growth-Oriented Vision",
                    desc: "Ambitious, board-approved objectives with clear pathways to sustained business growth across regions.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    data-ocid={`resources.management.item.${i + 1}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="flex items-start gap-4 bg-secondary/50 border border-border rounded-xl p-5 hover:border-gold/30 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-lg bg-navy/8 border border-navy/15 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-navy text-sm mb-1">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Leadership highlight card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 bg-navy rounded-2xl p-8 lg:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/8 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/3 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
              <div className="relative z-10 grid sm:grid-cols-3 gap-8 items-center">
                <div className="sm:col-span-2">
                  <p className="text-xs font-heading font-bold text-gold uppercase tracking-widest mb-3">
                    Proprietary & Founder
                  </p>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">
                    Anirudh Bose
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-4">
                    Founder and Proprietor of Shri Adya Logistics, Anirudh Bose
                    established the company from the ground up — beginning as a
                    sub-contractor in 2014 and building it into a fully
                    registered, respected enterprise by 2017.
                  </p>
                  <blockquote className="border-l-2 border-gold pl-4 text-white/75 italic text-sm leading-relaxed">
                    "As long as you are the last man standing and are adding
                    value, you would continue to grow."
                  </blockquote>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "2014", label: "Founded" },
                    { value: "2017", label: "Registered" },
                    { value: "3", label: "States" },
                    { value: "10+", label: "Years Active" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/8 rounded-xl p-4 text-center"
                    >
                      <p className="font-display font-bold text-gold text-xl">
                        {stat.value}
                      </p>
                      <p className="text-white/55 text-xs font-heading mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Manpower Section */}
        <section id="manpower" className="py-20 lg:py-28 bg-secondary/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Our Workforce"
              title="Manpower"
              align="left"
            />
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-5">
                <div className="bg-gold/8 border-l-4 border-gold rounded-r-xl px-6 py-4">
                  <p className="text-navy font-display font-semibold text-base leading-snug">
                    A respected employer serving Mining & Exploration customers
                    through a global portfolio of technology and operations.
                  </p>
                </div>
                <p className="text-foreground/70 leading-relaxed text-[15px]">
                  We've earned our reputation as a respected employer by serving
                  almost every Mining & Exploration customer representing
                  through global portfolio of technology & operations.
                </p>
                <p className="text-foreground/70 leading-relaxed text-[15px]">
                  As the Company's steadfast and unwavering commitment to the
                  Mining sector, Shri Adya Logistics commits its people a secure
                  future and knowledge base — investing in their growth, safety
                  training, and long-term career development.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  {
                    icon: Shield,
                    title: "Safety Trained Drivers",
                    desc: "All drivers trained to comply with government requirements for explosive transportation.",
                    color: "text-navy",
                  },
                  {
                    icon: Users,
                    title: "Skilled Operators",
                    desc: "Experienced operators handling excavators, crushers, dozers, hyva, and tippers.",
                    color: "text-navy",
                  },
                  {
                    icon: Award,
                    title: "Secure Future",
                    desc: "The company commits to giving its workforce a stable career and knowledge growth path.",
                    color: "text-navy",
                  },
                  {
                    icon: Star,
                    title: "Knowledge Base",
                    desc: "Continuous training and development ensuring our team stays ahead in the industry.",
                    color: "text-navy",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    data-ocid={`resources.manpower.item.${i + 1}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-card border border-border rounded-xl p-5 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-navy/6 flex items-center justify-center mb-3">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <h4 className="font-display font-bold text-navy text-sm mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Equipment & Fleet */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 bg-card border border-border rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-navy text-lg">
                    Fleet & Equipment
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Operated and managed by our skilled workforce
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Excavators",
                  "Crushing Plant",
                  "Dozers",
                  "Hyva Trucks",
                  "Tippers",
                  "Heavy Duty Trucks",
                  "Rack Loading Equipment",
                  "1 MT – 15 MT Explosive Transport Trucks",
                ].map((item) => (
                  <span
                    key={item}
                    className="text-sm font-heading font-semibold text-navy bg-navy/6 border border-navy/12 px-3.5 py-1.5 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-navy-deeper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-white/60 font-heading text-base max-w-2xl mx-auto leading-relaxed mb-8">
                Interested in partnering with us or learning more about our
                capabilities? Our team is ready to discuss your mining and
                logistics requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    data-ocid="resources.contact.primary_button"
                    className="bg-gold hover:bg-gold/90 text-navy font-heading font-bold px-8 py-3 rounded-none tracking-[0.08em] uppercase text-sm"
                  >
                    Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button
                    data-ocid="resources.services.secondary_button"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-heading font-semibold px-8 py-3 rounded-none tracking-[0.08em] uppercase text-sm backdrop-blur-sm"
                  >
                    Our Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}

const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resources",
  component: ResourcesPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const erpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/erp",
  component: ErpPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  servicesRoute,
  clientsRoute,
  resourcesRoute,
  contactRoute,
  erpRoute,
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

/* ─────────────────────────────────────────────────────────────── */
/*  APP ROOT                                                       */
/* ─────────────────────────────────────────────────────────────── */

export default function App() {
  return <RouterProvider router={router} />;
}
