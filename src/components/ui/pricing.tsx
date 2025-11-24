'use client';

import React from 'react';

import { Button } from '@/components/ui/button';

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

import { CheckCircleIcon, StarIcon } from 'lucide-react';

import Link from 'next/link';

import { motion, Transition } from 'framer-motion';

import { CalendlyPopup } from '@/components/ui/calendly-popup';

type FREQUENCY = 'monthly' | 'yearly';
const frequencies: FREQUENCY[] = ['monthly', 'yearly'];

interface Plan {
	name: string;
	info: string;
	price: {
		monthly: number;
		yearly: number;
	};
	features: {
		text: string;
		tooltip?: string;
	}[];
	btn: {
		text: string;
		href: string;
		isCalendly?: boolean;
	};
	highlighted?: boolean;
}

interface PricingSectionProps extends React.ComponentProps<'div'> {
	plans: Plan[];
	heading: string;
	description?: string;
}

export function PricingSection({
	plans,
	heading,
	description,
	...props
}: PricingSectionProps) {
	const [frequency, setFrequency] = React.useState<'monthly' | 'yearly'>(
		'monthly',
	);

	return (
		<div
			className={cn(
				'flex w-full flex-col items-center justify-center space-y-8 p-4',
				props.className,
			)}
			{...props}
		>
			<div className="mx-auto max-w-xl space-y-2">
				<h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
					{heading}
				</h2>
				{description && (
					<p className="text-gray-600 text-center text-sm md:text-base">
						{description}
					</p>
				)}
			</div>
			<PricingFrequencyToggle
				frequency={frequency}
				setFrequency={setFrequency}
			/>
			<div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
				{plans.map((plan) => (
					<PricingCard plan={plan} key={plan.name} frequency={frequency} />
				))}
			</div>
		</div>
	);
}

type PricingFrequencyToggleProps = React.ComponentProps<'div'> & {
	frequency: FREQUENCY;
	setFrequency: React.Dispatch<React.SetStateAction<FREQUENCY>>;
};

export function PricingFrequencyToggle({
	frequency,
	setFrequency,
	...props
}: PricingFrequencyToggleProps) {
	return (
		<div
			className={cn(
				'bg-gray-100 mx-auto flex w-fit rounded-full border border-gray-200 p-1',
				props.className,
			)}
			{...props}
		>
			{frequencies.map((freq) => (
				<button
					key={freq}
					onClick={() => setFrequency(freq)}
					className="relative px-4 py-1 text-sm capitalize"
				>
					{frequency === freq && (
						<motion.span
							layoutId="frequency"
							transition={{ type: 'spring', duration: 0.4 }}
							className="bg-gray-900 absolute inset-0 z-0 rounded-full"
						/>
					)}
					<span className={`relative z-10 ${frequency === freq ? 'text-white' : 'text-gray-700'}`}>
						{freq}
					</span>
				</button>
			))}
		</div>
	);
}

type PricingCardProps = React.ComponentProps<'div'> & {
	plan: Plan;
	frequency?: FREQUENCY;
};

