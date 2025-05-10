// Navigation sections for the portfolio
export const sections = [
  { id: "hero", name: "Home" },
  { id: "about", name: "About" },
  { id: "skills", name: "Skills" },
  { id: "experience", name: "Experience" },
  { id: "projects", name: "Projects" },
  { id: "education", name: "Education" },
  { id: "community", name: "Community" },
  { id: "contact", name: "Contact" },
];

// Skills data grouped by category
export const skills = {
  technical: [
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 80 },
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 95 },
    { name: "Python", level: 75 },
    { name: "MYSQL", level: 70 },
  ],
  frameworks: [
    { name: "React", level: 80 },
    { name: "Next.js", level: 80 },
    { name: "Node.js", level: 80 },
    { name: "Express", level: 75 },
    { name: "TailwindCSS", level: 75 },
  ],
  tools: [
    { name: "Git", level: 90 },
    { name: "AWS", level: 60 },
    { name: "Figma", level: 70 },
  ],
};

// Work experience data
export const experiences = [
  {
    title: "Full Stack Developer",
    company: "DevX Days",
    date: "Jan 2025 - Present",
    description: [
      "Built responsive landing page using Next.js with TypeScript implementing SSR for improved SEO performance.",  
"Reduced page loading time by 40% through code splitting and lazy loading techniques.", 
"Implemented client-side caching strategies resulting in smoother navigation experience for users.", 
"Resolved cross-browser compatibility issues by creating custom CSS solutions for legacy browser support.",
    ],
    tech: ["React", "Next.js", "TypeScript", "Redux", "TailwindCSS", ],
  },
  {
    title: "Frontend Developer",
    company: "Pixelwand",
    date: "June 2024 - Dec 2024",
    description: [
      "Developed AWS service migration UI with optimistic updates, reducing user wait time by 30%.", 
"Translated complex Figma design mock-ups into pixel-perfect web pages using React and styled-components.",
"Created reusable component library that reduced development time for new features by 25%.",
"Implemented responsive designs ensuring consistent user experience across mobile, tablet, and desktop devices.", 
    ],
    tech: ["React", "TypeScript", ],
  },
];

// Projects data
export const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product catalog, shopping cart, and payment integration.",
    imageUrl: "https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    demoUrl: "#",
    githubUrl: "#",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Stripe", "MongoDB"],
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team workspace features.",
    imageUrl: "https://images.pexels.com/photos/6446709/pexels-photo-6446709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    demoUrl: "#",
    githubUrl: "#",
    tech: ["React", "Firebase", "Styled Components", "Redux"],
  },
  {
    title: "Finance Dashboard",
    description: "Interactive dashboard for financial data visualization with customizable charts and reports.",
    imageUrl: "https://images.pexels.com/photos/7681325/pexels-photo-7681325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    demoUrl: "#",
    githubUrl: "#",
    tech: ["React", "D3.js", "Express", "PostgreSQL", "Material UI"],
  },
  {
    title: "Social Media Analytics",
    description: "Tool for analyzing social media performance across multiple platforms with engagement metrics.",
    imageUrl: "https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    demoUrl: "#",
    githubUrl: "#",
    tech: ["Vue.js", "Node.js", "Chart.js", "Tailwind CSS", "MongoDB"],
  },
];

// Education data
export const education = [
  {
    degree: "Extended Credit Linked Program in AIML",
    institution: "Daksh Gurukul IIT Guwahati",
    date: "2025 - 2026",
    description: "Focused on Artificial Intelligence and Machine Learning. Learning natural language processing and Agentic AI.",
  },
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Galgotias University",
    date: "2021 - 2025",
    description: "Specialized in Web Technologies and Software Engineering, developed Community Leadership and Technical Writing.",
  },
];

// Community Leadership data
export const communityActivities = [
  {
    title: "Tech Meetup Organizer",
    organization: "Local Developer Community",
    date: "2020 - Present",
    description: "Organize monthly tech meetups with 100+ attendees, securing speakers and sponsors.",
  },
  {
    title: "Open Source Contributor",
    organization: "Various Projects",
    date: "2019 - Present",
    description: "Active contributor to several open-source projects including [Project Name] and [Project Name].",
  },
  {
    title: "Technical Writer",
    organization: "Dev.to & Medium",
    date: "2018 - Present",
    description: "Publish articles on web development topics with over 50,000 total views.",
  },
];