export interface Task {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  color?: string;
  onClick?: () => void;
}
export interface Row {
  id: string;
  label: string;
  tasks: Task[];
}
