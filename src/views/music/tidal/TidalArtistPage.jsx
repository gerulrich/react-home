import { useState } from 'react';
import { Grid } from '@mui/material';
import { TidalAlbumGrid } from './TidalAlbumGrid';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { homeApi } from '../../../api/homeApi';
import { ListLayout } from '../../../layouts/ListLayout';

const TidalArtistPage = () => {
  
    const { artistId } = useParams();
    const [data, setData] = useState({ albums: [], paging: {page: 0, total: 0}});
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(parseInt(params.get('page')) || 1);

    useEffect(() => {
        getData(page).then(result => {
            setData(result);
        }).catch(error => console.error(error));
    }, [page]);

    const getData = async (page = 1) => {
        const { data } = await homeApi.get(`${url}?offset=${(page-1) * 25}&limit=25`);
        return { ...data }
    }     
 
    const onPageChange = (event, value) => {
        navigate(`?page=${ value }`)
        setPage(value);
    }
    
    
    
    
    
    
    const onUpdate = (data) => setData(data);
  
    return (
        <ListLayout
            initialState={data}
            url={`/tidal/artists/${artistId}/albums`}
            onUpdate={onUpdate}
            title="Musica"
            subtitle="Buscar en Tidal"
        >
            
            <Grid container spacing={3} mt={0.5}>
                { data.albums.map((album, index) => (<TidalAlbumGrid key={album.id} album={album} />) )}
            </Grid>
        </ListLayout>
  );
};

export default TidalArtistPage;
