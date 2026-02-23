// import { useState, useEffect, useRef } from 'react';
// import { Routes, Route, Link, useLocation } from 'react-router-dom';
// import { AnimatePresence, motion } from 'framer-motion';
// import './App.css';

// // =============== COMPONENTS ===============
// function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about' },
//     { name: 'Menu', path: '/menu' },
//     { name: 'Gallery', path: '/gallery' },
//     { name: 'Contact', path: '/contact' },
//     { name: 'Reservation', path: '/reservation' },
//   ];

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6, ease: 'easeOut' }}
//       className={`navbar ${isScrolled ? 'scrolled' : ''}`}
//     >
//       <div className="nav-container">
//         <Link to="/" className="logo">Élysée</Link>
        
//         <ul className="nav-links">
//           {navLinks.map((link) => (
//             <li key={link.name}>
//               <Link 
//                 to={link.path} 
//                 className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
//               >
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
        
//         <button 
//           className="mobile-menu-btn"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? '✕' : '☰'}
//         </button>
//       </div>
      
//       <div 
//         className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
//         onClick={() => setIsMobileMenuOpen(false)}
//       />
      
//       <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
//         <ul className="mobile-nav-links">
//           {navLinks.map((link) => (
//             <li key={link.name}>
//               <Link 
//                 to={link.path} 
//                 className="mobile-nav-link"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </motion.nav>
//   );
// }

// function WhatsAppButton() {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     let timeout;
//     const handleScroll = () => {
//       setIsVisible(false);
//       clearTimeout(timeout);
//       timeout = setTimeout(() => setIsVisible(true), 100);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       clearTimeout(timeout);
//     };
//   }, []);

//   const whatsappMessage = encodeURIComponent(
//     "Hello, I would like to reserve a table. Please share availability."
//   );

//   return (
//     <motion.a
//       href={`https://wa.me/971501234567?text=${whatsappMessage}`}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="whatsapp-button"
//       initial={{ scale: 0 }}
//       animate={{ 
//         scale: isVisible ? 1 : 0.9,
//         opacity: isVisible ? 1 : 0.7
//       }}
//       whileHover={{ scale: 1.1 }}
//       transition={{ type: "spring", stiffness: 400, damping: 17 }}
//     >
//       <i className="fab fa-whatsapp"></i>
//     </motion.a>
//   );
// }

// function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-content">
//         <div className="footer-section">
//           <h3>Élysée</h3>
//           <p>
//             A Michelin-starred dining experience where culinary artistry 
//             meets French elegance in the heart of Dubai.
//           </p>
//           <div className="social-links">
//             <a href="#"><i className="fab fa-instagram"></i></a>
//             <a href="#"><i className="fab fa-facebook-f"></i></a>
//             <a href="#"><i className="fab fa-twitter"></i></a>
//             <a href="#"><i className="fab fa-tripadvisor"></i></a>
//           </div>
//         </div>
        
//         <div className="footer-section">
//           <h3>Contact</h3>
//           <ul className="footer-links">
//             <li>
//               <a href="#">
//                 <i className="fas fa-map-marker-alt"></i>
//                 Dubai Marina, Dubai, UAE
//               </a>
//             </li>
//             <li>
//               <a href="tel:+97141234567">
//                 <i className="fas fa-phone"></i>
//                 +971 4 123 4567
//               </a>
//             </li>
//             <li>
//               <a href="mailto:reservations@elyseefinedining.com">
//                 <i className="fas fa-envelope"></i>
//                 reservations@elyseefinedining.com
//               </a>
//             </li>
//           </ul>
//         </div>
        
//         <div className="footer-section">
//           <h3>Hours</h3>
//           <ul className="footer-links">
//             <li>Monday - Thursday: 6PM - 11PM</li>
//             <li>Friday - Saturday: 6PM - 12AM</li>
//             <li>Sunday: 6PM - 10:30PM</li>
//             <li><br /></li>
//             <li>Brunch: Saturday 12PM - 4PM</li>
//           </ul>
//         </div>
//       </div>
      
//       <div className="footer-bottom">
//         <p>&copy; {new Date().getFullYear()} Élysée Fine Dining. All rights reserved.</p>
//         <p>Designed with excellence in Dubai</p>
//       </div>
//     </footer>
//   );
// }

// // =============== HERO ===============
// function Hero() {
//   const whatsappMessage = encodeURIComponent(
//     "Hello, I would like to reserve a table. Please share availability."
//   );

//   return (
//     <section className="hero">
//       <div className="hero-bg" />
      
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, delay: 0.2 }}
//         className="hero-content"
//       >
//         <h1 className="hero-title">
//           Élysée
//           <span>Fine Dining</span>
//         </h1>
//         <p className="hero-subtitle">
//           An elevated culinary journey where French elegance meets 
//           avant-garde gastronomy in the heart of Dubai.
//         </p>
//         <div className="hero-buttons">
//           <Link to="/menu" className="btn btn-primary">View Menu</Link>
//           <a 
//             href={`https://wa.me/971501234567?text=${whatsappMessage}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="btn btn-secondary"
//           >
//             Reserve via WhatsApp
//           </a>
//         </div>
//       </motion.div>
      
//       <div className="scroll-indicator">
//         <span className="scroll-text">Scroll</span>
//         <div className="scroll-line" />
//       </div>
//     </section>
//   );
// }

// // =============== ABOUT SECTION ===============
// function AboutSection() {
//   return (
//     <section className="about-section fade-in">
//       <div className="about-container">
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="about-content"
//         >
//           <h2>Where <span>Artistry</span> Meets <span>Gastronomy</span></h2>
//           <p className="about-text">
//             Élysée Fine Dining redefines luxury culinary experiences in Dubai. 
//             Our Michelin-starred chefs create immersive dining journeys that 
//             blend French culinary traditions with avant-garde techniques.
//           </p>
//           <p className="about-text">
//             Each dish tells a story, crafted from the finest seasonal ingredients 
//             sourced globally. Our sommelier-curated wine pairing elevates every 
//             course to a symphony of flavors.
//           </p>
          
//           <div className="about-highlights">
//             <div className="highlight-item">
//               <div className="highlight-icon">⭐</div>
//               <div className="highlight-number">2</div>
//               <div className="highlight-text">Michelin Stars</div>
//             </div>
//             <div className="highlight-item">
//               <div className="highlight-icon">🏆</div>
//               <div className="highlight-number">15+</div>
//               <div className="highlight-text">International Awards</div>
//             </div>
//             <div className="highlight-item">
//               <div className="highlight-icon">👨‍🍳</div>
//               <div className="highlight-number">5</div>
//               <div className="highlight-text">World-Class Chefs</div>
//             </div>
//           </div>
//         </motion.div>
        
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           viewport={{ once: true }}
//           className="about-image"
//         >
//           <img 
//             src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
//             alt="Élysée Restaurant Interior"
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // =============== CHEF SECTION ===============
// function ChefSection() {
//   return (
//     <section className="chef-section fade-in">
//       <div className="chef-container">
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="chef-image"
//         >
//           <img 
//             src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
//             alt="Executive Chef"
//           />
//         </motion.div>
        
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           viewport={{ once: true }}
//           className="chef-content"
//         >
//           <h2>Meet Our <span>Executive Chef</span></h2>
//           <h3 className="chef-name">Chef Alexandre Moreau</h3>
//           <p className="chef-bio">
//             With over 20 years of culinary expertise across Michelin-starred 
//             restaurants in Paris, Tokyo, and now Dubai, Chef Moreau brings 
//             a revolutionary approach to fine dining.
//           </p>
//           <div className="chef-awards">
//             <div className="award">
//               <i className="fas fa-star"></i>
//               <span>2 Michelin Stars</span>
//             </div>
//             <div className="award">
//               <i className="fas fa-trophy"></i>
//               <span>World's 50 Best Restaurants 2023</span>
//             </div>
//             <div className="award">
//               <i className="fas fa-award"></i>
//               <span>Gault & Millau Chef of the Year</span>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // =============== MENU PREVIEW ===============
// function MenuPreview() {
//   const signatureDishes = [
//     {
//       name: 'A5 Wagyu Tenderloin',
//       description: 'Charcoal-grilled with smoked potato purée',
//       price: 'AED 520',
//       image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
//     },
//     {
//       name: 'Atlantic Turbot',
//       description: 'Saffron velouté, caviar beurre blanc',
//       price: 'AED 380',
//       image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
//     },
//     {
//       name: 'Chocolate Symphony',
//       description: '72% dark chocolate, salted caramel',
//       price: 'AED 160',
//       image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
//     }
//   ];

