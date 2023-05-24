import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FC, ReactElement, useState } from "react";

import { NextPageWithLayout } from "../_app";
import MainLayout from "../../components/layouts/MainLayout";
import { Download, Feed, Search } from "@mui/icons-material";
import Head from "next/head";
// For time picker
import { DatePicker } from "@mui/x-date-pickers";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import dayjs from "dayjs";
import TablaReportes, { CompraVentaRow } from "@/components/TablaReportes";
import Link from "next/link";

interface SelectValue {
  value: string;
  label: string;
}
interface ReporteProps {
  selectValues: SelectValue[];
}

const reportesValues: SelectValue[] = [
  {
    value: "ventas",
    label: "Ventas",
  },
  {
    value: "compras",
    label: "Compras",
  },
];

enum Reportes {
  VENTAS = "ventas",
  COMPRAS = "compras",
}

const OrdenDetailsDrawer: FC<{
  isOpen: boolean;
  onClose: () => void;
  ordenData?: CompraVentaRow;
}> = ({ isOpen, onClose, ordenData }) => {
  return (
    <Drawer anchor={"right"} open={isOpen} onClose={onClose}>
      <Box style={{ width: "450px", padding: 8 }}>
        <Box sx={{ height: "100%" }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-around"
            sx={{
              background: "rgba(161, 154, 158, 0.05)",
              padding: 2,
              margin: 2,
              borderRadius: 4,
              gap: 4,
              height: "100%",
            }}
          >
            <Box display="flex" sx={{ gap: 4, alignItems: "center" }}>
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                {`Detalle de la ${ordenData?.tipo}`}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ gap: 4, width: "100%" }}
            >
              <TextField
                fullWidth
                label="Nombre Producto"
                id="test"
                type="text"
                value={ordenData?.nombreProducto}
                disabled
              />
              <FormControl fullWidth>
                <InputLabel id="select-label">Tipo</InputLabel>
                <Select
                  labelId="select-label"
                  id="simple-select"
                  value={ordenData?.tipo || "cliente"}
                  label="Tipo"
                  onChange={() => {}}
                  disabled
                >
                  <MenuItem value={"venta"}>Venta</MenuItem>
                  <MenuItem value={"compra"}>Compra</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label={`Nombre del Cliente/Proveedor`}
                id="test"
                type="text"
                value={ordenData?.nombrePoC}
                disabled
              />
              <DatePicker
                label="Fecha de la orden"
                value={
                  ordenData
                    ? dayjs(ordenData.fecha?.toISOString().split("T")[0])
                    : undefined
                }
                slotProps={{
                  textField: {
                    helperText: "El formato debe ser DD/MM/YYYY",
                  },
                }}
                views={["day", "month", "year"]}
                disabled
              />
              <TextField
                fullWidth
                label={`Precio unitario`}
                id="test"
                type="number"
                value={ordenData?.precioUnitario}
                disabled
              />
              <TextField
                fullWidth
                label="Cantidad"
                id="test"
                type="number"
                value={ordenData?.cantidades}
                disabled
              />
              <TextField
                fullWidth
                label={`Precio Total`}
                id="test"
                type="number"
                value={ordenData?.precioTotal}
                disabled
              />
            </Box>

            <Box
              display="flex"
              justifyContent="space-around"
              sx={{ width: "100%" }}
            >
              <Button
                variant="contained"
                sx={{ width: "40%" }}
                startIcon={<KeyboardBackspaceIcon />}
                onClick={onClose}
              >
                Volver
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

const CrearReporteDrawer: FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <Drawer anchor={"right"} open={isOpen} onClose={onClose}>
      <Box style={{ width: "450px", padding: 8 }}>
        <Box sx={{ height: "100%" }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-around"
            sx={{
              background: "rgba(161, 154, 158, 0.05)",
              padding: 2,
              margin: 2,
              borderRadius: 4,
              gap: 4,
              height: "100%",
            }}
          >
            <Box display="flex" sx={{ gap: 4, alignItems: "center" }}>
              {/* <Button> */}
              <Button onClick={onClose} sx={{ marginLeft: -10 }}>
                <KeyboardBackspaceIcon />
              </Button>
              {/* </Button> */}
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                Nuevo Reporte
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ gap: 4, width: "100%" }}
            >
              <FormControl fullWidth>
                <InputLabel id="select-label">Seleccionar</InputLabel>
                <Select
                  labelId="select-label"
                  id="simple-select"
                  value={"ventas"}
                  label="Seleccionar"
                  onChange={() => {}}
                >
                  <MenuItem value={"ventas"}>Ventas</MenuItem>
                  <MenuItem value={"compras"}>Compras</MenuItem>
                </Select>
              </FormControl>
              <Typography textAlign="center" variant="h4">
                Rango de Fechas
              </Typography>
              <DatePicker
                label="Fecha de Inicio"
                value={dayjs()}
                slotProps={{
                  textField: {
                    helperText: "El formato debe ser DD/MM/YYYY",
                  },
                }}
                views={["day", "month", "year"]}
              />
              <DatePicker
                label="Fecha de Fin (opcional)"
                value={dayjs()}
                slotProps={{
                  textField: {
                    helperText: "El formato debe ser DD/MM/YYYY",
                  },
                }}
                views={["day", "month", "year"]}
              />
            </Box>

            <Box
              display="flex"
              justifyContent="space-around"
              sx={{ width: "100%" }}
            >
              <Link target="_blank" href="/ejemplo_reciplas.pdf">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Download />}
                >
                  Descargar informe
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

