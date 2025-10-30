import { useState } from "react";
import { Timeline } from "./components/Timeline/Timeline";

export default function App() {
  // State for month navigation
  const [currentMonth, setCurrentMonth] = useState(0); // 0 = January
  const year = 2025;

  const startDate = new Date(year, currentMonth, 1);
  const endDate = new Date(year, currentMonth + 1, 0); // End of month

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const goPrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const goNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };

  // Full project data
  const rows = [
    {
      id: "frontend",
      label: "Frontend Team",
      tasks: [
        {
          id: "t1",
          title: "UI Components",
          startDate: new Date(2025, 0, 2),
          endDate: new Date(2025, 0, 10),
          progress: 90,
          color: "#3b82f6",
        },
        {
          id: "t2",
          title: "Responsive Layouts",
          startDate: new Date(2025, 1, 5),
          endDate: new Date(2025, 1, 15),
          progress: 60,
          color: "#2563eb",
        },
        {
          id: "t3",
          title: "Dashboard UI",
          startDate: new Date(2025, 2, 1),
          endDate: new Date(2025, 2, 10),
          progress: 30,
          color: "#60a5fa",
        },
      ],
    },
    {
      id: "backend",
      label: "Backend Team",
      tasks: [
        {
          id: "t4",
          title: "API Development",
          startDate: new Date(2025, 0, 5),
          endDate: new Date(2025, 0, 15),
          progress: 100,
          color: "#10b981",
        },
        {
          id: "t5",
          title: "Authentication Module",
          startDate: new Date(2025, 1, 1),
          endDate: new Date(2025, 1, 12),
          progress: 80,
          color: "#059669",
        },
        {
          id: "t6",
          title: "Data Optimization",
          startDate: new Date(2025, 2, 10),
          endDate: new Date(2025, 2, 20),
          progress: 40,
          color: "#34d399",
        },
      ],
    },
    {
      id: "design",
      label: "Design Team",
      tasks: [
        {
          id: "t7",
          title: "Wireframing",
          startDate: new Date(2025, 0, 1),
          endDate: new Date(2025, 0, 8),
          progress: 100,
          color: "#f59e0b",
        },
        {
          id: "t8",
          title: "UI Mockups",
          startDate: new Date(2025, 1, 8),
          endDate: new Date(2025, 1, 18),
          progress: 90,
          color: "#fbbf24",
        },
        {
          id: "t9",
          title: "Brand Guidelines",
          startDate: new Date(2025, 2, 5),
          endDate: new Date(2025, 2, 15),
          progress: 20,
          color: "#facc15",
        },
      ],
    },
    {
      id: "qa",
      label: "QA Team",
      tasks: [
        {
          id: "t10",
          title: "Test Planning",
          startDate: new Date(2025, 0, 20),
          endDate: new Date(2025, 0, 30),
          progress: 80,
          color: "#8b5cf6",
        },
        {
          id: "t11",
          title: "Regression Testing",
          startDate: new Date(2025, 1, 5),
          endDate: new Date(2025, 1, 15),
          progress: 50,
          color: "#7c3aed",
        },
        {
          id: "t12",
          title: "Automation Setup",
          startDate: new Date(2025, 2, 1),
          endDate: new Date(2025, 2, 10),
          progress: 25,
          color: "#a78bfa",
        },
      ],
    },
    {
      id: "deployment",
      label: "Deployment Team",
      tasks: [
        {
          id: "t13",
          title: "CI/CD Setup",
          startDate: new Date(2025, 1, 1),
          endDate: new Date(2025, 1, 8),
          progress: 60,
          color: "#ef4444",
        },
        {
          id: "t14",
          title: "Server Optimization",
          startDate: new Date(2025, 2, 5),
          endDate: new Date(2025, 2, 15),
          progress: 30,
          color: "#dc2626",
        },
      ],
    },
    {
      id: "marketing",
      label: "Marketing Team",
      tasks: [
        {
          id: "t15",
          title: "Launch Campaign",
          startDate: new Date(2025, 1, 10),
          endDate: new Date(2025, 1, 25),
          progress: 40,
          color: "#ec4899",
        },
        {
          id: "t16",
          title: "Customer Feedback",
          startDate: new Date(2025, 2, 1),
          endDate: new Date(2025, 2, 20),
          progress: 10,
          color: "#db2777",
        },
      ],
    },
  ];

    // Filter tasks to show only those that belong to the current month
  const filteredRows = rows.map((row) => ({
    ...row,
    tasks: row.tasks.filter((task) => {
      // Show if task overlaps with the current month
      return (
        task.startDate.getMonth() === currentMonth ||
        task.endDate.getMonth() === currentMonth
      );
    }),
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goPrevMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          ← Prev
        </button>

        <h1 className="text-2xl font-bold text-center">
           {monthNames[currentMonth]} {year}
        </h1>

        <button
          onClick={goNextMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Next →
        </button>
      </div>

      {/* Timeline */}
      <Timeline rows={filteredRows} startDate={startDate} endDate={endDate} />
    </div>
  );
}

