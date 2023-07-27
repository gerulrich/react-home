import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { Box, Grid, IconButton, Slider, styled, Typography, useTheme } from "@mui/material";
import { Pause, PlayArrow } from "@mui/icons-material";
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { setNextSong, setPlayPause, setPrevSong } from "../../store/slices/player";


const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

const formatDuration = (value) => {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
}

export const AudioControls = ({audioPlayer}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const {isPlaying, duration, position, songs, currentSongIndex} = useSelector(status => status.player);

    useEffect(() => {
        navigator.mediaSession.setActionHandler("play", () => onPlayPause());
        navigator.mediaSession.setActionHandler("pause", () => onPlayPause());
        navigator.mediaSession.setActionHandler("seekbackward", () => backThirty());
        navigator.mediaSession.setActionHandler("seekforward", () => forwardThirty());
        navigator.mediaSession.setActionHandler("previoustrack", () => onPrevTrack());
        navigator.mediaSession.setActionHandler("nexttrack", () => onNextTrack());
    }, [currentSongIndex]);
    
    const onPlayPause = () => dispatch(setPlayPause({play: !isPlaying}));
    const backThirty = () => audioPlayer.current.currentTime = (position < 30) ? 0 : (position -30);
    const forwardThirty = () => audioPlayer.current.currentTime = (position + 30 > duration) ? (duration -1) : (position + 30);
    const onChangePosition = (_, value) => audioPlayer.current.currentTime = value;
    const onPrevTrack = () => dispatch(setPrevSong());
    const onNextTrack = () => dispatch(setNextSong());

    return (
        <Grid container
            width="100%"
            spacing={1}
            direction="row"
            justifyContent='center'
            alignItems="center">
        
            <Grid item>
                <IconButton  sx={{border: '1px solid'}} size='small' disabled={!isPlaying || currentSongIndex < 1} onClick={onPrevTrack}>
                    <SkipPreviousIcon />
                </IconButton>
            </Grid>

            <Grid item>
                <IconButton  sx={{border: '1px solid'}} size='small' disabled={!isPlaying} onClick={backThirty}>
                    <FastRewindIcon />
                </IconButton>
            </Grid>
        
            <Grid item>
                <IconButton onClick={onPlayPause} sx={{border: '1px solid'}} size='large'>
                    {isPlaying ? (<Pause />) : (<PlayArrow />)}
                </IconButton>
            </Grid>
   
            <Grid item>
                <IconButton sx={{border: '1px solid'}} size='small' disabled={!isPlaying} onClick={forwardThirty}>
                    <FastForwardIcon />
                </IconButton>
            </Grid>


            <Grid item>
                <IconButton  sx={{border: '1px solid'}} size='small' disabled={!isPlaying || currentSongIndex == songs.length-1} onClick={onNextTrack}>
                    <SkipNextIcon />
                </IconButton>
            </Grid>

            <Grid item xs={6}>
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={Math.floor(position)}
                    min={0}
                    step={1}
                    max={duration}
                    onChange={onChangePosition}
                    sx={{
                        height: 4,
                        '& .MuiSlider-thumb': {
                            width: 8,
                            height: 8,
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            '&:before': {
                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: `0px 0px 0px 8px ${
                                theme.palette.mode === 'dark'
                                    ? 'rgb(255 255 255 / 16%)'
                                    : 'rgb(0 0 0 / 16%)'
                                }`,
                            },
                            '&.Mui-active': {
                                width: 20,
                                height: 20,
                            },
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.28,
                        },
                    }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: -2,
                    }}
                >
                    <TinyText>{formatDuration(Math.floor(position))}</TinyText>
                    <TinyText>-{formatDuration(Math.floor(duration) - Math.floor(position))}</TinyText>
                </Box>

            </Grid>
        </Grid>
    )
}
