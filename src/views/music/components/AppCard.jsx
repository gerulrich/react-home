import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, CardHeader, CardMedia, Box } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';

const AppCard = ({ appName, appIcon, appUrl, className }) => {
  const handleOpenApp = () => window.open(appUrl, '_blank');

  return (
    <Card x={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }} alignItems="center">
        <CardContent>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {appName}
          </Typography>
          <img src={appIcon} alt={appName} height='100' width='100' className={className} />
        </CardContent>
        <CardActions>
          <Button onClick={handleOpenApp} startIcon={<OpenInNew />} variant="outlined">
            Open App
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default AppCard;



