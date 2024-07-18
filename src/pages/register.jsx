import React, { useState } from "react";
import "./index.css"
import { useSignup } from "../hooks/useSignup";
import { Link } from 'react-router-dom'

const Signup = () => {
   
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isHidden, setIsHidden] = useState(true)
    const { isloading, signup } = useSignup()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, username, password)
    }

    const handleShow = () => {
        if (!isHidden) document.getElementById("pass").setAttribute("type", "text")
        else document.getElementById("pass").setAttribute("type", "password")
        setIsHidden(!isHidden)
    }
    return (
        <div className="wrapper">
            <div className="login_box">
                <div className="login-header">
                    <span>SignUp</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input_box">
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" autoComplete="current-email" id="email" className="input-field" placeholder="" />
                        <label htmlFor="email" className="label prevent-select">Email</label>
                        <span className="material-symbols-outlined icon">
                            mail
                        </span>
                    </div>
                    <div className="input_box">
                        <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" autoComplete="username" id="user" className="input-field" placeholder=""/>
                        <label htmlFor="user" className="label prevent-select">Username</label>
                        <span className="material-symbols-outlined icon">
                            account_circle
                        </span>
                    </div>

                    <div className="input_box">
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" autoComplete="current-password" id="pass" className="input-field" placeholder=""/>
                        <label htmlFor="pass" className="label prevent-select">Password</label>
                        <span onClick={handleShow} className="material-symbols-outlined icon cursor-pointer">
                        {isHidden ? "visibility" : 'visibility_off'}
                        </span>
                    </div>

                    <div className="input_box">
                        <button disabled={isloading} className="input-submit" >{isloading ? "Registering..." : "SignUp"}</button>
                    </div>
                </form>
                <div className="register">
                    <span>Have an account? <Link to="/blogs/login">Login now</Link></span>
                </div>
            </div>
        </div>
    );
};
export default Signup
