import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosCliente from "../config/axios";
import Alerta from "../components/Alerta";

const ReestablecerPassword = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [validado, setValidado] = useState(false);
  const [reestablecido, setReestablecido] = useState(false);
  const params = useParams();

  useEffect(() => {
    const verificarToken = async () => {
      try {
        await axiosCliente.get(`/veterinarios/forgot/${params.token}`);
        setValidado(true);
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }
    };
    verificarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([password, setPassword].includes("")) {
      setAlerta({ msg: "Hay campos vacíos", error: true });
      return;
    }

    if (password !== rePassword) {
      setAlerta({ msg: "Las contraseñas no son iguales", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña es muy corta, debe contener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const peticion = await axiosCliente.post(
        `/veterinarios/forgot/${params.token}`,
        {
          password,
        }
      );
      setAlerta({ msg: peticion.data.msg });
      setReestablecido(true);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-white font-black text-5xl text-center md:text-left">
          Reestablece tu Contraseña y Administra tus{" "}
          <span className="text-cyan-300">Pacientes</span>
        </h1>
      </div>
      <div className="mt-10 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-black p-5 bg-opacity-30">
        {msg && <Alerta alerta={alerta} />}
        {validado && (
          <form className="mt-10 md:mt-0" onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-white block text-xl font-bold">
                Nueva Contraseña
              </label>{" "}
              <input
                type="password"
                placeholder="Ingresa tu Nueva Contraseña"
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
              className="bg-cyan-600 duration-slow w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 cursor-pointer md:hover:bg-cyan-700 md:w-auto"
              type="submit"
              value="Enviar Email"
            />
          </form>
        )}
        {reestablecido && <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center text-white" to="/">
            Contraseña Reestablecida{" "}
            <span className="text-cyan-400 font-semibold">Inicia Sesión</span>
          </Link>
        </nav>}
      </div>
    </>
  );
};

export default ReestablecerPassword;
