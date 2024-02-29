'use client'

import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function Login() {

    const router = useRouter()
    const { control, handleSubmit } = useForm()
    const [error, setError] = useState(false)

    const onSubmit = async (data) => {
        const {email, password} = data

        await axios.post('https://styloapi.vercel.app/user/login', {email, password})
        .then((response) => {
            const { sessionToken, username } = response.data
            localStorage.setItem('token', sessionToken)
            localStorage.setItem('username', username)
            router.push('/')
        })
        .catch((e) => {
            console.error(e)
            setError(true)
        })
    }

    return (
        <div className="flex flex-1 items-center justify-center h-screen w-screen bg-gradient-to-r from-orange-800 to-orange-950">
            <Box width={500} height={700} className={'border-4 border-solid border-gray-500 bg-white flex flex-col justify-center'}>
                <div className="w-full h-auto flex justify-center">
                    <Image src={'/images/logo-no-background.svg'} width={250} height={200} alt="logo"/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="px-5 mt-16 w-full">
                        {error && <span className="text-red-600 absolute -mt-8">Úsuario ou senha incorretos!</span>}
                        <Controller
                            name='email'
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    placeholder="E-mail"
                                    fullWidth
                                    {...field}
                                    error={error}
                                />
                            )}
                        />
                        <Controller
                        
                        name='password'
                        control={control}
                        render={({field}) => (
                            <TextField
                            placeholder="Senha"
                            type="password"
                            fullWidth
                            className="mt-5"
                            error={error}
                            {...field}
                        />
                        )}
                        />
                        <div className="flex w-full justify-end mt-2">
                            <Link href={'https://www.google.com.br'}>
                                <span className="text-blue-600 hover:underline">
                                    Esqueci minha senha!
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-16 flex flex-row justify-between items-center px-5">
                        <Button
                            variant="contained"
                            LinkComponent={Link}
                            href="/register"
                            className="bg-blue-700"
                        >
                            Criar Conta
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            className="bg-blue-700"
                        >
                            Entrar
                        </Button>
                    </div>
                </form>
            </Box>
        </div>
    )
}