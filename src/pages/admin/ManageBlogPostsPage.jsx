import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { Button } from '../../components/ui/Button';

const ManageBlogPostsPage = () => {
  const { posts, deletePost, loading, error } = useBlog();

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
      } catch (err) {
        console.error("Failed to delete post:", err);
      }
    }
  };

  if (loading) {
    return <div className="text-xl">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-xl text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
        <Link to="/admin/blog/new">
          <Button>Add New Post</Button>
        </Link>
      </div>

      <div className="bg-surface border border-gray-800 overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-background text-left text-sm font-semibold uppercase tracking-wider text-secondary">
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Author</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="p-4 font-medium text-primary">{post.title}</td>
                <td className="p-4 text-dark-text">{post.category}</td>
                <td className="p-4 text-dark-text">{post.author}</td>
                <td className="p-4 text-dark-text">{post.date}</td>
                <td className="p-4 flex gap-2">
                  <Link to={`/admin/blog/edit/${post.id}`}>
                    <Button variant="secondary" className="py-1 px-3 text-xs">
                      Edit
                    </Button>

                  </Link>
                  <Button
                    onClick={() => handleDelete(post.id)}
                    className="py-1 px-3 text-xs bg-red-800/50 text-red-300 hover:bg-red-800"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBlogPostsPage;
