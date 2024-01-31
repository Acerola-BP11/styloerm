import { auth } from "@/utils/firebase";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";

export default function DeleteConfirmationModal({ selectedIds, text, onDelete, confirmationModalOpen, setConfirmationModalOpen, title, setSelectedIds }) {
    

    const handleClose = () => {
        setConfirmationModalOpen(false)
    }
    const handleConfirm = () => {
        axios.post('http://localhost:3500/clients/delete', {ids: selectedIds}, {
            headers: {
                'Authorization': auth.currentUser.getIdToken()
            }
        })
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