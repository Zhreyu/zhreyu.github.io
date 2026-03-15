import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface BackLinkProps {
  to: string;
  label: string;
}

export default function BackLink({ to, label }: BackLinkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#6b6358] hover:text-[var(--accent)] transition-colors group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        {label}
      </Link>
    </motion.div>
  );
}
