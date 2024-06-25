import React, { useState } from "react";
import "./index.css"
import { useSignup } from "../hooks/useSignup";
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const notify = () => {
        if (!error && username && password && email) {
            toast.success("Yay! Hogaya Register🥳", {
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
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { error, isloading, signup } = useSignup()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, username, password)
    }

    return (
        <div className="wrapper">
            <div className="login_box">
                <div className="login-header">
                    <span>SignUp</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input_box">
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" autoComplete="current-email" id="email" className="input-field" placeholder="" required />
                        <label htmlFor="email" className="label">Email</label>
                        <span className="material-symbols-outlined icon">
                            mail
                        </span>
                    </div>
                    <div className="input_box">
                        <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" autoComplete="username" id="user" className="input-field" placeholder="" required />
                        <label htmlFor="user" className="label">Username</label>
                        <span className="material-symbols-outlined icon">
                            account_circle
                        </span>
                    </div>

                    <div className="input_box">
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" autoComplete="current-password" id="pass" className="input-field" placeholder="" required />
                        <label htmlFor="pass" className="label">Password</label>
                        <span className="material-symbols-outlined icon">
                            lock
                        </span>
                    </div>

                    <div className="input_box">
                        <button onClick={notify} disabled={isloading} className="input-submit" >{isloading ? "Registering..." : "SignUp"}</button>
                    </div>
                </form>
                <div className="register">
                    <span>Have an account? <Link to="/blogs/login">Login now</Link></span>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};
export default Signup
