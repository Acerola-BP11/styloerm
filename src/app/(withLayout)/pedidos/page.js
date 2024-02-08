import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Orders() {
    return (
        <div className='h-full w-full flex flex-row items-center'>
            <div className="flex flex-col justify-center items-center w-1/2">
                <Link href="/pedidos/novo" className="mb-10"><span className="text-lg font-bold">Novo Pedido</span></Link>
                <Link href="/pedidos/novo"><Image src={'/images/deal-icon.svg'} width={400} height={500} alt="Novo pedido" className="bg-white p-3 rounded-lg" /></Link>
            </div>
            <Divider
                role="presentation"
                variant="middle"
                orientation="vertical"
                className="w-1 bg-white"
                flexItem
            />
            <div className="w-1/2 flex flex-col justify-center items-center">
                <Link href="/pedidos/lista" className="mb-10"><span className="text-lg font-bold">Listar Pedidos</span></Link>
                <Link href="/pedidos/lista"><Image src={'/images/planilha.png'} width={400} height={500} alt="Lista Pedidos" /></Link>
            </div>
        </div>
    )

}