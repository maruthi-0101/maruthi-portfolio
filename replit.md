# Maruthi Sundar — Portfolio

A cinematic, dark hero-page portfolio website for Maruthi Sundar, Software Engineer.

## Tech Stack
- React 18 + Vite 5 + TypeScript
- Three.js (3D character with mouse head-tracking)
- Inter font (Google Fonts)

## Structure
```
src/
  App.tsx                        — Root component
  main.tsx                       — Entry point
  index.css                      — Global styles, cursor, animations
  components/
    Navbar.tsx                   — Fixed nav: MS logo | email | ABOUT/WORK/CONTACT
    HeroText.tsx                 — Left name + right flip text (SOFTWARE/ENGINEER)
    SocialIcons.tsx              — Fixed left sidebar: GitHub/LinkedIn/X/Instagram
    Cursor.tsx                   — Custom lag cursor (mix-blend-mode: difference)
    Character/
      Scene.tsx                  — Three.js full-screen canvas, GLB loader w/ Draco
      mouseUtils.ts              — Mouse normalization + head bone lerp rotation
      lighting.ts                — Three.js lighting presets
public/
  models/
    character.glb                — Main 3D character (Draco compressed)
    char_enviorment.hdr          — HDRI environment map
  draco/
    draco_decoder.js             — Draco WASM JS wrapper
    draco_decoder.wasm           — Draco WASM binary
  RobotExpressive.glb            — Fallback model if character.glb fails
```

## Design
- Background: `#050a12`
- Accent / teal: `#5eead4`
- Muted text: `#8b9ab0`
- Full viewport, no scroll on landing
- Entry animations: navbar fades down, name fades left, flip text fades right, social icons fade left

## Workflow
- Dev server: `npm run dev` on port 5000
