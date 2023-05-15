import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { FC, ReactElement } from "react";

import { NextPageWithLayout } from "../_app";
import { usersArray } from "..";
import MainLayout from "../../../components/layouts/MainLayout";

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

const ReportesContent: FC<ReporteProps> = ({ selectValues }) => {
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
      <div className="div1" style={{ border: "2px red solid" }}>
        {/* MOVER A - <FiltrosBusqueda /> */}
        <Typography>Work in progress</Typography>
        <br />
        {/* Select - Menú desplegable */}
        {/* VER https://www.phind.com/search?cache=0cc131a3-11fc-4379-97d8-595488ba667b */}
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
        <ReportesContent selectValues={reportesValues} />
      </div>
    </>
  );
};

ReportesHomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout user={usersArray[0]}>{page}</MainLayout>;
};

export default ReportesHomePage;
