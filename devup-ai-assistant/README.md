# DevUp AI Assistant - Complete Implementation

A site-restricted AI chatbot for the DevUp Society website. This assistant only answers questions from its knowledge base about DevUp events, team, and activities.

## 🚀 Features

- **Site-Restricted AI**: Only answers questions about DevUp Society
- **Fast Responses**: Uses Claude 3 Haiku for quick, cheap responses
- **Beautiful UI**: Glassmorphism floating chat widget
- **Rate Limiting**: Built-in protection against abuse
- **Mobile Friendly**: Responsive design for all devices

## 📁 Folder Structure

```
devup-ai-assistant/
├── README.md                    # This file
├── SETUP_GUIDE.md              # Step-by-step installation guide
├── .env.example                # Environment variables template
│
├── src/
│   ├── lib/
│   │   └── ai/
│   │       ├── types.ts        # TypeScript type definitions
│   │       ├── config.ts       # AI configuration & system prompt
│   │       ├── knowledge.ts    # Knowledge base builder
│   │       └── client.ts       # OpenRouter API client
│   │
│   └── pages/
│       └── api/
│           └── assistant.ts    # API endpoint
│
├── components/
│   └── ChatWidget.html         # Standalone chat widget HTML/CSS/JS
│
└── styles/
    └── chat-styles.css         # Additional CSS for chat widget
```

## 🔧 Quick Setup

1. **Get OpenRouter API Key**
   - Go to [openrouter.ai](https://openrouter.ai)
   - Create account & get API key
   - Add credits (~$5 is enough to start)

2. **Add Environment Variable**
   ```bash
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   ```

3. **Install Files**
   - Copy `src/lib/ai/` folder to your project
   - Copy `src/pages/api/assistant.ts` to your API routes
   - Add chat widget HTML to your layout

4. **Configure Astro**
   ```js
   // astro.config.mjs
   export default defineConfig({
     output: "hybrid",
     adapter: node({ mode: "standalone" }),
   });
   ```

5. **Customize Knowledge Base**
   - Edit `config.ts` for site metadata
   - Edit `knowledge.ts` for your content

## 💰 Cost Estimate

Using Claude 3 Haiku via OpenRouter:
- ~$0.00025 per request
- 1000 questions ≈ $0.25
- Very budget-friendly!

## 👥 Credits

- **AI Assistant Created by**: SYED ASIF
- **Website Developed by**: SAI SRUJAN and Technical Team
- **DevUp Founders**: Faizan Ali, Syed Asif, Thapendra, Narsing, Sanchit

## 📞 Support

Questions? Contact DevUp Society:
- Email: devupsociety@gmail.com
- WhatsApp: [Join Community](https://chat.whatsapp.com/CvU68WlMmoo5PvIBpOU5Dy)
