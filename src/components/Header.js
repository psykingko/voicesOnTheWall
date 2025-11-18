'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { isAdminAuthenticated } from '@/lib/utils';

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(isAdminAuthenticated());
  }, []);

  return (
    <header className="border-b border-gray-200 bg-cream-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-primary-600 transition-colors" style={{ fontFamily: '"Dancing Script", cursive' }}>
          Voices on The Wall
          </Link>
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-secondary-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/blogs" 
              className="text-gray-700 hover:text-secondary-600 transition-colors"
            >
              All Blogs
            </Link>
            {isAdmin ? (
              <Link 
                href="/admin" 
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Admin Dashboard
              </Link>
            ) : (
              <Link 
                href="/admin/login" 
                className="text-gray-700 hover:text-secondary-600 transition-colors"
              >
                Admin Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

