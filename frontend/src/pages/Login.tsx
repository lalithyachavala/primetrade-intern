
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '../components/TextField';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async (v: any) => { await login(v.email, v.password); navigate('/app'); });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded-2xl shadow w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <TextField label="Email" error={errors.email} type="email" {...register('email')} />
        <TextField label="Password" error={errors.password} type="password" {...register('password')} />
        <button disabled={isSubmitting} className="w-full rounded-xl bg-black text-white py-2">{isSubmitting ? '...' : 'Login'}</button>
        <p className="text-sm text-gray-600">No account? <Link className="underline" to="/register">Register</Link></p>
      </form>
    </div>
  );
}
