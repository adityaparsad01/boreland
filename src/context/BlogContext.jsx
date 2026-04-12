import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../api/apiService';

const BlogContext = createContext();

export const useBlog = () => {
  return useContext(BlogContext);
};

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getBlogPosts();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch blog posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const addPost = async (postData) => {
    const newPost = await apiService.createBlogPost(postData);
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const updatePost = async (postId, updatedData) => {
    const updatedPost = await apiService.updateBlogPost(postId, updatedData);
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? updatedPost : post))
    );
  };

  const deletePost = async (postId) => {
    await apiService.deleteBlogPost(postId);
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const getPostById = (postId) => {
    return posts.find(p => p.id === postId);
  };

  const value = {
    posts,
    loading,
    error,
    addPost,
    updatePost,
    deletePost,
    getPostById,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
