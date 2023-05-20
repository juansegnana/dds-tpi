// import React, { FC, useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// interface Props<T> {
//   openDrawerDetails: (details: T) => void;
//   rows: T[];
// }

// const TablaReportes: FC<Props<T>> = ({ openDrawerDetails }) => {
//   return (
//     <TableContainer
//       component={Paper}
//       style={{ maxHeight: 440, height: 350, overflow: "auto" }}
//     >
//       <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell align="center">Nombre Producto</TableCell>
//             <TableCell align="center">Tipo</TableCell>
//             <TableCell align="center">Cantidad</TableCell>
//             {/* <TableCell align="center">Nombre de Prov/Cli</TableCell> */}
//             <TableCell align="center">Fecha</TableCell>
//             {/* <TableCell align="center">Precio U.</TableCell> */}
//             <TableCell align="center">Precio Total</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               hover={true}
//               key={row.id}
//               sx={{
//                 "&:last-child td, &:last-child th": { border: 0 },
//                 cursor: "pointer",
//               }}
//               onClick={() => {
//                 openDrawerDetails(row);
//               }}
//             >
//               <TableCell id="idRow" component="th" scope="row">
//                 {row.id}
//               </TableCell>
//               <TableCell align="center">{row.nombreProducto}</TableCell>
//               <TableCell align="center">{row.tipo}</TableCell>
//               <TableCell align="center">{row.cantidades}</TableCell>
//               {/* <TableCell align="center">{row.nombrePoC}</TableCell> */}
//               <TableCell align="center">
//                 {row.fecha.toJSON().split("T")[0]}
//               </TableCell>
//               {/* <TableCell align="center">{row.precioUnitario}</TableCell> */}
//               <TableCell align="center">{row.precioTotal}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default TablaReportes;
