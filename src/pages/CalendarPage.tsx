import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import { IEventInfo } from '../shared/types'
import { LOCALIZER } from '../components/calendar/CalendarConfig'

const CalendarPage = () => {
  const [events, setEvents] = useState<IEventInfo[]>([])
  const [currEvent, setCurrEvent] = useState<Event | IEventInfo | null>(null)
  // modal state
  const [openSlot, setOpenSlot] = useState<boolean>(false)
  const [eventInfoModal, setEventInfoModal] = useState<boolean>(false)

    // event handlers
  const handleSelectSlot = useCallback((event: Event) => {
    setOpenSlot(true)
    setCurrEvent(event)
  }, [])

  const handleSelectEvent = useCallback((event: IEventInfo) => {
    setCurrEvent(event)
    setEventInfoModal(true)
  }, [])

  return (
    <Box mt={2} mb={2} component="main" sx={{ flexGrow: 1, py: 8}}>
      <Container maxWidth={false}>
        <Card>
          <CardHeader title="Calendar" subheader="Create Events and Todos and manage them easily" />
          <Divider />
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <ButtonGroup size="large" variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => setOpenDatepickerModal(true)} size="small" variant="contained">
                  Add event
                </Button>
              </ButtonGroup>
            </Box>
            <Divider style={{ margin: 10 }} />
            <AddEventModal
              open={openSlot}
              handleClose={handleClose}
              eventFormData={eventFormData}
              setEventFormData={setEventFormData}
              onAddEvent={onAddEvent}
              todos={todos}
            />
            <AddDatePickerEventModal
              open={openDatepickerModal}
              handleClose={handleDatePickerClose}
              datePickerEventFormData={datePickerEventFormData}
              setDatePickerEventFormData={setDatePickerEventFormData}
              onAddEvent={onAddEventFromDatePicker}
              todos={todos}
            />
            <EventInfoModal
              open={eventInfoModal}
              handleClose={() => setEventInfoModal(false)}
              onDeleteEvent={onDeleteEvent}
              currentEvent={currentEvent as IEventInfo}
            />
            <Calendar
              localizer={LOCALIZER}
              events={events}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              startAccessor="start"
              components={{ event: EventInfo }}
              endAccessor="end"
              defaultView="week"
              // eventPropGetter={(event) => {
              //   const hasTodo = todos.find((todo) => todo._id === event.todoId)
              //   return {
              //     style: {
              //       backgroundColor: hasTodo ? hasTodo.color : "#b64fc8",
              //       borderColor: hasTodo ? hasTodo.color : "#b64fc8",
              //     },
              //   }
              // }}
              style={{
                height: 900,
              }}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default memo(CalendarPage)