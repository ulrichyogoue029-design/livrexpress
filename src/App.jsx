import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Activity, ShieldCheck, Clock, Twitter, Instagram, Linkedin, X as CloseIcon, Menu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Magnetic Button
const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const isPrimary = variant === 'primary';
  const baseStyle = "magnetic-btn hover-lift inline-flex items-center justify-center px-8 py-4 rounded-full font-sans font-semibold text-sm tracking-wide z-10 transition-colors duration-500 overflow-hidden";
  const colorStyle = isPrimary ? "bg-accent text-white" : "bg-primary text-background border border-primary/20 hover:border-transparent";
  
  return (
    <button className={`${baseStyle} ${colorStyle} ${className}`} {...props}>
      <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover:text-white">
        {children}
      </span>
      <span className="bg-slide"></span>
    </button>
  );
};

// Navbar
const Navbar = ({ onOpenReservation }) => {
  const navRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
          className: 'nav-scrolled',
          targets: navRef.current
        }
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4">
      <nav ref={navRef} className="flex items-center justify-between w-full max-w-5xl px-6 py-4 transition-all duration-500 rounded-full bg-transparent text-white border border-transparent [&.nav-scrolled]:bg-background/90 [&.nav-scrolled]:backdrop-blur-xl [&.nav-scrolled]:text-dark [&.nav-scrolled]:border-dark/10 [&.nav-scrolled]:shadow-lg group">
        <div className="font-display font-bold text-xl tracking-tight">LivrExpress</div>
        
        <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
          <a href="#features" className="hover-lift">Fonctionnalités</a>
          <a href="#philosophy" className="hover-lift">Philosophie</a>
          <a href="#pricing" className="hover-lift">Tarifs</a>
        </div>
        <Button className="hidden md:flex py-2 px-6" onClick={onOpenReservation}>
          Réserver
        </Button>
        
        <button 
          className="md:hidden p-2 focus:outline-none transition-transform hover:scale-110" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <div className={`md:hidden transition-all duration-300 w-full max-w-5xl overflow-hidden ${isMobileMenuOpen ? 'max-h-72 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-background/95 backdrop-blur-xl text-dark border border-dark/10 rounded-3xl p-6 flex flex-col gap-5 shadow-lg">
          <a href="#features" className="font-sans font-medium hover:text-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Fonctionnalités</a>
          <a href="#philosophy" className="font-sans font-medium hover:text-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Philosophie</a>
          <a href="#pricing" className="font-sans font-medium hover:text-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Tarifs</a>
          <Button variant="secondary" className="py-3 px-6 w-full" onClick={() => { setIsMobileMenuOpen(false); onOpenReservation(); }}>
            Réserver
          </Button>
        </div>
      </div>
    </div>
  );
};

// Hero
const Hero = ({ onOpenReservation }) => {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] flex items-end pb-24 lg:pb-32 px-6 lg:px-12 overflow-hidden bg-dark">
      <div className="absolute inset-0">
        <img 
          src="/hero-motorcycle.png" 
          alt="Livreur sur une moto, ambiance urbaine et technologique"
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-[#1A1A1A]/30"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start text-white">
        <h1 className="flex flex-col leading-[1.1] mb-8">
          <span className="hero-anim font-sans font-bold text-2xl md:text-3xl lg:text-4xl text-white/90 uppercase tracking-widest mb-2">
            LivrExpress est la
          </span>
          <span className="hero-anim font-dramatic italic text-7xl md:text-[8rem] lg:text-[10rem] text-accent pr-4">
            Vitesse.
          </span>
        </h1>
        <p className="hero-anim max-w-md text-lg md:text-xl font-sans text-white/80 mb-10 leading-relaxed">
          Livraison rapide de colis en 2 heures à Dakar. Le pont entre logistique clinique et avant-garde.
        </p>
        <div className="hero-anim">
          <Button variant="primary" className="text-lg px-10 py-5" onClick={onOpenReservation}>
            Réserver une consultation <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

// Features Cards
const DiagnosticMixer = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Colis Récupéré", time: "- 00:15" },
    { id: 2, text: "En Transit Rapide", time: "- 00:45" },
    { id: 3, text: "Livré à Destination", time: "- 01:55" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 w-full flex items-center justify-center">
      {items.map((item, i) => (
        <div 
          key={item.id}
          className="absolute w-full max-w-[240px] bg-white border border-dark/10 p-4 rounded-2xl shadow-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex justify-between items-center"
          style={{
            transform: `translateY(${i * 20 - 20}px) scale(${1 - i * 0.05})`,
            opacity: 1 - i * 0.3,
            zIndex: 10 - i
          }}
        >
          <span className="font-sans font-medium text-sm text-dark">{item.text}</span>
          <span className="font-mono text-xs text-accent">{item.time}</span>
        </div>
      ))}
    </div>
  );
};

const TelemetryTyping = () => {
  const [text, setText] = useState("");
  const fullText = "Cryptage bout en bout... Suivi GPS actif... Colis sécurisé...";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        index = 0;
        setText("");
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-48 w-full bg-dark rounded-2xl p-6 flex flex-col justify-between text-white overflow-hidden relative">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
        <span className="font-mono text-xs uppercase tracking-wider text-white/50">Flux en Direct</span>
      </div>
      <div className="font-mono text-sm leading-relaxed text-white/90 break-words h-full relative z-10">
        {text}<span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span>
      </div>
      <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none">
        <ShieldCheck className="w-32 h-32" />
      </div>
    </div>
  );
};

const ProtocolPlanner = () => {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const [activeDay, setActiveDay] = useState(null);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tl.set(cursorRef.current, { x: -20, y: 80, opacity: 0 })
        .to(cursorRef.current, { x: 50, y: 30, opacity: 1, duration: 1, ease: "power2.out" })
        .to(cursorRef.current, { scale: 0.9, duration: 0.1 })
        .call(() => setActiveDay(2))
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(cursorRef.current, { x: 130, y: 110, duration: 1, ease: "power2.inOut", delay: 0.5 })
        .to(cursorRef.current, { scale: 0.9, duration: 0.1 })
        .to(cursorRef.current, { scale: 1, duration: 0.1, opacity: 0 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-48 w-full relative flex flex-col items-center justify-center bg-dark/5 border border-dark/5 p-6 rounded-2xl">
      <div className="grid grid-cols-7 gap-2 w-full mb-6">
        {days.map((d, i) => (
          <div key={i} className={`flex items-center justify-center w-8 h-8 rounded-lg font-mono text-xs transition-colors duration-300 ${activeDay === i ? 'bg-accent text-white' : 'bg-white text-dark/60 shadow-sm'}`}>
            {d}
          </div>
        ))}
      </div>
      <div className="px-6 py-2 rounded-full bg-dark text-white text-xs font-mono transition-transform hover:scale-105">
        Sauvegarder Protocol
      </div>
      
      <svg ref={cursorRef} className="absolute left-0 top-0 w-6 h-6 text-dark drop-shadow-md z-20 pointer-events-none" viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="2">
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
      </svg>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="font-sans font-bold text-sm tracking-widest uppercase text-accent mb-4">Artefacts Fonctionnels</h2>
        <h3 className="font-display text-4xl lg:text-5xl text-dark">L'Ingénierie de la Livraison</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-dark/5 flex flex-col hover-lift">
          <div className="mb-8 flex-1">
            <h4 className="font-sans font-semibold text-xl mb-3 text-dark">Vitesse Cinétique</h4>
            <p className="text-dark/70 font-sans text-sm leading-relaxed">Algorithmes de routage avancés permettant de battre le trafic. Votre colis arrive avant qu'il ne soit attendu.</p>
          </div>
          <DiagnosticMixer />
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-dark/5 flex flex-col hover-lift">
          <div className="mb-8 flex-1">
            <h4 className="font-sans font-semibold text-xl mb-3 text-dark">Bouclier Télémétrique</h4>
            <p className="text-dark/70 font-sans text-sm leading-relaxed">Chaque transfert est encrypté et surveillé en temps réel. La sécurité n'est pas une option, c'est le standard.</p>
          </div>
          <TelemetryTyping />
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-dark/5 flex flex-col hover-lift">
          <div className="mb-8 flex-1">
            <h4 className="font-sans font-semibold text-xl mb-3 text-dark">Fiabilité Infaillible</h4>
            <p className="text-dark/70 font-sans text-sm leading-relaxed">Des protocoles stricts assurent que les promesses faites sont toujours tenues. Planifiez en toute confiance.</p>
          </div>
          <ProtocolPlanner />
        </div>
      </div>
    </section>
  );
};

// Philosophy
const Philosophy = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.phil-text', 
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 1, 
          stagger: 0.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="relative w-full bg-dark py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1506109923831-7788b776a394?q=80&w=2074&auto=format&fit=crop" alt="Moss texture" className="w-full h-full object-cover mix-blend-overlay" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <p className="phil-text font-sans text-xl md:text-2xl text-white/60 mb-12 max-w-2xl">
          La plupart des services de livraison se concentrent sur : la logistique basique.
        </p>
        <p className="phil-text font-dramatic italic text-4xl md:text-6xl lg:text-7xl text-white leading-tight">
          Nous nous concentrons sur : <br/>
          <span className="text-accent not-italic font-display font-bold inline-block mt-4">l'hyper-ponctualité.</span>
        </p>
      </div>
    </section>
  );
};

// Protocol
const Protocol = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (i === cardsRef.current.length - 1) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: cardsRef.current[i + 1],
          end: 'top top',
          pin: true,
          pinSpacing: false,
        });

        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          filter: 'blur(20px)',
          scrollTrigger: {
            trigger: cardsRef.current[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const protocols = [
    {
      num: "01",
      title: "Acquisition Initiale",
      desc: "Analyse des coordonnées et déploiement du coursier le plus proche via notre algorithme de réseau.",
      anim: (
        <svg className="w-full h-full max-w-[200px] animate-spin-slow text-primary/30" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="40" strokeDasharray="4 4"/>
          <circle cx="50" cy="50" r="25" strokeDasharray="2 4"/>
          <path d="M50 10 L50 90 M10 50 L90 50" strokeOpacity="0.3"/>
        </svg>
      )
    },
    {
      num: "02",
      title: "Transit Haute-Vélocité",
      desc: "Optimisation dynamique du trajet en temps réel. Le colis traverse la ville avec une précision chirurgicale.",
      anim: (
        <div className="w-full h-full max-w-[300px] max-h-[200px] relative overflow-hidden flex items-center bg-dark/5 rounded-2xl mx-auto">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent shadow-[0_0_15px_#CC5833] animate-scan z-10"></div>
          <div className="grid grid-cols-12 gap-1 w-full p-4 opacity-30">
            {Array.from({length: 48}).map((_, i) => (
              <div key={i} className="h-1 bg-dark/40 rounded-full"></div>
            ))}
          </div>
        </div>
      )
    },
    {
      num: "03",
      title: "Confirmation Terminale",
      desc: "Livraison sécurisée avec vérification biométrique. La boucle est bouclée, le système se réinitialise.",
      anim: (
        <svg className="w-full h-full max-w-[250px] text-accent" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2">
          <path className="animate-dash" d="M0,25 L20,25 L25,10 L35,40 L40,25 L100,25" />
        </svg>
      )
    }
  ];

  return (
    <section ref={containerRef} className="bg-background relative">
      <div className="pt-32 pb-16 px-6 text-center">
        <h2 className="font-sans font-bold text-sm tracking-widest uppercase text-accent mb-4">Protocole Opérationnel</h2>
        <h3 className="font-display text-4xl text-dark">La Méthodologie LivrExpress</h3>
      </div>
      
      {protocols.map((p, i) => (
        <div 
          key={i} 
          ref={el => cardsRef.current[i] = el}
          className="min-h-[100dvh] w-full flex items-center justify-center p-6 origin-top"
        >
          <div className="w-full max-w-5xl bg-white rounded-[3rem] shadow-xl border border-dark/10 p-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
            <div className="flex-1">
              <span className="font-mono text-5xl text-accent mb-6 block">{p.num}</span>
              <h4 className="font-display text-3xl font-bold text-dark mb-4">{p.title}</h4>
              <p className="font-sans text-lg text-dark/70 max-w-md leading-relaxed">{p.desc}</p>
            </div>
            <div className="flex-1 w-full h-64 md:h-[400px] flex items-center justify-center relative">
              {p.anim}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

// Pricing
const Pricing = () => {
  return (
    <section id="pricing" className="py-32 px-6 lg:px-12 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-sans font-bold text-sm tracking-widest uppercase text-accent mb-4">Adhésion</h2>
          <h3 className="font-display text-4xl lg:text-5xl text-dark">Accès au Réseau</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="bg-white rounded-[2rem] p-8 border border-dark/5 shadow-sm">
            <div className="font-sans font-semibold text-lg text-dark/60 mb-2">Essentiel</div>
            <div className="font-display text-4xl font-bold text-dark mb-6">4.900F <span className="text-base font-normal text-dark/50">/colis</span></div>
            <ul className="space-y-4 mb-8 font-sans text-sm text-dark/80">
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-accent" /> Livraison en 4 heures</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-accent" /> Suivi GPS basique</li>
            </ul>
            <Button variant="secondary" className="w-full">Sélectionner</Button>
          </div>

          <div className="bg-primary text-background rounded-[2.5rem] p-10 shadow-2xl relative transform md:-translate-y-4 border border-white/10">
            <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full font-sans text-xs font-bold uppercase tracking-wider">
              Recommandé
            </div>
            <div className="font-sans font-semibold text-lg text-background/70 mb-2">Performance</div>
            <div className="font-display text-5xl font-bold text-white mb-6">7.900F <span className="text-base font-normal text-background/50">/colis</span></div>
            <ul className="space-y-4 mb-8 font-sans text-sm text-background/90">
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-accent" /> Livraison express en 2 heures</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-accent" /> Suivi GPS télémétrique</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-accent" /> Assurance Premium</li>
            </ul>
            <Button variant="primary" className="w-full py-4 text-sm">Commencer l'essai</Button>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-dark/5 shadow-sm">
            <div className="font-sans font-semibold text-lg text-dark/60 mb-2">Entreprise</div>
            <div className="font-display text-4xl font-bold text-dark mb-6">Sur devis</div>
            <ul className="space-y-4 mb-8 font-sans text-sm text-dark/80">
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-accent" /> Flotte dédiée</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-accent" /> API de routage</li>
            </ul>
            <Button variant="secondary" className="w-full">Contacter</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-dark text-white rounded-t-[4rem] px-6 lg:px-12 pt-24 pb-12 overflow-hidden relative mt-12 z-20">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0 100 L 100 0 L 100 100 Z" fill="url(#grad)" />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#CC5833" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#2E4036" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-5 gap-12 mb-20">
        <div className="col-span-2">
          <h4 className="font-display font-bold text-3xl mb-4 tracking-tight">LivrExpress</h4>
          <p className="font-sans text-white/50 max-w-sm mb-8 leading-relaxed">
            Redéfinir les standards de la logistique à Dakar. La vitesse comme science exacte.
          </p>
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
            <span className="font-mono text-xs uppercase tracking-wider text-white/70">Système Opérationnel</span>
          </div>
        </div>
        <div>
          <h5 className="font-sans font-semibold mb-6">Navigation</h5>
          <ul className="space-y-4 font-sans text-sm text-white/60">
            <li><a href="#" className="hover:text-accent transition-colors">Accueil</a></li>
            <li><a href="#features" className="hover:text-accent transition-colors">Fonctionnalités</a></li>
            <li><a href="#philosophy" className="hover:text-accent transition-colors">Philosophie</a></li>
            <li><a href="#pricing" className="hover:text-accent transition-colors">Tarifs</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-sans font-semibold mb-6">Légal</h5>
          <ul className="space-y-4 font-sans text-sm text-white/60">
            <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
            <li><a href="#" className="hover:text-white transition-colors">CGV</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-sans font-semibold mb-6">Réseaux Sociaux</h5>
          <div className="flex items-center gap-4 text-white/60">
            <a href="#" className="hover:text-accent transition-colors hover-lift"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-accent transition-colors hover-lift"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-accent transition-colors hover-lift"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 pt-8 border-t border-white/10 text-center font-mono text-xs text-white/30">
        &copy; {new Date().getFullYear()} LivrExpress. Conçu avec précision.
      </div>
    </footer>
  );
};

const ReservationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark/40 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-background rounded-[2.5rem] p-8 md:p-12 w-full max-w-md shadow-2xl border border-dark/10 transform transition-all">
        <button onClick={onClose} className="absolute top-6 right-6 text-dark/50 hover:text-dark transition-colors">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h3 className="font-display text-3xl font-bold text-dark mb-2">Accès Sécurisé</h3>
        <p className="font-sans text-dark/60 text-sm mb-8">Veuillez vous identifier pour accéder au système et réserver une consultation.</p>
        
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block font-mono text-xs text-dark/70 uppercase tracking-wider mb-2">Identifiant</label>
            <input type="text" className="w-full bg-white border border-dark/10 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-accent transition-colors" placeholder="user@livrexpress.sn" />
          </div>
          <div>
            <label className="block font-mono text-xs text-dark/70 uppercase tracking-wider mb-2">Code d'accès</label>
            <input type="password" className="w-full bg-white border border-dark/10 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-accent transition-colors" placeholder="••••••••" />
          </div>
          <Button variant="primary" className="w-full py-4 mt-4">
            S'authentifier
          </Button>
        </form>
      </div>
    </div>
  );
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="bg-background min-h-screen relative">
      <Navbar onOpenReservation={() => setIsModalOpen(true)} />
      <Hero onOpenReservation={() => setIsModalOpen(true)} />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing />
      <Footer />
      <ReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

export default App;
