import { Link } from "react-router-dom";
import { useState } from "react";
import axiosCliente from "../config/axios";
import Alerta from "../components/Alerta";

const OlvidarPassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setAlerta({ msg: "El email es obligatorio", error: true });
      return;
    }
    // Enviar el email
    try {
      const url = "/veterinarios/forgot";
      const peticion = await axiosCliente.post(url, { email });
      setAlerta({ msg: peticion.data.msg });
      setEmail("");
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-white font-black text-5xl text-center md:text-left bg-orange-950 p-5 bg-opacity-95 rounded-xl">
          Recupera el Acceso a tu Cuenta y Administra tus{" "}
          <span className="text-orange-400">Pacientes</span>
        </h1>
      </div>
      <div className="mt-10 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-orange-950 p-5 bg-opacity-95">
        {msg && <Alerta alerta={alerta} />}
        <form className="mt-5 md:mt-0" onSubmit={handleSubmit}>
          <div>
            <label className="uppercase text-white block text-xl font-bold">
              Email de Recuperación
            </label>{" "}
            <input
              type="email"
              placeholder="Ingresa tu Email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            className="bg-orange-500 transition-colors duration-slow w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 cursor-pointer md:hover:bg-orange-600 md:w-auto"
            type="submit"
            value="Actualizar Contraseña"
          />
        </form>
        <nav className="mt-7 lg:flex lg:justify-between">
          <Link className="block text-center text-white" to="/">
            ¿Ya tienes una cuenta?{" "}
            <span className="text-orange-500 font-semibold">Inicia Sesión</span>
          </Link>
          <Link className="block text-center text-white" to="/registrar">
            ¿No tienes una cuenta?{" "}
            <span className="text-orange-500 font-semibold">Regístrate</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidarPassword;
