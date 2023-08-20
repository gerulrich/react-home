import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import { AlbumDownloadCard } from '../components/AlbumDownloadCard';
import { AlbumTracksCard } from '../components/AlbumTracksCard';
import { appendDownloadLog, startDownload } from '../../../store/slices';
import { deezerApi } from '../../../api/deezerApi';
import PageContainer from '../../../components/container/PageContainer';

const AlbumPage = () => {
    
    const { albumId } = useParams();
    const [album, setAlbum] = useState({ title: '', cover_url: '', tracks: [], artist: ''})

    const dispatch = useDispatch();

    useEffect(() => {
        getAlbumById(albumId).then(album => setAlbum(album));
    }, []);

    const getAlbumById = async (albumId) => {
        const album = await (await deezerApi.get(`/album/${albumId}`)).data;
        return {
            id: albumId,
            title: album.title,
            artist: album.artist.name,
            cover_url: album.cover_medium,
            tracks: album.tracks.data.map((track, index) => ({
                title: track.title_short,
                duration: track.duration,
                comments: track.title_version ? track.title_version : '',
                media_url: track.preview,
                track_number: (index+1)
            }))
        };
    }

    const onStartDownload = async(format) => {
        dispatch(startDownload({ album:albumId, format }));
        const user = JSON.parse(localStorage.getItem('user'));
        const {date, level, message} = await deezerApi.post('/download', { album: `${album.id}`, format, uid: user.uid });
        dispatch(appendDownloadLog({date, level, message}))
    }
    
    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <AlbumDownloadCard album={album} onStartDownload={onStartDownload}/>
                    </Grid>
                    {/**  Track list **/}
                    <Grid item xs={12}>
                        <AlbumTracksCard tracks={album.tracks} />
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );

};

export default AlbumPage;
