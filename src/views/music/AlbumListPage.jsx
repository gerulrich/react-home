import React, { useState, Fragment } from 'react';
import { Avatar, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AlbumIcon from '@mui/icons-material/Album';
import PlayCircleFilledTwoToneIcon from '@mui/icons-material/PlayCircleFilledTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PlaylistPlay } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { toTime } from '../../helpers/time';
import { MusicQualityTag } from './MusicQualityTag';
import { useSelector } from 'react-redux';
import { haApi } from '../../api/haApi';

const PlayButton = styled(IconButton)({
    position: 'absolute',
    left: '68px',
    bottom: '6px'
});

const AlbumListPage = ({albums=[], onPlaySongs, onQueueSongs, onDetailsAlbum, onEditAlbum, onDeleteAlbum}) => {
  const theme = useTheme();
  const [menuTrack, setMenuTrack] = useState(null);
  const [expandedAlbumId, setExpandedAlbumId] = useState(null);
  const [hovered, setHovered] = useState(null);
  const {user} = useSelector(state => state.auth);
  const isAdmin = user.roles.includes('ADMIN_ROLE');
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleExpand = (albumId) => {
    if (albumId === expandedAlbumId) {
      setExpandedAlbumId(null);
    } else {
      setExpandedAlbumId(albumId);
    }
  };

  const handleMouseEnter = (id) => {
    setHovered(id);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const onPlaySong = (song) => {
    const album = {
      tracks: [song]
    }
    onPlaySongs(album);
  }

  const onQueueSong = (song) => {
    const album = {
      tracks: [song]
    }
    onQueueSongs(album);
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event, track) => {
    setAnchorEl(event.currentTarget);
    setMenuTrack(track);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuTrack(null);
  };

  const onAddTrackToQueue = () => {
    onQueueSong(menuTrack);
    handleClose();
  }

  const onLocalPlay = async(album) => haApi.post(`/play/${album.uid}`)

  return (
    <Container>
        <Typography variant="h4" component="h1" gutterBottom>Albums</Typography>
        <List>
        { albums.map((album, idx) => (
            <Fragment key={album.uid}>
                <ListItem >
                    
                    <ListItemAvatar>
                        <IconButton edge="end" onClick={() => handleExpand(album.uid)}>
                            { expandedAlbumId === album.uid ? (<ExpandLessIcon />) : (<ExpandMoreIcon />) }
                        </IconButton>
                    </ListItemAvatar>
                    
                    <ListItemAvatar 
                        onMouseEnter={() => handleMouseEnter(album.uid)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Avatar alt={album.title} src={album.cover_url} variant="square" />
                            { hovered === album.uid && (
                            <PlayButton onClick={() => onPlaySongs(album)}>
                                <PlayCircleFilledTwoToneIcon fontSize='large' />
                            </PlayButton>
                            )}
                    </ListItemAvatar>
                    <ListItemText 
                        primary={
                          <>
                            <Typography 
                                sx={{ display: 'inline', color: theme.palette.text.primary, fontWeight: '', textDecoration: 'none' }}
                                variant="body1"
                                component={Link} to={`/music/explore/album/${album.uid}`}
                            >{album.title}
                          </Typography>

                            <MusicQualityTag format={album.format} quality={album.quality}/>
                          </>
                        }                        
                        secondary={album.artist} />
                    
                        {
                          isAdmin && (
                            <ListItemSecondaryAction>
                              <IconButton onClick={() => onEditAlbum(album)}><EditIcon size="16" /></IconButton>
                              <IconButton onClick={() => onDeleteAlbum(album)}><DeleteIcon size="16" /></IconButton>
                              <IconButton onClick={() => onLocalPlay(album)}><AlbumIcon size="16" /></IconButton>
                            </ListItemSecondaryAction>
                          )
                        }
                    
                    

                </ListItem>
            
                <Divider component="li" />
            
                {expandedAlbumId === album.uid && (
                  
                    <List component="div">
                    { album.tracks.map((track) => (
                        <Fragment key={track.uid}>
                            <ListItem dense sx={{ l: 10 }}>
                                <ListItemAvatar style={{marginLeft: '20px'}}>
                                    <IconButton onClick={() => onPlaySong(track)}>
                                        <PlayArrowIcon fontSize='small'/>
                                    </IconButton>
                                </ListItemAvatar>

                                <ListItemText 
                                    primary={track.track_number + '. ' + track.title}
                                    secondary={track.artist}
                                />
                    
                                <ListItemSecondaryAction>
                                    <Grid container alignItems="center" >
                                        <Grid item>
                                            <ListItemText primary={toTime(track.duration)} />
                                        </Grid>
                                        <Grid>
                                            <IconButton size="small" onClick={(event) => handleClick(event, track)}>
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider sx={{borderStyle:'dashed', marginInlineStart: '40px'}}/>
                            
                        </Fragment>
                    ))}
                    </List>
                    
                )}
            </Fragment>
        ))}
        </List>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={onAddTrackToQueue}>
          <ListItemIcon>
            <PlaylistPlay size="16" />
          </ListItemIcon>
          <ListItemText>Agregar al final de la lista</ListItemText>
      </MenuItem>
      </Menu>

    </Container>
  );
}

export default AlbumListPage;