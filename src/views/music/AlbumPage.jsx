import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import { AlbumDownloadCard } from './components/AlbumDownloadCard';
import { AlbumTracksCard } from './components/AlbumTracksCard';
import { appendDownloadLog, startDownload } from '../../store/slices/';
import { Terminal } from '../../ui/components/Terminal';

const AlbumPage = () => {
    
    const { albumId } = useParams();
    const [showConsole, setShowConsole] = useState(false);
    const [album, setAlbum] = useState({ title: '', cover_medium: '', tracks: { data: [] }, artist: { name: '' }})

    const dispatch = useDispatch();
    const { output } = useSelector( state => state.music );

    useEffect(() => {
        getAlbumById(albumId).then(album => setAlbum(album));
    }, []);

    const getAlbumById = async (albumId) => {
        const deezer_url = import.meta.env.VITE_DEEZER_URL;
        const response = await fetch(`${deezer_url}/album/${albumId}`);
        return await response.json();
    }

    const onStartDownload = async(format) => {
        dispatch(startDownload({album:albumId, format}));
        const deezer_url = import.meta.env.VITE_DEEZER_URL;
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`${deezer_url}/download`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                album: `${album.id}`,
                format,
                uid: user.uid
            })
        });
        const {date, level, message} = await response.json();
        dispatch(appendDownloadLog({date, level, message}))
    }
    
    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <AlbumDownloadCard album={album} onStartDownload={onStartDownload} onShowConsole={setShowConsole}/>
                    </Grid>
                    <Grid item xs={12} style={{display: showConsole ? 'block': 'none', m: 0, p:0}}>
                        <Terminal title="Terminal" content={output} />
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