//   return (
//     <section className="menu-preview fade-in">
//       <div className="container">
//         <div className="section-header">
//           <h2 className="section-title">Signature Dishes</h2>
//           <p className="section-subtitle">Culinary Masterpieces</p>
//         </div>
        
//         <div className="dishes-grid">
//           {signatureDishes.map((dish, index) => (
//             <motion.div
//               key={dish.name}
//               className="dish-card"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -10 }}
//             >
//               <div className="dish-image">
//                 <img src={dish.image} alt={dish.name} />
//                 <div className="dish-overlay">
//                   <span className="dish-price">{dish.price}</span>
//                 </div>
//               </div>
//               <div className="dish-content">
//                 <h3>{dish.name}</h3>
//                 <p>{dish.description}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
        
//         <div className="text-center">
//           <Link to="/menu" className="btn btn-secondary">View Full Menu</Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// // =============== VR MENU PREVIEW ===============
// function VRMenuPreview() {
//   const [currentView, setCurrentView] = useState(0);

//   const vrDishes = [
//     {
//       name: 'A5 Wagyu Tenderloin',
//       image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       price: 'AED 520',
//       description: 'Interactive 360° view available'
//     },
//     {
//       name: 'Atlantic Turbot',
//       image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       price: 'AED 380',
//       description: 'VR exploration of fresh catch'
//     },
//     {
//       name: 'Chocolate Symphony',
//       image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       price: 'AED 160',
//       description: 'Immersive dessert journey'
//     }
//   ];

//   return (
//     <section className="vr-menu-preview fade-in">
//       <div className="container">
//         <div className="section-header">
//           <h2 className="section-title">
//             <i className="fas fa-vr-cardboard vr-icon"></i>
//             VR Menu Experience
//           </h2>
//           <p className="section-subtitle">
//             Explore our signature dishes in immersive 360° virtual reality
//           </p>
//         </div>

//         <div className="vr-preview-container">
//           <motion.div 
//             className="vr-viewer"
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <img 
//               src={vrDishes[currentView].image} 
//               alt={vrDishes[currentView].name}
//             />
//             <div className="vr-overlay">
//               <div className="vr-badge">
//                 <i className="fas fa-vr-cardboard"></i>
//                 VR READY
//               </div>
//             </div>
//             <div className="vr-controls">
//               {vrDishes.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`vr-control-btn ${currentView === index ? 'active' : ''}`}
//                   onClick={() => setCurrentView(index)}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
//             </div>
//           </motion.div>

//           <motion.div 
//             className="vr-content"
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             viewport={{ once: true }}
//           >
//             <h3 className="vr-dish-name">{vrDishes[currentView].name}</h3>
//             <div className="vr-dish-price">{vrDishes[currentView].price}</div>
//             <p className="vr-dish-description">
//               {vrDishes[currentView].description}. Experience this dish in full 360° virtual reality.
//             </p>
            
//             <div className="vr-features">
//               <div className="vr-feature">
//                 <i className="fas fa-rotate"></i>
//                 <span>360° Rotation</span>
//               </div>
//               <div className="vr-feature">
//                 <i className="fas fa-search-plus"></i>
//                 <span>Zoom In Details</span>
//               </div>
//               <div className="vr-feature">
//                 <i className="fas fa-mobile-alt"></i>
//                 <span>Mobile AR Support</span>
//               </div>
//               <div className="vr-feature">
//                 <i className="fas fa-expand"></i>
//                 <span>Fullscreen Mode</span>
//               </div>
//             </div>
            
//             <Link to="/menu" className="vr-cta-button">
//               <i className="fas fa-play-circle"></i>
//               Explore Full VR Menu
//             </Link>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // =============== GALLERY ===============
// function Gallery() {
//   const galleryImages = [
//     'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     'https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
//   ];

//   return (
//     <section className="gallery fade-in">
//       <div className="container">
//         <div className="section-header">
//           <h2 className="section-title">Our Gallery</h2>
//           <p className="section-subtitle">Experience the Ambience</p>
//         </div>
        
//         <div className="gallery-grid">
//           {galleryImages.map((img, index) => (
//             <motion.div
//               key={index}
//               className="gallery-item"
//               initial={{ opacity: 0, scale: 0.8 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               whileHover={{ scale: 1.05 }}
//             >
//               <img src={img} alt={`Gallery ${index + 1}`} />
//               <div className="gallery-overlay">
//                 <i className="fas fa-search-plus"></i>
//               </div>
//             </motion.div>
//           ))}
//         </div>
        
//         <div className="text-center">
//           <Link to="/gallery" className="btn btn-secondary">View Full Gallery</Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// // =============== RESERVATION CTA ===============
// function ReservationCTA() {
//   const whatsappMessage = encodeURIComponent(
//     "Hello, I would like to reserve a table. Please share availability."
//   );

//   return (
//     <section className="reservation-cta fade-in">
//       <div className="reservation-content">
//         <motion.h2
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="reservation-title"
//         >
//           Reserve Your <span>Experience</span>
//         </motion.h2>
        
//         <motion.p
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           viewport={{ once: true }}
//           className="reservation-subtitle"
//         >
//           Secure your table at Dubai's most exclusive dining destination. 
//           Limited seating available for an intimate culinary journey.
//         </motion.p>
        
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           viewport={{ once: true }}
//           className="reservation-buttons"
//         >
//           <a 
//             href={`https://wa.me/971501234567?text=${whatsappMessage}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="whatsapp-cta"
//           >
//             <i className="fab fa-whatsapp"></i>
//             Book via WhatsApp
//           </a>
//           <Link to="/reservation" className="btn btn-secondary">
//             View Reservation Details
//           </Link>
//         </motion.div>
        
//         <motion.a
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           viewport={{ once: true }}
//           href="tel:+97141234567"
//           className="contact-link"
//         >
//           Or call us directly: +971 4 123 4567
//         </motion.a>
//       </div>
//     </section>
//   );
// }

// // =============== VR MENU VIEWER ===============
// function VRMenuViewer({ dish, onClose }) {
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [rotation, setRotation] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const containerRef = useRef(null);
//   const lastMousePos = useRef({ x: 0, y: 0 });

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     lastMousePos.current = { x: e.clientX, y: e.clientY };
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
    
//     const deltaX = e.clientX - lastMousePos.current.x;
//     const deltaY = e.clientY - lastMousePos.current.y;
    
//     setRotation(prev => ({
//       x: Math.max(-30, Math.min(30, prev.x + deltaY * 0.5)),
//       y: prev.y + deltaX * 0.5
//     }));
    
//     lastMousePos.current = { x: e.clientX, y: e.clientY };
//   };

//   const handleMouseUp = () => setIsDragging(false);

//   const toggleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       containerRef.current.requestFullscreen();
//       setIsFullscreen(true);
//     } else {
//       document.exitFullscreen();
//       setIsFullscreen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
    
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging]);

//   const vrDishes = {
//     'A5 Wagyu Tenderloin': {
//       images: [
//         'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//         'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//         'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
//       ],
//       description: 'Explore our A5 Wagyu from every angle',
//       vrTips: ['Drag to rotate', 'Click for details', 'Use fullscreen for immersion']
//     },
//     'Atlantic Turbot': {
//       images: [
//         'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//         'https://images.unsplash.com/photo-1559314809-2b99056a8c4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
//       ],
//       description: '360° view of our fresh Atlantic Turbot',
//       vrTips: ['Pinch to zoom on mobile', 'Drag to rotate view']
//     },
//     'Chocolate Symphony': {
//       images: [
//         'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//         'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
//       ],
//       description: 'Interactive chocolate dessert exploration',
//       vrTips: ['Hold CTRL for zoom', 'Right-click to reset view']
//     }
//   };

//   const currentDish = vrDishes[dish.name] || vrDishes['A5 Wagyu Tenderloin'];

//   return (
//     <motion.div 
//       className="vr-menu-viewer-overlay"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={onClose}
//     >
//       <motion.div 
//         className="vr-container"
//         ref={containerRef}
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ type: "spring", damping: 20 }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="vr-close-btn" onClick={onClose}>✕</div>
        
