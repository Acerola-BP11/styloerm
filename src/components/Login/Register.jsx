import { Box, Button, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default async function Register() {
    return (
        <div className="flex flex-1 items-center justify-center h-screen w-screen bg-gradient-to-r from-orange-800 to-orange-950">
            <Box width={500} height={700} className={'border-4 border-solid border-gray-500 bg-white flex flex-col justify-center'}>
                <div className="w-full h-auto flex justify-center">
                    <Image src={'/images/logo-no-background.svg'} width={250} height={200} />
                </div>
                <div className="px-5 mt-16 w-full">
                    <TextField
                        name="name"
                        placeholder="Nome Completo"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        name="email"
                        placeholder="E-mail"
                        type="email"
                        fullWidth
                        className="mt-5"
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
                </div>
            </Box>
        </div>
    )
}