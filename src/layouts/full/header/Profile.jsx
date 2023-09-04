import { useEffect, useState } from 'react';
import {
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  FormControlLabel,
  Checkbox} from '@mui/material';
import { IconListCheck, IconMail, IconUser } from '@tabler/icons-react';
import { useAuthStore } from 'src/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setShowAll } from '../../../store/slices/ui/uiSlice';
import { StatusAvatar } from './StatusAvatar';

const Profile = () => {
  const {startLogout} = useAuthStore();
  
  const {showAll} = useSelector(state => state.ui);
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const onChangeShowAll = (_, value) => dispatch(setShowAll({showAll: value}))
  const isAdmin = user.roles.includes('ADMIN_ROLE');

  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
      if (showAll) {
        localStorage.setItem('hiddenContent', 'true')
      } else {
        localStorage.removeItem('hiddenContent')
      }
  }, [showAll])

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <StatusAvatar src="https://mui.com/static/images/avatar/2.jpg"/>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem>

        {
          isAdmin
            ? (<MenuItem>
              <ListItemIcon>
                <FormControlLabel
                  control={<Checkbox checked={showAll} onChange={onChangeShowAll} />}
                  label="Mostrar todo"
                />
              </ListItemIcon>
            </MenuItem>)
            : (<></>)
        }

        <Box mt={1} py={1} px={2}>
          <Button 
            variant="outlined"
            color="primary"
            onClick={() => startLogout()}
            fullWidth>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
