import { createContext, useState, useEffect } from "react";
import axiosCliente from "../config/axios";
import Swal from "sweetalert2";

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [paciente, setPaciente] = useState({});

  const obtenerPacientes = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const peticion = await axiosCliente.get("/pacientes", config);
      setPacientes(peticion.data);
      setCargando(false);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (paciente?.id) {
      try {
        const peticion = await axiosCliente.put(
          `/pacientes/${paciente.id}`,
          paciente,
          config
        );
        const pacientesActualizados = pacientes.map((pacientedb) =>
          pacientedb._id === paciente.id ? peticion.data : pacientedb
        );
        setPacientes(pacientesActualizados);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    } else {
      try {
        const peticion = await axiosCliente.post(
          "/pacientes",
          paciente,
          config
        );
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } =
          peticion.data;
        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };

  const eliminarPaciente = (id, nombre) => {
    Swal.fire({
      title: `¿Desea eliminar a ${nombre}?`,
      text: "¡No podrá revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          axiosCliente.delete(`/pacientes/${id}`, config);
          setPacientes(pacientes.filter((paciente) => paciente._id !== id));
        } catch (error) {
          console.log(error.response.data.msg);
        }
        Swal.fire("Eliminado", "El registro ha sido eliminado.", "success");
      }
    });
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        obtenerPacientes,
        cargando,
        setEdicion,
        paciente,
        eliminarPaciente,
        setPaciente,
        setPacientes,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export { PacientesProvider };

export default PacientesContext;
