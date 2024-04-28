
import React from 'react'
import { useLoaderData } from 'react-router-dom';

export const Home = () => {
const blogs = useLoaderData()
// console.log(blogs)
//   const [blogs, setBlog] = useState([])

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     const response = await fetch("/blogs")
  //     const json = await response.json()
  //     // console.log(json)
  //     if (response.ok) {
  //       setBlog(json.blogs);       
  //     }
  //   }
  //   fetchBlogs();
  // }, [])

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
          <a key={blog._id} className="single" href={`/blogs/${blog._id}`}>
            <h3 className="title">{blog.title}</h3>
            <p className="snippet">{blog.snippet}</p>
          </a>
        )
      })}
    </div>
  )
}

export const dataLoader = async () => {
  try {
    const response = await fetch("http://localhost:4000/vjti/blogs");
    console.log(response.ok)
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const json = await response.json();
    // console.log(json)
    return json.blogs;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};