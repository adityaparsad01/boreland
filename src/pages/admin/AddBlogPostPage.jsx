import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import BlogPostForm from '../../components/admin/BlogPostForm';

const AddBlogPostPage = () => {
  const { addPost } = useBlog();
  const navigate = useNavigate();

  const handleSubmit = (postData) => {
    addPost(postData);
    navigate('/admin/blog');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark-text mb-6">Add New Blog Post</h1>
      <BlogPostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddBlogPostPage;
