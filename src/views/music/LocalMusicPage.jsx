import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CardContent, Fab, Grid, IconButton, InputAdornment, OutlinedInput, Pagination, Stack, Tooltip, Typography } from "@mui/material";
import { IconGridDots, IconList, IconPlayerPlay, IconSearch } from "@tabler/icons";
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PageContainer from "../../components/container/PageContainer";
import BlankCard from "../../components/shared/BlankCard";
import { addSongsToQueue } from "../../store/slices/player";
import { usePagingSearch } from "../../hooks/usePagingSearch";
import { useState } from "react";
import { homeApi } from "../../api/homeApi";

export const LocalMusicPage = () => {
    
    const dispatch = useDispatch();
    const [gridMode, setGridMode] = useState(false);
    const {
        page,
        searchValue,
        result,
        setResult,
        searchText,
        onInputChange,
        onPageChange,
        onSearchSubmit
    } = usePagingSearch();

    const onQueueSongs = (album) => dispatch(addSongsToQueue({songs: album.tracks, replace: false, play: true}));
    const onPlaySongs = (album) => dispatch(addSongsToQueue({songs: album.tracks, replace: true, play: true}));
    
    useEffect(() => {
        getMusicCollection(searchValue, page).then(result =>  {
            result.albums.forEach(album => {
                let cover_url = album.cover_url;
                let artist = album.artist;
                let album_name = album.title;
                album.tracks.forEach(track => {
                    // TODO eliminar cuando estén todas las validaciones
                    track['cover_url'] = cover_url;
                    track['album_name'] = album_name;
                    if (!('artist' in track)) {
                        track['artist'] = artist;
                    }
                });
            });
            console.log(result);
            setResult(result);
        });
    }, [page]);


    const getMusicCollection = async(filter = '', page = 1) => {
        const { data } = await homeApi.get(`/music/albums?q=${filter}&limit=25&offset=${(page -1)*25}`);
        return {
            albums: data.albums,
            pages: Math.ceil(data.total/25),
            current: page
        }
    }

    return (
        <PageContainer title="Mi Musica">
            <Grid container spacing={3} mt={0.5} justifyContent="space-between">
                <Grid item sm={6} md={6} lg={4}>
                    <form onSubmit={onSearchSubmit}>
                        <OutlinedInput
                            size="small"
                            placeholder='buscar...'
                            variant="outlined"
                            startAdornment={
                                <InputAdornment position="start"><IconSearch /></InputAdornment>
                            }
                            name="searchText"
                            value={searchText}
                            onChange={onInputChange}
                            fullWidth />
                    </form>
                </Grid>
                <Grid item sm={2} justifyItems="flex-end">
                    <IconButton onClick={() => setGridMode(false)} disabled={!gridMode}>
                        <IconList />
                    </IconButton>

                    <IconButton onClick={() => setGridMode(true)} disabled={gridMode}>
                        <IconGridDots />
                    </IconButton>
                </Grid>
            </Grid>

            {/** Pagination **/}
            <Grid container alignItems="flex-start" direction="row" justifyContent="center" m={1}>
                <Grid container alignItems="center" justifyContent="center" m={1}>
                    <Pagination onChange={onPageChange} count={result.pages} disabled={result.pages <= 1} page={page} />
                </Grid>
            </Grid>

            {/** Albums Grid **/}
            <Grid container spacing={3} mt={0.5}>
                {result.albums.map((album, index) => (
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

                        <Tooltip title="Agregar a la lista">
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
                                <Typography mt={1} variant="caption">Publicado el {album.release_date}</Typography>
                            </Stack>
                        </CardContent>
                    </BlankCard>
                </Grid>
                ))}
            </Grid>

             {/** Pagination **/}
             <Grid container alignItems="flex-start" direction="row" justifyContent="center" m={1}>
                <Grid container alignItems="center" justifyContent="center" m={1}>
                    <Pagination onChange={onPageChange} count={result.pages} disabled={result.pages <= 1} page={page} />
                </Grid>
            </Grid>

        </PageContainer>
  )
}

export default LocalMusicPage;