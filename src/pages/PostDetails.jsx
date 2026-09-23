import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/pages/posts.css";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );

      const data = await response.json();

      setPost(data);
    }

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
   <div
  className="post-modal-overlay"
  onClick={() => navigate("/posts")}
>
  <div
    className="post-modal"
    onClick={(event) => event.stopPropagation()}
  >
    <button onClick={() => navigate("/posts")}>
      ✕
    </button>

    <h1>{post.title}</h1>

    <p>{post.body}</p>

    <div>
      <span>Post ID: {post.id}</span>
      <span>User ID: {post.userId}</span>
    </div>
  </div>
</div>
  );
}

export default PostDetails;
