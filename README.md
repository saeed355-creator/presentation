# Present.AI — AI Presentation Story & Design Engine

> **Turn any raw idea or document into an award-winning, widescreen presentation in seconds.**

![Present.AI Banner](https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Overview

**Present.AI** is an AI-powered presentation platform that goes beyond standard text generation. It understands **content, story structure, audience context, slide classification, spatial layout, typography hierarchy, and visual assets** to output gallery-quality presentation decks.

Built with Next.js 14, TypeScript, TailwindCSS, Google Gemini AI, and Supabase, Present.AI eliminates manual layout friction so founders, executives, students, and professionals can focus on strategic communication.

---

## 🎯 Problem It Solves

- **The Blank Canvas Trap**: Creating a high-impact presentation deck usually takes 4 to 8 hours of manual alignment, layout tweaking, and stock image hunting.
- **Repetitive Plain-Text Slides**: Generic AI tools output wall-of-text slides that all look identical.
- **Inconsistent Design Hierarchy**: Mismatched typography, poor color contrast, and fragmented narrative arcs reduce executive engagement.

---

## 🚀 Key Features

- **✦ Google Stitch Design System**: Minimal, high-contrast warm editorial aesthetic with `Playfair Display` serif headlines, `Inter` controls, and `JetBrains Mono` tracking labels.
- **🧠 Semantic Slide Type Intelligence**: Automatically classifies slides into specialized layout types (`TITLE`, `PROBLEM`, `SOLUTION`, `COMPARISON`, `PROCESS`, `TIMELINE`, `STATISTICS`, `DATA_CHART`, `TEXT_IMAGE`, `CONCLUSION`).
- **✏️ 4-Column Presentation Studio Editor**: Full web canvas editor with vertical slide thumbnails, floating `✦ AI MAGIC` command bar, single-slide revision prompt, and live typography inspector.
- **📊 Real-Time AI Story Engine**: Converts topics or document text into a 2-stage interactive outline before rendering the widescreen deck.
- **📤 Native 16:9 .PPTX & Vector PDF Export**: Generates native PowerPoint files with custom shape cards, metric boxes, comparison columns, and high-res imagery using `pptxgenjs`.
- **🎙️ Practice Coach**: Built-in speech timer and real-time presentation confidence evaluator.
- **🔒 Action-Gated Auth**: Public landing page browsing with seamless authentication triggers on protected actions.

---

## 🔄 How the AI Presentation Engine Works

```
USER TOPIC / DOCUMENT
       │
       ▼
AI CONTEXT ANALYSIS (Audience, Purpose, Tone, Slide Count)
       │
       ▼
STORY OUTLINE GENERATION (2-Stage Interactive Approval)
       │
       ▼
SEMANTIC SLIDE CLASSIFICATION (Title, Problem, Process, Stats, Chart, Text+Image)
       │
       ▼
EDITORIAL LAYOUT & ASSET RESOLUTION (Unsplash High-Res Photos + Structured Cards)
       │
       ▼
WIDESCREEN 16:9 CANVAS & NATIVE .PPTX / .PDF EXPORT
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Typography**: [Google Fonts (Playfair Display, Inter, JetBrains Mono)](https://fonts.google.com/)
- **AI Engine**: [Google Gemini AI API (`@google/generative-ai`)](https://ai.google.dev/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **PowerPoint Exporter**: [pptxgenjs](https://gitbrent.github.io/PptxGenJS/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)

---

## 📁 Project Structure

```
├── app/
│   ├── api/                # Next.js API Routes (/api/generate, /api/edit-slide)
│   ├── editor/[id]/        # 4-Column Presentation Studio Editor
│   ├── generate/           # Story Engine Dashboard & Outline Editor
│   ├── presentations/      # Saved Presentations Workspace
│   ├── templates/          # The Gallery Templates Workspace
│   ├── settings/           # Public Profile Settings
│   ├── sign-in/            # Standalone Sign In Route
│   ├── sign-up/            # Standalone Sign Up Route
│   ├── globals.css         # Global Styles & Stitch Design Tokens
│   ├── layout.tsx          # Root Layout & Error Boundary Wrapper
│   └── page.tsx            # Public Landing Page (13 Sections)
├── components/
│   ├── editor/             # Canvas, Inspector Panel, AI Bar, Export Modal
│   ├── AuthModal.tsx       # Elevated Action-Gated Auth Modal
│   ├── AuthProvider.tsx    # Context Provider for Auth & Session Persistence
│   ├── Navbar.tsx          # Sleek Stitch Header Navigation
│   └── ...                 # Landing Page Bento & Feature Cards
├── lib/
│   ├── ai.ts               # AI Presentation Engine & Asset Resolver
│   ├── pptx.ts             # Native PowerPoint (.pptx) Exporter
│   ├── pdf.ts              # Vector PDF (.pdf) Exporter
│   ├── supabase.ts         # Supabase Client & DB Storage Helpers
│   ├── storage.ts          # Local Storage Fallback Cache
│   ├── themes.ts           # 6 Editorial Design Themes
│   └── types.ts            # TypeScript Interfaces & Schemas
├── middleware.ts           # Route Protection & Cookie Handling
├── next.config.mjs         # Next.js Configuration
└── tailwind.config.ts      # Custom Color Palette & Font Tokens
```

---

## ⚙️ Installation & Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/saeed355-creator/presentation.git
cd presentation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory (refer to `.env.example`):

```env
# Gemini AI Integration Credentials
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Authentication & Database Credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Run the Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 🔒 Security & Privacy Notes

- **Zero Hardcoded Credentials**: No private keys, database passwords, or API tokens are hardcoded in the codebase.
- **Server-Side Key Isolation**: `GEMINI_API_KEY` is executed exclusively in Next.js Server API routes (`/api/generate`, `/api/edit-slide`).
- **Protected Environment Files**: All `.env*` files are strictly excluded from version control via `.gitignore`.

---

## 🚀 Deployment Instructions (Vercel)

1. Push your code to your GitHub repository.
2. Import the project into **[Vercel](https://vercel.com/)**.
3. Add environment variables (`GEMINI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel Dashboard settings.
4. Deploy! Next.js will automatically build all static and dynamic routes.

---

## 🔮 Future Improvements

- **Live Real-Time Collaboration**: Collaborative multi-user slide editing via Supabase Realtime.
- **Custom Brand Kit Uploader**: Upload custom font files (`.ttf`/`.woff2`) and company brand logos.
- **Voiceover Video Export**: Automatically render AI-narrated MP4 presentation walkthroughs.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
