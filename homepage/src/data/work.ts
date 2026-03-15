export interface Task {
  id: string;
  title: string;
  deck: {
    problem: string;
    solution: string;
    impact: string;
    tags: string[];
  };
  stack: {
    context: string;
    architecture: string;
    implementation: string;
    challenges: string;
    learnings: string;
  };
  images?: string[]; // Optional array of image URLs for the case study carousel
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  teamContext: string;
  techStack: string[];
  tasks: Task[];
}

export const companies: Company[] = [
  {
    id: "profound",
    name: "Profound",
    role: "Software Engineer",
    location: "Remote",
    period: "Dec 2025 - Present",
    summary: "Building a full-stack CMS from the ground up. Designed and implemented core systems including schema-driven forms, blocks architecture, routes management, collections engine, and template builder with no-code schema creation.",
    teamContext: "Part of a small engineering team building a headless CMS. Collaborated closely on architecture decisions, PR reviews, and feature development. Onboarded new team members and established development patterns.",
    techStack: ["TypeScript", "React", "Next.js", "Supabase", "tRPC", "Zustand", "Immer", "Tailwind CSS", "Monaco Editor", "CEL"],
    tasks: [
      {
        id: "blocks-crud-system",
        title: "Blocks CRUD Architecture",
        deck: {
          problem: "Needed a robust content blocks system that supports complex nested schemas, real-time editing, and handles concurrent modifications without data loss.",
          solution: "Designed and implemented the complete Blocks CRUD architecture with schema-driven forms, optimistic locking for auto-save race conditions, and comprehensive validation guardrails.",
          impact: "Merged foundational PR that enabled the entire content editing experience. Fixed critical auto-save race conditions and added regression tests.",
          tags: ["Architecture", "Auto-save", "Optimistic Locking", "Schema-driven"]
        },
        stack: {
          context: "The CMS required a flexible blocks system where content editors could compose pages from reusable components. Each block type has its own schema defining fields, validation rules, and rendering behavior.",
          architecture: "Schema-driven architecture where block definitions drive form generation, validation, and metadata extraction. Optimistic locking prevents race conditions when multiple auto-save operations fire concurrently.",
          implementation: "Built the blocks list, detail, create/edit flows with proper state transitions. Implemented draft validation guardrails with documented deferred RLS scope. Created demo PR with schema-driven form validation and metadata extraction.",
          challenges: "Auto-save introduced race conditions where rapid edits could overwrite each other. Solved by implementing optimistic locking that detects version conflicts and merges changes appropriately.",
          learnings: "Schema-driven systems provide excellent flexibility but require careful design upfront. Optimistic locking is essential for any auto-save implementation—users expect their edits to never be lost."
        }
      },
      // {
      //   id: "routes-collections",
      //   title: "Routes & Collections Engine",
      //   deck: {
      //     problem: "The headless CMS needed a routing system that maps URL patterns to content schemas, plus a collections engine for organizing and querying documents.",
      //     solution: "Implemented end-to-end Routes CRUD with admin UI and built the Collections engine that maps route patterns to document schemas.",
      //     impact: "Built complete lifecycle management with filtering, pagination, loading states, and error handling. Opened PRs for both features that aligned with the headless CMS architecture.",
      //     tags: ["Routes", "Collections", "Admin UI", "State Management"]
      //   },
      //   stack: {
      //     context: "A headless CMS needs to understand URL structure and map routes to content types. Routes define how URLs resolve to content, while collections group documents by schema.",
      //     architecture: "Routes define URL patterns with parameters that map to collection schemas. Collections engine handles document CRUD, querying, and schema validation. Admin UI provides management interfaces for both.",
      //     implementation: "Built routes list, detail, create/edit flows with state transitions, filtering, and pagination. Created assign page for dropdown-based route-to-collection mapping. Implemented collection procedures according to headless CMS patterns.",
      //     challenges: "Aligning the headless vs headful architecture required iterating on the design. UI had fields not present in backend—made them consistent and fixed procedures to align entire e2e workflow.",
      //     learnings: "Reading existing documentation and comparing architectures (~80% similar to reference docs) before implementing saves significant rework. Route patterns to collection mappings require clear mental models."
      //   }
      // },
      // {
      //   id: "state-management",
      //   title: "Admin UI State Management",
      //   deck: {
      //     problem: "The Admin UI needed consistent state management across complex forms, real-time updates, and optimistic UI patterns without prop drilling or performance issues.",
      //     solution: "Implemented Zustand state management throughout the Admin UI with Immer for immutable updates, enabling clean state transitions and optimistic updates.",
      //     impact: "Refactored the entire admin interface to use consistent state patterns. Improved code organization and enabled features like undo/redo and optimistic updates.",
      //     tags: ["Zustand", "Immer", "State Management", "Admin UI"]
      //   },
      //   stack: {
      //     context: "Complex admin interfaces require predictable state management. The CMS has nested forms, draft states, validation, and real-time collaboration features.",
      //     architecture: "Zustand stores handle feature-specific state with Immer enabling mutable-style syntax for immutable updates. Stores are composable and can subscribe to each other for cross-feature coordination.",
      //     implementation: "Set up Zustand stores for blocks, routes, collections, and documents. Integrated Immer for clean nested state updates. Implemented optimistic UI patterns that update immediately and reconcile on server response.",
      //     challenges: "Figuring out the right store boundaries and tradeoffs between global vs local state. Some features needed shared state access while others were isolated.",
      //     learnings: "Zustand with Immer is an excellent combination—simple mental model, great devtools, and performant. Would recommend this stack over Redux for most admin UIs."
      //   }
      // },
      // {
      //   id: "template-builder",
      //   title: "Template Builder & No-Code Schema",
      //   deck: {
      //     problem: "Content creators needed to define their own content schemas without writing code, and build templates that compile to published articles.",
      //     solution: "Designed and built a no-code schema builder UI from scratch, plus a template builder that compiles templates to publishable content via the editor.",
      //     impact: "Enabled non-technical users to create custom content types. Template builder compiles published articles, completing the content authoring workflow.",
      //     tags: ["No-Code", "Schema Builder", "Template Builder", "Editor Integration"]
      //   },
      //   stack: {
      //     context: "A modern CMS should let content teams define their own content models. The schema builder provides a visual interface for creating fields, validation rules, and relationships.",
      //     architecture: "Schema builder generates schema definitions that drive form generation, validation, and API contracts. Template builder uses these schemas to create editable templates that compile to final content.",
      //     implementation: "Designed the no-code schema interface from scratch with field type selection, validation configuration, and live preview. Template builder integrates with the editor to compile content. Fixed bugs across the integration.",
      //     challenges: "The schema builder needed to handle complex field types (nested objects, arrays, references) while remaining intuitive. Merge conflicts from parallel development required careful resolution before demo.",
      //     learnings: "No-code tools require more upfront design than code-based solutions—the UI must guide users through complexity. Live preview is essential for schema building confidence."
      //   }
      // },
      // {
      //   id: "cel-monaco-integration",
      //   title: "CEL Language Integration with Monaco",
      //   deck: {
      //     problem: "The CMS needed expression evaluation for dynamic content rules. Required integrating a CEL (Common Expression Language) engine with Monaco editor for syntax highlighting and validation.",
      //     solution: "Built a CEL language registry for Monaco, swapped to a faster CEL package, and created a generic editor model supporting both CEL and TypeScript.",
      //     impact: "Opened PRs for CEL engine tests and generic editor modal. Enables dynamic content rules with proper IDE-like editing experience.",
      //     tags: ["CEL", "Monaco Editor", "Language Integration", "Generic Editor"]
      //   },
      //   stack: {
      //     context: "Content management often requires dynamic rules—show this field if X, validate that Y matches Z. CEL provides a safe, sandboxed expression language for these use cases.",
      //     architecture: "Generic editor model that can be instantiated for different languages (CEL, TypeScript). Monaco language registry provides syntax highlighting, validation, and autocompletion for CEL expressions.",
      //     implementation: "Created CEL language registry for Monaco with proper tokenization. Swapped and refactored files to use a faster CEL package. Built generic editor modal component reusable across the codebase.",
      //     challenges: "Making the editor model truly generic while supporting language-specific features required careful abstraction. CEL and TypeScript have different validation needs.",
      //     learnings: "Monaco's language contribution API is powerful but requires understanding its extension points. Generic solutions pay off when multiple languages need similar editing experiences."
      //   }
      // },
      // {
      //   id: "website-blocks",
      //   title: "Profound Website via Block System",
      //   deck: {
      //     problem: "Needed to demonstrate the CMS capabilities by building Profound's own website using the block system, proving the architecture works end-to-end.",
      //     solution: "Built complete website blocks including navbar, footer, and feature blocks. Coordinated with team to divide workflow and deliver a polished demo.",
      //     impact: "Completed the Profound website demo, validating that the CMS block system could power real production websites.",
      //     tags: ["Website Blocks", "Navbar", "Footer", "Feature Blocks"]
      //   },
      //   stack: {
      //     context: "The best way to prove a CMS works is to use it. Building the company's own website with the block system validates the entire architecture from content editing to rendering.",
      //     architecture: "Reusable block components (navbar, footer, feature sections) that render based on block configuration. Each block type has defined props and styling variants.",
      //     implementation: "Implemented navbar block with navigation links and responsive behavior. Built footer block with proper layout. Created feature and feature-v2 blocks for showcasing content. Polished the complete demo.",
      //     challenges: "Coordinating parallel development required clear ownership of blocks. Database setup from scratch and testing the full block lifecycle revealed integration issues to fix.",
      //     learnings: "Dogfooding is invaluable—using your own product reveals pain points that aren't obvious from the code. The website demo proved the CMS architecture was sound."
      //   }
      // }
    ]
  },
  {
    id: "puch-ai",
    name: "Puch AI",
    role: "AI Engineering Intern",
    location: "Bengaluru, IN",
    period: "Jul 2025 - Sep 2025",
    summary: "Worked on core infrastructure for an AI-first platform serving millions of users in India. Optimized real-time inference pipelines, unified media generation systems, and extended distributed protocol architecture.",
    teamContext: "Embedded in the core ML infrastructure team, working directly on production systems. Collaborated with senior engineers on latency-critical audio pipelines and WhatsApp-scale feature rollouts.",
    techStack: ["Python", "CUDA", "PyTorch", "H100 GPUs", "FastAPI", "Redis", "MCP", "ComfyUI", "Whisper", "NeMo"],
    tasks: [
      {
        id: "gpu-speech-pipeline",
        title: "Parallelizing the Audio Stack",
        deck: {
          problem: "Speech-to-text pipeline ran multiple models sequentially on GPU—language detection, transcription, and transliteration. SM utilization showed bursty patterns with significant idle time between kernels.",
          solution: "Implemented separate CUDA streams for concurrent model execution, enabling kernel overlap. Added threadpool executor for parallel request handling.",
          impact: "~10-18% latency reduction on short clips, ~5-8% improvement on longer audio. Found optimal worker configuration through systematic benchmarking.",
          tags: ["CUDA Streams", "GPU Optimization", "Speech-to-Text", "Inference"]
        },
        stack: {
          context: "Voice AI requires sub-second latency for natural conversation. The existing pipeline processed models sequentially, leaving GPU cycles wasted during kernel scheduling gaps.",
          architecture: "Multi-stream architecture with dedicated CUDA streams per model stage. Each stream uses CUDA events for synchronization. ThreadPoolExecutor wraps the pipeline for handling concurrent requests without GIL contention.",
          implementation: "Established baseline metrics through load testing. Implemented stream-per-model pattern with careful synchronization. Profiled GPU utilization to verify improved SM occupancy. Tested across various audio lengths to find optimal parallelism.",
          challenges: "Short utterances benefited most from overlap, but longer clips showed diminishing returns as individual kernels dominated runtime. Memory pressure increased with parallelism—had to find the sweet spot.",
          learnings: "Profile before optimizing—baseline numbers were essential. The optimal worker count wasn't intuitive and required empirical testing. Would build automated benchmarking harness earlier to catch regressions."
        }
      },
      {
        id: "unified-media-gen",
        title: "Unified Media Generation Pipeline",
        deck: {
          problem: "Multiple media generation tools (images, videos, stickers, memes) had scattered codepaths, duplicate rate-limiting, and no user-level concurrency control—causing GPU resource contention.",
          solution: "Built unified entry point with strict schema validation, distributed locking per user, per-type metrics, and backwards-compatible field aliasing.",
          impact: "Consolidated codebase, eliminated resource contention from parallel requests, added granular observability.",
          tags: ["Distributed Systems", "API Design", "Redis", "Metrics"]
        },
        stack: {
          context: "The platform had separate tools for each media type, each with its own rate limiting and error handling. The AI often picked the wrong tool, and users could overload GPUs by triggering multiple generations.",
          architecture: "Single unified tool with type discriminator, feature flags for enable/disable, distributed fast-fail locking via Redis, and per-type telemetry counters. Schema supports legacy field names through aliasing.",
          implementation: "Request validation at entry point. Distributed lock acquired immediately—fast-fail if another request in flight. Metrics recorded before job dispatch. Backwards compatibility maintained for existing integrations.",
          challenges: "Backwards compatibility with existing payloads while migrating to cleaner schema. Consolidated multiple acknowledgement patterns into consistent UX without breaking existing flows.",
          learnings: "Unification reduces cognitive load and debugging complexity significantly. Fast-fail patterns are underused—better to reject immediately than queue indefinitely. Would consolidate earlier in future systems."
        }
      },
      {
        id: "multi-mcp",
        title: "Concurrent MCP Support",
        deck: {
          problem: "Users could only connect to a single MCP server at a time, limiting their ability to access tools from multiple providers simultaneously.",
          solution: "Extended the MCP protocol implementation to support multiple concurrent connections with individual enable/disable controls for each server.",
          impact: "Shipped to millions of users, enabling flexible tool ecosystems where users can selectively activate different MCP servers based on their needs.",
          tags: ["MCP Protocol", "Multi-Connection", "Toggle Controls", "User Configuration"]
        },
        stack: {
          context: "The Model Context Protocol (MCP) originally supported single server connections per user. We wanted to enable end-users to connect to multiple MCPs and use them together.",
          architecture: "Redesigned connection management to handle multiple MCP servers concurrently. Each connection has independent enable/disable state. Tool discovery aggregates capabilities from all active connections with conflict resolution.",
          implementation: "Built connection pool manager with per-server state tracking. Added toggle controls in the UI for enabling/disabling individual servers. Implemented graceful connection handling and automatic reconnection for enabled servers.",
          challenges: "Managing connection lifecycle across multiple servers while maintaining performance. Tool name conflicts between servers required disambiguation. State synchronization between UI toggles and actual connection status.",
          learnings: "Users prefer granular control over bulk operations—the ability to selectively enable servers is more valuable than all-or-nothing approaches. Connection pooling patterns from web development apply well to protocol management."
        }
      },
      {
        id: "t2v-audio",
        title: "Text-to-Video Audio Integration",
        deck: {
          problem: "Video generation outputs were silent—users had to manually add audio separately, breaking the creative workflow and producing mismatched content.",
          solution: "Set up diffusion-based video generation infrastructure with integrated audio synthesis, using a custom audio node.",
          impact: "Launch achieved 700k+ impressions across social media. Enabled end-to-end multimodal content generation.",
          tags: ["Diffusion Models", "Video Generation", "Infrastructure", "Multimodal"]
        },
        stack: {
          context: "AI video generation was taking off but audio was an afterthought. Users would generate video then scramble to find matching audio. The platform needed integrated multimodal generation.",
          architecture: "Node-based generation server with custom extensions. Large diffusion models for text-to-video and image-to-video modes. VAE, text encoder, and vision encoder for conditioning. Secure tunneling for external access to GPU infrastructure.",
          implementation: "Full infrastructure setup: generation framework, model weights management, custom nodes for audio integration. Audio generation conditioned on video semantic embeddings for coherent output.",
          challenges: "Initial tunneling solution failed with the network setup—had to switch approaches. Large model weights required careful VRAM management for concurrent requests.",
          learnings: "Infrastructure work is often the bottleneck, not the ML. Timing and market readiness matter as much as technical sophistication—viral reception validated the product direction."
        }
      }
    ]
  },
  {
    id: "scoretravel",
    name: "ScoreTravel",
    role: "ML Intern",
    location: "Remote",
    period: "Mar 2025 - Jun 2025",
    summary: "Worked directly with the founder to build ML infrastructure for a travel tech startup. Designed and implemented computer vision pipelines for video content analysis.",
    teamContext: "Small startup environment working 1:1 with the founder on core ML capabilities. Full ownership of ML system design and implementation.",
    techStack: ["Python", "FastAPI", "PaddleOCR", "W&B", "Docker", "MoonDream"],
    tasks: [
      {
        id: "ocr-microservice",
        title: "Concurrent OCR Microservice",
        deck: {
          problem: "Processing video frames for text extraction was slow and produced many duplicate detections, making it impractical for the volume of content being analyzed.",
          solution: "Architected a concurrent FastAPI microservice for PaddleOCR with an O(n) sliding-window duplicate detection algorithm using dynamic thresholding.",
          impact: "Successfully processed 3,000+ frames across 30 videos with efficient duplicate elimination.",
          tags: ["FastAPI", "PaddleOCR", "Concurrency", "Algorithm Design"]
        },
        stack: {
          context: "Travel content videos contain significant text (signs, menus, prices) that needs extraction for searchability. Frame-by-frame OCR produces massive redundancy as text persists across many frames.",
          architecture: "Microservice with async request handling, worker pool for OCR inference, and a streaming duplicate detection layer. Results are deduplicated in real-time as frames are processed.",
          implementation: "The sliding window algorithm maintains a buffer of recent text detections with their bounding boxes. New detections are compared against the window using IoU and text similarity. Dynamic thresholding adjusts based on video characteristics (scene changes, text density).",
          challenges: "Tuning the duplicate detection was challenging—too aggressive and we lost legitimate repeated text, too lenient and duplicates flooded downstream. Solved by implementing scene-change detection to reset the window.",
          learnings: "Simple algorithms with good heuristics often outperform complex ML approaches for problems like deduplication. The O(n) sliding window beat an embedding-based approach in both speed and accuracy."
        }
      },
      {
        id: "mlops-pipeline",
        title: "MLOps Evaluation Pipeline",
        deck: {
          problem: "No systematic way to compare OCR approaches or track model performance over time, making it impossible to make data-driven decisions about the ML stack.",
          solution: "Built an end-to-end MLOps pipeline using W&B for Bayesian hyperparameter sweeps, tracking WER, precision, and F1-score across experiments.",
          impact: "Benchmarked MoonDream (VLM) vs PaddleOCR using Scalene profiling, enabling informed accuracy-latency tradeoff decisions.",
          tags: ["W&B", "MLOps", "Hyperparameter Optimization", "Benchmarking"]
        },
        stack: {
          context: "The OCR space is evolving rapidly with VLMs offering new capabilities. Needed a rigorous way to compare traditional OCR (PaddleOCR) against vision-language models (MoonDream) for the specific use case.",
          architecture: "Pipeline stages: (1) Dataset versioning with ground truth labels, (2) Configurable model runners, (3) W&B experiment tracking, (4) Automated metric computation, (5) Profiling integration for performance analysis.",
          implementation: "Used Bayesian optimization via W&B Sweeps to efficiently explore hyperparameter space. Integrated Scalene profiling to capture CPU/GPU utilization and memory patterns alongside accuracy metrics.",
          challenges: "Comparing OCR and VLM outputs required careful normalization—they have different output formats, confidence representations, and failure modes. Built a unified evaluation schema that accommodates both.",
          learnings: "Rigorous MLOps pays dividends quickly. What started as 'we should track experiments' became the decision-making foundation. Would prioritize this infrastructure earlier in future projects."
        }
      }
    ]
  },
  {
    id: "emory-gsoc",
    name: "Emory University",
    role: "Google Summer of Code Contributor",
    location: "Remote",
    period: "May 2024 - Sep 2024",
    summary: "Built foundation models for EEG/iEEG analysis. Adapted multiple neural architectures for clinical biosignal datasets, implemented GAN-based data augmentation, and developed model interpretability frameworks for neuroscience research.",
    teamContext: "Part of a computational neuroscience research lab. Collaborated with research candidate on adapting state-of-the-art models for hippocampal EEG analysis and memory recall classification tasks.",
    techStack: ["Python", "PyTorch", "Transformers", "MNE", "Captum", "CUDA", "HuggingFace", "Distributed Training"],
    tasks: [
      {
        id: "neurogpt-foundation",
        title: "EEG Foundation Model Adaptation",
        deck: {
          problem: "Open-source EEG foundation model wasn't compatible with our clinical dataset format, had memory issues during evaluation, and lacked proper cross-validation for downstream tasks.",
          solution: "Built data conversion pipeline, implemented gradient accumulation and evaluation batching, added LOOCV and k-fold cross-validation, integrated distilled decoder for faster training.",
          impact: "55% training speedup with distilled model, 70% downstream accuracy, fixed evaluation stalling through careful worker tuning.",
          tags: ["Foundation Models", "Conformer", "GPT-2", "Cross-validation"]
        },
        stack: {
          context: "The foundation model combines a Conformer encoder with GPT-2 decoder for EEG representation learning. Our clinical dataset used different formats and channel configurations, requiring extensive adaptation of the preprocessing pipeline.",
          architecture: "Data pipeline: clinical format → signal processing library → NumPy → PyTorch tensors. Modified encoder for our channel count and temporal structure. Switched to distilled decoder variant for efficiency while maintaining representation quality.",
          implementation: "Fixed CUDA OOM through evaluation batching and accumulation. Added epoch-based training alongside steps-based. Created custom dataset classes for downstream tasks. Implemented multiple cross-validation strategies via command-line configuration.",
          challenges: "Evaluation stalling on large datasets—GPU allocated but idle. Root cause: DataLoader worker count causing multiprocessing issues. Added profiling callbacks to diagnose low-level operation bottlenecks.",
          learnings: "Profile systematically—stalling wasn't obvious from GPU metrics alone. The worker count bug is a known PyTorch issue but hard to diagnose. Epoch-based training simplifies dataset utilization calculations."
        }
      },
      {
        id: "ieeg-data-pipeline",
        title: "Intracranial EEG Data Pipeline",
        deck: {
          problem: "Public neuroscience dataset had complex directory structures, electrode mappings across multiple files, and needed preprocessing to extract specific brain regions for memory research.",
          solution: "Built parallel processing pipeline to extract hippocampus and amygdala regions, with standardized channel naming and configurable scaling across inconsistent electrode configurations.",
          impact: "Processed hundreds of subjects with multiprocessing parallelization. Standardized heterogeneous electrode configurations into consistent tensor format.",
          tags: ["iEEG", "MNE", "Data Pipeline", "Parallel Processing"]
        },
        stack: {
          context: "Dataset contained intracranial recordings with complex metadata: electrode positions, region annotations across multiple columns, and bipolar/monopolar configurations. Goal: extract channels from memory-related brain regions.",
          architecture: "Multi-stage pipeline: (1) Load session metadata and filter electrodes by region annotations, (2) Match electrodes to channels with priority ordering, (3) Apply scaling and handle missing regions, (4) Segment into fixed-length windows. Output: standardized multi-channel tensors.",
          implementation: "Region mapping standardizes anatomical names to abbreviations. Multiple scaling options (standard, robust, custom normalization). Zero-filling for missing regions maintains tensor consistency. Parallelized across subjects/sessions with careful error handling.",
          challenges: "Electrode-to-channel matching was complex—needed priority ordering across multiple annotation columns. Missing regions had to be zero-filled rather than dropped to maintain consistent tensor shapes across subjects.",
          learnings: "Extensible region mapping was key—adding new brain areas only requires config updates. The amplitude compensation channel preserved important signal characteristics that improved downstream model performance."
        }
      },
      {
        id: "conformer-adaptation",
        title: "EEG Conformer Architecture Adaptation",
        deck: {
          problem: "Standard EEG Conformer had kernel sizes tuned for different channel counts and temporal resolutions—incompatible with our clinical dataset's configuration.",
          solution: "Modified convolutional patch embedding layers for our channel count and temporal characteristics. Implemented LOOCV training with balanced accuracy and ROC-AUC metrics.",
          impact: "Successfully trained on clinical dataset with proper evaluation metrics. Robust error handling prevented crashes from occasional shape mismatches.",
          tags: ["EEG Conformer", "Architecture Adaptation", "LOOCV", "ROC-AUC"]
        },
        stack: {
          context: "EEG Conformer uses convolutional patch embedding before transformer layers. Original architecture was designed for different channel counts and temporal resolutions than our clinical data.",
          architecture: "Modified patch embedding with adjusted kernel sizes for temporal and spatial convolutions. Standard normalization and pooling layers. Custom dataset class handles data loading with label pairing for classification tasks.",
          implementation: "Standard training loop with validation using balanced accuracy and ROC-AUC (appropriate for imbalanced clinical data). Error handling wraps forward pass to catch shape mismatches and continue training. LOOCV for rigorous evaluation.",
          challenges: "Shape mismatches were common during development—error handling with diagnostic logging was essential. Kernel size selection required experimentation to find receptive fields that capture relevant EEG patterns.",
          learnings: "Balanced accuracy is crucial for imbalanced medical datasets. ROC-AUC provides threshold-independent evaluation. Continue-on-error pattern allowed training to complete even with occasional problematic samples."
        }
      },
      {
        id: "eeg-gan-augmentation",
        title: "GAN-based EEG Data Augmentation",
        deck: {
          problem: "Limited clinical samples constrained model training. Needed synthetic EEG data that preserves class-conditional characteristics for augmentation.",
          solution: "Adapted EEG-GAN pipeline: autoencoder for dimensionality reduction, GAN for latent space generation, class-conditional sampling for both experimental conditions.",
          impact: "Generated thousands of synthetic samples preserving temporal structure. Enabled dataset expansion while maintaining class-specific signal characteristics.",
          tags: ["EEG-GAN", "Autoencoder", "Data Augmentation", "Generative Models"]
        },
        stack: {
          context: "Based on published work on GAN-based EEG augmentation. Challenge: our dataset had many channels with inconsistent availability, and we needed longer temporal windows than the original paper.",
          architecture: "Two-stage approach: (1) Autoencoder compresses temporal dimension while preserving structure, (2) GAN generates in compressed latent space then decodes. Class conditioning ensures generated samples match target experimental conditions.",
          implementation: "Extensive autoencoder pretraining before GAN. Careful hyperparameter selection for temporal coherence. Separate generation runs per class with fixed seeds for reproducibility.",
          challenges: "Channel inconsistency across recordings was the main blocker—some channels missing in certain subjects. Scaling to longer temporal windows required autoencoder architecture adjustments.",
          learnings: "Autoencoder quality directly impacts GAN output—invested heavily in first stage. Patch size controls temporal coherence of generated signals. Conditional generation is essential for maintaining class-specific patterns."
        }
      },
      {
        id: "labram-adaptation",
        title: "Large Brain Model Modifications",
        deck: {
          problem: "Published brain foundation model had configurations for shorter recordings and required dynamic handling of different sampling rates and segment lengths.",
          solution: "Scaled model capacity for longer recordings, implemented dynamic input size calculation, added automatic dataset loading for our file formats.",
          impact: "Enabled processing of longer EEG segments. Increased decoder resolution for better feature extraction from clinical recordings.",
          tags: ["Foundation Models", "Neural Tokenization", "Distributed Training"]
        },
        stack: {
          context: "The model uses neural signal tokenization for EEG representation. Original configuration was designed for shorter temporal windows than our clinical protocol required.",
          architecture: "Increased input size, patch size, and embedding dimensions proportionally. Dynamic configuration based on sampling rate and segment duration. Automatic dataset discovery for our file formats.",
          implementation: "Dynamic sizing: input dimensions computed from sampling rate and duration. Automatic file discovery for batch processing. Tensor reshaping aligned with actual segment lengths. Distributed training with cross-node aggregation.",
          challenges: "Increased model capacity requires more VRAM—balanced architecture parameters carefully. Temporal alignment is critical—mismatches cause dimension errors deep in the pipeline.",
          learnings: "Dynamic configuration is essential for model reusability. Sampling rate should flow through the entire pipeline rather than being hardcoded. Would parameterize all constants from the start."
        }
      },
      {
        id: "multiview-ssl",
        title: "Self-Supervised Learning for iEEG",
        deck: {
          problem: "Published SSL codebase needed adaptation for our clinical dataset, proper data chunking/normalization, and rigorous evaluation protocol.",
          solution: "Created custom dataset classes with configurable chunking, overlap, and normalization. Implemented LOOCV with comprehensive per-subject metrics.",
          impact: "Enabled systematic comparison of SSL approaches on clinical data. Trained graph neural network with contrastive learning successfully.",
          tags: ["Self-supervised Learning", "GNN", "Contrastive Learning", "LOOCV"]
        },
        stack: {
          context: "Multiview SSL uses graph neural networks with contrastive learning for time series representation. Published approach needed adaptation for intracranial EEG domain and our evaluation requirements.",
          architecture: "Custom dataset classes: configurable chunk length, overlap, normalization. Graph neural network for multiview learning. Temperature-scaled contrastive loss for representation learning.",
          implementation: "Index generation for efficient chunking with overlap. Zero-padding for boundary handling. LOOCV with per-subject metrics (accuracy, precision, recall, F1). Early stopping based on validation performance.",
          challenges: "Chunk boundary handling—final chunks needed padding for consistent tensor shapes. Label tensor dimensions required careful reshaping. Early stopping criterion selection impacted convergence.",
          learnings: "Chunking strategy significantly impacts SSL—overlap provides context but increases computation. Temperature parameter in contrastive loss is sensitive and requires tuning. Progress tracking essential for long training runs."
        }
      },
      {
        id: "deeplift-interpretability",
        title: "Neural Network Interpretability for Clinical EEG",
        deck: {
          problem: "EEG classification models were black boxes—needed to identify which channels and time intervals drive predictions for clinical validation and scientific insight.",
          solution: "Implemented attribution-based interpretability with custom model wrapper for compatibility. Built comprehensive visualization suite for spatial and temporal analysis.",
          impact: "Identified predictive EEG channels through attribution ranking. Temporal heatmaps revealed influential time intervals for clinical validation.",
          tags: ["DeepLIFT", "Interpretability", "Attribution", "Visualization"]
        },
        stack: {
          context: "Attribution methods compare neuron activations to reference and propagate contribution scores. Clinical applications require interpretability—researchers need to validate that models learn meaningful patterns.",
          architecture: "Model wrapper ensures compatible output shapes. Pipeline: input preprocessing → baseline computation → attribution → aggregation → visualization. Multiple visualization functions covering spatial (channels) and temporal patterns.",
          implementation: "Importance heatmaps overlay attributions on EEG signals. Channel importance bar charts with sorted rankings. Box plots for distribution analysis. Mean vs median comparison to detect outliers. Positive/negative attribution separation. Per-channel histograms. Time-resolved attribution plots.",
          challenges: "Single-output models required specific configuration for attribution computation. Attribution noise required percentile thresholding for meaningful visualization. Channel naming had to match data dimensions exactly.",
          learnings: "Multiple visualization perspectives essential—aggregate metrics miss temporal dynamics. Mean vs median comparison reveals outliers and skewed distributions. Thresholds for visualization were empirically determined."
        }
      }
    ]
  },
  {
    id: "digitalfortress",
    name: "DigitalFortress",
    role: "AI/ML Researcher",
    location: "Amaravati, IN",
    period: "Sep 2023 - Apr 2024",
    summary: "Led ML initiatives at an early-stage company, building natural language interfaces, automated pipelines, and computer vision systems for production use.",
    teamContext: "Led a 2-person team on core ML projects. First ML hire, responsible for establishing ML practices and infrastructure.",
    techStack: ["Python", "LangChain", "MongoDB", "ESRGAN", "CodeFormer", "Google Drive API"],
    tasks: [
      {
        id: "nl-database-interface",
        title: "Natural Language Database Interface",
        deck: {
          problem: "Non-technical team members couldn't query the production database, creating bottlenecks where engineers had to write queries for every data request.",
          solution: "Built a Natural Query Agent for MongoDB using LangChain that translates English questions into database queries.",
          impact: "Deployed API handling 120+ queries/day with sub-200ms response time for production database interactions.",
          tags: ["LangChain", "MongoDB", "NL2SQL", "API Design"]
        },
        stack: {
          context: "The company had a MongoDB database with complex nested documents. Business users needed data access but the schema was too complex for direct querying.",
          architecture: "LangChain agent with: (1) Schema introspection for context, (2) Few-shot examples for common query patterns, (3) Query validation before execution, (4) Result formatting for human readability.",
          implementation: "Used LangChain's MongoDB toolkit with custom prompts tuned for the specific schema. Implemented query sandboxing to prevent destructive operations and rate limiting for resource protection.",
          challenges: "Ambiguous natural language queries were the main challenge. 'Show me recent orders' could mean different things. Added clarification prompts and sensible defaults based on usage patterns.",
          learnings: "LLM-based query interfaces need guardrails and graceful degradation. Built extensive logging to understand failure modes and iteratively improved prompts based on real queries."
        }
      },
      {
        id: "media-pipeline",
        title: "Automated Media Pipeline",
        deck: {
          problem: "Video processing workflow required 8 hours of manual effort per batch—downloading, processing, organizing, and uploading files to cloud storage.",
          solution: "Automated the end-to-end video processing pipeline with fault-tolerant Google Drive upload and automatic retry mechanisms.",
          impact: "Reduced processing time from 8 hours to 15 minutes per batch, achieved 99.9% upload success rate.",
          tags: ["Automation", "Google Drive API", "Fault Tolerance", "Pipeline"]
        },
        stack: {
          context: "The company processed large volumes of video content daily. The manual workflow involved multiple tools and frequent failures during upload, requiring constant monitoring.",
          architecture: "Pipeline stages: (1) Automated download with progress tracking, (2) Parallel video processing, (3) Chunked upload to Google Drive with resume capability, (4) Verification and cleanup.",
          implementation: "Used Google Drive API with resumable uploads. Implemented exponential backoff for transient failures, checkpointing for long operations, and Slack notifications for pipeline status.",
          challenges: "Google Drive API has various quotas and rate limits that caused intermittent failures. Built a robust retry system that respects rate limits while maximizing throughput.",
          learnings: "Automation ROI is often underestimated. This 'simple' pipeline freed up hours daily and eliminated a class of human errors. Would advocate for automation investment earlier in future roles."
        }
      },
      {
        id: "super-resolution",
        title: "Super-Resolution Enhancement",
        deck: {
          problem: "Low-resolution video frames degraded downstream face recognition accuracy, limiting the usefulness of the video analysis pipeline.",
          solution: "Enhanced CodeFormer architecture by upgrading ESRGAN from 2x to 4x upscaling, optimized for face recognition downstream task.",
          impact: "Processed 50k+ frames, improved face recognition accuracy by 10% (60% → 66%) on production datasets.",
          tags: ["ESRGAN", "CodeFormer", "Super-Resolution", "Face Recognition"]
        },
        stack: {
          context: "Video content often has low-resolution faces that fail recognition. Super-resolution can recover detail, but generic upscaling doesn't optimize for face-specific features.",
          architecture: "Two-stage pipeline: (1) ESRGAN 4x upscaling for general enhancement, (2) CodeFormer for face-specific restoration. Face detection gates the CodeFormer stage to save compute on non-face regions.",
          implementation: "Upgraded ESRGAN model from 2x to 4x, requiring architecture adjustments and retraining. Fine-tuned on a dataset emphasizing face regions. Integrated with existing face recognition pipeline.",
          challenges: "4x upscaling introduces more artifacts than 2x. Had to balance resolution gain against artifact introduction. Used perceptual loss and face-specific metrics during training.",
          learnings: "Optimizing for downstream task metrics (face recognition) rather than generic image quality metrics (PSNR/SSIM) produced better practical results. Task-specific evaluation is crucial."
        }
      }
    ]
  },
  {
    id: "air-center",
    name: "Center of Excellence AIR",
    role: "Student Researcher",
    location: "VIT-AP, IN",
    period: "Mar 2023 - Nov 2025",
    summary: "Long-term research position working on computer vision and generative AI systems. Built production-grade pipelines for text extraction from technical documents, face clustering, and diffusion model optimization.",
    teamContext: "Part of a university research lab focused on applied AI. Worked on multiple research tracks simultaneously, from generative models to industrial document processing.",
    techStack: ["Python", "PyTorch", "OpenCV", "CUDA", "Stable Diffusion", "PaddleOCR", "EasyOCR", "YOLO", "DBScan", "LoRA"],
    tasks: [
      {
        id: "mechanical-drawing-ocr",
        title: "OCR Pipeline for Mechanical Drawings",
        deck: {
          problem: "Standard OCR fails catastrophically on mechanical drawings—text appears at wildly varying scales (tiny part numbers to large titles), mixed with dense line work, symbols, and annotations that confuse detection models.",
          solution: "Designed a multi-resolution, multi-model cascade: EAST at multiple resolutions catches different text scales, YOLO detects symbols/icons, then progressively masked PaddleOCR and EasyOCR sweep for remaining text.",
          impact: "Achieved comprehensive text extraction from engineering drawings where single-model approaches missed 40-60% of annotations.",
          tags: ["Multi-Resolution", "Tiled Inference", "Model Cascade", "Technical Documents"]
        },
        stack: {
          context: "Mechanical drawings contain critical text—dimensions, part numbers, tolerances, notes—at vastly different scales in a single document. A title block might have 72pt text while a tolerance annotation is 6pt. Standard OCR assumes uniform text size and fails.",
          architecture: "Six-stage cascade: (1) Multi-resolution EAST runs at 960, 1600, 3776, and 8192px to catch text at different scales, (2) Tiled YOLO detects symbols and icons, (3) Merge and deduplicate via IoU-based NMS, (4) Mask detected regions and run tiled PaddleOCR on remainder, (5) Mask again and run EasyOCR for final sweep, (6) Cleanup pass removes redundant large boxes that contain smaller detections.",
          implementation: "Tiling with configurable overlap handles arbitrarily large drawings without OOM. Each model runs on GPU with pre-loaded weights to minimize inference overhead. Greedy box merging with IoU thresholding deduplicates across tiles and resolutions. Coverage-based cleanup removes spurious large detections.",
          challenges: "Balancing recall vs. precision—aggressive detection catches more text but also noise from line intersections. The masking strategy was key: each subsequent model only sees what previous stages missed, preventing duplicate detections while ensuring coverage.",
          learnings: "Resolution is the hidden variable in document OCR. A single resolution is always wrong for documents with varying text scales. The cascade with progressive masking outperformed any single 'best' model by a wide margin."
        }
      },
      {
        id: "diffusion-pipelines",
        title: "Stable Diffusion Optimization & Fine-tuning",
        deck: {
          problem: "Research projects required custom image generation capabilities—text-based inpainting, style adaptation, and domain-specific synthesis—but base models lacked control and ran slowly on available hardware.",
          solution: "Built optimized inference pipelines with efficient GPU memory management, integrated LoRA fine-tuning for style adaptation, and developed context-aware inpainting workflows.",
          impact: "Enabled domain-specific image synthesis with controllable style transfer. Optimized batch processing reduced generation time significantly for research experiments.",
          tags: ["Stable Diffusion", "LoRA", "Inpainting", "GPU Optimization"]
        },
        stack: {
          context: "Generative AI research requires rapid iteration—generating thousands of samples, fine-tuning on custom datasets, and experimenting with different conditioning approaches. Off-the-shelf pipelines weren't optimized for research workflows.",
          architecture: "Modular pipeline with swappable components: base model, LoRA adapters, custom embeddings, and conditioning modules. Memory-efficient attention and fp16 inference for batch processing. Text-based inpainting uses segmentation masks derived from text prompts.",
          implementation: "LoRA fine-tuning on domain-specific datasets for style adaptation. Custom embedding training for consistent subject generation. Batch inference with dynamic memory management to maximize GPU utilization without OOM.",
          challenges: "Balancing generation quality against memory constraints. Aggressive optimization (lower precision, attention slicing) degrades output—found the sweet spot through systematic ablation.",
          learnings: "LoRA is remarkably efficient for style transfer—small rank adapters capture domain characteristics without catastrophic forgetting. Custom embeddings complement LoRA well for subject consistency."
        }
      },
      {
        id: "face-clustering",
        title: "Multi-Face Clustering System",
        deck: {
          problem: "Large image datasets contained thousands of faces across varying poses, lighting, and occlusions. Manual identity labeling was infeasible, and naive clustering produced fragmented or merged identities.",
          solution: "Engineered a DBScan-based clustering pipeline with face embeddings, optimized distance thresholds, and post-processing to handle edge cases like partial occlusions.",
          impact: "Automated identity grouping across complex datasets, enabling downstream tasks like identity-preserving generation and retrieval.",
          tags: ["DBScan", "Face Embeddings", "Clustering", "Identity Preservation"]
        },
        stack: {
          context: "Identity-aware image processing requires knowing which faces belong to the same person. Face verification works for pairs, but clustering scales to entire datasets without requiring reference images.",
          architecture: "Pipeline: face detection → alignment → embedding extraction → DBScan clustering → post-processing for outliers and small clusters.",
          implementation: "DBScan chosen over k-means because it handles variable cluster sizes and identifies outliers (faces that don't clearly belong to any identity). Epsilon tuned on held-out data to balance precision and recall.",
          challenges: "The embedding space isn't perfectly separable—similar-looking individuals cluster together, while the same person in very different conditions may split. Post-processing rules based on cluster size and density help.",
          learnings: "DBScan's ability to mark outliers is underrated—forcing every face into a cluster creates more problems than accepting some uncertainty. Downstream tasks can handle 'unknown identity' better than wrong identity."
        }
      }
    ]
  }
];

export function getCompanyById(id: string): Company | undefined {
  return companies.find(c => c.id === id);
}

export function getTaskById(companyId: string, taskId: string): Task | undefined {
  const company = getCompanyById(companyId);
  return company?.tasks.find(t => t.id === taskId);
}
