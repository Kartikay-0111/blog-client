import React from 'react'

export const Navbar = () => {
    return (
        <div>
            <nav>
                <div class="site-title">
                    <a href="/blogs"><h1 style={{color:"crimson"}}>VJTI BLOG</h1></a>
                    <p>A Blog platform for VJTIANS</p>
                </div>
                <ul>
                    <li><a href="/blogs">Blogs</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/blogs/create">New Blog</a></li>
                </ul>
            </nav>
        </div>
    )
}
