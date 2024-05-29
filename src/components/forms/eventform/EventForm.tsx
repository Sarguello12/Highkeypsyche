import React, { memo, useState } from 'react'
import { EventFormData } from '../forms.types'
import { initEventFormState } from '../formConfig'

const EventForm = () => {
  const [eventFormState, setEventFormState] = useState<EventFormData>(initEventFormState)
  return (
    <></>
  )
}

export default memo(EventForm)