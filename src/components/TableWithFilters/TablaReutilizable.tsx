import React, { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RowValues, TableInfo } from "./TableWithFilters";
import { formatearLabel } from "@/utils/format";

interface Props {
  openDrawerDetails: (details: RowValues) => void;
  tableInfo: TableInfo;
}

const TablaReutilizable: FC<Props> = ({ openDrawerDetails, tableInfo }) => {
  const { rows, visibleColumns } = tableInfo;

  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: 440, height: 350, overflow: "auto" }}
    >
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {visibleColumns.map((property) => (
              <TableCell align="center" key={property}>
                {formatearLabel(property)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const rowValues: string[] = [];
            visibleColumns.forEach((column) => {
              const item = row[column];
              let formatted = item;
              if (item instanceof Date) {
                formatted = item.toJSON().split("T")[0];
              }
              rowValues.push(`${formatted}`);
            });

            return (
              <TableRow
                hover={true}
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                onClick={() => {
                  openDrawerDetails(row);
                }}
              >
                {rowValues.map((item) => (
                  <TableCell key={item} id={`${row.id}-${item}`} align="center">
                    {formatearLabel(item)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaReutilizable;
