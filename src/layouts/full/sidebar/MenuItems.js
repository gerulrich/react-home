import { MusicNoteTwoTone } from '@mui/icons-material';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import {
  IconBrandSpotify, IconDeviceTv, IconDeviceTvOld, IconFileMusic, IconLayoutDashboard, IconTags, IconUsers
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },

  {
    navlabel: true,
    subheader: 'TV',
  },
  {
    id: uniqueId(),
    title: 'Tv en vivo',
    icon: IconDeviceTv,
    href: '/live-tv',
  },



  /*{
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: 'Typography',
    icon: IconTypography,
    href: '/ui/typography',
  },
  {
    id: uniqueId(),
    title: 'Shadow',
    icon: IconCopy,
    href: '/ui/shadow',
  },
  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/icons',
  },*/
  {
    navlabel: true,
    subheader: 'Musica',
  },  
  {
    id: uniqueId(),
    title: 'Buscar',
    icon: IconBrandSpotify,
    href: '/music/search',
  },
  {
    id: uniqueId(),
    title: 'Mi collección',
    icon: IconFileMusic,
    href: '/music/explore',
  },
  {
    navlabel: true,
    subheader: 'configuración',
  },
  {
    id: uniqueId(),
    title: 'Usuarios',
    icon: IconUsers,
    href: '/settings/users',
  },
  {
    id: uniqueId(),
    title: 'Canales',
    icon: IconDeviceTvOld,
    href: '/settings/channels',
  },
  {
    id: uniqueId(),
    title: 'Music Tags',
    icon: IconTags,
    href: '/settings/tags',
  },
  
];

export default Menuitems;
