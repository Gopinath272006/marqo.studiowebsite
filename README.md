# MARQO — Motion Design Studio Portfolio

> Built for **MARQO** (Gopinath Kanniyappan) | Motion Design Studio, Ivory Coast  
> Developer: [Gopinath Kanniyappan](mailto:marqostudioss@gmail.com)

---

## 🚀 Getting Started

### Prerequisites — Install These First
- [Node.js](https://nodejs.org/) (version 18 or higher) — download and install, then restart your computer
- That's it! `npm` comes bundled with Node.js.

### Step 1 — Clone the Project to Your Computer
Open your Terminal (Mac) or Command Prompt (Windows) and run:
```bash
git clone https://github.com/Gopinath272006/marqo.studiowebsite.git
cd marqo.studiowebsite
```

### Step 2 — Install Project Packages
```bash
npm install
```
_(This downloads all the tools needed. Wait for it to finish — takes 1–2 minutes.)_

### Step 3 — Start the Live Preview
```bash
npm run dev
```
Then open your browser and go to: **http://localhost:3000**  
You will see the full website running on your computer!

### Step 4 — Build for Production (When Ready to Go Live)
```bash
npm run build
```
The finished website files will appear in the `dist/public/` folder.

---

## 🎬 How to Update Videos — Step by Step

> ⚠️ **IMPORTANT:** Before making any edits, open the file `src/App.tsx` in a code editor (like VS Code). This is the ONE main file where all videos and project information live.

---

### 📂 The File to Edit: `src/App.tsx`

Open this file. It has **794 lines**. Don't be scared — you only need to change a few spots.

---

### 🖥️ PLACE 1 — Work Page Videos (Your Portfolio Projects)

**👉 Go to Line 31 in `src/App.tsx`**

You will see a section that looks exactly like this:

```tsx
// ============================================================
// LINE 31 — YOUR PORTFOLIO PROJECTS START HERE
// Add, edit, or delete your work projects in this list below.
// Each block between { } is one project card on the Work page.
// ============================================================

const projects: Project[] = [

  // ---- PROJECT 1 — EDIT OR DELETE THIS ----
  {
    slug: 'showreel',                          // URL name (no spaces, use dashes)
    title: 'Showreel',                         // Title shown on the card
    client: 'MARQO',                           // Client name
    year: '2024',                              // Year of the project
    type: 'Brand film',                        // Category (used for filtering)
    description: 'Motion design that makes you impossible to ignore.',  // Short description
    color: '#15223b',                          // Background color of the card
    ink: '#f3f0e9',                            // Text color on the card
    videoUrl: '/AQMxTHrvLP...mp4',             // ⭐ VIDEO FILE NAME — change this!
  },

  // ---- PROJECT 2 — EDIT OR DELETE THIS ----
  {
    slug: 'follow-on-instagram',
    title: 'follow on instagram',
    client: 'MARQO',
    year: '2024',
    type: 'Social',
    description: 'Follow me on Instagram for more motion design.',
    color: '#D4FF3D',
    ink: '#15223b',
    videoUrl: '/AQPnwGKf...mp4',               // ⭐ VIDEO FILE NAME — change this!
  },

];
// ============================================================
// LINE 34 — PROJECT LIST ENDS HERE
// ============================================================
```

---

### ✅ How to ADD a New Project

**Step 1:** Add your new video file (e.g. `my-new-video.mp4`) into the **`public/`** folder of the project.

**Step 2:** Inside the `projects` list (between Line 31 and 34), copy and paste this block — add it after the last `},` and before the `];`:

```tsx
  // ---- NEW PROJECT — ADD YOUR INFO HERE ----
  {
    slug: 'my-project-slug',        // ← Change this: URL-friendly name, no spaces (use dashes)
    title: 'My Project Title',      // ← Change this: The title shown on the project card
    client: 'Client Name',          // ← Change this: Who was this project for?
    year: '2025',                   // ← Change this: Year of project
    type: 'Brand film',             // ← Change this: Pick one from the list below
    description: 'A short one-liner about this project.',  // ← Change this
    color: '#15223b',               // ← Card background color (dark blue by default)
    ink: '#f3f0e9',                 // ← Card text color (cream by default)
    videoUrl: '/my-new-video.mp4',  // ← Change this: must match your file in /public folder
  },
```

**Available `type` values** — copy one exactly:
- `'Brand film'`
- `'Campaign'`
- `'Visual system'`
- `'Identity'`
- `'Launch film'`
- `'Title sequence'`
- `'Social'`

---

### ❌ How to DELETE a Project

Simply delete the entire block for that project — from the opening `{` to the closing `},` (including the comma).

**Example — delete this entire block:**
```tsx
  {                                         // ← delete from here
    slug: 'follow-on-instagram',
    title: 'follow on instagram',
    client: 'MARQO',
    year: '2024',
    type: 'Social',
    description: 'Follow me on Instagram for more motion design.',
    color: '#D4FF3D',
    ink: '#15223b',
    videoUrl: '/AQPnwGKf...mp4',
  },                                        // ← all the way to here
```

---

### 🖥️ PLACE 2 — Home Page "In Good Company" Video (The Big Scroll Video)

**👉 Go to Line 243 in `src/App.tsx`**

You will see this line:

```tsx
// ============================================================
// LINE 243 — HOME PAGE SCROLL VIDEO
// This is the big cinematic video that plays on the Home page
// as the user scrolls down into the "In Good Company" section.
// To change it, replace the filename in src= below.
// ============================================================

src="/AQPkNfYl92g59UUl2MH...mp4"   // ⭐ Replace this filename with your new video
```

**To update it:**
1. Put your new video file in the `public/` folder (e.g. `home-video.mp4`)
2. On Line 243, change the filename:
   ```tsx
   src="/home-video.mp4"   // your new file name
   ```

---

### 🖥️ PLACE 3 — Hero Section Video (The Very First Video Visitors See)

This video is managed in a separate file:  
**`src/components/ui/prisma-hero.tsx`**

Open that file and look for:
```tsx
// ============================================================
// HERO VIDEO — This is the very first video on the website.
// Replace the src URL below with your new video source.
// ============================================================

videoSrc="https://..."    // ⭐ Replace this with your video URL or /public file path
```

---

## 🖼️ How to Update Images

Replace these files in the `public/` folder with your own. **Keep the exact same filenames.**

| File Name | Where It's Used |
|-----------|-----------------|
| `PHOTO-2026-08-11-18-24-22.jpg` | Your profile photo (shown in Hero, About, and Contact sections) |
| `PHOTO-2026-08-11-18-36-50-removebg-preview.png` | Your MARQO logo (transparent background PNG — used everywhere) |

---

## 🌐 How to Update Your Site Title & Description

Open **`index.html`** (in the root folder).  
Find these lines near the top and change the text:

```html
<!-- LINE 6 — BROWSER TAB TITLE -->
<title>MARQO | Motion Design Studio in Ivory Coast</title>

<!-- LINE 7 — GOOGLE SEARCH DESCRIPTION -->
<meta name="description" content="MARQO is an independent motion design studio..." />

<!-- LINE 22 — SOCIAL SHARE TITLE (when someone shares your link on WhatsApp, etc.) -->
<meta property="og:title" content="MARQO | Motion Design Studio in Ivory Coast" />
```

---

## 🚢 How to Deploy (Put the Site Online)

**Easiest option — Vercel (Free):**

1. Go to [vercel.com](https://vercel.com) → Sign up with your GitHub account
2. Click **"Add New Project"**
3. Choose **`marqo.studiowebsite`** from your GitHub repos
4. Set these settings:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/public`
5. Click **Deploy** ✅ — your site will be live in 2 minutes!

---

## 📬 Contact & Support

| | |
|---|---|
| **Designer / Developer** | Gopinath Kanniyappan |
| **Studio** | MARQO Motion Design Studio |
| **Email** | marqostudioss@gmail.com |
| **Instagram** | [@marqo.motion](https://www.instagram.com/marqo.motion) |
| **TikTok** | [@marqo.motion](https://www.tiktok.com/@marqo.motion) |
| **WhatsApp** | +225 0799836340 |
| **Location** | Ivory Coast / Côte D'Ivoire |
