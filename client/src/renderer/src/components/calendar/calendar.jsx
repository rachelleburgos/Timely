/**
 * TODO:
 *  - Add event details modal
 *  - Add edit event modal
 *  - Add delete event modal
 *  - Drag and drop events
 *  - Choose event times
 *    - Beginning and end times, including all day events
 *  - Drag from todo list to calendar
 *  - Date picker
 *  - Database integration
 *  - Show one year's months at a time (popup, multi-month view)
 */

import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import daygridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { v4 as uuid } from 'uuid'

import Modal from '../modal/modal'

const MyCalendar = () => {
  const [events, setEvents] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  const handleSelect = (info) => {
    setSelectedDate(info.start)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedDate(null)
    setModalOpen(false)
  }

  const handleSubmitModal = (eventName) => {
    if (selectedDate) {
      setEvents([
        ...events,
        {
          start: selectedDate,
          end: selectedDate,
          title: eventName,
          id: uuid()
        }
      ])
    }
    setModalOpen(false)
  }

  return (
    <div>
      <FullCalendar
        initialView="dayGridDay"
        views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
        events={events}
        // eventClick={function(){}} // TODO: Show modal to show event details, edit, or delete
        // eventAdd={function(){}} // TODO: Add event to database
        // eventChange={function(){}} // TODO: Update event in database
        // eventRemove={function(){}} // TODO: Remove event from database
        // eventDrop={function(){}} // TODO: Update event in database
        headerToolbar={{
          start: 'today prev next',
          center: 'title',
          end: 'dayGridMonth dayGridWeek dayGridDay'
        }}
        plugins={[daygridPlugin, interactionPlugin]}
        editable={true}
        selectable={true}
        select={handleSelect}
      />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitModal} />
    </div>
  )
}

export default MyCalendar
