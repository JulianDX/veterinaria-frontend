import { useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const CambiarPassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [alerta, setAlerta] = useState({});

  const { actualizarPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([password, newPassword].includes("")) {
      setAlerta({ msg: "Hay campos vacíos", error: true });
      return;
    }
    if (newPassword.length <= 5) {
      setAlerta({
        msg: "La nueva contraseña debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    const respuesta = await actualizarPassword(password, newPassword);

    if (respuesta.error) {
      setAlerta(respuesta);
    } else {
      setAlerta({ msg: respuesta.msg.data });
      setPassword("");
      setNewPassword("");
    }
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav>Perfil</AdminNav>

      <h2 className="font-black text-3xl text-center mt-10 text-white">
        Cambiar Contraseña
      </h2>
      <p className="text-xl mt-5 mb-10 text-center font-semibold text-white">
        Modifica tu <span className="text-cyan-400 font-bold">Contraseña</span>
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-500">
                Contraseña Actual
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Contraseña Actual"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-500">
                Nueva Contraseña
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Nueva Contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Cambiar Contraseña"
              className="bg-cyan-700 hover:bg-cyan-800 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;
