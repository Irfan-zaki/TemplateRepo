import React from "react";

export interface ColumnDef<T> {
  key: string;
  header: string;
  width?: string;
  isMono?: boolean;
  align?: "left" | "center" | "right";
  render?: (item: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  emptyMessage?: string;
  keyExtractor: (item: T) => string;
}

/**
 * Full-bleed list table. It has no outer frame: the page decides where the
 * table starts and ends, and first/last cells align to --layout-gutter.
 */
export function Table<T>({
  columns,
  data,
  emptyMessage = "No records found.",
  keyExtractor
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div
        style={{
          padding: "var(--space-8, 32px) var(--layout-gutter)",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: "var(--text-base, 15px)",
          fontFamily: "var(--font-sans)"
        }}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ textAlign: col.align || "left", width: col.width }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={keyExtractor(item)}>
              {columns.map((col) => {
                const cellValue = (item as Record<string, unknown>)[col.key];
                return (
                  <td
                    key={col.key}
                    className={col.isMono ? "font-mono" : undefined}
                    style={{
                      fontSize: col.isMono ? "var(--font-size-tech, 12px)" : "var(--text-base, 15px)",
                      color: "var(--text)",
                      textAlign: col.align || "left"
                    }}
                  >
                    {col.render ? col.render(item) : String(cellValue ?? "—")}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
