import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Avatar, Box, Breadcrumbs, Button, Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export type Area =
  | "compras"
  | "produccion"
  | "administracion"
  | "ventas"
  | "gerencial";

interface User {
  nombre: string;
  area: Area;
}

const usersArray: User[] = [
  {
    area: "compras",
    nombre: "Pepito",
  },
];

const MainLayout: FC<{ user: User; children: ReactNode }> = ({
  user = usersArray[0],
  children,
}) => {
  return (
    <>
      <Head>
        <title>TPI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{ width: "100hw" }}
        className={`${styles.main} ${inter.className}`}
      >
        {/* Header */}
        <div style={{ width: "100%", backgroundColor: "grey" }}>
          <div
            style={{
              padding: 12,
              marginLeft: 32,
              marginRight: 32,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignContent: "center" }}>
              <Image
                src={"/recycle-bin.png"}
                alt="icon"
                width={46}
                height={46}
              />
              <Typography variant="h4">Gestión Reciplas</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Usuario"
                src="https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png"
              />
              <Typography>{user.nombre}</Typography>
            </Box>
          </div>
        </div>
        {/* Breadcrumb */}
        {/* TODO: handle */}
        <div
          style={{
            width: "100%",
            padding: 8,
            marginLeft: 32,
            paddingLeft: 32,
            backgroundColor: "#978206",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              MUI
            </Link>
            <Link
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Core
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
          </Breadcrumbs>
        </div>
        {/* Children */}
        <div>{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
