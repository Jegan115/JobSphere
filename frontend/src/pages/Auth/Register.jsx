import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';

export default function Register() {
  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h1 className="text-xl font-bold text-center mb-6 text-slate-800 dark:text-slate-100">
          Create your account
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
}
