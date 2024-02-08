import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";

export default function DeleteConfirmationModal({ selectedIds, text, onDelete, confirmationModalOpen, setConfirmationModalOpen, title, setSelectedIds, url }) {
    

    const handleClose = () => {
        setConfirmationModalOpen(false)
    }
    const handleConfirm = async () => {
        await axios.delete(url, { data: { ids: selectedIds }, headers: {
            "Authorization": localStorage.getItem('token')
        } })
        setSelectedIds([])
        setConfirmationModalOpen(false)
        onDelete()
    }

    return (
        <Dialog
            open={confirmationModalOpen}
            onClose={handleClose}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    autoFocus
                >
                    Cancelar
                </Button>
                <Button
                    onClick={handleConfirm}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}