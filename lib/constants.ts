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
    { name: "MySQL", level: 70 },
  ],
  frameworks: [
    { name: "React", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "Node.js", level: 85 },
    { name: "Express", level: 75 },
    { name: "Redux", level: 70 },
  ],
  tools: [
    { name: "Git", level: 90 },
    { name: "GitLab", level: 85 },
    { name: "Postman", level: 75 },
    { name: "Figma", level: 75 },
  ],
};

// Work experience data
//export const experiences = [
//  {
//    title: "Full Stack Developer",
//    company: "DevX Days",
//    date: "Jan 2025 - Present",
//    description: [
//      "Built responsive landing page using Next.js with TypeScript implementing SSR for improved SEO performance.",  
//      "Reduced page loading time by 40% through code splitting and lazy loading techniques.", 
//      "Implemented client-side caching strategies resulting in smoother navigation experience for users.", 
//      "Resolved cross-browser compatibility issues by creating custom CSS solutions for legacy browser support.",
//    ],
//    tech: ["React", "Next.js", "TypeScript", "TailwindCSS"],
//  },
//  {
//    title: "Frontend Developer Intern",
//    company: "Pixelwand",
//    date: "July 2024 - Dec 2024",
//    description: [
//      "Developed AWS service migration UI with optimistic updates, reducing user wait time by 30%.", 
//      "Translated complex Figma design mock-ups into pixel-perfect web pages using React and styled-components.",
//      "Created reusable component library that reduced development time for new features by 25%.",
//      "Implemented responsive designs ensuring consistent user experience across mobile, tablet, and desktop devices.", 
//    ],
//    tech: ["React", "styled-components", "Figma", "AWS"],
//  },
//  {
//    title: "AIML Trainee",
//    company: "Verzeo",
//    date: "October 2022 - January 2023",
//    description: [
//      "Implemented object recognition model using TensorFlow and Keras achieving 87% accuracy.",
//      "Documented model architecture and training process for team knowledge sharing.",
//    ],
//    tech: ["TensorFlow", "Keras", "Python"],
//  },
//];

// Projects data
export const projects = [
  {
    title: "AssessMed",
    description: "Machine learning-based disease prediction system with intuitive UI flows that simplified complex medical input processes for non-technical users.",
    imageUrl: "/assesmed.png",
    demoUrl: "https://assesmed.vercel.app/",
    githubUrl: "https://github.com/apoorvmaurya/AssesMed",
    tech: ["HTML/CSS", "JavaScript", "Node.js", "Express", "MongoDB", "Machine Learning"],
  },
  {
    title: "iCloud",
    description: "Comprehensive web application for college administrative operations with role-based access control system ensuring data security and privacy.",
    imageUrl: "/icloud.png",
    demoUrl: "https://github.com/apoorvmaurya/iCloud",
    githubUrl: "https://github.com/apoorvmaurya/iCloud",
    tech: ["PHP", "CSS", "MySQL", "XAMPP", "Apache Server"],
  },
  {
    title: "Virtual Workstation",
    description: "Personal desktop voice assistant with custom voice command recognition achieving 90% accuracy using speech recognition libraries.",
    imageUrl: "/workstation.png",
    demoUrl: "https://apoorvmaurya.github.io/WorkStation-Virtual-Assistant-/",
    githubUrl: "https://github.com/apoorvmaurya/WorkStation-Virtual-Assistant-",
    tech: ["Python", "speech recognition", "pyttsx3", "multithreading"],
  },
  {
    title: "Open Source: Vibey",
    description: "Enhanced UI/UX and implemented predictive search functionality with typeahead feature.",
    imageUrl: "/vibey.png",
    demoUrl: "https://vibey.live",
    githubUrl: "https://github.com/apoorvmaurya/vibey",
    tech: ["JavaScript", "React", "CSS"],
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
    description: "Specialized in Web Technologies and Software Engineering, developed Community Leadership and Technical Writing skills.",
  },
];

// Community Leadership data
export const communityActivities = [
  {
    title: "Postman Student Expert",
    organization: "Postman",
    date: "2023 - Present",
    description: "Mentored students on API testing methodologies, developed tutorial documentation for common API testing scenarios.",
  },
  {
    title: "Community Member & Co-organizer",
    organization: "OpenSourceDays",
    date: "2024 - Present",
    description: "Coordinated volunteers & managed event logistics for 200+ attendees and created post-event documentation and success metrics.",
  },
  {
    title: "Event Co-organizer",
    organization: "Rungta College of Engineering",
    date: "2024",
    description: "Co-organized technical event featuring industry speakers including Github's Senior Manager & Developer Advocate and Postman's Senior Developer Advocate.",
  },
  //{
  //  title: "Volunteer",
  //  organization: "75th Republic Day Event",
  //  date: "2023",
  //  description: "Volunteered in event hosted by Hon'ble Prime Minister, managed by NBCC.",
  //},
];