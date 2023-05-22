import styles from "./LoginForm.module.css";

const LoginPage = () => {
  return (
    <div className={styles["FondoInicio"]}>
      <h1>Iniciar Sesión</h1>
      <form className={styles["Datos"]}>
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <div className="CambiarContra">
          <a href="#">Cambiar Contraseña</a>
        </div>
      </form>
      <div className={styles["BotonAcceder"]}>
        <button>Acceder</button>
      </div>
    </div>
  );
};

export default LoginPage;
