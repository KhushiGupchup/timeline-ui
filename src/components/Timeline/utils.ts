export const daysBetween = (a: Date, b: Date) => {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
};


export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  );
};
