'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { combineBlogs, getExcerpt, getCommentCount } from '@/lib/utils';
import initialBlogs from '@/data/blogs.json';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Combine initial blogs with localStorage blogs
    const allBlogs = combineBlogs(initialBlogs);
    setBlogs(allBlogs);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to My Simple Blog
          </h1>
          <p className="text-xl text-gray-600">
            A place where thoughts, ideas, and stories come together
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Latest Posts</h2>
          
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {blogs.map((blog) => (
                <article 
                  key={blog.id} 
                  className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <time className="text-sm text-gray-500">
                      {new Date(blog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    {getCommentCount(blog.slug) > 0 && (
                      <Link
                        href={`/blogs/${blog.slug}#comments`}
                        className="inline-flex items-center text-sm text-gray-500 hover:text-secondary-600 transition-colors"
                      >
                        <svg
                          className="mr-1 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        {getCommentCount(blog.slug)}
                      </Link>
                    )}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    <Link 
                      href={`/blogs/${blog.slug}`}
                      className="hover:text-secondary-600 transition-colors"
                    >
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {blog.excerpt || getExcerpt(blog.content)}
                  </p>
                  <Link 
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center text-secondary-600 hover:text-secondary-700 font-medium"
                  >
                    Read more
                    <svg 
                      className="ml-2 w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

