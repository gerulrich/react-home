import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const FloatingButton = (props) => {
  const { onClick = () => { } } = props;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
      }}
    >
      <Fab color="primary" aria-label="add" onClick={onClick}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default FloatingButton;