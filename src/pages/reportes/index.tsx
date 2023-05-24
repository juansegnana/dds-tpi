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
import { Add, Cancel, Edit, Feed, Search } from "@mui/icons-material";
import TablaResultados, { UserRow } from "../../components/TablaResultados";
import Head from "next/head";
// For time picker
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface SelectValue {
  value: string;
  label: string;
}
interface ReporteProps {
  selectValues: SelectValue[];
}

const reportesValues: SelectValue[] = [
  {
    value: "cliente",
    label: "Cliente",
  },
  {
    value: "proveedor",
    label: "Proveedor",
  },
];

const UsuarioDetailsDrawer: FC<{
  isOpen: boolean;
  onClose: () => void;
  userData?: UserRow;
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
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                textDecoration: "underline",
              }}
            >
              {`${userData ? "Editar" : "Nuevo"} usuario`}
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ gap: 4, width: "100%" }}
            >
              <TextField
                fullWidth
                label="Nombre Completo"
                id="test"
                type="text"
                value={userData?.nombre}
              />
              <TextField
                fullWidth
                label="Dirección"
                id="test"
                type="text"
                value={userData?.direccion}
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
              />

              <FormControl fullWidth>
                <InputLabel id="select-label">Seleccionar</InputLabel>
                <Select
                  labelId="select-label"
                  id="simple-select"
                  value={userData?.tipo || "cliente"}
                  label="Seleccionar"
                  onChange={() => {}}
                >
                  <MenuItem value={"cliente"}>Cliente</MenuItem>
                  <MenuItem value={"proveedor"}>Proveedor</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box
              display="flex"
              justifyContent="space-around"
              sx={{ width: "100%" }}
            >
              <Button
                variant="contained"
                color="error"
                startIcon={<Cancel />}
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                sx={{ width: "40%" }}
                startIcon={userData ? <Edit /> : <Add />}
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

const BusquedaContent: FC<ReporteProps> = ({ selectValues }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerDetails, setDrawerDetails] = useState<UserRow | undefined>(
    undefined
  );

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
                value={"cliente"}
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
            <Button startIcon={<Feed />} variant="outlined">
              Emitir informe
            </Button>
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
          <TablaResultados
            openDrawerDetails={(details) => handleToggleDrawer(details)}
          />
        </Box>
      </div>
    </div>
  );
};

const ReportesHomePage: NextPageWithLayout<{}> = ({}) => {
  return (
    <>
      <Head>
        <title>Gestión de Usuarios</title>
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
            Gestión de Usuarios
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

ReportesHomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ReportesHomePage;
