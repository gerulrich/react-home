import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  CircularProgress, 
  Stack, 
  Typography,
  Container,
  Snackbar,
  Alert
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { homeApi } from '../../api/homeApi';

const MusicQrCodePage = () => {
  const { code } = useParams();
  const { status } = useSelector(state => state.auth);
  const isAuthenticated = status === 'authenticated';
  
  const [tagInfo, setTagInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchTagInfo = async () => {
      try {
        setLoading(true);
        // Intentar decodificar de base64, si falla usar el código directamente
        let decodedCode = code;
        try {
          decodedCode = atob(code);
        } catch (e) {
          // El código no está en base64, usar tal cual
          decodedCode = code;
        }
        const { data } = await homeApi.get(`/tags/code/${decodedCode}`);
        setTagInfo(data);
      } catch (err) {
        setError('No se pudo cargar la información del tag');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchTagInfo();
    }
  }, [code]);

  const handlePlay = async () => {
    try {
      await homeApi.post(`/tags/${tagInfo.uid}/play`);
      setSnackbar({ open: true, message: 'Reproduciendo álbum', severity: 'success' });
    } catch (err) {
      console.error('Error al reproducir:', err);
      setSnackbar({ open: true, message: 'Error al reproducir', severity: 'error' });
    }
  };

  const handleAddToQueue = async () => {
    try {
      await homeApi.post(`/tags/${tagInfo.uid}/queue`);
      setSnackbar({ open: true, message: 'Añadido a la lista de reproducción', severity: 'success' });
    } catch (err) {
      console.error('Error al añadir a la lista:', err);
      setSnackbar({ open: true, message: 'Error al añadir a la lista', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !tagInfo) {
    return (
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Typography variant="h6" color="error">
            {error || 'Tag no encontrado'}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center"
        minHeight="100vh"
        py={4}
      >
        <Card sx={{ width: '100%', maxWidth: 400 }}>
          {tagInfo.album?.cover_url && (
            <CardMedia
              component="img"
              height="400"
              image={tagInfo.album.cover_url}
              alt={tagInfo.album.title}
            />
          )}
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {tagInfo.album?.title || 'Sin título'}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {tagInfo.album?.artist || 'Artista desconocido'}
            </Typography>
            
            <Stack spacing={2} mt={3}>
              {isAuthenticated && (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  onClick={handlePlay}
                  fullWidth
                >
                  Reproducir
                </Button>
              )}
              <Button
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<PlaylistAddIcon />}
                onClick={handleAddToQueue}
                fullWidth
              >
                Añadir a la lista
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default MusicQrCodePage;
