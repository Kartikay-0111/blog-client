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
            const response = await fetch(`https://vjti-blog-server.onrender.com/vjti/${id}`,{
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
          });
            if (!response.ok) {
              throw new Error('Failed to fetch blog details');
            }
            const json = await response.json();
            setBlog(json);
            // console.log(blog);
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
            const response = await fetch(`https://vjti-blog-server.onrender.com/vjti/update/${id}`, {
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
        <div className="wrapper">
        <div className="create_box">
         <div className="create-header">
                <span>Create New Blog</span>
            </div>
        <form onSubmit={handleSubmit}>
            <div className="input_box">
                <input onChange={handleTitleChange} value={title} type="text" autoComplete="title" id="title" name="title" className="input-field" placeholder="" required />
                <label htmlFor="title" className="label">Title</label>
            </div>
            <div className="input_box">
                <input onChange={handleSnippetChange} value={snippet} type="text" autoComplete="snippet" id="snippet" name="snippet" className="input-field" placeholder="" required />
                <label htmlFor="snippet" className="label">Blog Snippet</label>
            </div>
            <div className="input_box">
                <textarea onChange={handleBodyChange} value={body} type="text" autoComplete="body" id="body" name="body" className="input-field" placeholder="" required ></textarea>
                <label htmlFor="body" className="label">Blog Body</label>
            </div>
            <div className="input_box">
                <button className="input-submit" type='submit'>Post Blog</button>
            </div>
        </form>
        </div>
        {error && <div>Some error occurred: {error}</div>}
    </div>
    );
};
