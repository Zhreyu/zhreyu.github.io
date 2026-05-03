import type { ReactNode } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FunFactPopoverProps {
  children: ReactNode;
  content?: string;
  image?: string;
}

export default function FunFactPopover({ children, content, image }: FunFactPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // Calculate position: align vertically with trigger, place in right margin
    // Content area is max-w-md (~448px) centered in max-w-6xl (~1152px)
    // We want the popover to appear in the empty right margin

    // Find the right edge of the content area (approximately)
    const contentMaxWidth = 448; // max-w-md
    const containerMaxWidth = Math.min(1152, viewportWidth); // max-w-6xl or viewport
    const contentLeft = (containerMaxWidth - contentMaxWidth) / 2;
    const contentRight = contentLeft + contentMaxWidth;

    // Position popover 24px to the right of content area
    const popoverLeft = Math.min(contentRight + 24, viewportWidth - 200);

    // For mobile/narrow viewports, fall back to tooltip behavior
    const isMobile = viewportWidth < 640;

    if (isMobile) {
      // Position above the trigger on mobile
      setPosition({
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
      });
    } else {
      // Desktop: position in right margin, vertically aligned with trigger
      setPosition({
        top: rect.top + rect.height / 2,
        left: popoverLeft,
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, { passive: true });
      window.addEventListener('resize', updatePosition, { passive: true });

      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen, updatePosition]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <span className="relative inline">
      <span
        ref={triggerRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="border-b border-dashed border-gray-400/50 cursor-help hover:border-gray-600 hover:text-gray-600 transition-colors"
      >
        {children}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 8, y: isMobile ? 4 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: isMobile ? 0 : 4, y: isMobile ? 2 : 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed z-[100] pointer-events-none"
            style={{
              top: position.top,
              left: position.left,
              transform: isMobile
                ? 'translate(-50%, -100%)'
                : 'translateY(-50%)',
            }}
          >
            {/* Connection indicator - subtle visual tether */}
            {!isMobile && (
              <div className="absolute left-0 top-1/2 -translate-x-3 -translate-y-1/2">
                <div className="w-2 h-2 rotate-45 bg-gray-900 border-l border-b border-gray-700"
                     style={{ display: image ? 'none' : 'block' }} />
              </div>
            )}

            {image ? (
              <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
                <img
                  src={image}
                  alt="Preview"
                  className="w-40 h-auto object-contain"
                />
              </div>
            ) : content ? (
              <div className="bg-gray-900 text-gray-100 px-4 py-2.5 rounded-lg shadow-lg text-sm font-mono max-w-xs">
                {content}
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
