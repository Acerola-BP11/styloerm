'use client'
import { DataGrid, ptBR } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import DeleteConfirmationModal from "../Cadastro/DeleteConfirmationModal";

export default function OrdersList() {
    const [loading, setLoading] = useState(true)
    const [rows, setRows] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

    const getRows = async () => {
        try {
            const response = await axios.get('http://localhost:3500/orders', {
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            })
            const orders = await response.data

            const mappedRows = orders.map((order, idx) => ({
                id: idx + 1,
                orderId: order._id,
                client: order.clientInfo[0].razao || order.clientInfo[0].nome,
                cnpj_cpf: order.clientInfo[0].cnpj || order.clientInfo[0].cpf,
                city: order.city,
                adress: order.adress,
                budget: order.budget,
                step: order.step,
                date: new Date(order.Date),
                delivered: order.delivered,
                canceled: order.canceled
            }));
            console.log(typeof mappedRows[0].date)
            setRows(mappedRows)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        getRows()
    }, [])

    const handleDelete = async () => {
        setConfirmationModalOpen(true)
    };

    const handleRowSelectionChange = (newSelection) => {
        const selectedIds = newSelection.map(index => rows[index - 1]?.orderId).filter(Boolean)
        setSelectedIds(selectedIds);
    }

    const EditButton = ({ id }) => (
        <IconButton
            href={`http://localhost:3000/orders/${id}`}
        >
            <Edit/>
        </IconButton>
    );

    function showDataGrid() {
        const columns = [
            { field: 'client', headerName: 'Razao/Nome', width: 150 },
            { field: 'cnpj_cpf', headerName: 'CNPJ / CPF', width: 150},
            { field: 'city', headerName: 'Cidade', width: 150 },
            { field: 'adress', headerName: 'Endereço', width: 300, align: 'center' },
            { field: 'budget', headerName: 'Orçamento', width: 100, type: 'boolean' },
            { field: 'step', headerName: 'Passo', width: 150, headerAlign: 'center' },
            { field: 'date', headerName: 'Data do Pedido', width: 150, type: 'date', align: 'center', headerAlign: 'center' },
            { field: 'delivered', headerName: 'Entregue', width: 100, type: 'boolean' },
            { field: 'canceled', headerName: 'Cancelado', width: 100, type: 'boolean' },
            {
                field: 'edit', headerName: 'Editar', width: 100, disableColumnMenu: true, filterable: false, hideable: false, sortable: false,
                renderCell: (params) => <EditButton id={params.row.orderId} />
            },
            {
                field: 'delete', width: 100, sortable: false, menubar: false, disableColumnMenu: true,
                align: 'center', filterable: false, hideable: false, flex: 1,
                renderCell: () => <p> </p>,
                renderHeader: () => {
                    if (selectedIds.length > 0) {
                        return (
                            <IconButton
                                onClick={handleDelete}
                            >
                                <DeleteOutline
                                    className="text-red-600"
                                />
                            </IconButton>
                        )
                    } else {
                        return (
                            <IconButton
                                hidden
                            >
                                <DeleteOutline
                                    color="red"
                                />
                            </IconButton>
                        )
                    }
                }
            }
        ]
        const formattedRows = rows.map((client, idx) => {
            let row = client
            row.key = idx + 1
            return row
        })

        return (
            <>
            <DeleteConfirmationModal
            onDelete={getRows}
            text={<>Confirmar exclusão de {(selectedIds.length)} clientes, está ação é <strong>Irreversível</strong></>}
            confirmationModalOpen={confirmationModalOpen}
            setConfirmationModalOpen={setConfirmationModalOpen}
            selectedIds={selectedIds}
            title={<>Excluindo {selectedIds.length} registros</>}
            setSelectedIds={setSelectedIds}
            />
            <DataGrid
                rows={formattedRows}
                columns={columns}
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                checkboxSelection
                onRowSelectionModelChange={handleRowSelectionChange}
            />
            </>
        )
    }


    return (
        <div className="h-full w-full m-5">
            {loading ? <p>Carregando</p> : (
                showDataGrid()
            )}
        </div>
    )
}