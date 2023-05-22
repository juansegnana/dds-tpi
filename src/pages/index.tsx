import { ReactElement, useMemo } from "react";
import { NextPageWithLayout } from "./_app";

import MainLayout from "../components/layouts/MainLayout";
import ButtonMain from "../components/ButtonMain";

import { Typography } from "@mui/material";
import { Info } from "@mui/icons-material";

export type Area =
  | "compras"
  | "produccion"
  | "administracion"
  | "ventas"
  | "gerencial";

export enum AreaEnum {
  Compras = "compras",
  Produccion = "produccion",
  Administracion = "administracion",
  Ventas = "ventas",
  Gerencial = "gerencial",
}

export interface User {
  nombre: string;
  area: Area;
}

export const usersArray: User[] = [
  {
    area: "administracion",
    nombre: "Juan",
  },
  {
    area: "compras",
    nombre: "Pedro",
  },
  {
    area: "produccion",
    nombre: "Ramiro",
  },
  {
    area: "ventas",
    nombre: "María",
  },
];

interface AreaButton {
  roleNeeded: Area[];
  // Texto en el botón
  label: string;
  // Color
  color?: string;
  href: string;
}

const mainPageButtonsArr: AreaButton[] = [
  {
    label: "Gestión de Clientes/Proveedores",
    roleNeeded: ["administracion", "ventas"],
    href: "/clientes",
  },
  {
    label: "Reportes de Compras y Ventas",
    roleNeeded: ["administracion"],
    href: "/compras",
  },
  {
    label: "Gestión de Usuarios",
    roleNeeded: ["administracion"],
    href: "/usuarios",
  },
  // TODO
  {
    label: "Registrar producto",
    roleNeeded: ["administracion"],
    href: "/producto/new",
  },
  // STOCK
  {
    label: "Reporte de Stock",
    roleNeeded: ["administracion", "produccion", "ventas", "gerencial"],
    href: "/stock",
  },
  {
    label: "Gestión de Stock",
    roleNeeded: ["compras"],
    href: "/stock",
  },
  // PRODUCCIÓN
  {
    label: "Gestión de Pedidos",
    roleNeeded: ["ventas", "produccion"],
    href: "/pedidos",
  },
];

const Home: NextPageWithLayout<{
  user: User;
  mainPageButtons: AreaButton[];
}> = ({ user = usersArray[1], mainPageButtons = mainPageButtonsArr }) => {
  const buttonsForUser = useMemo(() => {
    const array = mainPageButtons.filter((button) =>
      button.roleNeeded.includes(user.area)
    );
    return array;
  }, [mainPageButtons, user.area]);

  return (
    <>
      {/* Buttons */}
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
        <Typography variant="h3" color={"white"}>
          Hola, {user.nombre}
        </Typography>
        <div
          style={{
            display: "flex",
            gap: 120,
            marginTop: 140,
            maxWidth: "60%",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {buttonsForUser.map((button) => {
            const { label, href } = button;
            return (
              <ButtonMain
                icon={<Info />}
                label={label}
                key={label}
                href={href}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout user={usersArray[1]}>{page}</MainLayout>;
};

export default Home;
