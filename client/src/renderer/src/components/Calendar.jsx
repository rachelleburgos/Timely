import { useEffect } from 'react'
import PropTypes from 'prop-types'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { v4 as uuidv4 } from 'uuid'
import { parseISO, add } from 'date-fns'

const Calendar = ({ events, setEvents, removeEventFromInbox }) => {
  useEffect(() => {
    let draggableEl = document.getElementById('external-events')
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.draggable-event',
        eventData: function (eventEl) {
          let title = eventEl.innerText
          let id = eventEl.getAttribute('data-id') // Assuming 'data-id' attribute on draggable events
          // Use the duration from the event element if it exists
          let duration = eventEl.getAttribute('data-duration') || '01:00'
          return {
            title: title,
            _id: id, // This should be the original ID from the inbox
            id: uuidv4(), // Generate a new unique ID for the calendar event
            duration: duration
          }
        }
      })
    }
  }, [])

  const handleSelect = (selectInfo) => {
    let title = prompt('Enter a title for this event:')
    let duration = prompt('Enter the duration for this event (HH:MM):', '02:00')
    if (title && duration) {
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection

      let start = parseISO(selectInfo.startStr)
      let durationParts = duration.split(':')
      let end = add(start, {
        hours: parseInt(durationParts[0], 10),
        minutes: parseInt(durationParts[1], 10)
      })

      setEvents((currentEvents) => [
        ...currentEvents,
        {
          id: uuidv4(),
          title,
          start: start.toISOString(),
          end: end.toISOString()
        }
      ])
    }
  }

  const handleEventReceive = (info) => {
    console.log('Event received:', info.event.toPlainObject())
    setEvents((currentEvents) => {
      const originalId = info.event.extendedProps._id // Access the original ID

      // If _id is null, log an error and do not add the event
      if (originalId == null) {
        console.error('Received an event without an original ID. This should not happen.')
        return currentEvents
      }

      // Check if the event is already in the calendar using the original ID
      if (currentEvents.some((event) => event._id === originalId)) {
        console.log(`Event with original ID ${originalId} is already in the calendar.`)
        return currentEvents
      }

      let start = parseISO(info.event.start.toISOString())
      let duration = info.event.extendedProps.duration || '01:00' // Provide a default duration of 1 hour
      let durationParts = duration.split(':')
      let end = add(start, {
        hours: parseInt(durationParts[0], 10),
        minutes: parseInt(durationParts[1], 10)
      })

      const newEvent = {
        ...info.event.toPlainObject(),
        id: uuidv4(), // Generate a new unique ID for the calendar event
        _id: originalId, // Preserve the original ID for duplicate checking
        end: end.toISOString()
      }
      console.log('New event to be added:', newEvent)
      const updatedEvents = [...currentEvents, newEvent]
      console.log('Updated events after adding the new one:', updatedEvents)

      // Call the function to remove the event from the inbox using the original ID
      removeEventFromInbox(originalId)

      return updatedEvents
    })
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
          start: 'today,prev',
          center: 'title',
          end: 'next'
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
