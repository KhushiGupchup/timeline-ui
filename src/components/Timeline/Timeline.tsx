import React, { useState, useEffect } from "react";
import { TimelineGrid } from "./TimelineGrid";
import { TimelineRow } from "./TimelineRow";
import { TaskDetailSidebar } from "./TaskDetailSidebar";
import { MobileTimelineView } from "./MobileTimelineView";
import { daysBetween } from "./utils";

export const Timeline = ({ rows, startDate, endDate }: any) => {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("month");

  const today = new Date();

  // 🧭 Compute visible date range
  let computedStart = new Date(startDate);
  let computedEnd = new Date(endDate);

  if (viewMode === "day") {
    computedStart = new Date(today);
    computedEnd = new Date(today);
  } else if (viewMode === "week") {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    computedStart = startOfWeek;
    computedEnd = endOfWeek;
  }

  const totalDays = daysBetween(computedStart, computedEnd) + 1;

  // 📏 Adjust zoom
  const [dayWidth, setDayWidth] = useState(35);
  useEffect(() => {
    if (viewMode === "day") setDayWidth(120);
    else if (viewMode === "week") setDayWidth(70);
    else setDayWidth(35);
  }, [viewMode]);

  // 🔴 Today Indicator
  const isTodayVisible =
    today >= computedStart && today <= computedEnd ? daysBetween(computedStart, today) : null;

  // 🎯 Filter visible tasks
  const visibleRows = rows.map((row: any) => ({
    ...row,
    tasks: row.tasks.filter(
      (task: any) => task.endDate >= computedStart && task.startDate <= computedEnd
    ),
  }));

  // 🧭 Auto-scroll to today's date
  useEffect(() => {
    const container = document.getElementById("timeline-scroll-container");
    if (container && isTodayVisible !== null) {
      const scrollPosition =
        200 + isTodayVisible * dayWidth - container.clientWidth / 2;
      container.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  }, [isTodayVisible, dayWidth, viewMode]);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div
        className={`w-screen h-screen flex flex-col overflow-hidden transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* 🧭 Header */}
        <header
          className={`flex justify-between items-center p-4 border-b flex-shrink-0 shadow-sm ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">📅 Project Timeline</h2>
            <span
              className={`text-xs px-2 py-0.5 rounded ${
                darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
              }`}
            >
              {viewMode.toUpperCase()} View
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher */}
            <div
              className={`flex border rounded-lg overflow-hidden ${
                darkMode ? "border-gray-700" : "border-gray-300"
              }`}
            >
              {["day", "week", "month"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as "day" | "week" | "month")}
                  className={`px-3 py-1 text-sm font-medium transition-all ${
                    viewMode === mode
                      ? darkMode
                        ? "bg-blue-600 text-white"
                        : "bg-blue-700 text-white"
                      : darkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            {/* 🌙 Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-blue-700 hover:bg-blue-600 text-white"
              }`}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </header>

        {/* 🖥️ Timeline */}
        <main
          id="timeline-scroll-container"
          className="flex-1 w-full overflow-x-auto overflow-y-hidden"
          role="region"
          aria-label="Project timeline"
          tabIndex={0}
        >
          <div
            className="relative h-full flex flex-col"
            style={{
              width: `${200 + totalDays * dayWidth}px`,
              minWidth: "100%",
              height: "calc(100vh - 70px)",
            }}
          >
            {/* 🗓️ Grid */}
            <TimelineGrid
              startDate={computedStart}
              totalDays={totalDays}
              dayWidth={dayWidth}
              darkMode={darkMode}
            />

            {/* 🔴 Today Indicator */}
            {isTodayVisible !== null && (
              <div
                className="absolute top-[42px] bottom-0 w-[2px] bg-red-500 z-20 shadow-[0_0_6px_#ef4444]"
                style={{
                  left: `${200 + isTodayVisible * dayWidth}px`,
                }}
              />
            )}

            {/* 📦 Rows */}
            <div className="flex-1">
              {visibleRows.map((row: any) => (
                <TimelineRow
                  key={row.id}
                  row={{
                    ...row,
                    tasks: row.tasks.map((t: any) => ({
                      ...t,
                      onClick: () => setSelectedTask(t),
                    })),
                  }}
                  startDate={computedStart}
                  dayWidth={dayWidth}
                  totalDays={totalDays}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
        </main>

        {/* 📱 Mobile */}
        <div className="block sm:hidden">
          <MobileTimelineView rows={visibleRows} onTaskSelect={setSelectedTask} />
        </div>

        {/* 🔍 Sidebar */}
        {selectedTask && (
          <TaskDetailSidebar
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
};
