<objective>
Build the complete UI for the /work/ portfolio section with Stack+Deck presentation pattern.

This creates the visual experience that hiring managers will see. The design should:
- Make visitors WANT to click and explore
- Demonstrate engineering rigor through detailed documentation
- Sell your skills through clear impact statements
- Match the existing dark theme aesthetic with tasteful accent colors
</objective>

<context>
Project location: `./homepage/`
Prerequisite: Prompt 001 must be completed first (routing + data in place)

@./homepage/src/App.tsx - Layout wrapper with theme toggle
@./homepage/src/index.css - Theme variables (--bg: #0a0a0a, --fg: #f0ede6, --accent: #c8b89a)
@./homepage/src/data/work.ts - Work data model and content
@./homepage/src/pages/ - Placeholder page components

Design system:
- Font: Playfair Display (serif) for headings, Inter (sans) for body
- Dark theme: bg #0a0a0a, text #f0ede6, accent #c8b89a
- Swiss theme: bg white, text black, accent mint #a7f3d0
- Use Motion (framer-motion) for animations
- Use lucide-react for icons
</context>

<requirements>

## 1. Add "Work" Button to Navigation

In the home page nav section, add a prominent "Work" button:
- Use a distinct color that pops: suggest `#e85d04` (burnt orange) or `#8338ec` (electric purple)
- Style as a pill/badge that stands out from other nav links
- Add subtle hover animation (scale, glow)
- Should feel clickable and inviting
- Works in both dark AND swiss themes

## 2. Work Landing Page (`/work`)

Grid of company cards showing:
- Company name (large)
- Role + Period
- 1-line summary
- Number of documented tasks: "4 case studies"
- Tech stack pills
- Hover effect: lift + accent border glow

Layout: 2-column grid on desktop, single column on mobile
Add a back arrow/link to home

## 3. Company Detail Page (`/work/:companyId`)

One-pager layout:
```
[Back to Work]

# {Company Name}
{Role} | {Location} | {Period}

## Overview
{summary paragraph}

## Team & Context
{teamContext}

## Tech Stack
[pill] [pill] [pill]

## Case Studies
[Task Card 1] [Task Card 2] ...
```

Task cards show:
- Task title
- Deck.problem (truncated)
- Deck.tags as small pills
- Click to go to full task page

## 4. Task Detail Page (`/work/:companyId/task/:taskId`)

This is the crown jewel - the Stack+Deck presentation:

```
[Back to {Company}]

# {Task Title}
[tag] [tag] [tag]

---

## TL;DR (The Deck)
> **Problem**: {deck.problem}
> **Solution**: {deck.solution}
> **Impact**: {deck.impact}

---

## Deep Dive (The Stack)

### Context
{stack.context}

### Architecture
{stack.architecture}
[Consider adding a placeholder for diagrams: "Architecture diagram coming soon"]

### Implementation
{stack.implementation}

### Challenges & Trade-offs
{stack.challenges}

### Retrospective
{stack.learnings}
```

Design notes:
- Deck section should be visually distinct (card/box with accent border)
- Stack sections use clean typography hierarchy
- Add subtle section dividers
- Consider collapsible sections for very long content
- Add "View on GitHub" placeholder link if applicable

## 5. Animations & Polish

- Page transitions: fade + slight slide
- Stagger animations on card grids
- Smooth scroll behavior
- Hover states on all interactive elements
- Loading states (even if instant, shows polish)

## 6. Responsive Design

- Mobile: single column, full-width cards
- Tablet: 2-column where appropriate
- Desktop: max-width container (match existing ~4xl)
- Touch-friendly tap targets

</requirements>

<implementation>
1. Add the "Work" button to nav in both theme variants in Home.tsx
2. Build `./homepage/src/pages/Work.tsx` - company grid
3. Build `./homepage/src/pages/CompanyDetail.tsx` - company one-pager
4. Build `./homepage/src/pages/TaskDetail.tsx` - stack+deck showcase
5. Create shared components in `./homepage/src/components/`:
   - `BackLink.tsx` - consistent back navigation
   - `TechPill.tsx` - reusable tech tag
   - `CompanyCard.tsx` - card for work landing
   - `TaskCard.tsx` - card for company detail
6. Add any new CSS variables to index.css
7. Ensure theme toggle works across all pages
</implementation>

<output>
Files to create/modify:
- `./homepage/src/pages/Home.tsx` - Add Work button to nav
- `./homepage/src/pages/Work.tsx` - Full implementation
- `./homepage/src/pages/CompanyDetail.tsx` - Full implementation
- `./homepage/src/pages/TaskDetail.tsx` - Full implementation
- `./homepage/src/components/BackLink.tsx`
- `./homepage/src/components/TechPill.tsx`
- `./homepage/src/components/CompanyCard.tsx`
- `./homepage/src/components/TaskCard.tsx`
- `./homepage/src/index.css` - Any new variables/styles
</output>

<verification>
1. Run `cd ./homepage && npm run dev`
2. Test navigation flow:
   - Home → Click Work button → Work page
   - Work → Click company card → Company detail
   - Company → Click task card → Task detail
   - Task → Back links work correctly
3. Test theme toggle on every page (click the "S.")
4. Test responsive: resize browser from mobile to desktop
5. Verify all 4 companies and 11 tasks render correctly
6. Check animations are smooth (no jank)
7. TypeScript check: `cd ./homepage && npm run lint`
</verification>

<success_criteria>
- Work button is visually prominent and inviting to click
- All pages render with proper styling matching existing aesthetic
- Stack+Deck pattern clearly visible on task pages
- Theme toggle works on all pages
- Smooth animations throughout
- Fully responsive
- All navigation flows work
- No TypeScript errors
- A hiring manager visiting would be impressed by the documentation depth
</success_criteria>
