'use client'
import OrdersList from "@/components/Listagem/OrderList";
import DarkTheme from "@/components/darkTheme";

export default function ListaPedidos() {
    return (
        <div>
            <DarkTheme>
                <div className="h-full w-full flex items-center justify-center mt-5">
                    <OrdersList />
                </div>
            </DarkTheme>
        </div>
    )
}