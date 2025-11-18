'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { combineBlogs, getCommentsBySlug, getCommentCount, isAdminAuthenticated, isBlogEditable } from '@/lib/utils';
import initialBlogs from '@/data/blogs.json';
import CommentForm from '@/components/CommentForm';
import CommentsList from '@/components/CommentsList';

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const allBlogs = combineBlogs(initialBlogs);
    const foundBlog = allBlogs.find(b => b.slug === slug);
    setBlog(foundBlog);
    setLoading(false);
    
    // Check admin status and editability
    if (foundBlog) {
      setIsAdmin(isAdminAuthenticated());
      setIsEditable(isBlogEditable(foundBlog.id));
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      loadComments();
    }
  }, [slug]);

  const loadComments = () => {
    const postComments = getCommentsBySlug(slug);
    setComments(postComments);
    setCommentCount(getCommentCount(slug));
  };

  const handleCommentAdded = () => {
    loadComments();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            href="/blogs"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  // Format content with basic markdown-like formatting
  const formatContent = (content) => {
    if (!content) return '';
    
    // Split by double newlines for paragraphs
    const paragraphs = content.split(/\n\n+/);
    
    return paragraphs.map((para, index) => {
      para = para.trim();
      if (!para) return null;
      
      // Check for headers
      if (para.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            {para.substring(3)}
          </h2>
        );
      }
      if (para.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            {para.substring(4)}
          </h3>
        );
      }
      
      // Check for code blocks
      if (para.startsWith('```')) {
        return (
          <pre key={index} className="bg-cream-300 p-4 rounded-lg overflow-x-auto my-4 border border-gray-200">
            <code className="text-sm text-gray-900">{para.replace(/```/g, '')}</code>
          </pre>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
          {para}
        </p>
      );
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            <svg
              className="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to All Blogs
          </Link>
          {isAdmin && isEditable && (
            <Link
              href={`/admin/edit/${blog.id}`}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
            >
              <svg
                className="mr-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Post
            </Link>
          )}
        </div>

        <article>
          <header className="mb-8">
            <time className="text-sm text-gray-500">
              {new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
              {blog.title}
            </h1>
          </header>

          <div className="prose prose-lg max-w-none">
            {formatContent(blog.content)}
          </div>
        </article>

        {/* Comments Section */}
        <div id="comments" className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Comments
            </h2>
            {commentCount > 0 && (
              <span className="text-sm text-gray-500">
                {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
              </span>
            )}
          </div>

          {/* Comment Form */}
          <div className="mb-12">
            <CommentForm postSlug={slug} onCommentAdded={handleCommentAdded} />
          </div>

          {/* Comments List */}
          <div>
            <CommentsList comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
}

