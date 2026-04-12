import React from 'react';
import { useBlog } from '../context/BlogContext';
import BlogPostCard from '../components/blog/BlogPostCard';

const BlogPage = () => {
  const { posts, loading, error } = useBlog();

  if (loading) {
    return <div className="text-center text-xl">Loading journal...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">The Journal</h1>
        <p className="text-lg text-dark-text">
          Stories, insights, and inspiration from the world of Boreland.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
