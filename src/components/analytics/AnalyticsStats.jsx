import Container from "@/components/layout/Container";
import {
  Landmark,
  Building2,
  MapPinned,
  Users,
} from "lucide-react";

const stats = [
  {
    icon: Landmark,
    value: "6",
    label: "Divisions",
  },
  {
    icon: Building2,
    value: "36",
    label: "Districts",
  },
  {
    icon: MapPinned,
    value: "358",
    label: "Talukas",
  },
  {
    icon: Users,
    value: "43K+",
    label: "Villages",
  },
];

export default function AnalyticsStats() {
  return (
    <section className="pb-16">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <stat.icon className="h-8 w-8 text-emerald-500" />

              <h3 className="mt-4 text-4xl font-bold">
                {stat.value}
              </h3>

              <p className="mt-2 text-slate-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}