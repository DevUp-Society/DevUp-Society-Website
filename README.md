# DevUp Society Website

🚀 Official website for **DevUp Society** - Where Code Meets Innovation

## 🛠️ Tech Stack

- **Framework**: Astro
- **Styling**: TailwindCSS
- **Animations**: GSAP (ScrollTrigger, TextPlugin)
- **Icons**: Iconify
- **Fonts**: Space Grotesk, JetBrains Mono
- **Deployment**: Static (Vercel/Netlify/GitHub Pages)

## ✨ Features

- 🎨 **Premium Cyberpunk Design** - Custom neon signal colors, glassmorphism, and advanced effects
- ⚡ **Lightning Fast** - Static site generation for optimal performance
- 📱 **Fully Responsive** - Mobile-first design approach
- 🎭 **Custom Effects** - Noise overlay, scanlines, vignette, custom cursor
- 🎬 **Smooth Animations** - GSAP-powered scroll animations and interactions
- 🔍 **SEO Optimized** - Built-in SEO best practices
- 🧭 **Multi-Page Routing** - Clean file-based routing

## 📄 Pages

- **Home** (`/`) - Hero section, about, focus areas, CTA
- **Events** (`/events`) - Upcoming hackathons, workshops, past events
- **Team** (`/team`) - Core team members and departments
- **Projects** (`/projects`) - Portfolio of live projects and deployments

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

\`\`\`bash
# Navigate to project directory
cd devup-society

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

The site will be available at `http://localhost:4321`

## 📦 Build & Deploy

\`\`\`bash
# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

The static files will be in the `dist/` folder, ready for deployment.

### Deploy to Vercel

\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### Deploy to Netlify

\`\`\`bash
npm i -g netlify-cli
netlify deploy --prod
\`\`\`

## 🎨 Customization

### Colors

Edit `tailwind.config.mjs` to change the color scheme:

\`\`\`javascript
colors: {
  'void': '#030303',    // Background
  'signal': '#CCFF00',  // Primary accent
}
\`\`\`

### Content

- **Pages**: Edit files in `src/pages/`
- **Layout**: Modify `src/layouts/MainLayout.astro`
- **Styles**: Update `src/styles/global.css`

## 📁 Project Structure

\`\`\`
devup-society/
├── src/
│   ├── layouts/
│   │   └── MainLayout.astro    # Main layout with nav, footer
│   ├── pages/
│   │   ├── index.astro         # Home page
│   │   ├── events.astro        # Events page
│   │   ├── team.astro          # Team page
│   │   └── projects.astro      # Projects page
│   └── styles/
│       └── global.css          # Global styles & effects
├── public/
│   └── assets/                 # Static assets
├── astro.config.mjs            # Astro configuration
├── tailwind.config.mjs         # Tailwind configuration
└── package.json
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🌟 Credits

Built with ❤️ by DevUp Society

- Design inspired by modern cyberpunk aesthetics
- Powered by Astro and TailwindCSS
- Originally adapted from a premium template

---

**DevUp Society** - Code. Build. Deploy. 🚀
