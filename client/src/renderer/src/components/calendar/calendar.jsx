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
  const [selectedEvent, setSelectedEvent] = useState(null)
  const calendarRef = useRef(null)

  // Prepare the modal state for event details
  const initialEventDetails = {
    eventName: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: ''
  }
  const [eventDetails, setEventDetails] = useState(initialEventDetails)

  const [, drop] = useDrop(() => ({
    accept: 'INBOX_ITEM',

    drop: (item) => {
      // If a date has been clicked, use that date
      if (selectedEvent) {
        const startDate = new Date(selectedEvent.start)
        const endDate = new Date(startDate)

        // Use the item's duration to calculate the end date
        if (item.duration) {
          endDate.setMinutes(startDate.getMinutes() + item.duration)
        } else {
          endDate.setDate(startDate.getDate() + 1) // Set the end date to one day after the start date
        }

        const newEvent = {
          title: item.title,
          start: startDate.toISOString(),
          end: endDate.toISOString(),
          id: uuid() // Generate a unique ID for the new event
        }

        // Add new event to the state
        setEvents((prevEvents) => [...prevEvents, newEvent])

        // Call the onRemoveFromInbox prop with the item id
        onRemoveFromInbox(item.id)

        // Clear the selected event after dropping
        setSelectedEvent(null)
      }
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event)
    setModalOpen(true)
    // Populate the modal fields with the event's existing data
    setEventDetails({
      eventName: clickInfo.event.title,
      startDate: clickInfo.event.startStr.slice(0, 10), // YYYY-MM-DD
      startTime: clickInfo.event.startStr.slice(11, 16), // HH:MM
      endDate: clickInfo.event.endStr.slice(0, 10),
      endTime: clickInfo.event.endStr.slice(11, 16)
    })
  }

  const handleDateSelect = (selectInfo) => {
    setSelectedEvent({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      title: ''
    })
    setModalOpen(true)
    setEventDetails({
      ...initialEventDetails,
      startDate: selectInfo.startStr.slice(0, 10),
      endDate: selectInfo.endStr.slice(0, 10)
    })
  }

  const handleEventReceive = (info) => {
    // `info` contains the event data and the date where it was dropped
    const { event } = info

    // You can now add the event to your state or perform other actions
    setEvents((prevEvents) => [...prevEvents, event.toPlainObject()])

    // Call the function to remove the item from the inbox, if necessary
    // For example, if the inbox item has the same ID as the event id
    onRemoveFromInbox(event.id)
  }

  const handleSubmitModal = () => {
    if (selectedEvent) {
      const updatedEvent = {
        ...selectedEvent,
        title: eventDetails.eventName,
        start: new Date(`${eventDetails.startDate}T${eventDetails.startTime}`).toISOString(),
        end: new Date(`${eventDetails.endDate}T${eventDetails.endTime}`).toISOString()
      }

      if (selectedEvent.id) {
        // Update existing event
        setEvents((prevEvents) =>
          prevEvents.map((evt) => (evt.id === selectedEvent.id ? updatedEvent : evt))
        )
      } else {
        // Add new event
        setEvents((prevEvents) => [...prevEvents, { ...updatedEvent, id: uuid() }])
      }

      // Close the modal and reset the event details
      setModalOpen(false)
      setSelectedEvent(null)
      setEventDetails(initialEventDetails)
    }
  }

  return (
    <div className="calendar" ref={drop}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridDay"
        events={events}
        droppable={true}
        editable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventReceive={handleEventReceive}
        selectable={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
      />
      <Modal
        isOpen={isModalOpen}
        eventDetails={eventDetails}
        setEventDetails={setEventDetails}
        onClose={() => {
          setModalOpen(false)
          setSelectedEvent(null)
          setEventDetails(initialEventDetails)
        }}
        onSubmit={handleSubmitModal}
      />
    </div>
  )
}

MyCalendar.propTypes = {
  onRemoveFromInbox: PropTypes.func.isRequired
}

export default MyCalendar
