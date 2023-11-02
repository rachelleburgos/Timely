import FullCalendar from '@fullcalendar/react'
import daygridPlugin from '@fullcalendar/daygrid'

export const MyCalendar = () => {
  return (
    <div>
      <FullCalendar plugins={[daygridPlugin]} />
    </div>
  )
}
