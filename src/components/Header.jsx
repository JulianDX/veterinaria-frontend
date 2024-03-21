import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {

  const { cerrarSesion } = useAuth();

  return (
    <header className="py-7 bg-cyan-950">
      <div className="sm:w-90 mx-auto md:flex md:text-left justify-between max-w-90">
        <Link to="/admin">
          <h1 className="text-center font-bold text-2xl text-white">
            Administrador de Pacientes de{" "}
            <span className="text-cyan-400 font-black">Veterinaria</span>
          </h1>
        </Link>
        <nav className="flex flex-col md:flex-row items-center gap-4 mt-10 md:my-0">
          <Link
            to="/admin"
            className="text-white text-xl font-semibold hover:text-cyan-400"
          >
            Pacientes
          </Link>
          <Link
            to="/admin/perfil"
            className="text-white text-xl font-semibold hover:text-cyan-400"
          >
            Perfil
          </Link>

          <button
            className="text-white text-xl font-semibold hover:text-cyan-400"
            type="button"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
