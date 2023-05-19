import React, { FC, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export interface UserRow {
  id: string;
  nombre: string;
  tipo: string;
  email: string;
  fecha: Date;
  direccion: string;
}

function createData({ email, fecha, id, nombre, tipo, direccion }: UserRow) {
  return { id, nombre, tipo, email, fecha, direccion };
}

const rows: UserRow[] = [
  createData({
    id: "1",
    nombre: "Juan Perez",
    tipo: "Cliente",
    email: "juan.perez@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
  }),
  createData({
    id: "2",
    nombre: "Ana Soto",
    tipo: "Proveedor",
    email: "ana.soto@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
  }),
  createData({
    id: "3",
    nombre: "Pedro Rojas",
    tipo: "Cliente",
    email: "pedro.rojas@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
  }),
  createData({
    id: "4",
    nombre: "Maria Pineda",
    tipo: "Proveedor",
    email: "maria.pineda@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
  }),
  createData({
    id: "5",
    nombre: "Carlos Ramirez",
    tipo: "Cliente",
    email: "carlos.ramirez@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
  }),
  createData({
    id: "6",
    nombre: "Lucia Mendez",
    tipo: "Proveedor",
    email: "lucia.mendez@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
  }),
  createData({
    id: "7",
    nombre: "Miguel Torres",
    tipo: "Cliente",
    email: "miguel.torres@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
  }),
  createData({
    id: "8",
    nombre: "Sofia Lopez",
    tipo: "Proveedor",
    email: "sofia.lopez@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
  }),
  createData({
    id: "9",
    nombre: "Luis Morales",
    tipo: "Cliente",
    email: "luis.morales@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
  }),
  createData({
    id: "10",
    nombre: "Laura Castillo",
    tipo: "Proveedor",
    email: "laura.castillo@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
  }),
];

interface Props {
  openDrawerDetails: (details: UserRow) => void;
}

// Define a type for our sort state
type SortState = {
  column: keyof UserRow | null;
  direction: "asc" | "desc";
};

const TablaResultados: FC<Props> = ({ openDrawerDetails }) => {
  // Para ordenar tabla
  const [sort, setSort] = useState<SortState>({
    column: null,
    direction: "asc",
  });

  const handleSort = (column: keyof UserRow) => {
    let direction: "asc" | "desc" = "asc";
    if (sort.column === column && sort.direction === "asc") {
      direction = "desc";
    }

    setSort({ column, direction });
  };

  // Sort the rows based on the sort state
  const sortedRows = [...rows].sort((a, b) => {
    if (sort.column === null) {
      return 0;
    }

    const aValue = a[sort.column];
    const bValue = b[sort.column];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sort.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    // If the values are not strings, just convert them to string for comparison
    const aValueStr = String(aValue);
    const bValueStr = String(bValue);
    return sort.direction === "asc"
      ? aValueStr.localeCompare(bValueStr)
      : bValueStr.localeCompare(aValueStr);
  });

  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: 440, height: 350, overflow: "auto" }}
    >
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell onClick={() => handleSort("id")}>ID</TableCell>
            <TableCell align="center" onClick={() => handleSort("nombre")}>
              Nombre
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("tipo")}>
              Tipo
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("email")}>
              Email
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
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
              <TableCell id="idRow" component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.nombre}</TableCell>
              <TableCell align="center">{row.tipo}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaResultados;
