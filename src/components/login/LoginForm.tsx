import styles from "./LoginForm.module.css";
import UserContext, { User, usersArray } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const router = useRouter();

  const handleUser = () => {
    if (!selectedUser) return;
    setUser(selectedUser);
    router.push("/");
  };

  return (
    <div className={styles["FondoInicio"]}>
      <h1>Iniciar Sesión</h1>
      <form className={styles["Datos"]}>
        <select
          name="users"
          id="users"
          onChange={(algo) => {
            const value = algo.target.value;
            console.log(value);
            const user = usersArray.find((user) => user.nombre === value);
            console.log("user", user);
            setSelectedUser(user);
          }}
        >
          {usersArray.map((user) => {
            return (
              <option key={user.nombre} value={user.nombre}>
                {user.nombre} - {user.area}
              </option>
            );
          })}
        </select>
        <input type="password" placeholder="Contraseña" />
        <div className="CambiarContra">
          <a href="#">Cambiar Contraseña</a>
        </div>
      </form>
      <div className={styles["BotonAcceder"]} onClick={handleUser}>
        <button>Acceder</button>
      </div>
    </div>
  );
};

export default LoginPage;
