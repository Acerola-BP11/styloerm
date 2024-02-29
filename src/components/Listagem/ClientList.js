'use client'
import { DataGrid, ptBR } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import DeleteConfirmationModal from "../Cadastro/DeleteConfirmationModal";

export default function ClientList() {
    const [loading, setLoading] = useState(true)
    const [rows, setRows] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

    const getRows = async () => {
        try {
            const response = await axios.get('https://styloapi.vercel.app/clients', {
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            })
            const clients = await response.data

            const mappedRows = clients.map((client, idx) => ({
                id: idx + 1,
                razao_nome: client.razao || client.nome,
                cnpj_cpf: client.cnpj || client.cpf,
                endereco: `${client.endereco} ${client.numero}`,
                cidade: client.cidade,
                uf: client.estado,
                inscricao_estadual: client.inscricao_estadual || ' ',
                tipo: client.cnpj ? 'Júridico' : 'Físico'
            }));

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
        const selectedCNPJs = newSelection.map(index => rows[index - 1]?.cnpj_cpf).filter(Boolean)
        setSelectedIds(selectedCNPJs);
    }

    const EditButton = ({ id }) => (
        <IconButton
            href={`https://styloerm.vercel.app/clientes/${id}`}
        >
            <Edit/>
        </IconButton>
    );

    function showDataGrid() {
        const columns = [
            { field: 'razao_nome', headerName: 'Razão Social / Nome', width: 300 },
            { field: 'cnpj_cpf', headerName: 'CNPJ / CPF', width: 150 },
            { field: 'endereco', headerName: 'Endereço', width: 300 },
            { field: 'cidade', headerName: 'Cidade', width: 200 },
            { field: 'uf', headerName: 'UF', width: 100 },
            { field: 'inscricao_estadual', headerName: 'Inscrição Estadual', width: 150 },
            { field: 'tipo', headerName: 'Tipo', width: 100 },
            {
                field: 'edit', headerName: 'Editar', width: 100, disableColumnMenu: true, filterable: false, hideable: false, sortable: false,
                renderCell: (params) => <EditButton id={params.row.cnpj_cpf} />
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
            let row = {}
            row.id = idx + 1
            row.razao_nome = client.razao_nome
            row.cnpj_cpf = client.cnpj_cpf
            row.endereco = `${client.endereco}`
            row.cidade = client.cidade
            row.uf = client.uf
            row.inscricao_estadual = client.inscricao_estadual,
                row.tipo = client.tipo === 'Júridico' ? 'Jurídica' : 'Física'
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
            url={'https://styloapi.vercel.app/clients/delete'}
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