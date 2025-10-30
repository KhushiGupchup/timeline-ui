import React from "react";

export const TaskDetailSidebar = ({ task, onClose }: any) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-end z-50">
      <div className="bg-white w-80 h-full p-5 shadow-2xl relative animate-slide-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
          {task.title}
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Start:</strong>{" "}
          {task.startDate.toLocaleDateString("en-US")}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>End:</strong>{" "}
          {task.endDate.toLocaleDateString("en-US")}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Progress:</strong> {task.progress}%
        </p>

        <div className="h-2 w-full bg-gray-200 rounded-full mb-4">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${task.progress}%`,
              backgroundColor: task.color || "#3b82f6",
            }}
          ></div>
        </div>

        <p className="text-sm text-gray-500">
          This task belongs to the assigned team and spans multiple days.
          Review details or mark progress in your workflow.
        </p>
      </div>
    </div>
  );
};
