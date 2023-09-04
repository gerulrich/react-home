import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';

import PlexLogo from 'src/assets/images/logos/plex.svg';
import LedFxLogo from 'src/assets/images/logos/ledfx.png';

// components
import StorageCard from './components/StorageCard';
import CpuTemperatureCard from './components/CpuTemperatureCard';
import AppCard from '../music/components/AppCard';
import { useSelector } from 'react-redux';


const Dashboard = () => {
  const { darkMode } = useSelector(state => state.ui);
  const appsURL = import.meta.env.VITE_APP_URL;
  const hassioURL = import.meta.env.VITE_HASSIO_URL;

  return (
    <PageContainer title="Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={6} md={3} lg={2}>
            <AppCard
              appName="Plex"
              appUrl={`${appsURL}/plex/web/index.html`}
              appIcon={PlexLogo}
            />
          </Grid>

          <Grid item xs={6} md={3} lg={2}>
            <AppCard
              appName="Pi Hole"
              appUrl={`${appsURL}/pihole/admin/`}
              appIcon="https://icons-for-free.com/iconfiles/svg/0/pihole-1331550892299718312.svg"
            />
          </Grid>

          <Grid item xs={6} md={3} lg={2}>
            <AppCard
              appName="Guacamole"
              appUrl={`${appsURL}/guacamole/`}
              appIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apache_Guacamole_logo.png/240px-Apache_Guacamole_logo.png"
            />
          </Grid>

          <Grid item xs={6} md={3} lg={2}>
            <AppCard
              appName="Photo Prism"
              appUrl={`${appsURL}/prism/`}
              appIcon="https://dl.photoprism.org/img/logo/logo-crisp-text.svg"
            />
          </Grid>

          <Grid item xs={6} md={3} lg={2}>
            <AppCard
              appName="Node Red"
              appUrl={`${appsURL}/nodered/`}
              appIcon="https://nodered.org/about/resources/media/node-red-icon.svg"
            />
          </Grid>

          <Grid item xs={6} md={3} lg={2}>
            <AppCard
              appName="Home Assistant"
              appUrl={`${hassioURL}/`}
              appIcon="https://upload.wikimedia.org/wikipedia/commons/6/6e/Home_Assistant_Logo.svg"
            />
          </Grid>

          <Grid item xs={6} md={3} lg={2}>
            <AppCard
              appName="ESP Home"
              appUrl={`${appsURL}/esphome/`}
              appIcon="https://esphome.io/_images/logo.svg"
              className={darkMode ? 'dark-invert' : ''}
            />
          </Grid>

          <Grid item xs={6} md={3} lg={2}>
            <AppCard
              appName="Vault Garden"
              appUrl={`${appsURL}/vault/`}
              appIcon="https://codeberg.org/Masgalor/Vaultwarden/raw/branch/main/resources/vaultwarden-icon.svg"
              className={darkMode ? 'dark-invert' : ''}
            />
          </Grid>

          <Grid item xs={6} md={3} lg={2}>
            <AppCard
              appName="LedFX"
              appUrl={`${appsURL}/ledfx/`}
              appIcon={LedFxLogo}
            />
          </Grid>

          <Grid item xs={6} md={3} lg={2}>
            <AppCard
              appName="Zigbee2MQTT"
              appUrl={`${appsURL}/zigbee2mqtt/`}
              appIcon="https://raw.githubusercontent.com/Koenkk/zigbee2mqtt/dev/images/logo_vector.svg"
            />
          </Grid>

          <Grid item xs={6} md={3} lg={2}>
            <AppCard
              appName="Mongo DB"
              appUrl={`${appsURL}/mongo/`}
              appIcon="https://developer.asustor.com/uploadIcons/0020_999_1579585089_mongo-express-256.png"
            />
          </Grid>

        </Grid>

        <Grid container spacing={3} mt={2}>

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
