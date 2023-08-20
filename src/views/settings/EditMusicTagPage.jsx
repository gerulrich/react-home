import { Fragment, useEffect, useState } from 'react';
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Grid,
    styled,
    Stack,
    Typography,
    Autocomplete,
    Box,
    Fab,
  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { homeApi } from '../../api/homeApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../../hooks';
import { useSelector } from 'react-redux';


const EditMusicTagPage = () => {
  
  const navigate = useNavigate();
  const { tagId } = useParams();

  const { tag } = useSelector( state => state.music );

  const [albums, setAlbums] = useState([]);
  const { code, album, onInputChange, formState, setFormState } = useForm({
    code: '',
    album: {}
  });

  const onSelectAlbum = (album) => {
    const { code } = formState;
    setFormState({ code, album })
  }

  useEffect(() => {
     homeApi.get(`/tags/${tagId}`).then(result => setFormState(result.data));
  }, []);

  useEffect(() => {
    if (tag != "") {
      setFormState({
        ...formState,
        code: tag      
      })
    }
 }, [tag]);

  const fetchAlbums = async (searchQuery) => {
    homeApi.get(`/music/albums?q=${searchQuery}`).then(result => {
    const albums = result.data.albums.map(album => ({
      uid: album.uid,
      title: album.title,
      artist: album.artist,
      cover_url: album.cover_url
    }));
     setAlbums(albums)
    });
  };
    
  const handleSubmit = (event) => {
    event.preventDefault();
    const {code, album } = formState;
    const body = { code, album: album.uid};
    homeApi.put(`/tags/${tagId}`, body).then(result => navigate(-1));
  };

  const handleCancel = () => navigate(-1);
   
  return (
    <PageContainer title="React Home">

      <Fab
        color="primary"
        aria-label="Agregar"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
      <AddIcon />
    </Fab>



        <DashboardCard title="Editar Music Tag">

        <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
                  
              <Grid item xs={12}>
                      <Typography variant="subtitle1">Información del Tag</Typography>
              </Grid>
                
              <Grid item xs={12} sm={6}>
            
                    <TextField
                        label="Code"
                        name="code"
                        value={code}
                        onChange={onInputChange}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
            <Autocomplete
                name="album"
                options={albums}
                getOptionLabel={(album) => album.title + " - " + album.artist}
                isOptionEqualToValue={(album, value) => album.title === value.title}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                      loading="lazy"
                      width="50"
                      src={option.cover_url}
                      alt=""
                    />
                    {option.title} - {option.artist}
                  </Box>
                )}
                
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Album"
                        fullWidth
                        onChange={(event) => fetchAlbums(event.target.value)}
                    />
                )}
                value={album}
                onChange={(event, newValue) => onSelectAlbum(newValue)}
        />
        </Grid>

        <Grid item xs={12}>
                        <Stack spacing={2} direction="row">
                            <Button type="submit" variant="contained">Guardar</Button>
                            <Button onClick={handleCancel} variant="contained">Cancelar</Button>
                        </Stack>
                    </Grid>


        </Grid>
    </form>
        </DashboardCard>
    </PageContainer>
  );

};

export default EditMusicTagPage;
