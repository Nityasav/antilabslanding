'use client';

import React, { useEffect, useRef } from 'react';

interface CalendlyPopupProps {
	url: string;
	isOpen: boolean;
	onClose: () => void;
}

declare global {
	interface Window {
		Calendly?: {
			initPopupWidget: (options: { url: string }) => void;
		};
	}
}

export function CalendlyPopup({ url, isOpen, onClose }: CalendlyPopupProps) {
	const initAttemptedRef = useRef(false);

	// Load Calendly script and CSS
	useEffect(() => {
		// Load CSS
		if (!document.querySelector('link[href*="calendly.com"]')) {
			const link = document.createElement('link');
			link.href = 'https://assets.calendly.com/assets/external/widget.css';
			link.rel = 'stylesheet';
			document.head.appendChild(link);
		}

		// Load script
		if (!document.querySelector('script[src*="calendly.com"]')) {
			const script = document.createElement('script');
			script.src = 'https://assets.calendly.com/assets/external/widget.js';
			script.async = true;
			document.head.appendChild(script);
		}
	}, []);

	// Initialize popup widget when opened
	useEffect(() => {
		if (isOpen && !initAttemptedRef.current) {
			initAttemptedRef.current = true;

			const tryInit = (attempts = 0) => {
				if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
					try {
						window.Calendly.initPopupWidget({ url });
					} catch (error) {
						console.error('Error initializing Calendly popup:', error);
						initAttemptedRef.current = false;
					}
				} else if (attempts < 100) {
					// Retry for up to 10 seconds
					setTimeout(() => tryInit(attempts + 1), 100);
				} else {
					console.error('Calendly widget failed to load');
					initAttemptedRef.current = false;
				}
			};

			// Start initialization
			setTimeout(() => tryInit(), 300);
		}

		if (!isOpen) {
			initAttemptedRef.current = false;
		}
	}, [isOpen, url]);

	// The popup widget creates its own modal, so we don't need to render anything
	return null;
}

