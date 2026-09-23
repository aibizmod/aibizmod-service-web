"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, X } from "lucide-react";
import { VoiceWaveform } from "./VoiceWaveform";

export interface ChatMessage {
	id: string;
	role: "user" | "bot";
	text: string;
}

interface VoiceChatPanelProps {
	messages: ChatMessage[];
	interimTranscript: string;
	voiceState: "idle" | "listening" | "speaking";
	onClose: () => void;
}

export function VoiceChatPanel({
	messages,
	interimTranscript,
	voiceState,
	onClose,
}: VoiceChatPanelProps) {
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages, interimTranscript]);

	return (
		<motion.div
			className="relative z-10 flex w-80 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
			style={{ maxHeight: "min(420px, 48vh)" }}
		>
			{/* Header */}
			<div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white">
				<div className="flex items-center gap-2">
					<Bot size={18} />
					<span className="text-sm font-semibold">Aibizmod Assistant</span>
				</div>
				<div className="flex items-center gap-2">
					<VoiceWaveform state={voiceState} />
					<button
						onClick={onClose}
						className="p-1 rounded-full hover:bg-white/20 transition-colors"
						aria-label="Close voice assistant"
					>
						<X size={16} />
					</button>
				</div>
			</div>

			{/* Messages */}
			<div
				ref={scrollRef}
				className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[120px]"
			>
				{messages.length === 0 && !interimTranscript && (
					<div className="text-center text-slate-400 text-sm py-8">
						<Bot size={32} className="mx-auto mb-2 opacity-40" />
						<p>Click the mic and say something!</p>
						<p className="text-xs mt-1 opacity-60">
							Try: &quot;services&quot;, &quot;contact&quot;, or &quot;help&quot;
						</p>
					</div>
				)}

				<AnimatePresence>
					{messages.map((msg) => (
						<motion.div
							key={msg.id}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.2 }}
							className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
						>
							{msg.role === "bot" && (
								<div className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-100 flex items-center justify-center">
									<Bot size={14} className="text-cyan-600" />
								</div>
							)}
							<div
								className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
									msg.role === "user"
										? "bg-cyan-500 text-white rounded-br-md"
										: "bg-slate-100 text-slate-700 rounded-bl-md"
								}`}
							>
								{msg.text}
							</div>
							{msg.role === "user" && (
								<div className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
									<User size={14} className="text-slate-500" />
								</div>
							)}
						</motion.div>
					))}
				</AnimatePresence>

				{/* Interim transcript */}
				{interimTranscript && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="flex gap-2 justify-end"
					>
						<div className="max-w-[75%] px-3 py-2 rounded-2xl rounded-br-md text-sm bg-cyan-500/70 text-white/90 italic">
							{interimTranscript}
						</div>
					</motion.div>
				)}
			</div>

			{/* Footer hint */}
			<div className="px-4 py-2 border-t border-slate-100 text-center">
				<p className="text-[11px] text-slate-400">
					Say &quot;help&quot; to see all commands
				</p>
			</div>
		</motion.div>
	);
}
