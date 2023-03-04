import {Box , Grid } from "@mui/material";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";


export const TodoPage = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
    <Box>
        <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
                <DashboardCard title="Mis Tareas">
                
                </DashboardCard>
            </Grid>
        </Grid>
    </Box>
</PageContainer>
  )
}


export default TodoPage;
