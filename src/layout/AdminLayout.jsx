import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminLayout = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "cargando...";

  return (
    <>
      <main>
        <Header />
        {auth?._id ? (
          <main className="container w-90 mx-auto mt-10">
            <Outlet />
          </main>
        ) : (
          <Navigate to="/" />
        )}
        <Footer />
      </main>
    </>
  );
};

export default AdminLayout;
