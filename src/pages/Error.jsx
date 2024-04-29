import React from 'react'
import { Link } from 'react-router-dom'
export const Error = () => {
    return (
        <div className="container">
            <h1>404 - Page Not Found</h1>
            <p>We're sorry, the page you are looking for might have been removed or its name changed, or is temporarily unavailable.</p>
            <p>Please check the URL for any mistakes, or <Link to="/blogs">return to the homepage</Link>.</p>
        </div>
    )
}
