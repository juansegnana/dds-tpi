import React from "react";

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
  {
    area: "gerencial",
    nombre: "Armando Paredes",
  },
];

export type UserContextType = {
  user: User;
  setUser: (newUser: User) => void;
};

const UserContext = React.createContext<UserContextType>({
  user: { nombre: "", area: "administracion" },
  setUser: () => {},
});

export default UserContext;
