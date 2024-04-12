'use client'
import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Controller } from "react-hook-form";

export default function EditClientJurico({ control, client, editing, setValue }) {
    const [cidade, setCidade] = useState(client.cidade || '')
    const [bairro, setBairro] = useState(client.bairro || '')
    const [endereco, setEndereco] = useState(client.endereco || '')
    const [uf, setUf] = useState(client.estado || '')

    const validaCep = async (evento) => {
        const cep = evento.target.value
        if (cep !== '') {
            try {
                console.log(`viacep.com.br/ws/${cep}/json/`)
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                const data = response.data
                console.log(data)
                setValue('cidade', data.localidade)
                setValue('bairro', data.bairro,)
                setValue('endereco', data.logradouro)
                setValue('uf', data.uf)
                setCidade(data.localidade)
                setBairro(data.bairro)
                setEndereco(data.logradouro)
                setUf(data.uf)
            } catch (err) {
                alert('O CEP digitado é invalido!')
            }

        }
    }
    return (
        <div>
            <div className="flex flex-row justify-between mx-5">

                <Controller
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="razao"
                            label="Razão Social"
                            variant="outlined"
                            color="primary"
                            inputMode="text"
                            required
                            className="w-1/4"
                            margin="dense"
                            disabled={!editing}
                        />
                    )}
                    control={control}
                    name="razao"
                    defaultValue={client.razao}
                    rules={{
                        required: true
                    }}

                />

                <Controller
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="nome_fantasia"
                            label="Nome Fantasia"
                            variant="outlined"
                            color="primary"
                            inputMode="text"
                            className="w-1/4"
                            margin="dense"
                            disabled={!editing}
                        />
                    )}
                    control={control}
                    name="nome_fantasia"
                    defaultValue={client.nome_fantasia}
                />


                <Controller
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="cnpj"
                            label="CNPJ"
                            variant="outlined"
                            color="primary"
                            inputMode="numeric"
                            required
                            className="w-1/4"
                            margin="dense"
                            disabled={!editing}
                            inputProps={{ maxLength: 14 }}
                            onChange={e => {
                                if (!hasSpecialCharacters(e.target.value)) {
                                    setValue('cnpj', e.target.value)
                                    onChange(e)
                                }
                            }}
                        />
                    )}
                    control={control}
                    name="cnpj"
                    defaultValue={client.cnpj}
                />

            </div>
            <div className="flex flex-row justify-between mx-5 my-5">

                <Controller
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
                            disabled={!editing}
                            onBlur={e => {
                                validaCep(e)
                                onBlur(e)
                            }}
                            onChange={e => {
                                if (!hasSpecialCharacters(e.target.value)) {
                                    setValue('cep', e.target.value)
                                    onChange(e)
                                }
                            }}
                        />
                    )}
                    defaultValue={client.cep}
                    control={control}
                    name="cep"
                    rules={{
                        required: true
                    }}
                />

                <Controller
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
                            disabled={!editing}
                            value={cidade}
                            onChange={(e) => {
                                onChange(e)
                                setCidade(e.target.value)
                            }}
                        />
                    )}
                    name="cidade"
                    control={control}
                    defaultValue={client.cidade}
                    rules={{
                        required: true
                    }}
                />

                <Controller
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
                            disabled={!editing}
                            value={endereco}
                            onChange={(e) => {
                                onChange(e)
                                setEndereco(e.target.value)
                            }}
                        />
                    )}
                    control={control}
                    name="endereco"
                    defaultValue={client.endereco}
                    rules={{
                        required: true
                    }}
                />
            </div>
            <div className="flex flex-row justify-between mx-5 my-5">

                <Controller
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
                            disabled={!editing}
                            value={bairro}
                            onChange={(e) => {
                                onChange(e)
                                setBairro(e.target.value)
                            }}
                        />
                    )}
                    control={control}
                    name="bairro"
                    defaultValue={client.bairro}
                    rules={{
                        required: true
                    }}
                />

                <Controller
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
                            disabled={!editing}
                            value={uf}
                            onChange={(e) => {
                                onChange(e.target)
                                setUf(e.target.value)
                            }}
                        />
                    )}
                    control={control}
                    name="uf"
                    defaultValue={client.estado}
                    rules={{
                        required: true
                    }}
                />


                <Controller
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
                            disabled={!editing}
                        />
                    )}
                    control={control}
                    name="numero"
                    defaultValue={client.numero}
                    rules={{
                        required: true
                    }}
                />

            </div>
            <div className="flex flex-row justify-between mx-5 my-5">
                <Controller
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
                            disabled={!editing}
                        />
                    )}
                    control={control}
                    name="pessoa_contato"
                    defaultValue={client.pessoa_contato}
                />

                <Controller
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
                            disabled={!editing}
                        />
                    )}
                    control={control}
                    name="telefone1"
                    defaultValue={client.telefone1}
                />

                <Controller
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
                    control={control}
                    name="telefone2"
                    defaultValue={client.telefone2}
                />
            </div>
            <div className="flex flex-row justify-between mx-5 my-5">

                <Controller
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
                            disabled={!editing}
                        />
                    )}
                    control={control}
                    name="email"
                    defaultValue={client.email}
                />

                <Controller
                    render={({ field: { onChange, ...field } }) => {
                        <TextField
                            {...field}
                            id="inscricao_estadual"
                            label="Inscrição Estadual"
                            variant="outlined"
                            required
                            color="primary"
                            inputMode="text"
                            className="w-1/4"
                            margin="dense"
                            disabled={!editing}
                            onChange={e => {
                                if (!hasSpecialCharacters(e.target.value)) {
                                    setValue('inscricao_estadual', e.target.value)
                                    onChange(e)
                                }
                            }}
                        />
                    }}
                    control={control}
                    name="inscricao_estadual"
                    defaultValue={client.inscricao_estadual}
                />
            </div>
        </div>
    )
}