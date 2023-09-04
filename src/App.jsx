import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { CssBaseline, ThemeProvider } from '@mui/material';
import AuthRouter from './routes/AuthRouter';
import { appendDownloadLog, clearTag, setOnline, updateTag } from './store/slices';
import { baselightTheme, basedarkTheme } from "./theme";
import { CheckinAuth } from './components/ui';
import Router from './routes/Router';
import { useAuthStore } from './hooks';

function App() {
  const routing = useRoutes(Router);
  const authRouting = useRoutes(AuthRouter);
  const dispatch = useDispatch();
  const {status, checkAuthToken} = useAuthStore();


  const {darkMode} = useSelector(state => state.ui);
  useEffect(() => {
    checkAuthToken();
  }, [])

  useEffect(() => {
    if (status == 'authenticated') {
      const token = localStorage.getItem('token');
      const socket = io(import.meta.env.VITE_BACKEND_URL, { extraHeaders: { "x-token": token }} );
      socket.on('tag', ( payload ) => {
        dispatch(updateTag(payload))
        setTimeout(() => dispatch(clearTag()), 3000);
      });
      socket.on('download-progress', ( payload ) => dispatch(appendDownloadLog(payload)));
      socket.on('connect', () => dispatch(setOnline({online: true})));
      socket.on('disconnect', () =>  dispatch(setOnline({online: false})));

    }
  }, [status]);

  return (
    <ThemeProvider theme={darkMode ? basedarkTheme : baselightTheme}>
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
