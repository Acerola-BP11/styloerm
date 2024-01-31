'use client'
import CadastroPessoaFisica from "@/components/Cadastro/CadastroPessoaFisica";
import EditClientFisico from "@/components/Edicao/EditClientFisico";
import EditClientJurico from "@/components/Edicao/EditClientJuridico";
import DarkTheme from "@/components/darkTheme";
import { auth } from "@/utils/firebase";
import { Edit } from "@mui/icons-material";
import { Button, IconButton, Skeleton } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditClient({ params }) {
    const [editing, setEditing] = useState(false)
    const { control, handleSubmit, setValue } = useForm()
    const [client, setClient] = useState(null)

    const router = useRouter()

    const onSubmit = async (data) => {
        let editData
        if (client.tipo === 'juridica') {
            editData = {
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
                tipo: 'juridica'
            }
        } else {
            editData = {
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
                tipo: 'fisica'
            }
        }
        try {
            if (client.cnpj) {
                await axios.put(`http://localhost:3500/clients/${client.cnpj}`, editData,
                    {
                        headers: {
                            "Authorization": await auth.currentUser.getIdToken()
                        }
                    }
                )
            } else {
                await axios.put(`http://localhost:3500/clients/${client.cpf}`, editData,
                    {
                        headers: {
                            "Authorization": await auth.currentUser.getIdToken()
                        }
                    }
                )
            }
            setEditing(false)
            router.push('http://localhost:3000/clientes/lista')
        } catch (error) {
            alert(error)
        }
    }

    const getClientData = async () => {
        try {
            const response = await axios.get(`http://localhost:3500/clients/${params.id}`)
            const clientData = await response.data
            setClient(clientData)
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        getClientData()
    }, [])

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <DarkTheme>
                <div className="w-full h-auto flex justify-end p-5">
                    <IconButton
                        onClick={() => {
                            setEditing(!editing)
                        }}
                    >
                        <Edit />
                    </IconButton>
                </div>
                <div className="w-11/12 h-5/6 border border-solid border-amber-800 p-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="h-max">
                        {client ? (
                            (
                                client.tipo === 'juridica' ? (
                                    <EditClientJurico
                                        control={control}
                                        client={client}
                                        editing={editing}
                                        setValue={setValue}
                                    />
                                ) : (
                                    <EditClientFisico
                                        control={control}
                                        client={client}
                                        editing={editing}
                                        setValue={setValue}

                                    />
                                )
                            )
                        ) : (
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