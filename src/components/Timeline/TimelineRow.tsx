import React, { useState } from "react";
import { motion } from "framer-motion";
import { daysBetween } from "./utils";
import type { Row } from "./types";

interface TimelineRowProps {
  row: Row;
  startDate: Date;
  dayWidth: number;
  totalDays: number;
  darkMode?: boolean;
}

export const TimelineRow: React.FC<TimelineRowProps> = ({
  row,
  startDate,
  dayWidth,
  totalDays,
  darkMode = false,
}) => {
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  const handleDragEnd = (task: any, offsetX: number) => {
    const offsetDays = Math.round(offsetX / dayWidth);
    const newStart = new Date(task.startDate);
    const newEnd = new Date(task.endDate);
    newStart.setDate(newStart.getDate() + offsetDays);
    newEnd.setDate(newEnd.getDate() + offsetDays);
    console.log(
      `📦 "${task.title}" moved → ${newStart.toDateString()} - ${newEnd.toDateString()}`
    );
  };

  return (
    <div
      className={`flex border-b relative transition ${
        darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50"
      }`}
      style={{ minWidth: `${200 + totalDays * dayWidth}px`, minHeight: "3.5rem" }}
    >
      {/* Team Label */}
      <div
        className={`w-48 border-r flex items-center justify-center text-sm font-medium py-3 px-2 ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-gray-100"
            : "bg-gray-100 border-gray-200 text-gray-700"
        }`}
      >
        {row.label}
      </div>

      {/* Tasks */}
      <div className="flex-1 relative h-14">
        {row.tasks.map((task) => {
          const offset = daysBetween(startDate, task.startDate);
          const width = daysBetween(task.startDate, task.endDate) + 1;

          return (
            <motion.div
              key={task.id}
              drag="x"
              dragMomentum={false}
              dragConstraints={{ left: 0, right: 9999 }}
              onDragEnd={(_, info) => handleDragEnd(task, info.offset.x)}
              whileHover={{ scale: 1.03 }}
              className="absolute"
              style={{
                left: `${offset * dayWidth}px`,
                width: `${width * dayWidth}px`,
                top: "12px",
              }}
            >
              <div
                onMouseEnter={() => setHoveredTask(task.id)}
                onMouseLeave={() => setHoveredTask(null)}
                onClick={task.onClick}
                className={`h-7 rounded-lg text-xs font-medium flex items-center justify-between px-2 shadow-sm cursor-grab active:cursor-grabbing ${
                  darkMode ? "text-gray-100" : "text-white"
                }`}
                style={{
                  backgroundColor: task.color || "#3b82f6",
                }}
              >
                <div className="flex items-center gap-1 truncate">
                  <span>{task.title}</span>
                  <span className="opacity-80 text-[10px]">{task.progress}%</span>
                </div>

                {hoveredTask === task.id && (
                  <div
                    className={`absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-2 rounded-md text-xs shadow-lg whitespace-nowrap z-50 ${
                      darkMode
                        ? "bg-gray-700 text-gray-100 border border-gray-600"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <strong>{task.title}</strong> <br />
                    {task.startDate.toDateString()} → {task.endDate.toDateString()}
                    <br /> Progress: {task.progress}%
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
