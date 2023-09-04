import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { homeApi } from '../../api/homeApi';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks';


const NewChannelPage = () => {

    const navigate = useNavigate();
    const { name, logo, epg_name, number, category, media_url, type, licenseUrl, key_id, key, onInputChange, formState, setFormState } = useForm({
        name: '',
        logo: '',
        category: '',
        number: '',
        media_url: '',
        epg_name: '',
        type: '',
        licenseUrl: '',
        key_id: '',
        key: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const { type, licenseUrl, key_id, key, ...channel } = formState;
        const body = { ...channel, drm: { type, licenseUrl, clear_keys: { key_id, key } } };
        homeApi.post(`/tv/channels`, body).then(result => navigate(-1));
    };

    const handleCancel = () => navigate(-1);

    return (
        <PageContainer title="React Home">
            <DashboardCard title="Nuevo Canal">

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Información del canal</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Nombre del canal"
                                name="name"
                                value={name}
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Categoria</InputLabel>
                                <Select
                                    label='Categoria'
                                    placeholder='Categoria'
                                    name="category"
                                    value={category}
                                    onChange={onInputChange}>
                                    <MenuItem value="">--- Seleccione una opción ---</MenuItem>
                                    <MenuItem value="movies">Cine & Series</MenuItem>
                                    <MenuItem value="sports">Deportes</MenuItem>
                                    <MenuItem value="news">Noticieros</MenuItem>
                                    <MenuItem value="other">Otros</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Número"
                                name="number"
                                value={number}
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="URL del canal"
                                name="media_url"
                                value={media_url}
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="EPG ID"
                                name="epg_name"
                                value={epg_name}
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Logo (URL)"
                                name="logo"
                                value={logo}
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Información de DRM</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Tipo de DRM</InputLabel>
                                <Select
                                    label='Tipo de DRM'
                                    placeholder='Tipo de DRM'
                                    name="type"
                                    value={type}
                                    onChange={onInputChange}>
                                    <MenuItem value="">--- Seleccione una opción ---</MenuItem>
                                    <MenuItem value="Widevine">Widevine</MenuItem>
                                    <MenuItem value="Clearkeys">Clear Keys</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="URL de licencias"
                                name="licenseUrl"
                                value={licenseUrl}
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Key ID"
                                placeholder='Key ID'
                                name="key_id"
                                value={key_id}
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Key"
                                name="key"
                                value={key}
                                onChange={onInputChange}
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

export default NewChannelPage;
