

export const DependencyLine = ({ fromX, fromY, toX, toY }: any) => {
  const midX = (fromX + toX) / 2;
  const path = `M${fromX},${fromY} C${midX},${fromY} ${midX},${toY} ${toX},${toY}`;
  return <path d={path} stroke="#9ca3af" fill="none" strokeWidth="2" markerEnd="url(#arrowhead)" />;
};
