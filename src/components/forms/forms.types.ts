export interface EventFormData {
  description: string
  eventId: string | undefined
}

export interface DatePickerData {
  description: string
  eventId?: string
  allDay: boolean
  start?: Date
  end?: Date
}