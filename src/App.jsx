import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { CheckinAuth } from './components/ui';
import Router from './routes/Router';
import AuthRouter from './routes/AuthRouter';

import { baselightTheme } from "./theme/DefaultColors";
import { useCheckAuth } from './hooks';

function App() {
  const routing = useRoutes(Router);
  const authRouting = useRoutes(AuthRouter);
  const theme = baselightTheme;

  const status = useCheckAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      { /** TODO crear un AppRouter y meter toda la logica del router ahi */
        status === 'checkin' 
        ? (<CheckinAuth/>)
        : status === 'not-authenticated' ? (<>{authRouting}</>) : (<>{routing}</>)
      }
    </ThemeProvider>
  );

}

export default App;
