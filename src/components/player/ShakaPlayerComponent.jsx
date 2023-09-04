import { useEffect, useRef } from 'react';
import ShakaPlayer from 'shaka-player-react';

import DashboardCard from '../shared/DashboardCard'

export const ShakaPlayerComponent = ({media}) => {
  
    const ref = useRef(null);
    const config = {
        controlPanelElements: ['play_pause', 'time_and_duration', 'spacer', 'mute', 'volume', 'airplay', 'fullscreen', 'overflow_menu'],
        addSeekBar: true,
        customContextMenu : true,
        contextMenuElements : ['statistics'],
        statisticsList : ['width', 'height', 'playTime', 'bufferingTime'],
        addBigPlayButton: false,
        castReceiverAppId: '1BA79154',
        
    }
  
    useEffect(() => {
        window.getShakaInst = () => ref.current;
        const { player, ui } = ref.current;
        if (ref.current && media.media_url) {
            const clearKeys = {};
            ui.configure(config);            
            clearKeys[media.drm.clear_keys.key_id] = media.drm.clear_keys.key;
            player.configure({ drm: { clearKeys }});
        }
    }, [media]); 
    return (
        <>
            <DashboardCard title="Aca va el reproductor" subtitle={`Mirando ${media.name ? media.name : media.title}`}>
                <ShakaPlayer ref={ref} autoPlay src={media?.media_url}
                  data-shaka-player-container
                  data-shaka-player-cast-receiver-id="1BA79154"
                 />
            </DashboardCard>
        </>
    )
}
