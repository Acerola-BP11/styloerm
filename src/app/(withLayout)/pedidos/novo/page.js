'use client'

import NewSale from "@/components/Cadastro/CadastroVenda";
import DarkTheme from "@/components/darkTheme";
import { Button, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewOrder() {

    const router = useRouter()

    const [type, setType] = useState('venda')
    const [itensArray, setItensArray] = useState([])

    const handleChange = e => {
        setType(e.target.value)
    }
    const { control, handleSubmit, setValue } = useForm()

    const onInvalid = (errors) => console.error(errors)

    const onSubmit = async (data) => {
        data.itens = itensArray
        const order = {
            client: data.cliente,
            paymentMethod: data.formapagamento,
            note: data.observacao,
            city: data.cidade,
            adress: data.endereco,
            itens: data.itens,
            budget: type === 'cotacao' ? true : false
        }
        await axios.post('https://styloapi.vercel.app/orders', order, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
        await router.push('/')
        .catch(e => {
            alert(e)
        })
    }


    return (
        <div className="h-full w-full flex flex-col items-center justify-center overflow-hidden">
            <DarkTheme>
                <div className="w-full h-auto flex justify-end p-5">
                    <Select
                        value={type}
                        onChange={handleChange}
                        variant="outlined"
                        color="primary"
                        className="w-28 text-center"

                    >
                        <MenuItem value={'venda'}>Venda</MenuItem>
                        <MenuItem value={'cotacao'}>Cotação</MenuItem>
                    </Select>
                </div>
                <div className="w-11/12 h-full border border-solid border-amber-800 mt-5 mb-10 p-5 bg-[#0f0f0f] overflow-auto">
                    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                        <NewSale
                            control={control}
                            itensArray={itensArray}
                            setItensArray={setItensArray}
                            setValue={setValue}
                        />
                        <div className="w-full flex justify-end my-5 mr-8">
                            {itensArray.length > 0 && (
                                <Button
                                    variant="contained"
                                    className="bg-blue-600 text-white font-semibold"
                                    type="submit"
                                >
                                    Salvar
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </DarkTheme>
        </div>
    )
}