const BusquedaContent: FC<ReporteProps> = ({ selectValues }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReporteDrawerOpen, setIsReporteDrawerOpen] = useState(false);
  const [drawerDetails, setDrawerDetails] = useState<
    CompraVentaRow | undefined
  >(undefined);

  const handleToggleDrawer = (userData?: CompraVentaRow) => {
    if (userData) {
      setDrawerDetails({
        ...userData,
        tipo: (userData.tipo as any).toLowerCase(),
      });
    } else {
      setDrawerDetails(undefined);
    }
    setIsDrawerOpen((prev) => !prev);
  };

  const handleToggleDrawerInforme = () => {
    setIsReporteDrawerOpen((prev) => !prev);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "500px repeat(2, 1fr)",
        // 100 px en la primer fila
        gridTemplateRows: "100px repeat(2, 1fr)",
        gridColumnGap: "8px",
        gridRowGap: "8px",
        background: "white",
        color: "black",
        padding: 16,
        borderRadius: 16,
        boxShadow: "0px 0px 66px 44px rgba(0,0,0,0.1)",
      }}
    >
      <OrdenDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => handleToggleDrawer()}
        ordenData={drawerDetails}
      />
      <CrearReporteDrawer
        isOpen={isReporteDrawerOpen}
        onClose={() => handleToggleDrawerInforme()}
      />
      {/* FILTROS */}
      {/* Lado izquierdo */}
      <div
        className="div1"
        style={{ border: "2px transparent solid", gridArea: "1 / 1 / 4 / 2" }}
      >
        {/* Select - Menú desplegable */}
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          sx={{ height: "100%" }}
        >
          <Box sx={{ padding: 2, border: "2px transparent solid" }}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Seleccionar</InputLabel>
              <Select
                labelId="select-label"
                id="simple-select"
                value={Reportes.VENTAS}
                label="Seleccionar"
                onChange={() => {}}
              >
                {selectValues.map((selectObject) => (
                  <MenuItem key={selectObject.value} value={selectObject.value}>
                    {selectObject.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ padding: 2 }}
          >
            <Button
              startIcon={<Feed />}
              variant="outlined"
              onClick={() => {
                handleToggleDrawerInforme();
              }}
            >
              Emitir reporte
            </Button>
          </Box>
        </Box>
      </div>
      {/* Arriba */}
      <div
        className="div2"
        style={{
          border: "2px transparent solid",
          gridArea: "1 / 2 / 2 / 4",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            padding: 2,
            gap: 4,
          }}
          display={"flex"}
        >
          <TextField
            fullWidth
            label="Ingrese algún campo"
            id="buscar-main"
            type="search"
          />
          <Button
            variant="contained"
            sx={{ width: "40%" }}
            startIcon={<Search />}
          >
            Buscar
          </Button>
        </Box>
      </div>
      {/* CONTENIDO PRINCIPAL */}
      <div
        className="div3"
        style={{ border: "2px transparent solid", gridArea: "2 / 2 / 4 / 4" }}
      >
        <Box sx={{ padding: 2 }}>
          <TablaReportes
            openDrawerDetails={(details) => handleToggleDrawer(details)}
          />
        </Box>
      </div>
    </div>
  );
};

const UsuariosHomePage: NextPageWithLayout<{}> = ({}) => {
  return (
    <>
      <Head>
        <title>Gestión de Clientes y Proveedores</title>
      </Head>
      {/* Home Page */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 16,
          marginTop: 16,
        }}
      >
        {/* Titulo */}
        <div
          style={{
            alignContent: "flex-start",
          }}
        >
          <Typography
            variant="h3"
            color={"white"}
            sx={{ textDecoration: "underline", fontWeight: "bold" }}
          >
            Reportes de Compra y Ventas
          </Typography>
        </div>
        {/* Contenido */}
        <Box>
          <BusquedaContent selectValues={reportesValues} />
        </Box>
      </div>
    </>
  );
};

UsuariosHomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default UsuariosHomePage;
