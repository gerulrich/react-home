import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { homeApi } from '../../api/homeApi';
import { Avatar, Box, Chip, CircularProgress, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, Menu, MenuItem, Modal, Typography } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { AlbumTracksCard } from './components/AlbumTracksCard';
import { Divider, ListItemSecondaryAction, ListItemText } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PlaylistPlay } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addSongsToQueue } from '../../store/slices/player';
import WavesIcon from '@mui/icons-material/Waves';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 850,
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

const LocalAlbumPage = () => {
    
    const { albumId } = useParams();
    const [album, setAlbum] = useState({title: '', artist: '', tracks: []});
    const [menuTrack, setMenuTrack] = useState(null);
    const [imageDataUrl, setImageDataUrl] = useState(null);
    const [spectogramTitle, setSpectogramTitle] = useState(null);

    useEffect(() => {
        homeApi.get(`/music/albums/${albumId}`).then(result => setAlbum(result.data));
    }, []);

    useEffect(() => {
      if (!albumId || !menuTrack) return;
      setSpectogramTitle(menuTrack.title);
      // Realizar la solicitud a través de Axios
      homeApi.get(`/music/albums/${albumId}/tracks/${menuTrack?.uid}/spectrumpic`, {
        responseType: 'arraybuffer', // Para obtener la respuesta como un ArrayBuffer
      })
      .then(response => {
        // Convertir el ArrayBuffer a una URL de datos (data URL)
        const base64String = btoa(
          new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        const dataUrl = `data:${response.headers['content-type']};base64,${base64String}`;
        setImageDataUrl(dataUrl);
      })
      .catch(error => {
        console.error('Error al obtener la imagen:', error);
      });
    }, [albumId, menuTrack]);

    const dispatch = useDispatch();

    const toTime = (seconds) => {
        var date = new Date(null);
        date.setSeconds(seconds);
        return date.toISOString().substr(14, 5);
     }

     const [anchorEl, setAnchorEl] = useState(null);
     
     const [openModal, setOpenModal] = useState(false);
     const handleCloseModal = () => {
        setOpenModal(false);
        setMenuTrack(null);
        setImageDataUrl(null);
     }

     const handleClick = (event, track) => {
       setAnchorEl(event.currentTarget);
       setMenuTrack(track);
     };

     const handleClose = () => {
        setAnchorEl(null);
        setMenuTrack(null);
      };
    
      const onAddTrackToQueue = () => {
        const song = {
            ...menuTrack, 
            cover_url: album.cover_url
         }
         dispatch(addSongsToQueue({songs: [song], replace: false, play: true}))
        handleClose();
      }

      const onPlaySong = (track) => {
         const song = {
            ...track, 
            cover_url: album.cover_url
         }
         dispatch(addSongsToQueue({songs: [song], replace: true, play: true}))
      }

      const onShowSpectogram = () => {
        setOpenModal(true);
        handleClose();
      }

    return (
        
        <PageContainer title="Musica - Detalle local" description="">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <DashboardCard title={album.artist}>
                    <Grid container>
                <Grid item xs={12} md={4} lg={3}>
                <Avatar
                            variant="square"
                            alt={album.title}
                            src={album.cover_url}
                            sx={{ width: 250, height: 250 }}
                        />
                        
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                <Typography variant='h3'>{album.title}</Typography>
                { album.format !== ''
                ?
                (<Grid item xs={12} mt={2}>
                    <Chip icon={<MusicNoteIcon />} label={album.format} size="small" variant="outlined" />
                </Grid>
                ):(<></>)
                }
            </Grid>
            
        </Grid> 
        </DashboardCard>
                    </Grid>
                    <Grid item xs={12}>
                        
                    <DashboardCard title="Canciones" spacing={3}>
                    <List component="div" >
                    { album.tracks.map((track) => (
                        <>
                            <ListItem key={track.uid} dense>
                                <ListItemAvatar>
                                    <IconButton onClick={() => onPlaySong(track)}>
                                        <PlayArrowIcon fontSize='small'/>
                                    </IconButton>
                                </ListItemAvatar>

                                <ListItemText 
                                    primary={track.track_number + '. ' + track.title}
                                    secondary={track.artist}
                                />
                    
                                <ListItemSecondaryAction>
                                    <Grid container alignItems="center" >
                                        <Grid item>
                                            <ListItemText primary={toTime(track.duration)} />
                                        </Grid>
                                        <Grid>
                                            <IconButton size="small" onClick={(event) => handleClick(event, track)}>
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider sx={{borderStyle:'dashed'}}/>
                        </>
                    ))}
                    </List>                        
                    </DashboardCard>
                        

                    </Grid>
                </Grid>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={onAddTrackToQueue}>
                    <ListItemIcon>
                        <PlaylistPlay size="16" />
                    </ListItemIcon>
                    <ListItemText>Agregar al final de la lista</ListItemText>
                </MenuItem>
                <MenuItem onClick={onShowSpectogram}>
                    <ListItemIcon>
                        <WavesIcon size="16" />
                    </ListItemIcon>
                    <ListItemText>Ver espectograma</ListItemText>
                </MenuItem>
            </Menu>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Espectograma de '{spectogramTitle}'
                </Typography>
                <div spacing={2}>
                    {imageDataUrl ? (
                        <img src={imageDataUrl} alt="Imagen generada" width="100%"/>
                    ) : (
                        <CircularProgress color="inherit" />
                    )}
                </div>
                
                
            </Box>
        </Modal>

        </PageContainer>
        
    );

};

export default LocalAlbumPage;
