import React from 'react';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ post }) => {
  return (
    <article className="bg-surface overflow-hidden group">
      <Link to={`/blog/${post.id}`} className="block overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </Link>
      <div className="p-6">
        <div className="mb-3">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">{post.category}</span>
        </div>
        <h2 className="text-2xl font-serif font-bold text-primary mb-2">
          <Link to={`/blog/${post.id}`} className="hover:text-secondary transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-dark-text mb-4">
          {post.excerpt}
        </p>
        <div className="text-xs text-gray-500 uppercase tracking-wider">
          <span>By {post.author}</span>
          <span className="mx-2">&bull;</span>
          <span>{post.date}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
