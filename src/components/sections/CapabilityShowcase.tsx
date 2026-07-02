"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ServiceItem {
  id: string;
  label: string;
  title: string;
  headline: string;
  desc: string;
  tags: string[];
  color: string;
  icon: string;
}

const services: ServiceItem[] = [
  {
    id: "visibility",
    label: "AI Visibility",
    title: "AI Visibility Audit",
    headline: "See Where AI Already Sees You",
    desc: "We analyse how your business appears across AI-powered search tools — ChatGPT, Perplexity, Google AI Overview — and identify the gaps that cost you visibility, trust, and leads.",
    tags: ["AI search presence", "Schema audit", "Content gap ID", "Visibility roadmap"],
    color: "#22d3ee",
    icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'
  },
  {
    id: "ml",
    label: "AI & ML",
    title: "AI & Machine Learning",
    headline: "Models Built for Your Business",
    desc: "We design, train, and deploy custom machine learning models and intelligent agents that connect to your data, automate decisions, and drive measurable outcomes.",
    tags: ["Custom ML models", "Agent workflows", "Predictive analytics", "Model monitoring"],
    color: "#60a5fa",
    icon: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>'
  },
  {
    id: "deep",
    label: "Deep Learning",
    title: "Deep Learning",
    headline: "Vision, Speech & Complex Signals",
    desc: "We build deep learning systems for computer vision, speech recognition, anomaly detection, and other pattern-heavy problems that classic ML alone cannot solve.",
    tags: ["Computer vision", "Neural architecture", "Anomaly detection", "Transfer learning"],
    color: "#a78bfa",
    icon: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
  },
  {
    id: "llm",
    label: "LLM",
    title: "LLM Integration",
    headline: "Language Power, Connected to Your Stack",
    desc: "We integrate large language models like GPT-4, Claude, and Gemini into your products and operations — with RAG pipelines, fine-tuning, and domain-specific knowledge bases.",
    tags: ["RAG pipelines", "Fine-tuning", "Internal tools", "On-premise deploy"],
    color: "#34d399",
    icon: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>'
  },
  {
    id: "gen",
    label: "Gen AI",
    title: "Generative AI",
    headline: "Create, Not Just Automate",
    desc: "We build generative AI pipelines for content, code, media, and product workflows — helping you move faster, personalise at scale, and automate creative output.",
    tags: ["Content generation", "Media synthesis", "Code tooling", "Multimodal builds"],
    color: "#fb923c",
    icon: '<path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z"/><path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7z"/>'
  }
];

