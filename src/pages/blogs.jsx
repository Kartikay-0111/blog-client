import React from 'react'
import { useLoaderData, NavLink } from 'react-router-dom';
import profileimg from "../assets/prf-img.jpg"
import Timeago from '../components/Timeago';
import NoBlogs from './NoBlogs';
import BlogPostSkeleton from '../components/Skelton';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from '../hooks/useauthContext';

export const Blogs = () => {
  const { user } = useAuthContext()
  // const user = JSON.parse(localStorage.getItem('user'));
  const initialBlogs = useLoaderData();
  const [blogs, setBlogs] = useState(initialBlogs);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);

  if (isLoading) {
    return <BlogPostSkeleton />;
  }
  if (!blogs) {
    // Data is not yet available, show loading indicator or message
    return <BlogPostSkeleton />;
  }

  if (blogs.error) {
    // Error occurred while fetching data, show error message
    return (
      <div className='blbox'>
        <div className='mt-20 p-5 w-11/12 md:w-7/12 sm:w-7/12 border-white border-4 ring-4 rounded-3xl backdrop-blur-lg'>
          <div className="no-blogs w-full h-max flex flex-col relative align-middle">
            <h1 className=' text-rose-700 font-bold text-4xl mt-4'>Error</h1>
            <p className=' text-rose-300 font-bold text-2xl mt-4'>Failed to fetch blogs</p>
          </div>
        </div>
      </div>
    )
  }
  const toggleLike = async (blogId) => {
    const blog = blogs.find((blog) => blog._id === blogId);
    const liked = blog.likes.includes(user.username);
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await fetch(`${baseUrl}/vjti/${liked ? 'unlike' : 'like'}/${blogId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const updatedBlogs = blogs.map((blog) => {
          if (blog._id === blogId) {
            return {
              ...blog,
              likes: liked
                ? blog.likes.filter((username) => username !== user.username)
                : [...blog.likes, user.username],
            };
          }
          return blog;
        });

        setBlogs(updatedBlogs);

        // toast.success(`You ${liked ? 'disliked' : 'liked'} the blog`, {
        //   position: 'top-center',
        //   autoClose: 2000,
        // });
      } else {
        const json = await response.json();
        console.log(json.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="blbox">
      {blogs && blogs.length !== 0 && blogs.map((blog) => {
        const isLiked = blog.likes.includes(user.username);
        return (
          <div key={blog._id} className="blbox">
            <div className="blogs content backdrop-blur-xl">
              <div className="part1">

                <div className="userpf">
                  <img src={profileimg} alt="" />
                  <p>{blog.username}</p>
                </div>

                <div className="changes">
                  <Timeago createdAt={blog.createdAt} />
                </div>
              </div>
              <div className="part2">{blog.title}</div>
              <div className="part3">{blog.snippet}</div>
              <div className="part4"><Markdown>{blog.body.slice(0, 300)}</Markdown><NavLink className=' text-blue-400 hover:text-blue-700' key={blog._id} to={`/blogs/${blog._id}`}>...more</NavLink> </div>
              <div className="part5 flex flex-col p-4"><div className="flex items-center gap-1 mb-1 ml-3">
                <svg onClick={() => { toggleLike(blog._id) }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={`mr-2 cursor-pointer ${isLiked ? ' text-red-600' : 'text-white'}`} height="22" width="22" xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
              </div>
                <div className="text-gray-400 ml-3 prevent-select"><p>{blog.likes.length} Likes</p></div></div>
            </div>
          </div>
        )
      })}
      {blogs.length === 0 && <NoBlogs />}
    </div>
  )
}

export const myblogLoader = async () => {
  const user = JSON.parse(localStorage.getItem('user')); // Example: storing user in localStorage
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  if (!user || !user.token) {

    return { error: 'User is not authenticated' };
  }

  try {
    const response = await fetch(`${baseUrl}/vjti/myblogs`, {
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