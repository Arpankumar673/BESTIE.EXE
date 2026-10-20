# BESTIE.EXE 💗

> A cute, interactive, mobile-first friendship surprise website crafted with love, humor, scrapbook aesthetics, and celebratory confetti.

---

## 🌸 Quick Start Guide

### 1. Install Dependencies
Open your terminal inside this folder (`BESTIE.EXE_2`):
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the URL printed in terminal) in your browser.

### 3. Build for Production
To create an optimized static website ready to host on Vercel, Netlify, or GitHub Pages:
```bash
npm run build
```
The output will be in the `dist/` directory.

---

## 🎨 How to Personalize

All text, names, captions, letter paragraphs, and settings are centralized in one single file:
👉 **`src/data/content.js`**

### 1. Change Your Best Friend's Name
Open `src/data/content.js` and edit:
```javascript
bestieName: 'Sarah', // Replace '[BESTIE NAME]' with her real name or nickname
senderName: 'Your Bestie 💗', // Replace with your name
```

### 2. Add Your Photographs
Save your pictures in:
📁 **`public/images/`**

**Intro Screen Tilted Photos:**
- `top-photo-1.jpg` — Left tilted Polaroid on the opening card
- `top-photo-2.jpg` — Right tilted Polaroid on the opening card

**Scrapbook Memories:**
- `photo-1.jpg` — Memory 1 ("The beginning of our chaos 📸")
- `photo-2.jpg` — Memory 2 ("Proof that we're actually normal sometimes 😂")
- `photo-3.jpg` — Memory 3 ("A moment worth keeping ✨")
- `photo-4.jpg` — Memory 4 ("Our kind of happiness 💕")
- `photo-5.jpg` — Memory 5 ("Another memory unlocked 🔓")
- `photo-6.jpg` — Memory 6 ("More memories to come 🫶")

> **Graceful Fallback:** If any photo is missing or yet to be uploaded, the site automatically renders a cute pastel placeholder card with a heart icon and *"Our memory goes here 💗"*, without any broken image icons or layout shifting!

### 3. Edit Photo Captions
In `src/data/content.js`, locate `scrapbook.photos` and customize the `caption` or `title` fields.

### 4. Edit The Friendship Letter
In `src/data/content.js`, locate `letter.paragraphs` to personalize the letter body text.

### 5. Customize the Quiz & Appreciation Cards
In `src/data/content.js`, you can modify:
- `verification.noResponses`: Funny answers when clicking "NO"
- `appreciation.cards`: Titles and descriptions of the 4 appreciation cards

---

## 📱 Features & Highlights

- **Mobile-First Experience**: Designed and tested specifically for smartphone screens (320px, 375px, 390px, 430px) as well as tablet and desktop displays.
- **Zero Backend**: 100% frontend React application. No databases, Firebase, Supabase, or external API keys required.
- **Tactile Scrapbook Design**: Washi tape strips, polaroid tilt frames, handwritten typography (`Caveat` & `Quicksand`), and soft pastel colors.
- **Interactive Quiz**: Playfully dodges clicks on "NO" with witty responses, while "YES" launches floating hearts.
- **Unfolding Letter**: Animated sealed envelope opens to reveal a heartfelt letter.
- **Confetti Grand Finale**: Multi-stage celebration with `canvas-confetti` and an instant "Replay" button to restart the journey anytime.
- **Accessibility**: Smooth transitions, ARIA attributes, keyboard navigation, and reduced-motion support.
