import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';

export const Details = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/vjti/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog details');
        }
        const json = await response.json();
        setBlog(json);
      } catch (error) {
        setBlog({ error: error.message });
      }
    };

    fetchBlogDetails();

  }, [id]);

  const handleDelete = () => {
    const endpoint = `http://localhost:4000/vjti/blogs/${blog._id}`;
    fetch(endpoint, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => window.location.href = '/blogs')
      .catch(err => console.log(err));
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  if (blog.error) {
    return <div>Error: {blog.error}</div>;
  }

  if (!blog.title) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="details content">
      <div key={blog._id} className="single">
        <h3 className="title">{blog.title}</h3>
        <div>
          <p className='body'>{blog.body}</p>
        </div>
        <button onClick={handleDelete} className="delete" type="button">Delete</button>
      </div>
    </div>
  );
};
