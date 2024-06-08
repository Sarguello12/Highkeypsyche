import { Dispatch, SetStateAction } from 'react'

export interface IEventInfo extends Event {
  _id: string
  title: string
  description: string
  color?: string
}

export interface IModalProps {
  open: boolean
  handleClose: Dispatch<SetStateAction<void>>
}
