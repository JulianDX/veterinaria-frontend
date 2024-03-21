import { useParams, Link } from "react-router-dom";
import axiosCliente from "../config/axios";
import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const params = useParams();
  const { token } = params;
  const [confirmada, setConfirmada] = useState(false);

  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const confirmarLaCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${token}`;
        await axiosCliente(url);
        setAlerta({ msg: "La cuenta ha sido confirmada", error: false });
        setConfirmada(true);
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }
    };

    confirmarLaCuenta();
  }, []);

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-white font-black text-5xl text-center md:text-left">
          Confirmación de <span className="text-cyan-300">Cuenta</span>
        </h1>
      </div>
      <div className="mt-10 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-black p-5 bg-opacity-30">
        {msg && <Alerta alerta={alerta} />}
        {confirmada && (
          <Link className="block text-center text-white" to="/">
            ¡Tu cuenta ha sido confirmada!{" "}
            <span className="text-cyan-400 font-semibold">Inicia Sesión</span>
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
