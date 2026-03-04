# Shreyas S - Portfolio

Personal portfolio built with Jekyll (al-folio theme) + React landing page.

## Structure

- `/` - React landing page
- `/about/` - About page (Jekyll)
- `/blog/` - Blog posts (Jekyll)
- `/projects/` - Projects (Jekyll)
- `/publications/` - Publications (Jekyll)
- `/cv/` - CV (Jekyll)

## Build & Deploy

### Prerequisites

- Ruby & Bundler (for Jekyll)
- Node.js (for React homepage)

### Install dependencies

```bash
# Jekyll dependencies
bundle install

# Homepage dependencies
cd homepage && npm install && cd ..
```

### Development

```bash
# Run Jekyll locally
bundle exec jekyll serve

# Run homepage locally (separate terminal)
cd homepage && npm run dev
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

This command:
1. Builds Jekyll site to `_site/`
2. Builds React homepage to `homepage/dist/`
3. Copies React build into `_site/`
4. Deploys `_site/` to gh-pages branch

### Manual build (without deploy)

```bash
npm run build
```
