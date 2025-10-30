import React, { useState } from "react";
import { Timeline } from "./Timeline";
import { useTimeline } from "./useTimeline";

export default {
  title: "Components/Timeline",
  component: Timeline,
};

const rows = [
  {
    id: "frontend",
    label: "Frontend Team",
    tasks: [
      {
        id: "t1",
        title: "UI Components",
        startDate: new Date(2025, 0, 2),
        endDate: new Date(2025, 0, 14),
        progress: 90,
        color: "#3b82f6",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend Team",
    tasks: [
      {
        id: "t2",
        title: "API Development",
        startDate: new Date(2025, 0, 8),
        endDate: new Date(2025, 0, 22),
        progress: 100,
        color: "#16a34a",
      },
    ],
  },
];

const Wrapper = ({ darkMode = false }: { darkMode?: boolean }) => {
  const { startDate, endDate, shiftMonth } = useTimeline(
    new Date(2025, 0, 1),
    new Date(2025, 0, 31)
  );
  const [localDark, setLocalDark] = useState(darkMode);

  return (
    <div
      className={`w-screen h-screen flex flex-col overflow-hidden transition-all duration-500 ${
        localDark ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`flex justify-between items-center p-4 border-b shadow-sm ${
          localDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => shiftMonth(-1)}
            className={`px-3 py-1 rounded-md font-semibold transition ${
              localDark
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-blue-700 hover:bg-blue-400 text-white"
            }`}
          >
            Prev
          </button>

          <h1 className="text-xl font-bold">
            {startDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h1>

          <button
            onClick={() => shiftMonth(1)}
            className={`px-3 py-1 rounded-md font-semibold transition ${
              localDark
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-blue-700 hover:bg-blue-400 text-white"
            }`}
          >
            Next 
          </button>
        </div>

        <button
          onClick={() => setLocalDark(!localDark)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            localDark
              ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
              : "bg-blue-700 hover:bg-blue-400 text-white"
          }`}
        >
          {localDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      <section className="flex-1 overflow-hidden">
        <Timeline rows={rows} startDate={startDate} endDate={endDate} />
      </section>
    </div>
  );
};

export const Default = () => <Wrapper darkMode={false} />;
export const DarkMode = () => <Wrapper darkMode={true} />;
