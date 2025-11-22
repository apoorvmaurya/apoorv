# Portfolio Website

A modern, responsive portfolio website built with cutting-edge web technologies, featuring a glassmorphism dark theme and Fortune 500-inspired design aesthetics.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

- **Modern Design**: Glassmorphism dark theme with smooth animations and micro-interactions
- **Fully Responsive**: Mobile-first approach ensuring optimal experience across all devices
- **Performance Optimized**: Built with Next.js 16 and Turbopack for blazing-fast development and production builds
- **Type-Safe**: Full TypeScript implementation for robust code quality
- **Interactive Sections**:
  - Hero section with dynamic introduction
  - About section with professional background
  - Work experience timeline
  - Skills showcase
  - Project portfolio
  - Community involvement
  - Contact form with EmailJS integration
- **Smooth Animations**: Powered by Framer Motion for delightful user interactions
- **Form Validation**: React Hook Form with Zod schema validation
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 🚀 Tech Stack

### Core
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5.7](https://www.typescriptlang.org/)** - Type safety

### Styling
- **[TailwindCSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **Custom Glassmorphism** - Modern UI aesthetics

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant form management
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[EmailJS](https://www.emailjs.com/)** - Email service integration

### Developer Experience
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[ESLint](https://eslint.org/)** - Code linting
- **[Turbopack](https://turbo.build/pack)** - Next-generation bundler

## 📋 Prerequisites

- **Node.js** 22.21.1
- **pnpm** 10.20.0


## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build production bundle |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | Run TypeScript type checking |


## 🎨 Customization

### Colors & Theme
Modify the color palette in `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      // Add your custom colors
    }
  }
}
```

### Content
Update the content in the respective section components located in `components/sections/`:
- `Hero.tsx` - Main introduction
- `About.tsx` - About section
- `Experience.tsx` - Work experience
- `Skills.tsx` - Skills showcase
- `Projects.tsx` - Project portfolio
- `Community.tsx` - Community involvement
- `Contact.tsx` - Contact form

## 🔧 EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Add them to your `.env.local` file

## 🚀 Deployment

### Vercel (Recommended)
The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!


## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is private and proprietary.

## 👤 Author

**Apoorv Maurya**

---

<div align="center">
  <p>Built with ❤️ using Next.js and TypeScript</p>
</div>
