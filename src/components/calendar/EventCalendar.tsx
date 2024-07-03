import { useState, MouseEvent, useMemo } from "react"
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider } from "@mui/material"
import { Calendar, type Event } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { DatePickerData, EventFormData, IEventInfo, ITodo } from '../../shared/types'
import { generateGUID } from '../../shared/master'
import { initDatePickerState, initEventFormState } from '../forms/formConfig'
import { LOCALIZER } from '../../shared/utils/siteConfig'
import EventInfo from '../eventinfo/EventInfo'
import EventInfoModal from '../modals/EventInfoModal'
import AddEventModal from '../modals/AddEventModal'
import DatePickerModal from '../modals/DatePickerModal'
import { AddTodoModal } from '../modals/AddTodoModal'

const EventCalendar = () => {const [openSlot, setOpenSlot] = useState<boolean>(false)
  const [openDatepickerModal, setOpenDatepickerModal] = useState<boolean>(false)
  const [openTodoModal, setOpenTodoModal] = useState<boolean>(false)
  const [currentEvent, setCurrentEvent] = useState<Event | IEventInfo | null>(null)
  const [eventInfoModal, setEventInfoModal] = useState<boolean>(false)
  const [events, setEvents] = useState<IEventInfo[]>([])
  const [todos, setTodos] = useState<ITodo[]>([])
  const [eventFormData, setEventFormData] = useState<EventFormData>(initEventFormState)
  const [datePickerEventFormData, setDatePickerEventFormData] = useState<DatePickerData>(initDatePickerState)

  const handleSelectSlot = (event: Event) => {
    setOpenSlot(true)
    setCurrentEvent(event)
  }

  const handleSelectEvent = (event: IEventInfo) => {
    setCurrentEvent(event)
    setEventInfoModal(true)
  }

  const handleClose = () => {
    setEventFormData(initEventFormState)
    setOpenSlot(false)
  }

  const handleDatePickerClose = () => {
    setDatePickerEventFormData(initDatePickerState)
    setOpenDatepickerModal(false)
  }

  const onAddEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data: IEventInfo = {
      ...eventFormData,
      _id: generateGUID(),
      start: currentEvent?.start,
      end: currentEvent?.end,
    }

    const newEvents = [...events, data]

    setEvents(newEvents)
    handleClose()
  }

  const onAddEventFromDatePicker = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const addHours = (date: Date | undefined, hours: number) => {
      return date ? date.setHours(date.getHours() + hours) : undefined
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setMinToZero = (date: any) => {
      date.setSeconds(0)

      return date
    }

    const data: IEventInfo = {
      ...datePickerEventFormData,
      _id: generateGUID(),
      start: setMinToZero(datePickerEventFormData.start),
      end: datePickerEventFormData.allDay
        ? addHours(datePickerEventFormData.start, 12)
        : setMinToZero(datePickerEventFormData.end),
    }

    const newEvents = [...events, data]

    setEvents(newEvents)
    setDatePickerEventFormData(initDatePickerState)
  }

  const onDeleteEvent = () => {
    setEvents(() => [...events].filter((e) => e._id !== (currentEvent as IEventInfo)._id!))
    setEventInfoModal(false)
  }

  // calendar views
  const { views } = useMemo(() => ({ views: { month: true, week: true } }), [])

  return (
    <Box
      mt={2}
      mb={2}
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Card>
          <CardHeader title="Event Calendar" />
          <Divider />
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <ButtonGroup size="large" variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => setOpenDatepickerModal(true)} size="small" variant="contained">
                  Add event
                </Button>
                <Button onClick={() => setOpenTodoModal(true)} size="small" variant="contained">
                  Create todo
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
            <DatePickerModal
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
            <AddTodoModal
              open={openTodoModal}
              handleClose={() => setOpenTodoModal(false)}
              todos={todos}
              setTodos={setTodos}
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
              defaultView="month"
              eventPropGetter={(event) => {
                const hasTodo = todos.find((todo) => todo._id === event.todoId)
                return {
                  style: {
                    backgroundColor: hasTodo ? hasTodo.color : "#b64fc8",
                    borderColor: hasTodo ? hasTodo.color : "#b64fc8",
                  },
                }
              }}
              style={{
                height: 900,
              }}
              views={views}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default EventCalendar