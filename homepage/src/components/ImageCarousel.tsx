import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

interface ImageCarouselProps {
  images: string[];
  title?: string;
}

export default function ImageCarousel({ images, title = 'Gallery' }: ImageCarouselProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const scrollBy = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-16"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl font-medium text-[var(--fg)] flex items-center gap-3">
          <span className="w-8 h-[2px] bg-[var(--accent)]/50" />
          {title}
        </h3>
        <span className="text-xs text-[#6b6358]">
          {images.length} {images.length === 1 ? 'image' : 'images'}
        </span>
      </div>

      <div className="relative group">
        {/* Scroll buttons - hidden on mobile, visible on desktop hover */}
        {images.length > 2 && (
          <>
            <button
              onClick={() => scrollBy('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollBy('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openLightbox(index)}
              className="relative flex-shrink-0 w-64 h-48 md:w-80 md:h-56 rounded-xl overflow-hidden border border-white/10 snap-start group/image"
            >
              <img
                src={image}
                alt={`${title} image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover/image:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/30 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover/image:opacity-100 transition-opacity p-3 rounded-full bg-white/20 backdrop-blur-sm">
                  <Expand size={20} className="text-white" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Dot indicators for mobile */}
        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-4 md:hidden">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className="w-1.5 h-1.5 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Hint text */}
      <p className="text-xs text-[#6b6358] mt-4 text-center md:text-left">
        Tap to expand and pinch to zoom
      </p>

      {/* Lightbox */}
      <ImageLightbox
        images={images}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </motion.section>
  );
}
