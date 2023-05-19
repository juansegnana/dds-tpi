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

export interface User {
  nombre: string;
  area: Area;
}

export const usersArray: User[] = [
  {
    area: "administracion",
    nombre: "Juan",
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
    label: "Reportes",
    roleNeeded: ["administracion", "ventas"],
    href: "/reportes",
  },
  {
    label: "Gestión de Usuarios",
    roleNeeded: ["administracion"],
    href: "/usuarios",
  },
  {
    label: "Registrar producto",
    roleNeeded: ["administracion"],
    href: "/producto/new",
  },
];

const Home: NextPageWithLayout<{
  user: User;
  mainPageButtons: AreaButton[];
}> = ({ user = usersArray[0], mainPageButtons = mainPageButtonsArr }) => {
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
        <div style={{ display: "flex", gap: 120, marginTop: 140 }}>
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
  return <MainLayout user={usersArray[0]}>{page}</MainLayout>;
};

export default Home;
