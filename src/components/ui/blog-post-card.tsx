"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ArticleCardProps {
  headline: string;
  excerpt: string;
  cover?: string;
  coverAlt?: string;
  coverNode?: React.ReactNode;
  tag?: string;
  readingTime?: number; // in seconds
  writer?: string;
  publishedAt?: Date | string;
  clampLines?: number;
  className?: string;
  children?: React.ReactNode;
}

// Human-friendly read time: seconds -> "X min read"
export function formatReadTime(seconds: number): string {
  if (!seconds || seconds < 60) return "Less than 1 min read";
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} min read`;
}

// Date | string -> "Aug 15, 2025" (localized but concise)
export function formatPostDate(date: Date | string): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  cover,
  coverAlt,
  coverNode,
  tag,
  readingTime,
  headline,
  excerpt,
  writer,
  publishedAt,
  clampLines,
  className,
  children,
}) => {
  const hasMeta = tag || readingTime;
  const hasFooter = writer || publishedAt;

  return (
    <Card className={cn("flex w-full max-w-sm flex-col gap-3 overflow-hidden rounded-3xl border p-3 shadow-lg bg-white border-cyan-100/80", className)}>
      {(coverNode || cover) && (
        <CardHeader className="p-0">
          <div className="relative h-56 w-full overflow-hidden rounded-2xl">
            {coverNode ? (
              coverNode
            ) : cover ? (
              <Image
                src={cover}
                alt={coverAlt || headline}
                fill
                unoptimized
                className="rounded-2xl object-cover"
              />
            ) : null}
          </div>
        </CardHeader>
      )}

      <CardContent className="flex-grow p-3">
        {hasMeta && (
          <div className="mb-4 flex items-center text-sm text-muted-foreground">
            {tag && (
              <Badge className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground hover:text-black hover:bg-slate-200">
                {tag}
              </Badge>
            )}
            {tag && readingTime && <span className="mx-2 text-slate-400">•</span>}
            {readingTime && <span>{formatReadTime(readingTime)}</span>}
          </div>
        )}

        <h2 className="mb-2 text-xl font-bold leading-tight text-card-foreground truncate" title={headline}>
          {headline}
        </h2>

        <p
          className={cn("text-muted-foreground text-sm leading-6", {
            "overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [display:-webkit-box]":
              clampLines && clampLines > 0,
          })}
          style={{
            WebkitLineClamp: clampLines,
          }}
        >
          {excerpt}
        </p>
      </CardContent>

      {children && (
        <CardFooter className="p-3 pt-0 mt-auto flex justify-start">
          <div className="w-full">{children}</div>
        </CardFooter>
      )}

      {hasFooter && (
        <CardFooter className="flex items-center justify-between p-3 border-t border-slate-100 pt-3">
          {writer && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">By</p>
              <p className="text-sm font-semibold text-slate-700">{writer}</p>
            </div>
          )}
          {publishedAt && (
            <div className={writer ? "text-right" : ""}>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Published</p>
              <p className="text-sm font-semibold text-slate-700">
                {formatPostDate(publishedAt)}
              </p>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
