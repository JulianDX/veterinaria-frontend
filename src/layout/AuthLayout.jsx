import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth?._id ? (
        <Navigate to="/admin" />
      ) : (
        <main className="mx-auto md:grid grid-cols-2 gap-20 p-5 md:p-20 items-center">
          <Outlet />
        </main>
      )}
    </>
  );
};

export default AuthLayout;
