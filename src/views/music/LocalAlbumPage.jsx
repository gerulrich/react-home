import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { homeApi } from '../../api/homeApi';
import { Avatar, Box, Chip, Grid, IconButton, List, ListItem, ListItemAvatar, Typography } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { AlbumTracksCard } from './components/AlbumTracksCard';
import { Divider, ListItemSecondaryAction, ListItemText } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const LocalAlbumPage = () => {
    
    const { albumId } = useParams();
    const [album, setAlbum] = useState({title: '', artist: '', tracks: []});
    useEffect(() => {
        homeApi.get(`/music/albums/${albumId}`).then(result => setAlbum(result.data));
    }, []);

    const toTime = (seconds) => {
        var date = new Date(null);
        date.setSeconds(seconds);
        return date.toISOString().substr(14, 5);
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
        </PageContainer>
        
    );

};

export default LocalAlbumPage;
