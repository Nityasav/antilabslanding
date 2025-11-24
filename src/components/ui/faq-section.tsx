'use client';

import React from 'react';

const faqs = [
	{
		question: 'How does the blog generation work?',
		answer:
			'Our AI-powered system analyzes your domain, identifies content gaps, and generates high-quality blog posts optimized for SEO. You can customize templates, set keyword targets, and review before publishing.',
	},
	{
		question: 'Can I cancel my subscription anytime?',
		answer:
			'Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your access will continue until the end of your current billing period.',
	},
	{
		question: 'What happens if I exceed my monthly blog limit?',
		answer:
			'If you exceed your monthly blog limit, you can either upgrade to a higher plan or purchase additional blogs as add-ons. We\'ll notify you when you\'re approaching your limit.',
	},
	{
		question: 'Do you offer refunds?',
		answer:
			'We offer a 14-day money-back guarantee for all new subscriptions. If you\'re not satisfied with our service, contact us within 14 days of your initial purchase for a full refund.',
	},
	{
		question: 'Can I change my plan later?',
		answer:
			'Absolutely! You can upgrade or downgrade your plan at any time. When you upgrade, you\'ll get immediate access to the new features. Downgrades take effect at the start of your next billing cycle.',
	},
	{
		question: 'What kind of support do you offer?',
		answer:
			'Starter plans include basic email support. Professional plans get priority support with faster response times. Enterprise plans include dedicated account management and white-glove onboarding.',
	},
	{
		question: 'Are the blogs SEO-optimized?',
		answer:
			'Yes! All blogs are optimized for SEO with proper keyword placement, meta descriptions, heading structures, and internal linking. Professional and Enterprise plans include advanced SEO features like clustering and long-tail keyword generation.',
	},
	{
		question: 'Can I use the blogs for multiple websites?',
		answer:
			'Blogs are generated for a single domain per subscription. If you need content for multiple websites, you\'ll need separate subscriptions or an Enterprise plan with custom limits.',
	},
];

export default function FAQSection() {
	return (
		<section className="bg-stone-50 py-20">
			<div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8">
				<div className="mx-auto max-w-xl space-y-2 mb-12">
					<h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
						Frequently Asked Questions
					</h2>
					<p className="text-gray-600 text-center text-sm md:text-base">
						Everything you need to know about our pricing and plans. Further questions? Contact us at hello@aflabs.ai
					</p>
				</div>

				<div className="max-w-4xl mx-auto">
					<div className="border-2 border-gray-200 bg-white shadow-sm overflow-hidden">
						{faqs.map((faq, index) => (
							<details
								key={faq.question}
								className="group border-b-2 border-gray-200 last:border-b-0 [&_summary::-webkit-details-marker]:hidden"
								open={index === 0}
							>
								<summary className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors">
									<span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
										{faq.question}
									</span>
									<span className="ml-4 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-600 transition group-open:rotate-45 group-open:bg-[#1d40b0] group-open:text-white group-open:border-[#1d40b0]">
										<svg
											className="h-5 w-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											strokeWidth={2.5}
											style={{ transformOrigin: 'center' }}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M12 4v16m8-8H4"
											/>
										</svg>
									</span>
								</summary>
								<div className="px-6 pb-6 text-sm md:text-base text-gray-600 leading-relaxed">
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

