import React, { useState } from 'react';

export default function PostCard({ post, onLike, onComment }) {
  const [commentText, setCommentText] = useState('');

  const handleComment = async () => {
    if (!commentText.trim()) {
      return;
    }
    await onComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <article className="post-card">
      <div className="post-header">
        <div>
          <h4>{post.author.displayName || post.author.username}</h4>
          <p className="meta">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <p className="post-content">{post.content}</p>
      {post.imageUrl && <img className="post-image" src={post.imageUrl} alt="Post visual" />}
      <div className="post-actions">
        <button onClick={() => onLike(post.id)}>
          Like ({post.likeCount || post.likes?.length || 0})
        </button>
        <button onClick={() => document.getElementById(`comment-input-${post.id}`)?.focus()}>
          Comment ({post.commentCount || post.comments?.length || 0})
        </button>
      </div>
      <div className="comment-section">
        <div className="comment-input-row">
          <input
            id={`comment-input-${post.id}`}
            className="comment-input"
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className="primary-button" onClick={handleComment}>
            Post
          </button>
        </div>
        <div className="comments-list">
          {(post.comments || []).map((comment) => (
            <div key={comment.id} className="comment-item">
              <strong>{comment.author.displayName || comment.author.username}</strong>
              <span>{comment.text}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
