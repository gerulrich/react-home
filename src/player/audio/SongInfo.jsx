import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import VinylImg from '../../assets/images/Vinyl_record.svg';

export const SongInfo = ({songs, currentSong, currentSongIndex, isPlaying}) => {
  
    const cover = currentSong && 'cover_url' in currentSong ? currentSong.cover_url : VinylImg;
    return (
        <Grid container
            width="100%"
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
        >
            <Grid item m={1}>
                <Avatar
                    src={cover}
                    sx={{ width: 60, height: 60 }}
                    className={isPlaying ? 'rotate' : 'rotate paused'} 
                />                
            </Grid>
            <Grid item m={1}>
                <Stack direction="column" alignItems="flex-start" justifyContent="flex-start">
                    <Typography sx={{fontWeight: 'bold'}} variant="body1">{currentSong?.title}</Typography>
                    <Typography variant="body1"
                        style={{width: '200px',
                            overflow: 'hidden',
                             whiteSpace: 'nowrap',
                             textOverflow: 'ellipsis',
                             textAlign:'left'}}
                    >{currentSong?.artist}</Typography>
                    <Typography variant="body2">{currentSong?.album_name}</Typography>
                </Stack>            
            </Grid>
        </Grid>
    )
}
