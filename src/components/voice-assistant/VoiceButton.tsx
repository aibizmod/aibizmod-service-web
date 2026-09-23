"use client";

import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";

interface VoiceButtonProps {
	isListening: boolean;
	onClick: () => void;
}

export function VoiceButton({ isListening, onClick }: VoiceButtonProps) {
	return (
		<motion.button
			onClick={onClick}
			className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-colors ${
				isListening
					? "bg-red-500 hover:bg-red-600"
					: "bg-cyan-500 hover:bg-cyan-600"
			}`}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			aria-label={isListening ? "Stop listening" : "Start voice assistant"}
		>
			{/* Pulse rings */}
			{isListening && (
				<>
					<motion.span
						className="absolute inset-0 rounded-full bg-red-400"
						animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
						transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
					/>
					<motion.span
						className="absolute inset-0 rounded-full bg-red-400"
						animate={{ scale: [1, 2.2], opacity: [0.3, 0] }}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: "easeOut",
							delay: 0.4,
						}}
					/>
				</>
			)}

			{/* Icon */}
			<span className="relative z-10 text-white">
				{isListening ? <MicOff size={24} /> : <Mic size={24} />}
			</span>
		</motion.button>
	);
}
