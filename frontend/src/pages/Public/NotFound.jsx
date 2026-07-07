import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../routes';

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <h1 className="text-4xl font-bold text-primary">404</h1>
      <p className="mt-2 text-slate-500">This page doesn&apos;t exist.</p>
      <Link to={ROUTES.HOME}>
        <Button className="mt-6">Back to home</Button>
      </Link>
    </div>
  );
}
