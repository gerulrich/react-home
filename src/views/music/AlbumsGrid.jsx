import { useSelector } from "react-redux";
import { CardContent, Chip, Fab, Grid, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, Tooltip, Typography } from "@mui/material";
import { IconPlayerPlay, IconListDetails } from "@tabler/icons-react";
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BlankCard from "../../components/shared/BlankCard";

export const AlbumsGrid = ({albums = [], onPlaySongs, onQueueSongs, onDetailsAlbum, onEditAlbum, onDeleteAlbum}) => {
    const { user } = useSelector(state => state.auth);
    const isAdmin = user.roles.includes('ADMIN_ROLE');
  
    return (
    <>
    {albums.map((album, index) => (
        <Grid item sm={12} md={4} lg={3} key={index}>
            <BlankCard>
                <Typography>
                    <img src={album.cover_url} alt="img" width="100%" />
                </Typography>
                
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ '& .MuiFab-primary': { width: 40, height: 40 },bottom: '75px', left: '15px', position: 'absolute' }}
                    icon={<SpeedDialIcon size="16"/>}
                >
                    <SpeedDialAction
                        icon={<PlaylistPlayIcon size="16" />}
                        tooltipTitle="Agregar a la lista"
                        onClick={() => onQueueSongs(album)}
                    />

                    <SpeedDialAction
                        icon={<IconListDetails size="16" />}
                        tooltipTitle="Ver Detalles"
                        onClick={() => onDetailsAlbum(album)}
                    />
                    
                    
                        { isAdmin && (
                            <SpeedDialAction
                                icon={<EditIcon size="16" />}
                                tooltipTitle="Editar"
                                onClick={() => onEditAlbum(album)}
                            />)
                        }

                        { isAdmin && (
                            <SpeedDialAction
                                icon={<DeleteIcon size="16" />}
                                tooltipTitle="Eliminar"
                                onClick={() => onDeleteAlbum(album)}
                            />
                            )
                        }

                            
                
                    
                </SpeedDial>
                
                {
                    album.format == 'FLAC' || album.format == 'MP3_320'
                    ? (<Chip 
                        icon={<MusicNoteIcon />} label={album.format.replace('_', ' ').toLowerCase()} size="small"
                        sx={{ top: '10px', right: '10px', position: 'absolute' }}
                        color="primary"
                        />)
                    :(<></>)
                }

                
                
                <Tooltip title="Reproducir">
                    <Fab
                        size="small"
                        color="primary"
                        sx={{ bottom: '75px', left: '70px', position: 'absolute' }}
                        onClick={() => onPlaySongs(album)}
                    >
                        <IconPlayerPlay size="16" />
                    </Fab>
                </Tooltip>

                <CardContent sx={{ p: 3, pt: 2 }}>
                    <Stack direction="column" alignItems="flex-start" justifyContent="space-between" mt={1}>
                        <Typography variant="span" sx={{ textDecoration: 'bold' }}>{album.artist}</Typography>
                        <Typography variant="span" sx={{fontWeight: 'bold'}}>{album.title}</Typography>                                
                    </Stack>
                </CardContent>
            </BlankCard>
        </Grid>
        ))}
  </>)
}
