import { Fragment, useEffect, useState } from "react";
import { Avatar, Container, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, OutlinedInput, Pagination, Typography } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import PageContainer from "../../components/container/PageContainer";
import { usePagingSearch } from "../../hooks/usePagingSearch";
import { homeApi } from "../../api/homeApi";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@emotion/react";
import FloatingButton from "../music/components/FloatingButton";
import ConfirmationDialog from "../music/components/ConfirmationDialog";


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
        homeApi.get(`/tv/channels?q=${searchValue}&limit=30&offset=${(page -1)*25}`).then(result => {
            setResult(result.data);
            console.log(result.data);
        });
    }, [page, searchValue]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [item, setItem] = useState(null);
    const onEdit = (channel) => navigate(`/settings/channels/edit/${channel.uid}`);
    
    const onDelete = (channel) => {
        setItem(channel);
        setDialogOpen(true);
    }    

    const handleNewChannel = () => navigate("/settings/channels/new");
    
    const handleCloseDialog = () => {
        setItem(null);
        setDialogOpen(false);
      }      
    
      const handleConfirmDelete = () => {
        const uid = item.uid;
        homeApi.delete(`/tv/channels/${uid}`)
            .then(resp => {
                const {paging, channels} = result;
                var filtered = channels.filter(item => item.uid != uid); 
                setResult({channels: filtered, paging});
            })
            .catch(error => console.error(error));
        handleCloseDialog();
      }

    return (
        <PageContainer title="Canales de TV">
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


        <FloatingButton onClick={handleNewChannel} />
            <ConfirmationDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onDelete={handleConfirmDelete}
            />
    </PageContainer>
  )
}

export default ChannelsPage;