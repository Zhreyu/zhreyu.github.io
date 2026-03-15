import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { getCompanyById } from '../data/work';
import BackLink from '../components/BackLink';
import TechPill from '../components/TechPill';

export default function CompanyDetail() {
  const { companyId } = useParams<{ companyId: string }>();
  const company = companyId ? getCompanyById(companyId) : undefined;

  if (!company) {
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
        <BackLink to="/work" label="Back to Work" />
      </div>

      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h1 className="font-serif font-black text-4xl md:text-6xl leading-none tracking-tighter mb-4">
          {company.name}
        </h1>
        <p className="text-[var(--accent)] text-lg mb-2">{company.role}</p>
        <p className="text-sm text-[#6b6358]">{company.location} · {company.period}</p>
      </motion.header>

      <div className="h-[1px] bg-gradient-to-r from-[var(--accent)] to-transparent w-full opacity-30 mb-12" />

      <div className="grid md:grid-cols-3 gap-12 mb-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="md:col-span-2"
        >
          <h2 className="text-xs uppercase tracking-widest text-[#6b6358] mb-4">Overview</h2>
          <p className="text-[#9a9088] leading-relaxed">{company.summary}</p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xs uppercase tracking-widest text-[#6b6358] mb-4">Team & Context</h2>
          <p className="text-sm text-[#9a9088] leading-relaxed">{company.teamContext}</p>
        </motion.section>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mb-16"
      >
        <h2 className="text-xs uppercase tracking-widest text-[#6b6358] mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {company.techStack.map((tech) => (
            <TechPill key={tech} tech={tech} size="md" />
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xs uppercase tracking-widest text-[#6b6358] mb-6">
          Case Studies
          <span className="ml-2 text-[var(--accent)]">({company.tasks.length})</span>
        </h2>

        <div className="space-y-4">
          {company.tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + index * 0.1 }}
            >
              <Link
                to={`/work/${company.id}/task/${task.id}`}
                className="block p-6 border border-white/10 rounded-xl hover:border-[var(--accent)]/50 hover:bg-white/[0.02] hover:shadow-[0_0_30px_rgba(200,184,154,0.1)] transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-xl font-medium group-hover:text-[var(--accent)] transition-colors">
                    {task.title}
                  </h3>
                  <ArrowRight
                    size={18}
                    className="text-[#6b6358] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all flex-shrink-0 ml-4"
                  />
                </div>

                <p className="text-sm text-[#6b6358] mb-4 line-clamp-2 leading-relaxed">
                  {task.deck.problem}
                </p>

                <div className="flex flex-wrap gap-2">
                  {task.deck.tags.slice(0, 4).map((tag) => (
                    <TechPill key={tag} tech={tag} variant="accent" size="sm" />
                  ))}
                  {task.deck.tags.length > 4 && (
                    <span className="text-[10px] text-[#6b6358] self-center">
                      +{task.deck.tags.length - 4}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 pt-8 border-t border-white/10"
      >
        <Link
          to="/work"
          className="text-xs uppercase tracking-widest text-[#6b6358] hover:text-[var(--accent)] transition-colors"
        >
          ← View all companies
        </Link>
      </motion.footer>
    </motion.main>
  );
}
