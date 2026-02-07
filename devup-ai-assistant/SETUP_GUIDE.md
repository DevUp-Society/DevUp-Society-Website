# DevUp AI Assistant - Setup Guide

Complete step-by-step guide to implement the AI chatbot on your website.

---

## Prerequisites

- Astro 4.x project with TypeScript
- Node.js adapter for server-side rendering
- TailwindCSS (optional, but recommended)

---

## Step 1: Install Dependencies

Your `package.json` should include:

```json
{
  "dependencies": {
    "astro": "^4.16.0",
    "@astrojs/node": "^8.0.0"
  }
}
```

Run:
```bash
npm install @astrojs/node
```

---

## Step 2: Configure Astro

Update `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind'; // if using TailwindCSS

export default defineConfig({
  output: 'hybrid', // Enable hybrid rendering (static + server)
  adapter: node({ mode: 'standalone' }),
  integrations: [tailwind()],
});
```

**Important**: `output: 'hybrid'` allows API routes to run on the server while keeping pages static.

---

## Step 3: Get OpenRouter API Key

1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up / Log in
3. Go to **Keys** section
4. Click **Create Key**
5. Copy the key (starts with `sk-or-v1-...`)
6. Add credits ($5-10 is plenty to start)

---

## Step 4: Set Environment Variable

Create `.env` file in your project root:

```bash
OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

**For Vercel deployment**, add this in Project Settings → Environment Variables.

---

## Step 5: Copy AI Files

Copy these files to your project:

```
your-project/
└── src/
    ├── lib/
    │   └── ai/
    │       ├── types.ts      # Copy from this folder
    │       ├── config.ts     # Copy and customize
    │       ├── knowledge.ts  # Copy and customize
    │       └── client.ts     # Copy from this folder
    │
    └── pages/
        └── api/
            └── assistant.ts  # Copy from this folder
```

---

## Step 6: Customize Configuration

### Edit `src/lib/ai/config.ts`:

```typescript
export const AI_CONFIG = {
  // ... keep OpenRouter settings ...
  
  SITE: {
    name: "Your Society Name",
    tagline: "Your Tagline Here",
    institution: "Your College/University",
    location: "Your City, Country",
    founded: "2024",
    website: "https://yoursite.com",
    email: "your@email.com",
    socials: {
      github: "https://github.com/your-org",
      linkedin: "https://linkedin.com/company/your-org",
      instagram: "https://instagram.com/your-org",
      whatsapp: "https://chat.whatsapp.com/your-link"
    }
  }
} as const;
```

### Edit `SYSTEM_PROMPT` in the same file:

Change the identity section to match your organization.

---

## Step 7: Update Knowledge Base

Edit `src/lib/ai/knowledge.ts` to match your data:

1. **Import your data files** (events, team, etc.)
2. **Update `buildAboutContext()`** with your org info
3. **Update founding members** section
4. **Update website developer** credits
5. **Update FAQ section**

---

## Step 8: Add Chat Widget to Layout

Add this HTML to your main layout file (e.g., `MainLayout.astro`):

1. Copy the **Chat Widget HTML** from `components/ChatWidget.html`
2. Paste it before the closing `</body>` tag
3. Add the **CSS styles** from `styles/chat-styles.css`

---

## Step 9: Add Required CSS

Add to your `global.css`:

```css
/* Hide scrollbar for chat messages */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

---

## Step 10: Test Locally

```bash
npm run dev
```

1. Open your site in browser
2. Click the floating chat button (bottom right)
3. Ask: "What is DevUp?"
4. You should get a response!

---

## Step 11: Deploy

### For Vercel:

1. Add `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

2. Add environment variable `OPENROUTER_API_KEY` in Vercel dashboard

3. Deploy!

---

## Troubleshooting

### "500 Error" on API calls
- Check if `OPENROUTER_API_KEY` is set correctly
- Check OpenRouter dashboard for credits
- Check browser console for detailed error

### "prerender" errors
- Make sure `export const prerender = false;` is in `assistant.ts`
- Make sure `output: 'hybrid'` is in `astro.config.mjs`

### Chat widget not appearing
- Check browser console for JavaScript errors
- Make sure the HTML is inside the `<body>` tag

---

## Cost Management

Claude 3 Haiku is very affordable:
- Input: $0.00025 / 1K tokens
- Output: $0.00125 / 1K tokens

With 512 max tokens and ~2000 token context:
- **~$0.0003 per question**
- **$1 = ~3,300 questions**

Monitor usage at [openrouter.ai/activity](https://openrouter.ai/activity)

---

## Need Help?

Contact: devupsociety@gmail.com
