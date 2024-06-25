import React, { useState } from "react";
import "./index.css"
import { Link } from 'react-router-dom'
import { useLogin } from "../hooks/useLogin";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const notify = () => {
        if (!error && username && password && !isloading) {
            toast.success("Yay! Hogaya login🥳", {
                position: "top-center",
                autoClose: 2000
            })
        }
        else if(!username || !password){
            toast.error("Sab fill toh kar😎", {
                position: "top-center",
                autoClose: 2000
            })
        }
        else {
            toast.error(`${error}`, {
                position: "top-center",
                autoClose: 2000
            })
        }

    }
    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')
    const { error, isloading, login } = useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(username, password)
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
                        <label htmmlFor="user" className="label">Username</label>
                        <span className="material-symbols-outlined icon">
                            person
                        </span>
                    </div>

                    <div className="input_box">
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" autoComplete="current-password" id="pass" className="input-field" placeholder="" required />
                        <label htmmlFor="pass" className="label">Password</label>
                        <span className="material-symbols-outlined icon">
                            lock
                        </span>
                    </div>

                    <div className="input_box">
                        <button onClick={notify} disabled={isloading} className="input-submit" >{isloading ? "Logging in..." : "Login"}</button>
                    </div>
                </form>
                <div className="register">
                    <span>Don't have an account? <Link to="/blogs/signup">Register now</Link></span>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};
export default Login
