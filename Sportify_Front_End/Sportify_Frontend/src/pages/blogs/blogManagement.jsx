import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authenticationContext";
import API from "../../context/api";
import { colors, spacing } from "../../styles/constants";

const BlogManagement = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res =
          user.role === "ADMIN"
            ? await API.getAllBlogs()
            : await API.getUserBlogs(user.id);
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [user]);

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      await API.createBlog(user.id, newBlog);
      setNewBlog({ title: "", content: "" });
      const res = await API.getUserBlogs(user.id);
      setBlogs(res.data);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await API.deleteBlog(blogId);
      setBlogs((prev) => prev.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div style={{ padding: spacing.large }}>
      {user.role !== "ADMIN" && (
        <div
          style={{
            marginBottom: spacing.large,
            padding: spacing.medium,
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Create New Blog Post</h2>
          <form onSubmit={handleCreateBlog}>
            <div style={{ marginBottom: spacing.medium }}>
              <input
                type="text"
                placeholder="Title"
                value={newBlog.title}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: spacing.small,
                  marginBottom: spacing.small,
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
                required
              />
              <textarea
                placeholder="Content"
                value={newBlog.content}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, content: e.target.value })
                }
                style={{
                  width: "100%",
                  height: "150px",
                  padding: spacing.small,
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
                required
              />
            </div>
            <button
              type="submit"
              style={{
                padding: `${spacing.small} ${spacing.medium}`,
                backgroundColor: colors.primary,
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Publish Blog
            </button>
          </form>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: spacing.medium,
        }}
      >
        {blogs.map((blog) => (
          <div
            key={blog.id}
            style={{
              padding: spacing.medium,
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{blog.title}</h3>
            <p>{blog.content.substring(0, 100)}...</p>
            <p style={{ color: colors.textSecondary, fontSize: "0.9em" }}>
              By {blog.authorName} •{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            {(user.role === "ADMIN" || user.id === blog.authorId) && (
              <button
                onClick={() => handleDeleteBlog(blog.id)}
                style={{
                  marginTop: spacing.small,
                  padding: `${spacing.small} ${spacing.medium}`,
                  backgroundColor: colors.error,
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManagement;
