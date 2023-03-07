import { useState } from "react";
import { useDispatch } from "react-redux"
import { Badge, Box, Button, Grid, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { addSongsToQueue, setCurrentSong } from "../../store/slices/player";


export const PlayerQueue = ({songs, currentSong}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const onMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const onMenuClose = () => setAnchorEl(null);
    
    const onSelectSong = (index) => {
        dispatch(setCurrentSong({currentSong: index}));
        setAnchorEl(null);
    };

    const onClearQueue = () => {
        dispatch(addSongsToQueue({songs: [], replace: true, play: false}));
        setAnchorEl(null);
    }

    return (
        <>
            <Grid container
                width="100%"
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                space={2}
            >
                <Grid item mr={2}>
                    <Badge badgeContent={songs.length} overlap="circular" color="secondary">
                        <IconButton size="large" onClick={onMenuOpen}>
                            <QueueMusicIcon />
                        </IconButton>
                    </Badge>
                </Grid>
            </Grid>

            <Menu
                id="song-queue-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={onMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{
                    '& .MuiMenu-paper': {
                        width: '350px',
                        height: '195px',
                        zIndex: 10001,
                        border: '1px solid',
                        borderColor: theme.palette.grey[200],
                        position: 'relative',
                    },
                }}
                PaperProps={{style: {marginTop: "-20px"}}}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {
                    songs.map((song, index) => {
                        if (index === currentSong) {
                            return (<MenuItem 
                                        key={index}
                                        sx={{fontWeight: 'bold'}}
                                        onClick={() => onSelectSong(index)}
                                    >
                                        {(index+1)} - {song.title} - { song.artist }
                                    </MenuItem>
                            )
                        }
                        return (<MenuItem 
                                    key={index}
                                    onClick={() => onSelectSong(index)}
                                >
                                    {(index+1)} - {song.title} - { song.artist }
                                </MenuItem>
                        )
                    }
                )}
                
                <Box mt={1} py={1} px={2} justifyContent="space-around">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={onClearQueue}
                        startIcon={<ClearAllIcon />}
                    >
                        Limpiar lista
                    </Button>
                </Box>
            </Menu>
        </>
    )
}
