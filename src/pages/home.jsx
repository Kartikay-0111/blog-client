
import React from 'react'
import { useLoaderData, Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useauthContext';

export const Home = () => {
  const { user } = useAuthContext()
  const blogs = useLoaderData(user)

  if (!blogs) {
    // Data is not yet available, show loading indicator or message
    return <div>Loading...</div>;
  }

  if (blogs.error) {
    // Error occurred while fetching data, show error message
    return <div>Error: {blogs.error}</div>;
  }


  return (
    <div className="blogs content">
      {blogs && blogs.map((blog) => {
        return (
          <Link key={blog._id} className="single" to={`/blogs/${blog._id}`}>
            <h3 className="title">{blog.title}</h3>
            <p className="snippet">{blog.snippet}</p>
          </Link>
        )
      })}
    </div>
  )
}

export const dataLoader = async (user) => {

  try {
    const response = await fetch("http://vjti-blog-server.onrender.com/vjti/blogs", {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    // console.log(response.ok)
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const json = await response.json();
    // console.log(json)
    return json.blogs;
  } catch (error) {
    // console.error(error);
    return { error: error.message };
  }
};