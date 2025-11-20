'use client';

export default function AdminDashboard() {
  return null;
}

/*
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAdminAuthenticated, combineBlogs, getBlogsFromLocalStorage, deleteBlogFromLocalStorage, isBlogEditable } from '@/lib/utils';
import initialBlogs from '@/data/blogs.json';

export default function AdminDashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    
    loadBlogs();
  }, [router]);

  const loadBlogs = () => {
    const allBlogs = combineBlogs(initialBlogs);
    setBlogs(allBlogs);
    setLoading(false);
  };

  const handleDelete = (blogId, blogTitle) => {
    setDeleteConfirm({ id: blogId, title: blogTitle });
  };

  const confirmDelete = () => {
    if (deleteConfirm && deleteBlogFromLocalStorage(deleteConfirm.id)) {
      loadBlogs();
      setDeleteConfirm(null);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminAuthenticated');
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-text mb-2">Admin Dashboard</h1>
            <p className="text-text-light">Manage all blog posts</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/upload"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              + New Post
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-cream-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal * /
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-cream-100 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete &quot;{deleteConfirm.title}&quot;? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 border border-gray rounded-lg hover:bg-cream-dark transition-colors bg-white"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Blogs Table * /
        <div className="bg-white border border-gray rounded-lg overflow-hidden">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-muted mb-4">No blog posts yet.</p>
              <Link
                href="/admin/upload"
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cream-300 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs.map((blog) => {
                    const editable = isBlogEditable(blog.id);
                    return (
                      <tr key={blog.id} className="hover:bg-cream-dark">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            href={`/blogs/${blog.slug}`}
                            className="text-text font-medium hover:text-primary transition-colors"
                          >
                            {blog.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                          {new Date(blog.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editable ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary-dark">
                              Local Storage
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cream-dark text-text">
                              Initial Data
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              href={`/blogs/${blog.slug}`}
                              className="text-primary-600 hover:text-primary-700 cursor-pointer"
                            >
                              View
                            </Link>
                            {editable ? (
                              <>
                                <Link
                                  href={`/admin/edit/${blog.id}`}
                                  className="text-primary-600 hover:text-primary-700 cursor-pointer"
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={() => handleDelete(blog.id, blog.title)}
                                  className="text-red-600 hover:text-red-700 cursor-pointer"
                                >
                                  Delete
                                </button>
                              </>
                            ) : (
                              <span className="text-gray-400 cursor-not-allowed" title="Initial posts cannot be edited or deleted">
                                Edit
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-primary-light border border-primary rounded-lg">
          <p className="text-sm text-primary-dark">
            <strong>Note:</strong> Only posts saved via the admin panel (stored in localStorage) can be edited or deleted. 
            Initial posts from the JSON file are read-only.
          </p>
        </div>
      </div>
    </div>
  );
}
*/
