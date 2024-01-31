'use client'

import NewSale from "@/components/Cadastro/CadastroVenda";
import DarkTheme from "@/components/darkTheme";
import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewOrder(){

    const [type, setType] = useState('venda')

    const handleChange = e => {
        setType(e.target.value)
    }

    const onSubmit = (data) => {
        console.log(data)
    }

    const { control, handleSubmit, setValue } = useForm()

    return(
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <NewSale
                        control={control}
                        setValue={setValue}
                        />
                    </form>
                </div>
            </DarkTheme>
        </div>
    )
}