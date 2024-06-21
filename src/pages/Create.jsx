import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import {useAuthContext} from "../hooks/useauthContext"
export const Create = () => {
    const [title, setTitle] = useState('');
    const [snippet, setSnippet] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission

    const {user } = useAuthContext()

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
        if(!user){
            setError("You must login first")
            return
        }
        const blog = { title, snippet, body };

        try {
            const response = await fetch('http://localhost:4000/vjti', {
                method: 'POST',
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
                console.log(blog);
                setBody('');
                setTitle('');
                setSnippet('');
                setError(null);
                setIsSubmitted(true); // Set form submission flag to true
            }
        } catch (error) {
            setError(error.message);
        }
    };

    // Redirect to home page if form is submitted successfully
    if (isSubmitted) {
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
