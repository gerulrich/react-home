import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, InputAdornment, OutlinedInput, Pagination, Typography, CardContent, Grid, Stack } from '@mui/material';
import { IconSearch } from '@tabler/icons';
import BlankCard from '../../components/shared/BlankCard';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { usePagingSearch } from '../../hooks/usePagingSearch';


const SearchPage = () => {
  
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

    const [showError, setShowError] = useState(false);    
    const showPagination = searchValue !== '' && result.pages > 0;
    const showSearch = searchValue === '';

    useEffect(() => {
        setShowError(false);
        getAlbumsByArtistName(searchValue, page).then(result => {
            setShowError(result.pages === 0 && searchValue.length > 0)
            setResult(result)
        });
    }, [searchValue, page]);

    const getAlbumsByArtistName = async (name = '', page = 1) => {
        name = name.toLocaleLowerCase().trim();
        if (name.length === 0 || page < 1) return {
            albums: [],
            pages: 0,
            current: 0
        };
        const deezer_url = import.meta.env.VITE_DEEZER_URL.trim();
        const response = await fetch(`${deezer_url}/search/album?q=${name}&index=${(page-1) * 25}`);
        const data = await response.json();
        return {
            albums: data.data,
            pages: Math.ceil(data.total/25),
            current: page
        }
    }
    
    return (
        <>
            <PageContainer title="React Home - Musica">
                <DashboardCard title="Buscar en deezer">
                    <form onSubmit={onSearchSubmit}>
                        <Grid container alignItems="flex-start" direction="row" >
                            <Grid item xs={3}>
                                <OutlinedInput
                                    fullWidth
                                    type="text"
                                    placeholder='buscar...'
                                    variant="outlined"
                                    startAdornment={
                                        <InputAdornment position="start"><IconSearch /></InputAdornment>
                                    }
                                    name="searchText"
                                    value={searchText}
                                    onChange={onInputChange}
                                />
                            </Grid>
                            <Grid item m={1}>
                                <Button type="submit" variant="contained"> Buscar </Button>
                            </Grid>
                        </Grid>
                        <Grid mt={3}>

                            <Typography 
                                variant="h5" 
                                sx={{ color: (theme) => theme.palette.info.main }}
                                style={{display: showSearch ? '': 'none'}}
                                >
                                Ingrese un termino para realizar una búsqueda por nombre de artista
                            </Typography>
                            

                            <Typography 
                                variant="h5" 
                                sx={{ color: (theme) => theme.palette.warning.main }}
                                style={{display: showError ? '' : 'none'}}
                                >
                                No se encontraton resultados para el termino {searchValue}
                            </Typography>
                        </Grid>
                    </form>
                </DashboardCard>

                <Grid container alignItems="flex-start" direction="row" justifyContent="center" m={1} style={{display: showPagination ? '': 'none'}}>
                    <Grid container alignItems="center" justifyContent="center" m={1}>
                        <Pagination onChange={onPageChange} count={result.pages} disabled={result.pages <= 1} page={page} />
                    </Grid>
                </Grid>

                <Grid container spacing={3} mt={0.5}>
                    {result.albums.map((album, index) => (
                        <Grid item sm={12} md={4} lg={3} key={index}>
                            <BlankCard>
                                <Typography component={Link} to={`/music/search/artist/${album.artist.id}/album/${album.id}`}>
                                    <img src={album.cover_xl} alt="img" width="100%" />
                                </Typography>
                                <CardContent sx={{ p: 3, pt: 2 }}>
                                    <Stack direction="column" alignItems="flex-start" justifyContent="space-between" mt={1}>
                                        <Typography 
                                            variant="span"
                                            sx={{ textDecoration: 'bold' }}
                                            component={Link} to={`/music/search/artist/${album.artist.id}/album/${album.id}`}
                                        >{album.title}</Typography>
                                        <Typography 
                                            variant="span"
                                            component={Link} to={`/music/search/artist/${album.artist.id}`}
                                        >de {album.artist.name}</Typography>
                                    </Stack>
                                </CardContent>
                            </BlankCard>
                        </Grid>
                    ))}
                </Grid>
            </PageContainer>

            <Grid container alignItems="flex-start" direction="row" justifyContent="center" m={1} style={{display: showPagination ? '': 'none'}}>
                <Grid container alignItems="center" justifyContent="center" m={1}>
                    <Pagination onChange={onPageChange} count={result.pages} disabled={result.pages <= 1} page={page} />
                </Grid>
            </Grid>
    </>
  );

};

export default SearchPage;
