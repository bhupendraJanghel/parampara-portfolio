"use client";

import { motion } from "framer-motion";
import { Crown, Sparkles, Store } from "lucide-react";

const founders = [
  {
    name: "Rumesh Janghel",
    role: "Founder",
    subtitle: "Parampara Event Planner",
    description:
      "Rumesh leads the planning vision behind Parampara Events, shaping each celebration with clear communication, steady coordination, and a refined sense of how an event should feel from the first guest arrival to the final farewell.",
    icon: Crown,
    image: "/images/rumesh.png",
  },
  {
    name: "Nitesh Janghel",
    role: "Co-Founder",
    subtitle: "Owner of Parampara Decor Shop",
    description:
      "Nitesh strengthens the brand with decor expertise, transforming concepts into premium stage setups, floral styling, immersive themes, and visual details that help every event look polished and memorable.",
    icon: Store,
    image: "/images/nitesh.png",
  },
];

const pillars = [
  "Planning that balances family tradition with modern presentation",
  "Decor execution that feels premium in person and in photographs",
  "A flexible team for weddings, social functions, and branded events",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#f3ead9] px-6 py-24 text-[#1d241d]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b88a44]/60 to-transparent" />
      <div className="absolute -right-20 top-12 h-72 w-72 rounded-full bg-[#d2a45c]/10 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#233328]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14 max-w-3xl"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#b88a44]/30 bg-white/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8e6629]">
            <Sparkles size={14} />
            The Team Behind Parampara
          </span>
          <h2 className="font-serif text-4xl leading-tight text-[#1b3225] md:text-6xl">
            Built by planners and decor specialists who know how to turn ideas
            into memorable experiences.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-stone-700 md:text-lg">
            Parampara Events is built to give clients confidence before the
            event even begins. We combine planning, decor, styling, and
            execution so every function feels polished, intentional, and deeply
            personal.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6">
            {founders.map((founder, index) => (
              <motion.article
                key={founder.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                className="group overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/70 shadow-[0_20px_80px_rgba(31,35,23,0.08)] backdrop-blur"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-64 w-full md:h-auto md:w-56 lg:w-64">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent md:hidden" />
                  </div>

                  <div className="flex-1 p-8">
                    <div className="mb-6 flex items-start justify-between gap-6">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#9f7637]">
                          {founder.role}
                        </p>
                        <h3 className="mt-2 font-serif text-3xl text-[#1b3225]">
                          {founder.name}
                        </h3>
                        <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
                          {founder.subtitle}
                        </p>
                      </div>
                      <div className="hidden rounded-full border border-[#caa56c]/40 bg-[#f5ecdc] p-3 text-[#8c6631] transition-transform duration-500 group-hover:-translate-y-1 sm:block">
                        <founder.icon size={20} />
                      </div>
                    </div>
                    <p className="text-base leading-7 text-stone-700">
                      {founder.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-[2rem] bg-[#1c2a21] p-8 text-[#f7f1e6] shadow-[0_30px_100px_rgba(24,35,26,0.28)]"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#d8b374]">
              Why Clients Remember Us
            </p>
            <ul className="mt-8 space-y-6">
              {pillars.map((pillar) => (
                <li
                  key={pillar}
                  className="flex items-start gap-4 border-b border-white/10 pb-6 last:border-b-0 last:pb-0"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#d8b374]" />
                  <span className="text-base leading-7 text-white/82">{pillar}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-semibold text-white">End-to-end</p>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  Planning, decor, guest experience, and on-ground execution in
                  one team.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-semibold text-white">Client-ready</p>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  A premium portfolio experience built to win trust quickly.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
