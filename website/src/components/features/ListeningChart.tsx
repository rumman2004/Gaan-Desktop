import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Tabs } from "../ui/Tabs";
import { REPLAY_DATA } from "../../data/library";
import { Flame, Clock, Music } from "@/components/ui/animated-icons";

export interface ListeningChartProps {
  className?: string;
}

export function ListeningChart({ className }: ListeningChartProps) {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year" | "all">("week");
  const data = REPLAY_DATA[timeRange];

  const maxVal = Math.max(...data.barData.map((point) => point.value), 1);
  const chart = { width: 560, height: 196, left: 46, right: 12, top: 12, bottom: 158 };
  const chartWidth = chart.width - chart.left - chart.right;
  const chartHeight = chart.bottom - chart.top;
  const points = data.barData.map((point, index) => ({
    ...point,
    x: chart.left + (data.barData.length === 1 ? chartWidth / 2 : (index / (data.barData.length - 1)) * chartWidth),
    y: chart.bottom - (point.value / maxVal) * chartHeight,
  }));
  const linePath = points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;

    const previous = points[index - 1];
    const beforePrevious = points[index - 2] ?? previous;
    const next = points[index + 1] ?? point;
    const control1X = previous.x + (point.x - beforePrevious.x) / 6;
    const control1Y = previous.y + (point.y - beforePrevious.y) / 6;
    const control2X = point.x - (next.x - previous.x) / 6;
    const control2Y = point.y - (next.y - previous.y) / 6;

    return `${path} C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${point.x} ${point.y}`;
  }, "");
  const areaPath = `${linePath} L ${points.at(-1)?.x ?? chart.left} ${chart.bottom} L ${points[0]?.x ?? chart.left} ${chart.bottom} Z`;
  const gridValues = [0, Math.round(maxVal / 2), maxVal];

  return (
    <div
      className={cn(
        "p-5 sm:p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col gap-5",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Example listening history
          </span>
          <h4 className="text-base font-bold text-[var(--text-primary)]">
            Gaan Replay — {data.label}
          </h4>
        </div>

        <Tabs
          tabs={[
            { id: "week", label: "Week" },
            { id: "month", label: "Month" },
            { id: "year", label: "Year" },
            { id: "all", label: "All time" },
          ]}
          activeTab={timeRange}
          onChange={(t) => setTimeRange(t as any)}
          variant="pill"
          size="sm"
        />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 py-3 border-y border-[var(--border-subtle)] text-center sm:text-left">
        <div>
          <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
            <Clock className="size-3" /> Minutes
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-[var(--text-primary)] mt-0.5">
            {data.minutesListened.toLocaleString()}
          </div>
        </div>

        <div>
          <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
            <Flame className="size-3 text-[var(--highlight-text)]" /> Top Artist
          </div>
            <div className="text-sm sm:text-base font-bold text-[var(--text-primary)] truncate mt-0.5">
            {data.topArtist}
          </div>
        </div>

        <div>
          <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
            <Music className="size-3" /> Songs
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-[var(--text-primary)] mt-0.5">
            {data.songsPlayed.toLocaleString()}
          </div>
        </div>
      </div>

      <figure className="min-w-0" aria-label={`Listening time graph for ${data.label}`}>
        <svg
          className="block h-auto w-full overflow-visible"
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          role="img"
          aria-label={`Minutes listened per ${timeRange === "week" ? "day" : timeRange === "month" ? "week" : "period"}: ${points.map((point) => `${point.label}, ${point.value.toLocaleString()} minutes`).join("; ")}`}
        >
          {gridValues.map((value) => {
            const y = chart.bottom - (value / maxVal) * chartHeight;
            return (
              <g key={value}>
                <line x1={chart.left} x2={chart.width - chart.right} y1={y} y2={y} stroke="var(--border-subtle)" strokeDasharray={value === 0 ? undefined : "3 5"} />
                <text x={chart.left - 8} y={y + 3.5} textAnchor="end" className="fill-[var(--text-muted)]" fontSize="9">
                  {value >= 1000 ? `${(value / 1000).toLocaleString()}k` : value}
                </text>
              </g>
            );
          })}
          <path d={areaPath} fill="var(--text-primary)" opacity="0.07" />
          <path d={linePath} fill="none" stroke="var(--text-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          {points.map((point) => (
            <g key={point.label}>
              <title>{`${point.label}: ${point.value.toLocaleString()} minutes listened`}</title>
              <circle cx={point.x} cy={point.y} r="8" fill="var(--bg-secondary)" />
              <circle cx={point.x} cy={point.y} r="4" fill="var(--text-primary)" />
              <text x={point.x} y="181" textAnchor="middle" className="fill-[var(--text-muted)]" fontSize="10" fontFamily="monospace">
                {point.label}
              </text>
            </g>
          ))}
        </svg>
        <figcaption className="sr-only">
          {points.map((point) => `${point.label}: ${point.value.toLocaleString()} minutes`).join(". ")}
        </figcaption>
      </figure>
    </div>
  );
}
