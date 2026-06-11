"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../layout/Container";
import {
  Map,
  Users,
  HeartPulse,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function ShowcaseSection() {
  return (
    <section className="relative overflow-hidden py-25">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl" />

      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Dashboard Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_25px_60px_rgba(16,185,129,0.12)]">

              {/* Window Controls */}
              <div className="mb-6 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Maharashtra Overview
                </h3>

                <Map className="text-emerald-500" />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <MiniCard
                  icon={<Users size={18} />}
                  title="Population"
                  value="125M+"
                />

                <MiniCard
                  icon={<HeartPulse size={18} />}
                  title="Hospitals"
                  value="12K+"
                />

                <MiniCard
                  icon={<GraduationCap size={18} />}
                  title="Schools"
                  value="25K+"
                />

                <MiniCard
                  icon={<Map size={18} />}
                  title="Villages"
                  value="43K+"
                />
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute -right-6 -top-6 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl"
            >
              <p className="text-sm text-slate-500">
                Active Records
              </p>

              <h3 className="text-2xl font-bold text-emerald-600">
                2.4M+
              </h3>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
              Platform Capabilities
            </span>

            <h2 className="mt-6 text-4xl font-bold tracking-tight lg:text-6xl">
              Built for Administrative Intelligence
            </h2>

            <p className="mt-6 text-lg text-slate-600">
              Maharashtra Nexus provides a unified
              platform for administrative management,
              institution tracking, population insights,
              and geographic visualization.
            </p>

            <div className="mt-8 space-y-4">
              <Feature text="Administrative Hierarchy Management" />
              <Feature text="Population Analytics & Reporting" />
              <Feature text="Institution Monitoring" />
              <Feature text="Geographic Intelligence & Mapping" />
            </div>

            {/* Trust Stats */}
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
              <span>36 Districts</span>
              <span>358 Talukas</span>
              <span>43K+ Villages</span>
            </div>

            <div className="mt-10 flex items-center gap-5">
              <Link href="/divisions" className="rounded-xl bg-emerald-500 px-6 py-3 font-medium text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-600">
                Explore Maharashtra
              </Link>

              <Link href="/analytics" className="flex items-center gap-2 font-medium text-slate-700 transition hover:text-emerald-600">
                View Statistics
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2
        size={20}
        className="text-emerald-500"
      />

      <span className="text-slate-700">
        {text}
      </span>
    </div>
  );
}

function MiniCard({ title, value, icon }) {
  return (
    <div className="group rounded-2xl bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-50">
      <div className="flex items-center justify-between">
        <span className="text-emerald-500 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-500">
        {title}
      </p>

      <h4 className="mt-1 text-xl font-bold">
        {value}
      </h4>
    </div>
  );
}