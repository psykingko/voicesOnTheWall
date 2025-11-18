'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { isAdminAuthenticated, getBlogById, updateBlogInLocalStorage, generateSlug } from '@/lib/utils';

export default function EditBlog() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    // Load blog data
    const blog = getBlogById(blogId);
    if (!blog) {
      setError('Blog post not found or cannot be edited.');
      setLoading(false);
      return;
    }

    setTitle(blog.title);
    setContent(blog.content);
    setLoading(false);
  }, [blogId, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSaving(true);

    // Validate inputs
    if (!title.trim()) {
      setError('Please enter a title');
      setSaving(false);
      return;
    }

    if (!content.trim()) {
      setError('Please enter blog content');
      setSaving(false);
      return;
    }

    // Generate new slug if title changed
    const slug = generateSlug(title);
    const excerpt = content.substring(0, 150).trim() + (content.length > 150 ? '...' : '');

    // Update blog post
    const updated = updateBlogInLocalStorage(blogId, {
      title: title.trim(),
      slug,
      content: content.trim(),
      excerpt,
    });

    if (updated) {
      setSuccess(true);
      
      // Redirect to admin dashboard after 2 seconds
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
    } else {
      setError('Failed to update blog post. Please try again.');
    }

    setSaving(false);
  };

  const handleCancel = () => {
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  if (error && !title) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-text mb-4">Error</h1>
          <p className="text-text-light mb-8">{error}</p>
          <button
            onClick={() => router.push('/admin')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Edit Blog Post</h1>
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-cream-300 transition-colors"
          >
            Cancel
          </button>
        </div>

        <div className="bg-cream-100 border border-gray-200 rounded-lg p-8 shadow-sm">
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✓ Blog post updated successfully! Redirecting...
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
                Changes will be saved to your browser's local storage.
              </p>
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

