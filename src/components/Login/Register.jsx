'use client'

import { Controller, useForm } from "react-hook-form";
import { Alert, Box, Button, IconButton, Slide, TextField } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { Close } from "@mui/icons-material";

export default function Register() {

    const [open, setOpen] = useState(false)
    const { handleSubmit, control } = useForm()

    const onSubmit = async (data) => {
        await axios.post('http://styloapi.vercel.app/user', { email: data.email, username: data.nome })
        setOpen(true)
    }

    return (<>
        <div className="flex flex-1 items-center justify-center h-screen w-screen bg-gradient-to-r from-orange-800 to-orange-950 relative">
            <Slide in={open}>
                <div className="absolute flex justify-center top-2 w-full left-0">
                    <Alert variant="filled" severity="success"
                        className="w-2/5"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false)
                                }}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }>
                        Te enviamos um e-mail de confirmação no endereço informado!
                    </Alert>
                </div>
            </Slide>
            <Box width={500} height={700} className={'border-4 border-solid border-gray-500 bg-white flex flex-col justify-center'}>
                <div className="w-full h-auto flex justify-center">
                    <Image src={'/images/logo-no-background.svg'} width={250} height={200} />
                </div>
                <div className="px-5 mt-16 w-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    placeholder="Nome Completo"
                                    type="text"
                                    fullWidth
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    name="email"
                                    placeholder="E-mail"
                                    type="email"
                                    fullWidth
                                    className="mt-5"
                                />
                            )}
                        />
                        <div className="flex w-full justify-end mt-5">
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                className="bg-blue-700"
                            >
                                <span>Criar Conta</span>
                            </Button>
                        </div>
                    </form>
                </div>
            </Box>
        </div>
    </>
    )
}