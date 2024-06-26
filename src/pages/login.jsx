import React, { useState } from "react";
import "./index.css"
import { Link } from 'react-router-dom'
import { useLogin } from "../hooks/useLogin";
// import { toast, ToastContainer } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

const Login = () => {

    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')
    const [isHidden, setIsHidden] = useState(false)
    const { isloading, login } = useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(username, password)
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
                    <span>Login</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input_box">
                        <input onChange={(e) => setusername(e.target.value)} value={username} type="text" autoComplete="username" id="user" className="input-field" placeholder="" required />
                        <label htmlFor="user" className="label">Username</label>
                        <span className="material-symbols-outlined icon">
                            person
                        </span>
                    </div>

                    <div className="input_box">
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" autoComplete="current-password" id="pass" className="input-field" placeholder="" required />
                        <label htmlFor="pass" className="label">Password</label>
                        <span onClick={handleShow} className="material-symbols-outlined icon cursor-pointer">
                            {isHidden ? "visibility" : "visibility_off"}
                        </span>
                    </div>

                    <div className="input_box">
                        <button disabled={isloading} className="input-submit" >{isloading ? "Logging in..." : "Login"}</button>
                    </div>
                </form>
                <div className="register">
                    <span>Don't have an account? <Link to="/blogs/signup">Register now</Link></span>
                </div>
            </div>
        </div>
    );
};
export default Login
