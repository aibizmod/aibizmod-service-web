"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ExternalLink, Phone } from "lucide-react";
import { countries } from "@/lib/countries";

interface Coordinates {
	lat: number;
	lng: number;
}

interface Location {
	id: number;
	name: string;
	description: string;
	coordinates: Coordinates;
	flag: React.ReactNode;
	mapQuery?: string;
	mapUrl?: string;
	mapEmbedUrl?: string;
}

const coordinates: Record<string, Coordinates> = {
	USA: { lat: 38.61512, lng: -121.38384 },
	CAN: { lat: 43.65107, lng: -79.347015 },
	IND: { lat: 8.9086404, lng: 76.6935471 },
	UAE: { lat: 25.27701, lng: 55.3134 },
	KSA: { lat: 24.7136, lng: 46.6753 },
	KWT: { lat: 29.3759, lng: 47.9774 },
	SG: { lat: 1.33376, lng: 103.70004 },
	MYS: { lat: 3.139, lng: 101.6869 },
};

const locations: Location[] = countries.map((c, index) => ({
	id: index + 1,
	name: c.name,
	description: c.address,
	coordinates: coordinates[c.code] ?? { lat: 0, lng: 0 },
	flag: c.flag,
	mapQuery: c.address,
	mapUrl:
		c.code === "IND"
			? "https://www.google.com/maps?cid=3662096785497355834&hl=en&gl=IN"
			: undefined,
	mapEmbedUrl:
		c.code === "IND"
			? "https://www.google.com/maps?cid=3662096785497355834&hl=en&gl=IN&output=embed"
			: undefined,
}));

const getGoogleMapsUrl = (location: Location) =>
	location.mapUrl ??
	`https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`;

const getGoogleMapsEmbedUrl = (location: Location) => {
	if (location.mapEmbedUrl) return location.mapEmbedUrl;
	const query = encodeURIComponent(
		location.mapQuery ?? `${location.description.replace(/\n/g, " ")}`
	);
	return `https://www.google.com/maps?q=${query}&t=k&z=14&output=embed`;
};

const getContact = (name: string) =>
	countries.find((c) => c.name === name);

export default function GlobalLocations() {
	const [activeLocationIndex, setActiveLocationIndex] = useState(0);
	const activeLocation = locations[activeLocationIndex];
	const activeContact = activeLocation ? getContact(activeLocation.name) : undefined;

	return (
		<section
			id="locations"
			className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-white"
		>
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(8,145,178,0.07),transparent_70%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.07),transparent_70%)]" />
			<div className="pointer-events-none absolute left-1/2 top-8 h-72 w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(8,145,178,0.08),rgba(139,92,246,0.06)_36%,rgba(34,211,238,0.06)_58%,transparent_72%)] blur-3xl" />
			<div className="pointer-events-none absolute left-[18%] top-28 h-48 w-80 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(8,145,178,0.08),rgba(14,165,233,0.05)_48%,transparent_72%)] blur-3xl" />
			<div className="pointer-events-none absolute right-[16%] top-32 h-52 w-96 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(244,114,182,0.06),rgba(124,58,237,0.06)_42%,transparent_72%)] blur-3xl" />

			<div className="container px-4 sm:px-6 mx-auto relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7 }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-royal to-electric-blue">
						Global Presence
					</h2>
					<p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground font-light">
						Leverage our expertise in various locations to deliver tailored technology
						solutions for your unique needs.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="relative mx-auto mb-10 grid overflow-hidden rounded-xl border border-border bg-white shadow-card lg:grid-cols-[270px_minmax(0,1fr)]"
				>
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,145,178,0.08),transparent_55%)]" />
					<div className="relative z-20 border-b border-border bg-tint/60 p-4 backdrop-blur-md lg:border-b-0 lg:border-r">
						<div className="flex max-w-full gap-2 overflow-x-auto py-2 lg:h-[500px] lg:flex-col lg:justify-center lg:overflow-visible">
							{locations.map((location, index) => {
								const isActive = activeLocationIndex === index;

								return (
									<button
										key={location.id}
										type="button"
										aria-pressed={isActive}
										onClick={() => setActiveLocationIndex(index)}
										className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 lg:w-full lg:px-5 lg:py-3 ${
											isActive
												? "border-transparent bg-royal-gradient text-white shadow-md"
												: "border-border bg-white text-muted-foreground shadow-sm hover:-translate-y-0.5 hover:border-royal/50 hover:text-foreground"
										}`}
									>
										<span className="flex items-center justify-center gap-2 lg:justify-start">
											{location.flag}
											{location.name}
										</span>
									</button>
								);
							})}
						</div>
					</div>

					<div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
						{activeLocation && (
							<iframe
								key={activeLocation.id}
								src={getGoogleMapsEmbedUrl(activeLocation)}
								title={`Google Map showing aibizmod ${activeLocation.name} office`}
								className="relative z-10 h-[300px] w-full border-0 sm:h-[400px] md:h-[500px]"
								loading="lazy"
								allowFullScreen
								referrerPolicy="no-referrer-when-downgrade"
							/>
						)}

						{activeLocation && (
							<div className="absolute bottom-4 left-4 right-4 z-20 block rounded-xl border border-border bg-white/95 p-4 text-ink shadow-card backdrop-blur-md sm:left-auto sm:right-4 sm:w-80">
								<div className="mb-2 flex items-center gap-2 text-sm font-semibold">
									<span className="flex h-8 w-8 items-center justify-center rounded-full bg-royal/10 text-royal-deep ring-1 ring-royal/25">
										<MapPin className="h-4 w-4" />
									</span>
									<span className="flex-1">{activeLocation.name}</span>
									<a
										href={getGoogleMapsUrl(activeLocation)}
										target="_blank"
										rel="noopener noreferrer"
										className="rounded-md p-1 text-muted-foreground transition-colors hover:text-royal focus:outline-none focus:ring-2 focus:ring-royal/60"
										aria-label={`Open ${activeLocation.name} office in Google Maps`}
									>
										<ExternalLink className="h-4 w-4" />
									</a>
								</div>
								<p className="whitespace-pre-line text-xs leading-5 text-muted-foreground">
									{activeLocation.description}
								</p>
								{activeContact && activeContact.phone && (
									<a
										href={`tel:${activeContact.phone.replace(/\s/g, "")}`}
										className="mt-3 inline-flex items-center gap-2 rounded-lg border border-royal/30 bg-royal/10 px-3 py-2 text-xs font-medium text-royal-deep transition-colors hover:border-royal/50 hover:bg-royal/20 focus:outline-none focus:ring-2 focus:ring-royal/60"
									>
										<Phone className="h-3.5 w-3.5 text-royal" />
										{activeContact.phone}
									</a>
								)}
								{activeContact && (
									<a
										href={`mailto:${activeContact.email}`}
										className="mt-2 flex w-fit items-center gap-1 text-xs font-medium text-royal-deep transition-colors duration-300 hover:text-royal focus:outline-none focus:ring-2 focus:ring-royal/60"
									>
										{activeContact.email}
									</a>
								)}
								<a
									href={getGoogleMapsUrl(activeLocation)}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-3 flex w-fit items-center gap-1 text-xs font-medium text-royal-deep transition-colors duration-300 hover:text-royal focus:outline-none focus:ring-2 focus:ring-royal/60"
									aria-label={`Open ${activeLocation.name} office in Google Maps`}
								>
									View location in Google Maps
									<ExternalLink className="h-3 w-3" />
								</a>
							</div>
						)}
					</div>
				</motion.div>
			</div>
		</section>
	);
}