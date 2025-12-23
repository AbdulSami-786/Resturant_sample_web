import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import emailjs from '@emailjs/browser';
import './App.css';

// Initialize EmailJS
emailjs.init('YOUR_PUBLIC_KEY');

// =============== COMPONENT IMPORTS ===============
const ThreeScene = React.lazy(() => import("./components/ThreeScene.jsx"));
const ARViewer  = React.lazy(() => import("./components/ARViewer.jsx"));


// =============== NAVBAR ===============
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      updateActiveSection();
    };
    
    const updateActiveSection = () => {
      const sections = ['home', 'about', 'experience', 'menu', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLink(`/#${section}`);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/about', label: 'About', icon: '✨' },
    { path: '/menu', label: 'Menu', icon: '🍽️' },
    { path: '/gallery', label: 'Gallery', icon: '🖼️' },
    { path: '/experience', label: 'Experience', icon: '⭐' },
    { path: '/contact', label: 'Contact', icon: '📞' },
  ];

  const handleNavClick = (path) => {
    setActiveLink(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
    >
      <div className="nav-container">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="nav-logo"
        >
          <Link to="/" className="logo-text">
            Élysée
            <span className="logo-subtitle">Fine Dining</span>
          </Link>
        </motion.div>

        <ul className="nav-menu">
          {navItems.map((item) => (
            <motion.li
              key={item.path}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.path}
                className={`nav-link ${activeLink === item.path ? 'active' : ''}`}
                onClick={() => handleNavClick(item.path)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                <span className="nav-underline"></span>
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="nav-actions">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://wa.me/971501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-reservation"
          >
            <i className="fas fa-calendar-check"></i>
            <span>Reserve</span>
          </motion.a>
          
          <button
            className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <motion.div
        className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <div className="mobile-nav-header">
          <h3>Navigation</h3>
          <button onClick={() => setIsMobileMenuOpen(false)} className="close-menu">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <ul className="mobile-nav-menu">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="mobile-nav-footer">
          <a href="tel:+97141234567" className="mobile-contact">
            <i className="fas fa-phone"></i>
            +971 4 123 4567
          </a>
        </div>
      </motion.div>
      
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </motion.nav>
  );
}

// =============== WHATSAPP BUTTON ===============
function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      setIsVisible(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsVisible(true), 150);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const message = encodeURIComponent(
    `Hello Élysée Fine Dining Team,\n\n` +
    `I'm interested in making a reservation and would like to know about:\n` +
    `• Available time slots\n` +
    `• Special occasion arrangements\n` +
    `• Chef's tasting menu details\n` +
    `• Wine pairing options\n\n` +
    `Looking forward to your response!\n\n` +
    `Best regards,\n[Your Name]`
  );

  return (
    <motion.div
      className="whatsapp-container"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: isVisible ? 1 : 0.8,
        rotate: 0
      }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.a
        href={`https://wa.me/971501234567?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
        onMouseEnter={() => {
          setIsHovered(true);
          setTimeout(() => setShowTooltip(true), 300);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowTooltip(false);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="whatsapp-icon">
          <i className="fab fa-whatsapp"></i>
        </div>
        
        <motion.div
          className="whatsapp-pulse"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <motion.div
          className="whatsapp-ripple"
          animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </motion.a>
      
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="whatsapp-tooltip"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="tooltip-arrow"></div>
            <p>Book your table via WhatsApp</p>
            <small>Instant confirmation • Personal concierge</small>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        className="whatsapp-label"
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
      >
        <span>Reserve Now</span>
      </motion.div>
    </motion.div>
  );
}

// =============== HERO SECTION ===============
function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [currentImage, setCurrentImage] = useState(0);
  const heroImages = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleReservation = () => {
    const message = encodeURIComponent(
      "Hello Élysée Fine Dining,\n\nI would like to make a reservation. Please share available time slots for the upcoming week.\n\nBest regards,\n[Your Name]"
    );
    window.open(`https://wa.me/971501234567?text=${message}`, '_blank');
  };

  return (
    <section id="home" className="hero-section">
      {/* Background Images with Parallax */}
      <div className="hero-background">
        {heroImages.map((img, index) => (
          <motion.div
            key={index}
            className={`hero-bg-image ${index === currentImage ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${img})`,
              y: index === 0 ? y1 : y2,
              opacity: index === currentImage ? 1 : 0,
            }}
          />
        ))}
        
        <div className="hero-gradient">
          <div className="gradient-layer-1"></div>
          <div className="gradient-layer-2"></div>
          <div className="gradient-layer-3"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="hero-floating-elements">
        <motion.div
          className="floating-element gold-1"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="floating-element gold-2"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="floating-element gold-3"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Main Content */}
      <div className="hero-content">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="hero-tag">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ duration: 1, delay: 0.8 }}
              className="tag-line"
            />
            <span className="tag-text">2 Michelin Stars</span>
          </div>
          
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <span className="title-line">Élysée</span>
            <span className="title-line">
              <span className="gold-text">Fine</span> Dining
            </span>
          </motion.h1>
          
          <motion.div
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="lead">Where Culinary Art Meets Architectural Grandeur</p>
            <p className="subtitle">Dubai's Most Exclusive Dining Experience</p>
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.button
              className="btn btn-primary btn-large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReservation}
            >
              <i className="fas fa-crown"></i>
              Reserve Your Table
            </motion.button>
            
            <motion.button
              className="btn btn-secondary btn-large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}
            >
              <i className="fas fa-play-circle"></i>
              View Experience
            </motion.button>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">International Awards</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">360°</div>
              <div className="stat-label">VR Menu Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24</div>
              <div className="stat-label">Seats Only</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
      >
        <motion.div
          className="scroll-line"
          animate={{ height: [0, 40, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="scroll-text">Explore</span>
      </motion.div>

      {/* Social Links */}
      <div className="hero-social">
        <a href="#" className="social-link">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="social-link">
          <i className="fab fa-tripadvisor"></i>
        </a>
        <a href="#" className="social-link">
          <i className="fas fa-star"></i>
        </a>
      </div>
    </section>
  );
}

// =============== ABOUT SECTION ===============
function AboutSection() {
  const [activeTimeline, setActiveTimeline] = useState(0);

  const timelineData = [
    {
      year: '2018',
      title: 'The Vision',
      description: 'Conceptualization of Élysée begins with Chef Alexandre Moreau and restaurateur Sophia Al-Farsi',
      details: 'A shared dream to create Dubai\'s most exclusive culinary destination'
    },
    {
      year: '2019',
      title: 'Opening Night',
      description: 'Élysée opens with a 12-course tasting menu for 24 guests',
      details: 'Featured in World\'s 50 Best Discovery list within 3 months'
    },
    {
      year: '2020',
      title: 'First Michelin Star',
      description: 'Awarded our first Michelin star during the Michelin Guide Dubai launch',
      details: 'Recognized for innovative French-Middle Eastern fusion cuisine'
    },
    {
      year: '2022',
      title: 'Second Michelin Star',
      description: 'Earned second Michelin star for culinary excellence',
      details: 'One of only three restaurants in Dubai with two Michelin stars'
    },
    {
      year: '2023',
      title: 'World Recognition',
      description: 'Ranked #47 in World\'s 50 Best Restaurants',
      details: 'Introduced immersive VR dining experiences'
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <motion.div
            className="header-decoration"
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our <span className="gold-text">Story</span>
          </motion.h2>
          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A journey of culinary excellence that redefined fine dining in the Middle East
          </motion.p>
        </div>

        <div className="about-content">
          <div className="about-grid">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3>The Élysée Philosophy</h3>
              <p>
                At Élysée, we believe dining should be an immersive journey that engages all senses. 
                Our philosophy revolves around three core principles: <strong>Innovation</strong>, 
                <strong> Authenticity</strong>, and <strong>Sustainability</strong>.
              </p>
              
              <div className="philosophy-points">
                <div className="point">
                  <div className="point-icon">
                    <i className="fas fa-seedling"></i>
                  </div>
                  <div className="point-content">
                    <h4>Sustainable Sourcing</h4>
                    <p>All ingredients are sourced from ethical suppliers with zero food waste policy</p>
                  </div>
                </div>
                
                <div className="point">
                  <div className="point-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="point-content">
                    <h4>Culinary Innovation</h4>
                    <p>Traditional French techniques meet molecular gastronomy and Middle Eastern flavors</p>
                  </div>
                </div>
                
                <div className="point">
                  <div className="point-icon">
                    <i className="fas fa-heart"></i>
                  </div>
                  <div className="point-content">
                    <h4>Personalized Service</h4>
                    <p>Each guest receives bespoke attention from our team of culinary artists</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="about-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="image-frame">
                <img 
                  src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                  alt="Chef Alexandre Moreau"
                  className="chef-image"
                />
                <div className="frame-decoration"></div>
                <div className="frame-decoration corner-1"></div>
                <div className="frame-decoration corner-2"></div>
                <div className="frame-decoration corner-3"></div>
                <div className="frame-decoration corner-4"></div>
              </div>
              
              <div className="image-caption">
                <h4>Chef Alexandre Moreau</h4>
                <p>Executive Chef & Culinary Director</p>
              </div>
            </motion.div>
          </div>

          {/* Timeline Section */}
          <motion.div
            className="timeline-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h3 className="timeline-title">Our Journey</h3>
            
            <div className="timeline-container">
              <div className="timeline-track">
                <div className="timeline-progress" style={{ width: `${(activeTimeline + 1) * 20}%` }}></div>
                
                {timelineData.map((item, index) => (
                  <motion.div
                    key={item.year}
                    className={`timeline-point ${index <= activeTimeline ? 'active' : ''}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setActiveTimeline(index)}
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="point-year">{item.year}</div>
                    
                    <AnimatePresence>
                      {index === activeTimeline && (
                        <motion.div
                          className="timeline-tooltip"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                        >
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                          <small>{item.details}</small>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="timeline-content">
              <motion.div
                key={activeTimeline}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="timeline-details"
              >
                <h3>{timelineData[activeTimeline].title}</h3>
                <p className="lead">{timelineData[activeTimeline].description}</p>
                <p>{timelineData[activeTimeline].details}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// =============== EXPERIENCE SECTION ===============
function ExperienceSection() {
  const experiences = [
    {
      title: 'The Tasting Room',
      description: 'Intimate 12-seat chef\'s table with direct kitchen view',
      features: ['Live cooking demonstrations', 'Chef interactions', 'Customized menus'],
      icon: '👨‍🍳',
      color: 'var(--color-gold)'
    },
    {
      title: 'Wine Cellar Dining',
      description: 'Private dining in our temperature-controlled wine cellar',
      features: ['5,000-bottle collection', 'Sommelier pairing', 'Rare vintages'],
      icon: '🍷',
      color: 'var(--color-bronze)'
    },
    {
      title: 'Sky Terrace',
      description: 'Outdoor dining with panoramic Dubai Marina views',
      features: ['Al fresco seating', 'Fire pit lounge', 'Starlight dining'],
      icon: '🌃',
      color: 'var(--color-gold-light)'
    },
    {
      title: 'VR Culinary Journey',
      description: 'Immersive virtual reality dining experience',
      features: ['360° dish exploration', 'Ingredient origins', 'Interactive storytelling'],
      icon: '🕶️',
      color: 'var(--color-platinum)'
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <div className="experience-bg">
        <div className="bg-pattern"></div>
        <div className="bg-overlay"></div>
      </div>
      
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            The <span className="gold-text">Élysée</span> Experience
          </motion.h2>
          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Multi-sensory dining journeys that transcend traditional gastronomy
          </motion.p>
        </div>

        <div className="experiences-grid">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              className="experience-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="card-header">
                <div className="card-icon" style={{ color: exp.color }}>
                  {exp.icon}
                </div>
                <h3>{exp.title}</h3>
              </div>
              
              <p className="card-description">{exp.description}</p>
              
              <ul className="card-features">
                {exp.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + i * 0.1 }}
                  >
                    <i className="fas fa-check-circle"></i>
                    {feature}
                  </motion.li>
                ))}
              </ul>
              
              <motion.button
                className="btn btn-outline btn-small"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="experience-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="cta-content">
            <h3>Book Your Personalized Experience</h3>
            <p>Our concierge team will create a bespoke journey tailored to your preferences</p>
          </div>
          
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-concierge-bell"></i>
            Contact Concierge
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// =============== VR MENU VIEWER ===============
function VRMenuViewer({ dish, onClose }) {
  const [viewMode, setViewMode] = useState('360'); // 360, ar, xray
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [activeLayer, setActiveLayer] = useState('presentation');
  const [showNutrition, setShowNutrition] = useState(false);
  const [showPairing, setShowPairing] = useState(false);
  const containerRef = useRef(null);

  const layers = {
    presentation: 'Final Presentation',
    ingredients: 'Ingredient Layers',
    preparation: 'Preparation Steps',
    plating: 'Plating Artistry'
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    
    setRotation({
      x: y * 30,
      y: x * 30
    });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(3, prev * delta)));
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <motion.div
      className="vr-viewer-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="vr-viewer-container"
        ref={containerRef}
        initial={{ scale: 0.8, rotateY: -30 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        style={{
          perspective: '1000px',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`
        }}
      >
        {/* VR Controls */}
        <div className="vr-controls">
          <div className="control-group">
            <button className="control-btn" onClick={() => setViewMode('360')}>
              <i className="fas fa-rotate"></i>
              <span>360° View</span>
            </button>
            <button className="control-btn" onClick={() => setViewMode('ar')}>
              <i className="fas fa-vr-cardboard"></i>
              <span>AR Mode</span>
            </button>
            <button className="control-btn" onClick={() => setViewMode('xray')}>
              <i className="fas fa-layer-group"></i>
              <span>X-Ray</span>
            </button>
          </div>
          
          <div className="control-group">
            <button className="control-btn" onClick={() => setZoom(1)}>
              <i className="fas fa-search"></i>
              <span>Reset Zoom</span>
            </button>
            <button className="control-btn" onClick={handleFullscreen}>
              <i className="fas fa-expand"></i>
              <span>Fullscreen</span>
            </button>
            <button className="control-btn" onClick={() => setRotation({ x: 0, y: 0 })}>
              <i className="fas fa-redo"></i>
              <span>Reset View</span>
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button className="vr-close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        {/* VR Content */}
        <div className="vr-content">
          {/* Dish Visualization */}
          <div className="dish-visualization">
            <Suspense fallback={<div className="vr-loader">Loading VR Experience...</div>}>
              {viewMode === '360' && (
                <div className="vr-360-view">
                  <div className="vr-sphere">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="vr-image-layer"
                        style={{
                          transform: `rotateY(${i * 45}deg) translateZ(400px)`,
                          backgroundImage: `url(https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&w=800&q=80)`
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {viewMode === 'xray' && (
                <div className="vr-xray-view">
                  <div className="xray-layers">
                    {Object.entries(layers).map(([key, label]) => (
                      <motion.div
                        key={key}
                        className={`xray-layer ${activeLayer === key ? 'active' : ''}`}
                        onClick={() => setActiveLayer(key)}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="layer-label">{label}</div>
                        <div className="layer-content">
                          {key === 'ingredients' && (
                            <div className="ingredients-grid">
                              {['Wagyu Beef', 'Black Truffle', 'Gold Leaf', 'Saffron'].map((ing) => (
                                <div key={ing} className="ingredient-item">
                                  <div className="ingredient-icon">🥩</div>
                                  <span>{ing}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </Suspense>
          </div>

          {/* Dish Information */}
          <div className="dish-information">
            <div className="info-header">
              <h2 className="dish-name">{dish.name}</h2>
              <div className="dish-meta">
                <span className="meta-item">
                  <i className="fas fa-clock"></i>
                  Prep: {dish.prepTime}
                </span>
                <span className="meta-item">
                  <i className="fas fa-fire"></i>
                  Calories: {dish.calories}
                </span>
                <span className="meta-item">
                  <i className="fas fa-leaf"></i>
                  {dish.category}
                </span>
              </div>
            </div>

            <div className="info-tabs">
              <button 
                className={`info-tab ${showNutrition ? 'active' : ''}`}
                onClick={() => setShowNutrition(!showNutrition)}
              >
                <i className="fas fa-apple-alt"></i>
                Nutrition
              </button>
              <button 
                className={`info-tab ${showPairing ? 'active' : ''}`}
                onClick={() => setShowPairing(!showPairing)}
              >
                <i className="fas fa-wine-glass-alt"></i>
                Pairing
              </button>
            </div>

            <AnimatePresence>
              {showNutrition && (
                <motion.div
                  className="info-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="nutrition-grid">
                    <div className="nutrition-item">
                      <div className="nutrition-value">850</div>
                      <div className="nutrition-label">Calories</div>
                    </div>
                    <div className="nutrition-item">
                      <div className="nutrition-value">45g</div>
                      <div className="nutrition-label">Protein</div>
                    </div>
                    <div className="nutrition-item">
                      <div className="nutrition-value">32g</div>
                      <div className="nutrition-label">Carbs</div>
                    </div>
                    <div className="nutrition-item">
                      <div className="nutrition-value">65g</div>
                      <div className="nutrition-label">Fat</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="info-description">
              <p>{dish.description}</p>
              
              <div className="ingredient-tags">
                {dish.ingredients.map((ing, i) => (
                  <span key={i} className="ingredient-tag">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-actions">
              <button className="btn btn-primary">
                <i className="fas fa-shopping-cart"></i>
                Add to Tasting Menu
              </button>
              <button className="btn btn-secondary">
                <i className="fas fa-share-alt"></i>
                Share Experience
              </button>
            </div>
          </div>
        </div>

        {/* VR Hotspots */}
        <div className="vr-hotspots">
          {dish.hotspots?.map((spot, i) => (
            <motion.div
              key={i}
              className="vr-hotspot"
              style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
              whileHover={{ scale: 1.2 }}
            >
              <div className="hotspot-marker"></div>
              <div className="hotspot-tooltip">
                <h4>{spot.title}</h4>
                <p>{spot.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* VR Stats */}
        <div className="vr-stats">
          <div className="stat">
            <div className="stat-value">360°</div>
            <div className="stat-label">View</div>
          </div>
          <div className="stat">
            <div className="stat-value">4K</div>
            <div className="stat-label">Resolution</div>
          </div>
          <div className="stat">
            <div className="stat-value">AR</div>
            <div className="stat-label">Ready</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// =============== MENU SECTION ===============
function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('signature');
  const [selectedDish, setSelectedDish] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');

  const categories = [
    { id: 'signature', name: 'Signature Dishes', icon: '⭐' },
    { id: 'tasting', name: 'Tasting Menus', icon: '🎭' },
    { id: 'starters', name: 'Starters', icon: '🥗' },
    { id: 'mains', name: 'Main Courses', icon: '🥩' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'pairing', name: 'Wine Pairing', icon: '🍷' },
  ];

  const signatureDishes = [
    {
      id: 1,
      name: 'A5 Wagyu Tenderloin',
      description: 'Miyazaki A5 grade wagyu, charcoal-grilled with smoked potato purée, black truffle jus, and seasonal micro-herbs',
      price: 'AED 850',
      prepTime: '45 min',
      calories: '850 kcal',
      category: 'Main Course',
      ingredients: ['A5 Wagyu', 'Black Truffle', 'Potato Purée', 'Seasonal Herbs'],
      hotspots: [
        { x: 30, y: 40, title: 'Wagyu Marbling', description: 'Premium A5 grade with perfect fat distribution' },
        { x: 60, y: 70, title: 'Charcoal Grill', description: 'Traditional binchotan charcoal cooking' }
      ],
      vrEnabled: true,
      featured: true
    },
    {
      id: 2,
      name: 'Oscietra Caviar Symphony',
      description: 'Royal Oscietra caviar served with cauliflower crémeux, gold leaf, and brioche toast points',
      price: 'AED 650',
      prepTime: '30 min',
      calories: '420 kcal',
      category: 'Starter',
      ingredients: ['Oscietra Caviar', 'Cauliflower', 'Gold Leaf', 'Brioche'],
      vrEnabled: true,
      featured: true
    },
    {
      id: 3,
      name: 'Chocolate Textures',
      description: '72% Venezuelan dark chocolate, salted caramel gel, gold feuilletine, and tonka bean ice cream',
      price: 'AED 280',
      prepTime: '25 min',
      calories: '320 kcal',
      category: 'Dessert',
      ingredients: ['Dark Chocolate', 'Salted Caramel', 'Gold Feuilletine', 'Tonka Bean'],
      vrEnabled: true,
      featured: false
    }
  ];

  const handleVRView = (dish) => {
    setSelectedDish(dish);
  };

  return (
    <section id="menu" className="menu-section">
      <div className="menu-background">
        <div className="bg-texture"></div>
        <div className="bg-pattern"></div>
      </div>
      
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our <span className="gold-text">Culinary</span> Art
          </motion.h2>
          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience our Michelin-starred creations through immersive VR technology
          </motion.p>
        </div>

        {/* Menu Navigation */}
        <motion.div
          className="menu-navigation"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="nav-search">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="category-tabs">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="tab-icon">{cat.icon}</span>
                <span className="tab-label">{cat.name}</span>
              </motion.button>
            ))}
          </div>
          
          <div className="price-filter">
            <select 
              value={priceFilter} 
              onChange={(e) => setPriceFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Prices</option>
              <option value="0-500">Under AED 500</option>
              <option value="500-1000">AED 500 - 1000</option>
              <option value="1000+">Over AED 1000</option>
            </select>
          </div>
        </motion.div>

        {/* VR Menu Preview */}
        <motion.div
          className="vr-preview-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="vr-preview-header">
            <h3>
              <i className="fas fa-vr-cardboard"></i>
              Immersive VR Experience
            </h3>
            <p>Explore every dish in 360° virtual reality</p>
          </div>
          
          <div className="vr-dishes-grid">
            {signatureDishes.map((dish) => (
              <motion.div
                key={dish.id}
                className="vr-dish-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <div className="vr-dish-header">
                  {dish.featured && (
                    <span className="featured-badge">
                      <i className="fas fa-crown"></i>
                      Signature
                    </span>
                  )}
                  {dish.vrEnabled && (
                    <span className="vr-badge">
                      <i className="fas fa-vr-cardboard"></i>
                      VR Ready
                    </span>
                  )}
                </div>
                
                <div className="vr-dish-image">
                  <img
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt={dish.name}
                  />
                  <div className="vr-overlay">
                    <button 
                      className="vr-view-btn"
                      onClick={() => handleVRView(dish)}
                    >
                      <i className="fas fa-expand"></i>
                      View in VR
                    </button>
                  </div>
                </div>
                
                <div className="vr-dish-content">
                  <h4>{dish.name}</h4>
                  <p className="dish-description">{dish.description}</p>
                  
                  <div className="dish-meta">
                    <span className="meta-item">
                      <i className="fas fa-clock"></i>
                      {dish.prepTime}
                    </span>
                    <span className="meta-item">
                      <i className="fas fa-fire"></i>
                      {dish.calories}
                    </span>
                  </div>
                  
                  <div className="dish-footer">
                    <div className="dish-price">{dish.price}</div>
                    <motion.button
                      className="btn btn-primary btn-small"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleVRView(dish)}
                    >
                      <i className="fas fa-eye"></i>
                      Explore
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tasting Menus */}
        <motion.div
          className="tasting-menus"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h3 className="section-subtitle">Tasting Menu Experiences</h3>
          
          <div className="tasting-cards">
            <motion.div
              className="tasting-card"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-header">
                <h4>The Élysée Journey</h4>
                <div className="card-price">AED 2,500</div>
              </div>
              <ul className="card-features">
                <li>12-course tasting menu</li>
                <li>Wine pairing with rare vintages</li>
                <li>Chef's table experience</li>
                <li>VR menu companion</li>
                <li>Personalized menu souvenir</li>
              </ul>
              <button className="btn btn-outline btn-full">
                Book Experience
              </button>
            </motion.div>
            
            <motion.div
              className="tasting-card premium"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-header">
                <h4>Platinum Experience</h4>
                <div className="card-price">AED 5,000</div>
              </div>
              <div className="premium-badge">
                <i className="fas fa-gem"></i>
                Exclusive
              </div>
              <ul className="card-features">
                <li>16-course bespoke menu</li>
                <li>Rare wine and sake pairing</li>
                <li>Private dining room</li>
                <li>Extended VR experience</li>
                <li>Meet the chef and kitchen tour</li>
                <li>Luxury gift package</li>
              </ul>
              <button className="btn btn-primary btn-full">
                <i className="fas fa-crown"></i>
                Book Premium
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* VR Viewer Modal */}
      <AnimatePresence>
        {selectedDish && (
          <VRMenuViewer
            dish={selectedDish}
            onClose={() => setSelectedDish(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// =============== GALLERY SECTION ===============
function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryFilters = [
    { id: 'all', label: 'All' },
    { id: 'food', label: 'Food' },
    { id: 'interior', label: 'Interior' },
    { id: 'experience', label: 'Experience' },
    { id: 'team', label: 'Team' },
  ];

  const galleryImages = [
    {
      id: 1,
      category: 'food',
      src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Plating Artistry',
      description: 'Chef\'s meticulous attention to detail'
    },
    {
      id: 2,
      category: 'interior',
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Main Dining Room',
      description: 'Elegant contemporary design'
    },
    {
      id: 3,
      category: 'experience',
      src: 'https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Wine Tasting',
      description: 'Sommelier-led pairing sessions'
    },
    {
      id: 4,
      category: 'team',
      src: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Culinary Team',
      description: 'Our Michelin-starred chefs'
    },
    {
      id: 5,
      category: 'food',
      src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Wagyu Presentation',
      description: 'Premium A5 grade wagyu'
    },
    {
      id: 6,
      category: 'interior',
      src: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Private Dining',
      description: 'Exclusive cellar experience'
    },
  ];

  const filteredImages = galleryImages.filter(
    img => activeFilter === 'all' || img.category === activeFilter
  );

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Visual <span className="gold-text">Journey</span>
          </motion.h2>
          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Behind the scenes of Dubai's most photographed restaurant
          </motion.p>
        </div>

        <motion.div
          className="gallery-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {galleryFilters.map((filter) => (
            <button
              key={filter.id}
              className={`gallery-filter ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedImage(image)}
              whileHover={{ scale: 1.05 }}
            >
              <img src={image.src} alt={image.title} />
              <div className="gallery-overlay">
                <div className="overlay-content">
                  <h4>{image.title}</h4>
                  <p>{image.description}</p>
                  <button className="view-btn">
                    <i className="fas fa-expand"></i>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="gallery-instagram"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="instagram-header">
            <i className="fab fa-instagram"></i>
            <h3>Follow Our Journey</h3>
            <p>@elyseefinedining</p>
          </div>
          <a href="#" className="btn btn-outline">
            View Instagram
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
                <i className="fas fa-times"></i>
              </button>
              <img src={selectedImage.src} alt={selectedImage.title} />
              <div className="lightbox-info">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// =============== CONTACT SECTION ===============
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '2',
    occasion: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await emailjs.send(
        'service_id',
        'template_id',
        {
          to_name: 'Élysée Concierge',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          date: formData.date,
          guests: formData.guests,
          occasion: formData.occasion,
          message: formData.message
        },
        'YOUR_PUBLIC_KEY'
      );
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        guests: '2',
        occasion: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-background">
        <div className="bg-map"></div>
        <div className="bg-overlay"></div>
      </div>
      
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Get In <span className="gold-text">Touch</span>
          </motion.h2>
          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our concierge team is ready to create your perfect dining experience
          </motion.p>
        </div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="info-content">
                <h4>Location</h4>
                <p>Dubai Marina</p>
                <p>Dubai, United Arab Emirates</p>
                <a href="#" className="info-link">
                  <i className="fas fa-directions"></i>
                  Get Directions
                </a>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="info-content">
                <h4>Contact</h4>
                <p>+971 4 123 4567</p>
                <p>reservations@elyseefinedining.com</p>
                <a href="https://wa.me/971501234567" className="info-link whatsapp">
                  <i className="fab fa-whatsapp"></i>
                  WhatsApp Direct
                </a>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="info-content">
                <h4>Hours</h4>
                <p>Monday - Thursday: 6PM - 11PM</p>
                <p>Friday - Saturday: 6PM - 12AM</p>
                <p>Sunday: 6PM - 10:30PM</p>
                <small>Brunch: Saturday 12PM - 4PM</small>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="form-header">
              <h3>Make a Reservation</h3>
              <p>Or contact us via WhatsApp for instant confirmation</p>
            </div>
            
            <form onSubmit={handleSubmit} className="reservation-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
                <div className="form-group">
                  <label>Preferred Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Number of Guests *</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    required
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Occasion</label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({...formData, occasion: e.target.value})}
                  >
                    <option value="">Select an occasion</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="birthday">Birthday</option>
                    <option value="business">Business Dinner</option>
                    <option value="celebration">Celebration</option>
                    <option value="proposal">Proposal</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Special Requests</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Dietary restrictions, allergies, or special celebrations..."
                  rows="4"
                />
              </div>
              
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    className="form-success"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <i className="fas fa-check-circle"></i>
                    Your reservation request has been sent. We'll contact you shortly.
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    className="form-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <i className="fas fa-exclamation-circle"></i>
                    There was an error. Please try WhatsApp for immediate assistance.
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Send Request
                    </>
                  )}
                </button>
                
                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-large"
                >
                  <i className="fab fa-whatsapp"></i>
                  WhatsApp Direct
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// =============== FOOTER ===============
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3 className="footer-logo">Élysée</h3>
              <p className="footer-description">
                Dubai's premier fine dining destination, where culinary artistry 
                meets architectural grandeur. A two-Michelin-starred experience 
                redefining luxury gastronomy.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-tripadvisor"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
            
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="/menu">Menu</a></li>
                <li><a href="/experience">Experiences</a></li>
                <li><a href="/gallery">Gallery</a></li>
                <li><a href="/about">Our Story</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/reservation">Reservations</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>Experiences</h4>
              <ul className="footer-links">
                <li><a href="#">Tasting Menus</a></li>
                <li><a href="#">Wine Pairing</a></li>
                <li><a href="#">Chef's Table</a></li>
                <li><a href="#">Private Dining</a></li>
                <li><a href="#">VR Dining</a></li>
                <li><a href="#">Corporate Events</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>Contact Info</h4>
              <ul className="footer-contact">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Dubai Marina, Dubai, UAE</span>
                </li>
                <li>
                  <i className="fas fa-phone"></i>
                  <span>+971 4 123 4567</span>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <span>reservations@elyseefinedining.com</span>
                </li>
                <li>
                  <i className="fab fa-whatsapp"></i>
                  <span>+971 50 123 4567 (WhatsApp)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="bottom-content">
            <p>&copy; {currentYear} Élysée Fine Dining. All rights reserved.</p>
            <div className="bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-credits">
        <p>
          Crafted with <i className="fas fa-heart"></i> in Dubai | 
          Michelin Guide 2023 | World's 50 Best 2023
        </p>
      </div>
    </footer>
  );
}

// =============== MAIN APP ===============
function App() {
  const location = useLocation();

  useEffect(() => {
    // Smooth scroll handling
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    // Page load animation
    const timer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Navbar />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <>
              <Hero />
              <AboutSection />
              <ExperienceSection />
              <MenuSection />
              <GallerySection />
              <ContactSection />
            </>
          } />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/menu" element={<MenuSection />} />
          <Route path="/gallery" element={<GallerySection />} />
          <Route path="/experience" element={<ExperienceSection />} />
          <Route path="/contact" element={<ContactSection />} />
        </Routes>
      </AnimatePresence>
      
      <WhatsAppButton />
      <Footer />
    </>
  );
}

export default App;