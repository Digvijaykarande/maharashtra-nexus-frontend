"use client";

import { motion } from "framer-motion";
import Container from "../layout/Container";
import {
  Landmark,
  Building2,
  MapPinned,
  Users,
  HeartPulse,
  School,
} from "lucide-react";

const stats = [
  {
    title: "Divisions",
    value: "6",
    icon: Landmark,
  },
  {
    title: "Districts",
    value: "36",
    icon: Building2,
  },
  {
    title: "Talukas",
    value: "358",
    icon: MapPinned,
  },
  {
    title: "Villages",
    value: "43K+",
    icon: Users,
  },
  {
    title: "Hospitals",
    value: "12K+",
    icon: HeartPulse,
  },
  {
    title: "Schools",
    value: "25K+",
    icon: School,
  },
];

export default function StatisticsSection() {
  return (
    <section className="py-21">
      <Container>
        <div className="text-center">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
            Administrative Network
          </span>

          <h2 className="mt-5 text-4xl font-bold lg:text-5xl">
            Maharashtra at a Glance
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Comprehensive administrative, institutional,
            and demographic data across Maharashtra.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl"
            >
              <div className="flex justify-between">
                <stat.icon
                  size={24}
                  className="text-emerald-500 transition-transform duration-300 group-hover:scale-110"
                />

                <div className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>

              <h3 className="mt-6 text-4xl font-bold">
                {stat.value}
              </h3>

              <p className="mt-2 text-slate-500">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}