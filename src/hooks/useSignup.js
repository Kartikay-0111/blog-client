import { useState } from "react";
import { useAuthContext } from "./useauthContext";
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const {dispatch} = useAuthContext()
    const signup = async (email,username, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch(`${baseUrl}/vjti/user/signup`, {
                method: 'POST',
                body: JSON.stringify({ email,username, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json()
            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
                toast.warn(`${json.error}`, {
                    position: "top-center",
                    autoClose: 2000
                })
            }
            if (response.ok) {
                setError(null);
                localStorage.setItem('user',JSON.stringify(json))
                dispatch({type:'LOGIN',payload:json})
                setIsLoading(false)
                toast.success("Yay! Hogaya register🥳", {
                    position: "top-center",
                    autoClose: 2000
                })
            }
        } catch (error) {
            setError(error.message);
        }
    }
    return {isLoading,error,signup}
}