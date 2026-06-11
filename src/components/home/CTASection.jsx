"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../layout/Container";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-18">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-20 text-center text-white shadow-[0_25px_80px_rgba(16,185,129,0.25)] lg:px-20"
        >
          {/* Decorative Glow */}
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium">
              Get Started
            </span>

            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-bold lg:text-6xl">
              Ready to Explore Maharashtra?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-emerald-50">
              Access administrative data, divisions,
              districts, talukas, villages and institutions
              through a unified intelligence platform.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/divisions" className="rounded-xl bg-white px-6 py-3 font-medium text-emerald-600 transition hover:-translate-y-1">
                Explore Maharashtra
              </Link>

              <Link href="/analytics" className="flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-medium transition hover:bg-white/10">
                View Statistics
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}