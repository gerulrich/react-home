import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmationDialog = ({ open, onClose, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Eliminación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas eliminar este elemento?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onDelete} variant="contained" color="error">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;