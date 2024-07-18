import React from 'react'
import vjti from "../assets/vjti.jpg"
import { useState,useEffect } from 'react';
import LoaderSpinner from '../components/Loader';
export const About = () => {
  const [isLoading, setIsLoading] =
   useState(true);
      useEffect(() => {
        // Simulate an API call
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }, []);
    
      if (isLoading) {
        return <LoaderSpinner isPage={true}/>;
      }
  return (
    <div className="about">
      <img src={vjti} alt="" />
   <div className='backdrop-blur-xl'>
        <h2 style={{color:"crimson", fontSize:"30px"}}>About Us</h2>
        <p>
          Welcome to <strong>VJTI Blog</strong>, a virtual space designed exclusively for the vibrant community of Veermata
          Jijabai Technological Institute (VJTI) students!
          At <strong>VJTI Blog</strong>,, we are dedicated to providing a platform where VJTI students can explore, engage, and
          excel beyond the confines of their academic curriculum. Our goal is to foster a culture of learning,
          creativity, and collaboration among the diverse talents that make up the fabric of VJTI.
        </p>
      <br />
        <p>
          Whether you're a seasoned senior or a fresh-faced freshman, this blog is your go-to destination for a myriad
          of resources, insights, and inspiration tailored specifically to the needs and interests of VJTI students.
          From <strong>academic tips</strong> and <strong>career guidance</strong> to campus events and student spotlights, we cover it all to ensure you
          make the most of your time at VJTI.
          Join us as we embark on a journey of discovery, growth, and camaraderie. Let's celebrate the spirit of
          innovation and academic excellence that defines VJTI together. After all, the future belongs to those who dare
          to <strong>dream</strong>, <strong>learn</strong>, and <strong>lead</strong>.
        </p>
        <br/>
        <p>Stay connected, stay inspired, and welcome aboard the <strong>VJTI Blog</strong>, community!</p>
      </div>
      </div>
  )
}