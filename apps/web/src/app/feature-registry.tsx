import type { ComponentType } from "react";
import { RecordsPage } from "../features/records/pages/RecordsPage";

export interface FeatureRoute {
  id: string;
  path: string;
  label: string;
  roles: string[];
  page: ComponentType;
}

// Add a hackathon screen by appending one object. Then add the API route file.
export const featureRoutes: FeatureRoute[] = [
  {
    id: "records",
    path: "records",
    label: "Records Console",
    roles: ["admin", "manager", "member"],
    page: RecordsPage
  }
];
