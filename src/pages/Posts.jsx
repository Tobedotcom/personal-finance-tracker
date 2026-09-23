import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/pages/posts.css";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();

        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Unable to load posts.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const postsPerPage = 10;
  const startIndex = (currentPage - 1) * postsPerPage;

  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="posts-page">
      <div className="posts-header">
        <div>
          <h1>Posts</h1>
          <p>Browse posts from the JSONPlaceholder API.</p>
        </div>
      </div>

      <div className="posts-grid">
        {currentPosts.map((post) => (
          <Link to={`/posts/${post.id}`} key={post.id} className="post-card">
            <span className="post-number">#{post.id}</span>

            <h2>{post.title}</h2>

            <p>{post.body}</p>

            <span className="post-read-more">View Details →</span>
          </Link>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Posts;
