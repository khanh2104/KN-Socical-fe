import React, { useEffect, useState } from 'react';
import NewPostForm from '../components/NewPostForm';
import PostCard from '../components/PostCard';
import { createPost, fetchFeed, likePost, addComment } from '../api/posts';

export default function FeedPage() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFeed = async () => {
    try {
      setLoading(true);
      const posts = await fetchFeed();
      setFeed(posts);
    } catch (err) {
      setError('Failed to load feed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const handleCreatePost = async (post) => {
    await createPost(post);
    await loadFeed();
  };

  const handleLike = async (postId) => {
    await likePost(postId);
    setFeed((prev) => prev.map((item) => (item.id === postId ? { ...item, likeCount: (item.likeCount || item.likes?.length || 0) + 1 } : item)));
  };

  const handleComment = async (postId, text) => {
    await addComment(postId, { text });
    await loadFeed();
  };

  return (
    <div className="space-y-4">
      <NewPostForm onCreate={handleCreatePost} />
      <section className="space-y-4">
        {loading && <p className="text-center text-gray-500">Loading feed…</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && feed.length === 0 && <p className="text-center text-gray-500">No posts yet. Start the conversation.</p>}
        {feed.map((post) => (
          <PostCard key={post.id} post={post} onLike={handleLike} onComment={handleComment} />
        ))}
      </section>
    </div>
  );
}
