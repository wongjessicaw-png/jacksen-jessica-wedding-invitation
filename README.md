# Jacksen & Jessica Wedding Invitation

A single-page digital wedding invitation with:
- Personalized guest greeting via `?guest=Name`
- Fullscreen opening section with custom background
- Main sections revealed after clicking **Open Invitation**
- Footer social links shown together with revealed sections

## Current project structure
- `index.html` — page structure + opening/reveal logic
- `styles.css` — all visual styling (welcome, sections, footer, backgrounds)
- `config.js` — Firebase runtime config placeholder (`window.firebaseConfig`)
- `assets/` — image assets used by the page

## Firebase config
This repository intentionally uses a placeholder key in `config.js`:
`REPLACE_WITH_FIREBASE_API_KEY`

Before deploying with Firebase features enabled, replace it with your real project values.

## Run locally
```bash
python3 -m http.server 4173
```
Open:
`http://127.0.0.1:4173/index.html?guest=Andrew`
