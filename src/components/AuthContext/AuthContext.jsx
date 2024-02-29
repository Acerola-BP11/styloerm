'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

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

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            router.push('/login')
        }
      }, [])

    return(
        <>
        {children}
        </>
    )
}