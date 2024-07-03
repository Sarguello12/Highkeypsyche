import { DatePickerData, EventFormData } from '../../shared/types'

export const initEventFormState: EventFormData = {
  description: "",
  todoId: undefined,
}

export const initDatePickerState: DatePickerData = {
  description: "",
  todoId: undefined,
  allDay: false,
  start: undefined,
  end: undefined,
}