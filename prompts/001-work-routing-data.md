<objective>
Set up React Router and create the work experience data model for the portfolio's /work/ section.

This is the foundation for a professional portfolio feature that showcases work experience using the "Stack and Deck" methodology:
- **Deck**: High-level executive summary (what problem, what impact, quick sell)
- **Stack**: Deep technical documentation (architecture, ERDs, implementation details, engineering rigor)

The goal is to demonstrate both communication skills AND technical depth to hiring managers.
</objective>

<context>
Project location: `./homepage/`
Tech stack: React 19, Vite, Tailwind CSS 4, Motion (framer-motion), TypeScript
Current state: Single-page app in `./homepage/src/App.tsx` with no routing

@./homepage/src/App.tsx - Current app structure (has dark/swiss theme toggle)
@./homepage/src/index.css - Theme variables and styling
@./homepage/package.json - Current dependencies
</context>

<requirements>
1. **Install react-router-dom** - Add to dependencies

2. **Create routing structure**:
   - `/` - Home (existing App content)
   - `/work` - Work landing page (lists all companies)
   - `/work/:companyId` - Company detail page (one-pager)
   - `/work/:companyId/task/:taskId` - Individual task/feature ERD page

3. **Create work data model** in `./homepage/src/data/work.ts`:

```typescript
interface Task {
  id: string;
  title: string;
  // DECK (the sell)
  deck: {
    problem: string;      // 1-2 sentences: what problem existed
    solution: string;     // 1-2 sentences: what you built
    impact: string;       // Quantified results
    tags: string[];       // Tech tags for quick scanning
  };
  // STACK (the rigor) - can be markdown
  stack: {
    context: string;      // Business/technical context
    architecture: string; // System design, data flow
    implementation: string; // Key technical decisions
    challenges: string;   // Problems solved, trade-offs made
    learnings: string;    // What you'd do differently
  };
}

interface Company {
  id: string;
  name: string;
  logo?: string;         // Optional logo path
  role: string;
  location: string;
  period: string;
  // Company-level deck
  summary: string;       // 2-3 sentence elevator pitch
  teamContext: string;   // Team size, your role in team
  techStack: string[];   // Overall tech used
  tasks: Task[];
}
```

4. **Populate with this work data** (company names ARE allowed, but obfuscate proprietary business logic):

**Puch AI** (AI Engineering Intern, Jul-Sep 2025, Remote - Bengaluru)
- Task 1: "GPU-Accelerated Speech Pipeline" - Parallelized STT on H100s using CUDA streams, 18% latency reduction (142→116ms), 7% throughput increase
- Task 2: "Low-Latency Audio Synthesis" - Optimized TTS decoder for reduced latency and improved audio quality
- Task 3: "Multimodal Content Generation" - Audio generation for text-to-video workflows, launch achieved 700k+ impressions
- Task 4: "Distributed Protocol Architecture" - Extended MCP from single to multi-server connectivity, shipped to millions of users

**ScoreTravel** (ML Intern, Mar-Jun 2025, Remote - California)
- Task 1: "Concurrent OCR Microservice" - FastAPI + PaddleOCR with O(n) sliding-window duplicate detection, 3000+ frames across 30 videos
- Task 2: "MLOps Evaluation Pipeline" - W&B Bayesian sweeps, WER/precision/F1 tracking, VLM vs traditional OCR benchmarking

**Emory University / GSoC** (GSoC Contributor, May-Sep 2024, Remote - Atlanta)
- Task 1: "Foundation Model for Biosignals" - Conformer + GPT-2 architecture, 70% downstream accuracy, 55% training speedup via DistilGPT2
- Task 2: "Model Interpretability Framework" - Cross-validation, ROC-AUC evaluation, DeepLIFT feature attribution

**DigitalFortress** (AI/ML Researcher, Sep 2023-Apr 2024, Amaravati)
- Task 1: "Natural Language Database Interface" - LangChain MongoDB agent, 120+ queries/day, sub-200ms response
- Task 2: "Automated Media Pipeline" - Video processing automation, 8hr→15min per batch, 99.9% upload success
- Task 3: "Super-Resolution Enhancement" - ESRGAN 2x→4x upgrade, 50k+ frames, 10% face recognition improvement

**Obfuscation guidelines for stack content**:
- Use generic industry terms: "voice AI platform", "travel tech startup", "research institution"
- Focus on architectural patterns, not business features
- Describe technical challenges generically: "real-time inference constraints" not "product X's latency requirements"
- Metrics are fine (they're in public resume), but don't reveal internal benchmarks
</requirements>

<implementation>
1. Run `cd ./homepage && npm install react-router-dom`
2. Create `./homepage/src/data/work.ts` with interfaces and populated data
3. Create `./homepage/src/router.tsx` with route definitions
4. Update `./homepage/src/main.tsx` to use BrowserRouter
5. Refactor `./homepage/src/App.tsx` to be a layout wrapper that renders `<Outlet />`
6. Create placeholder page components in `./homepage/src/pages/`:
   - `Home.tsx` (move existing App content here)
   - `Work.tsx` (placeholder)
   - `CompanyDetail.tsx` (placeholder)
   - `TaskDetail.tsx` (placeholder)
</implementation>

<output>
Files to create/modify:
- `./homepage/src/data/work.ts` - Data model and content
- `./homepage/src/router.tsx` - Route configuration
- `./homepage/src/main.tsx` - Router provider setup
- `./homepage/src/App.tsx` - Convert to layout
- `./homepage/src/pages/Home.tsx` - Existing home content
- `./homepage/src/pages/Work.tsx` - Placeholder
- `./homepage/src/pages/CompanyDetail.tsx` - Placeholder
- `./homepage/src/pages/TaskDetail.tsx` - Placeholder
</output>

<verification>
1. Run `cd ./homepage && npm run dev` - should start without errors
2. Navigate to `/` - should show existing home page
3. Navigate to `/work` - should show placeholder
4. Check that all routes resolve without 404
5. Verify TypeScript compiles: `cd ./homepage && npm run lint`
</verification>

<success_criteria>
- React Router installed and configured
- All 4 route levels working (/, /work, /work/:id, /work/:id/task/:id)
- Work data fully populated with all 4 companies and 11 tasks
- Existing home page functionality preserved (theme toggle works)
- No TypeScript errors
</success_criteria>
