import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import Sidebar from '../components/ui/Sidebar';
import Footer from '../components/ui/Footer';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex gap-6">
        <Sidebar />
        <main className="flex-1">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-card p-6">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
