import React from "react";
import { RecordItem } from "../types";
import { Table, ColumnDef } from "../../../components/ui/Table";
import { Badge } from "../../../components/ui/Badge";

interface RecordsTableProps {
  records: RecordItem[];
}

export const RecordsTable: React.FC<RecordsTableProps> = ({ records }) => {
  const getBadgeVariant = (status: RecordItem["status"]) => {
    switch (status) {
      case "active":
        return "success";
      case "pending":
        return "warning";
      case "archived":
        return "danger";
      default:
        return "neutral";
    }
  };

  const columns: ColumnDef<RecordItem>[] = [
    {
      key: "id",
      header: "Identifier",
      isMono: true,
      width: "140px"
    },
    {
      key: "title",
      header: "Record Title",
      render: (item) => (
        <span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
          {item.title}
        </span>
      )
    },
    {
      key: "category",
      header: "Category",
      render: (item) => (
        <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm, 13px)" }}>
          {item.category}
        </span>
      )
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (item) => (
        <Badge variant={getBadgeVariant(item.status)}>
          {item.status}
        </Badge>
      )
    },
    {
      key: "value",
      header: "Valuation",
      isMono: true,
      align: "right",
      render: (item) => `$${item.value.toLocaleString()}`
    },
    {
      key: "updatedAt",
      header: "Timestamp",
      isMono: true,
      align: "right",
      render: (item) => item.updatedAt
    }
  ];

  return (
    <Table<RecordItem>
      columns={columns}
      data={records}
      keyExtractor={(item) => item.id}
      emptyMessage="No starter records found."
    />
  );
};

