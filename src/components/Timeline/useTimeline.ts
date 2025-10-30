import { useState } from "react";

export function useTimeline(initialStart: Date, initialEnd: Date) {
  const [startDate, setStartDate] = useState(initialStart);
  const [endDate, setEndDate] = useState(initialEnd);
  const [view, setView] = useState<"day" | "week" | "month">("day");

  const shiftMonth = (offset: number) => {
    const newStart = new Date(startDate);
    newStart.setMonth(newStart.getMonth() + offset);
    const newEnd = new Date(newStart.getFullYear(), newStart.getMonth() + 1, 0);
    setStartDate(newStart);
    setEndDate(newEnd);
  };

  return { startDate, endDate, setStartDate, setEndDate, shiftMonth, view, setView };
}
