export interface TimelineTask {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  color?: string;
}

export interface TimelineRow {
  id: string;
  label: string;
  tasks: TimelineTask[];
}

export interface TimelineProps {
  rows: TimelineRow[];
  startDate?: Date;
  endDate?: Date;
}
