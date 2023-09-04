import { Avatar, Container, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, OutlinedInput, Pagination, Typography } from "@mui/material";
import { homeApi } from "../../api/homeApi";
import { Fragment, useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router";
import FloatingButton from "../music/components/FloatingButton";
import ConfirmationDialog from "../music/components/ConfirmationDialog";
import { useTheme } from "@emotion/react";
import PageContainer from "../../components/container/PageContainer";
import { IconSearch } from "@tabler/icons-react";
import { usePagingSearch } from "../../hooks/usePagingSearch";

export const MusicTagsPage = () => {

    const navigate = useNavigate();
    const theme = useTheme();
    const [item, setItem] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const {
        page,
        searchValue,
        result,
        setResult,
        searchText,
        onInputChange,
        onPageChange,
        onSearchSubmit
    } = usePagingSearch({ tags: [], paging: { page: 0, total: 0 } });

    useEffect(() => {
        homeApi.get(`/tags?q=${searchValue}&offset=${(page - 1) * 25}&limit=25`)
            .then((res) => setResult(res.data))
            .catch(error => console.log(error));
    }, [searchValue, page]);

    const onEdit = (tag) => navigate(`/settings/tags/edit/${tag.uid}`);
    const handleNewTag = () => navigate(`/settings/tags/new`);
    const onDelete = (tag) => {
        setItem(tag);
        setDialogOpen(true);
    }

    const handleCloseDialog = () => {
        setItem(null);
        setDialogOpen(false);
    }

    const handleConfirmDelete = () => {
        const uid = item.uid;
        homeApi.delete(`/tags/${item.uid}`)
            .then(resp => {
                console.log(result);
                const filtered = result.tags.filter(item => item.uid != uid);
                setResult({
                    tags: filtered,
                    paging: result.paging,
                });
            })
            .catch(error => console.log(error));
        handleCloseDialog();
    };

    return (
        <>
            <PageContainer title="Music Tags">
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
                    </Grid>
                </Grid>

                <Grid container alignItems="flex-start" direction="row" justifyContent="center" m={1}>
                    <Grid container alignItems="center" justifyContent="center" m={1}>
                        <Pagination onChange={onPageChange} count={result.paging.total} disabled={result.paging.total <= 1} page={page} />
                    </Grid>
                </Grid>

                <Grid container spacing={3} mt={0.5}>
                    <Container>
                        <Typography variant="h4" component="h1" gutterBottom>Music Tags</Typography>
                        <List>
                            {result.tags.map((tag, index) =>
                            (
                                <Fragment key={tag.uid}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar src={tag.album.cover_url} variant="square" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    sx={{ display: 'inline', color: theme.palette.text.primary, fontWeight: '', textDecoration: 'none' }}
                                                    variant="body1"
                                                >{tag.album.title}</Typography>
                                            }
                                            secondary={`RFID: ${tag.code}`} />

                                        <ListItemSecondaryAction>
                                            <IconButton onClick={() => onEdit(tag)}><EditIcon size="16" /></IconButton>
                                            <IconButton onClick={() => onDelete(tag)}><DeleteIcon size="16" /></IconButton>
                                        </ListItemSecondaryAction>

                                    </ListItem>
                                    <Divider component="li" />
                                </Fragment>
                            ))}
                        </List>
                    </Container>
                </Grid>

                <Grid container alignItems="flex-start" direction="row" justifyContent="center" m={1} style={{ display: (result.tags.length > 5) ? '' : 'none' }}>
                    <Grid container alignItems="center" justifyContent="center" m={1}>
                        <Pagination onChange={onPageChange} count={result.paging.total} disabled={result.paging.total <= 1} page={page} />
                    </Grid>
                </Grid>

            </PageContainer>

            <FloatingButton onClick={handleNewTag} />
            <ConfirmationDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onDelete={handleConfirmDelete}
            />

        </>


    )
}

export default MusicTagsPage;