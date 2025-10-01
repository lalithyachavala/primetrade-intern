
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '../components/TextField';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6) });

export default function Register() {
  const navigate = useNavigate();
  const { register: reg, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
  const { register: doRegister } = useAuth();

  const onSubmit = handleSubmit(async (v: any) => { await doRegister(v.name, v.email, v.password); navigate('/app'); });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded-2xl shadow w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <TextField label="Name" error={errors.name} {...reg('name')} />
        <TextField label="Email" error={errors.email} type="email" {...reg('email')} />
        <TextField label="Password" error={errors.password} type="password" {...reg('password')} />
        <button disabled={isSubmitting} className="w-full rounded-xl bg-black text-white py-2">{isSubmitting ? '...' : 'Register'}</button>
      </form>
    </div>
  );
}
