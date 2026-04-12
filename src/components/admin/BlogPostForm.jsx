import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

const BlogPostForm = ({ onSubmit, initialData = {} }) => {
  const [post, setPost] = useState({
    title: '',
    category: '',
    author: '',
    readTime: '',
    excerpt: '',
    imageUrl: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setPost({
        title: initialData.title || '',
        category: initialData.category || '',
        author: initialData.author || '',
        readTime: initialData.readTime || '',
        excerpt: initialData.excerpt || '',
        imageUrl: initialData.imageUrl || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(post);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface p-6 border border-gray-800">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-2 uppercase tracking-wider text-secondary">Post Title</label>
        <input type="text" id="title" name="title" value={post.title} onChange={handleChange} className="w-full px-4 py-3 bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2 uppercase tracking-wider text-secondary">Category</label>
          <input type="text" id="category" name="category" value={post.category} onChange={handleChange} className="w-full px-4 py-3 bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary" required />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium mb-2 uppercase tracking-wider text-secondary">Author</label>
          <input type="text" id="author" name="author" value={post.author} onChange={handleChange} className="w-full px-4 py-3 bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary" required />
        </div>
        <div>
          <label htmlFor="readTime" className="block text-sm font-medium mb-2 uppercase tracking-wider text-secondary">Read Time</label>
          <input type="text" id="readTime" name="readTime" value={post.readTime} onChange={handleChange} placeholder="e.g., 5 min read" className="w-full px-4 py-3 bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary" required />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="excerpt" className="block text-sm font-medium mb-2 uppercase tracking-wider text-secondary">Excerpt</label>
        <textarea id="excerpt" name="excerpt" rows="4" value={post.excerpt} onChange={handleChange} className="w-full px-4 py-3 bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary" required></textarea>
      </div>
      <div className="mb-6">
        <label htmlFor="imageUrl" className="block text-sm font-medium mb-2 uppercase tracking-wider text-secondary">Image URL</label>
        <input type="text" id="imageUrl" name="imageUrl" value={post.imageUrl} onChange={handleChange} className="w-full px-4 py-3 bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="https://placehold.co/600x400" required />
      </div>
      <div className="flex gap-4">
        <Button type="submit">Save Post</Button>
        <Button type="button" variant="secondary" onClick={() => navigate('/admin/blog')}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default BlogPostForm;
