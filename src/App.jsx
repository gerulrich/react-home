import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { CheckinAuth } from './components/ui';
import Router from './routes/Router';
import AuthRouter from './routes/AuthRouter';

import { baselightTheme } from "./theme/DefaultColors";
import { useAuthStore } from './hooks/useAuthStore';
import { useEffect } from 'react';

function App() {
  const routing = useRoutes(Router);
  const authRouting = useRoutes(AuthRouter);
  const theme = baselightTheme;

  const {status, checkAuthToken} = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      { /** TODO crear un AppRouter y meter toda la logica del router ahi junto con el useAuthStore */
        status === 'checking'
        ? (<CheckinAuth/>)
        : status === 'not-authenticated' ? (<>{authRouting}</>) : (<>{routing}</>)
      }
    </ThemeProvider>
  );

}

export default App;
