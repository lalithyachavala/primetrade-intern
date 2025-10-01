
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Dashboard(){
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex gap-3 mb-4">
          <Link className={`px-3 py-1 rounded-lg border ${pathname.includes('/app/tasks')? 'bg-black text-white':''}`} to="/app/tasks">Tasks</Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
