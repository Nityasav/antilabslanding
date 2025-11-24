'use client';

import React from 'react';
import { PricingSection } from '@/components/ui/pricing';

export default function PricingSectionComponent() {
	const PLANS = [
		{
			id: 'starter',
			name: 'Starter',
			info: 'For individuals and small projects',
			price: {
				monthly: 49,
				yearly: Math.round(49 * 12 * (1 - 0.15)),
			},
			features: [
				{ text: '8 blogs per month' },
				{ text: 'Up to 50 keyword research queries' },
				{ text: '1 competitor analysis' },
				{ text: 'No blog templates' },
				{ text: 'Standard SEO' },
				{ text: 'Basic support' },
			],
			btn: {
				text: 'Start Free Trial',
				href: '#',
			},
		},
		{
			highlighted: true,
			id: 'professional',
			name: 'Professional',
			info: 'For growing businesses',
			price: {
				monthly: 199,
				yearly: Math.round(199 * 12 * (1 - 0.15)),
			},
			features: [
				{ text: '20 blogs per month' },
				{ text: 'Up to 500 keyword research queries per month' },
				{ text: 'Up to 20 competitor analyses per month' },
				{ text: 'All blog templates (including comparison, custom templates)' },
				{ text: 'Advanced SEO optimization (clustering, long-tail keyword generation, PAA questions)' },
				{ text: 'Priority support' },
				{ text: 'Custom keyword research' },
			],
			btn: {
				text: 'Get Started',
				href: '#',
			},
		},
		{
			id: 'custom',
			name: 'Enterprise',
			info: 'For large organizations',
			price: {
				monthly: 999,
				yearly: Math.round(999 * 12 * (1 - 0.15)),
			},
			features: [
				{ text: 'Everything in Professional, plus:' },
				{ text: 'Custom limits' },
				{ text: 'White-glove onboarding' },
				{ text: 'Enterprise support' },
			],
			btn: {
				text: 'Contact Sales',
				href: 'https://calendly.com/noah-aflabs/30min',
				isCalendly: true,
			},
		},
	];

	return (
		<section className="bg-stone-50 py-20">
			<div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8">
				<PricingSection
					plans={PLANS}
					heading="Your Best Investment Yet"
					description="Whether you're just starting out or growing fast, our flexible pricing has you covered — with no hidden costs."
				/>
			</div>
		</section>
	);
}

