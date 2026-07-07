import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t py-6 mt-8 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 text-sm text-center text-slate-500">
        <div>© {new Date().getFullYear()} JobSphere</div>
        <div className="mt-2">Built with care • Primary: <span className="font-semibold text-primary">#2563EB</span></div>
      </div>
    </footer>
  );
}
