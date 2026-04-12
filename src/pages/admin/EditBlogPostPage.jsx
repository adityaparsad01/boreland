import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import BlogPostForm from '../../components/admin/BlogPostForm';

const EditBlogPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { getPostById, updatePost } = useBlog();

  const postToEdit = getPostById(parseInt(postId, 10));

  const handleSubmit = (updatedData) => {
    updatePost(parseInt(postId, 10), updatedData);
    navigate('/admin/blog');
  };

  if (!postToEdit) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-dark-text mb-6">Post Not Found</h1>
        <p>The post you are trying to edit does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark-text mb-6">Edit Blog Post</h1>
      <BlogPostForm onSubmit={handleSubmit} initialData={postToEdit} />
    </div>
  );
};

export default EditBlogPostPage;
