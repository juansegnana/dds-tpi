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
  apellido?: string;
  tipo: string;
  email: string;
  fecha: Date;
  direccion: string;
  cuit: string;
  debe: number;
}

export function createData({
  email,
  fecha,
  id,
  nombre,
  tipo,
  direccion,
  apellido,
  cuit,
  debe,
}: UserRow) {
  return { id, nombre, tipo, email, fecha, direccion, apellido, cuit, debe };
}

export const DEFAULT_USERS_ROWS: UserRow[] = [
  createData({
    id: "1",
    nombre: "Juan",
    apellido: "Perez",
    tipo: "Cliente Empresa",
    email: "juan.perez@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
    cuit: "20-12345678-9",
    debe: 2000,
  }),
  createData({
    id: "2",
    nombre: "Ana",
    apellido: "Soto",
    tipo: "Proveedor",
    email: "ana.soto@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
    cuit: "20-12345678-9",
    debe: 0,
  }),
  createData({
    id: "3",
    nombre: "Pedro Rojas",
    apellido: "Rojas",
    tipo: "Cliente Particular",
    email: "pedro.rojas@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
    cuit: "20-12345678-9",
    debe: 100,
  }),
  createData({
    id: "4",
    nombre: "Maria",
    apellido: "Pineda",
    tipo: "Cliente Particular",
    email: "maria.pineda@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
    cuit: "20-12345678-9",
    debe: 0,
  }),
  createData({
    id: "5",
    nombre: "Carlos",
    apellido: "Ramirez",
    tipo: "Cliente Particular",
    email: "carlos.ramirez@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
    cuit: "20-12345678-9",
    debe: 5000,
  }),
  createData({
    id: "6",
    nombre: "Lucia",
    apellido: "Mendez",
    tipo: "Cliente Particular",
    email: "lucia.mendez@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
    cuit: "20-12345678-9",
    debe: 9000,
  }),
  createData({
    id: "7",
    nombre: "Miguel",
    apellido: "Torres",
    tipo: "Cliente Empresa",
    email: "miguel.torres@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
    cuit: "20-12345678-9",
    debe: 0,
  }),
  createData({
    id: "8",
    nombre: "Sofia",
    apellido: "Lopez",
    tipo: "Cliente Empresa",
    email: "sofia.lopez@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
    cuit: "20-12345678-9",
    debe: 0,
  }),
  createData({
    id: "9",
    nombre: "Luis",
    apellido: "Morales",
    tipo: "Cliente Particular",
    email: "luis.morales@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
    cuit: "20-12345678-9",
    debe: 0,
  }),
  createData({
    id: "10",
    nombre: "Laura",
    apellido: "Castillo",
    tipo: "Cliente Particular",
    email: "laura.castillo@gmail.com",
    fecha: new Date(),
    direccion: "Av. 25 de Mayo",
    cuit: "20-12345678-9",
    debe: 9100,
  }),
];

interface Props {
  openDrawerDetails: (details: UserRow) => void;
  rows: UserRow[];
}

// Define a type for our sort state
type SortState = {
  column: keyof UserRow | null;
  direction: "asc" | "desc";
};

const TablaResultados: FC<Props> = ({
  openDrawerDetails,
  rows = DEFAULT_USERS_ROWS,
}) => {
  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: 440, height: 350, overflow: "auto" }}
    >
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Tipo</TableCell>
            <TableCell align="center">Email</TableCell>
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
