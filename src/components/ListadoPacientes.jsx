import usePacientes from "../hooks/usePacientes";
import { useEffect, useState } from "react";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const { obtenerPacientes, pacientes, cargando } = usePacientes();
  const [pacientesCargados, setPacientesCargados] = useState(false);

  useEffect(() => {
    const cargarPacientes = async () => {
      await obtenerPacientes();
      setPacientesCargados(true);
    };

    cargarPacientes();
  }, [cargando]); // Pasamos un array vacío como segundo argumento para ejecutar este efecto solo una vez

  return (
    <>
      {pacientesCargados && pacientes.length ? (
        <>
          <div>
            <h2 className="text-center text-3xl text-white font-extrabold">
              Lista Pacientes
            </h2>
            <p className="font-semibold text-white text-xl text-center mb-7">
              Administra tus{" "}
              <span className="text-cyan-400">Pacientes y Citas</span>
            </p>
            {pacientes.map((paciente) => {
              return <Paciente key={paciente._id} paciente={paciente} />;
            })}
          </div>
        </>
      ) : (
        <>
          <div>
            <h2 className="text-center text-3xl text-white font-extrabold">
              No hay pacientes
              <p className="font-semibold text-white text-xl text-center mb-7">
                Agrega Pacientes y{" "}
                <span className="text-cyan-400">Aparecerán aquí</span>
              </p>
            </h2>
          </div>
        </>
      )}
    </>
  );
};

export default ListadoPacientes;
