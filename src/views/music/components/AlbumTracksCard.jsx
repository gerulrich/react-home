import { Grid, List } from "@mui/material"
import DashboardCard from "../../../components/shared/DashboardCard"
import { TrackItem } from "./TrackItem"

export const AlbumTracksCard = ({tracks=[]}) => {
  return (
    <DashboardCard title="Canciones" spacing={3}>
      <Grid container>
        <Grid item xs={12}>
            <List>
                {tracks.map(track => (<TrackItem track={track} key={track.title}/>))}
            </List>
        </Grid>
      </Grid>
    </DashboardCard>
  )
}
