import { Box, Button, CardContent, Fab, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { IconPlayerPlay } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import QueueIcon from '@mui/icons-material/Queue';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PageContainer from "../../components/container/PageContainer";
import BlankCard from "../../components/shared/BlankCard";
import DashboardCard from "../../components/shared/DashboardCard";
import { addSongsToQueue, setCurrentSong, setPlayPause } from "../../store/slices/player";

export const LocalMusicPage = () => {
    
    const dispatch = useDispatch();
    const [albums, setAlbums] = useState([]);
    const [page, setPage] = useState(0);

    const onQueueSongs = (album) => {
        dispatch(addSongsToQueue({songs: album.tracks, replace: false, play: true}));
    }

    const onPlaySongs = (album) => {
        dispatch(addSongsToQueue({songs: album.tracks, replace: true, play: true}));
    }
    
    const onPageChange = (event, value) => {
        navigate(`?page=${value}`)
        setPage(value);
    }

    useEffect(() => {
        getMusicCollection().then(result =>  setAlbums(result.albums));
    }, [page]);


    const getMusicCollection = async() => {
        const api_url = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${api_url}/music/albums`);
        return await response.json();
    }

    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>

                        <DashboardCard title="Mi Musica" >
                        </DashboardCard>


                        <Grid container spacing={3} mt={0.5}>
                            {albums.map((album, index) => (
                            <Grid item sm={12} md={4} lg={3} key={index}>
                                <BlankCard>
                                    <Typography>
                                        <img src={album.cover_url} alt="img" width="100%" />
                                    </Typography>

                                    <Tooltip title="Reproducir">
                                        <Fab
                                            size="small"
                                            color="primary"
                                            sx={{ bottom: '75px', left: '15px', position: 'absolute' }}
                                            onClick={() => onPlaySongs(album)}
                                        >
                                            <IconPlayerPlay size="16" />
                                        </Fab>
                                    </Tooltip>

                                    <Tooltip title="Agregar a la cola">
                                        <Fab
                                            size="small"
                                            color="primary"
                                            sx={{ bottom: '75px', left: '60px', position: 'absolute' }}
                                            onClick={() => onQueueSongs(album)}
                                        >
                                            <PlaylistPlayIcon size="16" />
                                        </Fab>
                                    </Tooltip>



                                    <CardContent sx={{ p: 3, pt: 2 }}>
                                        <Stack direction="column" alignItems="flex-start" justifyContent="space-between" mt={1}>
                                            <Typography variant="span" sx={{ textDecoration: 'bold' }}>{album.title}</Typography>
                                        </Stack>
                                        <Stack direction="column" alignItems="flex-start" justifyContent="space-between" mt={1}>
                                            <Typography variant="subtitle2">{album.format}</Typography>
                                        </Stack>
                                    </CardContent>
                                </BlankCard>
                            </Grid>
                            ))}
                        </Grid>









                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
  )
}

export default LocalMusicPage;