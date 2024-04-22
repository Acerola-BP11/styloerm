'use client'
import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Controller } from "react-hook-form";

export default function EditClientFisico({ control, client, editing, setValue }) {
    const [cidade, setCidade] = useState(client.cidade || '');
    const [endereco, setEndereco] = useState(client.endereco || '');
    const [bairro, setBairro] = useState(client.bairro || '');
    const [uf, setUf] = useState(client.estado || '');


    const validaCep = async (evento) => {
        const cep = evento.target.value
        if (cep !== '') {
            try {
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
                    defaultValue={client.nome}
                    rules={{
                        required: true
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="name"
                            label="Nome"
                            required
                            color="primary"
                            inputMode="text"
                            className="w-1/4 sm:w-3/4"
                            margin="dense"
                            disabled={!editing}
                        />
                    )}
                />

                <Controller
                    name="cpf"
                    control={control}
                    defaultValue={client.cpf}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="cpf"
                            label="CPF"
                            variant="outlined"
                            color="primary"
                            inputMode="text"
                            required
                            className="w-1/4 sm:w-3/4"
                            margin="dense"
                            inputProps={{ maxLength: 11 }}
                            onChange={e => {
                                if (!hasSpecialCharacters(e.target.value)) {
                                    setValue('cpf', e.target.value)
                                    onChange(e)
                                }
                            }}
                            disabled={!editing}
                        />
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    defaultValue={client.email}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="email"
                            label="E-mail"
                            variant="outlined"
                            color="primary"
                            inputMode="email"
                            type="email"
                            className="w-1/4 sm:w-3/4"
                            margin="dense"
                            disabled={!editing}
                        />
                    )}
                />
            </div>
            <div className="flex flex-row justify-between mx-5 my-5">
                <Controller
                    name="cep"
                    control={control}
                    defaultValue={client.cep}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onBlur, onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="cep"
                            label="CEP"
                            variant="outlined"
                            color="primary"
                            inputMode="numeric"
                            className="w-1/4 sm:w-3/4"
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
                            disabled={!editing}
                        />
                    )}
                />
                <Controller
                    name="cidade"
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="cidade"
                            label="Cidade"
                            defaultValue={client.cidade}
                            variant="outlined"
                            color="primary"
                            inputMode="text"
                            required
                            className="w-1/4 sm:w-3/4"
                            margin="dense"
                            value={cidade}
                            onChange={(e) => {
                                onChange(e)
                                setCidade(e.target.value)
                            }}
                            disabled={!editing}
                        />
                    )}
                />
                <Controller
                    name="endereco"
                    control={control}
                    defaultValue={client.endereco}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="endereco"
                            label="Endereço"
                            variant="outlined"
                            color="primary"
                            inputMode="text"
                            required
                            className="w-1/4 sm:w-3/4"
                            margin="dense"
                            value={endereco}
                            onChange={e => {
                                onChange(e)
                                setEndereco(e.target.value)
                            }}
                            disabled={!editing}
                        />
                    )}
                />

            </div>
            <div className="flex flex-row justify-between mx-5 my-5">
                <Controller
                    name="bairro"
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="bairro"
                            defaultValue={client.bairro}
                            label="Bairro"
                            variant="outlined"
                            color="primary"
                            inputMode="text"
                            required
                            className="w-1/4 sm:w-3/4"
                            margin="dense"
                            value={bairro}
                            onChange={e => {
                                onChange(e)
                                setBairro(e.target.value)
                            }}
                            disabled={!editing}
                        />
                    )}
                />

                <Controller
                    name="uf"
                    control={control}
                    defaultValue={client.estado}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="uf"
                            label="Estado"
                            variant="outlined"
                            color="primary"
                            inputMode="text"
                            required
                            className="w-1/4 sm:w-3/4"
                            margin="dense"
                            value={uf}
                            onChange={e => {
                                onChange(e)
                                setUf(e.target.value)
                            }}
                            disabled={!editing}
                        />
                    )}
                />

                <Controller
                    name="numero"
                    control={control}
                    rules={{
                        required: true
                    }}
                    defaultValue={client.numero}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="numero"
                            label="Número"
                            variant="outlined"
                            color="primary"
                            inputMode="numeric"
                            required
                            className="w-1/4 sm:w-3/4"
                            margin="dense"
                            disabled={!editing}
                        />
                    )}
                />


            </div>
            <div className="flex flex-row justify-between mx-5 my-5">

                <Controller
                    name="pessoa_contato"
                    control={control}
                    defaultValue={client.pessoa_contato}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="pessoa_contato"
                            label="Pessoa de Contato"
                            variant="outlined"
                            color="primary"
                            inputMode="text"
                            className="w-1/4 sm:w-3/4"
                            margin="dense"
                            disabled={!editing}
                        />
                    )}
                />

                <Controller
                    name="telefone1"
                    control={control}
                    defaultValue={client.telefone1}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="telefone1"
                            label="Telefone 1"
                            variant="outlined"
                            color="primary"
                            inputMode="tel"
                            className="w-1/4 sm:w-3/4"
                            margin="dense"
                            disabled={!editing}
                        />
                    )}
                />


                <Controller
                    name="telefone2"
                    control={control}
                    defaultValue={client.telefone2}
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
                            disabled={!editing}
                        />
                    )}
                />

            </div>
        </div>
    )
}