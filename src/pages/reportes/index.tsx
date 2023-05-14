import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";

import { NextPageWithLayout } from "../_app";
import { usersArray } from "..";
import MainLayout from "../../../components/layouts/MainLayout";

const ReportesContent = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        gridColumnGap: "8px",
        gridRowGap: "8px",
        background: "white",
        color: "black",
        padding: 16,
      }}
    >
      <div className="div1">
        {/* <FiltrosBusqueda /> */}
        <Typography>Testing</Typography>
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
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

const ReportesHomePage: NextPageWithLayout<{}> = ({}) => {
  return (
    <>
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
          <Typography variant="h3" color={"white"}>
            Búsqueda
          </Typography>
        </div>
        {/* Contenido */}
        <ReportesContent />
      </div>
    </>
  );
};

ReportesHomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout user={usersArray[0]}>{page}</MainLayout>;
};

export default ReportesHomePage;
