import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const Calendar = () => {
  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      editable
      selectable
      droppable
      headerToolbar={{
        start: 'today',
        center: 'title',
        end: ''
      }}
    />
  )
}

export default Calendar
