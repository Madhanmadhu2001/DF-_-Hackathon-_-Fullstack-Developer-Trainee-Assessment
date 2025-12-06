import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/items" className="p-4 bg-white rounded shadow">Manage Items</Link>
      </div>
    </div>
  );
}
