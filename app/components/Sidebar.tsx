"use client";

import { ratingBadge, fmt } from "@/app/lib/utils";

export interface SemesterOption {
  id: string;
  label: string;
  period: string;
  overallNumerical: number | null;
  overallAdjectival: string | null;
}

interface Props {
  semesters: SemesterOption[];
  activeSemesterId: string;
  onSelect: (id: string) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({
  semesters,
  activeSemesterId,
  onSelect,
  mobileOpen,
  onMobileClose,
}: Props) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-30 flex flex-col
          transition-transform duration-200
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <p className="text-xs uppercase tracking-widest text-blue-500 font-semibold">SPMS</p>
          <h2 className="text-base font-bold text-gray-900 leading-tight mt-0.5">
            Performance<br />Dashboard
          </h2>
          <p className="text-xs text-gray-400 mt-1">Mary Grace L. Escoto</p>
        </div>

        {/* Semester list */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-medium px-2 mb-2">
            Semesters
          </p>
          {semesters.map((sem) => {
            const isActive = sem.id === activeSemesterId;
            return (
              <button
                key={sem.id}
                onClick={() => {
                  onSelect(sem.id);
                  onMobileClose();
                }}
                className={`w-full text-left rounded-xl px-3 py-3 transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <p className={`text-sm font-semibold leading-tight ${isActive ? "text-white" : "text-gray-800"}`}>
                  {sem.label}
                </p>
                <p className={`text-xs mt-0.5 ${isActive ? "text-blue-200" : "text-gray-400"}`}>
                  {sem.period}
                </p>
                <div className="mt-2">
                  {sem.overallNumerical !== null ? (
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : ratingBadge(sem.overallNumerical)
                      }`}
                    >
                      {fmt(sem.overallNumerical)} — {sem.overallAdjectival}
                    </span>
                  ) : (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive ? "bg-white/20 text-blue-100" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      In progress
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">DPAR Monitoring Tool</p>
          <p className="text-xs text-gray-300">DOTr — HRDD</p>
        </div>
      </aside>
    </>
  );
}
