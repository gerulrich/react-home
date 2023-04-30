import { useEffect } from 'react';
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
  } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { homeApi } from '../../api/homeApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../../hooks';


const CustomFormControl = styled(FormControl)(({ theme }) => ({
    margin: theme.spacing(0.5),
    minWidth: 120,
}));

const EditAlbumPage = () => {
  
    const navigate = useNavigate();
    const { albumId } = useParams();
    const { title, artist, year, comments, source, source_id, cover_url, format, onInputChange, formState, setFormState} = useForm({
      title: '',
      artist: '',
      year: '',
      comments: '',
      source: '',
      source_id: '',
      cover_url: '',
      format: '',
  });
  
  useEffect(() => {
    homeApi.get(`/music/albums/${albumId}`).then(result => setFormState(result.data))
  }, [albumId])
    
  const handleSubmit = (event) => {
    event.preventDefault();
    homeApi.put(`/music/albums/${formState.uid}`, formState).then(result => navigate(-1));
  };
    
  const handleCancel = () => navigate(-1);
   
  return (
        <PageContainer title="React Home - Musica - Edit Album">
            <DashboardCard title="Editar Album">
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item xs={12}>
                      <CustomFormControl fullWidth>
                        <TextField
                          label='Título'
                          name="title"
                          value={title}
                          onChange={onInputChange}
                        />
                      </CustomFormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <CustomFormControl fullWidth>
                        <TextField
                          label='Artista'
                          placeholder='Artista'
                          name="artist"
                          value={artist}
                          onChange={onInputChange}
                        />
                      </CustomFormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormControl fullWidth>
                        <TextField
                          label='Año'
                          placeholder='Año'
                          type="number"
                          name="year"                          
                          value={year}
                          onChange={onInputChange}
                        />
                      </CustomFormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormControl fullWidth>
                        <InputLabel>Formato</InputLabel>
                          <Select
                            label='Formato'
                            placeholder='Formato'
                            name="format"
                            onChange={onInputChange}
                            value={format}
                          >
                            <MenuItem value="FLAC">flac</MenuItem>
                            <MenuItem value="MP3_128">mp3(128)</MenuItem>
                            <MenuItem value="MP3_320">mp3(320)</MenuItem>
                          </Select>
                        </CustomFormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <CustomFormControl fullWidth>
                          <TextField
                            label='Comentarios'
                            placeholder='Comentarios'
                            name="comments"
                            onChange={onInputChange}
                            value={comments}
                            multiline
                            rows={3}
                          />
                        </CustomFormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <CustomFormControl fullWidth>
                          <TextField
                            label='Origen'
                            name="source"
                            onChange={onInputChange}
                            value={source}
                          />
                        </CustomFormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <CustomFormControl fullWidth >
                          <TextField
                            label='Origen (ID)'
                            name="source_id"
                            onChange={onInputChange}
                            value={source_id}
                          />
                        </CustomFormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <CustomFormControl fullWidth >
                          <TextField
                            label='Carátula (URL)'
                            name="cover_url"
                            onChange={onInputChange}
                            value={cover_url}
                          />
                        </CustomFormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack spacing={2} direction="row">

                          <Button onClick={handleSubmit} type="submit" variant="contained">
                            Guardar
                          </Button>
                          <Button onClick={handleCancel} variant="contained">
                            Cancelar
                          </Button>
                        </Stack>
                        
                      </Grid>
                    </Grid>
                </form> 
            </DashboardCard>
    </PageContainer>
  );

};

export default EditAlbumPage;
