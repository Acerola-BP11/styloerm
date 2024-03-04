'use client'
import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { hasSpecialCharacters } from "../../../public/util";

export default function CadastroPessoaJuridica({ control, setValue }) {

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
                setValue('cidade', data.localidade)
                setValue('bairro', data.bairro)
                setValue('endereco', data.logradouro)
                setValue('uf', data.estado)
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
                    />
                )}
                control={control}
                name="razao"
                
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
                    />
                )}
                control={control}
                name="nome_fantasia"
            />


            <Controller
                render={({ field: {onChange, ...field} }) => (
                    <TextField
                        {...field}
                        id="cnpj"
                        label="CNPJ"
                        variant="outlined"
                        color="primary"
                        required
                        className="w-1/4"
                        margin="dense"
                        type="text"
                        inputProps={{ maxLength: 14 }}  
                        onChange={e => {
                            if(!hasSpecialCharacters(e.target.value)){
                                setValue('cnpj', e.target.value)
                                onChange(e)
                            }
                        }}
                    />
                )}
                control={control}
                name="cnpj"
            />

        </div>
        <div className="flex flex-row justify-between mx-5 my-5">

            <Controller
                render={({ field: {onBlur, onChange, ...field} }) => (
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
                control={control}
                name="cep"
            />

            <Controller
                render={({ field: {onChange, ...field} }) => (
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
                name="cidade"
                control={control}
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
                        value={endereco}
                        onChange={(e) => {
                            onChange(e)
                            setEndereco(e.target.value)
                        }}
                    />
                )}
                control={control}
                name="endereco"
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
                        value={bairro}
                        onChange={(e) => {
                            onChange(e)
                            setBairro(e.target.value)
                        }}
                    />
                )}
                control={control}
                name="bairro"
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
                        value={uf}
                        onChange={(e) => {
                            onChange(e.target)
                            setUf(e.target.value)
                        }}
                    />
                )}
                control={control}
                name="uf"
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
                    />
                )}
                control={control}
                name="numero"
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
                    />
                )}
                control={control}
                name="pessoa_contato"
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
                    />
    )}
                control={control}
                name="telefone1"
            />

            <Controller
            render={({field}) => (
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
            control={control}
            name="telefone2"
            />
        </div>
        <div className="flex flex-row justify-between mx-5 my-5">
            
            <Controller
            render={({field}) => (
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
            control={control}
            name="email"
            />

            <Controller
            render={({field: {onChange, ...field}}) => (
                <TextField
                {...field}
                id="inscricao_estadual"
                label="Inscrição Estadual"
                variant="outlined"
                color="primary"
                inputMode="text"
                className="w-1/4"
                margin="dense"
                onChange={e => {
                    if(!hasSpecialCharacters(e.target.value)){
                        setValue('inscricao_estadual', e.target.value)
                        onChange(e)
                    }
                }}
            />
    )}
            control={control}
            name="inscricao_estadual"
            />
        </div>
    </div>
    )
}