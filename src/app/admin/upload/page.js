'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAdminAuthenticated, generateSlug, getCurrentDate, saveBlogToLocalStorage } from '@/lib/utils';

export default function AdminUpload() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (!isAdminAuthenticated()) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    // Validate inputs
    if (!title.trim()) {
      setError('Please enter a title');
      setLoading(false);
      return;
    }

    if (!content.trim()) {
      setError('Please enter blog content');
      setLoading(false);
      return;
    }

    // Generate slug and date
    const slug = generateSlug(title);
    const date = getCurrentDate();
    const excerpt = content.substring(0, 150).trim() + (content.length > 150 ? '...' : '');

    // Create blog post object
    const blogPost = {
      title: title.trim(),
      slug,
      content: content.trim(),
      date,
      excerpt,
    };

    // Save to localStorage
    const saved = saveBlogToLocalStorage(blogPost);

    if (saved) {
      setSuccess(true);
      setTitle('');
      setContent('');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } else {
      setError('Failed to save blog post. Please try again.');
    }

    setLoading(false);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminAuthenticated');
      router.push('/');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Upload</h1>
          <div className="flex items-center space-x-3">
            <Link
              href="/admin"
              className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-cream-300 transition-colors bg-cream-100"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-cream-300 transition-colors bg-cream-100"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-cream-100 border border-gray-200 rounded-lg p-8 shadow-sm">
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✓ Blog post published successfully!
              </p>
              <p className="text-sm text-green-600 mt-1">
                Your post has been saved and is now visible on the blog.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-cream-200"
                placeholder="Enter blog post title"
                required
              />
              {title && (
                <p className="mt-2 text-sm text-gray-500">
                  Slug: <code className="bg-cream-300 px-2 py-1 rounded">{generateSlug(title)}</code>
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Blog Body <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-y font-mono text-sm bg-cream-200"
                placeholder="Write your blog post content here..."
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                {content.length} characters
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                The blog post will be saved to your browser's local storage.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {loading ? 'Publishing...' : 'Publish Blog'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 p-4 bg-primary-100 border border-primary-300 rounded-lg">
          <h3 className="text-sm font-semibold text-primary-800 mb-2">Tips for writing:</h3>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Use double line breaks to create paragraphs</li>
            <li>Use <code className="bg-cream-300 px-1 rounded">## </code> for headings</li>
            <li>Use <code className="bg-cream-300 px-1 rounded">### </code> for subheadings</li>
            <li>Use <code className="bg-cream-300 px-1 rounded">```</code> for code blocks</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

