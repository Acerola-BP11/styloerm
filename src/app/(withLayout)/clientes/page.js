import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Clientes() {
    return (
        <div className='h-full w-full flex flex-row items-center'>
            <div className="flex flex-col justify-center items-center w-1/2">
                <Link href="/clientes/novo" className="mb-10"><span className="text-lg font-bold text-white">Cadastrar Clientes</span></Link>
                <Link href="/clientes/novo"><Image src={'/images/form-icon.png'} width={400} height={500} alt="Cadastro Cliente" /></Link>
            </div>
            <Divider
                role="presentation"
                variant="middle"
                orientation="vertical"
                className="w-1 bg-white"
                flexItem
            />
            <div className="w-1/2 flex flex-col justify-center items-center">
                <Link href="/clientes/lista" className="mb-10"><span className="text-lg font-bold text-white">Listar Clientes</span></Link>
                <Link href="/clientes/lista"><Image src={'/images/table-icon.png'} width={400} height={500} alt="Cadastro Cliente" /></Link>
            </div>
        </div>
    )
}