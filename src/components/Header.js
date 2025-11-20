'use client';

import Link from 'next/link';

/*
import { useEffect, useState } from 'react';
import { isAdminAuthenticated } from '@/lib/utils';
*/

export default function Header() {
  // const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   setIsAdmin(isAdminAuthenticated());
  // }, []);

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
            {/* Admin links temporarily disabled */}
          </nav>
        </div>
      </div>
    </header>
  );
}

