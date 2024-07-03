import { format, getDay, parse, startOfWeek } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { dateFnsLocalizer } from 'react-big-calendar'

export const locales = { 'en-US': enUS }
export const LOCALIZER = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales })