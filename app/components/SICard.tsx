"use client";

import { useState, useEffect } from "react";
import type { SI, RatingEntry } from "@/data/semester-2-2025";
import { ratingColor, ratingBadge, fmt } from "@/app/lib/utils";
import MonitoringTool from "./MonitoringTool";
import type { MonitoringEntry } from "./MonitoringTool";

interface Props {
  si: SI;
  semesterId: string;
  defaultMonitoringEntries?: Omit<MonitoringEntry, "id">[];
}

type EditableRating = {
  dim: string;
  commitment: string;
  q1Actual: string;
  q1Rating: number | null;
  q2Actual: string;
  q2Rating: number | null;
  semAvg: number | null;
};

type EditableSI = {
  name: string;
  successIndicator: string;
  avePerSI: number | null;
  ratings: EditableRating[];
};

function toEditable(si: SI): EditableSI {
  return {
    name: si.name,
    successIndicator: si.successIndicator,
    avePerSI: si.avePerSI,
    ratings: si.ratings.map((r) => ({ ...r })),
  };
}

export default function SICard({ si, semesterId, defaultMonitoringEntries }: Props) {
  const overrideKey = `spms_si_${semesterId}_${si.id}`;
  const monitoringKey = `spms_monitoring_${semesterId}_${si.id}`;

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState<EditableSI | null>(null);
  const [draft, setDraft] = useState<EditableSI>(toEditable(si));

  // Load override from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(overrideKey);
    if (stored) {
      const parsed = JSON.parse(stored) as EditableSI;
      setSaved(parsed);
      setDraft(parsed);
    }
  }, [overrideKey]);

  const display = saved ?? toEditable(si);

  const startEdit = () => {
    setDraft(saved ? { ...saved, ratings: saved.ratings.map((r) => ({ ...r })) } : toEditable(si));
    setEditing(true);
  };

  const saveEdit = () => {
    localStorage.setItem(overrideKey, JSON.stringify(draft));
    setSaved(draft);
    setEditing(false);
  };

  const cancelEdit = () => {
    setDraft(saved ?? toEditable(si));
    setEditing(false);
  };

  const resetToOriginal = () => {
    localStorage.removeItem(overrideKey);
    setSaved(null);
    setDraft(toEditable(si));
    setEditing(false);
  };

  const updateRating = (idx: number, field: keyof EditableRating, value: string | number | null) => {
    setDraft((prev) => {
      const ratings = [...prev.ratings];
      ratings[idx] = { ...ratings[idx], [field]: value };
      return { ...prev, ratings };
    });
  };

  const displayAve = display.avePerSI;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-4 px-5 py-4">
        <button
          onClick={() => setOpen((p) => !p)}
          className="flex-1 flex items-start gap-4 text-left hover:bg-gray-50 rounded-lg transition-colors -m-2 p-2"
        >
          <span className="shrink-0 w-9 h-9 rounded-full bg-blue-50 text-blue-700 text-sm font-bold flex items-center justify-center">
            {si.id}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                Part {si.part}
              </span>
              <span className="text-sm font-semibold text-gray-800 leading-snug">
                {display.name}
              </span>
            </div>
            {!open && (
              <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                {display.successIndicator}
              </p>
            )}
          </div>
          <span className={`shrink-0 text-sm font-bold px-3 py-1 rounded-full ${ratingBadge(displayAve)}`}>
            {displayAve === null ? "N/A" : fmt(displayAve)}
          </span>
          <span className="shrink-0 text-gray-400 text-xs mt-1">{open ? "▲" : "▼"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 px-5 pb-6 pt-4 space-y-5">
          {/* Edit controls */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400 italic">
              {saved ? "Edited — changes saved to browser" : "Showing original data from DPAR"}
            </p>
            <div className="flex gap-2">
              {saved && !editing && (
                <button
                  onClick={resetToOriginal}
                  className="text-xs text-gray-400 hover:text-gray-600 underline"
                >
                  Reset to original
                </button>
              )}
              {!editing ? (
                <button
                  onClick={startEdit}
                  className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-lg transition-colors"
                >
                  Edit DPAR Fields
                </button>
              ) : (
                <>
                  <button
                    onClick={cancelEdit}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium px-3 py-1 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1 rounded-lg transition-colors"
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Success Indicator */}
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1 font-medium">
              Success Indicator
            </p>
            {editing ? (
              <textarea
                value={draft.successIndicator}
                onChange={(e) => setDraft((p) => ({ ...p, successIndicator: e.target.value }))}
                rows={3}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
              />
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed">{display.successIndicator}</p>
            )}
          </div>

          {/* Ratings Table */}
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-2 font-medium">
              DPAR Ratings
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-2 py-1.5 text-left text-gray-500 font-medium w-8">Dim</th>
                    <th className="border border-gray-200 px-2 py-1.5 text-left text-gray-500 font-medium">Commitment</th>
                    <th className="border border-gray-200 px-2 py-1.5 text-left text-gray-500 font-medium">Q1 Actual</th>
                    <th className="border border-gray-200 px-2 py-1.5 text-center text-gray-500 font-medium w-16">Q1 Rate</th>
                    <th className="border border-gray-200 px-2 py-1.5 text-left text-gray-500 font-medium">Q2 Actual</th>
                    <th className="border border-gray-200 px-2 py-1.5 text-center text-gray-500 font-medium w-16">Q2 Rate</th>
                    <th className="border border-gray-200 px-2 py-1.5 text-center text-gray-500 font-medium w-16">Avg</th>
                  </tr>
                </thead>
                <tbody>
                  {(editing ? draft.ratings : display.ratings).map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-200 px-2 py-1.5 font-bold text-blue-600">{r.dim}</td>

                      {/* Commitment */}
                      <td className="border border-gray-200 px-2 py-1.5 text-gray-600">
                        {editing ? (
                          <textarea
                            value={r.commitment}
                            onChange={(e) => updateRating(i, "commitment", e.target.value)}
                            rows={2}
                            className="w-full min-w-[160px] text-xs border border-gray-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-200 resize-none"
                          />
                        ) : (
                          <span className="whitespace-pre-wrap">{r.commitment}</span>
                        )}
                      </td>

                      {/* Q1 Actual */}
                      <td className="border border-gray-200 px-2 py-1.5 text-gray-700">
                        {editing ? (
                          <textarea
                            value={r.q1Actual}
                            onChange={(e) => updateRating(i, "q1Actual", e.target.value)}
                            rows={2}
                            className="w-full min-w-[160px] text-xs border border-gray-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-200 resize-none"
                          />
                        ) : (
                          <span className="whitespace-pre-wrap">{r.q1Actual}</span>
                        )}
                      </td>

                      {/* Q1 Rating */}
                      <td className={`border border-gray-200 px-2 py-1.5 text-center ${editing ? "" : ratingColor(r.q1Rating as number | null)}`}>
                        {editing ? (
                          <input
                            type="number"
                            min="1" max="5" step="0.01"
                            value={r.q1Rating ?? ""}
                            onChange={(e) => updateRating(i, "q1Rating", e.target.value ? parseFloat(e.target.value) : null)}
                            className="w-full text-xs border border-gray-200 rounded px-1 text-center focus:outline-none focus:ring-1 focus:ring-blue-200"
                          />
                        ) : (
                          fmt(r.q1Rating as number | null)
                        )}
                      </td>

                      {/* Q2 Actual */}
                      <td className="border border-gray-200 px-2 py-1.5 text-gray-700">
                        {editing ? (
                          <textarea
                            value={r.q2Actual}
                            onChange={(e) => updateRating(i, "q2Actual", e.target.value)}
                            rows={2}
                            className="w-full min-w-[160px] text-xs border border-gray-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-200 resize-none"
                          />
                        ) : (
                          <span className="whitespace-pre-wrap">{r.q2Actual}</span>
                        )}
                      </td>

                      {/* Q2 Rating */}
                      <td className={`border border-gray-200 px-2 py-1.5 text-center ${editing ? "" : ratingColor(r.q2Rating as number | null)}`}>
                        {editing ? (
                          <input
                            type="number"
                            min="1" max="5" step="0.01"
                            value={r.q2Rating ?? ""}
                            onChange={(e) => updateRating(i, "q2Rating", e.target.value ? parseFloat(e.target.value) : null)}
                            className="w-full text-xs border border-gray-200 rounded px-1 text-center focus:outline-none focus:ring-1 focus:ring-blue-200"
                          />
                        ) : (
                          fmt(r.q2Rating as number | null)
                        )}
                      </td>

                      {/* Sem Avg */}
                      <td className={`border border-gray-200 px-2 py-1.5 text-center ${editing ? "" : ratingColor(r.semAvg as number | null)}`}>
                        {editing ? (
                          <input
                            type="number"
                            min="1" max="5" step="0.01"
                            value={r.semAvg ?? ""}
                            onChange={(e) => updateRating(i, "semAvg", e.target.value ? parseFloat(e.target.value) : null)}
                            className="w-full text-xs border border-gray-200 rounded px-1 text-center focus:outline-none focus:ring-1 focus:ring-blue-200"
                          />
                        ) : (
                          fmt(r.semAvg as number | null)
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Ave per SI */}
            <div className="mt-2 flex items-center justify-end gap-2">
              <span className="text-xs text-gray-500">Average per SI:</span>
              {editing ? (
                <input
                  type="number"
                  min="1" max="5" step="0.01"
                  value={draft.avePerSI ?? ""}
                  onChange={(e) => setDraft((p) => ({ ...p, avePerSI: e.target.value ? parseFloat(e.target.value) : null }))}
                  className="text-xs border border-gray-200 rounded px-2 py-0.5 w-20 text-center focus:outline-none focus:ring-1 focus:ring-blue-200"
                />
              ) : (
                <span className={`text-sm font-bold px-3 py-0.5 rounded-full ${ratingBadge(displayAve)}`}>
                  {displayAve === null ? "N/A" : fmt(displayAve)}
                </span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-teal-200" />

          {/* Monitoring Tool */}
          <MonitoringTool
            storageKey={monitoringKey}
            dims={si.ratings.map((r) => r.dim)}
            defaultEntries={defaultMonitoringEntries}
          />
        </div>
      )}
    </div>
  );
}
