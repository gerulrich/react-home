import { Avatar, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import { homeApi } from "../../api/homeApi";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayDisabledIcon from '@mui/icons-material/PlayDisabled';
import { useNavigate } from "react-router";


export const MusicTagsPage = () => {
    
    const navigate = useNavigate();
    const [data, setData] = useState({ tags: [], total: 0 });
    useEffect(() => {
        homeApi.get('/tags?limit=10')
          .then((res) => {
            setData(res.data);
            console.log("Result:", data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      const onEdit = (tag) => navigate(`/settings/tags/${tag.uid}`);

    return (
        <PageContainer title="Music Tags">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                        <DashboardCard title="Music Tags">


                        <TableContainer component={Paper}>
                            <Table aria-label="simple table" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tag ID</TableCell>
                                        <TableCell>Album</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Artist</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.tags.map((row) => (
                                        <TableRow key={row.uid}>
                                            <TableCell>{row.code}</TableCell>
                                            <TableCell>
                                                    <Avatar 
                                                        variant="rounded"
                                                        src={row.album.cover_url}
                                                        sx={{ width: 56, height: 56 }}/>
                                            </TableCell>
                                            <TableCell>{row.album.title}</TableCell>
                                            
                                            <TableCell>{row.album.artist}</TableCell>
                                            <TableCell>
                                                <IconButton aria-label="edit" onClick={()=> onEdit(row)}>
                                                    <EditIcon size="16" />
                                                </IconButton>
                                                <IconButton aria-label="disable">
                                                    <PlayDisabledIcon />
                                                </IconButton>                                                
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                            
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>


                        </DashboardCard>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
  )
}

export default MusicTagsPage;