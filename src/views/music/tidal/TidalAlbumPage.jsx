import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Breadcrumbs, Button, CircularProgress, Divider, Grid, IconButton, Link, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem, Skeleton, Typography } from "@mui/material";
import LogViewer from "../components/LogViewer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageContainer from "../../../components/container/PageContainer";
import { homeApi } from "../../../api/homeApi";
import { toTime } from "../../../helpers/time";
import { useDispatch, useSelector } from "react-redux";
import { startDownload } from "../../../store/slices";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const TidalAlbumPage = () => {

    const navigate = useNavigate();
    const { albumId } = useParams();
    const dispatch = useDispatch();
    const [album, setAlbum] = useState({
         title: '',
         cover: '',
         tracks: [],
         artist: '',
         artists: [],
         audioQuality: '',
         mediaMetadata: { tags: []}
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const { output, isDownloading } = useSelector( state => state.music );

    useEffect(() => {        
        getAlbumById(albumId);
    }, []);
    
    const getAlbumById = async (albumId) => {
        const { data } = await homeApi.get(`/tidal/albums/${albumId}`);
        setAlbum(data);
    }

    const duration = album.tracks.map(item => item.duration).reduce((acc, value) => acc + value, 0);

    const artists = album.artists.filter(artist => artist.type == 'MAIN').map(artist => artist.name).join(' & ');

    const handleOnDownload = (quality) => {
        setAnchorEl(null);
        dispatch(startDownload({ album:albumId, quality }));
        homeApi.post(`/tidal/albums/${albumId}/download`, { quality: quality })
            .then(resp => console.debug(resp.data))
            .catch(error => console.error(error));
    }

    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12} ml={0}>
                        
                        <Breadcrumbs aria-label="breadcrumb">
                            <IconButton aria-label="delete" onClick={() => navigate(-1)}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Link underline="hover" color="inherit" href="/tidal/search">TIDAL</Link>
                            <Link
                                underline="hover"
                                color="inherit"
                                href={`/tidal/artist/${album.artist.id}`}
                            >{artists}</Link>
                            <Typography color="text.primary">{album.title}</Typography>
                        </Breadcrumbs>

                    </Grid>
                    
                    <Grid container justifyContent="start" m={2}>
                        <Grid item xs={12} md={4} lg={3}>
                            {
                                album.cover != '' ?
                                (<img src={album.cover} width={250} height={250} alt="Album cover" />)
                                :(<Skeleton variant="rectangular" width={250} height={250} />)
                            }
                            
                        </Grid>

                        <Grid item xs={12} md={8} lg={7} mt={5}>
                                <Typography variant='h3'>{album.title == '' ? <Skeleton /> : album.title}</Typography>
                                <Typography mt={2} variant='body1'>{artists}</Typography>
                                <Typography mt={2} variant='body2'>{album.tracks.length} canciones - {toTime(duration)}</Typography>
                        </Grid>
                    </Grid>


                    <Grid container spacing={1} alignItems="center" m={2}>
                        <Grid item>
                            <Button variant="outlined" startIcon={<PlayArrowOutlinedIcon />}>
                                Reproducir
                            </Button>
                        </Grid>

                        <Grid item>
                            {
                                isDownloading
                                ? (<CircularProgress color="primary" size={30}/>)
                                : (<Button variant="outlined" onClick={(event) => setAnchorEl(event.currentTarget)}
                                            disabled={isDownloading}
                                            endIcon={<KeyboardArrowDownIcon />}
                                    >
                                    Descargar
                                    </Button>
                                )
                            }
                            
                        </Grid>
                        <Menu
                            id="download-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                            sx={{'& .MuiMenu-paper': {width: '250px', },}}
                        >

                                {
                                    album.audioQuality == 'LOW' && 
                                    (
                                        <MenuItem onClick={() => handleOnDownload('LOW')}>
                                            <ListItemText>Descargar en AAC (LQ)</ListItemText>
                                        </MenuItem>
                                    )
                                }

                                {
                                    album.audioQuality == 'HIGH' && 
                                    (
                                        <MenuItem onClick={() => handleOnDownload('HIGH')}>
                                            <ListItemText>Descargar en AAC (HQ)</ListItemText>
                                        </MenuItem>
                                    )
                                }


                                {
                                    album.mediaMetadata.tags.includes('LOSSLESS') && 
                                    (
                                        <MenuItem onClick={() => handleOnDownload('LOSSLESS')}>
                                            <ListItemText>Descargar en FLAC</ListItemText>
                                        </MenuItem>    
                                    )
                                }

                                {
                                    album.mediaMetadata.tags.includes('HIRES_LOSSLESS') &&
                                    (
                                        <MenuItem onClick={() => handleOnDownload('HI_RES_LOSSLESS')}>
                                            <ListItemText>Descargar en FLAC (HI RES)</ListItemText>
                                        </MenuItem>
                                    )
                                }

                                {
                                    album.mediaMetadata.tags.includes('MQA') &&
                                    (
                                        <MenuItem onClick={() => handleOnDownload('HI_RES')}>
                                            <ListItemText>Descargar en flac (MQA)</ListItemText>
                                        </MenuItem>                                        
                                    )
                                }                   
                            
                    </Menu>



                    </Grid>

                    <Grid item xs={12} sx={{display: isDownloading ? '': 'none'}}>
                        <LogViewer logText={output} />
                    </Grid>

                    <Grid item xs={12}>
                    <List>
                        {album.tracks.map(track => 
                        (
                            <Fragment key={track.id}>
                                <ListItem sx={{ l: 10 }} key={track.id}>
                                    <ListItemText
                                        primary={track.trackNumber + '. ' + track.title}
                                    />


                                    <ListItemSecondaryAction>
                                        <Grid container alignItems="center" >
                                        <Grid item>
                                            <ListItemText primary={toTime(track.duration)} />
                                        </Grid>
                                        </Grid>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            <Divider sx={{borderStyle:'dashed', marginInlineStart: '40px'}}/>
                            </Fragment>
                        ))}
                    </List>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
   
  )
}

export default TidalAlbumPage;