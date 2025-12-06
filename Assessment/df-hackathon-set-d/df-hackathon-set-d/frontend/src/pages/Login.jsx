import React, { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.token;
      const userObj = { token, ...res.data.user };
      login(userObj);
      nav('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <label className="block mb-2">Email
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border p-2 mt-1" />
        </label>
        <label className="block mb-4">Password
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border p-2 mt-1" />
        </label>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}
