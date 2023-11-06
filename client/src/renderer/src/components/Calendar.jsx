import { useEffect } from 'react'
import PropTypes from 'prop-types'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { v4 as uuidv4 } from 'uuid'

const Calendar = ({ events, setEvents, removeEventFromInbox }) => {
  useEffect(() => {
    let draggableEl = document.getElementById('external-events')
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.draggable-event',
        eventData: function (eventEl) {
          let title = eventEl.innerText
          let id = eventEl.getAttribute('data-id')
          return {
            title: title,
            id: uuidv4(),
            duration: '02:00'
          }
        }
      })
    }
  }, [])

  const handleSelect = (selectInfo) => {
    // Logic to handle creation of a new event on date/time selection
    // Example: prompt the user for event title
    let title = prompt('Enter a title for this event:')
    if (title) {
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection

      setEvents((currentEvents) => [
        ...currentEvents,
        {
          id: uuidv4(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr
        }
      ])
    }
  }

  const handleEventReceive = (info) => {
    const newEvent = {
      ...info.event.toPlainObject(),
      id: String(uuidv4()) // Generate a new ID for the calendar event
    }

    // Add the new event to the calendar's events
    setEvents((currentEvents) => [...currentEvents, newEvent])

    if (typeof removeEventFromInbox === 'function') {
      // Remove the event from the inbox
      removeEventFromInbox(info.event.id)
    }
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
  setEvents: PropTypes.func.isRequired,
  removeEventFromInbox: PropTypes.func.isRequired
}

export default Calendar
