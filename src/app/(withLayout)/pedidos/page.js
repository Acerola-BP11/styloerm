import { Button } from "@mui/material";

export default function Orders() {
    return (

        <div className='h-screen w-full flex flex-col items-center'>
            <div className='h-full flex flex-col justify-center items-center'>
                <Button
                    variant="contained"
                    className="bg-amber-800 m-5 px-10 font-bold"
                    href="/pedidos/lista">
                    Listar Pedidos
                </Button>
                <Button
                    variant="contained"
                    className="bg-amber-800 m-5 font-bold px-12"
                    href="/pedidos/novo">
                    Novo Pedido
                </Button>
            </div>
        </div>
    )

}