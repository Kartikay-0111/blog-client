import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useauthContext'
export const Navbar = () => {
    const { logout } = useLogout()
    const handleLogout = () => {
        logout()
    }
    const { user } = useAuthContext()
    return (
        <div>
            <nav>
                <div className="site-title">
                    <Link to="/"><h1 style={{ color: "crimson" }}>VJTI BLOG</h1></Link>
                    <p style={{ color: "bisque" }} >A Blog platform for VJTIANS</p>
                </div>
                <ul>
                    <li><Link style={{ color: "bisque" }} to="/">All Blogs</Link></li>
                    {user && <li><Link style={{ color: "bisque" }} to="/myblogs">My Blogs</Link></li>}
                    <li><Link style={{ color: "bisque" }} to="/about">About</Link></li>
                    {user && <li><Link style={{ color: "bisque" }} to="/blogs/create">New Blog</Link></li>}
                    {user && <button onClick={handleLogout}>&nbsp;&nbsp;&nbsp;Log Out</button>}
                    {!user && <li><Link style={{ color: "bisque" }} to="/blogs/login">Login</Link></li>}
                    {!user && <li><Link style={{ color: "bisque" }} to="/blogs/signup">Signup</Link></li>}
                </ul>
            </nav>
        </div>
    )
}
