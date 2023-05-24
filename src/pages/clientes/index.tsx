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
import { FC, ReactElement, use, useContext, useState } from "react";

import { NextPageWithLayout } from "../_app";
import { User } from "..";
import MainLayout from "../../components/layouts/MainLayout";
import { Add, Delete, Download, Edit, Feed, Search } from "@mui/icons-material";
import TablaResultados, { UserRow } from "../../components/TablaResultados";
import Head from "next/head";
// For time picker
import { DatePicker } from "@mui/x-date-pickers";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import dayjs from "dayjs";
import UserContext from "@/contexts/UserContext";
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
    value: "empresa",
    label: "Clientes Empresa",
  },
  {
    value: "particular",
    label: "Clientes Particulares",
  },
  {
    value: "proveedor",
    label: "Proveedores",
  },
];

const UsuarioDetailsDrawer: FC<{
  isOpen: boolean;
  onClose: () => void;
  userData?: UserRow;
}> = ({ isOpen, onClose, userData }) => {
  const { user } = useContext(UserContext);

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
              <Button onClick={onClose} sx={{ marginLeft: -10 }}>
                <KeyboardBackspaceIcon />
              </Button>
              {/* TODO: NO VE EL ADMINISTRADOR */}
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                {`${userData ? "Editar" : "Nuevo"} Cli./Prov.`}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ gap: 4, width: "100%" }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  disabled={!!userData}
                  autoComplete="no"
                  fullWidth
                  label="Nombre"
                  id="test"
                  type="text"
                  value={userData?.nombre}
                />
                <TextField
                  autoComplete="no"
                  disabled={!!userData}
                  fullWidth
                  label="Apellido (opcional)"
                  id="test"
                  type="text"
                  value={userData?.apellido}
                />
              </Box>
              <TextField
                autoComplete="no"
                disabled={!!userData}
                fullWidth
                label="Dirección"
                id="test"
                type="text"
                value={userData?.direccion}
              />
              <DatePicker
                disabled={!!userData}
                label="Fecha Nacimiento"
                value={
                  userData
                    ? dayjs(userData.fecha?.toISOString().split("T")[0])
                    : undefined
                }
                slotProps={{
                  textField: {
                    helperText: "El formato debe ser DD/MM/YYYY",
                  },
                }}
                views={["day", "month", "year"]}
              />

              <TextField
                autoComplete="no"
                disabled={!!userData}
                fullWidth
                label="DNI/CUIT"
                id="test"
                type="text"
                value={userData?.cuit}
              />

              <FormControl fullWidth>
                <InputLabel id="select-label">Seleccionar</InputLabel>
                <Select
                  autoComplete="no"
                  disabled={!!userData}
                  labelId="select-label"
                  id="simple-select"
                  value={userData?.tipo || "cliente particular"}
                  label="Seleccionar"
                  onChange={() => {}}
                >
                  <MenuItem value={"cliente particular"}>
                    Cliente Particular
                  </MenuItem>
                  <MenuItem value={"cliente empresa"}>Cliente Empresa</MenuItem>
                  <MenuItem value={"proveedor"}>Proveedor</MenuItem>
                </Select>
              </FormControl>

              {["ventas", "administracion", "gerencial"].includes(
                user.area
              ) && (
                <TextField
                  autoComplete="no"
                  disabled={!!userData}
                  fullWidth
                  label="Debe"
                  id="test-deudores"
                  type="number"
                  value={userData?.debe}
                />
              )}
            </Box>

            {user.area !== "gerencial" && (
              <Box
                display="flex"
                justifyContent="space-around"
                sx={{ width: "100%" }}
              >
                {userData && (
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => {
                      if (!confirm("¿Está seguro que desea borrar?")) return;
                      onClose();
                    }}
                  >
                    Borrar
                  </Button>
                )}
                <Button
                  variant="contained"
                  sx={{ width: "40%" }}
                  startIcon={userData ? <Edit /> : <Add />}
                  onClick={() => {
                    if (!userData) {
                      alert("Nuevo cliente/proveedor subido");
                      onClose();
                    }
                  }}
                >
                  {userData ? "Editar" : "Crear"}
                </Button>
              </Box>
            )}
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
  const { user } = useContext(UserContext);

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
                  value={"cliente"}
                  label="Seleccionar"
                  onChange={() => {}}
                >
                  <MenuItem value={"cliente"}>Clientes Particulares</MenuItem>
                  <MenuItem value={"empresa"}>Clientes Empresa</MenuItem>
                  {["administracion", "ventas", "gerencial"].includes(
                    user.area
                  ) && <MenuItem value={"deudores"}>Deudores</MenuItem>}
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
  const [drawerDetails, setDrawerDetails] = useState<UserRow | undefined>(
    undefined
  );

  const { user } = useContext(UserContext);

  const handleToggleDrawer = (userData?: UserRow) => {
    if (userData) {
      setDrawerDetails({
        ...userData,
        tipo: userData.tipo.toLowerCase(),
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
      <UsuarioDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => handleToggleDrawer()}
        userData={drawerDetails}
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
                value={"empresa"}
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
            {user.area !== "gerencial" && (
              <Button
                startIcon={<Add />}
                variant="contained"
                onClick={() => {
                  handleToggleDrawer();
                }}
              >
                Nuevo cliente/proveedor
              </Button>
            )}
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
          <TablaResultados
            openDrawerDetails={(details) => handleToggleDrawer(details)}
          />
        </Box>
      </div>
    </div>
  );
};

const UsuariosHomePage: NextPageWithLayout<{}> = () => {
  const { user } = useContext(UserContext);

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
            Gestión de Clientes y Proveedores
          </Typography>
        </div>
        {/* Contenido */}
        <Box>
          <BusquedaContent
            selectValues={
              user.area === "administracion"
                ? [
                    ...reportesValues, // Administrador: no hacer reporte pero si ve deudor
                    {
                      value: "deudores",
                      label: "Deudores",
                    },
                  ]
                : reportesValues
            }
          />
        </Box>
      </div>
    </>
  );
};

UsuariosHomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default UsuariosHomePage;
