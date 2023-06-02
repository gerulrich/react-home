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
const DeezerSearchPage = Loadable(lazy(() => import('../views/music/deezer/DeezerSearchPage')));
const DeezerArtistPage = Loadable(lazy(() => import('../views/music/deezer/DeezerArtistPage')));
const DeezerAlbumPage = Loadable(lazy(() => import('../views/music/deezer/DeezerAlbumPage')));
const LocalMusicPage = Loadable(lazy(() => import('../views/music/LocalMusicPage')));
const EditAlbumPage = Loadable(lazy(() => import('../views/music/EditAlbumPage')));
const LocalAlbumPage = Loadable(lazy(() => import('../views/music/LocalAlbumPage')));

// TV 
const LiveTvPage = Loadable(lazy(() => import('../views/tv/LiveTvPage')));


// Settings
const ChannelsPage = Loadable(lazy(() => import('../views/settings/ChannelsPage')));
const EditChannelPage = Loadable(lazy(() => import('../views/settings/EditChannelPage')));
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
      { path: '/music/search', exact: true, element: <DeezerSearchPage /> },
      { path: '/music/search/artist/:artistId', exact: true, element: <DeezerArtistPage /> },
      { path: '/music/search/artist/:artistId/album/:albumId', exact: true, element: <DeezerAlbumPage /> },
      { path: '/music/explore', exact: true, element: <LocalMusicPage /> },
      { path: '/music/explore/album/edit/:albumId', exact: true, element: <EditAlbumPage /> },
      { path: '/music/explore/album/:albumId', exact: true, element: <LocalAlbumPage /> },
      // Settings
      { path: '/settings/channels', exact: true, element: <ChannelsPage /> },
      { path: '/settings/channels/:channelId', exact: true, element: <EditChannelPage /> },
      { path: '/settings/tags/', exact: true, element: <MusicTagsPage /> },
      { path: '/settings/users/', exact: true, element: <UsersPage /> },
      // Others
      { path: '/todos', exact: true, element: <TodosPage /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];

export default Router;
