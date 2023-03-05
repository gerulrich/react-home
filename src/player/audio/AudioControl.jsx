import { useEffect, useState } from "react";
import { Forward, Pause, PlayArrow } from "@mui/icons-material";
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { Badge, Box, Grid, IconButton, Slider, styled, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { setDuration, setPosition, setCurrentSong, setPlayPause } from "../../store/slices/player";
import { useRef } from "react";

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
  });

export const AudioControl = () => {
    const theme = useTheme();
    const {isPlaying, duration, position, songs, currentSong} = useSelector(status => status.player);
    const audioPlayer = useRef();

    function formatDuration(value) {
      const minute = Math.floor(value / 60);
      const secondLeft = value - minute * 60;
      return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }
    
    const dispatch = useDispatch();

    const onPlayPause = () => {
        const play = !isPlaying;
        dispatch(setPlayPause({play}));
    }

    useEffect(() => {
        if (isPlaying) {
            audioPlayer.current.play();
        } else {
            audioPlayer.current.pause();
        }
    }, [isPlaying, audioPlayer?.current?.readyState]);

    useEffect(() => {
        if (currentSong >= 0 && currentSong < songs.length && isPlaying) {
            if (audioPlayer.current.src !== songs[currentSong].media_url) {
                audioPlayer.current.src = songs[currentSong].media_url;
                if (isPlaying) {
                    audioPlayer.current.play();
                } else {
                    audioPlayer.current.pause();
                }
            }
        } else {
            audioPlayer.current.pause();
        }
    }, [currentSong, songs]);

    const backThirty = () => {
        const newPosition = (position < 30) ? 0 : (position -30);
        audioPlayer.current.currentTime = newPosition;
    }

    const forwardThirty = () => {
        const newPosition = (position + 30 > duration) ? (duration -1) : (position + 30);
        audioPlayer.current.currentTime = newPosition;
    }

    const OnPrevTrack = () =>{
        const prevSong = currentSong -1;
        if (prevSong >= 0) {
            dispatch(setCurrentSong({currentSong: prevSong}));
        }
    }

    const onNextTrack = () =>{
        const nextSong = currentSong + 1;
        if (nextSong < songs.length) {
            dispatch(setCurrentSong({currentSong: nextSong}));
        }
    }

    const onChangePosition = (_, value) => {
        audioPlayer.current.currentTime = value;
    }


    const onLoadedData = (event) => {
        dispatch(setDuration({duration: event.target.duration}))
    }

    const onTimeUpdate = (event) => {
        dispatch(setPosition({position: event.target.currentTime}));
    }

    const onEnded = () => {
        if (currentSong == (songs.length -1)) {
            dispatch(setPosition(0));
            dispatch(setPlayPause({play: false}));
            dispatch(setPosition({position: 0}));
            dispatch(setCurrentSong({currentSong: 0}));
        } else {
            const nextSong = currentSong + 1;
            dispatch(setCurrentSong({currentSong: nextSong}));                
        }
    }

    return (
        <>
            <audio 
                ref={audioPlayer}
                onEnded={onEnded}
                onTimeUpdate={onTimeUpdate}
                onLoadedData={onLoadedData}
                src="https://github.com/anars/blank-audio/raw/master/250-milliseconds-of-silence.mp3"
            />

        <Grid width="100%" spacing={2} container direction="row"
             justifyContent='center'
            alignItems="center">
            <Grid item>

                <IconButton  sx={{border: '1px solid'}} size='small' disabled={!isPlaying || currentSong < 1} onClick={OnPrevTrack}>
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
                <IconButton  sx={{border: '1px solid'}} size='small' disabled={!isPlaying || currentSong == songs.length-1} onClick={onNextTrack}>
                    <SkipNextIcon />
                </IconButton>
            </Grid>


            <Grid item>


            


            <Slider
                aria-label="time-indicator"
                size="small"
                value={Math.floor(position)}
                min={0}
                step={1}
                max={duration}
                onChange={onChangePosition}
                sx={{
                    width: '300px',
                    //color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
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
            <Grid item>



            <Badge badgeContent={songs.length - currentSong} overlap="circular" color="secondary">
                <IconButton size="large">
                    <QueueMusicIcon />
                </IconButton>                
            </Badge>





            </Grid>
        </Grid>
    </>
  )
}
