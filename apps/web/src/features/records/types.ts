export type RecordStatus = "active" | "pending" | "archived";

export interface RecordItem {
  id: string;
  title: string;
  category: string;
  status: RecordStatus;
  value: number;
  updatedAt: string;
}

export interface RecordInput {
  title: string;
  category: string;
  status: RecordStatus;
  value: number;
}

