import React, { useState } from "react";
import "./index.css"
import { useSignup } from "../hooks/useSignup";

const Signup = () => {

const [email, setEmail] = useState('')
const [username,setUsername] = useState('')
const [password, setPassword] = useState('')
const {error,isloading,signup} = useSignup()
const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email,username,password)
}
    return (
        <div className="min-h-96 flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
            <div className="bg-white bg-opacity-25 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg backdrop-brightness-50 backdrop-saturate-125">
                <h1 className="text-3xl mb-4 text-white text-center">Sign Up</h1>
                <form  onSubmit={handleSubmit} className="grid grid-cols-1 gap-4"> 
                    <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" placeholder="Email" className="p-4 rounded-md bg-white bg-opacity-10 focus:outline-none focus:bg-opacity-20" autoComplete="email"/>
                    <input onChange={(e)=> setUsername(e.target.value)} value={username} type="text" placeholder="Username" className="p-4 rounded-md bg-white bg-opacity-10 focus:outline-none focus:bg-opacity-20" autoComplete="username"/>
                    <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" placeholder="Password" className="p-4 rounded-md bg-white bg-opacity-10 focus:outline-none focus:bg-opacity-20 " autoComplete="current-password"/>
                    <button disabled={isloading} className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300 ease-in-out">
                        Sign Up
                    </button>
                    {error && <div className=" font-mono font-semibold text-red-600">{error}</div> }
                </form>
            </div>
        </div>
    );
};
export default Signup
