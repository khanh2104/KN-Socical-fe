import React, { useState } from 'react';

export default function PostCard({ post, onLike, onComment }) {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleComment = async () => {
    if (!commentText.trim()) {
      return;
    }
    await onComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <article className="bg-white border border-gray-300 rounded-lg overflow-hidden">
      {/* Post Header */}
      <div className="p-4 pb-2">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold">
              {(post.author.displayName || post.author.username).charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">
              {post.author.displayName || post.author.username}
            </h4>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-2">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.imageUrl && (
        <div className="mb-2">
          <img className="w-full h-auto" src={post.imageUrl} alt="Post visual" />
        </div>
      )}

      {/* Post Stats */}
      <div className="px-4 py-2 text-sm text-gray-500 border-t border-gray-200">
        {(post.likeCount || post.likes?.length || 0) > 0 && (
          <span>{post.likeCount || post.likes?.length || 0} likes</span>
        )}
      </div>

      {/* Post Actions */}
      <div className="px-4 py-2 border-t border-gray-200">
        <div className="flex space-x-1">
          <button
            onClick={() => onLike(post.id)}
            className="flex-1 flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            Like
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex-1 flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Comment
          </button>
          <button className="flex-1 flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Share
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 pb-4 border-t border-gray-200">
          <div className="mt-4">
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">U</span>
              </div>
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleComment}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50"
                disabled={!commentText.trim()}
              >
                Post
              </button>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {(post.comments || []).map((comment) => (
              <div key={comment.id} className="flex space-x-2">
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">
                    {(comment.author.displayName || comment.author.username).charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-lg flex-1">
                  <strong className="text-sm font-semibold">
                    {comment.author.displayName || comment.author.username}
                  </strong>
                  <p className="text-sm text-gray-800">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
