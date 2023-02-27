import { Stack, Typography, Avatar, Fab, useTheme } from '@mui/material';
import { IconTemperatureCelsius, IconTemperature } from '@tabler/icons';
import Chart from 'react-apexcharts';
import DashboardCard from '../../../components/shared/DashboardCard';

const CpuTemperatureCard = () => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <DashboardCard
      title="Temperatura CPU"
      action={
        <Fab color="secondary" size="medium" sx={{color: '#ffffff'}}>
          <IconTemperatureCelsius width={24} />
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="60px" />
      }
    >
      <>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconTemperature width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">41º</Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default CpuTemperatureCard;
