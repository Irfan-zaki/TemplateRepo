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
          padding: "var(--space-8, 32px)",
          textAlign: "center",
          color: "var(--color-text-secondary)",
          fontSize: "var(--text-base, 15px)",
          fontFamily: "var(--font-sans)"
        }}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          fontFamily: "var(--font-sans)"
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: "2px solid var(--color-border)",
              backgroundColor: "var(--color-muted)"
            }}
          >
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  padding: "12px",
                  fontSize: "var(--text-xs, 12px)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "var(--color-text-primary)",
                  textAlign: col.align || "left",
                  width: col.width
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              style={{
                borderBottom: "1px solid var(--color-border)",
                transition: "background-color 0.1s ease"
              }}
            >
              {columns.map((col) => {
                const cellValue = (item as Record<string, unknown>)[col.key];
                return (
                  <td
                    key={col.key}
                    className={col.isMono ? "font-mono" : undefined}
                    style={{
                      padding: "12px",
                      fontSize: col.isMono
                        ? "var(--font-size-tech, 12px)"
                        : "var(--text-base, 15px)",
                      color: "var(--color-text-primary)",
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

