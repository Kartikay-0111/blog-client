import React from 'react'
import { Link } from 'react-router-dom'
export const Navbar = () => {
    return (
        <div>
            <nav>
                <div className="site-title">
                    <Link to="/blogs"><h1 style={{color:"crimson"}}>VJTI BLOG</h1></Link>
                    <p style={{color:"bisque"}} >A Blog platform for VJTIANS</p>
                </div>
                <ul>
                    <li><Link style={{color:"bisque"}} to="/blogs">Blogs</Link></li>
                    <li><Link style={{color:"bisque"}} to="/about">About</Link></li>
                    <li><Link style={{color:"bisque"}} to="/blogs/create">New Blog</Link></li>
                </ul>
            </nav>
        </div>
    )
}
