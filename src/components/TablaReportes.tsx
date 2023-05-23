import React, { FC, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export interface CompraVentaRow {
  id: string;
  nombreProducto: string;
  tipo: "compra" | "venta";
  cantidades: number;
  // proveedor o cliente
  nombrePoC: string;
  fecha: Date;
  precioUnitario: number;
  precioTotal: number;
}

const rows: CompraVentaRow[] = [
  {
    id: "1",
    nombreProducto: "Químico",
    tipo: "compra",
    cantidades: 20,
    nombrePoC: "Empresa Química SRL",
    fecha: new Date(),
    precioUnitario: 100,
    precioTotal: 2000,
  },
  {
    id: "2",
    nombreProducto: "Plásticos",
    tipo: "compra",
    cantidades: 10,
    nombrePoC: "Plastidi SRL",
    fecha: new Date(),
    precioUnitario: 200,
    precioTotal: 2000,
  },
  {
    id: "3",
    nombreProducto: "Embasado",
    tipo: "venta",
    cantidades: 10,
    nombrePoC: "Plastidi SRL",
    fecha: new Date(),
    precioUnitario: 200,
    precioTotal: 2000,
  },
  {
    id: "4",
    nombreProducto: "Metal",
    tipo: "compra",
    cantidades: 50,
    nombrePoC: "Metalúrgica LMN",
    fecha: new Date(),
    precioUnitario: 80,
    precioTotal: 4000,
  },
  {
    id: "5",
    nombreProducto: "Componente Electrónico",
    tipo: "venta",
    cantidades: 30,
    nombrePoC: "Electro Parts",
    fecha: new Date(),
    precioUnitario: 150,
    precioTotal: 4500,
  },
  {
    id: "6",
    nombreProducto: "Pintura",
    tipo: "compra",
    cantidades: 40,
    nombrePoC: "Pinturas Rápidas SRL",
    fecha: new Date(),
    precioUnitario: 75,
    precioTotal: 3000,
  },
  {
    id: "7",
    nombreProducto: "Tornillos",
    tipo: "compra",
    cantidades: 100,
    nombrePoC: "Tornillería Nacional S.A.",
    fecha: new Date(),
    precioUnitario: 5,
    precioTotal: 500,
  },
  {
    id: "8",
    nombreProducto: "Cables",
    tipo: "venta",
    cantidades: 80,
    nombrePoC: "Conectores y Más S.L.",
    fecha: new Date(),
    precioUnitario: 20,
    precioTotal: 1600,
  },
  {
    id: "9",
    nombreProducto: "Gomas",
    tipo: "compra",
    cantidades: 60,
    nombrePoC: "Industrias Gomeras",
    fecha: new Date(),
    precioUnitario: 30,
    precioTotal: 1800,
  },
  {
    id: "10",
    nombreProducto: "Rodamientos",
    tipo: "venta",
    cantidades: 25,
    nombrePoC: "Maquinaria Universal S.A.",
    fecha: new Date(),
    precioUnitario: 120,
    precioTotal: 3000,
  },
];

interface Props {
  openDrawerDetails: (details: CompraVentaRow) => void;
}

const TablaReportes: FC<Props> = ({ openDrawerDetails }) => {
  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: 440, height: 350, overflow: "auto" }}
    >
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Nombre Producto</TableCell>
            <TableCell align="center">Tipo</TableCell>
            <TableCell align="center">Cantidad</TableCell>
            {/* <TableCell align="center">Nombre de Prov/Cli</TableCell> */}
            <TableCell align="center">Fecha</TableCell>
            {/* <TableCell align="center">Precio U.</TableCell> */}
            <TableCell align="center">Precio Total</TableCell>
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
              <TableCell align="center">{row.nombreProducto}</TableCell>
              <TableCell align="center">{row.tipo}</TableCell>
              <TableCell align="center">{row.cantidades}</TableCell>
              {/* <TableCell align="center">{row.nombrePoC}</TableCell> */}
              <TableCell align="center">
                {row.fecha.toJSON().split("T")[0]}
              </TableCell>
              {/* <TableCell align="center">{row.precioUnitario}</TableCell> */}
              <TableCell align="center">{row.precioTotal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaReportes;
