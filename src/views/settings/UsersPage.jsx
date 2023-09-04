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


export const UserssPage = () => {
    
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
    } = usePagingSearch({users: [], paging: {page: 1, total: 1}});

    useEffect(() => {
        homeApi.get(`/users?q=${searchValue}&limit=25&offset=${(page -1)*25}`).then(result => setResult(result.data));
    }, [page, searchValue]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [item, setItem] = useState(null);
    const onEdit = (user) => navigate(`/settings/users/edit/${user.uid}`);
    
    const onDelete = (user) => {
        setItem(user);
        setDialogOpen(true);
    }    

    const handleNewUser = () => navigate("/settings/users/new");
    
    const handleCloseDialog = () => {
        setItem(null);
        setDialogOpen(false);
      }      
    
      const handleConfirmDelete = () => {
        const uid = item.uid;
        homeApi.delete(`/users/${uid}`)
            .then(resp => {
                const {paging, users} = result;
                var filtered = users.filter(item => item.uid != uid); 
                setResult({users: filtered, paging});
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
        </Grid>

        {/** Pagination **/}
        <Grid container alignItems="flex-start" direction="row" justifyContent="center" m={1}>
            <Grid container alignItems="center" justifyContent="center" m={1}>
                <Pagination onChange={onPageChange} count={result.pages} disabled={result.pages <= 1} page={page} />
            </Grid>
        </Grid>

        <Grid container spacing={3} mt={0.5}>
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>Usuarios</Typography>
                <List>
                { result.users.map((user) => 
                    (
                    <Fragment key={user.uid}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt={user.name} src={user.photoURL} />
                        </ListItemAvatar>

                        <ListItemText
                            primary={
                                <Typography
                                    sx={{ display: 'inline', color: theme.palette.text.primary, fontWeight: '', textDecoration: 'none' }}
                                    variant="body2"
                                >{user.name}
                                </Typography>
                            }
                            secondary={user.email}
                        />

                        <ListItemSecondaryAction>
                            <IconButton onClick={() => onEdit(user)}><EditIcon size="16" /></IconButton>
                            <IconButton onClick={() => onDelete(user)}><DeleteIcon size="16" /></IconButton>
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


        <FloatingButton onClick={handleNewUser} />
            <ConfirmationDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onDelete={handleConfirmDelete}
            />
    </PageContainer>
  )
}

export default UserssPage;