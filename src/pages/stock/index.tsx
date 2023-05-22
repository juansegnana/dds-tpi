import TableWithFilters, {
  SelectValue,
  TableInfo,
} from "@/components/TableWithFilters/TableWithFilters";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { User, usersArray } from "..";
import { DrawerInfo } from "@/components/drawers/DetailDrawer";

const tableInfo: TableInfo = {
  visibleColumns: [
    "id",
    "nombre",
    "cantidad",
    "fecha_cargada",
    "tipo_de_producto",
    "categoria",
  ],
  rows: [
    {
      id: 1,
      type: "text",
      nombre: "Plástico",
      cantidad: 100,
      fecha_cargada: new Date(),
      tipo_de_producto: "materia_prima",
      nombre_proveedor: "Plastico S.A",
      calidad: "alta",
      categoria: "plastico",
    },
  ],
};

const drawerInfo: DrawerInfo = {
  mainTitle: "Gestionar Producto",
  onCloseLabel: "Desea borrar el item?",
  onCreateLabel: "Nuevo item cargado en el stock",
  formValues: [
    // TODO: no se renderiza
    {
      type: "date",
      inputId: "fecha_cargada",
      label: "Fecha cargada",
    },
    {
      type: "select",
      inputId: "tipo_stock",
      label: "Tipo",
      selectValues: [
        {
          value: "materia_prima",
          label: "Materia Prima",
        },
        // {
        //   value: "producido",
        //   label: "Producido",
        // },
      ],
    },
    {
      type: "text",
      inputId: "nombre_producto",
      label: "Nombre de Producto",
    },
    {
      type: "text",
      inputId: "nombre_proveedor",
      label: "Nombre de Proveedor",
    },
    {
      type: "number",
      inputId: "cantidad",
      label: "Cantidad (kg)",
    },
    {
      type: "select",
      inputId: "calidad",
      label: "Calidad de Plástico",
      selectValues: [
        {
          value: "buena",
          label: "Buena",
        },
        {
          value: "aceptable",
          label: "Aceptable",
        },
        {
          value: "mala",
          label: "Mala",
        },
      ],
    },
  ],
  markValues: [
    {
      value: "Químicos",
      label: "Químicos",
    },
    {
      value: "Plásticos",
      label: "Plásticos",
    },
    {
      value: "Tintes",
      label: "Tintes",
    },
    {
      value: "Muebles",
      label: "Muebles",
    },
    {
      value: "Pallets",
      label: "Pallets",
    },
    {
      value: "Envases Plast.",
      label: "Envases Plast.",
    },
  ],
};

const selectValues: SelectValue[] = [
  {
    value: "materia_prima",
    label: "Materia Prima",
  },
  {
    value: "producido",
    label: "Producido",
  },
];

const StockHomePage: NextPageWithLayout<{ user: User }> = ({
  user = usersArray[1],
}) => {
  return (
    <TableWithFilters
      pageTitle="Gestión de Stock"
      tableInfo={tableInfo}
      drawerInfo={drawerInfo}
      selectValues={selectValues}
      newButtonLabel={user.area === "compras" ? "Nuevo Producto" : undefined}
      categories={[
        "Químicos",
        "Plásticos",
        "Tintes",
        "Muebles",
        "Pallets",
        "Envases Plast.",
      ]}
      displayReportes={true}
    />
  );
};

StockHomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout user={usersArray[1]}>{page}</MainLayout>;
};

export default StockHomePage;
