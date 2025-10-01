
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow rounded-2xl">
        <h1 className="text-2xl font-semibold">Frontend Intern – Demo</h1>
        <p className="mt-2 text-gray-600">Auth + Dashboard + CRUD</p>
        <div className="mt-6 flex gap-4">
          <Link className="px-4 py-2 rounded-xl bg-black text-white" to="/login">Login</Link>
          <Link className="px-4 py-2 rounded-xl border" to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
