import DatabaseWithRestApi from '@/components/ui/database-with-rest-api';

const faqs = [
  {
    question: 'What is the difference between SEO and GEO?',
    answer:
      'SEO helps you rank on search engines like Google through links and keywords. GEO helps you rank in AI-generated answers (ChatGPT, SGE, Claude) by optimizing for how LLMs retrieve, rank, and cite sources.',
  },
  {
    question: 'How do I know it will work in my industry?',
    answer:
      'AI assistants demand trustworthy answers in every vertical. We map the exact questions buyers ask in your niche and feed engines with verified answers so they consistently surface you.',
  },
  {
    question: 'What happens when AI platforms shift their algorithms?',
    answer:
      'We focus on durable quality signals: expertise, citations, freshness, and structured data. Our monitoring stack alerts us to platform shifts so we can adjust your playbook before rankings slip.',
  },
  {
    question: 'How fast will I see traction?',
    answer:
      'Most teams earn first citations instantly. Compounding visibility follows as assistants re-use and reference your answers. You get transparent reporting on every mention, answer, and assistant channel.',
  },
];

export default function FeaturesObjections() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* What We Do Section */}
        <div className="mb-16 md:mb-24">
          <div className="flex flex-col items-center">
            <DatabaseWithRestApi
              className="max-w-full"
              circleText="GEO"
              badgeTexts={{
                first: 'CRAWL',
                second: 'EXPAND',
                third: 'VALIDATE',
                fourth: 'DEPLOY',
              }}
              buttonTexts={{ first: 'Antifragility', second: 'GrowthOps' }}
              title="Autonomous GEO / SEO engine"
              lightColor="#1d40b0"
            />
          </div>
        </div>

        {/* Objections Section */}
        <div className="border-t border-gray-200 pt-16 md:pt-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 text-center">
            Common Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We address the concerns you might have
          </p>

          <div className="max-w-4xl mx-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group border-b border-gray-100 last:border-b-0 [&_summary::-webkit-details-marker]:hidden"
                open={index === 0}
              >
                <summary className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left">
                  <span className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <span className="ml-4 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-600 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-base text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

