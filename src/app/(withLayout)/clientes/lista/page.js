'use client'
import ClientList from "@/components/Listagem/ClientList";
import { useContext } from "react";
import { AuthContext } from "@/components/context/AuthContext";
import { Skeleton } from "@mui/material";
import DarkTheme from "@/components/darkTheme";

export default function ListClientes() {
    const { loading } = useContext(AuthContext)
    return (
        <div>
            <DarkTheme>
                <div className="h-full w-full flex items-center justify-center mt-5">
                    {loading ? <Skeleton variant="rectangular" width={800} height={500} /> : <ClientList />}
                </div>
            </DarkTheme>
        </div>
    )
}