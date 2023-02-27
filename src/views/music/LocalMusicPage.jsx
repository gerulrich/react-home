import { Divider, Grid } from "@mui/material";
import { Box } from "@mui/system";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";


export const LocalMusicPage = () => {
    
    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                        <DashboardCard title="Mi Musica">
                        
                        </DashboardCard>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
  )
}

export default LocalMusicPage;