import React, { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Area } from "@/pages";

export interface UsuariosSistemaRow {
  id: string;
  nombre: string;
  apellido: string;
  sector: Area;
  dni: number;
  email: string;
  fecha: Date;
  direccion: string;
  codigoPostal: number;
  telefono: number;
}

const rows: UsuariosSistemaRow[] = [
  {
    id: "1",
    nombre: "Juan",
    apellido: "Perez",
    sector: "compras",
    dni: 12345678,
    email: "juan@gmail.com",
    fecha: new Date("2023-05-20"),
    direccion: "Calle 123",
    codigoPostal: 1234,
    telefono: 123456789,
  },
  {
    id: "2",
    nombre: "Pepe",
    apellido: "Gonzalez",
    sector: "gerencial",
    dni: 3333333,
    email: "pepe@gmail.com",
    fecha: new Date("2023-05-20"),
    direccion: "Calle 234",
    codigoPostal: 2345,
    telefono: 234567890,
  },
  {
    id: "3",
    nombre: "Maria",
    apellido: "Rodriguez",
    sector: "administracion",
    dni: 12345679,
    email: "maria@gmail.com",
    fecha: new Date("2023-05-20"),
    direccion: "Calle 345",
    codigoPostal: 3456,
    telefono: 345678901,
  },
  {
    id: "4",
    nombre: "Carlos",
    apellido: "Martinez",
    sector: "ventas",
    dni: 12345680,
    email: "carlos@gmail.com",
    fecha: new Date("2023-05-20"),
    direccion: "Calle 456",
    codigoPostal: 4567,
    telefono: 456789012,
  },
  {
    id: "5",
    nombre: "Luisa",
    apellido: "Gomez",
    sector: "produccion",
    dni: 12345681,
    email: "luisa@gmail.com",
    fecha: new Date("2023-05-20"),
    direccion: "Calle 567",
    codigoPostal: 5678,
    telefono: 567890123,
  },
  {
    id: "6",
    nombre: "Antonio",
    apellido: "Ramirez",
    sector: "compras",
    dni: 12345682,
    email: "antonio@gmail.com",
    fecha: new Date("2023-05-20"),
    direccion: "Calle 678",
    codigoPostal: 6789,
    telefono: 678901234,
  },
  {
    id: "7",
    nombre: "Isabel",
    apellido: "Guzman",
    sector: "gerencial",
    dni: 12345683,
    email: "isabel@gmail.com",
    fecha: new Date("2023-05-20"),
    direccion: "Calle 789",
    codigoPostal: 7890,
    telefono: 789012345,
  },
  {
    id: "8",
    nombre: "Ricardo",
    apellido: "Sanchez",
    sector: "administracion",
    dni: 12345684,
    email: "ricardo@gmail.com",
    fecha: new Date("2023-05-20"),
    direccion: "Calle 890",
    codigoPostal: 8901,
    telefono: 890123456,
  },
  {
    id: "9",
    nombre: "Ana",
    apellido: "Mendoza",
    sector: "ventas",
    dni: 12345685,
    email: "ana@gmail.com",
    fecha: new Date("2023-05-20"),
    direccion: "Calle 901",
    codigoPostal: 9012,
    telefono: 901234567,
  },
  {
    id: "10",
    nombre: "Fernando",
    apellido: "Reyes",
    sector: "produccion",
    dni: 12345686,
    email: "fernando@gmail.com",
    fecha: new Date("2023-05-20"),
    direccion: "Calle 1011",
    codigoPostal: 10112,
    telefono: 1012345678,
  },
];

interface Props {
  openDrawerDetails: (details: UsuariosSistemaRow) => void;
}

const TablaReportesUsuarios: FC<Props> = ({ openDrawerDetails }) => {
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
            <TableCell align="center">Apellido</TableCell>
            <TableCell align="center">Sector</TableCell>
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
              <TableCell align="center">{row.apellido}</TableCell>
              <TableCell align="center">{row.sector}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaReportesUsuarios;
