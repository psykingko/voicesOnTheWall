'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminAuthenticated, setAdminAuthenticated, checkAdminPassword } from '@/lib/utils';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    if (isAdminAuthenticated()) {
      router.push('/admin/upload');
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (checkAdminPassword(password)) {
        setAdminAuthenticated(true);
        router.push('/admin/upload');
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
      setLoading(false);
    }, 300);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-cream-100 border border-gray-200 rounded-lg p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600 mb-8">
            Enter your password to access the admin panel
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-cream-200"
                placeholder="Enter admin password"
                required
                autoFocus
              />
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-cream-300 rounded-lg">
            <p className="text-xs text-gray-600">
              <strong>Note:</strong> This is a front-end only application. 
              The default password is <code className="bg-cream-200 px-1 rounded">admin123</code>. 
              In a production environment, this would be handled by a secure backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

