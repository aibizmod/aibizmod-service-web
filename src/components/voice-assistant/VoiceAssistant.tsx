"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { useSpeechSynthesis } from "./useSpeechSynthesis";
import { matchCommand } from "./voiceCommands";
import { VoiceButton } from "./VoiceButton";
import { VoiceChatPanel, type ChatMessage } from "./VoiceChatPanel";
import { VoiceCharacter } from "./VoiceCharacter";

export function VoiceAssistant() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [hasGreeted, setHasGreeted] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const {
		isListening,
		transcript,
		interimTranscript,
		isSupported,
		startListening,
		stopListening,
		resetTranscript,
	} = useSpeechRecognition();

	const { isSpeaking, speak, stop: stopSpeaking } = useSpeechSynthesis();

	// Determine character state
	const characterState = isListening
		? "listening"
		: isSpeaking
			? "speaking"
			: "idle";

	// Process transcript when recognition finalizes
	useEffect(() => {
		if (!transcript) return;

		const command = matchCommand(transcript);

		const userMsg: ChatMessage = {
			id: `u-${Date.now()}`,
			role: "user",
			text: transcript,
		};

		const botMsg: ChatMessage = {
			id: `b-${Date.now()}`,
			role: "bot",
			text: command.response,
		};

		setMessages((prev) => [...prev, userMsg, botMsg]);
		resetTranscript();
		speak(command.response);

		if (command.action === "navigate" && command.path) {
			setTimeout(() => {
				window.location.href = command.path!;
			}, 1800);
		}
	}, [transcript, resetTranscript, speak]);

	// Auto-greet when opened
	useEffect(() => {
		if (isOpen && !hasGreeted && isSupported) {
			const greetMsg: ChatMessage = {
				id: `greeting-${Date.now()}`,
				role: "bot",
				text: "Hi! I'm Aibizmod's voice assistant. How can I help you today?",
			};
			setMessages([greetMsg]);
			setHasGreeted(true);
			speak(greetMsg.text);
		}
	}, [isOpen, hasGreeted, isSupported, speak]);

	const toggleListening = useCallback(() => {
		if (isListening) {
			stopListening();
		} else {
			startListening();
		}
	}, [isListening, startListening, stopListening]);

	const handleClose = useCallback(() => {
		setIsOpen(false);
		stopListening();
		stopSpeaking();
	}, [stopListening, stopSpeaking]);

	const toggleOpen = useCallback(() => {
		if (isOpen) {
			handleClose();
		} else {
			setIsOpen(true);
		}
	}, [isOpen, handleClose]);

	// Don't render until mounted on client
	if (!mounted) return null;
	if (!isSupported) return null;

	return (
		<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, x: 20, scale: 0.95 }}
						animate={{ opacity: 1, x: 0, scale: 1 }}
						exit={{ opacity: 0, x: 20, scale: 0.95 }}
						transition={{ duration: 0.25, ease: "easeOut" }}
						className="absolute bottom-20 right-0 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2"
					>
						<div className="pointer-events-none relative z-20 mr-3 h-[150px] w-[150px] sm:h-[200px] sm:w-[190px]">
							<VoiceCharacter state={characterState} />
						</div>
						<VoiceChatPanel
							messages={messages}
							interimTranscript={interimTranscript}
							voiceState={characterState}
							onClose={handleClose}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<VoiceButton
				isListening={isListening}
				onClick={isOpen ? toggleListening : toggleOpen}
			/>
		</div>
	);
}
