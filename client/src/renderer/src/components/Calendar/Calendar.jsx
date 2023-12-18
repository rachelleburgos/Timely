import { useRef, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { startOfWeek, addDays } from 'date-fns'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'

import EventForm from '../EventForm/EventForm'
import WeekDayButtons from './CalendarWeekNavigation'
import NavigationButton from './CalendarNavButton'
import { useDraggable } from '../../hooks/useDraggable'

const Calendar = () => {
  const calendarRef = useRef(null)
  const externalEventsRef = useRef(null)
  const dispatch = useDispatch()
  const events = useSelector((state) => state.events) // Assuming 'events' is the state slice name

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
    dispatch(addEvent(newEvent)) // Dispatching an action to add event
  }

  const handleAddEvent = (eventDetails) => {
    dispatch(addEvent({ ...eventDetails, id: new Date().getTime() })) // Dispatching an action to add event
  }

  const handleWeekDayClick = (dayOffset) => {
    if (calendarRef.current) {
      const newDate = addDays(currentWeekStart, dayOffset)
      const calendarApi = calendarRef.current.getApi()
      calendarApi.gotoDate(newDate)
    }
  }

  const handleNavigation = (direction) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi()
      direction === 'prev' ? calendarApi.prev() : calendarApi.next()
    }
  }

  const handleSelect = (selectInfo) => {
    setSelectedDate(selectInfo.start)
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
        plugins={[interactionPlugin, timeGridPlugin]}
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
    </div>
  )
}

export default Calendar
