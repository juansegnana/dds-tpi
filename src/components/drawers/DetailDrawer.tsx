import { FC } from "react";
import {
  FormValue,
  RowValues,
  SelectValue,
} from "../TableWithFilters/TableWithFilters";
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
  TextField,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { DatePicker } from "@mui/x-date-pickers";
import { Add, Delete, Edit } from "@mui/icons-material";
import dayjs from "dayjs";

export interface DrawerInfo {
  onCloseLabel: string;
  onCreateLabel: string;
  /**
   * Elementos que tienen que estar en el formulario
   */
  formValues: FormValue[];
  mainTitle: string;
  markValues?: SelectValue[];
  shouldEnableEdit?: boolean;
  shouldEnableDelete?: boolean;
}

/**
 * Detalle del row de la tabla presionado
 */
interface DetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  /**
   * Valores del row seleccionado
   * Que se van a mostrar en el formulario
   */
  itemData?: RowValues;
  drawerInfo: DrawerInfo;
  // children: ReactElement;
}

const DetailDrawer: FC<DetailDrawerProps> = ({
  isOpen,
  onClose,
  itemData,
  drawerInfo,
}) => {
  const {
    onCloseLabel,
    onCreateLabel,
    formValues,
    mainTitle,
    shouldEnableEdit = true,
    shouldEnableDelete = true,
  } = drawerInfo;

  const getInputComponent = (formValue: FormValue) => {
    const {
      inputId,
      label,
      type,
      selectValues: formSelectValues,
      maxInputLength,
    } = formValue;
    const itemValue = itemData?.[inputId];
    const isItemDisabled = !!itemValue;
    const itemKey = `${inputId}-${itemValue}`;

    // CHECKMARK
    if (type === "checkmark" && formSelectValues) {
      return (
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
          <Select
            autoComplete="off"
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={itemValue}
            onChange={() => {}}
            input={<OutlinedInput label={label} />}
          >
            {formSelectValues.map((formSelect) => (
              <MenuItem
                key={`checkmark-${formSelect.value}`}
                value={formSelect.value}
              >
                <Checkbox
                  checked={
                    formSelectValues.indexOf(formSelect.value as any) > -1
                  }
                />
                <ListItemText primary={formSelect.value} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    // DATE
    if (type === "date") {
      return (
        <DatePicker
          key={itemKey}
          disabled={isItemDisabled}
          label={label}
          value={
            itemValue
              ? dayjs((itemValue as Date).toISOString().split("T")[0])
              : undefined
          }
          slotProps={{
            textField: {
              helperText: "El formato debe ser DD/MM/YYYY",
            },
          }}
          views={["day", "month", "year"]}
        />
      );
    }

    // SELECT
    if (type === "select" && formSelectValues) {
      return (
        <FormControl fullWidth key={itemKey}>
          <InputLabel id="select-label">{label}</InputLabel>
          <Select
            autoComplete="off"
            key={`${itemKey}-select`}
            labelId="select-label"
            id="simple-select"
            value={itemValue || formSelectValues[0].value}
            label={label}
            onChange={() => {}}
            disabled={isItemDisabled}
          >
            {formSelectValues.map((selectObject) => (
              <MenuItem
                key={`${itemKey}-${inputId}-${selectObject.value}`}
                value={selectObject.value}
              >
                {selectObject.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
    // STRING or NUMBER or EMAIL
    return (
      <TextField
        autoComplete="off"
        key={`${inputId}-${itemValue}-${type}`}
        fullWidth
        label={label}
        // id={inputId}
        type={type}
        value={itemValue as string | number}
        disabled={isItemDisabled}
        onInput={
          maxInputLength
            ? (e) => {
                // @ts-ignore
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, maxInputLength);
              }
            : undefined
        }
      />
    );
  };

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
                {mainTitle}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ gap: 4, width: "100%" }}
            >
              {/* <Box display="flex" sx={{ gap: 2 }}> */}
              {/* RENDER ALL FORM */}
              {formValues.map((input) => {
                return getInputComponent(input);
              })}
              {/* </Box> */}
            </Box>

            {shouldEnableEdit && (
              <Box
                display="flex"
                justifyContent="space-around"
                sx={{ width: "100%" }}
              >
                {/* {itemData && shouldEnableDelete && (
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => {
                      if (!confirm(onCloseLabel)) return;
                      onClose();
                    }}
                  >
                    Borrar
                  </Button>
                )} */}
                <Button
                  variant="contained"
                  sx={{ width: "50%" }}
                  startIcon={itemData ? <Edit /> : <Add />}
                  onClick={() => {
                    if (!itemData) {
                      alert(onCreateLabel);
                    }
                  }}
                >
                  {itemData ? "Modificar Stock" : "Crear"}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DetailDrawer;
