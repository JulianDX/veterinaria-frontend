import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import axiosCliente from "../config/axios";
import usePacientes from "../hooks/usePacientes";

const Login = () => {
  const { setPacientes } = usePacientes();
  const { setAuth } = useAuth();

  useEffect(() => {
    setPacientes([]);
    setAuth({});
  }, []);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setAlerta({ msg: "Hay campos vacíos", error: true });
      return;
    }
    try {
      const peticion = await axiosCliente.post("/veterinarios/login", {
        email,
        password,
      });
      localStorage.setItem("token", peticion.data.token);
      setAuth(peticion.data);
      navigate("/admin");
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-white font-black text-5xl text-center md:text-left">
          Inicia Sesión y Administra tus{" "}
          <span className="text-cyan-300">Pacientes</span>
        </h1>
      </div>
      <div className="mt-5 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-black p-5 bg-opacity-30">
        {msg && <Alerta alerta={alerta} />}
        <form className="mt-5" onSubmit={handleSubmit}>
          <div>
            <label className="uppercase text-white block text-xl font-bold">
              Email
            </label>{" "}
            <input
              type="email"
              placeholder="Ingresa un Email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-white block text-xl font-bold">
              Contraseña
            </label>{" "}
            <input
              type="password"
              placeholder="Ingresa tu Contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            className="bg-cyan-600 transition-colors duration-slow w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 cursor-pointer md:hover:bg-cyan-700 md:w-auto"
            type="submit"
            value="Iniciar Sesión"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center text-white" to="/registrar">
            ¿No tienes una cuenta?{" "}
            <span className="text-cyan-400 font-semibold">Regístrate</span>
          </Link>
          <Link
            className="block text-center text-white underline"
            to="/olvide-password"
          >
            Olvidé mi Contraseña
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
