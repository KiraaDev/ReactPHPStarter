import { useAuth } from "../../context/AuthContext"

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      Admin Dashboard
      {user?.email}
      <button className="p-3 px-6 border-1 bg-red-700 text-white" onClick={() => logout()}>Logout</button>
    </div>
  )
}
