import { useState } from "react";
import { useAuthContext } from "./useauthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('http://localhost:4000/vjti/user/login', {
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
            }
            if (response.ok) {
                setError(null);
                localStorage.setItem('user',JSON.stringify(json))
                dispatch({type:'LOGIN',payload:json})
                setIsLoading(false)
            }
        } catch (error) {
            setError(error.message);
        }
    }
    return {isLoading,error,login}
}