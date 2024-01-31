'use client'

import CadastroPessoaFisica from "@/components/Cadastro/CadastroPessoaFisica";
import CadastroPessoaJuridica from "@/components/Cadastro/CadastroPessoaJuridica";
import DarkTheme from "@/components/darkTheme";
import { auth } from "@/utils/firebase";
import { Button, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CadastrarClientes() {

    const [tipoCadastro, setTipoCadastro] = useState('juridica')
    const { control, handleSubmit, setValue } = useForm()

    const router = useRouter()

    const onSubmit = async (data) => {
        let client
        if (tipoCadastro === 'juridica') {
            client = {
                razao: data.razao,
                nome_fantasia: data.nome_fantasia,
                cnpj: data.cnpj,
                inscricao_estadual: data.inscricao_estadual,
                cep: data.cep,
                cidade: data.cidade,
                endereco: data.endereco,
                bairro: data.bairro,
                uf: data.uf,
                numero: data.numero,
                pessoa_contato: data.pessoa_contato,
                telefone1: data.telefone1,
                telefone2: data.telefone2,
                email: data.email,
                tipo: tipoCadastro
            }
        } else {
            client = {
                nome: data.nome,
                cpf: data.cpf,
                cep: data.cep,
                cidade: data.cidade,
                endereco: data.endereco,
                bairro: data.bairro,
                uf: data.uf,
                numero: data.numero,
                pessoa_contato: data.pessoa_contato,
                telefone1: data.telefone1,
                telefone2: data.telefone2,
                email: data.email,
                tipo: tipoCadastro
            }
        }
        try {
            await axios.post('http://localhost:3500/clients/new', client,
                {
                    headers: {
                        "Authorization": await auth.currentUser.getIdToken()
                    }
                }
            
            )
            router.push('http://localhost:3000/clientes/lista')
        } catch (error) {
            alert('Ocorreu um erro ao salvar o cliente!')
        }
    }

    const handleChange = (event) => {
        setTipoCadastro(event.target.value)
    }

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <DarkTheme>
                <div className="w-full h-auto flex justify-end p-5">
                    <Select
                        value={tipoCadastro}
                        label={"Tipo"}
                        onChange={handleChange}
                        variant="outlined"
                        color="primary"

                    >
                        <MenuItem value={'juridica'}>Pessoa Júridica</MenuItem>
                        <MenuItem value={'fisica'}>Pessoa Física</MenuItem>
                    </Select>
                </div>
                <div className="w-11/12 h-5/6 border border-solid border-amber-800 p-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="h-max">
                        {tipoCadastro === 'juridica' ? <CadastroPessoaJuridica
                            control={control}
                            setValue={setValue}
                        /> : <CadastroPessoaFisica
                            control={control}
                            setValue={setValue}
                        />}
                        <div className="h-full w-full flex justify-end items-end">
                            <Button
                                variant="outlined"
                                type="submit"
                                className="mt-5"
                            >
                                Enviar
                            </Button>
                        </div>
                    </form>
                </div>
            </DarkTheme>
        </div>
    )
}