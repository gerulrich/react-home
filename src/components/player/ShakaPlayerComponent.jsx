import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ShakaPlayer from 'shaka-player-react';
import DashboardCard from '../shared/DashboardCard'

export const ShakaPlayerComponent = ({media}) => {
  
    const [show, setShow] = useState(false);
    const ref = useRef(null);
  
    useEffect(() => {
        window.getShakaInst = () => ref.current;
        const { player, ui } = ref.current;
        if (media.media_url && ref.current) {
            const config = {
                'controlPanelElements': [
                        'play_pause',
                        'time_and_duration',
                        'spacer',
                        'mute',
                        'volume',
                        'cast',
                        'airplay',
                        'fullscreen',
                        'overflow_menu'
                ],
                'addSeekBar': false,
                'customContextMenu' : true,
                'contextMenuElements' : ['statistics'],
                'statisticsList' : ['width', 'height', 'playTime', 'bufferingTime'],
                'addBigPlayButton': true
            }
            ui.configure(config);
            const clearKeys = {};
            clearKeys[media.drm.clear_keys.key_id] = media.drm.clear_keys.key;
            console.log({drm: {clearKeys}})
            player.configure({ drm: { clearKeys }});
            setShow(true);
        }
    }, [media]);

    return (
        <>
            <DashboardCard title="Aca va el reproductor" subtitle={`Mirando ${media.name}`}>
                <div data-shaka-player-cast-receiver-id="1BA79154">
                    <ShakaPlayer ref={ref} autoPlay src={media?.media_url} chromeless={false}/>
                </div>
            </DashboardCard>
        </>
    )
}
