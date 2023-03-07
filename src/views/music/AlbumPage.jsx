import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid, Stack } from '@mui/material';
import { styled } from '@mui/system';
import PageContainer from '../../components/container/PageContainer';
import { AlbumDownloadCard } from './components/AlbumDownloadCard';
import { AlbumTracksCard } from './components/AlbumTracksCard';
import DashboardCard from '../../components/shared/DashboardCard';

const Console = styled('div')({
    backgroundColor: 'black',
    padding: '5px'
  });

const ConsoleText = styled('pre')({
    color: '#33ff00',
    fontSize: 'small',
    fontFamily: 'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace',
    display: 'inline',
});


const AlbumPage = () => {
    
    const { albumId } = useParams();
    const [showConsole, setShowConsole] = useState(false);
    const [output, setOutput] = useState([]);
    const [album, setAlbum] = useState({ title: '', cover_medium: '', tracks: { data: [] }, artist: { name: '' }})

    useEffect(() => {
        getAlbumById(albumId).then(album => setAlbum(album));
    }, []);

    const handleCloseConsole = () => {
        setShowConsole(false);
        setOutput([]);
    }

    const getAlbumById = async (albumId) => {
        const deezer_url = import.meta.env.VITE_DEEZER_URL.trim();
        const response = await fetch(`${deezer_url}/album/${albumId}`);
        return await response.json();
    }

    const startDownload = async(format) => {
        setOutput([]);
        setShowConsole(true);
        const deezer_url = import.meta.env.VITE_DEEZER_URL.trim();
        const response = await fetch(`${deezer_url}/download`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                album: `${album.id}`,
                format,
                uid: "5a49c304-1f6b-46af-9aa2-a4e0155b9c4c" // TODO change with socket.id
            })
        });
        const data = await response.json();
        setOutput((prev) => [...prev, `${data.date} - ${data.level} - ${data.message}\n`]);
    }

    
    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                        <AlbumDownloadCard album={album} onStartDownload={startDownload}/>
                    </Grid>
                    
                    
                    {/**  Consola de descarga **/}
                    <Grid item xs={12} style={{display: showConsole ? 'block': 'none'}}>
                        <DashboardCard title="Console">
                            <Stack direction="column" justifyItems="flex-start">
                            <Console>
                                <ConsoleText>{output}</ConsoleText>
                            </Console>
                            <Grid container mt={3}>
                                <Grid item xs={1}>
                                    <Button variant="contained" onClick={() => handleCloseConsole()}>Cerrar</Button>
                                </Grid>
                                <Grid item xs>

                                </Grid>
                            </Grid>
                            </Stack>
                        </DashboardCard>
                    </Grid>
                    
                    {/**  Track list **/}
                    <Grid item xs={12}>
                        <AlbumTracksCard tracks={album.tracks.data} />
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );

};

export default AlbumPage;
