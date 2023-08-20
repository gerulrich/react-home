import { useState } from 'react';
import { Grid } from '@mui/material';
import { SearchLayout } from '../../../layouts/SearchLayout';
import { TidalAlbumGrid } from './TidalAlbumGrid';

const TidalSearchPage = () => {
  
  const [data, setData] = useState({ albums: [], paging: {page: 0, total: 0}});
  const onUpdate = (data) => setData(data);
  
    return (
        <SearchLayout
            initialState={data}
            url="/tidal/albums"
            onUpdate={onUpdate}
            title="Musica"
            subtitle="Buscar en Tidal"
        >
            
            <Grid container spacing={3} mt={0.5}>
                { data.albums.map((album, index) => (<TidalAlbumGrid key={album.id} album={album} />) )}
            </Grid>
        </SearchLayout>
  );
};

export default TidalSearchPage;
