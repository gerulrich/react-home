import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography, useTheme } from "@mui/material"
import { Fragment } from "react"
import { Link } from "react-router-dom"


export const ChannelItem = ({channel, setChannel}) => {

    const theme = useTheme();

  return (
    <>
        <ListItem alignItems="flex-start" onClick={() => {setChannel(channel)}} component={Link}>
            <ListItemAvatar>
                <Avatar alt={channel.name} src={channel.logo}/>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography
                            sx={{ display: 'inline', color: theme.palette.text.primary, fontWeight: 'bold' }}
                            component="span"
                            variant="body2"
                        >{channel.name}
                        </Typography>
                }
                secondary={
                    <Fragment>
                        <Typography
                            sx={{ display: 'inline', color: theme.palette.text.secondary, }}
                            component="span"
                            variant="body2"
                        > Programa
                        </Typography>
                             — detalles del programa...
                    </Fragment>
                }
                
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
}