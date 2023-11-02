import FullCalendar from '@fullcalendar/react'
import daygridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

export const MyCalendar = () => {
  const [events, setEvents] = useState([])

  const handleSelect = (info) => {
    const { start, end } = info
    const eventNamePrompt = prompt('Enter, event name')
    if (eventNamePrompt) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt,
          id: uuid()
        }
      ])
    }
  }

  return (
    <div>
      <FullCalendar
        editable
        selectable
        events={events}
        select={handleSelect}
        headerToolbar={{
          start: 'today prev next',
          end: 'dayGridMonth dayGridWeek dayGridDay'
        }}
        plugins={[daygridPlugin, interactionPlugin]}
        views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
        initialView="dayGridDay"
      />
    </div>
  )
}
