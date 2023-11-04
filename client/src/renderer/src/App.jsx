import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import MyCalendar from './components/calendar/Calendar.jsx'
import InboxList from './components/inbox/InboxList.jsx'

function App() {
  const [inboxItems, setInboxItems] = useState([])

  const removeFromInbox = (id) => {
    setInboxItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const addInboxItem = (item) => {
    const newId = Date.now().toString() // for simplicity, using timestamp as ID
    const newItem = { id: newId, ...item } // spread the item to include both title and duration
    setInboxItems((prevItems) => [...prevItems, newItem])
  }

  // Function to handle the drop of an item onto the calendar
  const onDropToCalendar = (item, date) => {
    // Define the logic to add the item as an event to the calendar here
    // You may need to define an 'addEventToCalendar' function and call it
    console.log('Dropped item on calendar:', item, 'on date:', date)
    // For now, just removing the item from the inbox
    removeFromInbox(item.id)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <InboxList
        inboxItems={inboxItems}
        onRemoveFromInbox={removeFromInbox}
        onAddToInbox={addInboxItem}
        onDropToCalendar={onDropToCalendar} // Pass the function here
      />

      <MyCalendar onRemoveFromInbox={removeFromInbox} />
    </DndProvider>
  )
}

export default App
