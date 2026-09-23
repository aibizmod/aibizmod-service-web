"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface VoiceCharacterProps {
	state: "idle" | "listening" | "speaking";
}

export function VoiceCharacter({ state }: VoiceCharacterProps) {
	const mountRef = useRef<HTMLDivElement>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);
	const modelRef = useRef<THREE.Group | null>(null);
	const mixerRef = useRef<THREE.AnimationMixer | null>(null);
	const glowLightRef = useRef<THREE.PointLight | null>(null);
	const clockRef = useRef(new THREE.Clock());
	const animIdRef = useRef<number>(0);
	const stateRef = useRef(state);
	const actionsRef = useRef<THREE.AnimationAction[]>([]);
	const baseModelYRef = useRef(0);
	const baseScaleRef = useRef(1);
	const animatedPartsRef = useRef<THREE.Object3D[]>([]);
	const shadowMeshRef = useRef<THREE.Mesh | null>(null);

	stateRef.current = state;

	useEffect(() => {
		if (!mountRef.current) return;

		const mount = mountRef.current;
		const getSize = () => {
			const rect = mount.getBoundingClientRect();
			return {
				width: Math.max(1, Math.round(rect.width)),
				height: Math.max(1, Math.round(rect.height)),
			};
		};
		const { width: initialW, height: initialH } = getSize();

		// ── Renderer ────────────────────────────────────────────────
		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setSize(initialW, initialH);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setClearColor(0x000000, 0);
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.55;
		mount.appendChild(renderer.domElement);
		rendererRef.current = renderer;

		// ── Scene ───────────────────────────────────────────────────
		const scene = new THREE.Scene();
		sceneRef.current = scene;

		// ── Camera ──────────────────────────────────────────────────
		const camera = new THREE.PerspectiveCamera(30, initialW / initialH, 0.1, 100);
		camera.position.set(0, 0.2, 3.2);
		camera.lookAt(0, 0.1, 0);

		// ── Lights ──────────────────────────────────────────────────
		const ambient = new THREE.AmbientLight(0xffffff, 1.2);
		scene.add(ambient);

		const hemiLight = new THREE.HemisphereLight(0xf8fdff, 0xb8f0ff, 1.5);
		scene.add(hemiLight);

		const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
		keyLight.position.set(2.5, 5, 4);
		scene.add(keyLight);

		const fillLight = new THREE.DirectionalLight(0x9eeeff, 0.9);
		fillLight.position.set(-3, 2.5, 2);
		scene.add(fillLight);

		const rimLight = new THREE.DirectionalLight(0x35d5ff, 1.4);
		rimLight.position.set(-2, 3, -3);
		scene.add(rimLight);

		const glowLight = new THREE.PointLight(0x06b6d4, 2.4, 7);
		glowLight.position.set(0, 1.8, 2.5);
		scene.add(glowLight);
		glowLightRef.current = glowLight;

		const shadowMaterial = new THREE.MeshBasicMaterial({
			color: 0x0f172a,
			transparent: true,
			opacity: 0.22,
			depthWrite: false,
		});
		const shadowGeometry = new THREE.CircleGeometry(1.1, 32);
		const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
		shadowMesh.rotation.x = -Math.PI / 2;
		shadowMesh.position.set(0, -0.75, 0);
		shadowMesh.scale.set(1.2, 1.0, 1.0);
		scene.add(shadowMesh);
		shadowMeshRef.current = shadowMesh;

		const frameModel = (model: THREE.Object3D) => {
			model.position.set(0, 0, 0);
			model.rotation.set(0, 0, 0);
			model.scale.setScalar(1);

			const bounds = new THREE.Box3().setFromObject(model);
			const size = bounds.getSize(new THREE.Vector3());
			const maxDim = Math.max(size.x, size.y, size.z);

			if (maxDim === 0) return;

			const scale = 3 / maxDim;
			model.scale.setScalar(scale);

			const scaledBounds = new THREE.Box3().setFromObject(model);
			const scaledCenter = scaledBounds.getCenter(new THREE.Vector3());
			const scaledSize = scaledBounds.getSize(new THREE.Vector3());

			model.position.sub(scaledCenter);
			model.position.y += scaledSize.y * 0.02;
			baseModelYRef.current = model.position.y;
			baseScaleRef.current = scale;

			const fov = THREE.MathUtils.degToRad(camera.fov);
			const fitHeightDistance = scaledSize.y / (2 * Math.tan(fov / 2));
			const fitWidthDistance =
				scaledSize.x / (2 * Math.tan(fov / 2) * camera.aspect);
			const cameraZ = Math.max(fitHeightDistance, fitWidthDistance) * 1.16;

			camera.position.set(0, scaledSize.y * 0.06, cameraZ);
			camera.lookAt(0, scaledSize.y * 0.02, 0);
			camera.near = Math.max(0.01, cameraZ / 100);
			camera.far = cameraZ + Math.max(scaledSize.z * 4, 12);
			camera.updateProjectionMatrix();
		};

		// ── Load GLB Model ──────────────────────────────────────────
		const modelUrl = encodeURI("/ai_voice_bot (1).glb");
		const loader = new GLTFLoader();
		loader.load(
			modelUrl,
			(gltf) => {
				const model = gltf.scene;
				modelRef.current = model;

				frameModel(model);
				scene.add(model);

				// Setup animations if present. Prefer the model's built-in Idle loop.
				if (gltf.animations.length > 0) {
					const mixer = new THREE.AnimationMixer(model);
					mixerRef.current = mixer;

					const preferredClip =
						gltf.animations.find(
							(clip) => /idle/i.test(clip.name)
						) ??
						gltf.animations[0];

					if (preferredClip) {
						const action = mixer.clipAction(preferredClip);
						action.setLoop(THREE.LoopRepeat, Infinity);
						action.play();
						actionsRef.current = [action];
					}
				}

				model.traverse((child) => {
					if (child instanceof THREE.Mesh) {
						child.frustumCulled = false;
						child.castShadow = false;
						child.receiveShadow = false;

						const materials = Array.isArray(child.material)
							? child.material
							: [child.material];

						for (const material of materials) {
							if (material instanceof THREE.MeshStandardMaterial) {
								material.roughness = Math.min(material.roughness, 0.55);
								material.needsUpdate = true;
							}
						}
					}

					if (
						/arm|hand|antenna|ear|head|eye|visor|screen|mouth|jaw/i.test(
							child.name
						)
					) {
						animatedPartsRef.current.push(child);
					}
				});
			},
			undefined,
			(error) => {
				console.error("Failed to load GLB model:", error);
			}
		);

		// ── Animation Loop ──────────────────────────────────────────
		const animate = () => {
			animIdRef.current = requestAnimationFrame(animate);
			const t = clockRef.current.getElapsedTime();
			const dt = clockRef.current.getDelta();
			const s = stateRef.current;

			// Update mixer
			if (mixerRef.current) {
				mixerRef.current.update(dt);
			}

			// Model floating + breathing
			if (modelRef.current) {
				const stateLift =
					s === "listening"
						? Math.sin(t * 7.5) * 0.055
						: s === "speaking"
							? Math.sin(t * 10) * 0.045
							: Math.sin(t * 1.4) * 0.04;
				const turn =
					s === "listening"
						? Math.sin(t * 3.2) * 0.18
						: s === "speaking"
							? Math.sin(t * 5.4) * 0.14
							: Math.sin(t * 0.65) * 0.1;
				const pulse =
					s === "speaking"
						? 1 + Math.sin(t * 12) * 0.035
						: s === "listening"
							? 1 + Math.sin(t * 6) * 0.02
							: 1 + Math.sin(t * 1.8) * 0.012;

				modelRef.current.position.y =
					baseModelYRef.current + stateLift;
				modelRef.current.rotation.y = turn;
				modelRef.current.rotation.z =
					s === "speaking" ? Math.sin(t * 7.5) * 0.025 : 0;
				modelRef.current.scale.setScalar(baseScaleRef.current * pulse);

				if (shadowMeshRef.current) {
					const shadowMaterial = shadowMeshRef.current.material as THREE.MeshBasicMaterial;
					shadowMeshRef.current.position.x = modelRef.current.position.x;
					shadowMeshRef.current.position.z = modelRef.current.position.z;
					shadowMeshRef.current.position.y = -0.74 + (stateLift * 0.15);
					shadowMeshRef.current.scale.setScalar(1.15 + (pulse - 1) * 2.6);
					shadowMaterial.opacity = s === "idle" ? 0.18 : 0.25;
				}
			}

			if (animatedPartsRef.current.length > 0) {
				for (const [index, part] of animatedPartsRef.current.entries()) {
					const offset = index * 0.45;
					const speed = s === "speaking" ? 9 : s === "listening" ? 6 : 2.2;
					const range =
						s === "speaking" ? 0.18 : s === "listening" ? 0.12 : 0.045;

					part.rotation.x = Math.sin(t * speed + offset) * range;
					part.rotation.z = Math.cos(t * speed * 0.8 + offset) * range * 0.45;
				}
			}

			// Glow light color based on state
			if (glowLightRef.current) {
				const targetColor =
					s === "listening"
						? new THREE.Color(0xf43f5e)
						: s === "speaking"
							? new THREE.Color(0x06b6d4)
							: new THREE.Color(0x06b6d4);

				glowLightRef.current.color.lerp(targetColor, 0.08);
				glowLightRef.current.intensity =
					s === "idle"
						? 0.8 + Math.sin(t * 1.5) * 0.3
						: s === "listening"
							? 2 + Math.sin(t * 4) * 0.8
							: 1.8 + Math.sin(t * 6) * 0.5;
			}

			renderer.render(scene, camera);
		};

		animate();

		const resizeObserver = new ResizeObserver(() => {
			const { width, height } = getSize();
			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			if (modelRef.current) {
				frameModel(modelRef.current);
			}
		});
		resizeObserver.observe(mount);

		return () => {
			resizeObserver.disconnect();
			cancelAnimationFrame(animIdRef.current);
			if (mixerRef.current) {
				mixerRef.current.stopAllAction();
			}
			renderer.dispose();
			if (renderer.domElement.parentNode === mount) {
				mount.removeChild(renderer.domElement);
			}
		};
	}, []);

	// Update glow color when state changes
	useEffect(() => {
		if (!modelRef.current) return;

		const color =
			state === "listening"
				? new THREE.Color(0xf43f5e)
				: state === "speaking"
					? new THREE.Color(0x06b6d4)
					: new THREE.Color(0xffffff);

		modelRef.current.traverse((child) => {
			if (child instanceof THREE.Mesh && child.material) {
				const mat = child.material as THREE.MeshStandardMaterial;
				if (mat.emissive) {
					const targetIntensity = state === "idle" ? 0.3 : 0.8;
					mat.emissive.copy(color);
					mat.emissiveIntensity = targetIntensity;
				}
			}
		});
	}, [state]);

	return (
		<div className="w-full h-full flex items-center justify-center">
			<div ref={mountRef} className="h-full w-full" />
		</div>
	);
}
