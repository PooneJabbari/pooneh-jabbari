# Pooneh Jabbari - Interactive Portfolio

A unique, game-like portfolio website featuring **two distinct modes**: an interactive canvas experience with draggable modal windows (Game Mode) and a traditional scrolling layout (Simple Mode).

## 🌟 Key Features

### 🎮 Game Mode (Desktop)

- **Canvas-based interface** with central video hub
- **Draggable section modals** that can be moved, minimized, and closed
- **Multiple interaction methods**: keyboard shortcuts, clicking, dragging, triple-clicking
- **Visual hints** positioned around the screen guiding exploration
- **Window management** like a desktop operating system

### 📱 Simple Mode (Mobile & Optional Desktop)

- **Traditional scrolling** with smooth animations
- **Responsive design** optimized for all devices
- **All sections accessible** through standard navigation
- **Automatic on mobile** (screens < 1024px)

### 🎨 Design System

- **Dark mode only** with purple/violet accent colors
- **Glassmorphism effects** throughout the UI
- **3D elements** using Three.js and React Three Fiber
- **Smooth animations** powered by Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The site will be available at **http://localhost:3001**

## 🎮 Game Mode Interactions

### Reveal Sections

| Interaction              | Section    | Description         |
| ------------------------ | ---------- | ------------------- |
| Press `X`                | Experience | Work history        |
| Press `C`                | Contact    | Contact information |
| Press `A`                | About      | About me + video    |
| Click circle (top-right) | Skills     | Tech stack          |
| Drag diamond → (left)    | Education  | Academic background |
| Triple-click anywhere    | About      | Alternative method  |

### Window Controls

- **Drag title bar**: Move window anywhere
- **Minimize button**: Collapse to small size
- **Maximize button**: Restore full size
- **Close button**: Dismiss window

### Mode Switching

- **Top-left button**: Switch to Simple Mode
- **Top-right button** (in Simple Mode): Return to Game Mode

## 📱 Responsive Behavior

- **Mobile (< 1024px)**: Automatically loads Simple Mode
- **Desktop (≥ 1024px)**: Starts in Game Mode, can switch to Simple Mode
- **Touch-optimized**: All interactions work on touch devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19.x
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **Icons**: Lucide React
- **Language**: TypeScript

## 📂 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and theme
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Mode detection and switching
├── components/
│   ├── GameMode.tsx          # Canvas-based interactive mode
│   ├── SimpleMode.tsx        # Traditional scrolling mode
│   ├── HeroSection.tsx       # Hero with 3D background
│   ├── Scene3D.tsx           # Three.js animated sphere
│   ├── AboutSection.tsx      # About with video
│   ├── ExperienceSection.tsx # Work history
│   ├── SkillsSection.tsx     # Tech skills with 3D
│   ├── EducationSection.tsx  # Education background
│   ├── ContactSection.tsx    # Contact information
│   └── Footer.tsx            # Footer component
├── lib/
│   └── utils.ts              # Utility functions
└── types/
    └── three.d.ts            # Three.js type definitions
```

## 🎨 Customization

### Colors

Edit `src/app/globals.css` to change the color scheme:

```css
:root {
  --background: oklch(0.13 0.028 261.692);
  --foreground: oklch(0.985 0.002 247.839);
  --primary: oklch(0.662 0.231 301.371);
  /* ... other variables */
}
```

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## 📄 License

This project is open source and available for personal and commercial use.

## 👤 Contact

**Pooneh Jabbari**

- Email: poonehjabbari.98@gmail.com
- Phone: 093204993465
- LinkedIn: [poone-jabbari-9690s1227](https://www.linkedin.com/in/poone-jabbari-9690s1227)
- Location: Tehran, Iran

---

**Built with ❤️ using Next.js, Three.js, and Framer Motion**
