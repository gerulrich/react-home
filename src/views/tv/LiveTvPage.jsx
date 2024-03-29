import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import { ChannelList } from '../../components/player/ChannelList';
import { ShakaPlayerComponent } from '../../components/player/ShakaPlayerComponent';
import { useEffect } from 'react';
import { homeApi } from '../../api/homeApi';
import { useSelector } from 'react-redux';


const LiveTvPage = () => {
    
    const [state, setState] = useState({channels: [], selected: {}});
    const {showAll} = useSelector(state => state.ui);

    const onSelectChannel = (channel) => {
        setState({
            ...state,
            selected: channel
        })
    }

    useEffect(() => {
        getChannels().then(resp => {
            setState( {
                ...state,
                channels: resp.channels,
            })
        })
    }, [showAll])

    const getChannels = async () => {
        const { data } = await homeApi.get('/tv/channels');
        return { channels: data.channels }
    }    

    return (
        <PageContainer title="TV en directo">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={8}>
                        <ShakaPlayerComponent media={state.selected} />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <ChannelList channels={state.channels} setChannel={onSelectChannel}/>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default LiveTvPage;