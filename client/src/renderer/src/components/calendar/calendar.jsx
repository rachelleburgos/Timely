import { useState, useCallback } from 'react'
import FullCalendar from '@fullcalendar/react'
import daygridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { v4 as uuid } from 'uuid'

import Modal from '../modal/modal'

const MyCalendar = () => {
  const [events, setEvents] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  const handleSelect = useCallback((info) => {
    setSelectedDate(info.start)
    setModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedDate(null)
    setModalOpen(false)
  }, [])

  const createEvent = (eventName) => ({
    start: selectedDate,
    end: selectedDate,
    title: eventName,
    id: uuid()
  })

  const handleSubmitModal = useCallback(
    (eventName) => {
      if (selectedDate) {
        setEvents((prevEvents) => [...prevEvents, createEvent(eventName)])
      }
      setModalOpen(false)
    },
    [selectedDate]
  )

  return (
    <div>
      <FullCalendar
        editable
        selectable
        events={events}
        select={handleSelect}
        headerToolbar={{
          start: 'today prev next',
          middle: 'month',
          end: 'dayGridMonth dayGridWeek dayGridDay'
        }}
        plugins={[daygridPlugin, interactionPlugin]}
        views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
        initialView="dayGridDay"
      />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitModal} />
    </div>
  )
}

export default MyCalendar
