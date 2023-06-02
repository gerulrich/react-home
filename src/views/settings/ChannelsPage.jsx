import { Fragment, useEffect } from "react";
import { Avatar, Container, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, OutlinedInput, Pagination, Typography } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import PageContainer from "../../components/container/PageContainer";
import { usePagingSearch } from "../../hooks/usePagingSearch";
import { homeApi } from "../../api/homeApi";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@emotion/react";


export const ChannelsPage = () => {
    
    const navigate = useNavigate();
    const theme = useTheme();
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

    useEffect(() => {
        homeApi.get(`/tv/channels?q=${searchValue}&limit=25&offset=${(page -1)*25}`).then(result => setResult(result.data));
    }, [page, searchValue]);

    const onEdit = (channel) => navigate(`/settings/channels/${channel.uid}`);
    const onDelete = async(channel) => {
        await homeApi.delete(`/settings/channels/${channel.uid}`);
        const {total, albums} = result;
        var filtered = albums.filter(a => a.uid != album.uid); 
        setResult({albums: filtered, total: (total-1)});
    }

    return (
        <PageContainer title="Mi Musica">
        <Grid container spacing={3} mt={0.5} justifyContent="space-between">
            <Grid item sm={6} md={6} lg={4}>
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
                        fullWidth />
                </form>
            </Grid>
            <Grid item sm={2} justifyItems="flex-end">
                {/*
                <IconButton onClick={() => setGridMode(false)} disabled={!gridMode}>
                    <IconList />
                </IconButton>

                <IconButton onClick={() => setGridMode(true)} disabled={gridMode}>
                    <IconGridDots />
                </IconButton>*/}
            </Grid>
        </Grid>

        {/** Pagination **/}
        <Grid container alignItems="flex-start" direction="row" justifyContent="center" m={1}>
            <Grid container alignItems="center" justifyContent="center" m={1}>
                <Pagination onChange={onPageChange} count={result.pages} disabled={result.pages <= 1} page={page} />
            </Grid>
        </Grid>

        <Grid container spacing={3} mt={0.5}>
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>Canales</Typography>
                <List>
                { result.channels.map((channel) => 
                    (
                    <Fragment key={channel.uid}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt={channel.name} src={channel.logo} variant="square" />
                        </ListItemAvatar>

                        <ListItemText
                            primary={
                                <Typography
                                    sx={{ display: 'inline', color: theme.palette.text.primary, fontWeight: '', textDecoration: 'none' }}
                                    variant="body2"
                                >{channel.name}
                                </Typography>
                            }
                            secondary={channel.category}
                        />

                        <ListItemSecondaryAction>
                            <IconButton onClick={() => onEdit(channel)}><EditIcon size="16" /></IconButton>
                            <IconButton><DeleteIcon size="16" /></IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                        <Divider component="li" />
                    </Fragment>
                    )
                )}
                </List>
            </Container>

        </Grid>

         {/** Pagination **/}
         <Grid container alignItems="flex-start" direction="row" justifyContent="center" m={1}>
            <Grid container alignItems="center" justifyContent="center" m={1}>
                <Pagination onChange={onPageChange} count={result.pages} disabled={result.pages <= 1} page={page} />
            </Grid>
        </Grid>

    </PageContainer>
  )
}

export default ChannelsPage;