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

const TodosPage = Loadable(lazy(() => import('../views/todos/TodoPage')));

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
      // Settings
      { path: '/settings/channels', exact: true, element: <ChannelsPage /> },
      { path: '/settings/tags/', exact: true, element: <MusicTagsPage /> },
      { path: '/settings/users/', exact: true, element: <UsersPage /> },
      // Others
      { path: '/todos', exact: true, element: <TodosPage /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];

export default Router;
