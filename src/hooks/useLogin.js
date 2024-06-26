import { useState } from "react";
import { useAuthContext } from "./useauthContext";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('https://vjti-blog-server.onrender.com/vjti/user/login', {
                method: 'POST',
                body: JSON.stringify({username, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json()
            // console.log(JSON.stringify(json))
            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
                toast.error(`${json.error}`, {
                    position: "top-center",
                    autoClose: 2000
                })
            }
            if (response.ok) {
                setError(null);
                localStorage.setItem('user',JSON.stringify(json))
                dispatch({type:'LOGIN',payload:json})
                setIsLoading(false)
                toast.success("Yay! Hogaya login🥳", {
                    position: "top-center",
                    autoClose: 2000
                })
            }
        } catch (error) {
            setError(error.message);
            toast.error(`${error.message}`, {
                position: "top-center",
                autoClose: 2000
            })
        }
    }
    return {isLoading,error,login}
}