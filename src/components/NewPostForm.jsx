import React, { useState } from 'react';

export default function NewPostForm({ onCreate }) {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      return;
    }
    await onCreate({ content, imageUrl: imageUrl.trim() || null });
    setContent('');
    setImageUrl('');
  };

  return (
    <section className="new-post-form">
      <h3>Create Post</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          rows="4"
        />
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL (optional)"
        />
        <button type="submit" className="primary-button">
          Share
        </button>
      </form>
    </section>
  );
}
