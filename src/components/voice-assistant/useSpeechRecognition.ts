"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface UseSpeechRecognitionReturn {
	isListening: boolean;
	transcript: string;
	interimTranscript: string;
	error: string | null;
	isSupported: boolean;
	startListening: () => void;
	stopListening: () => void;
	resetTranscript: () => void;
}

interface SpeechRecognitionAlternativeLike {
	transcript: string;
}

interface SpeechRecognitionResultLike {
	isFinal: boolean;
	[index: number]: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionResultListLike {
	length: number;
	[index: number]: SpeechRecognitionResultLike;
}

interface SpeechRecognitionEventLike {
	results: SpeechRecognitionResultListLike;
}

interface SpeechRecognitionErrorEventLike {
	error: string;
}

interface SpeechRecognitionLike {
	continuous: boolean;
	interimResults: boolean;
	lang: string;
	maxAlternatives: number;
	onstart: (() => void) | null;
	onresult: ((event: SpeechRecognitionEventLike) => void) | null;
	onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
	onend: (() => void) | null;
	start: () => void;
	stop: () => void;
	abort: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

interface SpeechRecognitionWindow extends Window {
	SpeechRecognition?: SpeechRecognitionConstructor;
	webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
	const [isListening, setIsListening] = useState(false);
	const [transcript, setTranscript] = useState("");
	const [interimTranscript, setInterimTranscript] = useState("");
	const [error, setError] = useState<string | null>(null);

	const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
	const isSupported =
		typeof window !== "undefined" &&
		("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

	useEffect(() => {
		return () => {
			if (recognitionRef.current) {
				try {
					recognitionRef.current.abort();
				} catch {}
			}
		};
	}, []);

	const startListening = useCallback(() => {
		if (!isSupported) {
			setError("Speech recognition is not supported in this browser.");
			return;
		}

		setError(null);
		setInterimTranscript("");

		const speechWindow = window as SpeechRecognitionWindow;
		const SpeechRecognition =
			speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

		if (!SpeechRecognition) {
			setError("Speech recognition is not supported in this browser.");
			return;
		}

		const recognition = new SpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;
		recognition.lang = "en-US";
		recognition.maxAlternatives = 1;

		recognition.onstart = () => {
			setIsListening(true);
		};

		recognition.onresult = (event) => {
			let finalText = "";
			let interimText = "";

			for (let i = 0; i < event.results.length; i++) {
				const result = event.results[i];
				if (result.isFinal) {
					finalText += result[0].transcript;
				} else {
					interimText += result[0].transcript;
				}
			}

			if (finalText) {
				setTranscript(finalText.trim());
			}
			setInterimTranscript(interimText);
		};

		recognition.onerror = (event) => {
			if (event.error === "no-speech") return;
			setError(`Speech recognition error: ${event.error}`);
			setIsListening(false);
		};

		recognition.onend = () => {
			setIsListening(false);
		};

		try {
			recognition.start();
			recognitionRef.current = recognition;
		} catch {
			setError("Failed to start speech recognition.");
			setIsListening(false);
		}
	}, [isSupported]);

	const stopListening = useCallback(() => {
		if (recognitionRef.current) {
			try {
				recognitionRef.current.stop();
			} catch {}
			setIsListening(false);
		}
	}, []);

	const resetTranscript = useCallback(() => {
		setTranscript("");
		setInterimTranscript("");
	}, []);

	return {
		isListening,
		transcript,
		interimTranscript,
		error,
		isSupported,
		startListening,
		stopListening,
		resetTranscript,
	};
}
