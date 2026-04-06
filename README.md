# Kettlebell Year

A mobile-first kettlebell yearly planner and tracker.

The app shows the current workout from a 52-week annual plan, lets you log the weight used and rounds completed, then advances to the next workout. Progress is saved locally in the browser.

## Architecture

- `src/domain`: workout entities, annual program generation, and progress use cases
- `src/data`: local persistence repository using `localStorage`
- `src/ui`: React hooks, components, and mobile-first presentation

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Netlify

This repo includes `netlify.toml`.

- Build command: `npm run build`
- Publish directory: `dist`
- Deploy flow: connect this GitHub repo in Netlify and use the default build settings from `netlify.toml`
