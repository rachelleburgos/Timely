import { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { v4 as uuidv4 } from 'uuid'

const MyCalendar = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    let draggableEl = document.getElementById('external-events')
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.draggable-event',
        eventData: function (eventEl) {
          let title = eventEl.innerText
          let id = `event-${uuidv4()}`
          return {
            title: title,
            id: id,
            duration: '02:00'
          }
        }
      })
    }
  }, [])

  const handleSelect = (selectInfo) => {
    console.log(selectInfo)
    // Additional logic to handle date/time selection can be added here
  }

  const handleEventReceive = (info) => {
    const newEvent = {
      ...info.event.toPlainObject(),
      id: String(uuidv4()) // Assign a new unique ID
    }
    setEvents((currentEvents) => [...currentEvents, newEvent])
  }

  return (
    <div id="my-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridDay"
        editable
        selectable
        droppable
        events={events}
        select={handleSelect}
        eventReceive={handleEventReceive}
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
      />
    </div>
  )
}

export default MyCalendar
