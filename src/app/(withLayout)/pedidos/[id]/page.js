'use client'
import EditSale from "@/components/Edicao/EditOrder";
import DarkTheme from "@/components/darkTheme";
import { Edit, PictureAsPdf } from "@mui/icons-material";
import { Button, IconButton, MenuItem, Select, Skeleton } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditClient({ params }) {
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const { control, handleSubmit, setValue } = useForm()
    const [order, setOrder] = useState({})
    const [type, setType] = useState('venda')
    const [itensArray, setItensArray] = useState([])

    const router = useRouter()

    const handleChange = e => {
        setType(e.target.value)
    }

    const handlePDF = async _ => {
        alert('Entrei na HandlePDF')
        const response = await axios.get(`https://https://styloapi.vercel.app/orders/${params.id}`)
        console.log(response.data)
    }

    const onInvalid = (errors) => console.error(errors)
    const onSubmit = async (data) => {
        data.itens = itensArray
        const order = {
            client: data.cliente,
            city: data.cidade,
            adress: data.endereco,
            itens: data.itens,
            budget: type === 'cotacao' ? true : false
        }
        try {
            setEditing(false)
            router.push('/clientes/lista')
            console.log(order)
        } catch (error) {
            alert(error)
        }
    }

    const getOrderData = async () => {
        try {
            const response = await axios.get(`https://styloapi.vercel.app/orders/${params.id}`, {
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            })
            const orderData = await response.data
            setOrder(orderData)
            setLoading(false)
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        getOrderData()
    }, [])

    return (
        <div className="h-full w-full flex flex-col items-center justify-center overflow-auto">
            <DarkTheme>
                <div className="w-full h-auto flex justify-end p-5 overflow-hidden">
                    <IconButton
                        onClick={handlePDF}
                        className="pr-2"
                    >
                        <PictureAsPdf/>

                    </IconButton>
                    <Select
                        defaultValue={order.budget ? 'cotacao' : 'venda'}
                        value={type}
                        onChange={handleChange}
                        variant="outlined"
                        color="primary"
                        className="w-28 text-center"
                        disabled={!editing}

                    >
                        <MenuItem value={'venda'}>Venda</MenuItem>
                        <MenuItem value={'cotacao'}>Cotação</MenuItem>
                    </Select>
                    <IconButton
                        onClick={() => {
                            setEditing(!editing)
                        }}
                    >
                        <Edit />
                    </IconButton>
                </div>
                <div className="w-11/12 h-5/6 border border-solid border-amber-800 p-5 overflow-auto">
                    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="h-max">
                        {!loading ? (
                            <EditSale
                                order={order}
                                control={control}
                                itensArray={itensArray}
                                setItensArray={setItensArray}
                                setValue={setValue}
                                editing={editing}
                            />
                        )
                            : (
                                <Skeleton animation={"pulse"} />
                            )
                        }
                        <div className="h-full w-full flex justify-end items-end">
                            {editing &&
                                <Button
                                    variant="outlined"
                                    type="submit"
                                    className="mt-5"
                                >
                                    Salvar
                                </Button>}
                        </div>
                    </form>
                </div>
            </DarkTheme>
        </div>
    )
}