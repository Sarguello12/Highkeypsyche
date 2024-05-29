import { DatePickerData, EventFormData } from './forms.types'


// generate random GUID for events
export function GenerateEventGUID(): string { return self.crypto.randomUUID() }

export const initEventFormState: EventFormData = {
  description: '',
  eventId: undefined
}

export const initDatePickerState: DatePickerData = {
  description: '',
  eventId: undefined,
  allDay: false,
  start: undefined,
  end: undefined
}