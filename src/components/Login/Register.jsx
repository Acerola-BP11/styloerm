import { Box } from "@mui/material";
import Image from "next/image";

export default async function Register() {
    return(
        <div className="flex flex-1 items-center justify-center h-screen w-screen bg-gradient-to-r from-orange-800 to-orange-950">
            <Box width={500} height={700} className={'border-4 border-solid border-gray-500 bg-white flex flex-col justify-center'}>
                <div className="w-full h-auto flex justify-center">
                    <Image src={'/images/logo-no-background.svg'} width={250} height={200} />
                </div>
                <div className="px-5 mt-16 w-full">
                    <TextField
                        placeholder="E-mail"
                        fullWidth
                    />
                    <TextField
                        placeholder="Nome Completo"
                        type="password"
                        fullWidth
                        className="mt-5"
                    />
                    <div className="flex w-full justify-end mt-2">
                        <Link href={'https://www.google.com.br'}>
                            <span className="text-blue-600 hover:underline">
                                Esqueci minha senha!
                            </span>
                        </Link>
                    </div>
                </div>
            </Box>
        </div>
    )
}