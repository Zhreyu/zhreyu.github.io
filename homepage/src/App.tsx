import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, FileText } from 'lucide-react';

export default function App() {
  const [isSwiss, setIsSwiss] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isSwiss ? 'swiss' : 'dark');
  }, [isSwiss]);

  const toggleAesthetic = () => setIsSwiss(!isSwiss);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500">
      <AnimatePresence mode="wait">
        {!isSwiss ? (
          <motion.main
            key="classic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col justify-center px-8 md:px-24 max-w-4xl mx-auto w-full gap-12"
          >
            <header>
              <h1 className="font-serif font-black text-6xl md:text-8xl leading-none tracking-tighter">
                Shreyas{' '}
                <span
                  onClick={toggleAesthetic}
                  className="italic font-normal text-[#c8b89a] cursor-pointer hover:drop-shadow-[0_0_20px_rgba(200,184,154,0.5)] transition-all"
                >
                  S.
                </span>
              </h1>

            </header>

            <div className="h-[1px] bg-gradient-to-r from-[#c8b89a] to-transparent w-full opacity-30" />

            <p className="text-lg md:text-xl leading-relaxed text-[#9a9088] max-w-xl font-light">
              <strong className="text-[#f0ede6] font-normal">I don't decide to build things — it just happens.</strong> Obsidian felt slow so I built my own, I've skipped class to intern at startups, fine-tuned diffusion models at 2 AM for viral trends, and shipped because waiting felt slower than moving. I apply for roles I half-qualify for and build until I do. I don't have a five-year plan I just pick the most interesting problem in the room and move toward it. <strong className="text-[#f0ede6] font-normal">So far, it's working.</strong>
            </p>

            <nav className="flex flex-wrap gap-8 items-center">
              <a href="mailto:shreyas.s@outlook.in" className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6b6358] hover:text-[#c8b89a] transition-colors group">
                <Mail size={14} className="opacity-60 group-hover:opacity-100" />
                email
              </a>
              <a href="https://www.linkedin.com/in/zhreyas/" target="_blank" rel="noopener" className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6b6358] hover:text-[#c8b89a] transition-colors group">
                <Linkedin size={14} className="opacity-60 group-hover:opacity-100" />
                linkedin
              </a>
              <a href="https://drive.google.com/file/d/1wzEGhmbvWGx_pFYKKSA2t7K3VrRuxiiw/view" target="_blank" rel="noopener" className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6b6358] hover:text-[#c8b89a] transition-colors group">
                <FileText size={14} className="opacity-60 group-hover:opacity-100" />
                resume
              </a>
            </nav>
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
                <p className="font-sans text-lg md:text-xl text-gray-600 leading-snug mb-12">
                Jack of all trades and master of <strong>GETTING STUFF DONE.</strong> 
                <br></br>
                <br></br>
                STUDENT · RESEARCHER · BUILDER · ENGINEER · GENERALIST · POLYGLOT · <span className="line-through opacity-50">POLYMATH</span> not yet
                <br></br>
                <br></br>
                Feel free to reach out :))
                </p>
                <footer className="flex items-center gap-4 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
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

      {!isSwiss && (
        <footer className="px-8 md:px-24 py-8 max-w-4xl mx-auto w-full flex justify-between items-center border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-[#3a3530]">Open to opportunities</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#3a3530] opacity-40">click the S.</span>
        </footer>
      )}
    </div>
  );
}
