import { Delete } from "@mui/icons-material";
import { Autocomplete, Button, Divider, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

export default function NewSale({ control, setValue }) {

    const [adress, setAdress] = useState('')
    const [city, setCity] = useState('')
    const [razao, setRazao] = useState('')
    const [product, SetProduct] = useState('')
    const [quantity, setQuantity] = useState('')
    const [cloth, setCloth] = useState('')
    const [pattern, setPattern] = useState('')
    const [patternCode, setPatternCode] = useState('')
    const [colorCode, setColorCode] = useState('')
    const [size, setSize] = useState('')
    const [finishing, setFinishing] = useState('')
    const [unitaryPrice, setUnitaryPrice] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const [itensArray, setItensArray] = useState([])
    const [clientsArray, setClientsArray] = useState([])

    const disableArrowSx = {
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
        },
        "& input[type=number]": {
            MozAppearance: "textfield",
        },
    }

    function handleDelete(idx) {
        const newItensArray = [...itensArray]
        newItensArray.splice(idx, 1)
        setItensArray(newItensArray)
    }

    function clearItemInput() {
        SetProduct('')
        setQuantity('')
        setCloth('')
        setPattern('')
        setPatternCode('')
        setColorCode('')
        setSize('')
        setFinishing('')
        setUnitaryPrice('')
        setTotalPrice('')
    }

    function addItem() {
        const item = {
            product,
            quantity,
            cloth,
            pattern,
            patternCode,
            colorCode,
            size,
            finishing,
            unitaryPrice,
            totalPrice
        }
        setItensArray([...itensArray, item])
        clearItemInput()
    }

    useEffect(() => {
        try {
            const clients = axios.get('http://localhost:3500/clients/autoFill')
            setClientsArray(clients)
        } catch (error) {
            alert('Não foi possivel coletar os dados de cliente')
        }

    }, [])

    return (
        <div
            className="flex flex-col justify-evenly m-2 h-full"
        >
            <div className="h-full w-full flex flex-row justify-between mb-5">
                <Controller
                    control={control}
                    name="cliente"
                    rules={{
                        required: true
                    }}
                    render={({ field: { onBlur, ...field } }) => (
                        <Autocomplete
                            {...field}
                            disablePortal
                            id="cliente"
                            options={[321, 325]}
                            renderInput={(params) => <TextField {...params} label="Cliente" />}
                            fullWidth
                        />
                    )}
                />

            </div>
            <div
                className="h-full w-full flex flex-row justify-between"
            >
                <Controller
                    control={control}
                    name="cidade"
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="city"
                            className="w-5/12"
                            inputMode="text"
                            label="Cidade"
                            value={city}
                            onChange={e => {
                                setCity(e.target.value)
                                onChange(e)
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="endereco"
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="adress"
                            className="w-5/12"
                            inputMode="text"
                            label="Endereço"
                            value={adress}
                            onChange={e => {
                                setAdress(e.target.value)
                                onChange(e)
                            }}
                        />
                    )}
                />

            </div>
            <div className="h-full">
                <Divider
                    component={'div'}
                    color="white"
                    role="presentation"
                    className="w-full my-5"
                    textAlign="center"
                >
                    <Typography
                        fontSize={'20px'}
                        className="text-center w-full"
                    >
                        Cadastro de Item
                    </Typography>
                </Divider>

                <div className="flex flex-wrap justify-center">
                    <TextField
                        label="Produto"
                        inputMode="text"
                        value={product}
                        onChange={e => {
                            SetProduct(e.target.value)
                        }}
                        className="m-5"
                    />
                    <TextField
                        label="Quantidade"
                        type="number"
                        value={quantity}
                        onChange={e => {
                            setQuantity(e.target.value)
                        }}
                        className="m-5"
                        sx={disableArrowSx}
                    />
                    <TextField
                        label="Tecido"
                        inputMode="text"
                        value={cloth}
                        onChange={e => {
                            setCloth(e.target.value)
                        }}
                        className="m-5"
                    />
                    <TextField
                        label="Cor"
                        inputMode="text"
                        value={colorCode}
                        onChange={e => {
                            setColorCode(e.target.value)
                        }}
                        className="m-5"
                    />
                    <TextField
                        label="Desenho"
                        inputMode="text"
                        value={pattern}
                        onChange={e => {
                            setPattern(e.target.value)
                        }}
                        className="m-5"
                    />
                    <TextField
                        label="Cod Desenho"
                        inputMode="text"
                        value={patternCode}
                        onChange={e => {
                            setPatternCode(e.target.value)
                        }}
                        className="m-5"
                    />
                    <TextField
                        label="Tamanho"
                        inputMode="text"
                        value={size}
                        onChange={e => {
                            setSize(e.target.value)
                        }}
                        className="m-5"
                    />
                    <TextField
                        label="Acabamento"
                        inputMode="text"
                        value={finishing}
                        onChange={e => {
                            setFinishing(e.target.value)
                        }}
                        className="m-5"
                    />
                    <TextField
                        label="Preço Unitário"
                        type="number"
                        value={unitaryPrice}
                        onChange={e => {
                            setUnitaryPrice(e.target.value)
                        }}
                        className="m-5"
                        sx={disableArrowSx}
                    />
                    <TextField
                        label="Preço Total"
                        type="number"
                        value={totalPrice}
                        onChange={e => {
                            setTotalPrice(e.target.value)
                        }}
                        sx={disableArrowSx}
                        className="m-5"
                    />
                    <div className="w-full h-auto flex justify-end">
                        <Button
                            className="mr-12 border-red-600 text-gray-200"
                            variant="outlined"
                            onClick={clearItemInput}
                        >
                            Limpar Campos
                        </Button>
                        <Button
                            className="mr-12"
                            variant="outlined"
                            onClick={addItem}
                        >
                            Adicionar Item
                        </Button>
                    </div>
                </div>
            </div>
            {itensArray.length !== 0 && (
                <div>
                    <Divider
                        component={'div'}
                        color="white"
                        role="presentation"
                        className="w-full my-5"
                        textAlign="center"
                    >
                        <Typography
                            fontSize={'20px'}
                            className="text-center"
                        >
                            Itens
                        </Typography>
                    </Divider>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Produto</TableCell>
                                    <TableCell align="center">Quantidade</TableCell>
                                    <TableCell align="center">Tecido</TableCell>
                                    <TableCell align="center">Cor</TableCell>
                                    <TableCell align="center">Desenho</TableCell>
                                    <TableCell align="center">Cod Desenho</TableCell>
                                    <TableCell align="center">Tamanho</TableCell>
                                    <TableCell align="center">Acabamento</TableCell>
                                    <TableCell align="center">Preço Unitário</TableCell>
                                    <TableCell align="center">Preço Total</TableCell>
                                    <TableCell align="center" padding="none"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {itensArray.map((row, idx) => (
                                    <TableRow
                                        key={idx + 1}
                                    >
                                        <TableCell align="center">{row.product}</TableCell>
                                        <TableCell align="center">{row.quantity}</TableCell>
                                        <TableCell align="center">{row.cloth}</TableCell>
                                        <TableCell align="center">{row.colorCode}</TableCell>
                                        <TableCell align="center">{row.pattern}</TableCell>
                                        <TableCell align="center">{row.patternCode}</TableCell>
                                        <TableCell align="center">{row.size}</TableCell>
                                        <TableCell align="center">{row.finishing}</TableCell>
                                        <TableCell align="center">{row.unitaryPrice}</TableCell>
                                        <TableCell align="center">{row.totalPrice}</TableCell>
                                        <TableCell align="center" padding="none">
                                            <IconButton
                                                onClick={() => {
                                                    handleDelete(idx)
                                                }}
                                            >
                                                <Delete
                                                    className="text-red-700"
                                                />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    )
}