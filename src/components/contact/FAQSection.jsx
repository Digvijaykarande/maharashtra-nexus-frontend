"use client";

const faqs = [
  {
    question:
      "What is Maharashtra Nexus?",
    answer:
      "Maharashtra Nexus is an administrative intelligence platform for exploring Maharashtra's divisions, districts, talukas and villages.",
  },
  {
    question:
      "Can I search locations?",
    answer:
      "Yes, users can search administrative regions and institutions through the platform.",
  },
  {
    question:
      "Is the data publicly accessible?",
    answer:
      "Selected administrative information is available through the public portal.",
  },
  {
    question:
      "Who manages Maharashtra Nexus?",
    answer:
      "Administrative users manage and maintain the platform data.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-slate-600">
            Common questions about the platform.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <h3 className="font-semibold">
                {faq.question}
              </h3>

              <p className="mt-3 text-slate-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}