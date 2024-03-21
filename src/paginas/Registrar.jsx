import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import axiosCliente from "../config/axios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, rePassword].includes("")) {
      setAlerta({
        msg: "Hay campos vacíos",
        error: true,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (password !== rePassword) {
      setAlerta({ msg: "Las contraseñas no son iguales", error: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña es muy corta, debe contener al menos 6 caracteres",
        error: true,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Crear el usuario en la API
    try {
      const url = `/veterinarios`;
      const peticion = await axiosCliente.post(url, { nombre, email, password });
      setAlerta({msg: peticion.data})
      window.scrollTo({ top: 0, behavior: "smooth" });
      setNombre("");
      setEmail("");
      setPassword("");
      setRePassword("");
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-white font-black text-5xl text-center md:text-left">
          Crea tu Cuenta y Administra tus{" "}
          <span className="text-cyan-300">Pacientes</span>
        </h1>
      </div>
      <div className="mt-5 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-black p-5 bg-opacity-30">
        {msg && <Alerta alerta={alerta} />}
        <form className="mt-5 md:mt-0" onSubmit={handleSubmit}>
          <div>
            <label className="uppercase text-white block text-xl font-bold">
              Nombre
            </label>{" "}
            <input
              type="text"
              placeholder="Ingresa tu Nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
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
          <div className="my-5">
            <label className="uppercase text-white block text-xl font-bold">
              Confirmar Contraseña
            </label>{" "}
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          <input
            className="bg-cyan-600 transition-colors duration-slow w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 cursor-pointer md:hover:bg-cyan-700 md:w-auto"
            type="submit"
            value="Crear Cuenta"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center text-white" to="/">
            ¿Ya tienes una cuenta?{" "}
            <span className="text-cyan-400 font-semibold">Inicia Sesión</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
