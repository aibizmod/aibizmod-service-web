"use client";

import { motion, type Variants } from "framer-motion";

interface VoiceWaveformProps {
	state: "idle" | "listening" | "speaking";
}

const BAR_COUNT = 5;

const idleVariants: Variants = {
	idle: (i: number) => ({
		height: 4,
		transition: {
			duration: 0.4,
			delay: i * 0.05,
			repeat: Infinity,
			repeatType: "reverse" as const,
		},
	}),
};

const listeningVariants: Variants = {
	listening: (i: number) => ({
		height: [4, 16 + i * 2, 4],
		transition: {
			duration: 0.5 + i * 0.08,
			repeat: Infinity,
			ease: "easeInOut" as const,
		},
	}),
};

const speakingVariants: Variants = {
	speaking: (i: number) => ({
		height: [4, 20 - i * 2, 4],
		transition: {
			duration: 0.3 + i * 0.05,
			repeat: Infinity,
			ease: "easeInOut" as const,
		},
	}),
};

export function VoiceWaveform({ state }: VoiceWaveformProps) {
	const getVariant = (): Variants => {
		switch (state) {
			case "listening":
				return listeningVariants;
			case "speaking":
				return speakingVariants;
			default:
				return idleVariants;
		}
	};

	const getColor = () => {
		switch (state) {
			case "listening":
				return "bg-red-400";
			case "speaking":
				return "bg-cyan-400";
			default:
				return "bg-slate-400";
		}
	};

	return (
		<div className="flex items-center gap-[3px] h-5">
			{Array.from({ length: BAR_COUNT }).map((_, i) => (
				<motion.div
					key={i}
					className={`w-[3px] rounded-full ${getColor()}`}
					custom={i}
					variants={getVariant()}
					animate={state}
					style={{ height: 4 }}
				/>
			))}
		</div>
	);
}
