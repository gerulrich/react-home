import { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Stack,
  Typography,
  Autocomplete,
  Box,
} from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { homeApi } from '../../api/homeApi';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks';
import { useSelector } from 'react-redux';


const NewMusicTagPage = () => {

  const navigate = useNavigate();

  const { tag } = useSelector(state => state.music);

  const [albums, setAlbums] = useState([{ uid: '', title: '', artist: '', cover_url: '' }]);
  const { code, album, onInputChange, formState, setFormState } = useForm({
    code: '',
    album: {
      uid: '',
      title: '',
      artist: '',
      cover_url: ''
    }
  });

  const onSelectAlbum = (album) => {
    const { code } = formState;
    setFormState({ code, album })
  }

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
    const { code, album } = formState;
    homeApi.post(`/tags`, { code, album: album.uid }).then(result => navigate(-1));
  };

  const handleCancel = () => navigate(-1);

  return (
    <PageContainer title="React Home">
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
                isOptionEqualToValue={(album, value) => {
                  return (album.title || '') === (value.title || '');
                }}
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

export default NewMusicTagPage;
