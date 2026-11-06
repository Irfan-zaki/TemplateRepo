export interface RecordItem {
  id: string;
  title: string;
  category: string;
  status: "active" | "pending" | "archived";
  value: number;
  updatedAt: string;
}

