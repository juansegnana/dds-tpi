import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { NextPageWithLayout } from "./_app";

import MainLayout from "../components/layouts/MainLayout";
import ButtonMain from "../components/ButtonMain";

import { Typography } from "@mui/material";
import { Info } from "@mui/icons-material";
import UserContext, { UserContextType } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import DetailDrawer from "@/components/drawers/DetailDrawer";

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
    label: "Gestión de Clientes y Proveedores",
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
    href: "/#nuevo_producto",
  },
  // STOCK
  {
    label: "Reporte de Stock",
    roleNeeded: ["administracion", "ventas", "gerencial"],
    href: "/stock",
  },
  {
    label: "Gestión de Stock",
    roleNeeded: ["compras", "produccion"],
    href: "/stock",
  },
  // PRODUCCIÓN
  {
    label: "Gestión de Pedidos",
    roleNeeded: ["ventas", "produccion"],
    href: "/pedidos",
  },
  // GERENCIAL
  {
    label: "Reporte de Clientes y Proveedores",
    roleNeeded: ["gerencial"],
    href: "/clientes",
  },
  {
    label: "Reporte de Compras",
    roleNeeded: ["gerencial"],
    href: "/compras",
  },
];

const Home: NextPageWithLayout<{
  mainPageButtons: AreaButton[];
}> = ({ mainPageButtons = mainPageButtonsArr }) => {
  const { user } = useContext(UserContext) as UserContextType;
  // console.log("homepage", user);

  const buttonsForUser = useMemo(() => {
    const array = mainPageButtons.filter((button) =>
      button.roleNeeded.includes(user.area)
    );
    return array;
  }, [mainPageButtons, user.area]);

  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false);
  const router = useRouter();
  // if `#nuevo_producto` is in the URL, open the modal
  useEffect(() => {
    if (router.asPath.includes("#nuevo_producto")) {
      setIsCreateProductOpen(true);
    }
  }, [router.asPath]);

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
        <DetailDrawer
          drawerInfo={{
            onCreateLabel: "Nuevo producto creado",
            formValues: [
              {
                type: "select",
                label: "Tipo de producto",
                inputId: "tipo",
                selectValues: [
                  {
                    value: "materia prima",
                    label: "Materia prima",
                  },
                  {
                    value: "producto fabricado",
                    label: "Producto Fabricado",
                  },
                ],
              },
              {
                label: "Nombre del producto",
                inputId: "nombre",
                type: "text",
              },
              {
                label: "Descripción",
                inputId: "descripcion",
                type: "text",
              },
            ],
            mainTitle: "Nuevo producto",
            shouldEnableEdit: true,
            onCloseLabel: "Cerrar",
          }}
          isOpen={isCreateProductOpen}
          onClose={() => {
            setIsCreateProductOpen(false);
            router.push("/");
          }}
        />
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
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
