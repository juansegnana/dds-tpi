import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(id: string, nombre: string, tipo: string, email: string) {
  return { id, nombre, tipo, email };
}

const rows = [
  createData("1", "Juan Perez", "Cliente", "juan.perez@gmail.com"),
  createData("2", "Ana Soto", "Proveedor", "ana.soto@gmail.com"),
  createData("3", "Pedro Rojas", "Cliente", "pedro.rojas@gmail.com"),
  createData("4", "Maria Pineda", "Proveedor", "maria.pineda@gmail.com"),
  createData("5", "Carlos Ramirez", "Cliente", "carlos.ramirez@gmail.com"),
  createData("6", "Lucia Mendez", "Proveedor", "lucia.mendez@gmail.com"),
  createData("7", "Miguel Torres", "Cliente", "miguel.torres@gmail.com"),
  createData("8", "Sofia Lopez", "Proveedor", "sofia.lopez@gmail.com"),
  createData("9", "Luis Morales", "Cliente", "luis.morales@gmail.com"),
  createData("10", "Laura Castillo", "Proveedor", "laura.castillo@gmail.com"),
];

export default function TablaResultados() {
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
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
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
}
