import { IEventInfo } from '../../shared/types'
import { Typography } from '@mui/material'

type EventInfoProps = {
  event: IEventInfo
}

const EventInfo = (props: EventInfoProps) => {
  return  <Typography>{props.event.description}</Typography>
}   

export default EventInfo