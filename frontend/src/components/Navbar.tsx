
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Navbar(){
  const { user, logout } = useAuth();
  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/app" className="font-semibold">Intern Dashboard</Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user?.name}</span>
          <button onClick={logout} className="px-3 py-1 rounded-lg border">Logout</button>
        </div>
      </div>
    </div>
  );
}
