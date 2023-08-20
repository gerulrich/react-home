import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Checkbox, Chip, CircularProgress, FormControlLabel, FormGroup, Grid, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DashboardCard from '../../../components/shared/DashboardCard';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TerminalIcon from '@mui/icons-material/Terminal';
import { IconBadgeHd, IconBadgeSd } from '@tabler/icons-react';
import { homeApi } from '../../../api/homeApi';

export const AlbumDownloadCard = ({album, onStartDownload}) => {
  
    const { isDownloading } = useSelector( state => state.music );
    const [localAlbum, setLocalAlbum] = useState({format: ''});
    const [bookmark, setBookmark] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        console.log(album);
        album.id && homeApi.get(`/music/albums/DEEZER/${album.id}`)
            .then(resp => {
                setLocalAlbum(resp.data);
                console.log(resp);
                }
                )
            .catch(error => console.info(`Àlbum ${album.id} not found`));
    }, [album, isDownloading])
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDownloadFlac = () => {
        onStartDownload('flac');
        handleClose();
    }

    const handleDownloadMP3 = () => {
        onStartDownload('mp3');
        handleClose();
    }

    const onAddToWishList = () => {
        console.log("Click en checkbox")
        setBookmark(!bookmark);
    }

   return (
    <DashboardCard title={album.artist}>
        {/* Caratula y opciones de descarga*/}
        <Grid container>
            <Grid item xs={12} md={4} lg={3}><img src={album.cover_url}/></Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Typography variant='h3'>{album.title}</Typography>
                <Grid item xs={12} mt={2}>
                    
                <FormGroup>
                    <FormControlLabel control={ <Checkbox size="large"
                        icon={<BookmarkBorderIcon />}
                        checkedIcon={<BookmarkIcon />}
                        checked={bookmark}
                        onChange={onAddToWishList}
                        />} label="Añadir a la lista de descargas"
                        />
                </FormGroup>
                
                </Grid>
                
                { localAlbum.format !== ''
                ?
                (<Grid item xs={12} mt={2}>
                    <Chip icon={<MusicNoteIcon />} label={localAlbum.format} size="small" variant="outlined" />
                </Grid>
                ):(<></>)
                }

                <Grid item xs={12} mt={2} alignContent="center">
                    {
                        isDownloading 
                        ? (<>
                                <Grid container
                                    width="100%"
                                    spacing={1}
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <CircularProgress color="primary" />
                                    </Grid>                                
                                </Grid>
                           </>)
                        : (<Button
                            id="download-button"
                            aria-controls={open ? 'download-button' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            Descargar
                        </Button>)
                    }

                    <Menu
                        id="download-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                        sx={{'& .MuiMenu-paper': {width: '200px', },}}
                    >
                        <MenuItem onClick={handleDownloadFlac}>
                            <ListItemIcon>
                                <IconBadgeHd width={30} />
                            </ListItemIcon>
                            <ListItemText>Descargar en flac</ListItemText>
                        </MenuItem>
                    
                        <MenuItem onClick={handleDownloadMP3}>
                            <ListItemIcon>
                                <IconBadgeSd width={30} />
                            </ListItemIcon>
                            <ListItemText>Descargar en mp3</ListItemText>
                        </MenuItem>
                    </Menu>
                </Grid>
            </Grid>
        </Grid>
    </DashboardCard>
  )
}

export default AlbumDownloadCard;
