import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddEditItem() {
  const { id } = useParams();
  const nav = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (!id) return;
    api.get(`/items/${id}`).then(res => {
      setTitle(res.data.title);
      setDescription(res.data.description);
      setPrice(res.data.price);
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (id) await api.put(`/items/${id}`, { title, description, price });
      else await api.post('/items', { title, description, price });
      nav('/items');
    } catch (err) {
      alert('Save failed');
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={submit} className="bg-white p-4 rounded shadow max-w-lg">
        <h2 className="text-xl mb-4">{id ? 'Edit' : 'Add'} Item</h2>
        <label className="block mb-2">Title
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full border p-2 mt-1" />
        </label>
        <label className="block mb-2">Description
          <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full border p-2 mt-1" />
        </label>
        <label className="block mb-4">Price
          <input value={price} onChange={e=>setPrice(e.target.value)} className="w-full border p-2 mt-1" />
        </label>
        <button className="bg-blue-600 text-white px-3 py-1 rounded">{id ? 'Update' : 'Save'}</button>
      </form>
    </div>
  );
}
