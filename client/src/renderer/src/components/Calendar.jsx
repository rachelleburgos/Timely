import { useEffect } from 'react'
import PropTypes from 'prop-types'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { v4 as uuidv4 } from 'uuid'

const Calendar = ({ events, setEvents }) => {
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
    // Create a new event for the calendar with a new ID
    const newEvent = {
      ...info.event.toPlainObject(),
      id: String(uuidv4()) // Assign a new unique ID
    }

    setEvents((currentEvents) => {
      // Filter out the event from the current events array by its title
      // This assumes titles are unique. If not, additional identifying information should be used.
      const updatedEvents = currentEvents.filter((event) => event.title !== newEvent.title)

      // Add the new event to the events array for the calendar
      return [...updatedEvents, newEvent]
    })

    // Remove the event from the calendar so it doesn't show up twice
    info.event.remove()
  }

  return (
    <div id="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridDay"
        editable
        selectable
        droppable
        events={events}
        select={handleSelect}
        eventReceive={handleEventReceive}
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
      />
    </div>
  )
}

Calendar.propTypes = {
  events: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired
}

export default Calendar
