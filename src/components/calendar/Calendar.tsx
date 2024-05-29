import React, { memo, useState } from 'react'
import { IEventInfo } from './Calendar.types'

const Calendar = () => {
  const [currEvent, setCurrEvent] = useState<Event | IEventInfo | null>(null)
  const [events, setEvents] = useState<IEventInfo[]>([])
  // modal state
  const [openSlot, setOpenSlot] = useState<boolean>(false)
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false)
  const [openEventInfo, setOpenEventInfo] = useState<boolean>(false)

  return (
    <></>
  )
}

export default memo(Calendar)