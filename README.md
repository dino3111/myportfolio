# myportfolio

Personal portfolio of Claudino Martins — React + Vite, deployed to GitHub Pages.

Live: https://dino3111.github.io/myportfolio/

## Develop

```bash
npm install
npm run dev
```

## Edit content

All text (PT and EN) is in `src/content.js`. The photo is `src/assets/claudino*.webp`, the CV is `public/cv/Claudino-Martins-CV.pdf` (replace the file, keep the name).

## Deploy

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes to GitHub Pages
(enable it once in the repo: Settings → Pages → Source: GitHub Actions).

Design base: `DESIGN.md` (Vercel-inspired, from awesome-design-md).
