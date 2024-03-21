import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import OlvidarPassword from "./paginas/OlvidarPassword";
import ReestablecerPassword from "./paginas/ReestablecerPassword";
import AdminLayout from "./layout/AdminLayout";
import AdministrarPacientes from "./paginas/AdministrarPacientes";
import EditarPerfil from "./paginas/EditarPerfil";
import CambiarPassword from "./paginas/CambiarPassword";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* Rutas de la sección de autenticación */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="confirmar/:token" element={<ConfirmarCuenta />} />
              <Route path="olvide-password" element={<OlvidarPassword />} />
              <Route
                path="reestablecer-password/:token"
                element={<ReestablecerPassword />}
              />
            </Route>

            {/* Rutas de la sección de administración */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
