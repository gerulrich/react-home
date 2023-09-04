
import { Link } from 'react-router-dom';
import { Typography, CardContent, Grid, Stack, Chip, useTheme } from '@mui/material';
import BlankCard from '../../../components/shared/BlankCard';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export const TidalAlbumGrid = ({album}) => {
    const theme = useTheme();
    const artists = album.artists.filter(artist => artist.type == 'MAIN').map(artist => artist.name).join(' & ');
  return (
    <Grid item sm={12} md={4} lg={3}>
        <BlankCard>

        {
            album.audioQuality == 'LOSSLESS' && album.mediaMetadata.tags.includes('LOSSLESS')
            ? (<Chip
                icon={<MusicNoteIcon />} label="FLAC" size="small"
                sx={{ top: '10px', right: '10px', position: 'absolute' }}
                color="primary"
            />)
            :(<></>)
        }

        {
            album.audioQuality == 'HI_RES' && album.mediaMetadata.tags.includes('HIRES_LOSSLESS')
            ? (<Chip
                icon={<MusicNoteIcon />} label="HIRES FLAC" size="small"
                sx={{ top: '10px', right: '10px', position: 'absolute' }}
                color="primary"
                />)
            :(<></>)
        }

        {
            album.audioQuality == 'HI_RES' && album.mediaMetadata.tags.includes('MQA') && !album.mediaMetadata.tags.includes('HIRES_LOSSLESS')
            ? (<Chip
                icon={<MusicNoteIcon />} label="MQA FLAC" size="small"
                sx={{ top: '10px', right: '10px', position: 'absolute' }}
                color="primary"
            />)
            :(<></>)
        }
        
        <Typography component={Link} to={`/tidal/artist/${album.artists[0].id}/album/${album.id}`}>
            <img src={album.cover} alt="img" width="100%" />
        </Typography>
        
        <CardContent sx={{ p: 3, pt: 2 }}>
            <Stack direction="column" alignItems="flex-start" justifyContent="space-between" mt={1}>
                <Typography 
                    sx={{ display: 'inline', color: theme.palette.text.primary, fontWeight: 'bold', textDecoration: 'none' }}
                    variant="body1"
                    component={Link} to={`/tidal/artist/${album.artists[0].id}/album/${album.id}`}
                >{album.title}</Typography>
                            
                <Typography 
                    component={Link} to={`/tidal/artist/${album.artists[0].id}`}
                    sx={{ display: 'inline', color: theme.palette.text.primary, textDecoration: 'none' }}
                    variant="body1"
                >de {artists}</Typography>
            </Stack>
        </CardContent>
    </BlankCard>
</Grid>
  )
}
