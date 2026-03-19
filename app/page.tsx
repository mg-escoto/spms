"use client";

import { useState } from "react";
import semData from "@/data/semester-2-2025";
import SICard from "@/app/components/SICard";
import { overallBadgeClass, fmt } from "@/app/lib/utils";

const SEMESTER_ID = "2025-2";

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

  const ratedSIs = semData.sis.filter((s) => s.part === "A" && s.avePerSI !== null);
  const outstanding = ratedSIs.filter((s) => s.avePerSI! >= 4.5).length;
  const needsAttention = ratedSIs.filter((s) => s.avePerSI! < 4.5).length;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-500 font-semibold mb-1">
              SPMS — Division Performance Accomplishment and Review
            </p>
            <h1 className="text-2xl font-bold text-gray-900">{semData.employee}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{semData.position}</p>
            <p className="text-sm text-gray-400 mt-1">Period: {semData.period}</p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-24 h-24 rounded-full flex flex-col items-center justify-center text-white ${overallBadgeClass(semData.overallNumerical)}`}
            >
              <span className="text-3xl font-black">{semData.overallNumerical.toFixed(2)}</span>
            </div>
            <span className="text-xs font-semibold text-gray-500 text-center">
              {semData.overallAdjectival}
            </span>
            <span className="text-xs text-gray-400">{semData.semesterLabel}</span>
          </div>
        </div>

        {/* Summary stats */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-xs text-blue-400 font-medium uppercase tracking-wide">Part A Subtotal</p>
            <p className="text-2xl font-black text-blue-700 mt-1">{semData.partASubtotal.toFixed(2)}</p>
            <p className="text-xs text-blue-400">{semData.partAWeight}% weight</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Part B Subtotal</p>
            <p className="text-2xl font-black text-gray-400 mt-1">—</p>
            <p className="text-xs text-gray-400">{semData.partBWeight}% weight</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-3 text-center">
            <p className="text-xs text-emerald-500 font-medium uppercase tracking-wide">Outstanding</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">{outstanding}</p>
            <p className="text-xs text-emerald-400">SIs ≥ 4.5</p>
          </div>
          <div className="bg-red-50 rounded-xl p-3 text-center">
            <p className="text-xs text-red-400 font-medium uppercase tracking-wide">Needs Attention</p>
            <p className="text-2xl font-black text-red-500 mt-1">{needsAttention}</p>
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
                filter === f ? "bg-blue-600 text-white" : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {f === "all" ? "All" : `Part ${f}`}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
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
          sis.map((si) => (
            <SICard key={si.id} si={si} semesterId={SEMESTER_ID} />
          ))
        )}
      </div>

      <p className="text-center text-xs text-gray-400 pb-4">
        DPAR • {semData.semesterLabel} • {semData.employee}
      </p>
    </main>
  );
}
