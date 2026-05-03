import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check } from 'lucide-react';
import { useLlmViewer } from '../context/LlmViewerContext';

export default function LlmViewer() {
  const { isOpen, close } = useLlmViewer();
  const [content, setContent] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && !content) {
      setLoading(true);
      fetch('/llm.txt')
        .then(res => res.text())
        .then(text => {
          setContent(text);
          setLoading(false);
        })
        .catch(() => {
          setContent('Failed to load llm.txt');
          setLoading(false);
        });
    }
  }, [isOpen, content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  // Respect reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const variants = prefersReducedMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  } : {
    hidden: { opacity: 0, y: '100%' },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 30, stiffness: 300 } },
    exit: { opacity: 0, y: '100%', transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={close}
          />

          {/* Panel */}
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] bg-[#0a0a0a] border-t border-white/10 rounded-t-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#6b6358] uppercase tracking-widest">llm.txt</span>
                <span className="text-[10px] text-[#3a3530]/60 font-mono">for AI assistants</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors text-[#6b6358] hover:text-[#c8b89a]"
                  aria-label={copied ? 'Copied' : 'Copy to clipboard'}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <button
                  onClick={close}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors text-[#6b6358] hover:text-[#c8b89a]"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-4 h-4 border-2 border-[#c8b89a]/30 border-t-[#c8b89a] rounded-full animate-spin" />
                </div>
              ) : (
                <pre className="font-mono text-sm text-[#9a9088] whitespace-pre-wrap leading-relaxed">
                  {content}
                </pre>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#3a3530]/40">
                ESC to close
              </span>
              <span className="text-[10px] font-mono text-[#3a3530]/40">
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-[#6b6358]">Cmd</kbd>
                <span className="mx-1">+</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-[#6b6358]">.</kbd>
                <span className="ml-2">to toggle</span>
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
