import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import Container from "@/components/layout/Container";
import FAQSection from "@/components/contact/FAQSection";
import ContactMapWrapper from "@/components/contact/ContactMapWrapper";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  User,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main>

        {/* Hero */}
        <section className="py-18">
          <Container>

            <div className="mx-auto max-w-4xl text-center">

              <span className="rounded-full border border-emerald-400 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
                Contact Us
              </span>

              <h1 className="mt-6 text-5xl font-bold tracking-tight lg:text-7xl">
                Get In Touch
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
                We'd love to hear from you.
                Reach out for inquiries,
                support, feedback or collaboration.
              </p>

            </div>

          </Container>
        </section>

        {/* Contact Section */}
        <section className="pb-18">
          

            <div className="grid gap-10 lg:grid-cols-2">
            {/* Contact Form */}
<div
  className="
    rounded-3xl
    border border-white/50
    bg-white/80
    backdrop-blur-md
    p-8
    shadow-[0_20px_60px_rgba(16,185,129,0.12)]
  "
>
  <div className="flex items-center justify-between">
    <div>
      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        Contact Form
      </span>

      <h2 className="mt-3 text-3xl font-bold">
        Send a Message
      </h2>

      <p className="mt-2 text-slate-600">
        Have a question, suggestion, or feedback?
        We'd love to hear from you.
      </p>
    </div>
  </div>

  <div className="mt-8 space-y-5">

    {/* Full Name */}
    <div className="group relative">
      <User
        size={18}
        className="absolute left-4 top-4 text-slate-400 transition group-focus-within:text-emerald-500"
      />

      <input
        type="text"
        placeholder="Full Name"
        className="
          w-full
          rounded-xl
          border border-slate-300
          bg-white
          py-3
          pl-12
          pr-4
          outline-none
          transition-all
          focus:border-emerald-500
          focus:ring-4
          focus:ring-emerald-100
        "
      />
    </div>

    {/* Email */}
    <div className="group relative">
      <Mail
        size={18}
        className="absolute left-4 top-4 text-slate-400 transition group-focus-within:text-emerald-500"
      />

      <input
        type="email"
        placeholder="Email Address"
        className="
          w-full
          rounded-xl
          border border-slate-300
          bg-white
          py-3
          pl-12
          pr-4
          outline-none
          transition-all
          focus:border-emerald-500
          focus:ring-4
          focus:ring-emerald-100
        "
      />
    </div>

    {/* Subject */}
    <div className="group relative">
      <MessageSquare
        size={18}
        className="absolute left-4 top-4 text-slate-400 transition group-focus-within:text-emerald-500"
      />

      <input
        type="text"
        placeholder="Subject"
        className="
          w-full
          rounded-xl
          border border-slate-300
          bg-white
          py-3
          pl-12
          pr-4
          outline-none
          transition-all
          focus:border-emerald-500
          focus:ring-4
          focus:ring-emerald-100
        "
      />
    </div>

    {/* Message */}
    <div className="group relative">
      <MessageSquare
        size={18}
        className="absolute left-4 top-4 text-slate-400 transition group-focus-within:text-emerald-500"
      />

      <textarea
        rows={6}
        placeholder="Write your message here..."
        className="
          w-full
          rounded-xl
          border border-slate-300
          bg-white
          py-3
          pl-12
          pr-4
          outline-none
          transition-all
          focus:border-emerald-500
          focus:ring-4
          focus:ring-emerald-100
        "
      />
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-2 gap-4">
      <a
        href="mailto:contact@maharashtranexus.in"
        className="
          rounded-xl
          border border-slate-200
          bg-slate-50
          p-4
          text-center
          text-sm
          font-medium
          transition
          hover:border-emerald-300
          hover:bg-emerald-50
        "
      >
        📧 Email Us
      </a>

      <a
        href="tel:+919876543210"
        className="
          rounded-xl
          border border-slate-200
          bg-slate-50
          p-4
          text-center
          text-sm
          font-medium
          transition
          hover:border-emerald-300
          hover:bg-emerald-50
        "
      >
        📞 Call Us
      </a>
    </div>

    {/* Submit Button */}
    <button
      className="
        w-full
        rounded-xl
        bg-gradient-to-r
        from-emerald-500
        to-emerald-600
        px-6
        py-4
        font-medium
        text-white
        shadow-lg
        shadow-emerald-500/25
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        hover:shadow-emerald-500/30
      "
    >
      Send Message →
    </button>

  </div>
</div>
              

              {/* Contact Information */}
              <div className="space-y-6">

                <InfoCard
                  icon={<Mail />}
                  title="Email"
                  value="contact@maharashtranexus.in"
                />

                <InfoCard
                  icon={<Phone />}
                  title="Phone"
                  value="+91 98765 43210"
                />

                <InfoCard
                  icon={<MapPin />}
                  title="Address"
                  value="Mumbai, Maharashtra, India"
                />

                <InfoCard
                  icon={<Clock />}
                  title="Working Hours"
                  value="Monday - Friday, 9:00 AM - 6:00 PM"
                />

              </div>

            </div>

         
        </section>

<section className="pb-24">
  <div className="mx-auto max-w-5xl px-4">
  <Container>
    <div className="overflow-hidden rounded-3xl border border-slate-300 bg-white shadow-sm">

      {/* Header */}
      <div className="border-b border-slate-300 p-6">
        <h2 className="text-2xl font-bold">
          Maharashtra Administrative Overview
        </h2>

        <p className="mt-2 text-slate-600">
          Explore key administrative regions and
          major cities across Maharashtra.
        </p>
      </div>

      {/* Map */}
      <ContactMapWrapper />

      {/* Bottom Stats */}
      <div className="border-t border-slate-200 p-6">

  <div className="flex items-center justify-between">
    <h3 className="font-semibold">
      Featured Regions
    </h3>

    <span className="text-sm text-slate-500">
      Major Administrative Centers
    </span>
  </div>

  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

    <RegionCard
      city="Mumbai"
      subtitle="Capital Region"
    />

    <RegionCard
      city="Pune"
      subtitle="Pune Division"
    />

    <RegionCard
      city="Nagpur"
      subtitle="Nagpur Division"
    />

    <RegionCard
      city="Nashik"
      subtitle="Nashik Division"
    />

  </div>

</div>

    </div>
  </Container>
  </div>
</section>


<FAQSection />

      

      </main>

      <Footer />
    </>
  );
}

<div className="grid grid-cols-2 gap-4">

  <a
    href="mailto:contact@maharashtranexus.in"
    className="rounded-2xl bg-emerald-500 p-4 text-white"
  >
    Email Us
  </a>

  <a
    href="tel:+919876543210"
    className="rounded-2xl border border-slate-200 p-4"
  >
    Call Us
  </a>

</div>


function InfoCard({
  icon,
  title,
  value,
}) {
  return (
      <div className="
          group
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-emerald-300
          hover:shadow-xl
        "
        >
      <div className="text-emerald-500">
        {icon}
      </div>

      <h3 className="mt-4 text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-slate-600">
        {value}
      </p>
    </div>
  );
}

function RegionCard({
  city,
  subtitle,
}) {
  return (
    <div className="rounded-2xl border border-slate-300 bg-emerald-500 p-4 transition hover:border-emerald-200 hover:bg-emerald-50">

      <h3 className="font-semibold">
        {city}
      </h3>

      <p className="mt-1 text-sm text-black-100">
        {subtitle}
      </p>

    </div>
  );
}

function StatItem({
  title,
  value,
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 text-center">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold text-emerald-600">
        {value}
      </h3>
    </div>
  );
}