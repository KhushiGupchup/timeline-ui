import React from "react";

export const MobileTimelineView = ({ rows, onTaskSelect }: any) => {
  return (
    <div className="p-3 space-y-4 bg-gray-50">
      {rows.map((row: any) => (
        <div key={row.id} className="bg-white border rounded-lg p-3 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">{row.label}</h3>

          {row.tasks.length === 0 ? (
            <p className="text-xs text-gray-500 italic">No tasks this month</p>
          ) : (
            <div className="space-y-2">
              {row.tasks.map((task: any) => (
                <div
                  key={task.id}
                  onClick={() => onTaskSelect(task)}
                  className="flex flex-col bg-gray-50 border rounded-lg p-2 text-xs shadow-sm hover:shadow-md cursor-pointer"
                >
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800 truncate">
                      {task.title}
                    </span>
                    <span className="text-gray-500">{task.progress}%</span>
                  </div>

                  <div className="text-gray-500 text-[10px] mt-1">
                    {task.startDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    -{" "}
                    {task.endDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>

                  <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${task.progress}%`,
                        backgroundColor: task.color || "#3b82f6",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
