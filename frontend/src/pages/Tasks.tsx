
import { useEffect, useState } from 'react';
import api from '../lib/axios';

interface Task { _id: string; title: string; description?: string; status: 'todo'|'doing'|'done' }

export default function Tasks(){
  const [tasks, setTasks] = useState<Task[]>([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({ title: '', description: '' });

  async function fetchTasks(){
    const { data } = await api.get('/tasks', { params: { q, status } });
    setTasks(data);
  }
  useEffect(() => { fetchTasks(); }, []);

  async function create(){
    if (!form.title.trim()) return;
    await api.post('/tasks', form); setForm({ title: '', description: '' }); fetchTasks();
  }
  async function update(id: string, patch: Partial<Task>){
    await api.patch(`/tasks/${id}`, patch); fetchTasks();
  }
  async function remove(id: string){
    await api.delete(`/tasks/${id}`); fetchTasks();
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input className="border rounded-lg px-3 py-2" placeholder="Search title..." value={q} onChange={e=>setQ(e.target.value)} />
        <select className="border rounded-lg px-3" value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button className="px-4 py-2 rounded-lg border" onClick={fetchTasks}>Filter</button>
      </div>

      <div className="p-4 border rounded-xl bg-white">
        <h3 className="font-semibold mb-2">New Task</h3>
        <div className="flex gap-2">
          <input className="border rounded-lg px-3 py-2 flex-1" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
          <input className="border rounded-lg px-3 py-2 flex-1" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
          <button className="px-4 py-2 rounded-lg bg-black text-white" onClick={create}>Add</button>
        </div>
      </div>

      <ul className="space-y-2">
        {tasks.map(t => (
          <li key={t._id} className="bg-white p-4 rounded-xl border flex items-center justify-between">
            <div>
              <p className="font-medium">{t.title}</p>
              {t.description && <p className="text-sm text-gray-600">{t.description}</p>}
            </div>
            <div className="flex items-center gap-2">
              <select className="border rounded-lg px-2" value={t.status} onChange={e=>update(t._id, { status: e.target.value as any })}>
                <option value="todo">Todo</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
              <button className="px-3 py-1 rounded-lg border" onClick={()=>remove(t._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
