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
    { name: "TypeScript", level: 85 },
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 90 },
    { name: "Python", level: 75 },
    { name: "SQL", level: 80 },
  ],
  frameworks: [
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Express", level: 75 },
    { name: "TailwindCSS", level: 90 },
    { name: "React Native", level: 70 },
  ],
  tools: [
    { name: "Git", level: 85 },
    { name: "Docker", level: 70 },
    { name: "AWS", level: 65 },
    { name: "Figma", level: 75 },
    { name: "Jest", level: 80 },
    { name: "Webpack", level: 65 },
  ],
};

// Work experience data
export const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    date: "Jan 2022 - Present",
    description: [
      "Led a team of 5 developers to build a responsive web application using React and TypeScript",
      "Implemented state management with Redux and improved performance by 40%",
      "Collaborated with UI/UX designers to implement pixel-perfect designs",
      "Mentored junior developers and conducted code reviews",
    ],
    tech: ["React", "TypeScript", "Redux", "TailwindCSS", "Jest"],
  },
  {
    title: "Frontend Developer",
    company: "Digital Solutions LLC",
    date: "Mar 2019 - Dec 2021",
    description: [
      "Developed and maintained multiple client-facing web applications",
      "Implemented responsive designs and ensured cross-browser compatibility",
      "Worked with REST APIs and GraphQL to integrate frontend with backend services",
      "Participated in agile development processes",
    ],
    tech: ["JavaScript", "React", "SCSS", "GraphQL", "Cypress"],
  },
  {
    title: "Web Developer Intern",
    company: "Startup Incubator",
    date: "Jun 2018 - Feb 2019",
    description: [
      "Assisted in developing web applications for early-stage startups",
      "Gained experience with modern JavaScript frameworks and tools",
      "Collaborated with cross-functional teams including designers and backend developers",
    ],
    tech: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"],
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
    degree: "Master of Science in Computer Science",
    institution: "University of Technology",
    date: "2016 - 2018",
    description: "Specialized in Web Technologies and Distributed Systems. Thesis on 'Performance Optimization Techniques for Modern Web Applications'.",
    achievements: [
      "Dean's List: All semesters",
      "Graduate Research Assistant",
      "Published paper on web performance optimization",
    ],
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "State University",
    date: "2012 - 2016",
    description: "Focused on Software Engineering and Database Systems. Minor in Digital Media Design.",
    achievements: [
      "Graduated with Honors",
      "President of Computer Science Club",
      "Participated in ACM Programming Competition",
    ],
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