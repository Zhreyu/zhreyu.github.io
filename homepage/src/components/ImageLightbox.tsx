import type { TouchEvent, MouseEvent } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLightbox({ images, initialIndex, isOpen, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);
  const lastPinchDistanceRef = useRef<number | null>(null);

  // Reset zoom when changing images
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  // Reset index when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev * 1.5, 5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => {
      const newScale = Math.max(prev / 1.5, 1);
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
  }, []);

  const handleDoubleClick = useCallback(() => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  }, [scale]);

  // Touch handlers for pinch zoom and pan
  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      if (scale > 1) {
        setIsDragging(true);
      }
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastPinchDistanceRef.current = Math.sqrt(dx * dx + dy * dy);
    }
  }, [scale]);

  const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1 && isDragging && lastTouchRef.current) {
      const dx = e.touches[0].clientX - lastTouchRef.current.x;
      const dy = e.touches[0].clientY - lastTouchRef.current.y;
      setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2 && lastPinchDistanceRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const delta = distance / lastPinchDistanceRef.current;
      setScale((prev) => Math.min(Math.max(prev * delta, 1), 5));
      lastPinchDistanceRef.current = distance;
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    lastTouchRef.current = null;
    lastPinchDistanceRef.current = null;
    setIsDragging(false);
  }, []);

  // Mouse handlers for desktop pan
  const handleMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (scale > 1) {
      setIsDragging(true);
      lastTouchRef.current = { x: e.clientX, y: e.clientY };
    }
  }, [scale]);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (isDragging && lastTouchRef.current) {
      const dx = e.clientX - lastTouchRef.current.x;
      const dy = e.clientY - lastTouchRef.current.y;
      setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      lastTouchRef.current = { x: e.clientX, y: e.clientY };
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    lastTouchRef.current = null;
  }, []);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex flex-col"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 z-10">
          <span className="text-white/60 text-sm">
            {currentIndex + 1} / {images.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut size={20} className="text-white" />
            </button>
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn size={20} className="text-white" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Main image area */}
        <div
          ref={containerRef}
          className="flex-1 flex items-center justify-center overflow-hidden relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
        >
          <motion.img
            ref={imageRef}
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-full max-h-full object-contain select-none"
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              touchAction: scale > 1 ? 'none' : 'pan-y',
            }}
            onDoubleClick={handleDoubleClick}
            draggable={false}
          />

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} className="text-white" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={24} className="text-white" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="p-4 flex justify-center gap-2 overflow-x-auto">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                  index === currentIndex
                    ? 'border-[var(--accent)] opacity-100'
                    : 'border-transparent opacity-50 hover:opacity-75'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Hint text */}
        <div className="text-center pb-4 text-white/40 text-xs">
          {scale === 1 ? 'Double-tap to zoom' : 'Pinch or drag to navigate'}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
