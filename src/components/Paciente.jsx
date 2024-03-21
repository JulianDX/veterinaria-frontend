import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {
  const { setEdicion, eliminarPaciente } = usePacientes();

  const { email, fecha_alta, nombre, propietario, sintomas } = paciente;

  const formatearFecha = (fecha_alta) => {
    const fecha = new Date(fecha_alta);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  return (
    <div className="mx-5 my-10 bg-black bg-opacity-25 shadow-md px-5 py-5 rounded-xl">
      <p className="font-extrabold text-cyan-400 my-2">
        Nombre:{" "}
        <span className="font-semibold normal-case text-white">{nombre}</span>
      </p>
      <p className="font-extrabold text-cyan-400 my-2">
        Propietario:{" "}
        <span className="font-semibold normal-case text-white">
          {propietario}
        </span>
      </p>
      <p className="font-extrabold text-cyan-400 my-2">
        Email de Contacto:{" "}
        <span className="font-semibold normal-case text-white">{email}</span>
      </p>
      <p className="font-extrabold text-cyan-400 my-2">
        Fecha de Alta:{" "}
        <span className="font-semibold normal-case text-white">
          {formatearFecha(fecha_alta)}
        </span>
      </p>
      <p className="font-extrabold text-cyan-400 my-2">
        Síntomas:{" "}
        <span className="font-semibold normal-case text-white">{sintomas}</span>
      </p>
      <div className="flex justify-between my-5 flex-col lg:flex-row">
        <button
          onClick={() => {
            setEdicion(paciente);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          type="button"
          className="py-2 px-10 bg-sky-600 md:hover:bg-sky-700 text-white rounded-lg font-bold"
        >
          Editar
        </button>
        <button
          type="button"
          className="py-2 px-10 bg-red-700 md:hover:bg-red-800 text-white rounded-lg my-5 lg:my-0 font-bold"
          onClick={() => eliminarPaciente(paciente._id, paciente.nombre)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Paciente;
