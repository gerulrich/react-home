import { Fragment } from "react"
import { Button, Grid, IconButton, ListItem, ListItemText, Typography } from "@mui/material"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
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
                                <Typography>{track.title_short}</Typography>
                                <Typography>{!!track.title_version ? track.title_version: ''}</Typography>
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
