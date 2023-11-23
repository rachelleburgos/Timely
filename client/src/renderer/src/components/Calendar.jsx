import { useRef, useEffect, useState } from 'react'
import '../assets/styles/Calendar.css'
import PropTypes from 'prop-types'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { v4 as uuidv4 } from 'uuid'
import { parseISO, add, startOfWeek, addDays, format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import popUp from "./popUp.jsx"
import Glob from  "./Glob.jsx"

import EventModal from './EventModal.jsx'

const Calendar = ({ events, setEvents, removeEventFromInbox }) => {
  const calendarRef = useRef(null)
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    let draggableEl = document.getElementById('external-events')
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.draggable-event',
        eventData: function (eventEl) {
          let title = eventEl.innerText
          let id = eventEl.getAttribute('data-id')
          let duration = eventEl.getAttribute('data-duration') || '06:00'
          return {
            title: title,
            _id: id,
            id: uuidv4(),
            duration: duration
          }
        }
      })
    }
  }, [])

  const handleDatesSet = (dateInfo) => {
    setCurrentWeekStart(startOfWeek(dateInfo.start, { weekStartsOn: 0 }))
  }

  const handleWeekDayClick = (dayOffset) => {
    const newDate = addDays(currentWeekStart, dayOffset)
    const calendarApi = calendarRef.current.getApi()
    calendarApi.gotoDate(newDate)
  }

  const renderWeekDayButtons = () => {
    return Array.from({ length: 7 }, (_, index) => {
      const dayDate = addDays(currentWeekStart, index)
      const dayFormatted = format(dayDate, 'EEE');
      const dayNum=format(dayDate, "d");
      return (
        <div>
        <p className="dayname">{dayFormatted}</p>
        <button key={index} onClick={() => handleWeekDayClick(index)} className="day-button">
          {dayNum}
        </button>
        </div>
      )
    })
  }

  const handlePrev = () => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.prev()
  }

  const handleNext = () => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.next()
  }

  const handleSelect = (selectInfo) => {
    setSelectedDate(selectInfo.start)
    setIsModalOpen(true)
  }

  const handleEventReceive = (info) => {
    console.log('Event received:', info.event.toPlainObject())
    setEvents((currentEvents) => {
      const originalId = info.event.extendedProps._id

      if (originalId == null) {
        console.error('Received an event without an original ID. This should not happen.')
        return currentEvents
      }

      if (currentEvents.some((event) => event._id === originalId)) {
        console.log(`Event with original ID ${originalId} is already in the calendar.`)
        return currentEvents
      }

      let start = parseISO(info.event.start.toISOString())
      //problem
      let duration = Glob.userC.duration || '08:00'
      let durationParts = duration.split(':')
      let end = add(start, {
        hours: parseInt(durationParts[0], 10),
        minutes: parseInt(durationParts[1], 10)
      })

      const newEvent = {
        ...info.event.toPlainObject(),
        id: uuidv4(),
        _id: originalId,
        end: end.toISOString()
      }
      console.log('New event to be added:', newEvent)
      const updatedEvents = [...currentEvents, newEvent]
      console.log('Updated events after adding the new one:', updatedEvents)

      removeEventFromInbox(originalId)

      return updatedEvents
    })
  }

  const handleModalSubmit = (eventDetails) => {
    let { title, duration, date } = eventDetails
    let start = parseISO(date)
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
    setIsModalOpen(false)
  }

  return (
    <div id="calendar-container">
      <div className="calendar-navigation">
        <button onClick={handlePrev} className="calendar-nav-button" id="left-prev-button">
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        <div className="week-day-buttons">{renderWeekDayButtons()}</div>
        <button onClick={handleNext} className="calendar-nav-button" id="right-next-button">
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridDay"
        editable
        selectable
        droppable
        events={events}
        datesSet={handleDatesSet}
        select={handleSelect}
        eventContent={contents}
        eventReceive={handleEventReceive}
        headerToolbar={{
          start: 'today',
          center: 'title',
          end: ''
        }}
      />
      
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        defaultDate={selectedDate}
      />
    </div>
  )
}
function contents(eventInfo){
  return (
   <div>
  <p className="start-date">{eventInfo.event.start.getHours()}:{timeCorrection(eventInfo.event.start.getMinutes())}</p>
  <h1 className="title">{eventInfo.event.title}</h1>
  </div> 
  );
}
function timeCorrection(minutes){
  if(minutes=="0"){
    return "00";
  }
  return minutes;
}
Calendar.propTypes = {
  events: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired,
  removeEventFromInbox: PropTypes.func.isRequired
}

export default Calendar
