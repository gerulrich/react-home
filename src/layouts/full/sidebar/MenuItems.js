import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: 'IconLayoutDashboard',
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'TV',
  },
  {
    id: uniqueId(),
    title: 'Tv en vivo',
    icon: 'IconDeviceTv',
    href: '/live-tv',
  },
  {
    id: uniqueId(),
    title: 'Grabaciones',
    icon: 'IconDeviceTvOld',
    href: '/recordings',
  },  
  {
    navlabel: true,
    subheader: 'Musica',
  },  
  {
    id: uniqueId(),
    title: 'Deezer',
    icon: 'IconBrandDeezer',
    href: '/music/search',
  },
  {
    id: uniqueId(),
    title: 'Tidal',
    icon: 'IconBrandTidal',
    href: '/tidal/search',
  },  
  {
    id: uniqueId(),
    title: 'Mi colección',
    icon: 'IconFileMusic',
    href: '/music/explore',
  },
  {
    navlabel: true,
    subheader: 'varios',
  },  
  {
    id: uniqueId(),
    title: 'Tareas',
    icon: 'IconLayoutKanban',
    href: '/todos',
  },
  {
    navlabel: true,
    subheader: 'configuración',
  },
  {
    id: uniqueId(),
    title: 'Usuarios',
    icon: 'IconUsers',
    href: '/settings/users',
  },
  {
    id: uniqueId(),
    title: 'Canales',
    icon: 'IconDeviceTvOld',
    href: '/settings/channels',
  },
  {
    id: uniqueId(),
    title: 'Music Tags',
    icon: 'IconTags',
    href: '/settings/tags',
  },
  
];

export default Menuitems;
