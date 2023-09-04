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
  const { title, artist, year, comments, origin_type, source, source_id, cover_url, format, quality, onInputChange, formState, setFormState } = useForm({
    title: '',
    artist: '',
    year: '',
    comments: '',
    origin_type: '',
    source: '',
    source_id: '',
    cover_url: '',
    format: '',
    quality: '',
  });

  useEffect(() => {
    homeApi.get(`/music/albums/${albumId}`).then(result => {
      const { data } = result;
      if (!('quality' in data)) data['quality'] = '';
      if (!('year' in data)) data['year'] = '';
      if (!('comments' in data)) data['comments'] = '';
      if (!('source' in data)) data['source'] = '';
      if (!('source_id' in data)) data['source_id'] = '';
      setFormState(data);
    });
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
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <CustomFormControl fullWidth>
                <InputLabel>Formato</InputLabel>
                <Select
                  label='Formato'
                  placeholder='Formato'
                  name="format"
                  onChange={onInputChange}
                  value={format}
                >
                  <MenuItem value="FLAC">FLAC</MenuItem>
                  <MenuItem value="MP3">MP3</MenuItem>
                  <MenuItem value="ALAC">ALAC</MenuItem>
                  <MenuItem value="AAC">AAC</MenuItem>
                </Select>
              </CustomFormControl>
            </Grid>
            <Grid item xs={4}>
              <CustomFormControl fullWidth>
                <InputLabel>Calidad</InputLabel>
                <Select
                  label='Calidad'
                  placeholder='Calidad'
                  name="quality"
                  onChange={onInputChange}
                  value={quality}
                >
                  <MenuItem value="LOW">Baja Calidad (128kbps)</MenuItem>
                  <MenuItem value="HIGH">Alta Calidad (320kbps)</MenuItem>
                  <MenuItem value="LOSSLESS">Calidad CD sin pérdida (44khz/16bit)</MenuItem>
                  <MenuItem value="HI_RES">Sin perdida - alta resolución</MenuItem>
                  <MenuItem value="MAQ">Master MQA</MenuItem>
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
            <Grid item xs={4}>
              <CustomFormControl fullWidth>
                <InputLabel>Tipo de origen</InputLabel>
                <Select
                  label='Tipo de origen'
                  placeholder='Tipo de origen'
                  name="origin_type"
                  onChange={onInputChange}
                  value={origin_type}
                >
                  <MenuItem value="CD_RIP">Copia de CD</MenuItem>
                  <MenuItem value="WEB_DOWNLOAD">Descarga directa</MenuItem>
                  <MenuItem value="TORRENT">Descarga Torrent</MenuItem>
                </Select>
              </CustomFormControl>
            </Grid>
            <Grid item xs={4}>
              <CustomFormControl fullWidth>
                <TextField
                  label='Origen'
                  name="source"
                  onChange={onInputChange}
                  value={source}
                />
              </CustomFormControl>
            </Grid>
            <Grid item xs={4}>
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
