import React from "react";
import { daysBetween } from "./utils";

interface Task {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  color?: string;
  onClick?: () => void;
}

interface TaskBarProps {
  task: Task;
  startDate: Date;
  dayWidth: number;
}

export const TaskBar: React.FC<TaskBarProps> = ({ task, startDate, dayWidth }) => {
  const offset = daysBetween(startDate, task.startDate);
  const width = daysBetween(task.startDate, task.endDate) + 1;

  return (
    <div
      onClick={task.onClick}
      className="absolute h-7 rounded-lg text-xs text-white font-medium flex items-center justify-between px-2 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200"
      style={{
        left: `${offset * dayWidth}px`,
        width: `${width * dayWidth}px`,
        backgroundColor: task.color || "#3b82f6",
        top: "12px",
      }}
      title={`${task.title} (${task.progress}%)`}
    >
      <div className="flex items-center gap-1 truncate">
        <span className="truncate">{task.title}</span>
        <span className="opacity-80 text-[10px]">{task.progress}%</span>
      </div>
      <div className="absolute left-0 bottom-0 h-1 bg-white/30 rounded-full">
        <div className="h-1 bg-white rounded-full" style={{ width: `${task.progress}%` }}></div>
      </div>
    </div>
  );
};
