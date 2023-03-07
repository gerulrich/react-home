import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import { ChannelList } from '../../components/player/ChannelList';
import { ShakaPlayer } from '../../components/player/ShakaPlayer';


const LiveTvPage = () => {
    
    const [state, setState] = useState({
        channels: [
            {
                name: "Opción 1",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png"
            },
            {
                name: "Opción 2",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png"
            },
            {
                name: "Opción 3",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png"
            },
        ],
        selected: {
            name: "Opción 1",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png"
        }
    });

    const onSelectChannel = (channel) => {
        setState({
            ...state,
            selected: channel
        })
    }

    return (
        <PageContainer title="TV en directo">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={8}>
                        <ShakaPlayer media={state.selected} />
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