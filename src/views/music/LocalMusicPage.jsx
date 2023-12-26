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
import ConfirmationDialog from "./components/ConfirmationDialog";


export const LocalMusicPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [gridMode, setGridMode] = useState(false);
    const [item, setItem] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const {
        page,
        searchValue,
        result,
        setResult,
        searchText,
        onInputChange,
        onPageChange,
        onSearchSubmit
    } = usePagingSearch({ albums: [], paging: { page: 1, total: 1 } });

    const onQueueSongs = (album) => dispatch(addSongsToQueue({ songs: album.tracks, replace: false, play: true }));
    const onPlaySongs = (album) => dispatch(addSongsToQueue({ songs: album.tracks, replace: true, play: true }));


    const onDeleteAlbum = (album) => {
        setItem(album);
        setDialogOpen(true);
    }

    const handleCloseDialog = () => {
        setItem(null);
        setDialogOpen(false);
    }

    const handleConfirmDelete = () => {
        const uid = item.uid;
        homeApi.delete(`/music/albums/${uid}`)
            .then(resp => {
                const { paging, albums } = result;
                var filtered = albums.filter(item => item.uid != uid);
                setResult({ albums: filtered, paging });
            })
            .catch(error => console.error(error));
        handleCloseDialog();
    }

    const onEditAlbum = async (album) => navigate(`/music/explore/album/edit/${album.uid}`);
    const onDetailsAlbum = async (album) => navigate(`/music/explore/album/${album.uid}`);

    useEffect(() => {
        getMusicCollection(searchValue, page).then(result => {
            result.albums.forEach(album => {
                let cover_url = album.cover_url;
                let album_name = album.title;
                album.tracks.forEach(track => {
                    track['cover_url'] = cover_url;
                    track['album_name'] = album_name;
                    track['media_url'] = `/music/albums/${album.uid}/tracks/${track.uid}/media`;
                    if (!('artist' in track)) track['artist'] = artist;
                });
            });
            setResult(result);
        });
    }, [page, searchValue]);


    const getMusicCollection = async (filter = '', page = 1) => {
        const { data } = await homeApi.get(`/music/albums?q=${filter}&limit=25&offset=${(page - 1) * 25}`);
        return data;
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
                    <Pagination onChange={onPageChange} count={result.paging.total} disabled={result.paging.total <= 1} page={page} />
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
                    <Pagination onChange={onPageChange} count={result.paging.total} disabled={result.paging.total <= 1} page={page} />
                </Grid>
            </Grid>

            <ConfirmationDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onDelete={handleConfirmDelete}
            />

        </PageContainer>
    )
}

export default LocalMusicPage;