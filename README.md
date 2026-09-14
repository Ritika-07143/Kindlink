# 🌱 KindLink — Delhi NCR Food Rescue & Community Redistribution Platform

> **Live Hyper-Local Surplus Food Routing, Verified NGO Network & Automated Section 80G Tax Certificates**  
> Engineered with purpose by **Team IMPACTRIX** for Delhi NCR zero-hunger social innovation.

---

## ⚡ Quick Start: How to Run in VS Code

All source files, production assets, and dependencies (`node_modules`) are already fully configured in this folder.

### Option 1: Run Vite Local Dev Server (Recommended)
Open your VS Code terminal (`Ctrl + ~`) and run:

```bash
npm run dev
```

Then click the local link shown in your terminal:
👉 **http://localhost:5173/**

With `npm run dev`, you get full React 18 Hot Module Replacement (HMR) — any changes you make in `src/` will instantly update live in your browser without reloading!

---

### Option 2: Run with VS Code "Live Server" Extension
If you use the popular **Live Server** extension (by Ritwick Dey) in VS Code:
1. In your VS Code Explorer sidebar on the left, expand the **`dist`** folder.
2. Right-click on **`dist/index.html`**.
3. Select **"Open with Live Server"** (or click "Go Live" in the bottom status bar).
4. The site will open with all production CSS, JS bundles, and cropped ground photos pre-compiled!

---

## 👥 Built by Team IMPACTRIX

- **Tanmay** — Innovation
- **Vivek** — Engineering
- **Mahi** — Design
- **Ritika** — Operations
- **Satyam** — Systems
- **Vishesh** — Full Stack
- **Pujitha** — Product

---

## 📁 Project Structure

```
KindLink/
├── dist/                     # Pre-bundled standalone production build (Works with Live Server!)
│   ├── assets/               # Bundled JavaScript & Tailwind CSS
│   ├── photos/               # Cropped real field drive photos
│   ├── favicon.svg           # Custom KindLink SVG favicon
│   └── index.html            # Production entry point
├── public/                   # Static public assets & logos
│   ├── photos/               # Ground reality photography
│   └── kindlink-logo.svg     # Official SVG brand mark
├── src/                      # Full React application source code
│   ├── components/           # UI components, modals, navigation & drawers
│   │   ├── animations/       # 3D TiltCard, AnimatedNumber, Particles Canvas
│   │   ├── screens/          # Landing, NGO Directory, Donor, Receiver, AI Match
│   │   ├── Navbar.jsx        # Frosted glass navbar with pill tabs
│   │   ├── Footer.jsx        # Footer with Team IMPACTRIX credits
│   │   └── KindLinkLogo.jsx  # Vector SVG brand identity
│   ├── context/              # AppContext global state manager
│   ├── data/                 # Delhi 20 NGOs dataset & mock surplus drops
│   ├── utils/                # Animations & confetti engines
│   ├── App.jsx               # Root application component
│   ├── index.css             # Tailwind styling & beige theme variables
│   └── main.jsx              # React DOM entry point
├── package.json              # Project dependencies & scripts
├── tailwind.config.js        # Custom animations, shadows & beige palette
└── vite.config.js            # Vite build configuration
```
