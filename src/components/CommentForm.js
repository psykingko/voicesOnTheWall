'use client';

import { useState } from 'react';
import { saveComment } from '@/lib/utils';

export default function CommentForm({ postSlug, onCommentAdded }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    // Validate inputs
    if (!author.trim()) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }

    if (!content.trim()) {
      setError('Please enter a comment');
      setLoading(false);
      return;
    }

    if (content.trim().length < 3) {
      setError('Comment must be at least 3 characters long');
      setLoading(false);
      return;
    }

    // Create comment object
    const comment = {
      postSlug,
      author: author.trim(),
      content: content.trim(),
    };

    // Save comment
    const saved = saveComment(comment);

    if (saved) {
      setSuccess(true);
      setAuthor('');
      setContent('');
      
      // Notify parent component
      if (onCommentAdded) {
        onCommentAdded();
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } else {
      setError('Failed to save comment. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="bg-cream-100 border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Leave a Comment</h3>
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">✓ Your comment has been posted!</p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-cream-200"
            placeholder="Your name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Comment <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-y bg-cream-200"
            placeholder="Write your comment here..."
            required
            minLength={3}
          />
          <p className="mt-1 text-xs text-gray-500">
            {content.length} characters (minimum 3)
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
}

