import { Key } from 'react';

interface TechPillProps {
  key?: Key;
  tech: string;
  variant?: 'default' | 'accent';
  size?: 'sm' | 'md';
}

export default function TechPill({ tech, variant = 'default', size = 'sm' }: TechPillProps) {
  const baseClasses = "uppercase tracking-wider rounded transition-colors";

  const sizeClasses = size === 'sm'
    ? "text-[10px] px-2 py-1"
    : "text-xs px-3 py-1.5";

  const variantClasses = variant === 'accent'
    ? "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20"
    : "bg-white/5 text-[#9a9088] border border-white/10";

  return (
    <span className={`${baseClasses} ${sizeClasses} ${variantClasses}`}>
      {tech}
    </span>
  );
}
