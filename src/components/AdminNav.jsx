import { Link } from "react-router-dom"
const AdminNav = () => {
  return (
    <nav className="flex gap-3">
        <Link className="font-bold text-white hover:text-gray-300" to="/admin/perfil" >Mí Perfil</Link>
        <Link className="font-bold text-white hover:text-gray-300" to="/admin/cambiar-password" >Cambiar Contraseña</Link>
    </nav>
  )
}

export default AdminNav