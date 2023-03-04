import { useState } from 'react';
import { Checkbox, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Bookmark, BookmarkBorder, CloudDownload, Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import DashboardCard from '../../../components/shared/DashboardCard';

export const AlbumDownloadCard = ({album, onStartDownload}) => {
  
    const [downloadingFlac, setDownloadingFlac] = useState(false);
    const [downloadingMP3, setDownloadingMP3] = useState(false);

    const handleDownloadFlac = () => {
        setDownloadingFlac(true);
        onStartDownload('flac');
        setTimeout(() => {
            setDownloadingFlac(false)
        }, 5000);
    }

    const handleDownloadMP3 = () => {
        setDownloadingMP3(true);
        onStartDownload('mp3');
        setTimeout(() => {
            setDownloadingMP3(false)
        }, 5000);
    }

   return (
    <DashboardCard title={album.artist.name}>
    {/* Caratula y opciones de descarga*/}
        <Grid container>
            <Grid item xs={12} md={4} lg={3}><img src={album.cover_medium}/></Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Typography variant='h3'>{album.title}</Typography>
                
                <Grid item sx={12}>
                    <Checkbox
                        {..."Añadir a la lista de descargas"}
                        icon={<BookmarkBorder />}
                        checkedIcon={<Bookmark />}
                    />
                </Grid>
                
                <Stack spacing={3} mt={5} direction="column">
                    <Stack direction="row" spacing={1} alignItems="center">
                        
                        
                        
                        
                        <LoadingButton
                                disabled={downloadingFlac || downloadingMP3}
                                loading={downloadingFlac}
                                loadingPosition="start"
                                mt={5} tm={2} sx={ { borderRadius: 28 } }
                                variant="contained" startIcon={<CloudDownload />}
                                onClick={handleDownloadFlac}
                        >
                            Descargar en FLAC
                        </LoadingButton>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                    <LoadingButton 
                                disabled={downloadingFlac || downloadingMP3}
                                loading={downloadingMP3}
                                loadingPosition="start"
                                mt={5} tm={2} sx={ { borderRadius: 28 } }
                                variant="contained" startIcon={<CloudDownload />}
                                onClick={handleDownloadMP3}
                        >
                            Descargar en MP3
                        </LoadingButton>
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    </DashboardCard>
  )
}

export default AlbumDownloadCard;
