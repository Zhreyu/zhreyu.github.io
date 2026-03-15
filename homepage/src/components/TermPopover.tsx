import type { ReactNode } from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TermPopoverProps {
  term: string;
  description: string;
  children?: ReactNode;
}

export default function TermPopover({ term, description, children }: TermPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');
  const triggerRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Prefer bottom, but flip to top if not enough space
      if (spaceBelow < 120 && spaceAbove > spaceBelow) {
        setPosition('top');
      } else {
        setPosition('bottom');
      }
    }
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <span className="relative inline">
      <span
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="border-b border-dashed border-current/40 cursor-help hover:border-current/70 transition-colors"
      >
        {children || term}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: position === 'bottom' ? -4 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === 'bottom' ? -4 : 4 }}
            transition={{ duration: 0.15 }}
            className={`absolute left-1/2 -translate-x-1/2 z-50 w-64 p-3 bg-[#1a1918] border border-white/10 rounded-lg shadow-xl text-sm ${
              position === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'
            }`}
          >
            <div className="text-[#c8b89a] font-medium mb-1">{term}</div>
            <div className="text-[#9a9088] text-xs leading-relaxed">{description}</div>

            {/* Arrow */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1918] border-white/10 rotate-45 ${
                position === 'bottom'
                  ? 'top-0 -translate-y-1/2 border-l border-t'
                  : 'bottom-0 translate-y-1/2 border-r border-b'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
