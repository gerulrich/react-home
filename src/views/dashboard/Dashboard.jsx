import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';

// components
import StorageCard from './components/StorageCard';
import CpuTemperatureCard from './components/CpuTemperatureCard';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <StorageCard />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CpuTemperatureCard />
          </Grid>
          </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
