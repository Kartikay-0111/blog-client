import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useauthContext';
import profileimg from "../assets/prf-img.jpg"
import Timeago from '../components/Timeago';
import BlogPostSkeleton from '../components/Skelton';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const Details = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  // console.log(id + " id of blog")
  const { user } = useAuthContext()
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {

    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}/vjti/${id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
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

  }, [id, user,baseUrl]);

  const handleDelete = () => {
    if (!user) {
      return
    }
    const endpoint = `${baseUrl}/vjti/${blog._id}`;
    fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then((response) => response.json())
      .then(() => {
        toast.success("Blog deleted successfully", {
          position: "top-center",
          autoClose: 2000
        })
        window.location.href = '/myblogs'
      })
      .catch(err => console.log(err));
  };

  if (!blog) {
    return <BlogPostSkeleton />;
  }

  if (blog.error) {
    return (
      <div className='blbox'>
        <div className='mt-20 p-5  border-white border-4 ring-4 rounded-3xl backdrop-blur-lg'>
          <div className="no-blogs w-full h-max flex flex-col relative align-middle">
            <h1 className=' text-rose-700 font-bold text-4xl mt-4'>Error</h1>
            <p className=' text-rose-300 font-bold text-2xl mt-4'>Failed to fetch the blog</p>
          </div>
        </div>
      </div>
    )
  }

  if (!blog.title) {
    return <div>Blog not found</div>;
  }

  return (
    <div className='blbox'>
      <div key={blog._id} className="blbox ">
        <div className="blogs content backdrop-blur-xl">
          <div className="part1">

            <div className="userpf">
              <img src={profileimg} alt="" />
              <p>{blog.username}</p>
            </div>

            <div className="changes">
              <Timeago createdAt={blog.createdAt} />
              <div>  {user.username === blog.username && <button onClick={handleDelete} className="delete" type="button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg></button>}</div>
              <div>{user.username === blog.username && <button onClick={() => window.location.href = `/blogs/update/${blog._id}`} className="update" type="button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" /></svg></button>}</div>
            </div>

          </div>
          <div className="part2">{blog.title}</div>
          <div className="part3">{blog.snippet}</div>
          <div className="part4"><ReactMarkdown children={blog.body} remarkPlugins={[remarkGfm]} /></div>


          <div className="part5 flex flex-col p-4"><div className="flex items-center gap-1 mb-1 ml-3"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="mr-2 text-white cursor-pointer" height="22" width="22" xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
          </div>
            <div className="text-gray-400 ml-3"><p>1 Likes</p></div></div>
        </div>
      </div>
    </div>
  )
}
