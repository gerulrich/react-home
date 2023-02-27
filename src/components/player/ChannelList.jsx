import { Divider, List } from "@mui/material"
import DashboardCard from "../shared/DashboardCard"
import { ChannelItem } from "./ChannelItem"

export const ChannelList = ({channels = [], setChannel}) => {
  return (
        <DashboardCard title="Canales">
            <Divider component="hr" />
                <List >
                    {channels.map(channel => (
                        <ChannelItem channel={channel} setChannel={setChannel} key={channel.name}/>
                    ))}
                </List>
        </DashboardCard>
  )
}
