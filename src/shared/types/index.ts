import { Dispatch, SetStateAction } from 'react'
import { type Event } from "react-big-calendar"

// export interface ITodo {
//   _id: string
//   title: string
//   color?: string
// }

// export interface IEventInfo extends Event {
//   _id: string
//   description: string
//   todoId?: string
// }

// export interface EventFormData {
//   description: string
//   todoId?: string
// }

// export interface DatePickerEventFormData {
//   description: string
//   todoId?: string
//   allDay: boolean
//   start?: Date
//   end?: Date
// }

export interface IEventInfo extends Event {
  _id: string
  description: string
  todoId?: string
}

export interface ITodo {
  _id: string
  title: string
  color?: string
}

export interface EventFormData {
  description: string
  todoId?: string
}

export interface DatePickerData {
  description: string
  todoId?: string
  allDay: boolean
  start?: Date
  end?: Date
}

export interface IModalProps {
  open: boolean
  handleClose: Dispatch<SetStateAction<void>>
}