export function PricingCard({
	plan,
	className,
	frequency = frequencies[0],
	...props
}: PricingCardProps) {
	const [isCalendlyOpen, setIsCalendlyOpen] = React.useState(false);

	return (
		<div
			key={plan.name}
			className={cn(
				'relative flex w-full flex-col rounded-lg border border-gray-200 bg-white overflow-hidden',
				className,
			)}
			{...props}
		>
			{plan.highlighted && (
				<BorderTrail
					style={{
						boxShadow:
							'0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(29 64 176 / 30%), 0 0 140px 90px rgb(29 64 176 / 20%)',
					}}
					size={100}
				/>
			)}
			<div
				className={cn(
					'bg-white rounded-t-lg border-b p-6',
					plan.highlighted && 'bg-gray-50',
				)}
			>
				<div className="absolute top-3 right-3 z-10 flex items-center gap-2">
					{plan.highlighted && (
						<p className="bg-gray-900 text-white flex items-center gap-1 rounded-md border border-gray-900 px-2.5 py-1 text-xs font-medium">
							<StarIcon className="h-3.5 w-3.5 fill-current" />
							Popular
						</p>
					)}
					{frequency === 'yearly' && (
						<p className="bg-[#1d40b0] text-white flex items-center gap-1 rounded-md border border-[#1d40b0] px-2.5 py-1 text-xs font-medium">
							{Math.round(
								((plan.price.monthly * 12 - plan.price.yearly) /
									plan.price.monthly /
									12) *
									100,
							)}
							% off
						</p>
					)}
				</div>

				<div className="text-xl font-semibold text-gray-900">{plan.name}</div>
				<p className="text-gray-600 text-base font-normal mt-1">{plan.info}</p>
				<h3 className="mt-4 flex items-end gap-1">
					{plan.name === 'Enterprise' ? (
						<span className="text-4xl font-bold text-gray-900">Custom</span>
					) : (
						<>
							<span className="text-4xl font-bold text-gray-900">${plan.price[frequency]}</span>
							<span className="text-gray-600 text-xl mb-1">
								{plan.name !== 'Free'
									? '/' + (frequency === 'monthly' ? 'month' : 'year')
									: ''}
							</span>
						</>
					)}
				</h3>
			</div>
			<div
				className={cn(
					'bg-white space-y-5 px-6 py-8 text-base',
					plan.highlighted && 'bg-gray-50',
				)}
			>
				{plan.features.map((feature, index) => (
					<div key={index} className="flex items-center gap-3">
						<CheckCircleIcon className="text-gray-900 h-5 w-5 flex-shrink-0" />
						<TooltipProvider>
							<Tooltip delayDuration={0}>
								<TooltipTrigger asChild>
									<p
										className={cn(
											'text-gray-700',
											feature.tooltip &&
												'cursor-pointer border-b border-dashed border-gray-400',
										)}
									>
										{feature.text}
									</p>
								</TooltipTrigger>
								{feature.tooltip && (
									<TooltipContent>
										<p>{feature.tooltip}</p>
									</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					</div>
				))}
			</div>
			<div
				className={cn(
					'mt-auto w-full border-t p-5 bg-white',
					plan.highlighted && 'bg-gray-50',
				)}
			>
				{plan.btn.isCalendly ? (
					<>
						<Button
							type="button"
							className={cn(
								"w-full py-3 text-base font-medium",
								plan.highlighted 
									? "bg-[#1d40b0] text-white hover:bg-[#1a3a9e] hover:text-white" 
									: "bg-white border-gray-300 text-gray-900 hover:bg-gray-50 hover:text-gray-900"
							)}
							variant={plan.highlighted ? 'default' : 'outline'}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setIsCalendlyOpen(true);
							}}
						>
							{plan.btn.text}
						</Button>
						<CalendlyPopup
							url={plan.btn.href}
							isOpen={isCalendlyOpen}
							onClose={() => setIsCalendlyOpen(false)}
						/>
					</>
				) : (
					<Button
						className={cn(
							"w-full py-3 text-base font-medium",
							plan.highlighted 
								? "bg-[#1d40b0] text-white hover:bg-[#1a3a9e] hover:text-white" 
								: "bg-white border-gray-300 text-gray-900 hover:bg-gray-50 hover:text-gray-900"
						)}
						variant={plan.highlighted ? 'default' : 'outline'}
						asChild
					>
						<Link href={plan.btn.href}>{plan.btn.text}</Link>
					</Button>
				)}
			</div>
		</div>
	);
}

type BorderTrailProps = {
  className?: string;
  size?: number;
  transition?: Transition;
  delay?: number;
  onAnimationComplete?: () => void;
  style?: React.CSSProperties;
};

export function BorderTrail({
  className,
  size = 60,
  transition,
  delay,
  onAnimationComplete,
  style,
}: BorderTrailProps) {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration: 5,
    ease: 'linear',
  };

  return (
    <div className='pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]'>
      <motion.div
        className={cn('absolute aspect-square bg-[#1d40b0]/60', className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          ...style,
        }}
        animate={{
          offsetDistance: ['0%', '100%'],
        }}
        transition={{
          ...(transition ?? BASE_TRANSITION),
          delay: delay,
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  );
}

