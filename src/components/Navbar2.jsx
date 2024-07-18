import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import userimg from "../assets/prf-img.jpg";
import logo from "../assets/logoblog.png"
const Navbar2 = () => {
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);
    const { logout } = useLogout();

    const handleToggle = () => {
        setIsNavbarVisible(!isNavbarVisible);
    };

    const handleLogout = () => {
        logout();
    };

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className='mainnav fixed flex flex-row items-center justify-between h-16 w-full z-10'>
            <div className="site-title ">
                <Link to="/"><img src={logo} alt="" /></Link>
            </div>
            <div className='flex items-center gap-2'>
                <p className='text-blue-300 text-xl'>{user ? user.username : 'Guest'}</p>
                <button onClick={handleToggle} className="ml-2">
                    <span className="text-red-100 material-symbols-outlined cursor-pointer pr-5">
                        {isNavbarVisible ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

            {isNavbarVisible && (
                <div id='navbar2' className=" fixed top-0 mt-16 w-screen  justify-center items-center">
                   
                    <ul className='fixed flex flex-col justify-center items-center text-center text-2xl text-white space-y-4 z-30 backdrop-blur-xl'>
                        <li><img className='h-8 w-8 rounded-2xl mt-2' src={userimg} alt='user'/></li> 
                        <li><NavLink to="/" onClick={handleToggle}>All Blogs</NavLink></li>
                        {user && <li><NavLink to="/myblogs" onClick={handleToggle}>My Blogs</NavLink></li>}
                        <li><NavLink to="/about" onClick={handleToggle}>About</NavLink></li>
                        {user && <li><NavLink to="/blogs/create" onClick={handleToggle}>New Blog</NavLink></li>}
                        {user && <li onClick={() => { handleLogout(); handleToggle(); }}><span className="material-symbols-outlined cursor-pointer">logout</span></li>}
                        {!user && <li><NavLink to="/blogs/login" onClick={handleToggle}>Login</NavLink></li>}
                        {!user && <li><NavLink to="/blogs/signup" onClick={handleToggle}>Signup</NavLink></li>}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar2;
