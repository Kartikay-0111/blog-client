import React from 'react'
import { useAuthContext } from '../hooks/useauthContext'
export const Footer = () => {
    const { user } = useAuthContext()
    return (
        <div>
           <footer> Copyright &copy; VJTI Blog 2024 {user && <div>{user.email}</div>}</footer> 
          
        </div>
    )
}
