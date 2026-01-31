# Naspiro - Advanced Nasal Filtration Landing Page

A modern, responsive landing page for Naspiro nasal filtration technology built with React, Vite, and Tailwind CSS.

## Features

- ✨ Modern and responsive design
- 🎨 Tailwind CSS for styling
- ⚡ Vite for fast development
- 📱 Mobile-friendly navigation
- 🎭 Smooth animations and transitions
- 🎯 Optimized for performance

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment Options

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Vite and deploy

### Option 2: Netlify
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `dist`

### Option 3: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "vite build && gh-pages -d dist"
   ```
3. Run: `npm run deploy`

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- Lucide React (icons)

## License

MIT
