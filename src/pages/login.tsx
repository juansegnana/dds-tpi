import { ReactElement } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import LoginPage from "../../components/login/LoginForm";

const Login = () => {
  return <LoginPage />;
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout variant="login">{page}</MainLayout>;
};

export default Login;
