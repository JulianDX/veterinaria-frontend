import { useState, useEffect, createContext } from "react";
import axiosCliente from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const peticion = await axiosCliente("/veterinarios/perfil", config);
        setAuth(peticion.data.veterinario);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const peticion = await axiosCliente.put(
        `/veterinarios/perfil/${datos._id}`,
        datos,
        config
      );
      setAuth(peticion.data);
      return { msg: "Perfil Actualizado", error: false };
    } catch (error) {
      return { msg: error.response.data.msg, error: true };
    }
  };

  const actualizarPassword = async (password, newPassword) => {
    const token = localStorage.getItem("token");

    const objeto = {
      password,
      newPassword,
    };

    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const peticion = await axiosCliente.put(
        "/veterinarios/cambiar-password",
        objeto,
        config
      );
      return { msg: peticion, error: false };
    } catch (error) {
      return { msg: error.response.data.msg, error: true };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        actualizarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
