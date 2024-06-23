import React, { useState,useEffect } from 'react';
import { Navigate } from "react-router-dom";
import {  useParams } from 'react-router-dom';
import {useAuthContext} from "../hooks/useauthContext"

export const Update = () => {
    const [blog, setBlog] = useState(null);
    const { id } = useParams();
    const {user } = useAuthContext()
    const [error, setError] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false); // State to track form submission
    const [title, setTitle] = useState('');
    const [snippet, setSnippet] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {

        const fetchBlogDetails = async () => {
          try {
            const response = await fetch(`http://localhost:4000/vjti/${id}`,{
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
          });
            if (!response.ok) {
              throw new Error('Failed to fetch blog details');
            }
            const json = await response.json();
            setBlog(json);
            setTitle(json.title);
            setSnippet(json.snippet);
            setBody(json.body);
          } catch (error) {
            setBlog({ error: error.message });
          }
        };
        fetchBlogDetails();
    
      }, [id,user]);
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSnippetChange = (event) => {
        setSnippet(event.target.value);
    };

    const handleBodyChange = (event) => {
        setBody(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const blog = { title, snippet, body };

        try {
            const response = await fetch(`http://localhost:4000/vjti/update/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(blog),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${user.token}`
                }
            });
            const json = await response.json()
            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) { 
                // console.log(blog);
                setBody('');
                setTitle('');
                setSnippet('');
                setError(null);
                setIsUpdated(true); // Set form submission flag to true
            }
        } catch (error) {
            setError(error.message);
        }
    };

    // Redirect to home page if form is Updated successfully
    if (isUpdated) {
        return <Navigate to="/myblogs" />;
    }

    return (
        <div className="create-blog content">
            <form onSubmit={handleSubmit}>
                <label className='text-sky-400' htmlFor="title">Blog title:</label>
                <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} required />
                <label className='text-sky-400' htmlFor="snippet">Blog snippet:</label>
                <input type="text" id="snippet" name="snippet" value={snippet} onChange={handleSnippetChange} required />
                <label className='text-sky-400' htmlFor="body">Blog body:</label>
                <textarea id="body" name="body" value={body} onChange={handleBodyChange} required></textarea>
                <button type="submit">Submit</button>
            </form>
            {error && <div>Some error occurred: {error}</div>}
        </div>
    );
};
