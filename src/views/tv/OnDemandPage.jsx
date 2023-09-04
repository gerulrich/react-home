import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Pagination, Stack, Typography } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ShakaPlayerComponent } from '../../components/player/ShakaPlayerComponent';
import { homeApi } from '../../api/homeApi';
import CodeComponent from '../dashboard/components/CodeComponent';
import { usePagingSearch } from '../../hooks/usePagingSearch';
import { InputAdornment, OutlinedInput } from '@mui/material';
import { IconSearch } from '@tabler/icons-react';

const OnDemandPage = () => {
    
    const {
        page,
        searchValue,
        result,
        setResult,
        searchText,
        onInputChange,
        onPageChange,
        onSearchSubmit
    } = usePagingSearch({recordings: [], selected: {}, paging: { page: 1, total: 1}});

    const {showAll} = useSelector(state => state.ui);

    const onSelectRecording = (recording) => setResult({ ...result, selected: recording, });
    
    useEffect(() => {
        getRecordings().then(resp => setResult( { selected: result.selected, ...resp, }));
    }, [showAll, searchValue, page])

    const getRecordings = async () => {
        const { data } = await homeApi.get(`/recordings?q=${searchValue}&offset=${(page-1) * 25}&limit=25`);
        return data;
    }    
    
    const opcionesFecha = { year: '2-digit', month: 'short', day: 'numeric' };
    const opcionesHora = { hour: '2-digit', minute: '2-digit'};

    const format_date = (from_date, to_date) => {
        const from = from_date.toLocaleString(undefined, {
            ...opcionesFecha,
            ...opcionesHora,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
        const to = to_date.toLocaleString(undefined, {
            ...opcionesHora,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
        return `${from} a ${to}`;
    }
    const code = result.selected.media_url ? `ffmpeg -cenc_decryption_key ${result.selected.drm.clear_keys.key} -i ${result.selected.media_url} -map 0:v:4 -map 0:a -c:v copy -c:a copy -map 0:s? "${result.selected.title}.mkv"` : '';

    return (
        <PageContainer title="On Demand">
            <PageContainer title="TV en directo">
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6} p={2} alignItems="center">
                            <Stack direction="column" alignItems="baseline" spacing={2}>
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
                                        fullWidth
                                        />
                                    </form>

                                    { code != '' && (<CodeComponent code={code}/>)}
                            </Stack>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <ShakaPlayerComponent media={result.selected} />
                        </Grid>
                    
                        <Grid item xs={12}>
                            <Grid container alignItems="flex-start" direction="row" justifyContent="center" m={1}>
                                <Grid container alignItems="center" justifyContent="center" m={1}>
                                    <Pagination onChange={onPageChange} count={result.paging.total} disabled={result.paging.total <= 1} page={page} />
                                </Grid>
                            </Grid>
                        </Grid>


                        {
                            result.recordings.map(rec => (
                                <Grid item sm={6} md={4} lg={3} key={rec.uid}>
                                <Card>
                                    <CardHeader
                                        title={rec.channel.name}
                                        subheader={format_date(new Date(rec.start), new Date(rec.end))}/>
                                    <CardMedia
                                        component="img"
                                        alt={rec.title}
                                        image={rec.image}
                                        
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {rec.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {rec.description}
                                        </Typography>
                                    </CardContent>
                                    {
                                        rec.media_url != '' 
                                        &&
                                        (
                                            <CardActions>
                                                <Button size="small" onClick={() => onSelectRecording(rec)}>Ver</Button>
                                            </CardActions>
                                        )
                                    }
                                </Card>
                                </Grid>
                            ))
                        }

                        <Grid item xs={12}>
                            <Grid container alignItems="flex-start" direction="row" justifyContent="center" m={1}>
                                <Grid container alignItems="center" justifyContent="center" m={1}>
                                    <Pagination onChange={onPageChange} count={result.paging.total} disabled={result.paging.total <= 1} page={page} />
                                </Grid>
                            </Grid>
                        </Grid>


                    </Grid>
                </Box>
        </PageContainer>
    </PageContainer>
);

};

export default OnDemandPage;