//         <div className="vr-controls">
//           <button className="vr-control-btn" onClick={toggleFullscreen}>
//             {isFullscreen ? '⤢' : '⤡'}
//           </button>
//           <button className="vr-control-btn" onClick={() => setRotation({ x: 0, y: 0 })}>
//             ↺
//           </button>
//         </div>
        
//         <div className="vr-content">
//           <div className="vr-image-grid">
//             {currentDish.images.map((img, index) => (
//               <motion.div 
//                 key={index}
//                 className="vr-image-item"
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 style={{
//                   transform: `rotateY(${rotation.y}deg) rotateX(${rotation.x}deg) translateZ(${index * 20}px)`
//                 }}
//               >
//                 <img src={img} alt={`${dish.name} view ${index + 1}`} />
                
//                 {index === 0 && (
//                   <>
//                     <div className="vr-hotspot" style={{ top: '30%', left: '40%' }}>
//                       <div className="vr-hotspot-tooltip">
//                         <strong>Premium Ingredients</strong>
//                         <p>Hand-selected from global sources</p>
//                       </div>
//                     </div>
//                     <div className="vr-hotspot" style={{ top: '60%', left: '70%' }}>
//                       <div className="vr-hotspot-tooltip">
//                         <strong>Artisanal Preparation</strong>
//                         <p>Traditional techniques meet innovation</p>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </motion.div>
//             ))}
//           </div>
          
//           <div className="vr-watermark">Élysée</div>
//         </div>
        
//         <div className="vr-info">
//           <h2 className="vr-dish-name">{dish.name}</h2>
//           <p className="vr-dish-description">
//             {currentDish.description} • {dish.description}
//           </p>
//           <div className="vr-tips">
//             {currentDish.vrTips.map((tip, index) => (
//               <span key={index} className="vr-tip">{tip}</span>
//             ))}
//             <span className="vr-tip">Price: {dish.price}</span>
//           </div>
//         </div>
        
//         {navigator.xr && (
//           <button className="vr-ar-button">
//             <i className="fas fa-vr-cardboard"></i>
//             View in AR
//           </button>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// }

// // =============== VR MENU ITEM ===============
// function VRMenuItem({ item, index }) {
//   const [showVR, setShowVR] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <>
//       <motion.div 
//         className="vr-menu-item"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: index * 0.1 }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div className="vr-menu-item-content">
//           <h3 className="vr-menu-item-name">
//             {item.name}
//             <span className="vr-badge">
//               <i className="fas fa-vr-cardboard"></i>
//               VR VIEW
//             </span>
//           </h3>
//           <p className="vr-menu-item-description">{item.description}</p>
          
//           <button className="vr-view-button" onClick={() => setShowVR(true)}>
//             <i className="fas fa-eye"></i>
//             Explore in 360° VR
//           </button>
//         </div>
        
//         <div className="vr-menu-item-price">{item.price}</div>
        
//         <div className="vr-preview">
//           <img 
//             src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
//             alt={item.name}
//           />
//           <div className="vr-preview-overlay">
//             <i className="fas fa-expand-arrows-alt"></i>
//           </div>
//         </div>
//       </motion.div>

//       <AnimatePresence>
//         {showVR && (
//           <VRMenuViewer 
//             dish={item} 
//             onClose={() => setShowVR(false)} 
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// // =============== PAGES ===============
// function Home() {
//   useEffect(() => {
//     const observerOptions = {
//       threshold: 0.1,
//       rootMargin: '0px 0px -50px 0px'
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('visible');
//         }
//       });
//     }, observerOptions);

//     document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <>
//       <Hero />
//       <AboutSection />
//       <ChefSection />
//       <MenuPreview />
//       <VRMenuPreview />
//       <Gallery />
//       <ReservationCTA />
//     </>
//   );
// }

// function About() {
//   return (
//     <div className="page about-page">
//       <div className="page-hero">
//         <div className="page-hero-bg" />
//         <div className="page-hero-content">
//           <h1 className="page-hero-title">Our <span>Story</span></h1>
//           <p className="page-hero-subtitle">A Legacy of Culinary Excellence</p>
//         </div>
//       </div>

//       <div className="page-content">
//         <div className="container">
//           <div className="story-section">
//             <h2>The Élysée Journey</h2>
//             <p>
//               Founded in 2018, Élysée Fine Dining emerged from a shared vision between 
//               Chef Alexandre Moreau and restaurateur Sophia Al-Farsi. Their dream was 
//               to create a culinary sanctuary where French gastronomy meets Middle Eastern 
//               warmth, redefining Dubai's fine dining landscape.
//             </p>
//             <p>
//               From our humble beginnings in a renovated villa, we've grown to become 
//               a two-Michelin-starred destination, recognized by the World's 50 Best 
//               Restaurants. Our commitment to sustainability and ethical sourcing has 
//               set new standards in the region.
//             </p>
//           </div>

//           <div className="timeline">
//             <div className="timeline-item">
//               <div className="timeline-year">2018</div>
//               <div className="timeline-content">
//                 <h3>Grand Opening</h3>
//                 <p>Élysée opens its doors in Dubai Marina with 12 tables</p>
//               </div>
//             </div>
//             <div className="timeline-item">
//               <div className="timeline-year">2020</div>
//               <div className="timeline-content">
//                 <h3>First Michelin Star</h3>
//                 <p>Awarded our first Michelin star during the pandemic</p>
//               </div>
//             </div>
//             <div className="timeline-item">
//               <div className="timeline-year">2022</div>
//               <div className="timeline-content">
//                 <h3>Second Michelin Star</h3>
//                 <p>Recognized with a second Michelin star</p>
//               </div>
//             </div>
//             <div className="timeline-item">
//               <div className="timeline-year">2023</div>
//               <div className="timeline-content">
//                 <h3>World's 50 Best</h3>
//                 <p>Ranked #47 in World's 50 Best Restaurants</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Menu() {
//   const [activeCategory, setActiveCategory] = useState('tasting');

//   const menuCategories = [
//     { id: 'tasting', name: 'Tasting Menu', icon: '✨' },
//     { id: 'starters', name: 'Starters', icon: '🥗' },
//     { id: 'mains', name: 'Main Courses', icon: '🥩' },
//     { id: 'desserts', name: 'Desserts', icon: '🍰' },
//     { id: 'wine', name: 'Wine Pairing', icon: '🍷' },
//   ];

//   const menuItems = {
//     tasting: [
//       { 
//         name: 'Omakase Journey', 
//         description: 'Chef\'s selection of 12 seasonal courses with VR exploration of ingredients',
//         price: 'AED 850',
//         vrEnabled: true
//       },
//       { 
//         name: 'Signature Tasting', 
//         description: '9-course menu highlighting our most celebrated dishes in 360° view',
//         price: 'AED 650',
//         vrEnabled: true
//       },
//       { 
//         name: 'Vegetarian Experience', 
//         description: '7-course plant-based culinary journey',
//         price: 'AED 550',
//         vrEnabled: true
//       },
//     ],
//     starters: [
//       { 
//         name: 'Oscietra Caviar', 
//         description: 'With cauliflower crémeux and gold leaf - Explore the caviar pearls in VR',
//         price: 'AED 320',
//         vrEnabled: true
//       },
//       { 
//         name: 'Bluefin Toro Tartare', 
//         description: 'Wasabi emulsion, soy gel, crispy nori',
//         price: 'AED 280',
//         vrEnabled: false
//       },
//       { 
//         name: 'Truffle Consommé', 
//         description: 'Black truffle, morels, hen egg yolk',
//         price: 'AED 240',
//         vrEnabled: false
//       },
//     ],
//     mains: [
//       { 
//         name: 'A5 Wagyu Tenderloin', 
//         description: 'Charcoal-grilled, smoked potato purée, seasonal vegetables - Full VR exploration available',
//         price: 'AED 520',
//         vrEnabled: true
//       },
//       { 
//         name: 'Atlantic Turbot', 
//         description: 'Saffron velouté, caviar beurre blanc, samphire - 360° view of fresh catch',
//         price: 'AED 380',
//         vrEnabled: true
//       },
//       { 
//         name: 'Herb-Crusted Rack of Lamb', 
//         description: 'Rosemary jus, truffled potato mille-feuille',
//         price: 'AED 420',
//         vrEnabled: false
//       },
//     ],
//     desserts: [
//       { 
//         name: 'Chocolate Symphony', 
//         description: '72% dark chocolate, salted caramel, gold feuilletine - Interactive dessert journey',
//         price: 'AED 160',
//         vrEnabled: true
//       },
//       { 
//         name: 'Yuzu Delight', 
//         description: 'White chocolate, matcha, sesame tuile',
//         price: 'AED 140',
//         vrEnabled: false
//       },
//       { 
//         name: 'Cheese Selection', 
//         description: 'Artisanal cheeses with homemade chutneys',
//         price: 'AED 180',
//         vrEnabled: false
//       },
//     ],
//     wine: [
//       { 
//         name: 'Premium Pairing', 
//         description: 'Selection of 7 wines including Champagne Krug',
//         price: 'AED 650',
//         vrEnabled: false
//       },
//       { 
//         name: 'Classic Pairing', 
//         description: '5 wines from our sommelier\'s selection',
//         price: 'AED 450',
//         vrEnabled: false
//       },
//       { 
//         name: 'Non-Alcoholic Journey', 
//         description: 'Artisanal mocktails and botanical infusions',
//         price: 'AED 280',
//         vrEnabled: false
//       },
//     ],
//   };

//   return (
//     <div className="menu-page">
//       <div className="menu-hero">
//         <div className="menu-hero-bg" />
//         <div className="vr-hero-overlay" />
//         <div className="menu-hero-content">
//           <h1 className="menu-hero-title">VR <span>Menu</span></h1>
//           <p className="menu-hero-subtitle">Immersive Culinary Experience</p>
//           <p className="vr-tagline">
//             <i className="fas fa-vr-cardboard"></i>
//             Explore dishes in 360° virtual reality
//           </p>
//           <a href="#vr-dishes" className="vr-demo-button">
//             <i className="fas fa-play-circle"></i>
//             Try VR Experience
//           </a>
//         </div>
//       </div>

//       <div className="menu-container">
//         <div className="vr-header" id="vr-dishes">
//           <h2 className="vr-header-title">
//             <i className="fas fa-vr-cardboard"></i>
//             Interactive VR Dishes
//           </h2>
//           <p className="vr-header-description">
//             Click the VR button on any dish to explore it in 360° view. 
//             Rotate, zoom, and discover every detail of our culinary creations.
//           </p>
          
//           <div className="vr-stats">
//             <div className="vr-stat">
//               <div className="vr-stat-number">12+</div>
//               <div className="vr-stat-label">VR Dishes</div>
//             </div>
//             <div className="vr-stat">
//               <div className="vr-stat-number">360°</div>
//               <div className="vr-stat-label">Full Rotation</div>
//             </div>
//             <div className="vr-stat">
//               <div className="vr-stat-number">4K</div>
//               <div className="vr-stat-label">High Resolution</div>
//             </div>
//             <div className="vr-stat">
//               <div className="vr-stat-number">AR</div>
//               <div className="vr-stat-label">Mobile Ready</div>
//             </div>
//           </div>
//         </div>

//         <div className="menu-categories">
//           {menuCategories.map((category) => (
//             <button
//               key={category.id}
//               className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
//               onClick={() => setActiveCategory(category.id)}
//             >
//               <span>{category.icon}</span>
//               {category.name}
//             </button>
//           ))}
//         </div>

//         <div className="menu-items">
//           {menuItems[activeCategory].map((item, index) => (
//             <VRMenuItem 
//               key={item.name} 
//               item={item} 
//               index={index} 
//             />
//           ))}
//         </div>

//         <div className="menu-note">
//           <p>
//             * VR dishes marked with <span className="vr-badge-inline">VR VIEW</span> offer interactive 360° exploration.<br />
//             ** Requires WebGL support. Works best on Chrome/Firefox/Safari latest versions.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function GalleryPage() {
//   const galleryImages = [
//     'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     'https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
//   ];

//   return (
//     <div className="gallery-page">
//       <div className="page-hero">
//         <div className="page-hero-bg" />
//         <div className="page-hero-content">
//           <h1 className="page-hero-title">Gallery</h1>
//           <p className="page-hero-subtitle">Visual Journey Through Élysée</p>
//         </div>
//       </div>

//       <div className="gallery-container">
//         <div className="masonry-grid">
//           {galleryImages.map((img, index) => (
//             <motion.div
//               key={index}
//               className="masonry-item"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               whileHover={{ scale: 1.05 }}
//             >
//               <img src={img} alt={`Gallery ${index + 1}`} />
//               <div className="masonry-overlay">
//                 <i className="fas fa-search-plus"></i>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Contact() {
//   const whatsappMessage = encodeURIComponent(
//     "Hello, I have an inquiry about Élysée Fine Dining."
//   );

//   return (
//     <div className="contact-page">
//       <div className="page-hero">
//         <div className="page-hero-bg" />
//         <div className="page-hero-content">
//           <h1 className="page-hero-title">Contact <span>Us</span></h1>
//           <p className="page-hero-subtitle">Get in Touch</p>
//         </div>
//       </div>

//       <div className="contact-container">
//         <div className="contact-info">
//           <div className="contact-card">
//             <i className="fas fa-map-marker-alt"></i>
//             <h3>Address</h3>
//             <p>Dubai Marina</p>
//             <p>Dubai, United Arab Emirates</p>
//           </div>
//           <div className="contact-card">
//             <i className="fas fa-phone"></i>
//             <h3>Phone</h3>
//             <p>+971 4 123 4567</p>
//             <p>+971 50 123 4567 (WhatsApp)</p>
//           </div>
//           <div className="contact-card">
//             <i className="fas fa-envelope"></i>
//             <h3>Email</h3>
//             <p>reservations@elyseefinedining.com</p>
//             <p>info@elyseefinedining.com</p>
//           </div>
//           <div className="contact-card">
//             <i className="fas fa-clock"></i>
//             <h3>Hours</h3>
//             <p>Monday - Thursday: 6PM - 11PM</p>
//             <p>Friday - Saturday: 6PM - 12AM</p>
//           </div>
//         </div>

//         <div className="contact-cta">
//           <h2>Connect With Us</h2>
//           <p>For reservations and inquiries, please contact us via WhatsApp for the fastest response.</p>
          
//           <a 
//             href={`https://wa.me/971501234567?text=${whatsappMessage}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="whatsapp-cta-large"
//           >
//             <i className="fab fa-whatsapp"></i>
//             Message on WhatsApp
//           </a>
          
//           <div className="map-container">
//             <div className="map-placeholder">
//               <i className="fas fa-map"></i>
//               <p>Google Maps Integration</p>
//               <small>Dubai Marina Location</small>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Reservation() {
//   const [formData, setFormData] = useState({
//     date: '',
//     time: '19:00',
//     guests: '2',
//     name: '',
//     phone: '',
//     email: '',
//     occasion: '',
//     specialRequests: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const message = encodeURIComponent(
//       `New Reservation Request:\n\n` +
//       `Name: ${formData.name}\n` +
//       `Date: ${formData.date}\n` +
//       `Time: ${formData.time}\n` +
//       `Guests: ${formData.guests}\n` +
//       `Phone: ${formData.phone}\n` +
//       `Email: ${formData.email}\n` +
//       `Occasion: ${formData.occasion}\n` +
//       `Special Requests: ${formData.specialRequests}`
//     );
    
//     window.open(`https://wa.me/971501234567?text=${message}`, '_blank');
//   };

//   const times = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];
//   const guestOptions = ['1', '2', '3', '4', '5', '6', '7', '8'];

//   return (
//     <div className="reservation-page">
//       <div className="reservation-hero">
//         <div className="reservation-hero-bg" />
//         <div className="reservation-hero-content">
//           <h1 className="reservation-hero-title">Make a <span>Reservation</span></h1>
//         </div>
//       </div>

//       <div className="reservation-container">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="reservation-form"
//         >
//           <form onSubmit={handleSubmit}>
//             <div className="form-row">
//               <div className="form-group">
//                 <label className="form-label">Date *</label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   className="form-input"
//                   required
//                   min={new Date().toISOString().split('T')[0]}
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label">Time *</label>
//                 <select
//                   name="time"
//                   value={formData.time}
//                   onChange={handleChange}
//                   className="form-select"
//                   required
//                 >
//                   {times.map(time => (
//                     <option key={time} value={time}>{time}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
            
//             <div className="form-row">
//               <div className="form-group">
//                 <label className="form-label">Number of Guests *</label>
//                 <select
//                   name="guests"
//                   value={formData.guests}
//                   onChange={handleChange}
//                   className="form-select"
//                   required
//                 >
//                   {guestOptions.map(num => (
//                     <option key={num} value={num}>{num} {num === '1' ? 'guest' : 'guests'}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label">Occasion</label>
//                 <select
//                   name="occasion"
//                   value={formData.occasion}
//                   onChange={handleChange}
//                   className="form-select"
//                 >
//                   <option value="">Select an occasion</option>
//                   <option value="anniversary">Anniversary</option>
//                   <option value="birthday">Birthday</option>
//                   <option value="business">Business Dinner</option>
//                   <option value="celebration">Celebration</option>
//                   <option value="date">Date Night</option>
//                 </select>
//               </div>
//             </div>
            
//             <div className="form-row">
//               <div className="form-group">
//                 <label className="form-label">Full Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="form-input"
//                   required
//                   placeholder="Your full name"
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label">Phone Number *</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="form-input"
//                   required
//                   placeholder="+971 XX XXX XXXX"
//                 />
//               </div>
//             </div>
            
//             <div className="form-group">
//               <label className="form-label">Email Address *</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="form-input"
//                 required
//                 placeholder="your@email.com"
//               />
//             </div>
            
//             <div className="form-group">
//               <label className="form-label">Special Requests</label>
//               <textarea
//                 name="specialRequests"
//                 value={formData.specialRequests}
//                 onChange={handleChange}
//                 className="form-textarea"
//                 placeholder="Dietary restrictions, allergies, or special celebrations..."
//               />
//               <p className="form-note">
//                 Please note any dietary restrictions or allergies for our chef's attention.
//               </p>
//             </div>
            
//             <button type="submit" className="submit-btn">
//               <i className="fab fa-whatsapp"></i>
//               Confirm Reservation on WhatsApp
//             </button>
//           </form>
//         </motion.div>
        
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="reservation-info"
//         >
//           <h3 className="info-title">Reservation Information</h3>
//           <ul className="info-list">
//             <li>Reservations are confirmed upon WhatsApp verification</li>
//             <li>24-hour cancellation policy applies</li>
//             <li>Smart elegant dress code is required</li>
//             <li>Tasting menus require 72-hour pre-order</li>
//             <li>Children above 12 years are welcome</li>
//             <li>Valet parking available</li>
//           </ul>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// // =============== MAIN APP ===============
// function App() {
//   const location = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname]);

//   return (
//     <>
//       <Navbar />
//       <AnimatePresence mode="wait">
//         <Routes location={location} key={location.pathname}>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/menu" element={<Menu />} />
//           <Route path="/gallery" element={<GalleryPage />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/reservation" element={<Reservation />} />
//         </Routes>
//       </AnimatePresence>
//       <WhatsAppButton />
//       <Footer />
//     </>
//   );
// }

// export default App;
import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
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
        <Link to="/" className="logo">Brew & Bean</Link>
        
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
    "Hello! I'd like to know more about Brew & Bean Coffee Shop. ☕"
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
          <h3>Brew & Bean</h3>
          <p>
            Artisan coffee shop and cafe serving specialty coffee, 
            fresh pastries, and creating memorable moments in every cup.
            Where community meets exceptional coffee.
          </p>
          <div className="social-links">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-tiktok"></i></a>
            <a href="#"><i className="fab fa-pinterest"></i></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <ul className="footer-links">
            <li>
              <a href="#">
                <i className="fas fa-map-marker-alt"></i>
                Downtown Dubai, Sheikh Mohammed Bin Rashid Blvd, Dubai, UAE
              </a>
            </li>
            <li>
              <a href="tel:+97141234567">
                <i className="fas fa-phone"></i>
                +971 4 123 4567
              </a>
            </li>
            <li>
              <a href="mailto:hello@brewandbean.com">
                <i className="fas fa-envelope"></i>
                hello@brewandbean.com
              </a>
            </li>
            <li>
              <a href="mailto:orders@brewandbean.com">
                <i className="fas fa-shopping-bag"></i>
                orders@brewandbean.com
              </a>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Hours</h3>
          <ul className="footer-links">
            <li>Monday - Friday: 7AM - 8PM</li>
            <li>Saturday: 8AM - 9PM</li>
            <li>Sunday: 8AM - 6PM</li>
            <li><br /></li>
            <li>Breakfast served until 11AM daily</li>
            <li>Happy Hour: 3PM - 5PM weekdays</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/menu">Our Menu</Link></li>
            <li><Link to="/reservation">Reserve a Table</Link></li>
            <li><Link to="/gallery">Coffee Gallery</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Brew & Bean Coffee Co. All rights reserved.</p>
        <p>Crafted with ❤️ and ☕ in Dubai</p>
      </div>
    </footer>
  );
}

