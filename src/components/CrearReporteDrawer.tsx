import { Download } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

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
              <Button onClick={onClose} sx={{ marginLeft: -10 }}>
                <KeyboardBackspaceIcon />
              </Button>
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
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Download />}
                onClick={onClose}
              >
                Descargar informe
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CrearReporteDrawer;
