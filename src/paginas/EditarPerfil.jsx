import { useEffect, useState, useRef } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
  const { auth, actualizarPerfil } = useAuth();
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});
  const alertaRef = useRef(null); // Referencia para el elemento de la alerta

  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, email } = perfil;
    if ([nombre, email].includes("")) {
      setAlerta({
        msg: "El nombre y el email son obligatorios",
        error: true,
      });
      // Llevar al top
      alertaRef.current.scrollIntoView({ behavior: "smooth" }); // Desplazar hacia la alerta
      return;
    }
    const res = await actualizarPerfil(perfil);
    setAlerta({ msg: res.msg, error: res.error });
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />
      <div ref={alertaRef} /> {/* Referencia para el elemento de la alerta */}
      <h2 className="font-black text-3xl text-center mt-10 text-white">
        Editar Perfil
      </h2>
      <p className="text-xl mt-5 mb-10 text-center font-semibold text-white">
        Modifica tu <span className="text-cyan-400 font-bold">Información</span>
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-500">
                Nombre
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="nombre"
                value={perfil.nombre || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-500">
                Sitio Web
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="web"
                value={perfil.web || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-500">
                Teléfono
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="telefono"
                value={perfil.telefono || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-500">Email</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={perfil.email || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <input
              type="submit"
              value="Guardar Cambios"
              className="bg-cyan-700 hover:bg-cyan-800 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;
