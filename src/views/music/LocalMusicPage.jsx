import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, IconButton, InputAdornment, OutlinedInput, Pagination } from "@mui/material";
import { IconGridDots, IconList, IconSearch } from "@tabler/icons-react";
import PageContainer from "../../components/container/PageContainer";
import { addSongsToQueue } from "../../store/slices/player";
import { usePagingSearch } from "../../hooks/usePagingSearch";
import { useState } from "react";
import { homeApi } from "../../api/homeApi";
import { useNavigate } from "react-router-dom";
import { AlbumsGrid } from "./AlbumsGrid";
import AlbumListPage from "./AlbumListPage";


export const LocalMusicPage = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    
    const onDeleteAlbum = async(album) => {
        await homeApi.delete(`/music/albums/${album.uid}`);
        const {total, albums} = result;
        var filtered = albums.filter(a => a.uid != album.uid); 
        setResult({albums: filtered, total: (total-1)});
    }

    const onEditAlbum = async(album) => navigate(`/music/explore/album/edit/${album.uid}`);
    const onDetailsAlbum = async(album) => navigate(`/music/explore/album/${album.uid}`);

    useEffect(() => {
        getMusicCollection(searchValue, page).then(result =>  {
            result.albums.forEach(album => {
                let cover_url = album.cover_url;
                let album_name = album.title;
                album.tracks.forEach(track => {
                    track['cover_url'] = cover_url;
                    track['album_name'] = album_name;
                    if (!('artist' in track)) track['artist'] = artist;
                });
            });
            setResult(result);
        });
    }, [page, searchValue]);


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

            <Grid container spacing={3} mt={0.5}>
                {gridMode ? (
                <AlbumsGrid 
                    albums={result.albums}
                    onPlaySongs={onPlaySongs}
                    onQueueSongs={onQueueSongs}
                    onDetailsAlbum={onDetailsAlbum}
                    onEditAlbum={onEditAlbum}
                    onDeleteAlbum={onDeleteAlbum}
                />) : (
                <AlbumListPage 
                    albums={result.albums}
                    onPlaySongs={onPlaySongs}
                    onQueueSongs={onQueueSongs}
                    onDetailsAlbum={onDetailsAlbum}
                    onEditAlbum={onEditAlbum}
                    onDeleteAlbum={onDeleteAlbum}
                />)}
                
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