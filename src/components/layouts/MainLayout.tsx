import Head from "next/head";
import Image from "next/image";
import { Avatar, Box, Breadcrumbs, Typography } from "@mui/material";
import { FC, ReactNode, useContext, useState } from "react";
import Link from "next/link";
import { User } from "@/pages";
import { useRouter } from "next/router";
import UserContext, { usersArray } from "@/contexts/UserContext";

const BreadcrumbsComponent: FC<{
  numberOfRoutes: number;
  routesFormatted: string[];
}> = ({ numberOfRoutes, routesFormatted }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {numberOfRoutes === 0 ? (
        <Typography color="text.primary">Inicio</Typography>
      ) : (
        <Link color="inherit" href="/">
          Inicio
        </Link>
      )}
      {numberOfRoutes > 0 &&
        routesFormatted.map((route, index) => {
          const isLastPage = index === numberOfRoutes - 1;
          const pathFormatted = `/${routesFormatted
            .splice(0, index)
            .join("/")}`;
          const labelFormatted = `${route[0].toUpperCase()}${route
            .split("")
            .splice(1, route.length)
            .join("")}`;

          if (isLastPage) {
            return (
              <Typography color="text.primary" key={route}>
                {labelFormatted}
              </Typography>
            );
          }
          return (
            <Link
              key={route}
              color={"inherit"}
              // TODO: chequear route!
              href={pathFormatted}
            >
              {labelFormatted}
            </Link>
          );
        })}
    </Breadcrumbs>
  );
};

const MainLayout: FC<{
  // user?: User;
  children: ReactNode;
  variant?: "login";
}> = ({ children, variant }) => {
  // const { user } = useContext(UserContext);

  const router = useRouter();
  const routesFormatted = router.asPath.split("/").filter((x) => x);
  const numberOfRoutes = routesFormatted.length;

  const [currentUser, setCurrentUser] = useState<User>(usersArray[1]);
  console.log("layout currentUser", currentUser);

  console.log("currentUser", currentUser);

  const handleSetUser = (user: User) => {
    setCurrentUser(user);
  };

  return (
    <>
      <Head>
        <title>TPI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ width: "100hw" }}>
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
            {currentUser && (
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
                <Typography color="white">{currentUser.nombre}</Typography>
              </Box>
            )}
          </div>
        </div>
        {/* Breadcrumb */}
        {variant !== "login" && (
          <div
            style={{
              width: "100%",
              padding: 8,
              paddingLeft: 45,
              backgroundColor: "white",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <BreadcrumbsComponent
              numberOfRoutes={numberOfRoutes}
              routesFormatted={routesFormatted}
            />
            <Box sx={{ marginLeft: 16 }}>
              <Typography variant="caption" fontSize={14} color="text.primary">
                Area: {currentUser.area}
              </Typography>
            </Box>
          </div>
        )}
        {/* Children */}
        <UserContext.Provider
          value={{ user: currentUser, setUser: handleSetUser }}
        >
          {children}
        </UserContext.Provider>
      </main>
    </>
  );
};

export default MainLayout;
