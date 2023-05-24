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
import { AreaEnum } from "..";
import MainLayout from "../../components/layouts/MainLayout";
import { Add, Delete, Download, Edit, Search } from "@mui/icons-material";

import Head from "next/head";
// For time picker
import { DatePicker } from "@mui/x-date-pickers";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import dayjs from "dayjs";
import TablaReportesUsuarios, {
  UsuariosSistemaRow,
} from "@/components/TablaReportesUsuarios";
import Link from "next/link";

interface SelectValue {
  value: string;
  label: string;
}
interface ReporteProps {
  selectValues: SelectValue[];
}

const tiposDeUsuario: SelectValue[] = [
  {
    value: AreaEnum.Compras,
    label: AreaEnum.Compras,
  },
  {
    value: AreaEnum.Produccion,
    label: AreaEnum.Produccion,
  },
  {
    value: AreaEnum.Administracion,
    label: AreaEnum.Administracion,
  },
  {
    value: AreaEnum.Ventas,
    label: AreaEnum.Ventas,
  },
  {
    value: AreaEnum.Gerencial,
    label: AreaEnum.Gerencial,
  },
];

const UsuarioDetailsDrawer: FC<{
  isOpen: boolean;
  onClose: () => void;
  userData?: UsuariosSistemaRow;
}> = ({ isOpen, onClose, userData }) => {
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
                {`${userData ? "Detalle" : "Nuevo"} usuario`}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ gap: 4, width: "100%" }}
            >
              <Box display="flex" sx={{ gap: 2 }}>
                <TextField
                  autoComplete="nope"
                  fullWidth
                  label="Nombre"
                  id="test123"
                  type="text"
                  value={userData?.nombre}
                  disabled={!!userData}
                />
                <TextField
                  autoComplete="nope"
                  fullWidth
                  label="Apellido"
                  id="test1234"
                  type="text"
                  value={userData?.apellido}
                  disabled={!!userData}
                />
              </Box>
              <TextField
                autoComplete="no"
                fullWidth
                label="DNI"
                id="testdni"
                type="number"
                value={userData?.dni}
                disabled={!!userData}
              />

              <FormControl fullWidth>
                <InputLabel id="select-label">Seleccionar sector</InputLabel>
                <Select
                  autoComplete="no"
                  labelId="select-label"
                  id="simple-select"
                  value={userData?.sector || AreaEnum.Compras}
                  label="Seleccionar sector"
                  onChange={() => {}}
                  disabled={!!userData}
                >
                  {tiposDeUsuario.map((selectObject) => (
                    <MenuItem
                      key={selectObject.value}
                      value={selectObject.value}
                    >
                      {selectObject.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                autoComplete="no"
                fullWidth
                label="Email"
                id="test-email"
                type="email"
                value={userData?.email}
                disabled={!!userData}
              />

              <DatePicker
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
                disabled={!!userData}
              />

              <Box display="flex" sx={{ gap: 2 }}>
                <TextField
                  autoComplete="no"
                  fullWidth
                  label="Dirección"
                  id="test-direccion"
                  type="text"
                  value={userData?.direccion}
                  disabled={!!userData}
                />
                <TextField
                  autoComplete="no"
                  fullWidth
                  label="Código Postal"
                  id="test-codigo-postal"
                  type="number"
                  value={userData?.codigoPostal}
                  onInput={(e) => {
                    // @ts-ignore
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 4);
                  }}
                  disabled={!!userData}
                />
              </Box>

              <TextField
                autoComplete="no"
                fullWidth
                label="Teléfono"
                id="test-telefono"
                type="number"
                value={userData?.telefono}
                disabled={!!userData}
                onInput={(e) => {
                  // @ts-ignore
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
              />
            </Box>

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
                    if (!confirm("¿Desea borrar el usuario?")) return;
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
                    alert("Usuario creado con éxito");
                  }
                }}
              >
                {userData ? "Editar" : "Crear"}
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
                  value={"cliente"}
                  label="Seleccionar"
                  onChange={() => {}}
                >
                  <MenuItem value={"cliente"}>Cliente</MenuItem>
                  <MenuItem value={"proveedor"}>Proveedor</MenuItem>
                  <MenuItem value={"deudores"}>Deudores</MenuItem>
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
                  onClick={onClose}
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
    UsuariosSistemaRow | undefined
  >(undefined);

  const handleToggleDrawer = (userData?: UsuariosSistemaRow) => {
    if (userData) {
      setDrawerDetails({
        ...userData,
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
                value={AreaEnum.Compras}
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
              startIcon={<Add />}
              variant="contained"
              onClick={() => {
                handleToggleDrawer();
              }}
            >
              Nuevo usuario
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
          <TablaReportesUsuarios
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
        <title>Gestión de Usuarios del Sistema</title>
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
            Gestión de Usuarios del Sistema
          </Typography>
        </div>
        {/* Contenido */}
        <Box>
          <BusquedaContent selectValues={tiposDeUsuario} />
        </Box>
      </div>
    </>
  );
};

UsuariosHomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default UsuariosHomePage;
