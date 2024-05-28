import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdministrarPacientes = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-8">
        <div
          className="md:w-auto bg-orange-950 p-5 bg-opacity-95 rounded-xl flex-grow lg:w-2/5"
          style={{ height: "fit-content" }}
        >
          <Formulario />
        </div>
        <div
          className="md:w-auto bg-orange-950 p-5 bg-opacity-95 rounded-xl flex-grow lg:w-3/5"
          style={{ height: "fit-content" }}
        >
          <ListadoPacientes />
        </div>
      </div>
    </>
  );
};

export default AdministrarPacientes;
