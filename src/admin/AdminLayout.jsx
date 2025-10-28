import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isUserAdmin } from '../lib/supabaseAdmin';

export default function AdminLayout() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  async function checkAdminAccess() {
    try {
      const admin = await isUserAdmin();
      if (!admin) {
        navigate('/');
        return;
      }
      setIsAdmin(true);
    } catch (error) {
      console.error('Auth check failed:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">CenasOcta Admin Panel</h1>
          <nav className="mt-4">
            <a href="/admin" className="text-blue-500 hover:text-blue-700 mr-4">Invoices</a>
            <a href="/" className="text-blue-500 hover:text-blue-700">Back to Site</a>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
