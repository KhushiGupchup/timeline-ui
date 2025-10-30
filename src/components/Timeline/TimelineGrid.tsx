import React from "react";

interface Props {
  startDate: Date;
  totalDays: number;
  dayWidth: number;
  darkMode?: boolean;
}

export const TimelineGrid: React.FC<Props> = ({
  startDate,
  totalDays,
  dayWidth,
  darkMode,
}) => {
  return (
    <div
      className={`flex text-xs font-semibold border-b ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-gray-50 border-gray-200 text-gray-800"
      }`}
      style={{ minWidth: `${200 + totalDays * dayWidth}px` }}
    >
      {/* Sidebar header cell */}
      <div
        className={`w-48 flex items-center justify-center border-r ${
          darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-200"
        }`}
      >
        Team / Dates
      </div>

      {/* Dynamic date columns */}
      {Array.from({ length: totalDays }).map((_, i) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });

        return (
          <div
            key={i}
            className={`border-r flex flex-col items-center justify-center py-1 sm:py-2 transition-colors duration-150 ${
              darkMode
                ? "border-gray-700 hover:bg-gray-700"
                : "border-gray-200 hover:bg-gray-100"
            }`}
            style={{ width: `${dayWidth}px`, minWidth: `${dayWidth}px` }}
          >
            {/* Date number */}
            <span
              className={`text-sm font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {date.getDate()}
            </span>

            {/* Weekday label */}
            <span
              className={`text-[11px] mt-[1px] ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
              {day}
            </span>
          </div>
        );
      })}
    </div>
  );
};