// =============== HERO ===============
function Hero() {
  const whatsappMessage = encodeURIComponent(
    "Hi! I'd like to order some coffee and pastries. ☕🥐"
  );

  return (
    <section className="hero">
      <div className="hero-bg"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="hero-content"
      >
        <h1 className="hero-title">
          Brew & Bean
          <span>Artisan Coffee & Cafe</span>
        </h1>
        <p className="hero-subtitle">
          Where every cup tells a story. Experience artisanal coffee, 
          fresh pastries, and cozy atmosphere in the heart of the city.
          Your daily dose of happiness starts here.
        </p>
        <div className="hero-buttons">
          <Link to="/menu" className="btn btn-primary">View Menu</Link>
          <a 
            href={`https://wa.me/971501234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <i className="fab fa-whatsapp"></i> Order via WhatsApp
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
          <h2>Where <span>Passion</span> Meets <span>Perfection</span></h2>
          <p className="about-text">
            At Brew & Bean, we believe that great coffee is an art form. 
            Our master roasters source the finest beans from sustainable 
            farms across Ethiopia, Colombia, and Brazil. Each batch is 
            roasted to perfection in our micro-roastery.
          </p>
          <p className="about-text">
            Every cup is carefully crafted by our skilled baristas, who 
            bring years of expertise and genuine passion to create your 
            perfect coffee experience. From the first sip to the last drop,
            we ensure quality in every detail.
          </p>
          
          <div className="about-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">☕</div>
              <div className="highlight-number">15+</div>
              <div className="highlight-text">Coffee Varieties</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🥐</div>
              <div className="highlight-number">Daily</div>
              <div className="highlight-text">Fresh Pastries</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">👨‍🍳</div>
              <div className="highlight-number">5</div>
              <div className="highlight-text">Master Baristas</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🌱</div>
              <div className="highlight-number">100%</div>
              <div className="highlight-text">Sustainable Sourcing</div>
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
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
            alt="Brew & Bean Coffee Shop Interior"
          />
        </motion.div>
      </div>
    </section>
  );
}

// =============== BARISTA SECTION ===============
function BaristaSection() {
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
            src="https://images.unsplash.com/photo-1574482620816-ae0f58d6a81e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
            alt="Master Barista Elena Rodriguez"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="chef-content"
        >
          <h2>Meet Our <span>Master Barista</span></h2>
          <h3 className="chef-name">Elena Rodriguez</h3>
          <p className="chef-bio">
            With 12 years of experience in specialty coffee across Europe, 
            Elena brings her expertise in latte art and brewing techniques 
            to create the perfect cup every time. She's trained baristas 
            across three continents and judges international competitions.
          </p>
          <div className="chef-awards">
            <div className="award">
              <i className="fas fa-trophy"></i>
              <span>UK Latte Art Champion 2022</span>
            </div>
            <div className="award">
              <i className="fas fa-award"></i>
              <span>Specialty Coffee Association Certified</span>
            </div>
            <div className="award">
              <i className="fas fa-star"></i>
              <span>World Coffee Events Finalist 2023</span>
            </div>
            <div className="award">
              <i className="fas fa-certificate"></i>
              <span>Q-Grader Certified</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =============== MENU PREVIEW ===============
function MenuPreview() {
  const signatureItems = [
    {
      id: 1,
      name: 'Signature Latte',
      description: 'Espresso with steamed milk and our secret vanilla blend, topped with beautiful latte art',
      price: 24,
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'coffee'
    },
    {
      id: 2,
      name: 'Pour-Over Coffee',
      description: 'Single-origin Ethiopian Yirgacheffe, carefully brewed to highlight floral and citrus notes',
      price: 28,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'coffee'
    },
    {
      id: 3,
      name: 'Artisan Croissant',
      description: 'Buttery, flaky pastry filled with almond cream, baked fresh every morning',
      price: 18,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'pastry'
    }
  ];

  return (
    <section className="menu-preview fade-in">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Customer Favorites</h2>
          <p className="section-subtitle">Most Popular Items</p>
        </div>
        
        <div className="dishes-grid">
          {signatureItems.map((item) => (
            <motion.div
              key={item.id}
              className="dish-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Link to={`/product/${item.id}`} className="dish-link">
                <div className="dish-image">
                  <img src={item.image} alt={item.name} />
                  <div className="dish-overlay">
                    <span className="dish-price">AED {item.price}</span>
                  </div>
                </div>
                <div className="dish-content">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span className="view-details">View Details →</span>
                </div>
              </Link>
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

// =============== COFFEE BEANS SECTION ===============
function CoffeeBeansSection() {
  const beans = [
    {
      id: 101,
      name: 'Yirgacheffe',
      origin: 'Ethiopia',
      tasting: 'Floral, citrus, bergamot',
      price: 65,
      weight: '250g',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 102,
      name: 'Huila',
      origin: 'Colombia',
      tasting: 'Caramel, chocolate, red apple',
      price: 58,
      weight: '250g',
      image: 'https://images.unsplash.com/photo-1559525839-b184a4dfd1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 103,
      name: 'Cerrado',
      origin: 'Brazil',
      tasting: 'Nuts, chocolate, low acidity',
      price: 52,
      weight: '250g',
      image: 'https://images.unsplash.com/photo-1587049352851-5d630e214d7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="coffee-beans-section fade-in">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our <span>Coffee Beans</span></h2>
          <p className="section-subtitle">Sourced from the World's Best Farms</p>
        </div>

        <div className="beans-container">
          {beans.map((bean) => (
            <motion.div 
              key={bean.id}
              className="bean-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to={`/product/${bean.id}`} className="bean-link">
                <div className="bean-image">
                  <img src={bean.image} alt={bean.name} />
                  <div className="bean-origin">{bean.origin}</div>
                </div>
                <div className="bean-content">
                  <h3>{bean.name}</h3>
                  <p className="bean-tasting">{bean.tasting}</p>
                  <p className="bean-price">AED {bean.price} / {bean.weight}</p>
                  <span className="view-details">Shop Now →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/menu?category=beans" className="btn btn-primary">Shop All Beans</Link>
        </div>
      </div>
    </section>
  );
}

// =============== GALLERY ===============
function Gallery() {
  const galleryImages = [
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
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
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={img} alt={`Brew & Bean Gallery ${index + 1}`} />
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

// =============== TESTIMONIALS ===============
function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Regular Customer",
      text: "Best coffee in Dubai! The atmosphere is perfect for working, and the baristas always remember my order. Their oat milk latte is heavenly.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108777-466d2a3b7c3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Michael Chen",
      role: "Coffee Enthusiast",
      text: "Finally found a place that takes their pour-over seriously. The Ethiopian Yirgacheffe is exceptional. A true specialty coffee spot.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Fatima Al Hashimi",
      role: "Food Blogger",
      text: "Their croissants are honestly better than some Parisian bakeries. Paired with their signature latte - absolute perfection!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="testimonials-section fade-in">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Our <span>Customers Say</span></h2>
          <p className="section-subtitle">Loved by coffee lovers across Dubai</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="testimonial-header">
                <img src={testimonial.image} alt={testimonial.name} />
                <div>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.role}</p>
                </div>
              </div>
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============== RESERVATION CTA ===============
function ReservationCTA() {
  const whatsappMessage = encodeURIComponent(
    "Hi! I'd like to reserve a table at Brew & Bean. Can you let me know availability?"
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
          Join Us for <span>Coffee</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="reservation-subtitle"
        >
          Whether you need a quiet workspace, a catch-up with friends, 
          or just the perfect cup of coffee - we're here for you.
          Reserve your spot today!
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
            Reserve via WhatsApp
          </a>
          <Link to="/reservation" className="btn btn-secondary">
            Book Online
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
          <i className="fas fa-phone"></i> Or call us: +971 4 123 4567
        </motion.a>
      </div>
    </section>
  );
}

// =============== PRODUCT DETAIL PAGE ===============
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Mock product data - in real app, this would come from an API
  useEffect(() => {
    // Simulate fetching product data
    const products = {
      '1': {
        id: 1,
        name: 'Signature Latte',
        description: 'Our signature latte is the perfect balance of rich espresso and creamy steamed milk, finished with a hint of our secret vanilla blend. Each cup is topped with beautiful latte art, making it as pleasing to the eye as it is to the palate.',
        longDescription: 'Made with our house espresso blend - a carefully crafted combination of beans from Brazil and Colombia, roasted to perfection. The milk is steamed to a microfoam consistency, creating a velvety smooth texture that complements the bold espresso. Our signature vanilla syrup is made in-house using real Madagascar vanilla beans.',
        price: 24,
        image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        category: 'coffee',
        sizes: ['Small', 'Regular', 'Large'],
        extras: ['Extra Shot', 'Soy Milk', 'Almond Milk', 'Oat Milk', 'Vanilla Syrup', 'Caramel Syrup'],
        nutritionalInfo: {
          calories: '180-250',
          caffeine: '75mg',
          fat: '8g',
          sugar: '12g'
        },
        ingredients: ['Espresso', 'Milk', 'Vanilla Syrup'],
        allergens: ['Dairy']
      },
      '2': {
        id: 2,
        name: 'Pour-Over Coffee',
        description: 'Single-origin Ethiopian Yirgacheffe, carefully brewed to highlight floral and citrus notes. Each cup is brewed to order, ensuring the perfect extraction and flavor profile.',
        longDescription: 'Our pour-over coffee is a craft process that highlights the unique characteristics of each bean. We use Ethiopian Yirgacheffe beans - known for their bright acidity and complex floral notes. The water is precisely heated to 96°C and poured in a slow, circular motion to ensure even extraction.',
        price: 28,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        category: 'coffee',
        sizes: ['Regular (250ml)', 'Large (350ml)'],
        extras: ['Extra beans', 'Grind on demand'],
        nutritionalInfo: {
          calories: '5',
          caffeine: '120mg',
          fat: '0g',
          sugar: '0g'
        },
        ingredients: ['Ethiopian Yirgacheffe beans', 'Filtered water'],
        allergens: ['None']
      },
      '3': {
        id: 3,
        name: 'Artisan Croissant',
        description: 'Buttery, flaky pastry filled with almond cream, baked fresh every morning. A perfect companion to any coffee.',
        longDescription: 'Our croissants are made using traditional French techniques with the highest quality French butter. The dough is folded six times to create 55 layers of buttery perfection. Each croissant is proofed for 12 hours and baked to a golden brown, resulting in a crisp exterior and soft, airy interior.',
        price: 18,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        category: 'pastry',
        sizes: ['Plain', 'Almond', 'Chocolate'],
        extras: ['Warm', 'With butter', 'With jam'],
        nutritionalInfo: {
          calories: '320',
          fat: '18g',
          carbs: '35g',
          protein: '6g'
        },
        ingredients: ['French butter', 'Flour', 'Sugar', 'Yeast', 'Salt', 'Almond cream (for almond variety)'],
        allergens: ['Gluten', 'Dairy', 'Nuts (almond variety)']
      },
      '101': {
        id: 101,
        name: 'Yirgacheffe Beans',
        description: 'Light roast coffee beans from Ethiopia. Floral, citrus, bergamot notes. 250g whole beans.',
        longDescription: 'These beans come from smallholder farmers in the Yirgacheffe region of Ethiopia, grown at elevations of 1,700-2,200 meters. The beans are naturally processed, resulting in a clean cup with pronounced floral and citrus notes. We roast them lightly to preserve these delicate flavors.',
        price: 65,
        image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        category: 'beans',
        weight: '250g',
        roast: 'Light',
        brewMethods: ['Pour-over', 'Aeropress', 'Chemex'],
        tastingNotes: ['Jasmine', 'Bergamot', 'Lemon', 'Honey'],
        nutritionalInfo: {
          serving: '18g (per cup)',
          caffeine: 'Variable',
          calories: '2 (per cup)'
        },
        ingredients: ['100% Arabica coffee beans'],
        allergens: ['None']
      },
      '102': {
        id: 102,
        name: 'Huila Beans',
        description: 'Medium roast coffee beans from Colombia. Caramel, chocolate, red apple notes. 250g whole beans.',
        price: 58,
        image: 'https://images.unsplash.com/photo-1559525839-b184a4dfd1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        category: 'beans',
        weight: '250g',
        roast: 'Medium',
        brewMethods: ['Espresso', 'French press', 'Moka pot'],
        tastingNotes: ['Caramel', 'Milk chocolate', 'Red apple', 'Brown sugar'],
        nutritionalInfo: {
          serving: '18g (per cup)',
          caffeine: 'Variable',
          calories: '2 (per cup)'
        },
        ingredients: ['100% Arabica coffee beans'],
        allergens: ['None']
      },
      '103': {
        id: 103,
        name: 'Cerrado Beans',
        description: 'Medium-dark roast coffee beans from Brazil. Nuts, chocolate, low acidity. 250g whole beans.',
        price: 52,
        image: 'https://images.unsplash.com/photo-1587049352851-5d630e214d7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        category: 'beans',
        weight: '250g',
        roast: 'Medium-Dark',
        brewMethods: ['Espresso', 'French press', 'Cold brew'],
        tastingNotes: ['Hazelnut', 'Dark chocolate', 'Peanut', 'Low acidity'],
        nutritionalInfo: {
          serving: '18g (per cup)',
          caffeine: 'Variable',
          calories: '2 (per cup)'
        },
        ingredients: ['100% Arabica coffee beans'],
        allergens: ['None']
      }
    };

    setProduct(products[id]);
  }, [id]);

  if (!product) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const whatsappMessage = encodeURIComponent(
    `I'd like to order:\n\n` +
    `${product.name} x ${quantity}\n` +
    `Price: AED ${product.price * quantity}\n\n` +
    `Please confirm availability and payment.`
  );

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-grid">
          {/* Product Image */}
          <motion.div 
            className="product-detail-image"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={product.image} alt={product.name} />
          </motion.div>

          {/* Product Info */}
          <motion.div 
            className="product-detail-info"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="product-category">{product.category}</span>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">AED {product.price}</p>
            
            {product.weight && <p className="product-weight">Weight: {product.weight}</p>}
            {product.roast && <p className="product-roast">Roast: {product.roast}</p>}

            {/* Quantity Selector */}
            <div className="product-quantity">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <a 
                href={`https://wa.me/971501234567?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary whatsapp-order-btn"
              >
                <i className="fab fa-whatsapp"></i>
                Order via WhatsApp
              </a>
              <Link to="/menu" className="btn btn-secondary">
                Back to Menu
              </Link>
            </div>

            {/* Product Tabs */}
            <div className="product-tabs">
              <div className="tab-headers">
                <button 
                  className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button 
                  className={`tab-header ${activeTab === 'details' ? 'active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
                <button 
                  className={`tab-header ${activeTab === 'nutrition' ? 'active' : ''}`}
                  onClick={() => setActiveTab('nutrition')}
                >
                  Nutrition
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'description' && (
                  <div className="tab-pane">
                    <p className="product-description">{product.description}</p>
                    {product.longDescription && (
                      <p className="product-long-description">{product.longDescription}</p>
                    )}
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="tab-pane">
                    {product.sizes && (
                      <div className="detail-section">
                        <h4>Available Sizes:</h4>
                        <ul>
                          {product.sizes.map((size, index) => (
                            <li key={index}>{size}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {product.extras && (
                      <div className="detail-section">
                        <h4>Add-ons:</h4>
                        <ul>
                          {product.extras.map((extra, index) => (
                            <li key={index}>{extra}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {product.brewMethods && (
                      <div className="detail-section">
                        <h4>Recommended Brew Methods:</h4>
                        <ul>
                          {product.brewMethods.map((method, index) => (
                            <li key={index}>{method}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {product.tastingNotes && (
                      <div className="detail-section">
                        <h4>Tasting Notes:</h4>
                        <ul>
                          {product.tastingNotes.map((note, index) => (
                            <li key={index}>{note}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="detail-section">
                      <h4>Ingredients:</h4>
                      <ul>
                        {product.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail-section">
                      <h4>Allergens:</h4>
                      <ul>
                        {product.allergens.map((allergen, index) => (
                          <li key={index}>{allergen}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'nutrition' && product.nutritionalInfo && (
                  <div className="tab-pane">
                    <div className="nutrition-table">
                      {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                        <div className="nutrition-row" key={key}>
                          <span className="nutrition-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                          <span className="nutrition-value">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// =============== SIMPLE MENU PAGE ===============
function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Check URL for category parameter
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setActiveCategory(category);
    }
  }, [location]);

  const categories = [
    { id: 'all', name: 'All Items', icon: '📋' },
    { id: 'coffee', name: 'Coffee', icon: '☕' },
    { id: 'specialty', name: 'Specialty Drinks', icon: '✨' },
    { id: 'pastry', name: 'Pastries', icon: '🥐' },
    { id: 'breakfast', name: 'Breakfast', icon: '🍳' },
    { id: 'cold', name: 'Cold Drinks', icon: '🧊' },
    { id: 'beans', name: 'Coffee Beans', icon: '🫘' },
  ];

  const menuItems = [
    // Coffee
    { id: 1, name: 'Signature Latte', description: 'Espresso with steamed milk and our secret vanilla blend', price: 24, category: 'coffee', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', popular: true },
    { id: 2, name: 'Pour-Over Coffee', description: 'Single-origin Ethiopian Yirgacheffe', price: 28, category: 'coffee', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', popular: true },
    { id: 4, name: 'Espresso', description: 'Double shot of our signature espresso blend', price: 16, category: 'coffee', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 5, name: 'Americano', description: 'Espresso shots topped with hot water', price: 18, category: 'coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 6, name: 'Cortado', description: 'Equal parts espresso and steamed milk', price: 20, category: 'coffee', image: 'https://images.unsplash.com/photo-1534685785745-60a2f0fd4ee1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    
    // Specialty Drinks
    { id: 7, name: 'Spanish Latte', description: 'Sweetened condensed milk with double espresso', price: 26, category: 'specialty', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 8, name: 'Matcha Latte', description: 'Ceremonial grade matcha with your choice of milk', price: 26, category: 'specialty', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 9, name: 'Turmeric Latte', description: 'Golden milk with turmeric, ginger, and honey', price: 24, category: 'specialty', image: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 10, name: 'Mocha', description: 'Espresso with house-made chocolate sauce', price: 26, category: 'specialty', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    
    // Pastries
    { id: 3, name: 'Artisan Croissant', description: 'Buttery, flaky pastry - plain or almond-filled', price: 18, category: 'pastry', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', popular: true },
    { id: 11, name: 'Cinnamon Roll', description: 'Freshly baked with cream cheese frosting', price: 20, category: 'pastry', image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 12, name: 'Chocolate Chip Cookie', description: 'Giant cookie with Belgian chocolate chunks', price: 12, category: 'pastry', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 13, name: 'Blueberry Muffin', description: 'Jumbo muffin with fresh blueberries', price: 16, category: 'pastry', image: 'https://images.unsplash.com/photo-1557958114-3d244020710a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    
    // Breakfast
    { id: 14, name: 'Avocado Toast', description: 'Sourdough with avocado, poached eggs, chili flakes', price: 42, category: 'breakfast', image: 'https://images.unsplash.com/photo-1603046891744-1f76eb10a0e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', popular: true },
    { id: 15, name: 'Breakfast Bowl', description: 'Greek yogurt, granola, fresh berries, honey', price: 38, category: 'breakfast', image: 'https://images.unsplash.com/photo-1511690078903-71dc5a49f5e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 16, name: 'Shakshuka', description: 'Poached eggs in spicy tomato sauce', price: 45, category: 'breakfast', image: 'https://images.unsplash.com/photo-1590412200988-4365e14c57e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 17, name: 'French Toast', description: 'Brioche with vanilla custard, maple syrup, berries', price: 44, category: 'breakfast', image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    
    // Cold Drinks
    { id: 18, name: 'Iced Latte', description: 'Espresso with milk and ice', price: 22, category: 'cold', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 19, name: 'Cold Brew', description: '12-hour slow-steeped cold brew', price: 24, category: 'cold', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', popular: true },
    { id: 20, name: 'Nitro Cold Brew', description: 'Cold brew infused with nitrogen', price: 28, category: 'cold', image: 'https://images.unsplash.com/photo-1593968313492-0f7ee37d0a74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 21, name: 'Iced Matcha', description: 'Matcha shaken with milk and ice', price: 26, category: 'cold', image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    
    // Coffee Beans
    { id: 101, name: 'Ethiopian Yirgacheffe', description: 'Light roast. Floral, citrus, bergamot. 250g', price: 65, category: 'beans', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 102, name: 'Colombian Huila', description: 'Medium roast. Caramel, chocolate. 250g', price: 58, category: 'beans', image: 'https://images.unsplash.com/photo-1559525839-b184a4dfd1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 103, name: 'Brazilian Cerrado', description: 'Medium-dark. Nuts, chocolate. 250g', price: 52, category: 'beans', image: 'https://images.unsplash.com/photo-1587049352851-5d630e214d7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-page">
      <div className="menu-hero">
        <div className="menu-hero-bg"></div>
        <div className="menu-hero-content">
          <h1 className="menu-hero-title">Our <span>Menu</span></h1>
          <p className="menu-hero-subtitle">Crafted with Passion, Served with Love</p>
        </div>
      </div>

      <div className="menu-container">
        {/* Search Bar */}
        <div className="menu-search">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <i className="fas fa-search search-icon"></i>
        </div>

        {/* Categories */}
        <div className="menu-categories">
          {categories.map((category) => (
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

        {/* Menu Items Grid */}
        <div className="menu-items-grid">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className="menu-item-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/product/${item.id}`} className="menu-item-link">
                <div className="menu-item-image">
                  <img src={item.image} alt={item.name} />
                  {item.popular && <span className="popular-badge">Popular</span>}
                </div>
                <div className="menu-item-content">
                  <h3 className="menu-item-name">{item.name}</h3>
                  <p className="menu-item-description">{item.description}</p>
                  <div className="menu-item-footer">
                    <span className="menu-item-price">AED {item.price}</span>
                    <span className="view-details">View Details →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="no-results">
            <p>No items found matching your search.</p>
          </div>
        )}
      </div>
    </div>
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
      <BaristaSection />
      <MenuPreview />
      <CoffeeBeansSection />
      <Gallery />
      <Testimonials />
      <ReservationCTA />
    </>
  );
}

function About() {
  return (
    <div className="page about-page">
      <div className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Our <span>Story</span></h1>
          <p className="page-hero-subtitle">A Journey of Coffee Excellence</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="story-section">
            <h2>The Brew & Bean Journey</h2>
            <p>
              Founded in 2018, Brew & Bean emerged from a shared vision between 
              master roaster James Chen and entrepreneur Layla Al-Mansoori. Their dream was 
              to create a coffee sanctuary where specialty coffee meets Middle Eastern 
              hospitality, redefining Dubai's cafe culture.
            </p>
            <p>
              From our humble beginnings in a small corner of Downtown Dubai, we've grown to become 
              a beloved neighborhood spot, recognized for our commitment to quality and sustainability. 
              Our direct trade relationships with farmers ensure ethical sourcing and the highest quality beans.
            </p>
            <p>
              Today, we roast our own beans in small batches, serve over 20 coffee varieties, and have
              trained some of the region's finest baristas. But our mission remains the same: to serve
              the perfect cup of coffee and create a warm, welcoming space for our community.
            </p>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2018</div>
              <div className="timeline-content">
                <h3>Grand Opening</h3>
                <p>Brew & Bean opens its doors in Downtown Dubai with just 8 seats</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h3>Specialty Coffee Recognition</h3>
                <p>Awarded "Best New Cafe" by Dubai Food Festival</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2022</div>
              <div className="timeline-content">
                <h3>Roastery Expansion</h3>
                <p>Opened our own micro-roastery for small-batch roasting</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h3>Regional Recognition</h3>
                <p>Featured in "Top 10 Coffee Shops in the Middle East" by Conde Nast</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h3>Second Location</h3>
                <p>Expanding to Dubai Marina - coming soon!</p>
              </div>
            </div>
          </div>

          <div className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <i className="fas fa-leaf"></i>
                <h3>Sustainability</h3>
                <p>100% direct trade, supporting farmers and the environment</p>
              </div>
              <div className="value-card">
                <i className="fas fa-heart"></i>
                <h3>Community</h3>
                <p>Creating a welcoming space for all coffee lovers</p>
              </div>
              <div className="value-card">
                <i className="fas fa-award"></i>
                <h3>Quality</h3>
                <p>Never compromising on the perfect cup</p>
              </div>
              <div className="value-card">
                <i className="fas fa-users"></i>
                <h3>Education</h3>
                <p>Sharing our coffee knowledge with customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryPage() {
  const galleryImages = [
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507133750040-4a8f57021571?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1574482620816-ae0f58d6a81e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <div className="gallery-page">
      <div className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Gallery</h1>
          <p className="page-hero-subtitle">Visual Journey Through Brew & Bean</p>
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
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={img} alt={`Brew & Bean Gallery ${index + 1}`} />
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
    "Hello! I have an inquiry about Brew & Bean Coffee Shop. ☕"
  );

  return (
    <div className="contact-page">
      <div className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Contact <span>Us</span></h1>
          <p className="page-hero-subtitle">We'd Love to Hear From You</p>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-card">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Visit Us</h3>
            <p>Downtown Dubai</p>
            <p>Sheikh Mohammed Bin Rashid Blvd</p>
            <p>Dubai, United Arab Emirates</p>
          </div>
          <div className="contact-card">
            <i className="fas fa-phone"></i>
            <h3>Call Us</h3>
            <p>+971 4 123 4567</p>
            <p>+971 50 123 4567 (WhatsApp)</p>
          </div>
          <div className="contact-card">
            <i className="fas fa-envelope"></i>
            <h3>Email Us</h3>
            <p>hello@brewandbean.com</p>
            <p>orders@brewandbean.com</p>
            <p>events@brewandbean.com</p>
          </div>
          <div className="contact-card">
            <i className="fas fa-clock"></i>
            <h3>Opening Hours</h3>
            <p>Monday - Friday: 7AM - 8PM</p>
            <p>Saturday: 8AM - 9PM</p>
            <p>Sunday: 8AM - 6PM</p>
          </div>
        </div>

        <div className="contact-cta">
          <h2>Connect With Us</h2>
          <p>For inquiries, orders, or just to say hello - we're always happy to chat!</p>
          
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
              <h3>Find Us Here</h3>
              <p>Downtown Dubai - Near Burj Khalifa</p>
              <small>Google Maps Integration</small>
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
    time: '10:00',
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
      `New Table Reservation Request - Brew & Bean\n\n` +
      `Name: ${formData.name}\n` +
      `Date: ${formData.date}\n` +
      `Time: ${formData.time}\n` +
      `Guests: ${formData.guests}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Occasion: ${formData.occasion || 'Not specified'}\n` +
      `Special Requests: ${formData.specialRequests || 'None'}`
    );
    
    window.open(`https://wa.me/971501234567?text=${message}`, '_blank');
  };

  const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  const guestOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <div className="reservation-page">
      <div className="reservation-hero">
        <div className="reservation-hero-bg"></div>
        <div className="reservation-hero-content">
          <h1 className="reservation-hero-title">Reserve a <span>Table</span></h1>
          <p className="reservation-hero-subtitle">Book your spot for the perfect coffee experience</p>
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
                  <option value="birthday">Birthday</option>
                  <option value="business">Business Meeting</option>
                  <option value="casual">Casual Meet-up</option>
                  <option value="date">Coffee Date</option>
                  <option value="study">Study Session</option>
                  <option value="celebration">Celebration</option>
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
                placeholder="Dietary restrictions, allergies, or special requests..."
                rows="4"
              />
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
            <li><i className="fas fa-check-circle"></i> Reservations are confirmed via WhatsApp</li>
            <li><i className="fas fa-check-circle"></i> 2-hour time limit for tables during peak hours</li>
            <li><i className="fas fa-check-circle"></i> Free Wi-Fi available for all guests</li>
            <li><i className="fas fa-check-circle"></i> Outdoor seating available (weather permitting)</li>
            <li><i className="fas fa-check-circle"></i> Children welcome anytime</li>
            <li><i className="fas fa-check-circle"></i> Street parking available nearby</li>
            <li><i className="fas fa-check-circle"></i> 24-hour cancellation policy</li>
          </ul>

          <div className="reservation-tip">
            <h4>💡 Tip</h4>
            <p>Book at least 2 days in advance for weekend visits! Walk-ins always welcome subject to availability.</p>
          </div>
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
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </AnimatePresence>
      <WhatsAppButton />
      <Footer />
    </>
  );
}

export default App;