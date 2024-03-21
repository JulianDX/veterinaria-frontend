import React, { useState, useEffect } from "react";

const Alerta = ({ alerta }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Cuando alerta cambia, mostrarla
    setVisible(true);

    // Configurar un temporizador para ocultar la alerta después de 4 segundos
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 4000);

    // Limpiar el temporizador cuando el componente se desmonte o cuando alerta cambie
    return () => clearTimeout(timeout);
  }, [alerta]); // Reiniciar el temporizador cuando cambie la alerta

  const clases = alerta.error
    ? "bg-gradient-to-b from-red-400 to-red-600 text-center text-white font-bold rounded-xl p-2 mb-4"
    : "bg-gradient-to-b from-green-500 to-green-700 text-center text-white font-bold rounded-xl p-2 mb-4";

  return <div className={visible ? `${clases}` : "hidden"}>{alerta.msg}</div>;
};

export default Alerta;
