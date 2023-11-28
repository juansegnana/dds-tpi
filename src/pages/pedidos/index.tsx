import TableWithFilters, {
  SelectValue,
  TableInfo,
} from "@/components/TableWithFilters/TableWithFilters";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { User, usersArray } from "..";
import { DrawerInfo } from "@/components/drawers/DetailDrawer";

export enum EstadoPedido {
  NO_INICIADO = "no_iniciado",
  EN_PROCESO = "en_proceso",
  FINALIZADO = "finalizado",
}

const tableInfo: TableInfo = {
  visibleColumns: ["id_pedido", "cliente", "estado", "fecha"],
  rows: [
    {
      id: 1,
      id_pedido: 1,
      type: "text",
      cliente: "Plástico SRL",
      estado: EstadoPedido.EN_PROCESO,
      fecha: new Date(),
      descripcion: "Notas del pedido...",
      cantidad: 10,
      precioTotal: 1000,
      categoria: "plastico",
    },
  ],
};

const drawerInfo: DrawerInfo = {
  mainTitle: "Detalle del Pedido",
  onCloseLabel: "Desea borrar el item?",
  onCreateLabel: "Nuevo pedido guardado",
  shouldEnableModif:true,
  shouldEnableEdit:false,
  formValues: [
    {
      type: "date",
      inputId: "fecha",
      label: "Fecha pedido",
    },
    {
      type: "text",
      inputId: "cliente",
      label: "Cliente",
    },
    {
      type: "select",
      inputId: "estado",
      label: "Estado",
      selectValues: [
        {
          value: EstadoPedido.NO_INICIADO,
          label: "No iniciado",
        },
        {
          value: EstadoPedido.EN_PROCESO,
          label: "En proceso",
        },
        {
          value: EstadoPedido.FINALIZADO,
          label: "Finalizado",
        },
      ],
    },
    {
      type: "text",
      inputId: "categoria",
      label: "Categoría",
    },
    {
      type: "number",
      inputId: "cantidad",
      label: "Cantidad",
    },
    {
      type: "number",
      inputId: "precioTotal",
      label: "Precio Total",
    },
    {
      type: "text",
      inputId: "descripcion",
      label: "Nota del pedido",
    },
  ],
  markValues: [
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
    value: EstadoPedido.NO_INICIADO,
    label: "No iniciado",
  },
  {
    value: EstadoPedido.EN_PROCESO,
    label: "En proceso",
  },
  {
    value: EstadoPedido.FINALIZADO,
    label: "Finalizado",
  },
];

const PedidosHomePage: NextPageWithLayout<{ user: User }> = ({
  user = usersArray[2],
}) => {
  return (
    <TableWithFilters
      pageTitle="Gestión de Pedidos"
      tableInfo={tableInfo}
      drawerInfo={drawerInfo}
      selectValues={selectValues}
      categories={["Muebles", "Pallets", "Envases Plast."]}
      displayReportes={false}
    />
  );
};

PedidosHomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default PedidosHomePage;
