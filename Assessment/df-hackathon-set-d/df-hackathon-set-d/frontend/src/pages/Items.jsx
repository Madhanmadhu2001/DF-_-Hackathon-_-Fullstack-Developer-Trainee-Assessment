import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Items() {
  const [items, setItems] = useState([]);
  const nav = useNavigate();

  const fetchItems = async () => {
    try {
      const res = await api.get('/items');
      setItems(res.data);
    } catch (err) {
      alert('Fetch items failed');
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete item?')) return;
    await api.delete(`/items/${id}`);
    fetchItems();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Items</h1>
        <button onClick={() => nav('/items/new')} className="bg-green-600 text-white px-3 py-1 rounded">Add</button>
      </div>

      <div className="overflow-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-2">ID</th><th>Title</th><th>Price</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(it => (
              <tr key={it.id} className="border-t">
                <td className="p-2">{it.id}</td>
                <td>{it.title}</td>
                <td>{it.price}</td>
                <td className="p-2">
                  <button onClick={() => nav(`/items/${it.id}`)} className="mr-2 text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(it.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
