import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { Fragment } from "react"
import { Link } from "react-router-dom"


export const ChannelItem = ({channel, setChannel}) => {
  return (
    <>
        <ListItem alignItems="flex-start" onClick={() => {setChannel(channel)}} component={Link}>
            <ListItemAvatar>
                <Avatar alt={channel.name} src={channel.logo}/>
            </ListItemAvatar>
            <ListItemText
                primary={channel.name}
                secondary={
                    <Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
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