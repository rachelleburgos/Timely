import { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { startOfWeek, addDays } from 'date-fns'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

import EventForm from '../EventForm'
import WeekDayButtons from '../WeekDayButtons'
import NavigationButton from '../NavigationButton'
import { useDraggable } from '../../hooks/useDraggable' // Assuming useDraggable is in hooks folder

const Calendar = ({ events, setEvents }) => {
  const calendarRef = useRef(null)
  const externalEventsRef = useRef(null) // Ref for external draggable events
  useDraggable(externalEventsRef, {
    itemSelector: '.draggable-event',
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText,
        id: eventEl.getAttribute('data-id'),
        duration: eventEl.getAttribute('data-duration')
      }
    }
  })

  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 0 }))
  }, [])

  const handleEventReceive = (info) => {
    const duration = info.event.extendedProps.duration || '01:00' // Default duration
    const newEvent = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      duration: duration,
      allDay: info.event.allDay
    }
    setEvents((currentEvents) => [...currentEvents, newEvent])
  }

  const handleAddEvent = (eventDetails) => {
    setEvents([...events, { ...eventDetails, id: new Date().getTime() }])
  }

  const handleWeekDayClick = (dayOffset) => {
    const newDate = addDays(currentWeekStart, dayOffset)
    const calendarApi = calendarRef.current.getApi()
    calendarApi.gotoDate(newDate)
  }

  const handleNavigation = (direction) => {
    const calendarApi = calendarRef.current.getApi()
    direction === 'prev' ? calendarApi.prev() : calendarApi.next()
  }

  const handleSelect = (selectInfo) => {
    setSelectedDate(selectInfo.start)
    setIsModalOpen(true)
  }

  return (
    <div id="calendar-container">
      <div className="calendar-navigation">
        <NavigationButton handleClick={() => handleNavigation('prev')} icon={faCaretLeft} />
        <WeekDayButtons currentWeekStart={currentWeekStart} onDayClick={handleWeekDayClick} />
        <NavigationButton handleClick={() => handleNavigation('next')} icon={faCaretRight} />
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        editable
        selectable
        droppable
        events={events}
        eventReceive={handleEventReceive}
        datesSet={(dateInfo) =>
          setCurrentWeekStart(startOfWeek(dateInfo.start, { weekStartsOn: 0 }))
        }
        select={handleSelect}
        headerToolbar={{
          start: 'today',
          center: 'title',
          end: ''
        }}
      />
      <EventForm
        onAddEvent={handleAddEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultDate={selectedDate}
        isForInbox={false}
      />
      <div ref={externalEventsRef} id="external-events">
        {/* Your draggable events here */}
      </div>
    </div>
  )
}

Calendar.propTypes = {
  events: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired
}

export default Calendar
