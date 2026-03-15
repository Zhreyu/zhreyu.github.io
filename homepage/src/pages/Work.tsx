import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { companies } from '../data/work';
import BackLink from '../components/BackLink';
import TechPill from '../components/TechPill';

export default function Work() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 px-8 md:px-24 py-12 max-w-5xl mx-auto w-full"
    >
      <div className="mb-12">
        <BackLink to="/" label="Back to Home" />
      </div>

      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h1 className="font-serif font-black text-4xl md:text-6xl leading-none tracking-tighter mb-4">
          Work
        </h1>
        <p className="text-[#9a9088]">
          A record of problems I've worked on and how I approached them.
        </p>
      </motion.header>

      <div className="grid md:grid-cols-2 gap-6">
        {companies.map((company, index) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.1 }}
          >
            <Link
              to={`/work/${company.id}`}
              className="block h-full p-6 border border-white/10 rounded-xl hover:border-[var(--accent)]/50 hover:bg-white/[0.02] hover:shadow-[0_0_30px_rgba(200,184,154,0.1)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="font-serif text-2xl font-medium group-hover:text-[var(--accent)] transition-colors">
                  {company.name}
                </h2>
                <ArrowRight
                  size={18}
                  className="text-[#6b6358] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all"
                />
              </div>

              <p className="text-sm text-[var(--accent)] mb-1">{company.role}</p>
              <p className="text-xs text-[#6b6358] mb-4">{company.location} · {company.period}</p>

              <p className="text-sm text-[#9a9088] mb-6 line-clamp-2 leading-relaxed">
                {company.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {company.techStack.slice(0, 4).map((tech) => (
                  <TechPill key={tech} tech={tech} size="sm" />
                ))}
                {company.techStack.length > 4 && (
                  <span className="text-[10px] text-[#6b6358] self-center">
                    +{company.techStack.length - 4} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs text-[#6b6358]">
                  {company.tasks.length} case {company.tasks.length === 1 ? 'study' : 'studies'}
                </span>
                <span className="text-xs text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                  View details →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
