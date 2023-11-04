import { useState, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useDrop } from 'react-dnd'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'

import Modal from '../modal/Modal'

const MyCalendar = ({ onRemoveFromInbox }) => {
  const [events, setEvents] = useState([])

  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const calendarRef = useRef(null)

  const [, drop] = useDrop(() => ({
    accept: 'INBOX_ITEM',

    drop: (item) => {
      // If a date has been clicked, use that date
      if (selectedDate) {
        const startDate = new Date(selectedDate)
        const endDate = new Date(startDate)
        endDate.setDate(startDate.getDate() + 1) // Set the end date to one day after the start date

        const newEvent = {
          title: item.title,
          start: startDate.toISOString().split('T')[0],
          end: endDate.toISOString().split('T')[0],
          id: uuid() // Generate a unique ID for the new event
        }

        // Add new event to the state
        setEvents((prevEvents) => [...prevEvents, newEvent])

        // Call the onRemoveFromInbox prop with the item id
        onRemoveFromInbox(item.id)

        // Clear the selected date after dropping
        setSelectedDate(null)
      }
      // Retrieve the calendar API
      const calendarApi = calendarRef.current.getApi()
      // You may need to implement logic to determine the correct drop date here
      // For now, we will just add the event to the date that is currently being viewed
      const view = calendarApi.view
      const newEvent = {
        title: item.title,
        start: view.activeStart,
        end: view.activeEnd,
        id: uuid() // Generate a unique ID for the new event
      }

      // Add new event to the state
      setEvents((prevEvents) => [...prevEvents, newEvent])

      // Call the onRemoveFromInbox prop with the item id
      onRemoveFromInbox(item.id)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const handleSelect = (info) => {
    setSelectedDate(info.startStr)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedDate(null)
    setModalOpen(false)
  }

  const handleSubmitModal = ({ eventName, startDate, startTime, endDate, endTime }) => {
    // Create a new event object  const newEvent = {    id: uuid(),    title: eventName,    start: new Date(`${startDate}T${startTime}`),    end: new Date(`${endDate}T${endTime}`),    // ... you can add more properties as needed  };    // Add the new event to the state  setEvents(prevEvents => [...prevEvents, newEvent]);    // Close the modal if needed  setModalOpen(false);};
    if (selectedDate) {
      setEvents((prevEvents) => [
        ...prevEvents,
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

  const handleEventReceive = (info) => {
    // `info` contains the event data and the date where it was dropped
    const { event } = info

    // You can now add the event to your state or perform other actions
    setEvents((prevEvents) => [...prevEvents, event])

    // Call the function to remove the item from the inbox, if necessary
    // For example, if the inbox item has the same ID as the event id
    onRemoveFromInbox(event.id)
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
        eventReceive={handleEventReceive}
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

MyCalendar.propTypes = {
  onRemoveFromInbox: PropTypes.func.isRequired
}

export default MyCalendar
