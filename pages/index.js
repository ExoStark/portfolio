import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Advanced Portfolio</title>
        <meta name="description" content="Next.js animated portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CustomCursor cursorPosition={cursorPosition} />
      
      <div className="container">
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <main className="main-content">
          <AnimatePresence mode="wait">
            {activeSection === 'hero' && <HeroSection key="hero" />}
            {activeSection === 'about' && <AboutSection key="about" />}
            {activeSection === 'projects' && <ProjectsSection key="projects" />}
            {activeSection === 'contact' && <ContactSection key="contact" />}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

const LoadingScreen = () => {
  return (
    <motion.div 
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="loading-spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <div className="spinner-circle"></div>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Loading Portfolio
      </motion.h2>
    </motion.div>
  );
};

const CustomCursor = ({ cursorPosition }) => {
  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{
          x: cursorPosition.x - 4,
          y: cursorPosition.y - 4,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      />
      <motion.div
        className="cursor-outline"
        animate={{
          x: cursorPosition.x - 20,
          y: cursorPosition.y - 20,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 150 }}
      />
    </>
  );
};

const Navigation = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="navigation">
      <ul>
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveSection(item.id)}
              className={activeSection === item.id ? 'active' : ''}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  className="nav-indicator"
                  layoutId="nav-indicator"
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <motion.section
      className="section hero"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hero-title"
        >
          <span className="gradient-text">CREATIVE</span> DEVELOPER
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="hero-subtitle"
        >
          I build immersive digital experiences with cutting-edge technology
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="hero-cta"
        >
          <button className="cta-button">View My Work</button>
          <button className="cta-button secondary">Contact Me</button>
        </motion.div>
      </div>
      
      <motion.div 
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="floating-shapes">
          <motion.div 
            className="shape shape-1"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="shape shape-2"
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <motion.div 
            className="shape shape-3"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 8, 0]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

const AboutSection = () => {
  const skills = [
    { name: 'Next.js', level: 90 },
    { name: 'React', level: 95 },
    { name: 'Animation', level: 85 },
    { name: 'UI/UX Design', level: 80 },
    { name: 'Three.js', level: 75 },
    { name: 'Node.js', level: 85 },
  ];

  return (
    <motion.section
      className="section about"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2>About Me</h2>
      
      <div className="about-content">
        <motion.div 
          className="about-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p>
            I'm a passionate frontend developer specializing in creating 
            immersive digital experiences with cutting-edge technology. 
            With over 5 years of experience, I blend design and code to 
            build performant, accessible, and beautiful web applications.
          </p>
          <p>
            My expertise includes React, Next.js, advanced CSS animations, 
            3D rendering with Three.js, and creating responsive, user-friendly 
            interfaces that leave a lasting impression.
          </p>
        </motion.div>
        
        <motion.div 
          className="skills"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Skills</h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                className="skill-item"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="skill-header">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div 
                    className="skill-progress"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: '3D E-Commerce Experience',
      description: 'An immersive shopping experience with WebGL and Three.js',
      tags: ['Next.js', 'Three.js', 'Framer Motion'],
    },
    {
      id: 2,
      title: 'AI Portfolio Generator',
      description: 'AI-powered tool that creates personalized portfolios',
      tags: ['React', 'AI', 'Node.js'],
    },
    {
      id: 3,
      title: 'Interactive Data Visualization',
      description: 'Real-time data dashboard with animated charts',
      tags: ['D3.js', 'WebSockets', 'SVG'],
    },
    {
      id: 4,
      title: 'AR Product Preview',
      description: 'Web-based AR for product visualization',
      tags: ['WebXR', 'Three.js', 'AR'],
    },
  ];

  return (
    <motion.section
      className="section projects"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Featured Projects</h2>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className="project-image">
              <div className="project-overlay">
                <button className="project-button">View Project</button>
              </div>
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const ContactSection = () => {
  return (
    <motion.section
      className="section contact"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Get In Touch</h2>
      
      <div className="contact-content">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="contact-form"
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5"></textarea>
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </motion.form>
        
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Contact Information</h3>
          <p>Feel free to reach out for collaboration or just to say hello!</p>
          
          <div className="contact-details">
            <div className="contact-item">
              <strong>Email:</strong> hello@portfolio.com
            </div>
            <div className="contact-item">
              <strong>Location:</strong> San Francisco, CA
            </div>
            <div className="contact-item">
              <strong>Availability:</strong> Currently available for freelance
            </div>
          </div>
          
          <div className="social-links">
            <a href="#" className="social-link">GitHub</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Dribbble</a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
