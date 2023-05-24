import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";

// TODO change path of types
import { NextPageWithLayout } from "../../pages/_app";
import { Add, Feed, Search } from "@mui/icons-material";

import Head from "next/head";

import { formatLabel } from "@/utils/format";
import TablaReutilizable from "./TablaReutilizable";
import CrearReporteDrawer from "../drawers/CrearReporteDrawer";
import DetailDrawer, { DrawerInfo } from "../drawers/DetailDrawer";

/**
 * TIPADOS
 */
export type InputType =
  | "text"
  | "email"
  | "number"
  | "date"
  | "select"
  | "checkmark";

export type RowValues = Record<string, string | number | Date> & {
  id: number;
  type: InputType;
};

export interface TableInfo {
  rows: RowValues[];
  visibleColumns: (keyof RowValues)[];
}

export interface FormValue {
  type: InputType;
  label: string;
  /**
   * El id tiene que hacer match con el atributo que se quiere colocar del RowValues
   */
  inputId: string;
  maxWidth?: boolean;
  selectValues?: SelectValue[];
  maxInputLength?: number;
}

export interface SelectValue {
  value: string;
  label?: string;
}

interface ReporteProps {
  selectValues: SelectValue[];
  tableInfo: TableInfo;
  drawerInfo: DrawerInfo;
  newButtonLabel?: string;
  categories?: string[];
  displayReportes?: boolean;
}

/**
 * FIN TIPADOS
 */

const BusquedaContent: FC<ReporteProps> = ({
  selectValues,
  tableInfo,
  drawerInfo,
  newButtonLabel,
  categories,
  displayReportes = false,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReporteDrawerOpen, setIsReporteDrawerOpen] = useState(false);
  const [drawerDetails, setDrawerDetails] = useState<RowValues | undefined>();

  const handleToggleDrawer = (userData?: RowValues) => {
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
      <DetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => handleToggleDrawer()}
        itemData={drawerDetails}
        drawerInfo={drawerInfo}
      />
      <CrearReporteDrawer
        onClose={() => handleToggleDrawerInforme()}
        isOpen={isReporteDrawerOpen}
        selectValues={selectValues}
        markValues={drawerInfo.markValues}
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
            {selectValues.length === 1 ? (
              <Box
                sx={{ padding: 1, border: "2px solid red", borderRadius: 4 }}
              >
                <Typography variant="h4" sx={{ textDecoration: "underline" }}>
                  {selectValues[0]?.label || formatLabel(selectValues[0].value)}
                </Typography>
              </Box>
            ) : (
              <FormControl fullWidth>
                <InputLabel id="select-label">Seleccionar</InputLabel>
                <Select
                  labelId="select-label"
                  id="simple-select"
                  value={selectValues[0].value}
                  label="Seleccionar"
                  onChange={() => {}}
                >
                  {selectValues.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label || formatLabel(value)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
          <Box>
            <Box
              sx={{ border: "2px solid #a8b5ac", padding: 4, borderRadius: 4 }}
            >
              <Typography sx={{ textDecoration: "underline" }} variant="h5">
                Categoría
              </Typography>
              <br />
              {categories && (
                <FormGroup>
                  {categories.map((category, index) => {
                    return (
                      <FormControlLabel
                        key={`category-${category}`}
                        control={<Checkbox defaultChecked={index === 0} />}
                        label={category}
                      />
                    );
                  })}
                </FormGroup>
              )}
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ padding: 2 }}
          >
            {newButtonLabel && (
              <Button
                startIcon={<Add />}
                variant="contained"
                onClick={() => {
                  handleToggleDrawer();
                }}
              >
                {newButtonLabel}
              </Button>
            )}
            {displayReportes && (
              <Button
                startIcon={<Feed />}
                variant="outlined"
                onClick={() => {
                  handleToggleDrawerInforme();
                }}
              >
                Emitir reporte
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
          <TablaReutilizable
            openDrawerDetails={(details) => handleToggleDrawer(details)}
            tableInfo={tableInfo}
          />
        </Box>
      </div>
    </div>
  );
};

interface TableWithFiltersProps {
  pageTitle: string;
  drawerInfo: DrawerInfo;
  tableInfo: TableInfo;
  selectValues: SelectValue[];
  newButtonLabel?: string;
  categories?: string[];
  displayReportes?: boolean;
}

const TableWithFilters: NextPageWithLayout<TableWithFiltersProps> = ({
  pageTitle,
  selectValues,
  tableInfo,
  drawerInfo,
  newButtonLabel,
  categories,
  displayReportes,
}) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
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
            {pageTitle}
          </Typography>
        </div>
        {/* Contenido */}
        <Box>
          <BusquedaContent
            selectValues={selectValues}
            tableInfo={tableInfo}
            drawerInfo={drawerInfo}
            newButtonLabel={newButtonLabel}
            categories={categories}
            displayReportes={displayReportes}
          />
        </Box>
      </div>
    </>
  );
};

export default TableWithFilters;
