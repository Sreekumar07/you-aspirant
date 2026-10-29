import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowDown, CheckCircle2 } from "lucide-react";
import "./App.css";

const WHATSAPP_NUMBER = ""; // Add your WhatsApp number with country code, digits only, e.g. 919876543210.

const careers = [
  { title: "Software Developer", category: "IT & Software", description: "Build useful software, solve real-world problems, and turn ideas into working applications.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85", skills: ["Programming", "Problem solving", "Git"], icon: "⌘", level: "Build projects" },
  { title: "Full-Stack Developer", category: "IT & Software", description: "Create complete web applications by working with both the front end and back end.", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=85", skills: ["HTML/CSS", "JavaScript", "APIs"], icon: "{ }", level: "Build full projects" },
  { title: "AI & Machine Learning Engineer", category: "IT & Software", description: "Explore intelligent applications, train models, and use data to build AI-powered tools.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85", skills: ["Python", "Machine learning", "Maths"], icon: "✳", level: "Technical pathway" },
  { title: "Data Scientist", category: "IT & Software", description: "Use programming and statistics to find patterns, test ideas, and make predictions from data.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85", skills: ["Python", "Statistics", "SQL"], icon: "∑", level: "Analytical pathway" },
  { title: "Cybersecurity Engineer", category: "IT & Software", description: "Help protect applications, networks, and digital information by learning security fundamentals.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=85", skills: ["Networking", "Security", "Linux"], icon: "⌑", level: "Technical pathway" },
  { title: "Cloud & DevOps Engineer", category: "IT & Software", description: "Help teams deploy, automate, and operate reliable applications and cloud services.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85", skills: ["Linux", "Cloud basics", "Automation"], icon: "☁", level: "Technical pathway" },
  { title: "UI/UX Designer", category: "Design & Creative", description: "Research user needs and design clear, accessible digital experiences and prototypes.", image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=900&q=85", skills: ["Figma", "User research", "Prototyping"], icon: "✳", level: "Portfolio based" },
  { title: "Web Designer", category: "Design & Creative", description: "Shape the layout, visual style, and responsive experience of modern websites.", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=85", skills: ["Layout", "Typography", "Responsive design"], icon: "▣", level: "Portfolio based" },
  { title: "Graphic Designer", category: "Design & Creative", description: "Create visual identities, posters, social graphics, and brand communication materials.", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=85", skills: ["Typography", "Branding", "Composition"], icon: "◈", level: "Portfolio based" },
  { title: "Product Designer", category: "Design & Creative", description: "Connect user needs, product strategy, and visual design to improve digital products.", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=85", skills: ["Research", "Wireframes", "Prototyping"], icon: "◇", level: "Portfolio based" },
  { title: "3D Artist & Animator", category: "Design & Creative", description: "Create dimensional objects, characters, motion, and visual stories using 3D tools.", image:"https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=900&q=80",skills: ["3D modelling", "Lighting", "Animation"], icon: "✧", level: "Portfolio based" },
  { title: "Game Designer", category: "Design & Creative", description: "Design game mechanics, levels, interactions, and player experiences for digital games.", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=85", skills: ["Game mechanics", "Storytelling", "Prototyping"], icon: "◉", level: "Prototype based" },
];

const questions = [
  {
    question: "Which kind of challenge sounds more exciting?",
    options: [
      { label: "Solving a problem with code", type: "technology" },
      { label: "Designing an app or visual experience", type: "design" },
    ],
  },
  {
    question: "What would you most enjoy building?",
    options: [
      { label: "A website, app, or useful tool", type: "technology" },
      { label: "A polished interface, brand, or 3D scene", type: "design" },
    ],
  },
  {
    question: "Which activity would you practise after class?",
    options: [
      { label: "Coding challenges and CSE competitions", type: "technology" },
      { label: "Design challenges and portfolio projects", type: "design" },
    ],
  },
];

const services = [
  {
    number: "01",
    icon: "◎",
    title: "Career guidance",
    text: "Explore career options, reflect on your interests, and identify practical next steps.",
    tag: "Find direction",
  },
  {
    number: "02",
    icon: "⌘",
    title: "Skill development",
    text: "Identify skills to practise and build confidence through learning and small projects.",
    tag: "Build skills",
  },
  {
    number: "03",
    icon: "↗",
    title: "Career preparation",
    text: "Explore ways to prepare for opportunities, communicate your strengths, and keep learning.",
    tag: "Move forward",
  },
];

const journeySteps = [
  { number: "01", icon: "◎", title: "Know yourself", text: "Reflect on your interests, strengths, and what matters to you." },
  { number: "02", icon: "⌕", title: "Explore options", text: "Research roles, qualifications, and real-world career paths." },
  { number: "03", icon: "↗", title: "Build a skill", text: "Choose one skill and practise it through a small project." },
  { number: "04", icon: "✳", title: "Keep moving", text: "Review your progress, learn from experience, and adapt." },
];

const faqs = [
  {
    question: "What is You Aspirant?",
    answer: "This website is designed to help visitors explore career possibilities, reflect on their interests, and identify possible next steps. Replace this description with your company's verified mission and service details before launch.",
  },
  {
    question: "Is the career quiz a professional assessment?",
    answer: "No. The quiz is a simple starting point for exploration, not a scientific or professional assessment. Use its suggestions as ideas to research further.",
  },
  {
    question: "Do I need experience to explore careers?",
    answer: "Not at all. Start by exploring careers, identifying skills you want to develop, and trying beginner-friendly learning resources and projects.",
  },
  {
    question: "How do I choose the right career?",
    answer: "Consider your interests, strengths, values, and opportunities. Research real job requirements and speak with people who work in fields you are considering.",
  },
  {
    question: "How can I contact You Aspirant?",
    answer: "Use the enquiry form on this page. For real enquiries, connect the form to a backend or form service before publishing the website.",
  },
];

function Logo() {
  return (
    <a className="brand" href="#home" aria-label="You Aspirant home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 44 44" fill="none">
          <path d="M22 4L39 14V30L22 40L5 30V14L22 4Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 14L22 25L32 14M22 25V34" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="22" cy="10" r="2" fill="currentColor" />
        </svg>
      </span>
      <span className="brand-name">
        YOU<span>ASPIRANT</span>
        <small>YOUR FUTURE STARTS HERE</small>
      </span>
    </a>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function StudyBuddy({ onClose, onExplore, onQuiz }) {
  return (
    <aside className="buddy-panel" aria-label="Aspirant Buddy tips">
      <button className="buddy-close" type="button" onClick={onClose} aria-label="Close buddy tips">×</button>
      <div className="buddy-panel-head">
        <span className="buddy-mini-avatar" aria-hidden="true">✦</span>
        <div><strong>Hi, I'm Bytey!</strong><small>Your coding & design buddy</small></div>
      </div>
      <p>Not sure where to begin? You don't need your whole future planned today. Let's try a coding challenge or a creative project.</p>
      <button className="buddy-action" type="button" onClick={onQuiz}>Find a starting point <span>→</span></button>
      <button className="buddy-secondary" type="button" onClick={onExplore}>Explore career ideas</button>
    </aside>
  );
}

function BuddyMascot() {
  return (
    <svg className="buddy-svg" viewBox="0 0 120 120" role="img" aria-label="Bytey, a friendly 3D-style cartoon coding and design companion">
      <defs>
        <linearGradient id="bytey-body" x1="22" y1="22" x2="96" y2="104" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f1ffd4" />
          <stop offset=".48" stopColor="#b9ee72" />
          <stop offset="1" stopColor="#65bd67" />
        </linearGradient>
        <linearGradient id="bytey-face" x1="38" y1="38" x2="83" y2="89" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e8f3ff" />
        </linearGradient>
        <linearGradient id="bytey-cap" x1="29" y1="18" x2="91" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#b4a6ff" />
          <stop offset=".55" stopColor="#8272f4" />
          <stop offset="1" stopColor="#5544c7" />
        </linearGradient>
        <radialGradient id="bytey-shine" cx="0" cy="0" r="1" gradientTransform="translate(43 37) rotate(54) scale(26 18)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity=".85" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="bytey-shadow" x="8" y="10" width="104" height="108" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#1b2540" floodOpacity=".24" />
        </filter>
      </defs>
      <ellipse cx="60" cy="108" rx="29" ry="6" fill="#20283a" opacity=".16" />
      <g filter="url(#bytey-shadow)">
        <path d="M27 57c0-20 13-34 33-34s33 14 33 34v27c0 14-14 23-33 23S27 98 27 84V57Z" fill="url(#bytey-body)" stroke="#20283a" strokeWidth="3" />
        <path d="M34 57c0-15 10-26 26-26s26 11 26 26v22c0 10-11 17-26 17S34 89 34 79V57Z" fill="url(#bytey-face)" />
        <path d="M34 56c2-13 10-22 21-24-7 7-10 17-9 29 1 11 5 22 13 30-15 0-25-8-25-19V56Z" fill="url(#bytey-shine)" />
        <ellipse cx="48" cy="62" rx="5.4" ry="7.2" fill="#20283a" />
        <ellipse cx="72" cy="62" rx="5.4" ry="7.2" fill="#20283a" />
        <ellipse cx="49.5" cy="59.5" rx="1.8" ry="2.4" fill="#ffffff" />
        <ellipse cx="73.5" cy="59.5" rx="1.8" ry="2.4" fill="#ffffff" />
        <path d="M49 75c6 7 16 7 22 0" fill="none" stroke="#20283a" strokeWidth="3.2" strokeLinecap="round" />
        <ellipse cx="39.5" cy="72" rx="5.2" ry="3.5" fill="#ff9eaa" opacity=".78" />
        <ellipse cx="80.5" cy="72" rx="5.2" ry="3.5" fill="#ff9eaa" opacity=".78" />
        <path d="M21 35 60 18 99 35 60 52 21 35Z" fill="url(#bytey-cap)" stroke="#20283a" strokeWidth="3" strokeLinejoin="round" />
        <path d="M36 42v10c12 9 36 9 48 0V42L60 52 36 42Z" fill="#7969e8" stroke="#20283a" strokeWidth="3" strokeLinejoin="round" />
        <path d="M32 32 60 21 87 33 60 44 32 32Z" fill="#ffffff" opacity=".18" />
        <path d="M98 35v19" stroke="#20283a" strokeWidth="3" strokeLinecap="round" />
        <circle cx="98" cy="57" r="5" fill="#ffce69" stroke="#20283a" strokeWidth="2.5" />
        <path d="M27 80q-11 2-12 13M93 80q11 2 12 13" fill="none" stroke="#65bd67" strokeWidth="9" strokeLinecap="round" />
        <path d="M27 80q-11 2-12 13M93 80q11 2 12 13" fill="none" stroke="#20283a" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M45 103v5M75 103v5" stroke="#20283a" strokeWidth="6" strokeLinecap="round" />
      </g>
      <path d="m15 48 2.4 5.2 5.2 2.4-5.2 2.4-2.4 5.2-2.4-5.2-5.2-2.4 5.2-2.4 2.4-5.2Z" fill="#8c7cf6" />
      <path d="m105 69 2 4.5 4.5 2-4.5 2-2 4.5-2-4.5-4.5-2 4.5-2 2-4.5Z" fill="#ffce69" />
      <circle cx="18" cy="75" r="2" fill="#8c7cf6" opacity=".8" />
    </svg>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("ya-theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [buddyOpen, setBuddyOpen] = useState(false);
  const [careerFilter, setCareerFilter] = useState("All");
  const [careerSearch, setCareerSearch] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [contactStatus, setContactStatus] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("ya-theme", theme);
    } catch {
      // Theme remains functional when storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    document.title = "You Aspirant | IT, Coding Competitions & Design";
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }
    description.content = "Explore IT and creative careers, prepare for CSE coding competitions, and build projects and design portfolios with You Aspirant.";
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement("meta");
      themeColor.name = "theme-color";
      document.head.appendChild(themeColor);
    }
    themeColor.content = theme === "dark" ? "#080b14" : "#f7f8fc";
  }, [theme]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const careerFilters = useMemo(
    () => ["All", ...new Set(careers.map((career) => career.category))],
    []
  );

  const filteredCareers = useMemo(() => {
    const query = careerSearch.trim().toLowerCase();
    return careers.filter((career) => {
      const matchesCategory = careerFilter === "All" || career.category === careerFilter;
      const searchable = [career.title, career.category, career.description, ...career.skills].join(" ").toLowerCase();
      return matchesCategory && searchable.includes(query);
    });
  }, [careerFilter, careerSearch]);

  const whatsappUrl = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello You Aspirant, I would like to know more about your career guidance services.")}`
    : "";

  function chooseAnswer(type) {
    const updatedAnswers = [...answers.slice(0, questionIndex), type];
    setAnswers(updatedAnswers);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      return;
    }

    const counts = updatedAnswers.reduce((result, answer) => {
      result[answer] = (result[answer] || 0) + 1;
      return result;
    }, {});
    const maxCount = Math.max(...Object.values(counts));
    const tiedTypes = Object.keys(counts).filter((key) => counts[key] === maxCount);
    const results = {
      technology: "Full-Stack Developer",
      design: "UI/UX Designer",
    };
    setQuizResult(tiedTypes.length === 1 ? results[tiedTypes[0]] : "A few paths to explore");
  }

  function resetQuiz() {
    setQuestionIndex(0);
    setAnswers([]);
    setQuizResult("");
  }

  function goToPreviousQuestion() {
    if (questionIndex > 0) {
      setQuestionIndex((current) => current - 1);
      setAnswers((current) => current.slice(0, questionIndex - 1));
    }
  }

  function handleContactSubmit(event) {
    event.preventDefault();
    // Demo-only behavior. Connect this handler to a backend before collecting real enquiries.
    setContactStatus("demo");
  }

  function updateField(event) {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    if (contactStatus) setContactStatus("");
  }

  return (
    <div className={`app theme-${theme}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <div className="container nav-container">
          <Logo />
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? "✕" : "☰"}</span>
          </button>

          <nav id="primary-navigation" className={`nav-links ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
            {[
              ["Home", "#home"],
              ["Services", "#services"],
              ["Skill building", "#skills"],
              ["Explore careers", "#careers"],
              ["Career quiz", "#assessment"],
              ["Student stories", "#stories"],
              ["About", "#about"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              type="button"
              onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
              <span className="theme-label">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
            <a className="button button-small" href="#contact">Talk to us <Arrow /></a>
          </div>
        </div>
      </header>

      <main id="main-content">
        
<section className="hero-section hero-bytey-section" id="home">
  <div className="hero-bytey-overlay" />

  <div className="container hero-bytey-content">
    <div className="hero-content">
      <span className="eyebrow">
        <span className="status-dot" />
        LEARN / EXPLORE / BUILD YOUR FUTURE
      </span>

      <h1>
        Dream Beyond.
        <br />
        <span className="gradient-text">Become More.</span>
      </h1>

      <p className="hero-description">
        Meet Bytey, your AI learning companion. Explore careers,
        build skills, and discover the future you want to create.
      </p>

      <div className="hero-actions">
        <a className="button button-primary" href="#journey">
          Start Your Journey <ArrowRight size={18} />
        </a>
        
        <a className="button button-secondary" href="#careers">
           Explore Careers
        </a>
      </div>

      <p className="hero-note">
        <CheckCircle2 size={16} />
        Your potential has no limits.
      </p>
    </div>
  </div>

  <a
  className="scroll-indicator"
  href="#services"
  aria-label="Scroll to our services"
>
  <ArrowDown size={18} />
</a>
</section>


        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading reveal">
              <div><div className="eyebrow">HOW WE CAN HELP</div><h2>Support for your <span className="gradient-text">next step.</span></h2></div>
              <p>Explore focused support for IT skills, coding competitions, creative design, and portfolio building. Customize these service descriptions to match your actual offerings.</p>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card reveal" key={service.number}>
                  <div className="service-card-top"><span className="service-icon">{service.icon}</span><span className="service-number">{service.number}</span></div>
                  <span className="service-tag">{service.tag}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <a href="#contact" className="text-link">Ask about this <span aria-hidden="true">→</span></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="container">
            <div className="section-heading reveal">
              <div><div className="eyebrow">PREPARE FOR WHAT'S NEXT</div><h2>Skills that turn <span className="gradient-text">ambition into action.</span></h2></div>
              <p>Build a practical foundation with small projects, repeatable habits, and career preparation you can work on step by step.</p>
            </div>
            <div className="skills-feature-grid">
              <article className="skills-feature skills-feature-main reveal">
                <div className="skills-feature-kicker"><span>01</span><span>THE SKILL LAB</span></div>
                <div className="skills-feature-graphic" aria-hidden="true"><span className="skill-orb skill-orb-a">{`{ }`}</span><span className="skill-orb skill-orb-b">✳</span><span className="skill-orb skill-orb-c">↗</span><div className="skill-graphic-ring" /></div>
                <span className="service-tag">Learn by doing</span><h3>Build skills through practice</h3>
                <p>Practise programming fundamentals, data structures, algorithms, UI design, and creative thinking through small projects you can share.</p>
                <a href="#contact" className="text-link">Ask about skill building <span aria-hidden="true">→</span></a>
              </article>
              <article className="skills-feature reveal">
                <div className="skills-feature-kicker"><span>02</span><span>CAREER TOOLKIT</span></div><div className="skills-feature-icon">▤</div>
                <h3>Resume & portfolio</h3><p>Show your coding projects, competition solutions, UI concepts, and design case studies in a clear, beginner-friendly portfolio.</p>
                <div className="skills-check-list"><span>✓ Clear resume basics</span><span>✓ Project portfolio ideas</span><span>✓ Explain your contribution</span></div>
              </article>
              <article className="skills-feature reveal">
                <div className="skills-feature-kicker"><span>03</span><span>COMPETITION PRACTICE</span></div><div className="skills-feature-icon purple-skill-icon">◉</div>
                <h3>Coding contests & design challenges</h3><p>Prepare for CSE competitions, hackathons, and creative design challenges by practising under time limits and explaining your decisions clearly.</p>
                <div className="skills-check-list"><span>✓ Algorithms & problem solving</span><span>✓ Hackathon project planning</span><span>✓ Design challenge practice</span></div>
              </article>
              <article className="skills-feature skills-feature-wide reveal">
                <div><div className="skills-feature-kicker"><span>04</span><span>YOUR WEEKLY PLAN</span></div><h3>Make progress visible.</h3><p>Split your week between learning concepts, solving coding problems, creating a design, and reviewing your progress. Consistent practice beats cramming.</p></div>
                <div className="weekly-plan" aria-label="Example weekly skill practice plan"><div><span>MON</span><b>Learn</b></div><div><span>WED</span><b>Code</b></div><div><span>FRI</span><b>Design</b></div><div><span>SUN</span><b>Review</b></div></div>
              </article>
            </div>
            <p className="section-footnote">These are suggested preparation activities. Confirm which training, coaching, or placement services You Aspirant actually provides before publishing service claims.</p>
          </div>
        </section>

        <section className="section careers-section" id="careers">
          <div className="container">
            <div className="section-heading reveal">
              <div><div className="eyebrow">POSSIBILITIES AHEAD</div><h2>Find a career that <span className="gradient-text">fits you.</span></h2></div>
              <p>Choose Your paths across IT & Software and Design & Creative—then build projects, prepare for competitions, and grow your portfolio.</p>
            </div>
            <div className="career-tools">
              <label className="career-search"><span aria-hidden="true">⌕</span><input type="search" value={careerSearch} onChange={(event) => setCareerSearch(event.target.value)} placeholder="Search careers or skills..." aria-label="Search careers or skills" />{careerSearch && <button type="button" className="search-clear" onClick={() => setCareerSearch("")} aria-label="Clear search">×</button>}</label>
              <p className="career-results-count" aria-live="polite"><strong>{filteredCareers.length}</strong> {filteredCareers.length === 1 ? "career found" : "careers found"}</p>
            </div>
            <div className="filter-row" aria-label="Filter careers">
              {careerFilters.map((filter) => (
                <button className={`filter-button ${careerFilter === filter ? "active" : ""}`} key={filter} type="button" aria-pressed={careerFilter === filter} onClick={() => setCareerFilter(filter)}>{filter === "All" ? "✦ All careers" : filter}</button>
              ))}
            </div>
            <div className="career-grid" aria-live="polite">
              {filteredCareers.map((career, index) => (
                <article className="career-card reveal" key={career.title} style={{ "--card-index": index }}>
                  <div className="career-image-wrap">
                    <img src={career.image} alt={`${career.title} career`} loading="lazy" className="career-image" />
                    <div className="career-image-overlay" />
                    <span className="career-category">{career.category}</span>
                    <span className="career-image-icon" aria-hidden="true">{career.icon}</span>
                    <span className="career-image-label">CAREER PATH</span>
                  </div>
                  <div className="career-card-content">
                    <div className="career-card-heading"><h3>{career.title}</h3><span className="career-arrow" aria-hidden="true">↗</span></div>
                    <p>{career.description}</p>
                    <div className="career-level"><span className="career-level-dot" />{career.level}</div>
                    <div className="career-card-divider" />
                    <span className="skill-label">SKILLS TO EXPLORE</span>
                    <div className="skill-tags">{career.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                    <a href="#assessment" className="career-card-link">Explore this path <span aria-hidden="true">↗</span></a>
                  </div>
                </article>
              ))}
            </div>
            {filteredCareers.length === 0 && <div className="career-empty"><span aria-hidden="true">⌕</span><h3>No careers found</h3><p>Try another keyword or select a different category.</p><button className="button" type="button" onClick={() => { setCareerSearch(""); setCareerFilter("All"); }}>Show all careers</button></div>}
            <p className="section-footnote">These are example career paths, not personalized recommendations.</p>
          </div>
        </section>

        <section className="section assessment-section" id="assessment">
          <div className="container assessment-grid">
            <div className="assessment-copy reveal">
              <div className="eyebrow">A MOMENT FOR YOU</div>
              <h2>Let's find your <span className="gradient-text">starting point.</span></h2>
              <p>Answer three quick questions about what you enjoy. We'll suggest a career direction for you to explore.</p>
              <div className="assessment-benefit"><span>✓</span> Takes less than a minute</div>
              <div className="assessment-benefit"><span>✓</span> No account required</div>
              <div className="assessment-benefit"><span>✓</span> A simple place to start</div>
            </div>

            <div className="quiz-card reveal" aria-live="polite">
              {!quizResult ? (
                <>
                  <div className="quiz-topline"><span>CAREER DISCOVERY</span><span>{questionIndex + 1} / {questions.length}</span></div>
                  <div className="progress-track" role="progressbar" aria-label="Quiz progress" aria-valuenow={questionIndex + 1} aria-valuemin={1} aria-valuemax={questions.length}><div className="progress-fill" style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
                  <h3 className="quiz-question">{questions[questionIndex].question}</h3>
                  <p className="quiz-hint">Choose the answer that feels most like you.</p>
                  <div className="quiz-options">
                    {questions[questionIndex].options.map((option) => (
                      <button key={option.type} className="quiz-option" type="button" onClick={() => chooseAnswer(option.type)}>
                        <span>{option.label}</span><span className="option-arrow" aria-hidden="true">→</span>
                      </button>
                    ))}
                  </div>
                  {questionIndex > 0 && <button type="button" className="quiz-back" onClick={goToPreviousQuestion}>← Previous question</button>}
                </>
              ) : (
                <div className="quiz-result">
                  <div className="result-symbol" aria-hidden="true">✦</div>
                  <div className="eyebrow">YOUR STARTING POINT</div>
                  <h3>{quizResult}</h3>
                  <p>{quizResult === "A few paths to explore" ? "Your answers point to both areas. Try a coding project and a design challenge to see which activities you enjoy most." : "This path could be worth exploring based on your answers. Try a small coding challenge or design project and add your best work to a portfolio."}</p>
                  <a className="button" href="#careers">Explore your 12 paths <Arrow /></a>
                  <button className="quiz-back" type="button" onClick={resetQuiz}>Retake the quiz</button>
                </div>
              )}
              <p className="quiz-disclaimer">For exploration only — not a formal career assessment.</p>
            </div>
          </div>
        </section>

        <section className="section journey-section" id="journey">
          <div className="container">
            <div className="section-heading section-heading-centered reveal">
              <div><div className="eyebrow">MAKE YOUR NEXT MOVE</div><h2>Big goals. <span className="gradient-text">Small steps.</span></h2></div>
              <p>A practical way to start moving towards a career you like.</p>
            </div>
            <div className="journey-grid">
              {journeySteps.map((step) => (
                <article className="journey-card reveal" key={step.number}>
                  <div className="journey-card-top"><span className="journey-number">{step.number}</span><span className="journey-icon" aria-hidden="true">{step.icon}</span></div>
                  <h3>{step.title}</h3><p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section stories-section" id="stories">
          <div className="container">
            <div className="section-heading reveal">
              <div><div className="eyebrow">STUDENT STORIES</div><h2>Every journey has <span className="gradient-text">a story.</span></h2></div>
              <p>Use this section for genuine student experiences once you have permission to publish them.</p>
            </div>
            <div className="stories-grid">
              <article className="story-card reveal"><span className="story-quote" aria-hidden="true">“</span><p className="story-placeholder">Add an approved student testimonial describing their experience and what they learned.</p><div className="story-person"><span className="story-avatar">YS</span><div><strong>Student testimonial</strong><small>Replace with approved name and details</small></div></div></article>
              <article className="story-card reveal"><span className="story-quote" aria-hidden="true">“</span><p className="story-placeholder">Share a real example of how guidance or training helped a student identify their next step.</p><div className="story-person"><span className="story-avatar avatar-purple">YS</span><div><strong>Student journey</strong><small>Replace with verified story</small></div></div></article>
              <article className="story-card reveal"><span className="story-quote" aria-hidden="true">“</span><p className="story-placeholder">Include a specific, accurate outcome only when it can be verified and the student agrees to share it.</p><div className="story-person"><span className="story-avatar avatar-blue">YS</span><div><strong>Learning experience</strong><small>Replace with approved details</small></div></div></article>
            </div>
            <p className="section-footnote">These are content placeholders, not real testimonials or claims about student outcomes.</p>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container about-grid">
            <div className="about-image-wrap reveal">
              <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85" alt="A team collaborating and sharing ideas" loading="lazy" />
              <div className="about-image-caption"><span>YOUR POTENTIAL</span><strong>Worth exploring.</strong></div>
            </div>
            <div className="about-content reveal">
              <div className="eyebrow">ABOUT YOU ASPIRANT</div>
              <h2>Your future should feel like <span className="gradient-text">your own.</span></h2>
              <p>You Aspirant focuses on two connected directions: IT & Software and Design & Creative. Explore 12 career paths, practise for CSE coding competitions, and build projects or a design portfolio one step at a time.</p>
              <p>Customize this section with You Aspirant's verified company story, team details, credentials, location, and actual services before launch.</p>
              <a className="button" href="#contact">Start a conversation <Arrow /></a>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div className="faq-intro reveal">
              <div className="eyebrow">GOOD QUESTIONS</div>
              <h2>A few things you might <span className="gradient-text">be wondering.</span></h2>
              <p>Still curious? Send us a message using the contact form.</p>
              <a href="#contact" className="text-link">Contact us <span aria-hidden="true">→</span></a>
            </div>
            <div className="faq-list reveal">
              {faqs.map((faq, index) => (
                <div className={`faq-item ${openFaq === index ? "faq-open" : ""}`} key={faq.question}>
                  <h3 className="faq-heading">
                    <button className="faq-question" type="button" aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq((current) => current === index ? -1 : index)}>
                      <span>{faq.question}</span><span className="faq-toggle" aria-hidden="true">{openFaq === index ? "−" : "+"}</span>
                    </button>
                  </h3>
                  {openFaq === index && <p className="faq-answer" id={`faq-answer-${index}`}>{faq.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy reveal">
              <div className="eyebrow">LET'S TALK</div>
              <h2>Every journey starts with <span className="gradient-text">a conversation.</span></h2>
              <p>Have a question or want to explore guidance options? Send an enquiry using the form.</p>
              <div className="contact-note"><span aria-hidden="true">✳</span><p>The form below is a front-end demo until you connect a submission service or backend.</p></div>
              
            </div>
            <form className="contact-form reveal" onSubmit={handleContactSubmit}>
              <div className="form-heading form-heading-enhanced"><div><span className="form-kicker">LET'S GET STARTED</span><h3>Tell us what you're working towards.</h3><p>Share a little context and choose the kind of support you're exploring.</p></div><span className="form-heading-mark" aria-hidden="true">↗</span></div>
              <div className="form-row">
                <label>Your name *<input type="text" name="name" placeholder="Enter your name" autoComplete="name" minLength={2} value={formData.name} onChange={updateField} required /></label>
                <label>Your email *<input type="email" name="email" placeholder="you@example.com" autoComplete="email" value={formData.email} onChange={updateField} required /></label>
              </div>
              <label>What are you interested in? *
                <select name="subject" value={formData.subject} onChange={updateField} required>
                  <option value="" disabled>Select a topic</option>
                  <option value="career-guidance">Career guidance</option>
                  <option value="skill-training">Skill building & digital skills</option>
                  <option value="career-preparation">Resume, portfolio & interview preparation</option>
                  <option value="education-guidance">Education guidance</option>
                  <option value="feedback">Website feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Something else</option>
                </select>
              </label>
              <label>Your message *<textarea name="message" placeholder="Tell us a little about what you need..." rows={4} minLength={10} value={formData.message} onChange={updateField} required /></label>
              <label className="consent-row"><input type="checkbox" required /> <span>I agree to be contacted about this enquiry.</span></label>
              <button className="button form-submit" type="submit">Submit enquiry <Arrow /></button>
              {contactStatus === "demo" && <p className="form-feedback" role="status">Your form passed browser validation, but this demo has not sent or stored your enquiry. Connect a backend before collecting real leads.</p>}
            </form>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-cta-inner reveal">
            <div className="eyebrow">YOUR NEXT CHAPTER</div>
            <h2>Don't wait for clarity. <span className="gradient-text">Start exploring.</span></h2>
            <p>You don't need every answer to take your first step.</p>
            <a className="button" href="#assessment">Find your starting point <Arrow /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand"><Logo /><p>Explore IT, coding competitions, and creative design—one project at a time.</p></div>
          <div className="footer-links"><strong>Explore</strong><a href="#services">Services</a><a href="#careers">Careers</a><a href="#assessment">Career quiz</a><a href="#stories">Student stories</a></div>
          <div className="footer-links"><strong>Learn more</strong><a href="#about">About us</a><a href="#faq">FAQs</a><a href="#contact">Contact</a></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} You Aspirant</span><span>Made for curious minds and ambitious futures.</span><a href="#home">Back to top ↑</a></div>
      </footer>

      <div className="buddy-widget">
        {buddyOpen && (
          <StudyBuddy
            onClose={() => setBuddyOpen(false)}
            onExplore={() => { setBuddyOpen(false); document.getElementById("careers")?.scrollIntoView({ behavior: "smooth" }); }}
            onQuiz={() => { setBuddyOpen(false); document.getElementById("assessment")?.scrollIntoView({ behavior: "smooth" }); }}
          />
        )}
        <button
          className={`buddy-launcher ${buddyOpen ? "buddy-launcher-open" : ""}`}
          type="button"
          aria-label={buddyOpen ? "Close Bytey study buddy" : "Open Bytey study buddy"}
          aria-expanded={buddyOpen}
          onClick={() => setBuddyOpen((open) => !open)}
        >
          <span className="buddy-launcher-art"><BuddyMascot /></span>
          <span className="buddy-launcher-label">Ask Bytey</span>
        </button>
      </div>
    </div>
  );
}

export default App;
