import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Items from './pages/Items';
import AddEditItem from './pages/AddEditItem';
import { AuthProvider } from './context/AuthContext';

function Private({ children }) {
  const user = JSON.parse(localStorage.getItem('df_user'));
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
          <Route path="/items" element={<Private><Items /></Private>} />
          <Route path="/items/new" element={<Private><AddEditItem /></Private>} />
          <Route path="/items/:id" element={<Private><AddEditItem /></Private>} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
