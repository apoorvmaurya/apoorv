# 🚀 Portfolio Website

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

**A modern, AI-powered portfolio website featuring glassmorphism design, smooth animations, and an intelligent chatbot assistant.**

[View Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Customization](#-customization)
- [Deployment](#-deployment)
- [Performance](#-performance)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

A cutting-edge portfolio website built with the latest web technologies, designed to showcase professional experience, skills, and projects with a Fortune 500-inspired aesthetic. The site features a dark glassmorphism theme, smooth animations, and an AI-powered chatbot that can answer questions about my background and experience.

### Key Highlights

- ⚡ **Blazing Fast** - Built with Next.js 16 and Turbopack
- 🎨 **Modern Design** - Glassmorphism UI with smooth micro-interactions
- 🤖 **AI-Powered** - Integrated Google Gemini chatbot for interactive Q&A
- 📱 **Fully Responsive** - Mobile-first design approach
- ♿ **Accessible** - WCAG compliant with semantic HTML
- 🔒 **Type-Safe** - 100% TypeScript implementation
- 🎭 **Animated** - Framer Motion for delightful user experiences

---

## ✨ Features

### 🎨 Design & UX
- **Glassmorphism Dark Theme** - Modern, premium aesthetic with blur effects and transparency
- **Smooth Animations** - Powered by Framer Motion for seamless transitions
- **Micro-interactions** - Hover effects, button animations, and scroll-triggered animations
- **Mobile-First Responsive** - Optimized for all screen sizes from mobile to 4K displays

### 🤖 AI Chatbot
- **Google Gemini Integration** - Intelligent chatbot that answers questions about my background
- **Resume Context** - AI trained on my resume for accurate responses
- **Markdown Support** - Rich text formatting in chat responses
- **Persistent Chat History** - Maintains conversation context

### 📄 Sections
- **Hero** - Dynamic introduction with call-to-action
- **About** - Professional background and summary
- **Experience** - Timeline-based work history
- **Skills** - Categorized technical skills showcase
- **Projects** - Portfolio of featured projects with links
- **Community** - Involvement in tech communities and contributions
- **Contact** - Validated contact form with EmailJS integration

### 🛠️ Developer Experience
- **TypeScript** - Full type safety across the entire codebase
- **Form Validation** - React Hook Form with Zod schemas
- **Error Handling** - Custom error boundaries and loading states
- **SEO Optimized** - Meta tags, sitemap, robots.txt, and manifest
- **Code Quality** - ESLint, Prettier, and TypeScript strict mode

---

## 🔧 Tech Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 16.0.3 | React framework with App Router |
| [React](https://react.dev/) | 19.0.0 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.7.2 | Type safety and developer experience |

### Styling & Animation
| Technology | Version | Purpose |
|------------|---------|---------|
| [TailwindCSS](https://tailwindcss.com/) | 3.4.17 | Utility-first CSS framework |
| [Framer Motion](https://www.framer.com/motion/) | 11.15.0 | Animation library |
| [PostCSS](https://postcss.org/) | 8.4.49 | CSS processing |

### AI & Integrations
| Technology | Version | Purpose |
|------------|---------|---------|
| [Google Generative AI](https://ai.google.dev/) | 0.21.0 | Gemini chatbot integration |
| [EmailJS](https://www.emailjs.com/) | 4.4.1 | Contact form email service |
| [pdf-parse](https://www.npmjs.com/package/pdf-parse) | 1.1.1 | Resume parsing for AI context |

### Forms & Validation
| Technology | Version | Purpose |
|------------|---------|---------|
| [React Hook Form](https://react-hook-form.com/) | 7.54.2 | Performant form management |
| [Zod](https://zod.dev/) | 3.24.1 | TypeScript-first schema validation |
| [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers) | 3.9.1 | Zod integration for React Hook Form |

### Utilities
| Technology | Version | Purpose |
|------------|---------|---------|
| [clsx](https://www.npmjs.com/package/clsx) | 2.1.1 | Conditional className utility |
| [tailwind-merge](https://www.npmjs.com/package/tailwind-merge) | 2.6.0 | Merge Tailwind classes intelligently |
| [react-markdown](https://www.npmjs.com/package/react-markdown) | 9.0.1 | Markdown rendering in chatbot |

### Development Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| [pnpm](https://pnpm.io/) | 10.20.0 | Fast, efficient package manager |
| [ESLint](https://eslint.org/) | 9.17.0 | Code linting |
| [Prettier](https://prettier.io/) | 3.4.2 | Code formatting |
| [Turbopack](https://turbo.build/pack) | - | Next-generation bundler |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** >= 22.21.1
- **pnpm** >= 10.20.0

> **Note**: This project uses pnpm as the package manager. Using npm or yarn may cause dependency issues.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/apoorvmaurya/apoorv.git
   cd apoorv-portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` with your actual credentials (see [Environment Variables](#environment-variables) section).

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Google Gemini AI Configuration (Required for chatbot)
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# EmailJS Configuration (Required for contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

#### Getting API Keys

**Google Gemini API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env.local` file

**EmailJS Credentials:**
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Copy Service ID, Template ID, and Public Key to your `.env.local` file

---

## 💻 Usage

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack (hot reload enabled) |
| `pnpm build` | Build optimized production bundle |
| `pnpm start` | Start production server (requires `pnpm build` first) |
| `pnpm lint` | Run ESLint to check code quality |
| `pnpm type-check` | Run TypeScript compiler to check types |

### Development Workflow

1. **Start the dev server**: `pnpm dev`
2. **Make your changes** in the appropriate files
3. **Check for errors**: `pnpm type-check && pnpm lint`
4. **Build for production**: `pnpm build`
5. **Test production build**: `pnpm start`

---

## 📁 Project Structure

```
apoorv-portfolio/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── chat/                 # Chatbot API endpoint
│   │   └── contact/              # Contact form API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout component
│   ├── page.tsx                  # Home page
│   ├── error.tsx                 # Error boundary
│   ├── loading.tsx               # Loading state
│   ├── not-found.tsx             # 404 page
│   ├── manifest.ts               # PWA manifest
│   ├── robots.ts                 # Robots.txt configuration
│   └── sitemap.ts                # Sitemap configuration
├── components/                   # React components
│   ├── chatbot/                  # AI chatbot components
│   │   ├── ChatBot.tsx           # Main chatbot component
│   │   ├── ChatInput.tsx         # Chat input field
│   │   └── ChatMessage.tsx       # Chat message display
│   ├── layout/                   # Layout components
│   │   ├── Footer.tsx            # Site footer
│   │   └── Navbar.tsx            # Navigation bar
│   ├── sections/                 # Page sections
│   │   ├── About.tsx             # About section
│   │   ├── Community.tsx         # Community involvement
│   │   ├── Contact.tsx           # Contact form
│   │   ├── Experience.tsx        # Work experience timeline
│   │   ├── Hero.tsx              # Hero section
│   │   ├── Projects.tsx          # Projects showcase
│   │   └── Skills.tsx            # Skills display
│   └── ui/                       # Reusable UI components
│       ├── AnimatedSection.tsx   # Scroll animation wrapper
│       ├── Button.tsx            # Custom button component
│       ├── Card.tsx              # Card component
│       ├── Input.tsx             # Form input component
│       └── Textarea.tsx          # Form textarea component
├── hooks/                        # Custom React hooks
│   ├── useInView.ts              # Intersection Observer hook
│   ├── useMediaQuery.ts          # Responsive breakpoint hook
│   └── useScrollDirection.ts     # Scroll direction detection
├── lib/                          # Utility functions
│   ├── ai/                       # AI-related utilities
│   ├── email/                    # Email service utilities
│   ├── utils.ts                  # General utilities
│   └── validations.ts            # Zod schemas
├── public/                       # Static assets
│   ├── images/                   # Image files
│   ├── Resume.pdf                # Resume for AI context
│   └── ...                       # Other static files
├── types/                        # TypeScript type definitions
│   └── index.ts                  # Shared types
├── .env.local.example            # Environment variables template
├── .eslintrc.json                # ESLint configuration
├── .gitignore                    # Git ignore rules
├── .prettierrc                   # Prettier configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Project dependencies
├── pnpm-lock.yaml                # pnpm lock file
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

---

## 🎨 Customization

### Updating Content

#### Personal Information
Edit the section components in `components/sections/`:

- **Hero Section** (`Hero.tsx`) - Name, title, introduction
- **About Section** (`About.tsx`) - Background, bio, image
- **Experience** (`Experience.tsx`) - Work history, timeline
- **Skills** (`Skills.tsx`) - Technical skills, categories
- **Projects** (`Projects.tsx`) - Portfolio projects, links
- **Community** (`Community.tsx`) - Community involvement
- **Contact** (`Contact.tsx`) - Contact form configuration

#### Resume for AI Chatbot
Replace `public/Resume.pdf` with your own resume. The chatbot uses this to answer questions about your background.

### Styling

#### Color Scheme
Modify colors in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        // ... add your colors
      },
      // Add custom color palettes
    }
  }
}
```

#### Glassmorphism Effects
Adjust glass effects in `app/globals.css`:

```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

#### Animations
Customize Framer Motion animations in components:

```typescript
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

### Fonts
Update fonts in `app/layout.tsx` using Next.js Font Optimization:

```typescript
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
```

---

## 🌐 Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   - Add all variables from `.env.local` in Vercel dashboard
   - Navigate to: Project Settings → Environment Variables

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/apoorvmaurya/apoorv)

### Other Platforms

#### Netlify
```bash
pnpm build
# Deploy the .next folder
```

#### Docker
```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
CMD ["pnpm", "start"]
```

---

## ⚡ Performance

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Optimizations
- ✅ Image optimization with Next.js Image component
- ✅ Code splitting and lazy loading
- ✅ Turbopack for faster builds
- ✅ Font optimization with next/font
- ✅ Automatic static optimization
- ✅ Incremental Static Regeneration (ISR)
- ✅ Edge runtime for API routes
- ✅ Minified CSS and JavaScript

---

## 🌍 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Latest ✅ |
| Firefox | Latest ✅ |
| Safari | Latest ✅ |
| Edge | Latest ✅ |
| Opera | Latest ✅ |

> **Note**: The site uses modern web features like CSS Grid, Flexbox, and ES6+. IE11 is not supported.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style

- Follow the existing code style
- Run `pnpm lint` before committing
- Write meaningful commit messages
- Add comments for complex logic

---

## 📄 License

This project is **private and proprietary**. All rights reserved.

© 2024 Apoorv Maurya. Unauthorized copying or distribution is prohibited.

---

## 👤 Contact

**Apoorv Maurya**

- 🌐 Portfolio: [apoorv-gamma.vercel.app](https://apoorv-gamma.vercel.app)
- 💼 LinkedIn: [Apoorv Maurya](https://linkedin.com/in/apoorv-maurya2506)
- 🐙 GitHub: [@apoorvmaurya](https://github.com/apoorvmaurya)
- 📧 Email: apoorvmauryaapoorv@gmail.com

---

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) - Amazing React framework
- [Vercel](https://vercel.com/) - Hosting and deployment
- [Google Gemini](https://ai.google.dev/) - AI chatbot capabilities
- [Framer Motion](https://www.framer.com/motion/) - Smooth animations
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Built with ❤️ using Next.js 16, React 19, and TypeScript

</div>
