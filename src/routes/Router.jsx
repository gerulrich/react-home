import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';


/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
// DashBoards
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
// Music
const SearchPage = Loadable(lazy(() => import('../views/music/SearchPage')));
const ArtistPage = Loadable(lazy(() => import('../views/music/ArtistPage')));
const AlbumPage = Loadable(lazy(() => import('../views/music/AlbumPage')));
const LocalMusicPage = Loadable(lazy(() => import('../views/music/LocalMusicPage')));

// TV 
const LiveTvPage = Loadable(lazy(() => import('../views/tv/LiveTvPage')));


// Settings
const ChannelsPage = Loadable(lazy(() => import('../views/settings/ChannelsPage')));
const MusicTagsPage = Loadable(lazy(() => import('../views/settings/MusicTagsPage')));
const UsersPage = Loadable(lazy(() => import('../views/settings/UsersPage')));



const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));


export const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      
      // TV 
      { path: '/live-tv', exact: true, element: <LiveTvPage /> },
      
      
      // Music
      { path: '/music/search', exact: true, element: <SearchPage /> },
      { path: '/music/search/artist/:artistId', exact: true, element: <ArtistPage /> },
      { path: '/music/search/artist/:artistId/album/:albumId', exact: true, element: <AlbumPage /> },
      { path: '/music/explore', exact: true, element: <LocalMusicPage /> },
      
      { path: '/icons', exact: true, element: <Icons /> },
      
      
      { path: '/settings/channels', exact: true, element: <ChannelsPage /> },
      { path: '/settings/tags/', exact: true, element: <MusicTagsPage /> },
      { path: '/settings/users/', exact: true, element: <UsersPage /> },
      
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },


      

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  }
];

export default Router;
