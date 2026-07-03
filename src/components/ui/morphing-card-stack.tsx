"use client"

import { useState, type ReactNode } from "react"
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"
import { Grid3X3, Layers, LayoutList } from "lucide-react"

export type LayoutMode = "stack" | "grid" | "list"

export interface CardData {
  id: string
  title: string
  description: string
  icon?: ReactNode
  color?: string
}

export interface MorphingCardStackProps {
  cards?: CardData[]
  className?: string
  defaultLayout?: LayoutMode
  onCardClick?: (card: CardData) => void
}

const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
}

const SWIPE_THRESHOLD = 50
const CLICK_ANIMATION_DURATION = 1.2 // Slowed down click keyframe duration to 1.2s

export function MorphingCardStack({
  cards = [],
  className,
  defaultLayout = "stack",
  onCardClick,
}: MorphingCardStackProps) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [swipeSource, setSwipeSource] = useState<"drag" | "click">("click")
  
  // Track concurrent swiped cards by ID to allow multiple cards to animate simultaneously
  const [swipedCards, setSwipedCards] = useState<Record<string, { direction: "left" | "right", timestamp: number }>>({})

  if (!cards || cards.length === 0) {
    return null
  }

  const recordSwipe = (index: number, direction: "left" | "right", source: "drag" | "click") => {
    const card = cards[index]
    if (card) {
      setSwipeSource(source)
      setSwipedCards((prev) => ({
        ...prev,
        [card.id]: { direction, timestamp: Date.now() },
      }))
      
      const duration = source === "drag" ? 600 : CLICK_ANIMATION_DURATION * 1000
      
      // Auto-cleanup swipe state after animation completes
      setTimeout(() => {
        setSwipedCards((prev) => {
          const next = { ...prev }
          delete next[card.id]
          return next
        })
      }, duration)
    }
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      recordSwipe(activeIndex, "left", "drag")
      setExpandedCard(null)
      setActiveIndex((prev) => (prev + 1) % cards.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      recordSwipe(activeIndex, "right", "drag")
      setExpandedCard(null)
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }
    setIsDragging(false)
  }

  const getStackOrder = () => {
    const reordered = []
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length
      reordered.push({ ...cards[index], stackPosition: i, originalIndex: index })
    }
    return reordered.reverse() // Reverse so top card renders last (on top)
  }

  const getLayoutStyles = (stackPosition: number) => {
    switch (layout) {
      case "stack":
        return {
          top: stackPosition * 10,
          left: stackPosition * 10,
          zIndex: cards.length - stackPosition,
          rotate: (stackPosition - 1) * 2,
        }
      case "grid":
      case "list":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
        }
    }
  }

  const containerStyles = {
    stack: cn(
      "relative w-full max-w-[340px] md:max-w-[400px] transition-[height] duration-300",
      expandedCard !== null ? "h-[360px] sm:h-[310px]" : "h-[250px]"
    ),
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl",
    list: "flex flex-col gap-4 w-full max-w-4xl",
  }

  const displayCards = layout === "stack"
    ? getStackOrder()
    : cards.map((c, i) => ({ ...c, stackPosition: i, originalIndex: i }))

  return (
    <div className={cn("space-y-8 w-full flex flex-col items-center", className)}>
      {/* Layout Toggle (Cyan Glass style) */}
      <div className="flex items-center gap-1 rounded-full border border-cyan-100 bg-white/60 p-1 w-fit shadow-[0_8px_20px_rgba(8,145,178,0.06)] backdrop-blur-md">
        {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
          const Icon = layoutIcons[mode]
          const isSelected = layout === mode
          return (
            <button
              key={mode}
              onClick={() => {
                setLayout(mode)
                setExpandedCard(null)
              }}
              className={cn(
                "rounded-full p-2.5 transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-2 px-4 cursor-pointer",
                isSelected
                  ? "bg-[#0891B2] text-white shadow-[0_4px_12px_rgba(8,145,178,0.25)]"
                  : "text-slate-500 hover:text-[#0891B2] hover:bg-cyan-50/50"
              )}
              aria-label={`Switch to ${mode} layout`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-[11px] hidden md:inline">{mode}</span>
            </button>
          )
        })}
      </div>

      {/* Cards Container */}
      <LayoutGroup>
        <motion.div layout className={cn(containerStyles[layout], "mx-auto relative")}>
          <AnimatePresence mode="popLayout">
            {displayCards.map((card) => {
              const styles = getLayoutStyles(card.stackPosition)
              const isTopCard = layout === "stack" && card.stackPosition === 0
              const isExpanded = expandedCard === card.id && (layout !== "stack" || isTopCard)
              
              const swipeInfo = swipedCards[card.id]
              const isJustSwiped = layout === "stack" && !!swipeInfo

              // Out-and-under keyframes for just-swiped cards
              const xAnimation = isJustSwiped
                ? (swipeSource === "drag"
                    ? 0 // Native physics handles return to 0
                    : (swipeInfo.direction === "left" ? [0, -320, 0] : [0, 320, 0]))
                : 0

              const zIndexAnimation = isJustSwiped
                ? [cards.length + 2, cards.length + 2, cards.length - card.stackPosition]
                : styles.zIndex

              // Custom transition for swiped card to manage side-flyout and z-index ordering
              const transitionConfig = isJustSwiped
                ? (swipeSource === "drag"
                    ? {
                        x: {
                          type: "spring" as const,
                          stiffness: 110, // Softened stiffness for a slow, cushiony return
                          damping: 18,
                        },
                        zIndex: {
                          type: "keyframes" as const,
                          values: [cards.length + 2, cards.length + 2, cards.length - card.stackPosition],
                          times: [0, 0.35, 1],
                          duration: 0.9,
                        },
                        scale: {
                          type: "spring" as const,
                          stiffness: 110,
                          damping: 18,
                        },
                        default: {
                          type: "spring" as const,
                          stiffness: 110,
                          damping: 18,
                        }
                      }
                    : {
                        x: {
                          type: "keyframes" as const,
                          values: swipeInfo.direction === "left" ? [0, -320, 0] : [0, 320, 0],
                          times: [0, 0.3, 1], // 30% of time to smoothly pull out, 70% to slide back under (slow & smooth)
                          duration: CLICK_ANIMATION_DURATION,
                          ease: ["easeInOut", "easeInOut"],
                        },
                        zIndex: {
                          type: "keyframes" as const,
                          values: [cards.length + 2, cards.length + 2, cards.length - card.stackPosition],
                          times: [0, 0.32, 1],
                          duration: CLICK_ANIMATION_DURATION,
                        },
                        scale: {
                          type: "tween" as const,
                          duration: CLICK_ANIMATION_DURATION,
                          ease: "easeInOut",
                        },
                        default: {
                          type: "tween" as const,
                          duration: CLICK_ANIMATION_DURATION,
                          ease: "easeInOut",
                        }
                      })
                : {
                    type: "spring" as const,
                    stiffness: 240,
                    damping: 24,
                  }

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: isExpanded ? 1.02 : 1,
                    x: xAnimation,
                    zIndex: zIndexAnimation,
                    top: styles.top,
                    left: styles.left,
                    rotate: styles.rotate,
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: -200 }}
                  transition={transitionConfig}
                  drag={isTopCard ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                  onClick={() => {
                    if (isDragging) return
                    if (layout === "stack" && !isTopCard) {
                      // Click cards behind to cycle forward
                      recordSwipe(activeIndex, "left", "click")
                      setExpandedCard(null)
                      setActiveIndex((prev) => (prev + 1) % cards.length)
                      return
                    }
                    setExpandedCard(isExpanded ? null : card.id)
                    onCardClick?.(card)
                  }}
                  className={cn(
                    "cursor-pointer rounded-3xl border p-6",
                    "bg-white shadow-[0_12px_40px_rgba(59,130,246,0.08)]",
                    isExpanded
                      ? "border-[#0891B2] ring-2 ring-[#0891B2]/30 shadow-[0_20px_50px_rgba(8,145,178,0.15)]"
                      : "border-cyan-100 hover:border-[#0891B2]/50 hover:shadow-[0_16px_45px_rgba(8,145,178,0.1)]",
                    layout === "stack" && (isExpanded ? "absolute w-full h-auto min-h-[220px] pb-10 z-30" : "absolute w-full h-[220px]"),
                    layout === "stack" && isTopCard && "cursor-grab active:cursor-grabbing",
                    layout === "grid" && "w-full min-h-[190px]",
                    layout === "list" && "w-full min-h-[100px]",
                  )}
                  style={{
                    backgroundColor: card.color || undefined,
                  }}
                >
                  <div className={cn("flex items-start gap-4 relative", !isExpanded && "h-full")}>
                    {card.icon && (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 border border-cyan-100/80 text-[#0E7490] shadow-sm">
                        {card.icon}
                      </div>
                    )}
                    <div className={cn("min-w-0 flex-1 flex flex-col justify-center", !isExpanded && "h-full")}>
                      <h3 className="font-display font-bold text-lg text-slate-900 leading-snug">
                        {card.title}
                      </h3>
                      <p
                        className={cn(
                          "text-sm text-slate-500 mt-2 leading-relaxed transition-all",
                          layout === "stack" && !isExpanded && "line-clamp-4",
                          layout === "grid" && !isExpanded && "line-clamp-3",
                          layout === "list" && !isExpanded && "line-clamp-2",
                        )}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {isTopCard && !isExpanded && (
                    <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0891B2]/60 animate-pulse">
                        Swipe or Click to explore
                      </span>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Stack Indicator dots */}
      {layout === "stack" && cards.length > 1 && (
        <div className="flex justify-center gap-1.5 pt-4">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setExpandedCard(null) // Collapse active card on dot jump
                // Record swipe cascade for all skipped cards to allow beautiful waterfalls
                if (index > activeIndex) {
                  for (let k = activeIndex; k < index; k++) {
                    recordSwipe(k, "left", "click")
                  }
                } else if (index < activeIndex) {
                  for (let k = activeIndex; k > index; k--) {
                    recordSwipe(k, "right", "click")
                  }
                }
                setActiveIndex(index)
              }}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                index === activeIndex
                  ? "w-5 bg-[#0891B2]"
                  : "w-2 bg-cyan-200 hover:bg-[#0891B2]/60",
              )}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
