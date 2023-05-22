import { FC } from "react";
import { SelectValue } from "../TableWithFilters/TableWithFilters";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { formatLabel } from "@/utils/format";
import { DatePicker } from "@mui/x-date-pickers";
import { Download } from "@mui/icons-material";
import dayjs from "dayjs";
import Link from "next/link";

export const CrearReporteDrawer: FC<{
  isOpen: boolean;
  onClose: () => void;
  selectValues: SelectValue[];
  markValues?: SelectValue[];
}> = ({ isOpen, onClose, selectValues, markValues }) => {
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
              {!!markValues ? (
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Categorías
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={markValues}
                    onChange={() => {}}
                    input={<OutlinedInput label={"Categorías"} />}
                    // renderValue={(selected) => (selected as string).join(", ")}
                  >
                    {markValues.map((markValue) => (
                      <MenuItem
                        key={`checkmark-${markValue.value}`}
                        value={markValue.value}
                      >
                        <Checkbox
                          checked={
                            markValues.indexOf(markValue.value as any) > -1
                          }
                        />
                        <ListItemText primary={markValue.value} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
              // onClick={() => {
              //   alert("Descargando informe...");
              // }}
            >
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Download />}
                // onClick={onClose} // TODO
              >
                {/* TODO: probar */}
                <Link target="_blank" href="/ejemplo_reciplas.pdf">
                  Descargar informe
                </Link>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CrearReporteDrawer;
