import React from 'react';
import { NavLink } from 'react-router-dom';

const NoBlogs = () => {
  return (
    <div className='mt-44 p-5 w-11/12 md:w-7/12 sm:w-7/12 border-white border-4 ring-4 rounded-3xl backdrop-blur-lg'>
    <div className="no-blogs w-full h-max flex flex-col relative align-middle">
      <h1 className=' text-rose-700 font-bold text-4xl mt-4'>You have no blogs yet 😭</h1>
      <p className=' text-rose-500 font-bold text-2xl mt-4'>Create a new blog to get started!</p>
      <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-500 hover:border-blue-700 rounded mt-4"><NavLink to="/blogs/create" >Create Blog</NavLink></button>
    </div></div>
  );
};

export default NoBlogs;
