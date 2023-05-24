import TableWithFilters, {
  SelectValue,
  TableInfo,
} from "@/components/TableWithFilters/TableWithFilters";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useContext } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { DrawerInfo } from "@/components/drawers/DetailDrawer";
import UserContext from "@/contexts/UserContext";

const tableInfo: TableInfo = {
  visibleColumns: [
    "id",
    "nombre_producto",
    "cantidad",
    "fecha_cargada",
    "tipo_stock",
    "categoria",
    "color",
  ],
  rows: [
    {
      id: 1,
      type: "text",
      cantidad: 100,
      fecha_cargada: new Date(),
      tipo_stock: "materia_prima",
      nombre_proveedor: "Plastico S.A",
      nombre_producto: "Plástico",
      categoria: "plastico",
      calidad: "buena",
      color: "N/A",
    },
    {
      id: 2,
      type: "text",
      cantidad: 50,
      fecha_cargada: new Date(),
      tipo_stock: "materia_prima",
      nombre_proveedor: "Tintes S.A",
      nombre_producto: "Tinte Blanco",
      categoria: "tintes",
      calidad: "N/A",
      color: "Blanco",
    },
  ],
};

const drawerInfo: DrawerInfo = {
  mainTitle: "Gestionar Compra",
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
        {
          value: "N/A",
          label: "N/A",
        },
      ],
    },
    {
      type: "select",
      inputId: "color",
      label: "Color de Tinte",
      selectValues: [
        {
          value: "Blanco",
          label: "Blanco",
        },
        {
          value: "Negro",
          label: "Negro",
        },
        {
          value: "N/A",
          label: "N/A",
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
  // shouldEnableEdit
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

const StockHomePage: NextPageWithLayout<{}> = ({}) => {
  const { user } = useContext(UserContext);

  // user.role === 'compras' entonces no se muestra producido

  // const selectForm = [];
  // selectForm.push({
  //   value: "materia_prima",
  //   label: "Materia Prima",
  // });

  // if (user.area !== "compras") {
  //   selectForm.push({
  //     value: "producido",
  //     label: "Producido",
  //   });
  // }

  return (
    <TableWithFilters
      pageTitle="Gestión de Stock"
      tableInfo={tableInfo}
      drawerInfo={{
        ...drawerInfo,
        shouldEnableEdit: !["administracion", "gerencial"].includes(user.area),
      }}
      selectValues={selectValues}
      newButtonLabel={user.area === "compras" ? "Nueva compra" : undefined}
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
  return <MainLayout>{page}</MainLayout>;
};

export default StockHomePage;
