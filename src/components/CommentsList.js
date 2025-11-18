'use client';

import { formatCommentDate } from '@/lib/utils';

export default function CommentsList({ comments }) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-cream-100 border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary-600 font-semibold text-sm">
                {comment.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="mb-2">
                <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                <time className="text-xs text-gray-500">
                  {formatCommentDate(comment.date)}
                </time>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

