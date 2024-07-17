import React from 'react'
import {Link, NavLink } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
// import { useAuthContext } from '../hooks/useauthContext'
import userimg from "../assets/prf-img.jpg"
export const Navbar = () => {
    const { logout } = useLogout()
    const handleLogout = () => {
        logout()
    }
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user)
    return (
        <div style={{ width: "320px" }}>
            <nav id='sidebar' className="w-72 sm:w-72 md:w-72 lg:w-80 xl:w-80">
                <div className="site-title">
                    <Link to="/"><p className="text-4xl font-bold mt-4" style={{ color: "crimson" }}>VJTI BLOG</p></Link>
                </div>

                <div>
                    <div className='prf-img w-40'>
                        <img src={userimg} alt='username_logo' />
                    </div>
                    {user && <p className='mt-2 text-violet-300' >{user.username}</p>}
                </div>

                <ul>
                    <li><NavLink to="/">All Blogs</NavLink></li>
                    {user && <li><NavLink to="/myblogs">My Blogs</NavLink></li>}
                    <li><NavLink to="/about">About</NavLink></li>
                    {user && <li><NavLink to="/blogs/create">New Blog</NavLink></li>}
                    {user && <li onClick={handleLogout}><span className="material-symbols-outlined cursor-pointer">logout</span></li>}
                    {!user && <li><NavLink to="/blogs/login">Login</NavLink></li>}
                    {!user && <li><NavLink to="/blogs/signup">Signup</NavLink></li>}
                </ul>

                <footer>Kartikay Pandey</footer>
            </nav>
        </div>
    )
}