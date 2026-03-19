"use client";

import { useState } from "react";
import sem2025_2 from "@/data/semester-2-2025";
import sem2026_1 from "@/data/semester-1-2026";
import SICard from "@/app/components/SICard";
import Sidebar, { type SemesterOption } from "@/app/components/Sidebar";
import { overallBadgeClass, fmt } from "@/app/lib/utils";

const SEMESTERS_DATA: Record<string, typeof sem2025_2> = {
  "2025-2": sem2025_2,
  "2026-1": sem2026_1,
};

const SEMESTERS: SemesterOption[] = [
  {
    id: "2026-1",
    label: "1st Semester 2026",
    period: "Jan – Jun 2026",
    overallNumerical: sem2026_1.overallNumerical,
    overallAdjectival: sem2026_1.overallAdjectival,
  },
  {
    id: "2025-2",
    label: "2nd Semester 2025",
    period: "Aug – Dec 2025",
    overallNumerical: sem2025_2.overallNumerical,
    overallAdjectival: sem2025_2.overallAdjectival,
  },
];

export default function Dashboard() {
  const [activeSemId, setActiveSemId] = useState("2026-1");
  const [filter, setFilter] = useState<"all" | "A" | "B">("all");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const semData = SEMESTERS_DATA[activeSemId];

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
  const inProgress = semData.sis.filter((s) => s.part === "A" && s.avePerSI === null).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        semesters={SEMESTERS}
        activeSemesterId={activeSemId}
        onSelect={(id) => {
          setActiveSemId(id);
          setFilter("all");
          setSearch("");
        }}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-10">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <p className="text-sm font-semibold text-gray-800">{semData.semesterLabel}</p>
            <p className="text-xs text-gray-400">{semData.period}</p>
          </div>
        </div>

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
                {semData.overallNumerical !== null ? (
                  <>
                    <div
                      className={`w-24 h-24 rounded-full flex flex-col items-center justify-center text-white ${overallBadgeClass(semData.overallNumerical)}`}
                    >
                      <span className="text-3xl font-black">{semData.overallNumerical.toFixed(2)}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-500 text-center">
                      {semData.overallAdjectival}
                    </span>
                  </>
                ) : (
                  <div className="w-24 h-24 rounded-full flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300">
                    <span className="text-xs font-semibold text-gray-400 text-center leading-tight px-2">
                      In Progress
                    </span>
                  </div>
                )}
                <span className="text-xs text-gray-400">{semData.semesterLabel}</span>
              </div>
            </div>

            {/* Summary stats */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-xs text-blue-400 font-medium uppercase tracking-wide">Part A Subtotal</p>
                <p className="text-2xl font-black text-blue-700 mt-1">
                  {semData.partASubtotal !== null ? semData.partASubtotal.toFixed(2) : "—"}
                </p>
                <p className="text-xs text-blue-400">{semData.partAWeight}% weight</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Part B Subtotal</p>
                <p className="text-2xl font-black text-gray-400 mt-1">
                  {semData.partBSubtotal !== null ? semData.partBSubtotal.toFixed(2) : "—"}
                </p>
                <p className="text-xs text-gray-400">{semData.partBWeight}% weight</p>
              </div>
              {semData.overallNumerical !== null ? (
                <>
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
                </>
              ) : (
                <>
                  <div className="bg-emerald-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-emerald-500 font-medium uppercase tracking-wide">Rated</p>
                    <p className="text-2xl font-black text-emerald-600 mt-1">{ratedSIs.length}</p>
                    <p className="text-xs text-emerald-400">SIs with scores</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-amber-500 font-medium uppercase tracking-wide">In Progress</p>
                    <p className="text-2xl font-black text-amber-600 mt-1">{inProgress}</p>
                    <p className="text-xs text-amber-400">SIs pending</p>
                  </div>
                </>
              )}
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
                <SICard key={`${activeSemId}-${si.id}`} si={si} semesterId={activeSemId} />
              ))
            )}
          </div>

          <p className="text-center text-xs text-gray-400 pb-4">
            DPAR • {semData.semesterLabel} • {semData.employee}
          </p>
        </main>
      </div>
    </div>
  );
}
