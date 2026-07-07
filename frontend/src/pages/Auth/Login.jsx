import React from 'react';
import LoginForm from '../../components/auth/LoginForm';

export default function Login() {
  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h1 className="text-xl font-bold text-center mb-6 text-slate-800 dark:text-slate-100">
          Welcome back
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
