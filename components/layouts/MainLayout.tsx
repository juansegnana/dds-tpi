import Head from "next/head";
import Image from "next/image";
import { Avatar, Box, Breadcrumbs, Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import Link from "next/link";
import { User } from "@/pages";
import { useRouter } from "next/router";

const MainLayout: FC<{
  user?: User;
  children: ReactNode;
  variant?: "login";
}> = ({ user, children, variant }) => {
  const router = useRouter();
  console.log(router.asPath);

  // TODO
  const BreadcrumbsComponent = () => {
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          MUI
        </Link>
        <Link color="inherit" href="/material-ui/getting-started/installation/">
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
    );
  };

  return (
    <>
      <Head>
        <title>TPI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{ width: "100hw" }}
        // className={`${styles.main} ${inter.className}`}
      >
        {/* Header */}
        <div style={{ width: "100%", backgroundColor: "#1565c0" }}>
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
            {user && (
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
                <Typography color="white">{user.nombre}</Typography>
              </Box>
            )}
          </div>
        </div>
        {/* Breadcrumb */}
        {/* TODO: handle */}
        {variant !== "login" && (
          <div
            style={{
              width: "100%",
              padding: 8,
              paddingLeft: 45,
              backgroundColor: "white",
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
        )}
        {/* Children */}
        <div>{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
