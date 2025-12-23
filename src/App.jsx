import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';

// =============== COMPONENTS ===============
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Reservation', path: '/reservation' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
    >
      <div className="nav-container">
        <Link to="/" className="logo">Élysée</Link>
        
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.path} 
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.path} 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}

function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      setIsVisible(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsVisible(true), 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const whatsappMessage = encodeURIComponent(
    "Hello, I would like to reserve a table. Please share availability."
  );

  return (
    <motion.a
      href={`https://wa.me/971501234567?text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      initial={{ scale: 0 }}
      animate={{ 
        scale: isVisible ? 1 : 0.9,
        opacity: isVisible ? 1 : 0.7
      }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <i className="fab fa-whatsapp"></i>
    </motion.a>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Élysée</h3>
          <p>
            A Michelin-starred dining experience where culinary artistry 
            meets French elegance in the heart of Dubai.
          </p>
          <div className="social-links">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-tripadvisor"></i></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <ul className="footer-links">
            <li>
              <a href="#">
                <i className="fas fa-map-marker-alt"></i>
                Dubai Marina, Dubai, UAE
              </a>
            </li>
            <li>
              <a href="tel:+97141234567">
                <i className="fas fa-phone"></i>
                +971 4 123 4567
              </a>
            </li>
            <li>
              <a href="mailto:reservations@elyseefinedining.com">
                <i className="fas fa-envelope"></i>
                reservations@elyseefinedining.com
              </a>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Hours</h3>
          <ul className="footer-links">
            <li>Monday - Thursday: 6PM - 11PM</li>
            <li>Friday - Saturday: 6PM - 12AM</li>
            <li>Sunday: 6PM - 10:30PM</li>
            <li><br /></li>
            <li>Brunch: Saturday 12PM - 4PM</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Élysée Fine Dining. All rights reserved.</p>
        <p>Designed with excellence in Dubai</p>
      </div>
    </footer>
  );
}

// =============== HERO ===============
function Hero() {
  const whatsappMessage = encodeURIComponent(
    "Hello, I would like to reserve a table. Please share availability."
  );

  return (
    <section className="hero">
      <div className="hero-bg" />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="hero-content"
      >
        <h1 className="hero-title">
          Élysée
          <span>Fine Dining</span>
        </h1>
        <p className="hero-subtitle">
          An elevated culinary journey where French elegance meets 
          avant-garde gastronomy in the heart of Dubai.
        </p>
        <div className="hero-buttons">
          <Link to="/menu" className="btn btn-primary">View Menu</Link>
          <a 
            href={`https://wa.me/971501234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Reserve via WhatsApp
          </a>
        </div>
      </motion.div>
      
      <div className="scroll-indicator">
        <span className="scroll-text">Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

// =============== ABOUT SECTION ===============
function AboutSection() {
  return (
    <section className="about-section fade-in">
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="about-content"
        >
          <h2>Where <span>Artistry</span> Meets <span>Gastronomy</span></h2>
          <p className="about-text">
            Élysée Fine Dining redefines luxury culinary experiences in Dubai. 
            Our Michelin-starred chefs create immersive dining journeys that 
            blend French culinary traditions with avant-garde techniques.
          </p>
          <p className="about-text">
            Each dish tells a story, crafted from the finest seasonal ingredients 
            sourced globally. Our sommelier-curated wine pairing elevates every 
            course to a symphony of flavors.
          </p>
          
          <div className="about-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">⭐</div>
              <div className="highlight-number">2</div>
              <div className="highlight-text">Michelin Stars</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🏆</div>
              <div className="highlight-number">15+</div>
              <div className="highlight-text">International Awards</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">👨‍🍳</div>
              <div className="highlight-number">5</div>
              <div className="highlight-text">World-Class Chefs</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="about-image"
        >
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Élysée Restaurant Interior"
          />
        </motion.div>
      </div>
    </section>
  );
}

// =============== CHEF SECTION ===============
function ChefSection() {
  return (
    <section className="chef-section fade-in">
      <div className="chef-container">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="chef-image"
        >
          <img 
            src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Executive Chef"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="chef-content"
        >
          <h2>Meet Our <span>Executive Chef</span></h2>
          <h3 className="chef-name">Chef Alexandre Moreau</h3>
          <p className="chef-bio">
            With over 20 years of culinary expertise across Michelin-starred 
            restaurants in Paris, Tokyo, and now Dubai, Chef Moreau brings 
            a revolutionary approach to fine dining.
          </p>
          <div className="chef-awards">
            <div className="award">
              <i className="fas fa-star"></i>
              <span>2 Michelin Stars</span>
            </div>
            <div className="award">
              <i className="fas fa-trophy"></i>
              <span>World's 50 Best Restaurants 2023</span>
            </div>
            <div className="award">
              <i className="fas fa-award"></i>
              <span>Gault & Millau Chef of the Year</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =============== MENU PREVIEW ===============
function MenuPreview() {
  const signatureDishes = [
    {
      name: 'A5 Wagyu Tenderloin',
      description: 'Charcoal-grilled with smoked potato purée',
      price: 'AED 520',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Atlantic Turbot',
      description: 'Saffron velouté, caviar beurre blanc',
      price: 'AED 380',
      image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Chocolate Symphony',
      description: '72% dark chocolate, salted caramel',
      price: 'AED 160',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="menu-preview fade-in">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Signature Dishes</h2>
          <p className="section-subtitle">Culinary Masterpieces</p>
        </div>
        
        <div className="dishes-grid">
          {signatureDishes.map((dish, index) => (
            <motion.div
              key={dish.name}
              className="dish-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="dish-image">
                <img src={dish.image} alt={dish.name} />
                <div className="dish-overlay">
                  <span className="dish-price">{dish.price}</span>
                </div>
              </div>
              <div className="dish-content">
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/menu" className="btn btn-secondary">View Full Menu</Link>
        </div>
      </div>
    </section>
  );
}

// =============== VR MENU PREVIEW ===============
function VRMenuPreview() {
  const [currentView, setCurrentView] = useState(0);

  const vrDishes = [
    {
      name: 'A5 Wagyu Tenderloin',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 'AED 520',
      description: 'Interactive 360° view available'
    },
    {
      name: 'Atlantic Turbot',
      image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 'AED 380',
      description: 'VR exploration of fresh catch'
    },
    {
      name: 'Chocolate Symphony',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 'AED 160',
      description: 'Immersive dessert journey'
    }
  ];

  return (
    <section className="vr-menu-preview fade-in">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <i className="fas fa-vr-cardboard vr-icon"></i>
            VR Menu Experience
          </h2>
          <p className="section-subtitle">
            Explore our signature dishes in immersive 360° virtual reality
          </p>
        </div>

        <div className="vr-preview-container">
          <motion.div 
            className="vr-viewer"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src={vrDishes[currentView].image} 
              alt={vrDishes[currentView].name}
            />
            <div className="vr-overlay">
              <div className="vr-badge">
                <i className="fas fa-vr-cardboard"></i>
                VR READY
              </div>
            </div>
            <div className="vr-controls">
              {vrDishes.map((_, index) => (
                <button
                  key={index}
                  className={`vr-control-btn ${currentView === index ? 'active' : ''}`}
                  onClick={() => setCurrentView(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="vr-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="vr-dish-name">{vrDishes[currentView].name}</h3>
            <div className="vr-dish-price">{vrDishes[currentView].price}</div>
            <p className="vr-dish-description">
              {vrDishes[currentView].description}. Experience this dish in full 360° virtual reality.
            </p>
            
            <div className="vr-features">
              <div className="vr-feature">
                <i className="fas fa-rotate"></i>
                <span>360° Rotation</span>
              </div>
              <div className="vr-feature">
                <i className="fas fa-search-plus"></i>
                <span>Zoom In Details</span>
              </div>
              <div className="vr-feature">
                <i className="fas fa-mobile-alt"></i>
                <span>Mobile AR Support</span>
              </div>
              <div className="vr-feature">
                <i className="fas fa-expand"></i>
                <span>Fullscreen Mode</span>
              </div>
            </div>
            
            <Link to="/menu" className="vr-cta-button">
              <i className="fas fa-play-circle"></i>
              Explore Full VR Menu
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// =============== GALLERY ===============
function Gallery() {
  const galleryImages = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <section className="gallery fade-in">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Gallery</h2>
          <p className="section-subtitle">Experience the Ambience</p>
        </div>
        
        <div className="gallery-grid">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={img} alt={`Gallery ${index + 1}`} />
              <div className="gallery-overlay">
                <i className="fas fa-search-plus"></i>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/gallery" className="btn btn-secondary">View Full Gallery</Link>
        </div>
      </div>
    </section>
  );
}

// =============== RESERVATION CTA ===============
function ReservationCTA() {
  const whatsappMessage = encodeURIComponent(
    "Hello, I would like to reserve a table. Please share availability."
  );

  return (
    <section className="reservation-cta fade-in">
      <div className="reservation-content">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="reservation-title"
        >
          Reserve Your <span>Experience</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="reservation-subtitle"
        >
          Secure your table at Dubai's most exclusive dining destination. 
          Limited seating available for an intimate culinary journey.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="reservation-buttons"
        >
          <a 
            href={`https://wa.me/971501234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-cta"
          >
            <i className="fab fa-whatsapp"></i>
            Book via WhatsApp
          </a>
          <Link to="/reservation" className="btn btn-secondary">
            View Reservation Details
          </Link>
        </motion.div>
        
        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          href="tel:+97141234567"
          className="contact-link"
        >
          Or call us directly: +971 4 123 4567
        </motion.a>
      </div>
    </section>
  );
}

// =============== VR MENU VIEWER ===============
function VRMenuViewer({ dish, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    
    setRotation(prev => ({
      x: Math.max(-30, Math.min(30, prev.x + deltaY * 0.5)),
      y: prev.y + deltaX * 0.5
    }));
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const vrDishes = {
    'A5 Wagyu Tenderloin': {
      images: [
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      description: 'Explore our A5 Wagyu from every angle',
      vrTips: ['Drag to rotate', 'Click for details', 'Use fullscreen for immersion']
    },
    'Atlantic Turbot': {
      images: [
        'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1559314809-2b99056a8c4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      description: '360° view of our fresh Atlantic Turbot',
      vrTips: ['Pinch to zoom on mobile', 'Drag to rotate view']
    },
    'Chocolate Symphony': {
      images: [
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      description: 'Interactive chocolate dessert exploration',
      vrTips: ['Hold CTRL for zoom', 'Right-click to reset view']
    }
  };

  const currentDish = vrDishes[dish.name] || vrDishes['A5 Wagyu Tenderloin'];

  return (
    <motion.div 
      className="vr-menu-viewer-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="vr-container"
        ref={containerRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="vr-close-btn" onClick={onClose}>✕</div>
        
        <div className="vr-controls">
          <button className="vr-control-btn" onClick={toggleFullscreen}>
            {isFullscreen ? '⤢' : '⤡'}
          </button>
          <button className="vr-control-btn" onClick={() => setRotation({ x: 0, y: 0 })}>
            ↺
          </button>
        </div>
        
        <div className="vr-content">
          <div className="vr-image-grid">
            {currentDish.images.map((img, index) => (
              <motion.div 
                key={index}
                className="vr-image-item"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  transform: `rotateY(${rotation.y}deg) rotateX(${rotation.x}deg) translateZ(${index * 20}px)`
                }}
              >
                <img src={img} alt={`${dish.name} view ${index + 1}`} />
                
                {index === 0 && (
                  <>
                    <div className="vr-hotspot" style={{ top: '30%', left: '40%' }}>
                      <div className="vr-hotspot-tooltip">
                        <strong>Premium Ingredients</strong>
                        <p>Hand-selected from global sources</p>
                      </div>
                    </div>
                    <div className="vr-hotspot" style={{ top: '60%', left: '70%' }}>
                      <div className="vr-hotspot-tooltip">
                        <strong>Artisanal Preparation</strong>
                        <p>Traditional techniques meet innovation</p>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
          
          <div className="vr-watermark">Élysée</div>
        </div>
        
        <div className="vr-info">
          <h2 className="vr-dish-name">{dish.name}</h2>
          <p className="vr-dish-description">
            {currentDish.description} • {dish.description}
          </p>
          <div className="vr-tips">
            {currentDish.vrTips.map((tip, index) => (
              <span key={index} className="vr-tip">{tip}</span>
            ))}
            <span className="vr-tip">Price: {dish.price}</span>
          </div>
        </div>
        
        {navigator.xr && (
          <button className="vr-ar-button">
            <i className="fas fa-vr-cardboard"></i>
            View in AR
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

// =============== VR MENU ITEM ===============
function VRMenuItem({ item, index }) {
  const [showVR, setShowVR] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <motion.div 
        className="vr-menu-item"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="vr-menu-item-content">
          <h3 className="vr-menu-item-name">
            {item.name}
            <span className="vr-badge">
              <i className="fas fa-vr-cardboard"></i>
              VR VIEW
            </span>
          </h3>
          <p className="vr-menu-item-description">{item.description}</p>
          
          <button className="vr-view-button" onClick={() => setShowVR(true)}>
            <i className="fas fa-eye"></i>
            Explore in 360° VR
          </button>
        </div>
        
        <div className="vr-menu-item-price">{item.price}</div>
        
        <div className="vr-preview">
          <img 
            src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt={item.name}
          />
          <div className="vr-preview-overlay">
            <i className="fas fa-expand-arrows-alt"></i>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showVR && (
          <VRMenuViewer 
            dish={item} 
            onClose={() => setShowVR(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}

// =============== PAGES ===============
function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <AboutSection />
      <ChefSection />
      <MenuPreview />
      <VRMenuPreview />
      <Gallery />
      <ReservationCTA />
    </>
  );
}

function About() {
  return (
    <div className="page about-page">
      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-content">
          <h1 className="page-hero-title">Our <span>Story</span></h1>
          <p className="page-hero-subtitle">A Legacy of Culinary Excellence</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="story-section">
            <h2>The Élysée Journey</h2>
            <p>
              Founded in 2018, Élysée Fine Dining emerged from a shared vision between 
              Chef Alexandre Moreau and restaurateur Sophia Al-Farsi. Their dream was 
              to create a culinary sanctuary where French gastronomy meets Middle Eastern 
              warmth, redefining Dubai's fine dining landscape.
            </p>
            <p>
              From our humble beginnings in a renovated villa, we've grown to become 
              a two-Michelin-starred destination, recognized by the World's 50 Best 
              Restaurants. Our commitment to sustainability and ethical sourcing has 
              set new standards in the region.
            </p>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2018</div>
              <div className="timeline-content">
                <h3>Grand Opening</h3>
                <p>Élysée opens its doors in Dubai Marina with 12 tables</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h3>First Michelin Star</h3>
                <p>Awarded our first Michelin star during the pandemic</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2022</div>
              <div className="timeline-content">
                <h3>Second Michelin Star</h3>
                <p>Recognized with a second Michelin star</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h3>World's 50 Best</h3>
                <p>Ranked #47 in World's 50 Best Restaurants</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Menu() {
  const [activeCategory, setActiveCategory] = useState('tasting');

  const menuCategories = [
    { id: 'tasting', name: 'Tasting Menu', icon: '✨' },
    { id: 'starters', name: 'Starters', icon: '🥗' },
    { id: 'mains', name: 'Main Courses', icon: '🥩' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'wine', name: 'Wine Pairing', icon: '🍷' },
  ];

  const menuItems = {
    tasting: [
      { 
        name: 'Omakase Journey', 
        description: 'Chef\'s selection of 12 seasonal courses with VR exploration of ingredients',
        price: 'AED 850',
        vrEnabled: true
      },
      { 
        name: 'Signature Tasting', 
        description: '9-course menu highlighting our most celebrated dishes in 360° view',
        price: 'AED 650',
        vrEnabled: true
      },
      { 
        name: 'Vegetarian Experience', 
        description: '7-course plant-based culinary journey',
        price: 'AED 550',
        vrEnabled: true
      },
    ],
    starters: [
      { 
        name: 'Oscietra Caviar', 
        description: 'With cauliflower crémeux and gold leaf - Explore the caviar pearls in VR',
        price: 'AED 320',
        vrEnabled: true
      },
      { 
        name: 'Bluefin Toro Tartare', 
        description: 'Wasabi emulsion, soy gel, crispy nori',
        price: 'AED 280',
        vrEnabled: false
      },
      { 
        name: 'Truffle Consommé', 
        description: 'Black truffle, morels, hen egg yolk',
        price: 'AED 240',
        vrEnabled: false
      },
    ],
    mains: [
      { 
        name: 'A5 Wagyu Tenderloin', 
        description: 'Charcoal-grilled, smoked potato purée, seasonal vegetables - Full VR exploration available',
        price: 'AED 520',
        vrEnabled: true
      },
      { 
        name: 'Atlantic Turbot', 
        description: 'Saffron velouté, caviar beurre blanc, samphire - 360° view of fresh catch',
        price: 'AED 380',
        vrEnabled: true
      },
      { 
        name: 'Herb-Crusted Rack of Lamb', 
        description: 'Rosemary jus, truffled potato mille-feuille',
        price: 'AED 420',
        vrEnabled: false
      },
    ],
    desserts: [
      { 
        name: 'Chocolate Symphony', 
        description: '72% dark chocolate, salted caramel, gold feuilletine - Interactive dessert journey',
        price: 'AED 160',
        vrEnabled: true
      },
      { 
        name: 'Yuzu Delight', 
        description: 'White chocolate, matcha, sesame tuile',
        price: 'AED 140',
        vrEnabled: false
      },
      { 
        name: 'Cheese Selection', 
        description: 'Artisanal cheeses with homemade chutneys',
        price: 'AED 180',
        vrEnabled: false
      },
    ],
    wine: [
      { 
        name: 'Premium Pairing', 
        description: 'Selection of 7 wines including Champagne Krug',
        price: 'AED 650',
        vrEnabled: false
      },
      { 
        name: 'Classic Pairing', 
        description: '5 wines from our sommelier\'s selection',
        price: 'AED 450',
        vrEnabled: false
      },
      { 
        name: 'Non-Alcoholic Journey', 
        description: 'Artisanal mocktails and botanical infusions',
        price: 'AED 280',
        vrEnabled: false
      },
    ],
  };

  return (
    <div className="menu-page">
      <div className="menu-hero">
        <div className="menu-hero-bg" />
        <div className="vr-hero-overlay" />
        <div className="menu-hero-content">
          <h1 className="menu-hero-title">VR <span>Menu</span></h1>
          <p className="menu-hero-subtitle">Immersive Culinary Experience</p>
          <p className="vr-tagline">
            <i className="fas fa-vr-cardboard"></i>
            Explore dishes in 360° virtual reality
          </p>
          <a href="#vr-dishes" className="vr-demo-button">
            <i className="fas fa-play-circle"></i>
            Try VR Experience
          </a>
        </div>
      </div>

      <div className="menu-container">
        <div className="vr-header" id="vr-dishes">
          <h2 className="vr-header-title">
            <i className="fas fa-vr-cardboard"></i>
            Interactive VR Dishes
          </h2>
          <p className="vr-header-description">
            Click the VR button on any dish to explore it in 360° view. 
            Rotate, zoom, and discover every detail of our culinary creations.
          </p>
          
          <div className="vr-stats">
            <div className="vr-stat">
              <div className="vr-stat-number">12+</div>
              <div className="vr-stat-label">VR Dishes</div>
            </div>
            <div className="vr-stat">
              <div className="vr-stat-number">360°</div>
              <div className="vr-stat-label">Full Rotation</div>
            </div>
            <div className="vr-stat">
              <div className="vr-stat-number">4K</div>
              <div className="vr-stat-label">High Resolution</div>
            </div>
            <div className="vr-stat">
              <div className="vr-stat-number">AR</div>
              <div className="vr-stat-label">Mobile Ready</div>
            </div>
          </div>
        </div>

        <div className="menu-categories">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <div className="menu-items">
          {menuItems[activeCategory].map((item, index) => (
            <VRMenuItem 
              key={item.name} 
              item={item} 
              index={index} 
            />
          ))}
        </div>

        <div className="menu-note">
          <p>
            * VR dishes marked with <span className="vr-badge-inline">VR VIEW</span> offer interactive 360° exploration.<br />
            ** Requires WebGL support. Works best on Chrome/Firefox/Safari latest versions.
          </p>
        </div>
      </div>
    </div>
  );
}

function GalleryPage() {
  const galleryImages = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <div className="gallery-page">
      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-content">
          <h1 className="page-hero-title">Gallery</h1>
          <p className="page-hero-subtitle">Visual Journey Through Élysée</p>
        </div>
      </div>

      <div className="gallery-container">
        <div className="masonry-grid">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              className="masonry-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={img} alt={`Gallery ${index + 1}`} />
              <div className="masonry-overlay">
                <i className="fas fa-search-plus"></i>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const whatsappMessage = encodeURIComponent(
    "Hello, I have an inquiry about Élysée Fine Dining."
  );

  return (
    <div className="contact-page">
      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-content">
          <h1 className="page-hero-title">Contact <span>Us</span></h1>
          <p className="page-hero-subtitle">Get in Touch</p>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-card">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Address</h3>
            <p>Dubai Marina</p>
            <p>Dubai, United Arab Emirates</p>
          </div>
          <div className="contact-card">
            <i className="fas fa-phone"></i>
            <h3>Phone</h3>
            <p>+971 4 123 4567</p>
            <p>+971 50 123 4567 (WhatsApp)</p>
          </div>
          <div className="contact-card">
            <i className="fas fa-envelope"></i>
            <h3>Email</h3>
            <p>reservations@elyseefinedining.com</p>
            <p>info@elyseefinedining.com</p>
          </div>
          <div className="contact-card">
            <i className="fas fa-clock"></i>
            <h3>Hours</h3>
            <p>Monday - Thursday: 6PM - 11PM</p>
            <p>Friday - Saturday: 6PM - 12AM</p>
          </div>
        </div>

        <div className="contact-cta">
          <h2>Connect With Us</h2>
          <p>For reservations and inquiries, please contact us via WhatsApp for the fastest response.</p>
          
          <a 
            href={`https://wa.me/971501234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-cta-large"
          >
            <i className="fab fa-whatsapp"></i>
            Message on WhatsApp
          </a>
          
          <div className="map-container">
            <div className="map-placeholder">
              <i className="fas fa-map"></i>
              <p>Google Maps Integration</p>
              <small>Dubai Marina Location</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Reservation() {
  const [formData, setFormData] = useState({
    date: '',
    time: '19:00',
    guests: '2',
    name: '',
    phone: '',
    email: '',
    occasion: '',
    specialRequests: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `New Reservation Request:\n\n` +
      `Name: ${formData.name}\n` +
      `Date: ${formData.date}\n` +
      `Time: ${formData.time}\n` +
      `Guests: ${formData.guests}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Occasion: ${formData.occasion}\n` +
      `Special Requests: ${formData.specialRequests}`
    );
    
    window.open(`https://wa.me/971501234567?text=${message}`, '_blank');
  };

  const times = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];
  const guestOptions = ['1', '2', '3', '4', '5', '6', '7', '8'];

  return (
    <div className="reservation-page">
      <div className="reservation-hero">
        <div className="reservation-hero-bg" />
        <div className="reservation-hero-content">
          <h1 className="reservation-hero-title">Make a <span>Reservation</span></h1>
        </div>
      </div>

      <div className="reservation-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="reservation-form"
        >
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Time *</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  {times.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Number of Guests *</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  {guestOptions.map(num => (
                    <option key={num} value={num}>{num} {num === '1' ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Occasion</label>
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select an occasion</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="birthday">Birthday</option>
                  <option value="business">Business Dinner</option>
                  <option value="celebration">Celebration</option>
                  <option value="date">Date Night</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="Your full name"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="+971 XX XXX XXXX"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="your@email.com"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Special Requests</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Dietary restrictions, allergies, or special celebrations..."
              />
              <p className="form-note">
                Please note any dietary restrictions or allergies for our chef's attention.
              </p>
            </div>
            
            <button type="submit" className="submit-btn">
              <i className="fab fa-whatsapp"></i>
              Confirm Reservation on WhatsApp
            </button>
          </form>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="reservation-info"
        >
          <h3 className="info-title">Reservation Information</h3>
          <ul className="info-list">
            <li>Reservations are confirmed upon WhatsApp verification</li>
            <li>24-hour cancellation policy applies</li>
            <li>Smart elegant dress code is required</li>
            <li>Tasting menus require 72-hour pre-order</li>
            <li>Children above 12 years are welcome</li>
            <li>Valet parking available</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

// =============== MAIN APP ===============
function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
      </AnimatePresence>
      <WhatsAppButton />
      <Footer />
    </>
  );
}

export default App;