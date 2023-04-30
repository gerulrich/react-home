import { Fragment } from "react"
import { Grid, ListItem, ListItemText, Typography } from "@mui/material"
import { Stack } from "@mui/system";

export const TrackItem = ({track}) => {
  
    const toTime = (seconds) => {
        var date = new Date(null);
        date.setSeconds(seconds);
        return date.toISOString().substr(14, 5);
     }

    return (
        <ListItem key={track.title}>
            <ListItemText
                primary={
                    <Fragment>
                        <Grid container direction="row">
                            <Stack direction="row" spacing={3}>
                                <Typography>{track.title}</Typography>
                                <Typography>{!!track.comments ? track.comments: ''}</Typography>
                            </Stack>
                        </Grid>
                        <Grid>
                            <Typography>{toTime(track.duration)}</Typography>
                        </Grid>
                    </Fragment>
                }
            />
        </ListItem>
  )
}
