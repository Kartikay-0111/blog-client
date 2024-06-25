
import React from 'react'
import { useLoaderData, Link } from 'react-router-dom';
// import { useAuthContext } from '../hooks/useauthContext';
import profileimg from "../assets/prf-img.jpg"
import Timeago from '../components/Timeago';
export const Home = () => {
  // const { user } = useAuthContext()
  const blogs = useLoaderData()

  if (!blogs) {
    // Data is not yet available, show loading indicator or message
    return <div>Loading...</div>;
  }

  if (blogs.error) {
    // Error occurred while fetching data, show error message
    return <div>Error: {blogs.error}</div>;
  }

  return (
    <div>
      {blogs && blogs.map((blog) => {
        return (
          <div key={blog._id} className="blbox">
            <div className="blogs content backdrop-blur-xl">
              <div className="part1">

                <div className="userpf">
                  <img src={profileimg} alt="" />
                  <p>{blog.username}</p>
                </div>

                <div className="changes">
                <Timeago createdAt={blog.createdAt}/>
                </div>
              </div>
              <div className="part2">{blog.title}</div>
              <div className="part3">{blog.snippet}</div>
              <div className="part4">{blog.body.slice(0,300)}<Link className=' text-blue-400 hover:text-blue-700' key={blog._id}  to={`/blogs/${blog._id}`}>...more</Link> </div>


              <div className="part5 flex flex-col p-4"><div className="flex items-center gap-1 mb-1 ml-3"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="mr-2 text-white cursor-pointer" height="22" width="22" xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
             </div>
             <div className="text-gray-400 ml-3"><p>1 Likes</p></div></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const dataLoader = async () => {
  const user = JSON.parse(localStorage.getItem('user')); // Example: storing user in localStorage

  if (!user || !user.token) {
    return { error: 'User is not authenticated' };
  }

  try {
    const response = await fetch("http://localhost:4000/vjti/", {
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