# DevUp Society Website

Official website for **DevUp Society** - Where Code Meets Innovation 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Overview

A modern, high-performance website built with cutting-edge web technologies featuring a premium cyberpunk design with neon accents, smooth animations, and an immersive user experience.

**Live Demo**: [Visit Website](https://dev-up-society-website.vercel.app/) <!-- Add your deployed URL here -->

## ✨ Features

- 🎨 Premium cyberpunk design with custom neon aesthetics and glassmorphism
- ⚡ Lightning-fast performance with static site generation
- 📱 Fully responsive, mobile-first design
- 🎬 Smooth GSAP-powered scroll animations
- 🔍 SEO optimized with best practices built-in
- 🎭 Custom visual effects (noise overlay, scanlines, vignette, custom cursor)

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [Astro](https://astro.build) |
| **Styling** | [TailwindCSS](https://tailwindcss.com) |
| **Animations** | [GSAP](https://greensock.com/gsap/) (ScrollTrigger, TextPlugin) |
| **Icons** | [Iconify](https://iconify.design) |
| **Fonts** | Space Grotesk, JetBrains Mono |

## 📄 Pages

- **Home** (`/`) - Hero section, about, focus areas, and call-to-action
- **Events** (`/events`) - Upcoming hackathons, workshops, and past events
- **Team** (`/team`) - Core team members and departments
- **Projects** (`/projects`) - Portfolio of live projects and deployments

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.0 or higher
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/DevUp-Society/DevUp-Society-Website.git

# Navigate to project directory
cd DevUp-Society-Website

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will be available at `http://localhost:4321`

## 📦 Build & Deployment

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

Static files will be generated in the `dist/` directory.

### Deployment Options

**Vercel**
```bash
npm i -g vercel
vercel
```

**Netlify**
```bash
npm i -g netlify-cli
netlify deploy --prod
```

**GitHub Pages** - Push the `dist/` folder to your `gh-pages` branch

## 🎨 Customization

### Color Scheme

Modify the color palette in `tailwind.config.mjs`:

```javascript
colors: {
  'void': '#030303',    // Background
  'signal': '#CCFF00',  // Primary accent
}
```

### Content & Styling

- **Pages**: `src/pages/`
- **Layout**: `src/layouts/MainLayout.astro`
- **Global Styles**: `src/styles/global.css`
- **Configuration**: `astro.config.mjs`, `tailwind.config.mjs`

## 📁 Project Structure

```
DevUp-Society-Website/
├── src/
│   ├── layouts/
│   │   └── MainLayout.astro    # Main layout with navigation & footer
│   ├── pages/
│   │   ├── index.astro         # Home page
│   │   ├── events.astro        # Events page
│   │   ├── team.astro          # Team page
│   │   └── projects.astro      # Projects page
│   └── styles/
│       └── global.css          # Global styles & custom effects
├── public/
│   └── assets/                 # Static assets (images, fonts)
├── astro.config.mjs            # Astro configuration
├── tailwind.config.mjs         # Tailwind configuration
└── package.json                # Dependencies & scripts
```

##  Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

Please ensure your code follows our coding standards and includes appropriate documentation.

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

Built with ❤️ by the DevUp Society team

- Design inspired by modern cyberpunk aesthetics
- Powered by [Astro](https://astro.build) and [TailwindCSS](https://tailwindcss.com)

---

**DevUp Society** - Code. Build. Deploy. 🚀