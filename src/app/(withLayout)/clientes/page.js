import { Button } from "@mui/material";

export default function Clientes() {
    return (
        <div className='h-screen w-full flex flex-col items-center'>
            <div className='h-full flex flex-col justify-center items-center'>
                <Button
                    variant="contained"
                    className="bg-amber-800 m-5 px-9 font-bold"
                    href="/clientes/lista">
                    Listar Clientes
                </Button>
                <Button
                    variant="contained"
                    className="bg-amber-800 m-5 font-bold"
                    href="/clientes/novo">
                    Cadastrar Clientes
                </Button>
            </div>
        </div>
    )
}