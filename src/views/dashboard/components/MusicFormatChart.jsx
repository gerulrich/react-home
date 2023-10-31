import { Grid } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { homeApi } from '../../../api/homeApi';

const MusicFormatChart = () => {

  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  // chart
  const options = {
    chart: {
      type: 'donut',
      foreColor: '#adb0bb',
      height: 180,
    },
    stroke: { show: true },
    dataLabels: { enabled: true },
    legend: { show: true },

    responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],



    plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true
              }
            }
          }
        }
      },
    
    labels: labels
  };


  useEffect(() => {
      homeApi.get('/music/stats')
      .then(resp => {
        const data = resp.data.sort((a, b) => b.count - a.count);
        setSeries(data.map(item => item.count));
        setLabels(data.map(item => (item._id.format + (item._id.quality ? (" (" +item._id.quality + ')') : ''))));
      });
  }, []);
  
  return (
    <DashboardCard title="Albums por formato">
      <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height={180}
          />
      </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default MusicFormatChart;
