import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { getCompanyById, getTaskById } from '../data/work';
import BackLink from '../components/BackLink';
import TechPill from '../components/TechPill';
import ImageCarousel from '../components/ImageCarousel';

export default function TaskDetail() {
  const { companyId, taskId } = useParams<{ companyId: string; taskId: string }>();
  const company = companyId ? getCompanyById(companyId) : undefined;
  const task = companyId && taskId ? getTaskById(companyId, taskId) : undefined;

  if (!company || !task) {
    return <Navigate to="/work" replace />;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 px-8 md:px-24 py-12 max-w-4xl mx-auto w-full"
    >
      <div className="mb-12">
        <BackLink to={`/work/${company.id}`} label={`Back to ${company.name}`} />
      </div>

      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <p className="text-xs uppercase tracking-widest text-[#6b6358] mb-3">
          {company.name} · {company.period}
        </p>
        <h1 className="font-serif font-black text-3xl md:text-5xl leading-tight tracking-tighter mb-6">
          {task.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {task.deck.tags.map((tag) => (
            <TechPill key={tag} tech={tag} variant="accent" size="md" />
          ))}
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="h-[1px] bg-gradient-to-r from-[var(--accent)] to-transparent w-full opacity-30 mb-12"
      />

      {/* THE DECK - Executive Summary */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-16 p-8 border border-[var(--accent)]/30 rounded-2xl bg-[var(--accent)]/5 relative overflow-hidden"
      >
        {/* Subtle accent glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-sm uppercase tracking-widest text-[var(--accent)] font-medium">
              TL;DR
            </h2>
            {/* <span className="text-xs text-[#6b6358]">— The Deck</span> */}
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#6b6358] block mb-2">Problem</span>
              <p className="text-[var(--fg)] leading-relaxed">{task.deck.problem}</p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#6b6358] block mb-2">Solution</span>
              <p className="text-[var(--fg)] leading-relaxed">{task.deck.solution}</p>
            </div>

            <div className="pt-4 border-t border-[var(--accent)]/20">
              <span className="text-xs uppercase tracking-widest text-[#6b6358] block mb-2">Impact</span>
              <p className="text-[var(--accent)] font-medium text-lg">{task.deck.impact}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* THE STACK - Deep Technical Documentation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-10">
          <h2 className="text-sm uppercase tracking-widest text-[#6b6358] font-medium">
            Deep Dive
          </h2>
          {/* <span className="text-xs text-[#6b6358]">— The Stack</span> */}
        </div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <h3 className="font-serif text-2xl font-medium text-[var(--fg)] mb-4 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[var(--accent)]/50" />
              Context
            </h3>
            <p className="text-[#9a9088] leading-relaxed pl-11">{task.stack.context}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-serif text-2xl font-medium text-[var(--fg)] mb-4 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[var(--accent)]/50" />
              Architecture
            </h3>
            <p className="text-[#9a9088] leading-relaxed pl-11">{task.stack.architecture}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <h3 className="font-serif text-2xl font-medium text-[var(--fg)] mb-4 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[var(--accent)]/50" />
              Implementation
            </h3>
            <p className="text-[#9a9088] leading-relaxed pl-11">{task.stack.implementation}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-serif text-2xl font-medium text-[var(--fg)] mb-4 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[var(--accent)]/50" />
              Challenges & Trade-offs
            </h3>
            <p className="text-[#9a9088] leading-relaxed pl-11">{task.stack.challenges}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <h3 className="font-serif text-2xl font-medium text-[var(--fg)] mb-4 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[var(--accent)]/50" />
              Retrospective
            </h3>
            <p className="text-[#9a9088] leading-relaxed pl-11">{task.stack.learnings}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Image Gallery */}
      {task.images && task.images.length > 0 && (
        <ImageCarousel images={task.images} title="Gallery" />
      )}

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row md:justify-between gap-3"
      >
        <Link
          to={`/work/${company.id}`}
          className="flex items-center justify-center md:justify-start gap-2 py-4 px-6 md:py-0 md:px-0 text-xs uppercase tracking-widest text-[#6b6358] hover:text-[var(--accent)] border border-white/10 md:border-0 rounded-xl md:rounded-none transition-all"
        >
          <span>←</span>
          <span>View all {company.name} case studies</span>
        </Link>
        <Link
          to="/work"
          className="flex items-center justify-center md:justify-end gap-2 py-4 px-6 md:py-0 md:px-0 text-xs uppercase tracking-widest text-[#6b6358] hover:text-[var(--accent)] border border-white/10 md:border-0 rounded-xl md:rounded-none transition-all"
        >
          <span>View all companies</span>
          <span>→</span>
        </Link>
      </motion.footer>
    </motion.main>
  );
}
