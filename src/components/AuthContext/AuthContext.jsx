'use client'
import axios from "axios"
import { useRouter } from "next/navigation"

export default function AuthContext({ children }) {
    const router = useRouter()
    axios.interceptors.response.use(response => {
        return response
    }, (error) => {
        const status = error.response?.status || 500
        if (status === 401) {
            router.push('/login')
        } else {
            return Promise.reject(error)
        }
    })

    if(!localStorage.getItem('token')){
        router.push('/login')
    }

    return(
        <>
        {children}
        </>
    )
}