"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface UseSpeechSynthesisReturn {
	isSpeaking: boolean;
	isSupported: boolean;
	speak: (text: string) => void;
	stop: () => void;
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
	const [isSpeaking, setIsSpeaking] = useState(false);
	const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

	const isSupported =
		typeof window !== "undefined" && "speechSynthesis" in window;

	useEffect(() => {
		return () => {
			if (isSupported) {
				window.speechSynthesis.cancel();
			}
		};
	}, [isSupported]);

	const stop = useCallback(() => {
		if (isSupported) {
			window.speechSynthesis.cancel();
			setIsSpeaking(false);
		}
	}, [isSupported]);

	const speak = useCallback(
		(text: string) => {
			if (!isSupported) return;

			// Cancel any ongoing speech
			window.speechSynthesis.cancel();

			const utterance = new SpeechSynthesisUtterance(text);
			utterance.lang = "en-US";
			utterance.rate = 1;
			utterance.pitch = 1;
			utterance.volume = 1;

			// Try to pick a natural English voice
			const voices = window.speechSynthesis.getVoices();
			const preferred = voices.find(
				(v) =>
					v.lang.startsWith("en") &&
					(v.name.includes("Google") ||
						v.name.includes("Samantha") ||
						v.name.includes("Natural") ||
						v.name.includes("Enhanced"))
			);
			if (preferred) {
				utterance.voice = preferred;
			}

			utterance.onstart = () => setIsSpeaking(true);
			utterance.onend = () => setIsSpeaking(false);
			utterance.onerror = () => setIsSpeaking(false);

			utteranceRef.current = utterance;
			window.speechSynthesis.speak(utterance);
		},
		[isSupported]
	);

	return { isSpeaking, isSupported, speak, stop };
}
