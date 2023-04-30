import { useEffect, useState } from 'react';
import { Avatar, Breadcrumbs, CardContent, Grid, ListSubheader, Pagination, Typography, Stack } from '@mui/material';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PageContainer from '../../../components/container/PageContainer';
import BlankCard from '../../../components/shared/BlankCard';
import DashboardCard from '../../../components/shared/DashboardCard';

const ArtistPage = () => {
    
    const navigate = useNavigate();
    const { artistId } = useParams();
    const [params] = useSearchParams();
    const [page, setPage] = useState(parseInt(params.get('page')) || 1);
    const [result, setResult] = useState({albums: [], pages: 0, current: 0 });
    const [artist, setArtist] = useState({ name: '', nb_fan: '' });

    useEffect(() => {
        getArtistById(artistId).then(artist => setArtist(artist));
    }, []);

    useEffect(() => {
        getAlbumByArtistId(artistId, page).then(result => setResult(result));
    }, [page]);

    const onPageChange = (event, value) => {
        navigate(`?page=${value}`)
        setPage(value);
    }

    const getArtistById = async(artistId) => {
        const deezer_url = import.meta.env.VITE_DEEZER_URL;
        const response = await fetch(`${deezer_url}/artist/${artistId}`);
        return await response.json();
    }

    const getAlbumByArtistId = async(artistId, page) => {
        const deezer_url = import.meta.env.VITE_DEEZER_URL;
        const response = await fetch(`${deezer_url}/artist/${artistId}/albums?index=${(page-1)*25}`);
        const data = await response.json();
        return {
            albums: data.data,
            pages: Math.ceil(data.total/25),
            current: page
        }
    }
    
    return (
        <PageContainer title="React Home - Musica" description="this is Sample page">
                
            {/** Artist Card  **/}
            <DashboardCard>
                <Grid container mt={2} direction="row">
                    <Grid item lg={2}>
                        <Avatar
                            alt={artist.name}
                            src={artist.picture_xl}
                            sx={{ width: 182, height: 182 }}
                        />
                        </Grid>
                    <Grid item lg={8} p={3}>
                    <Typography variant='h1'>Discografía de {artist.name}</Typography>
                    <Typography>{artist.nb_fan.toLocaleString()} fans</Typography>
                    </Grid>
                </Grid>
            </DashboardCard>


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
                        <Typography component={Link} to={`/music/search/artist/${artist.id}/album/${album.id}`}>
                            <img src={album.cover_xl} alt="img" width="100%" />
                        </Typography>
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
  );

};

export default ArtistPage;
