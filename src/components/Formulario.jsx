import { useState, useRef, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const { guardarPaciente, paciente, setPaciente } = usePacientes();

  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha_alta, setFechaAlta] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);

  const [visible, setVisible] = useState(false);

  const [alerta, setAlerta] = useState({});
  const primerParrafoRef = useRef(null);

  useEffect(() => {
    if (alerta.msg && primerParrafoRef.current) {
      primerParrafoRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (paciente?._id) {
      // Crear un objeto de fecha de JavaScript
      const fecha = new Date(paciente.fecha_alta);

      // Obtener los componentes de la fecha (año, mes y día)
      const año = fecha.getFullYear();
      const mes = ("0" + (fecha.getMonth() + 1)).slice(-2); // Agregar un cero inicial si el mes es de un solo dígito
      const dia = ("0" + fecha.getDate()).slice(-2); // Agregar un cero inicial si el día es de un solo dígito

      // Formatear la fecha en el formato "yyyy-MM-dd"
      const fechaFormateada = `${año}-${mes}-${dia}`;

      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFechaAlta(fechaFormateada);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [alerta, paciente]);

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, propietario, email, sintomas, fecha_alta].includes("")) {
      setAlerta({
        msg: "Hay campos vacíos",
        error: true,
      });
      return;
    }

    guardarPaciente({ id, nombre, propietario, email, sintomas, fecha_alta });

    setAlerta({
      msg: "Guardado Correctamente",
    });

    setPaciente({});
    setNombre("");
    setPropietario("");
    setEmail("");
    setFechaAlta("");
    setSintomas("");
    setId(null);
  };

  const limpiarFormulario = (e) => {
    e.preventDefault();
    setPaciente({});
    setNombre("");
    setPropietario("");
    setEmail("");
    setFechaAlta("");
    setSintomas("");
    setId(null);
  };

  const { msg } = alerta;

  return (
    <>
      <button
        className="bg-white transition-colors duration-slow w-full p-3 text-cyan-950 font-bold cursor-pointer rounded-lg mb-4 md:hidden"
        onClick={handleClick}
      >
        {visible ? "Ocultar Formulario" : "Mostrar Formulario"}
      </button>
      <div className={`md:block ${!visible ? "hidden" : ""}`}>
        <h2 className="text-center text-3xl text-white font-extrabold">
          Agrega un Paciente
        </h2>
        <p
          ref={primerParrafoRef}
          className="font-semibold text-white text-xl text-center mb-7"
        >
          Añade tus pacientes y{" "}
          <span className="text-cyan-400">Adminístralos</span>
        </p>
        {msg && <Alerta alerta={alerta} />}
        <form action="/admin" onSubmit={handleSubmit}>
          <div className="flex items-center mb-6">
            <div className="w-4 h-4 text-white">
              <svg
                data-slot="icon"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="cursor-pointer"
                onClick={limpiarFormulario}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                ></path>
              </svg>
            </div>
            <button onClick={limpiarFormulario} className="text-white ml-2">
              Limpiar formulario
            </button>
          </div>
          <div className="mb-5">
            <label htmlFor="mascota" className="text-white font-semibold">
              Nombre Mascota
            </label>
            <input
              type="text"
              id="mascota"
              placeholder="Nombre Mascota"
              className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="propietario" className="text-white font-semibold">
              Nombre Propietario/a
            </label>
            <input
              type="text"
              id="propietario"
              placeholder="Nombre Propietario"
              className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
              value={propietario}
              onChange={(e) => setPropietario(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="text-white font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email del Propietario"
              className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="fecha_alta" className="text-white font-semibold">
              Fecha de Alta
            </label>
            <input
              type="date"
              id="fecha_alta"
              className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
              value={fecha_alta}
              onChange={(e) => setFechaAlta(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="sintomas" className="text-white font-semibold">
              Síntomas Mascota
            </label>
            <textarea
              id="sintomas"
              placeholder="¿Qué síntomas está presentando la mascota?"
              className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md resize-none"
              cols="30"
              rows="6"
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
            />
          </div>
          <input
            className="bg-sky-600 md:hover:bg-sky-700 transition-colors duration-slow w-full p-3 text-white font-bold cursor-pointer rounded-lg"
            type="submit"
            value={paciente?._id ? "Guardar Cambios" : "Agregar Paciente"}
          />
        </form>
      </div>
    </>
  );
};

export default Formulario;
