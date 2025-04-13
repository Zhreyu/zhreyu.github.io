// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-articles",
          title: "articles",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "publications by categories in reversed chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "The code shall set you free, but not today. Perhaps someday.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Aspiring AI/ML Researcher with extensive experience in developing and deploying scalable AI-driven solutions.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-beauty-behind-the-attention-mechanism",
      
        title: "Beauty Behind the Attention Mechanism",
      
      description: "A gentle dive into how the attention mechanism powers modern large language models, focusing on the core math of queries, keys, values, and the all-important scaling factor.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Beauty-Behind-Attention/";
        
      },
    },{id: "post-column-family-databases-in-data-warehousing",
      
        title: "Column-Family Databases in Data Warehousing",
      
      description: "An in-depth exploration of column-family databases and their crucial role in modern data warehousing solutions, including real-time analytics, flexible data models, and integration with data lakehouses.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/column-family-databases-in-data-warehousing/";
        
      },
    },{id: "post-graph-data-models-ai-and-biology",
      
        title: "Graph Data Models, AI, and Biology",
      
      description: "An exploration of how AI-enhanced graph models are revolutionizing biological research, from genomic data integration to drug discovery.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/graph-data-models-and-biology/";
        
      },
    },{id: "news-comicstrips-project-reaches-20-000-downloads-on-hugging-face",
          title: 'ComicStrips project reaches 20,000+ downloads on Hugging Face! 🎉',
          description: "",
          section: "News",},{id: "news-adhoc-hits-reaches-7-000-downloads-on-pypi",
          title: 'Adhoc hits reaches 7,000+ downloads on Pypi!! 🎉',
          description: "",
          section: "News",},{id: "news-animestudio-is-averaging-10-000-requests-per-day",
          title: 'AnimeStudio is averaging 10,000 requests per day!',
          description: "",
          section: "News",},{id: "projects-comicstrips",
          title: 'ComicStrips',
          description: "Text-to-Comic Strip Generation using LoRA fine-tuning",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_comicstrips/";
            },},{id: "projects-adhoc",
          title: 'Adhoc',
          description: "Automated Documentation Tool using Local LLMs",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_adhoc/";
            },},{id: "projects-schedulnet",
          title: 'SchedulNet',
          description: "Neural Network Scheduling Optimization",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_schedulnet/";
            },},{id: "projects-reverse-turing-test",
          title: 'Reverse-Turing-Test',
          description: "The Reverse Turing Test flips the classic Turing Test on its head: instead of AI trying to pass as human, a human player tries to blend in among AI participants.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_reverse_turing/";
            },},{id: "projects-stable-cipstagram",
          title: 'Stable Cipstagram',
          description: "An intelligent content generation pipeline that uses AI to analyze Instagram content, generate engaging captions, and post unique images generated using SD3.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_Stable_Cipstagram/";
            },},{id: "projects-8086-ml",
          title: '8086 ML',
          description: "Implemented machine learning algorithms in an 8086 emulator because why not",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_8086ML/";
            },},{id: "projects-deep-learning-repository",
          title: 'Deep Learning Repository',
          description: "A collection of my Kaggle notebooks, paper implementations, and other projects from my deep learning learning process",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_DL_repository/";
            },},{id: "projects-anime-studio",
          title: 'Anime Studio',
          description: "A web application that allows users to create Anime style edits.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_AnimeStudio/";
            },},{
        id: 'social-discord',
        title: 'Discord',
        section: 'Socials',
        handler: () => {
          window.open("https://discord.com/users/zhreyyy", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%5A%68%72%65%79%61%73%31@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Zhreyu", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/Zhreyas", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0000-8931-7562", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: 'Socials',
        handler: () => {
          window.open("https://www.researchgate.net/profile/Shreyas-S-7/", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://huggingface.co/zhreyu", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
