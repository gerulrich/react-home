import { Typography } from "@mui/material"
import  {
    IconBrandDeezer,
    IconBrandTidal,
    IconDeviceTv,
    IconDeviceTvOld,
    IconError404,
    IconFileMusic,
    IconLayoutDashboard,
    IconLayoutKanban,
    IconTags,
    IconUsers,
    IconMovie
} from  "@tabler/icons-react"


export const TablerIcons = (props) => {
    const { icon } = props

    const icons = {
      'IconBrandDeezer': IconBrandDeezer,
      'IconBrandTidal': IconBrandTidal,
      'IconDeviceTv': IconDeviceTv,
      'IconDeviceTvOld': IconDeviceTvOld,
      'IconFileMusic': IconFileMusic,
      'IconLayoutDashboard': IconLayoutDashboard,
      'IconLayoutKanban': IconLayoutKanban,
      'IconTags': IconTags,
      'IconUsers': IconUsers,
      'IconMovie': IconMovie
    }

    const Icon = icons[icon] 

    if (Icon) {
      return <Icon stroke={1.5} size="1.3rem"/>
    }

   return ( 
    <>
      <IconError404 stroke={1.5} size="1.3rem"/>
      <Typography 
        variant="subtitle2"
        sx={{ color: (theme) => theme.palette.error.main }}
        >Incluir en TablerIcon.jsx</Typography>
    </>)
}