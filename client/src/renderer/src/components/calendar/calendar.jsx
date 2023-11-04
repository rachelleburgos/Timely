import { useState, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useDrop } from 'react-dnd'
import { v4 as uuid } from 'uuid'

import Modal from '../modal/modal'

const MyCalendar = () => {
  const [events, setEvents] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const calendarRef = useRef(null)

  const [, drop] = useDrop({
    accept: 'inbox',
    drop: (item) => {
      const calendarApi = calendarRef.current.getApi()
      const date = calendarApi.getDate() // You need to adjust this to get the correct drop date
      setEvents([
        ...events,
        {
          start: date,
          end: date,
          title: item.title,
          id: uuid()
        }
      ])
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  })

  const handleSelect = (info) => {
    setSelectedDate(info.startStr)
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
    handleCloseModal()
  }

  return (
    <div ref={drop}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        droppable={true}
        editable={true}
        selectable={true}
        select={handleSelect}
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
      />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitModal} />
    </div>
  )
}

export default MyCalendar
