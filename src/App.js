import React, { useState, useEffect } from 'react';
import './App.css';
import { Analytics } from "@vercel/analytics/react"; // This line was already present

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem('darkMode');
      let initialDarkMode = false;
      
      if (savedTheme !== null) {
        initialDarkMode = JSON.parse(savedTheme);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        initialDarkMode = prefersDark;
        localStorage.setItem('darkMode', JSON.stringify(initialDarkMode));
      }
      
      setDarkMode(initialDarkMode);
      
      // Apply theme immediately to prevent flash
      if (initialDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    initializeTheme();
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const experiences = [
    {
      title: "Project Employee",
      company: "Nurol Teknoloji",
      period: "May 2025 - Present",
      location: "Ankara",
      description: "Current role focusing on innovative technology solutions."
    },
    {
      title: "Artificial Intelligence Intern", 
      company: "Powea",
      period: "November 2024 - Present",
      location: "Istanbul",
      description: "Developed Voice Recorder Application using React Native Expo. Created comprehensive AI Image Detection System leveraging AppSheet, BigQuery, and Flask. Performed exploratory data analysis, feature engineering, and ML pipeline construction."
    },
    {
      title: "McKinsey Forward Program Scholar",
      company: "McKinsey & Company", 
      period: "April 2025 - May 2025",
      location: "Global",
      description: "Participated in prestigious leadership development program."
    },
    {
      title: "AI Trainer",
      company: "Outlier",
      period: "February 2025 - May 2025", 
      location: "Los Angeles, California",
      description: "Specialized in natural language processing and machine learning, focusing on developing and refining training data to improve AI model accuracy and efficiency."
    },
    {
      title: "Software Development Specialist",
      company: "NovaSisTek | NovaSysTec",
      period: "July 2024 - May 2025",
      location: "Ankara",
      description: "Developed mobile applications using Kotlin and Java. Participated in rigorous code reviews and collaborated with designers and backend developers to deliver refined application features."
    }
  ];

  const projects = [
    {
      title: "MRI-Based Brain Tumor Detection System",
      period: "April 2025 - May 2025",
      description: "AI-powered application designed to assist patients and doctors by providing a user-friendly platform for analyzing brain scan images. Features secure image handling, multi-format support, and clear interface leveraging AI and database for robust performance.",
      technologies: ["Python", "React Native", "ResNet", "AI/ML", "Medical Imaging"]
    },
    {
      title: "Traffic Violation Detection System", 
      period: "February 2025 - May 2025",
      description: "Python-based application designed to analyze traffic video streams, detect traffic light states, track vehicles using YOLO, and identify red light violations with interactive calibration process.",
      technologies: ["Python", "YOLO", "Computer Vision", "Video Processing"]
    },
    {
      title: "Voice Recorder Application",
      period: "2024",
      description: "Developed using React Native Expo with AppSheet UI components to ensure intuitive and user-friendly experience.",
      technologies: ["React Native", "Expo", "AppSheet", "Mobile Development"]
    }
  ];

  const skills = {
    "Programming Languages": ["Python", "Java", "Kotlin", "JavaScript"],
    "Frameworks & Libraries": ["React Native", "Flask", "Expo"],
    "AI & Machine Learning": ["Natural Language Processing", "Deep Learning", "Computer Vision", "YOLO", "ResNet"],
    "Tools & Platforms": ["AppSheet", "BigQuery", "Git", "JIRA"],
    "Databases": ["SQL", "Data Processing"],
    "Soft Skills": ["Project Management", "Code Review", "Team Collaboration", "Quality Assurance"]
  };

  const education = [
    {
      degree: "Bachelor of Applied Science - Computer Science",
      institution: "Karkonoska Akademia Nauk Stosowanych w Jeleniej",
      period: "September 2024 - February 2025",
      location: "Poland"
    },
    {
      degree: "Bachelor of Engineering - Computer Engineering", 
      institution: "OSTİM Teknik Üniversitesi",
      period: "October 2021 - June 2025",
      location: "Ankara, Turkey"
    },
    {
      degree: "Aspire Leaders Program",
      institution: "Aspire Institute", 
      period: "March 2025 - May 2025",
      location: "Global"
    }
  ];

  const certifications = [
    "AI [Tomorrow Summit] 2025 - AIPA",
    "Certificate of Completion - Aspire Institute",
    "English Placement Test - European Commission",
    "GEODI Summer Workshop - DECE Software",
    "Software Quality Assurance Training",
    "Python Programming Series (101-401) - Turkcell",
    "Certified Associate In Scrum Fundamentals™",
    "Machine Learning and Image Processing - Cisco",
    "Artificial Intelligence for Everyone I & II - METU"
  ];

  const themeClasses = {
    nav: darkMode ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-white/95 backdrop-blur-sm shadow-lg',
    navText: darkMode ? 'text-white' : 'text-gray-900',
    navButton: (section) => darkMode 
      ? `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          activeSection === section
            ? 'bg-blue-500 text-white'
            : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
        }`
      : `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          activeSection === section
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
        }`,
    body: darkMode ? 'bg-gray-900' : 'bg-white',
    section: darkMode ? 'bg-gray-800' : 'bg-gray-50',
    card: darkMode ? 'bg-gray-700 text-white shadow-xl' : 'bg-white shadow-lg',
    text: darkMode ? 'text-gray-300' : 'text-gray-700',
    heading: darkMode ? 'text-white' : 'text-gray-900',
    subheading: darkMode ? 'text-blue-400' : 'text-blue-600',
    border: darkMode ? 'border-gray-600' : 'border-gray-200'
  };

  return (
    <div className={`min-h-screen ${themeClasses.body} transition-colors duration-300`}>
      <Analytics /> {/* Vercel Analytics component added here */}
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 ${themeClasses.nav} z-50 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className={`text-2xl font-bold ${themeClasses.navText}`}>Barış Güngör</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-baseline space-x-4">
                {['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={themeClasses.navButton(section)}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
            {/* Mobile menu and theme toggle - improved visibility */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-lg transition-colors duration-200 flex items-center justify-center ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400 border border-gray-600' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-300'
                }`}
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden" // MODIFIED: Removed image bg classes, added overflow-hidden
      >
        {/* ADDED: Video element */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover -z-10"
        >
          {/* The path to the video in the public folder */}
          <source src={process.env.PUBLIC_URL + '/11904054_2560_1440_24fps.mp4'} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        
        {/* ADDED: Overlay div for text readability, similar to the previous linear-gradient */}
        {/* This creates a semi-transparent black layer over the video */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-0"></div>

        {/* Content container: Ensure it's positioned above the video and overlay. */}
        {/* The 'relative' class here helps ensure the z-index behaves as expected. */}
        <div className="text-center text-white z-10 px-4 relative"> 
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Barış Güngör
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-8 text-blue-200">
            Software Heritage Ambassador & AI Specialist
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Passionate Software Development Specialist leveraging Python, React Native, and Natural Language Processing 
            to develop innovative solutions across various industries.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button
              onClick={() => scrollToSection('about')}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Learn More About Me
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-block border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className={`py-20 relative bg-cover bg-center bg-no-repeat transition-colors duration-300 ${
          darkMode ? 'bg-gray-800' : ''
        }`}
        style={{
          backgroundImage: darkMode 
            ? `linear-gradient(rgba(31, 41, 55, 0.9), rgba(31, 41, 55, 0.9)), url('https://images.unsplash.com/photo-1594235048794-fae8583a5af5')`
            : `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('https://images.unsplash.com/photo-1594235048794-fae8583a5af5')`
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${themeClasses.heading} mb-6`}>About Me</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className={`text-lg ${themeClasses.text} leading-relaxed`}>
                As a Software Development Specialist, I leverage my skills in Python, React Native, and Natural Language Processing (NLP) 
                to develop innovative solutions for various industries. I have a strong educational background in Computer Science and Engineering, 
                with certifications in Artificial Intelligence and Automation with Python.
              </p>
              <p className={`text-lg ${themeClasses.text} leading-relaxed`}>
                I am passionate about applying my knowledge and skills to create value for organizations and society. 
                Currently serving as a Software Heritage Ambassador, I'm committed to advancing open-source software 
                preservation and contributing to the global technology community.
              </p>
              <p className={`text-lg ${themeClasses.text} leading-relaxed`}>
                My experience spans across AI/ML development, mobile application development, and software quality assurance, 
                with a particular focus on creating user-friendly, efficient, and innovative solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className={`${themeClasses.card} p-6 rounded-lg text-center transition-colors duration-300`}>
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className={`${themeClasses.text}`}>Certifications</div>
              </div>
              <div className={`${themeClasses.card} p-6 rounded-lg text-center transition-colors duration-300`}>
                <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
                <div className={`${themeClasses.text}`}>Professional Memberships</div>
              </div>
              <div className={`${themeClasses.card} p-6 rounded-lg text-center transition-colors duration-300`}>
                <div className="text-3xl font-bold text-blue-600 mb-2">3+</div>
                <div className={`${themeClasses.text}`}>Major Projects</div>
              </div>
              <div className={`${themeClasses.card} p-6 rounded-lg text-center transition-colors duration-300`}>
                <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
                <div className={`${themeClasses.text}`}>Degrees in Progress</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 ${themeClasses.section} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${themeClasses.heading} mb-6`}>Professional Experience</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className={`${themeClasses.card} rounded-lg p-8 hover:shadow-xl transition-all duration-300`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className={`text-xl font-bold ${themeClasses.heading}`}>{exp.title}</h3>
                    <h4 className={`text-lg font-semibold ${themeClasses.subheading}`}>{exp.company}</h4>
                  </div>
                  <div className="text-right">
                    <div className={`${themeClasses.text} font-medium`}>{exp.period}</div>
                    <div className={`${themeClasses.text} opacity-75`}>{exp.location}</div>
                  </div>
                </div>
                <p className={`${themeClasses.text} leading-relaxed`}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className="py-20 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: darkMode 
            ? `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1551288049-bebda4e38f71')`
            : `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1551288049-bebda4e38f71')`
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Featured Projects</h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-blue-600 font-medium mb-3">{project.period}</p>
                <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${themeClasses.heading} mb-6`}>Technical Skills</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div key={index} className={`${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600' 
                  : 'bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100'
              } rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                <h3 className={`text-xl font-bold ${themeClasses.heading} mb-4 text-center`}>{category}</h3>
                <ul className="space-y-2">
                  {skillList.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className={`${themeClasses.text}`}>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className={`py-20 ${themeClasses.section} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${themeClasses.heading} mb-6`}>Education & Certifications</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <h3 className={`text-2xl font-bold ${themeClasses.heading} mb-6`}>Education</h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className={`${themeClasses.card} rounded-lg p-6 transition-colors duration-300`}>
                    <h4 className={`text-lg font-bold ${themeClasses.heading}`}>{edu.degree}</h4>
                    <h5 className={`${themeClasses.subheading} font-semibold`}>{edu.institution}</h5>
                    <p className={`${themeClasses.text}`}>{edu.period}</p>
                    <p className={`${themeClasses.text} opacity-75`}>{edu.location}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Certifications */}
            <div>
              <h3 className={`text-2xl font-bold ${themeClasses.heading} mb-6`}>Key Certifications</h3>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className={`${themeClasses.card} rounded-lg p-4 flex items-center transition-colors duration-300`}>
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                    <span className={`${themeClasses.text}`}>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-900'} text-white`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-gray-300 text-lg mb-8">
                I'm always interested in new opportunities, collaborations, and innovative projects. 
                Feel free to reach out if you'd like to discuss technology, AI, or potential partnerships.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xs font-bold">📍</span>
                  </div>
                  <span>Ankara, Turkey</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xs font-bold">🌐</span>
                  </div>
                  <span>Open to Remote & Global Opportunities</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Professional Links</h3>
              <div className="space-y-4">
                <a 
                  href="https://www.linkedin.com/in/barisgungor10/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-blue-600 hover:bg-blue-700 rounded-lg p-4 transition-colors duration-300"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">💼</span>
                    <div>
                      <div className="font-semibold">LinkedIn Profile</div>
                      <div className="text-blue-200">Connect with me professionally</div>
                    </div>
                  </div>
                </a>
                
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-800'} rounded-lg p-4`}>
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">🏛️</span>
                    <div>
                      <div className="font-semibold">Software Heritage Ambassador</div>
                      <div className="text-gray-300">Contributing to open-source preservation</div>
                    </div>
                  </div>
                </div>
                
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-800'} rounded-lg p-4`}>
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">🎓</span>
                    <div>
                      <div className="font-semibold">Professional Memberships</div>
                      <div className="text-gray-300">Royal Aeronautical Society, NSPE, ISEA, IAENG</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-black' : 'bg-black'} text-white py-8`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 Barış Güngör. Built with React and Tailwind CSS.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Software Heritage Ambassador | AI Specialist | Software Developer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
