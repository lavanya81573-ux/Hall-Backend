import React from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import Button from '../components/common/Button';
import { Building2 } from 'lucide-react';

const NotFound = () => {
  return (
    <UserLayout>
      <div className="py-24 max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-peach-100 text-purple-900 flex items-center justify-center mx-auto border-2 border-peach-200">
          <Building2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-purple-950">404 - Page Not Found</h1>
          <p className="text-xs text-slate-500">The page or Elite Hall route you requested does not exist.</p>
        </div>
        <Link to="/">
          <Button variant="primary" size="lg" fullWidth>
            Return to Homepage
          </Button>
        </Link>
      </div>
    </UserLayout>
  );
};

export default NotFound;
