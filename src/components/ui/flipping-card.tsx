'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface FlippingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  flipOnHover?: boolean;
  flipOnClick?: boolean;
}

export function FlippingCard({
  front,
  back,
  className,
  flipOnHover = true,
  flipOnClick = true,
  ...props
}: FlippingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn(
        'group relative w-full h-full min-h-[320px] [perspective:1200px] select-none',
        className
      )}
      onMouseEnter={() => {
        if (flipOnHover) setIsFlipped(true);
      }}
      onMouseLeave={() => {
        if (flipOnHover) setIsFlipped(false);
      }}
      onClick={() => {
        if (flipOnClick) setIsFlipped((prev) => !prev);
      }}
      {...props}
    >
      <div
        className={cn(
          'relative w-full h-full duration-700 transition-transform [transform-style:preserve-3d] ease-[cubic-bezier(0.23,1,0.32,1)]',
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        )}
      >
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] z-10">
          {front}
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] z-20">
          {back}
        </div>
      </div>
    </div>
  );
}

export default FlippingCard;
