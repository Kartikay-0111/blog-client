import React from 'react';
import './Skeleton.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const BlogPostSkeleton = () => {
  return (
    <div className="blbox ">
      <div className='blog-post-skeleton backdrop-blur-xl'>
        <div className='part1s'>
          <div className="img">
            <Skeleton circle width={50} height={50}/>
            <p className='usern'><Skeleton width={120}/></p>
          </div>
        </div>
        <div className="part2s"> <Skeleton /></div>
        <div className="part3s"> <Skeleton /></div>
        <div className="part4s"> <Skeleton count={10} /></div>
      </div>
    </div>
  );
};

export default BlogPostSkeleton;
