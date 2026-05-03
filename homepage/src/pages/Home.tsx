import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, FileText, Briefcase } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import TermPopover from '../components/TermPopover';
import FunFactPopover from '../components/FunFactPopover';
import { useGitHubStats, formatLOC } from '../hooks/useGitHubStats';

export default function Home() {
  const { isSwiss, isTransitioning, toggleAesthetic } = useTheme();
  const githubStats = useGitHubStats();

  return (
    <div className={`lens-shift-content min-h-screen flex flex-col ${isTransitioning ? 'transitioning' : ''}`}>
    <AnimatePresence mode="wait">
      {!isSwiss ? (
        <motion.main
          key="classic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex-1 flex flex-col px-8 md:px-24 max-w-4xl mx-auto w-full"
        >
          {/* Centered content */}
          <div className="flex-1 flex flex-col justify-center gap-12 py-12">
            <header>
              <h1 className="font-serif font-black text-6xl md:text-8xl leading-none tracking-tighter">
                Shreyas{' '}
                <span
                  onClick={toggleAesthetic}
                  className="italic font-normal text-[#c8b89a] cursor-crosshair hover:tracking-wide hover:text-[#f0ede6] transition-all duration-300"
                >
                  S.
                </span>
              </h1>
            </header>

            <div className="h-[1px] bg-gradient-to-r from-[#c8b89a] to-transparent w-full opacity-30" />

            <p className="text-lg md:text-xl leading-relaxed text-[#9a9088] max-w-xl font-light">
              <strong className="text-[#f0ede6] font-normal">I don't decide to build things — it just happens.</strong>{' '}
              <TermPopover term="Obsidian" description="A popular knowledge management and note-taking application known for its local-first approach and linked notes.">
                Obsidian
              </TermPopover>{' '}
              felt slow so I built my own, I've skipped class to intern at startups, fine-tuned{' '}
              <TermPopover term="Diffusion Models" description="AI models that generate images by learning to reverse a noise process, used in tools like Stable Diffusion and DALL-E.">
                diffusion models
              </TermPopover>{' '}
              at 2 AM for viral trends, and shipped because waiting felt slower than moving. I apply for roles I half-qualify for and build until I do. I don't have a five-year plan — I just pick the most interesting problem in the room and move toward it. <strong className="text-[#f0ede6] font-normal">So far, it's working.</strong>
            </p>

            <nav className="flex flex-wrap gap-2 items-center">
              <Link to="/work" className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6b6358] hover:text-[#c8b89a] hover:bg-white/5 px-3 py-2 rounded-lg transition-all group">
                <Briefcase size={14} className="opacity-60 group-hover:opacity-100" />
                work
              </Link>
              <a href="mailto:shreyas.s@outlook.in" className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6b6358] hover:text-[#c8b89a] hover:bg-white/5 px-3 py-2 rounded-lg transition-all group">
                <Mail size={14} className="opacity-60 group-hover:opacity-100" />
                email
              </a>
              <a href="https://www.linkedin.com/in/zhreyas/" target="_blank" rel="noopener" className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6b6358] hover:text-[#c8b89a] hover:bg-white/5 px-3 py-2 rounded-lg transition-all group">
                <Linkedin size={14} className="opacity-60 group-hover:opacity-100" />
                linkedin
              </a>
              <a href="https://drive.google.com/file/d/1wzEGhmbvWGx_pFYKKSA2t7K3VrRuxiiw/view" target="_blank" rel="noopener" className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6b6358] hover:text-[#c8b89a] hover:bg-white/5 px-3 py-2 rounded-lg transition-all group">
                <FileText size={14} className="opacity-60 group-hover:opacity-100" />
                resume
              </a>
            </nav>
          </div>

          {/* Footer pinned to bottom */}
          <footer className="py-8 flex justify-between items-center border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-[#6b6358]">Open to opportunities</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-mono text-[#3a3530]/60 tabular-nums">
                12.9716° N, 77.5946° E
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#3a3530]/40">
                Updated May 2025
              </span>
            </div>
          </footer>
        </motion.main>
      ) : (
        <motion.main
          key="swiss"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex-1 relative bg-white overflow-hidden"
        >
          {/* Swiss Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          {/* Mode label */}
          <div className="absolute top-10 left-10 text-xs font-mono text-gray-400 tracking-wider">
            casual mode
          </div>

          <div className="absolute top-10 right-10 text-2xl font-light cursor-pointer" onClick={toggleAesthetic}>+</div>

          <div className="h-full flex flex-col justify-end p-12 md:p-24 max-w-6xl mx-auto">
            <div className="mb-12">
              <h1 className="font-serif text-7xl md:text-9xl font-medium leading-[0.85] tracking-tight text-black">
                <span className="swiss-highlight">Shrey</span>as
                <br />
                <span onClick={toggleAesthetic} className="cursor-pointer">S.</span>
              </h1>
            </div>

            <div className="max-w-md">
              <p className="font-sans text-lg md:text-xl text-gray-600 leading-snug mb-6">
                Jack of all trades and master of <strong>GETTING STUFF DONE.</strong>
                <br /><br />
                STUDENT · RESEARCHER · BUILDER · ENGINEER · GENERALIST · POLYGLOT
              </p>

              {/* Fun facts - casual mode easter egg */}
              <div className="mb-8 text-sm text-gray-400 font-mono space-y-1">
                <p>— <FunFactPopover content={`${formatLOC(githubStats.python)} lines across ${githubStats.totalRepos} repos`}>{formatLOC(githubStats.python)}</FunFactPopover> lines of python shipped</p>
                <p>— <FunFactPopover content={`${formatLOC(githubStats.typescript)} lines · react, next.js, trpc`}>{formatLOC(githubStats.typescript)}</FunFactPopover> lines of typescript shipped</p>
                <p>— <FunFactPopover content={`${formatLOC(githubStats.cuda)} lines · kernels, attention, cuda streams`}>{formatLOC(githubStats.cuda)}</FunFactPopover> lines of cuda shipped</p>
                <p>— speaks <FunFactPopover content="telugu · kannada · english · hindi · tamil · malayalam · spanish">6 languages</FunFactPopover> (7 on a good day)</p>
                <p>— <FunFactPopover image="/apex-stats.png">apex legends india top 50</FunFactPopover> · season 6</p>
                <p>— <FunFactPopover content="2x2 · 3x3 · 4x4 · mirror cube · pb: 39s">solves rubik's cubes</FunFactPopover> · pb 39s</p>
                <p>— chess.com bullet peak: 1500</p>
                <p>— makes beats, guitar, keyboard</p>
              </div>

              <footer className="flex items-center gap-4 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                <Link to="/work" className="hover:text-black transition-colors">work</Link>
                <span className="opacity-30">/</span>
                <span>21</span>
                <span className="opacity-30">/</span>
                <a href="mailto:shreyas.s@outlook.in" className="hover:text-black transition-colors">email</a>
                <span className="opacity-30">/</span>
                <a href="https://www.linkedin.com/in/zhreyas/" target="_blank" rel="noopener" className="hover:text-black transition-colors">linkedin</a>
              </footer>
            </div>
          </div>
        </motion.main>
      )}
    </AnimatePresence>
    </div>
  );
}