export default function CapabilityShowcase() {
  const [active, setActive] = useState(0);
  const [textFading, setTextFading] = useState(false);
  const [visualFading, setVisualFading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressRef = useRef(0);
  const activeRef = useRef(0);
  const pausedRef = useRef(false);
  const isDraggingRef = useRef(false);

  const DURATION = 6000;
  const TICK = 50;

  // Active state synchronization for the autoplay timer
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Autoplay ticker loop
  useEffect(() => {
    const tick = () => {
      if (pausedRef.current || isDraggingRef.current) return;
      progressRef.current += (100 * TICK) / DURATION;
      
      const currentFill = fillRefs.current[activeRef.current];
      if (currentFill) {
        currentFill.style.transform = `scaleX(${Math.min(progressRef.current, 100) / 100})`;
      }

      if (progressRef.current >= 100) {
        progressRef.current = 0;
        // Reset all fill bars
        fillRefs.current.forEach(f => {
          if (f) f.style.transform = "scaleX(0)";
        });
        setActive(prev => (prev + 1) % services.length);
      }
    };

    const intervalId = setInterval(tick, TICK);
    return () => clearInterval(intervalId);
  }, []);

  const selectService = (i: number) => {
    if (i === active) return;
    
    // Clear the active progress
    progressRef.current = 0;
    fillRefs.current.forEach(f => {
      if (f) f.style.transform = "scaleX(0)";
    });

    // Cross-fade text and Three.js visual elements
    setTextFading(true);
    setVisualFading(true);

    setTimeout(() => {
      setActive(i);
      setTextFading(false);
    }, 180);

    setTimeout(() => {
      setVisualFading(false);
    }, 250);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        selectService((activeRef.current + 1) % services.length);
      } else if (e.key === "ArrowLeft") {
        selectService((activeRef.current - 1 + services.length) % services.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // --- Three.js Scene Configuration ---
  const currentGroupRef = useRef<THREE.Group | null>(null);
  const orbitGroupRef = useRef<THREE.Group>(new THREE.Group());
  const dragVelXRef = useRef(0);
  const dragVelYRef = useRef(0);

  // Per-service 3D builders ported from the prototype
  const buildVisibility = (color: string) => {
    const group = new THREE.Group();
    const c = new THREE.Color(color);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.1, 24, 18),
      new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.3 })
    );
    group.add(sphere);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.008, 8, 64),
      new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.85 })
    );
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    const pingCount = 9;
    const positions: number[] = [];
    for (let i = 0; i < pingCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 1.1;
      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    const dotsGeo = new THREE.BufferGeometry();
    dotsGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const dotsMat = new THREE.PointsMaterial({ color: c, size: 0.07, transparent: true, opacity: 1 });
    const dots = new THREE.Points(dotsGeo, dotsMat);
    group.add(dots);

    group.userData.animate = (t: number) => {
      ring.rotation.z = t * 0.6;
      sphere.rotation.y = t * 0.15;
      dotsMat.opacity = 0.5 + Math.sin(t * 2) * 0.4;
    };
    return group;
  };

  const buildML = (color: string) => {
    const group = new THREE.Group();
    const c = new THREE.Color(color);

    const icoGeo = new THREE.IcosahedronGeometry(1.15, 0);
    const edges = new THREE.EdgesGeometry(icoGeo);
    const wireframe = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.55 })
    );
    group.add(wireframe);

    const posAttr = icoGeo.attributes.position;
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", posAttr.clone());
    const nodes = new THREE.Points(nodeGeo, new THREE.PointsMaterial({ color: c, size: 0.09 }));
    group.add(nodes);

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 16, 16),
      new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.6, roughness: 0.4 })
    );
    group.add(core);

    group.userData.animate = (t: number) => {
      group.rotation.y = t * 0.25;
      group.rotation.x = Math.sin(t * 0.3) * 0.15;
      const s = 1 + Math.sin(t * 2.4) * 0.15;
      core.scale.set(s, s, s);
    };
    return group;
  };

  const buildDeepLearning = (color: string) => {
    const group = new THREE.Group();
    const c = new THREE.Color(color);
    const layerSizes = [3, 5, 5, 2];
    const layerSpacing = 0.9;
    const layers: THREE.Mesh[][] = [];

    layerSizes.forEach((count, li) => {
      const layerNodes: THREE.Mesh[] = [];
      const z = (li - (layerSizes.length - 1) / 2) * layerSpacing;
      for (let i = 0; i < count; i++) {
        const y = (i - (count - 1) / 2) * 0.42;
        const node = new THREE.Mesh(
          new THREE.SphereGeometry(0.055, 12, 12),
          new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.4 })
        );
        node.position.set(0, y, z);
        group.add(node);
        layerNodes.push(node);
      }
      layers.push(layerNodes);
    });

    const lineMat = new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.22 });
    for (let li = 0; li < layers.length - 1; li++) {
      layers[li].forEach(a => {
        layers[li + 1].forEach(b => {
          const geo = new THREE.BufferGeometry().setFromPoints([a.position, b.position]);
          const line = new THREE.Line(geo, lineMat);
          group.add(line);
        });
      });
    }

    group.rotation.y = -0.4;
    group.userData.animate = (t: number) => {
      group.rotation.y = -0.4 + Math.sin(t * 0.2) * 0.25;
      layers.forEach((layerNodes, li) => {
        const wave = Math.sin(t * 1.6 - li * 0.8) * 0.5 + 0.5;
        layerNodes.forEach(n => {
          const s = 0.7 + wave * 0.8;
          n.scale.set(s, s, s);
          const mat = n.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 0.2 + wave * 0.8;
        });
      });
    };
    return group;
  };

  const buildLLM = (color: string) => {
    const group = new THREE.Group();
    const c = new THREE.Color(color);

    const ringCount = 6;
    for (let i = 0; i < ringCount; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.95, 0.015, 8, 48),
        new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.25 + (i / ringCount) * 0.5 })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = (i - ringCount / 2) * 0.22;
      group.add(ring);
    }

    const cubeCount = 14;
    const cubes: THREE.Mesh[] = [];
    for (let i = 0; i < cubeCount; i++) {
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.09, 0.09, 0.09),
        new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.5 })
      );
      const angle = (i / cubeCount) * Math.PI * 2;
      const radius = 1.5 + Math.random() * 0.3;
      cube.userData = {
        angle,
        radius,
        y: (Math.random() - 0.5) * 1.4,
        speed: 0.15 + Math.random() * 0.15
      };
      group.add(cube);
      cubes.push(cube);
    }

    group.userData.animate = (t: number) => {
      group.rotation.y = t * 0.15;
      cubes.forEach(cube => {
        const a = cube.userData.angle + t * cube.userData.speed;
        cube.position.set(Math.cos(a) * cube.userData.radius, cube.userData.y, Math.sin(a) * cube.userData.radius);
        cube.rotation.x = t;
        cube.rotation.y = t;
      });
    };
    return group;
  };

  const buildGenAI = (color: string) => {
    const group = new THREE.Group();
    const c = new THREE.Color(color);

    const count = 700;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = i * 0.35;
      const r = 0.05 * theta;
      const spread = (Math.random() - 0.5) * 0.35;
      positions[i * 3] = Math.cos(theta) * r + spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.8;
      positions[i * 3 + 2] = Math.sin(theta) * r + spread;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: c,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const points = new THREE.Points(geo, mat);
    group.add(points);

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.9 })
    );
    group.add(core);

    group.userData.animate = (t: number) => {
      group.rotation.y = t * 0.35;
      group.rotation.z = Math.sin(t * 0.15) * 0.2;
      const s = 1 + Math.sin(t * 3) * 0.2;
      core.scale.set(s, s, s);
    };
    return group;
  };

  const builders: Record<string, (color: string) => THREE.Group> = {
    visibility: buildVisibility,
    ml: buildML,
    deep: buildDeepLearning,
    llm: buildLLM,
    gen: buildGenAI
  };

  // Helper to dispose of geometries and materials inside a group
  const disposeGroup = (group: THREE.Group | null) => {
    if (!group) return;
    group.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) {
        mesh.geometry.dispose();
      }
      if (mesh.material) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          if (m && typeof m.dispose === "function") {
            m.dispose();
          }
        });
      }
    });
  };

  // Three.js Lifecycle Management Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const w = canvas.parentElement?.clientWidth || 300;
    const h = canvas.parentElement?.clientHeight || 300;
    renderer.setSize(w, h, false);

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 4.6;

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(3, 3, 4);
    scene.add(pointLight);

    // 3. Orbit Group Addition
    const orbitGroup = orbitGroupRef.current;
    orbitGroup.rotation.set(0, 0, 0);
    scene.add(orbitGroup);

    // 4. Initial Scene Group
    const currentService = services[active];
    const initialGroup = builders[currentService.id](currentService.color);
    currentGroupRef.current = initialGroup;
    orbitGroup.add(initialGroup);

    // 5. Drag mechanics variables
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      isDraggingRef.current = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      dragVelXRef.current = 0;
      dragVelYRef.current = 0;
      canvas.setPointerCapture(e.pointerId);
      pausedRef.current = true;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevPointerX;
      const dy = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      dragVelYRef.current = dx * 0.006;
      dragVelXRef.current = dy * 0.006;

      orbitGroup.rotation.y += dragVelYRef.current;
      orbitGroup.rotation.x = THREE.MathUtils.clamp(
        orbitGroup.rotation.x + dragVelXRef.current,
        -1.1,
        1.1
      );
    };

    const handlePointerUp = () => {
      isDragging = false;
      isDraggingRef.current = false;
      if (!container.matches(":hover")) {
        pausedRef.current = false;
      }
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);

    // 6. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      if (width === 0 || height === 0) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // 7. Render Loop
    const IDLE_SPIN = 0.0016;
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      const t = clock.getElapsedTime();

      if (!isDragging) {
        orbitGroup.rotation.y += dragVelYRef.current + IDLE_SPIN;
        orbitGroup.rotation.x = THREE.MathUtils.clamp(
          orbitGroup.rotation.x + dragVelXRef.current,
          -1.1,
          1.1
        );
        dragVelXRef.current *= 0.94;
        dragVelYRef.current *= 0.94;
      }

      if (currentGroupRef.current && currentGroupRef.current.userData.animate) {
        currentGroupRef.current.userData.animate(t);
      }
      renderer.render(scene, camera);
    };
    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
      disposeGroup(currentGroupRef.current);
      if (currentGroupRef.current) {
        orbitGroup.remove(currentGroupRef.current);
      }
      scene.remove(orbitGroup);
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Slide hover and tilt effects
  const handleMouseEnter = () => {
    pausedRef.current = true;
    const stage = containerRef.current;
    if (stage) {
      stage.classList.add("tilting");
    }
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
    const stage = containerRef.current;
    if (stage) {
      stage.classList.remove("tilting");
      stage.style.transform = "rotateX(0deg) rotateY(0deg)";
      stage.style.setProperty("--mx", "50%");
      stage.style.setProperty("--my", "50%");
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const stage = containerRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const percentX = Math.min(100, Math.max(0, (px / rect.width) * 100));
    const percentY = Math.min(100, Math.max(0, (py / rect.height) * 100));
    stage.style.setProperty("--mx", percentX + "%");
    stage.style.setProperty("--my", percentY + "%");

    if (isDraggingRef.current) return;
    const rotateY = (px / rect.width - 0.5) * 10;
    const rotateX = -(py / rect.height - 0.5) * 10;
    stage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const currentService = services[active];

  return (
    <div id="ai-showcases" className="w-full relative pt-8 md:pt-4 pb-16 md:pb-24 overflow-hidden mt-0 md:-mt-8 lg:-mt-12 xl:-mt-16">
      <style dangerouslySetInnerHTML={{ __html: `
        .stage-card {
          --mx: 50%;
          --my: 50%;
          transform: rotateX(0deg) rotateY(0deg);
          will-change: transform;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.04) inset,
            0 0 0 1px rgba(34,211,238,0.06) inset,
            0 30px 60px -20px rgba(3,10,25,0.55),
            0 12px 30px -8px rgba(8,145,178,0.12);
          transition: transform 0.6s cubic-bezier(0.16, 1.36, 0.36, 1), box-shadow 0.5s ease;
        }
        .stage-card.tilting {
          transition: transform 0.1s ease-out, box-shadow 0.4s ease;
        }
        .stage-card:hover {
          box-shadow:
            0 1px 0 rgba(255,255,255,0.05) inset,
            0 0 0 1px rgba(34,211,238,0.14) inset,
            0 40px 80px -20px rgba(3,10,25,0.6),
            0 16px 40px -8px rgba(8,145,178,0.22);
        }
        
        /* Spotlight border overlay inside card */
        .stage-card::after {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          padding: 1.5px;
          background: radial-gradient(240px circle at var(--mx) var(--my), rgba(34,211,238,0.95), transparent 65%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          z-index: 6;
        }
        .stage-card:hover::after {
          opacity: 1;
        }

        .text-pane-anim {
          transition: opacity 0.5s cubic-bezier(0.16, 1.36, 0.36, 1), transform 0.5s cubic-bezier(0.16, 1.36, 0.36, 1);
        }
        .visual-pane-anim {
          transition: opacity 0.5s cubic-bezier(0.16, 1.36, 0.36, 1);
        }

        /* Shared interactive capsule CSS */
        .capsule-btn {
          box-shadow: 0 0 0 1px #e2e8f0 inset;
          transition: color 0.3s, box-shadow 0.4s cubic-bezier(0.16, 1.36, 0.36, 1);
        }
        .capsule-btn.active {
          color: #ffffff;
          box-shadow: 0 0 0 1.5px transparent inset !important;
        }
      ` }} />

      {/* Main Outer Grid Setup */}
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* 2. Eyebrow, Heading, Description */}
        <div className="text-center mb-10">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0891B2]">
            Our Capabilities
          </span>
          <h1 className="font-display font-thin text-slate-900 text-3xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight mt-2.5 mb-3">
            Tailored AI &amp; Automation Services
          </h1>
          <p className="text-stone-600 text-base sm:text-[17px] leading-relaxed max-w-[560px] mx-auto">
            From visibility audits to custom LLM integrations and machine learning pipelines, we build systems designed for real business outcomes.
          </p>
        </div>

        {/* 3. Capsules Tab Bar */}
        <div className="flex gap-2 justify-center flex-wrap mb-7">
          {services.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.id}
                onClick={() => selectService(i)}
                className={`capsule-btn relative flex items-center gap-2 px-5 py-[11px] rounded-full border border-slate-200 bg-white text-slate-600 text-[13.5px] font-semibold cursor-pointer overflow-hidden ${
                  isActive ? "active" : ""
                }`}
                style={{
                  backgroundColor: isActive ? s.color : undefined,
                  boxShadow: isActive ? `0 0 0 1.5px ${s.color}55 inset` : undefined
                }}
              >
                {/* Autoplay loading indicator */}
                <span 
                  ref={el => { fillRefs.current[i] = el; }}
                  className="absolute inset-0 z-0 origin-left scale-x-0 transition-transform duration-[50ms]"
                  style={{
                    backgroundColor: s.color,
                    filter: "brightness(0.9)"
                  }}
                />
                
                {/* SVG Icon */}
                <svg 
                  className="w-4 h-4 relative z-10 shrink-0" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke={isActive ? "#0F172A" : "currentColor"} 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  dangerouslySetInnerHTML={{ __html: s.icon }}
                />
                
                <span className="relative z-10 font-sans">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* 4. The 3D Interactive Stage Card - Static Height Setup */}
        <div 
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className="stage-card bg-[#0F172A] rounded-[28px] p-6 sm:p-8 md:p-12 relative overflow-hidden min-h-[460px] md:h-[450px]"
        >
          {/* Glowing dotted overlay - localized hologram effect */}
          <div 
            className="absolute inset-0 pointer-events-none z-0 opacity-100"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(34,211,238,0.09) 1.2px, transparent 1.2px)",
              backgroundSize: "20px 20px",
              maskImage: "radial-gradient(ellipse at 75% 40%, black 30%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse at 75% 40%, black 30%, transparent 70%)"
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-10 items-center h-full relative z-10">
            
            {/* Left Column: Text Content Pane */}
            <div className={`text-pane-anim ${textFading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
              {/* Badge Title */}
              <div 
                className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.12em] border mb-4 font-sans"
                style={{
                  color: currentService.color,
                  backgroundColor: `${currentService.color}18`,
                  borderColor: `${currentService.color}40`
                }}
              >
                {currentService.title}
              </div>

              {/* Headline - Standard Display Font styling matches ServicesGrid */}
              <h2 className="font-display font-light text-slate-100 text-2xl md:text-3xl leading-snug tracking-tight mb-3">
                {currentService.headline}
              </h2>

              {/* Description - Standard Font styling */}
              <p className="text-slate-400 text-[14.5px] sm:text-[15px] leading-relaxed max-w-[46ch] mb-5 font-sans">
                {currentService.desc}
              </p>

              {/* Pill Tags Row */}
              <div className="flex flex-wrap gap-2 mb-[22px] font-sans">
                {currentService.tags.map((tag, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke={currentService.color} strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Link */}
              <div>
                <a 
                  className="cta inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer group transition-colors duration-300 font-sans"
                  style={{ color: currentService.color }}
                >
                  <span>Learn more</span>
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column: Visual Pane containing the WebGL Canvas */}
            <div className={`visual-pane-anim h-[180px] sm:h-[220px] md:h-[300px] relative ${visualFading ? "opacity-0" : "opacity-100"}`}>
              <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing touch-none select-none" />
            </div>

          </div>
        </div>

        {/* 5. Progress Indicator Dots Bar */}
        <div className="flex justify-center gap-1.5 mt-[22px]">
          {services.map((s, i) => {
            const isActive = i === active;
            return (
              <div
                key={s.id}
                onClick={() => selectService(i)}
                className={`dot h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                  isActive ? "w-[22px]" : "w-1.5 bg-slate-300"
                }`}
                style={{
                  backgroundColor: isActive ? s.color : undefined
                }}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
}
