"use client";

import { useState } from "react";
import semData from "@/data/semester-2-2025";
import type { SI } from "@/data/semester-2-2025";

function ratingColor(val: number | null): string {
  if (val === null) return "text-gray-400";
  if (val >= 4.5) return "text-emerald-600 font-semibold";
  if (val >= 3.5) return "text-amber-600 font-semibold";
  return "text-red-600 font-semibold";
}

function ratingBadge(val: number | null): string {
  if (val === null) return "bg-gray-100 text-gray-500";
  if (val >= 4.5) return "bg-emerald-100 text-emerald-700";
  if (val >= 3.5) return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-700";
}

function overallBadgeClass(val: number): string {
  if (val >= 4.5) return "bg-emerald-500";
  if (val >= 3.5) return "bg-amber-500";
  return "bg-red-500";
}

function fmt(val: number | null): string {
  if (val === null) return "—";
  return val.toFixed(2);
}

function SICard({ si }: { si: SI }) {
  const [open, setOpen] = useState(false);
  const isNA = si.avePerSI === null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full text-left px-5 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors"
      >
        {/* SI number */}
        <span className="shrink-0 w-9 h-9 rounded-full bg-blue-50 text-blue-700 text-sm font-bold flex items-center justify-center">
          {si.id}
        </span>

        {/* Name + part */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
              Part {si.part}
            </span>
            <span className="text-sm font-semibold text-gray-800 leading-snug">
              {si.name}
            </span>
          </div>
          {!open && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-1">
              {si.successIndicator}
            </p>
          )}
        </div>

        {/* Rating badge */}
        <span
          className={`shrink-0 text-sm font-bold px-3 py-1 rounded-full ${ratingBadge(si.avePerSI)}`}
        >
          {isNA ? "N/A" : fmt(si.avePerSI)}
        </span>

        {/* Chevron */}
        <span className="shrink-0 text-gray-400 text-xs mt-1">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-5 pb-5 pt-3 space-y-4">
          {/* Success Indicator */}
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1 font-medium">
              Success Indicator
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {si.successIndicator}
            </p>
          </div>

          {/* Ratings table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-2 py-1.5 text-left text-gray-500 font-medium w-8">
                    Dim
                  </th>
                  <th className="border border-gray-200 px-2 py-1.5 text-left text-gray-500 font-medium">
                    Commitment
                  </th>
                  <th className="border border-gray-200 px-2 py-1.5 text-left text-gray-500 font-medium">
                    Q1 Actual
                  </th>
                  <th className="border border-gray-200 px-2 py-1.5 text-center text-gray-500 font-medium w-14">
                    Q1 Rate
                  </th>
                  <th className="border border-gray-200 px-2 py-1.5 text-left text-gray-500 font-medium">
                    Q2 Actual
                  </th>
                  <th className="border border-gray-200 px-2 py-1.5 text-center text-gray-500 font-medium w-14">
                    Q2 Rate
                  </th>
                  <th className="border border-gray-200 px-2 py-1.5 text-center text-gray-500 font-medium w-14">
                    Avg
                  </th>
                </tr>
              </thead>
              <tbody>
                {si.ratings.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-200 px-2 py-1.5 font-bold text-blue-600">
                      {r.dim}
                    </td>
                    <td className="border border-gray-200 px-2 py-1.5 text-gray-600 whitespace-pre-wrap">
                      {r.commitment}
                    </td>
                    <td className="border border-gray-200 px-2 py-1.5 text-gray-700 whitespace-pre-wrap">
                      {r.q1Actual}
                    </td>
                    <td className={`border border-gray-200 px-2 py-1.5 text-center ${ratingColor(r.q1Rating)}`}>
                      {fmt(r.q1Rating)}
                    </td>
                    <td className="border border-gray-200 px-2 py-1.5 text-gray-700 whitespace-pre-wrap">
                      {r.q2Actual}
                    </td>
                    <td className={`border border-gray-200 px-2 py-1.5 text-center ${ratingColor(r.q2Rating)}`}>
                      {fmt(r.q2Rating)}
                    </td>
                    <td className={`border border-gray-200 px-2 py-1.5 text-center ${ratingColor(r.semAvg)}`}>
                      {fmt(r.semAvg)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [filter, setFilter] = useState<"all" | "A" | "B">("all");
  const [search, setSearch] = useState("");

  const sis = semData.sis.filter((si) => {
    const matchPart = filter === "all" || si.part === filter;
    const matchSearch =
      search === "" ||
      si.name.toLowerCase().includes(search.toLowerCase()) ||
      `SI ${si.id}`.toLowerCase().includes(search.toLowerCase());
    return matchPart && matchSearch;
  });

  const ratedSIs = semData.sis.filter(
    (s) => s.part === "A" && s.avePerSI !== null
  );
  const outstanding = ratedSIs.filter((s) => s.avePerSI! >= 4.5).length;
  const satisfactory = ratedSIs.filter(
    (s) => s.avePerSI! >= 3.5 && s.avePerSI! < 4.5
  ).length;
  const needsImprovement = ratedSIs.filter((s) => s.avePerSI! < 3.5).length;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-500 font-semibold mb-1">
              SPMS — Division Performance Accomplishment and Review
            </p>
            <h1 className="text-2xl font-bold text-gray-900">
              {semData.employee}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {semData.position}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Period: {semData.period}
            </p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-24 h-24 rounded-full flex flex-col items-center justify-center text-white ${overallBadgeClass(semData.overallNumerical)}`}
            >
              <span className="text-3xl font-black">
                {semData.overallNumerical.toFixed(2)}
              </span>
            </div>
            <span className="text-xs font-semibold text-gray-500 text-center">
              {semData.overallAdjectival}
            </span>
            <span className="text-xs text-gray-400">{semData.semesterLabel}</span>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-xs text-blue-400 font-medium uppercase tracking-wide">
              Part A Subtotal
            </p>
            <p className="text-2xl font-black text-blue-700 mt-1">
              {semData.partASubtotal.toFixed(2)}
            </p>
            <p className="text-xs text-blue-400">{semData.partAWeight}% weight</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              Part B Subtotal
            </p>
            <p className="text-2xl font-black text-gray-400 mt-1">—</p>
            <p className="text-xs text-gray-400">{semData.partBWeight}% weight</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-3 text-center">
            <p className="text-xs text-emerald-500 font-medium uppercase tracking-wide">
              Outstanding
            </p>
            <p className="text-2xl font-black text-emerald-600 mt-1">
              {outstanding}
            </p>
            <p className="text-xs text-emerald-400">SIs ≥ 4.5</p>
          </div>
          <div className="bg-red-50 rounded-xl p-3 text-center">
            <p className="text-xs text-red-400 font-medium uppercase tracking-wide">
              Needs Attention
            </p>
            <p className="text-2xl font-black text-red-500 mt-1">
              {needsImprovement + satisfactory}
            </p>
            <p className="text-xs text-red-300">SIs below 4.5</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by SI name or number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm">
          {(["all", "A", "B"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 font-medium transition-colors ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {f === "all" ? "All" : `Part ${f}`}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" /> ≥ 4.5 Outstanding
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> 3.5–4.49 Satisfactory
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-400 inline-block" /> &lt; 3.5 Needs Improvement
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-gray-300 inline-block" /> N/A
        </span>
      </div>

      {/* SI Cards */}
      <div className="space-y-3">
        {sis.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No results found.</p>
        ) : (
          sis.map((si) => <SICard key={si.id} si={si} />)
        )}
      </div>

      <p className="text-center text-xs text-gray-400 pb-4">
        DPAR • {semData.semesterLabel} • {semData.employee}
      </p>
    </main>
  );
}
