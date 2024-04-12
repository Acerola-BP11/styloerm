'use client'
import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { hasSpecialCharacters } from "../../../public/util";

export default function CadastroPessoaFisica({ control, setValue }) {
    const [cidade, setCidade] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [uf, setUf] = useState('');


    const validaCep = async (evento) => {
        const cep = evento.target.value
        if (cep !== '') {
            try {
                console.log(`viacep.com.br/ws/${cep}/json/`)
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                const data = response.data
                setCidade(data.localidade)
                setValue('cidade', data.localidade)
                setBairro(data.bairro)
                setValue('bairro', data.bairro)
                setEndereco(data.logradouro)
                setValue('endereco', data.logradouro)
                setUf(data.uf)
                setValue('uf', data.uf)
            } catch (err) {
                alert('O CEP digitado é invalido!')
            }

        }
    }
    return (
        <div>
            <div className="flex flex-row justify-between mx-5">

                <Controller
                    name="nome"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="name"
                            label="Nome"
                            required
                            color="primary"
                            inputMode="text"
                            className="w-1/4"
                            margin="dense"
                        />
    )}
                />

                <Controller
                    name="cpf"
                    control={control}
                    render={({ field: {onChange, ...field} }) => (
                        <TextField
                            {...field}
                            id="cpf"
                            label="CPF"
                            variant="outlined"
                            color="primary"
                            inputMode="text"
                            required
                            className="w-1/4"
                            margin="dense"
                            inputProps={{ maxLength: 11 }} 
                            onChange={e => {
                                if(!hasSpecialCharacters(e.target.value)){
                                    setValue('cpf', e.target.value)
                                    onChange(e)
                                }
                            }}
                        />
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="email"
                            label="E-mail"
                            variant="outlined"
                            color="primary"
                            inputMode="email"
                            type="email"
                            className="w-1/4"
                            margin="dense"
                        />
                    )}
                />
            </div>
            <div className="flex flex-row justify-between mx-5 my-5">
                <Controller
                    name="cep"
                    control={control}
                    render={({ field: { onBlur, onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="cep"
                            label="CEP"
                            variant="outlined"
                            color="primary"
                            inputMode="numeric"
                            className="w-1/4"
                            margin="dense"
                            required
                            onBlur={e => {
                                validaCep(e)
                                onBlur(e)
                            }}
                            onChange={e => {
                                if(!hasSpecialCharacters(e.target.value)){
                                    setValue('cep', e.target.value)
                                    onChange(e)
                                }
                            }}
                        />
    )}
                />
                <Controller
                    name="cidade"
                    control={control}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="cidade"
                            label="Cidade"
                            variant="outlined"
                            color="primary"
                            inputMode="text"
                            required
                            className="w-1/4"
                            margin="dense"
                            value={cidade}
                            onChange={(e) => {
                                onChange(e)
                                setCidade(e.target.value)
                            }}
                        />
                    )}
                />
                <Controller
                    name="endereco"
                    control={control}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="endereco"
                            label="Endereço"
                            variant="outlined"
                            color="primary"
                            inputMode="text"
                            required
                            className="w-1/4"
                            margin="dense"
                            value={endereco}
                            onChange={e => {
                                onChange(e)
                                setEndereco(e.target.value)
                            }}
                        />
                    )}
                />

            </div>
            <div className="flex flex-row justify-between mx-5 my-5">
                <Controller
                    name="bairro"
                    control={control}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="bairro"
                            label="Bairro"
                            variant="outlined"
                            color="primary"
                            inputMode="text"
                            required
                            className="w-1/4"
                            margin="dense"
                            value={bairro}
                            onChange={e => {
                                onChange(e)
                                setBairro(e.target.value)
                            }}
                        />
    )}
                />

                <Controller
                    name="uf"
                    control={control}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="uf"
                            label="Estado"
                            variant="outlined"
                            color="primary"
                            inputMode="text"
                            required
                            className="w-1/4"
                            margin="dense"
                            value={uf}
                            onChange={e => {
                                onChange(e)
                                setUf(e.target.value)
                            }}
                        />
                    )}
                />

                <Controller
                    name="numero"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="numero"
                            label="Número"
                            variant="outlined"
                            color="primary"
                            inputMode="numeric"
                            required
                            className="w-1/4"
                            margin="dense"
                        />
                    )}
                />


            </div>
            <div className="flex flex-row justify-between mx-5 my-5">

                <Controller
                    name="pessoa_contato"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="pessoa_contato"
                            label="Pessoa de Contato"
                            variant="outlined"
                            color="primary"
                            inputMode="text"
                            className="w-1/4"
                            margin="dense"
                        />
                    )}
                />

                <Controller
                    name="telefone1"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="telefone1"
                            label="Telefone 1"
                            variant="outlined"
                            color="primary"
                            inputMode="tel"
                            className="w-1/4"
                            margin="dense"
                        />
                    )}
                />


                <Controller
                    name="telefone2"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="telefone2"
                            label="Telefone 2"
                            variant="outlined"
                            color="primary"
                            inputMode="tel"
                            className="w-1/4"
                            margin="dense"
                        />
                    )}
                />

            </div>
        </div>
    )
}