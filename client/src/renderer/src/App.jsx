
import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import MyCalendar from './components/calendar/Calendar.jsx'
import InboxList from './components/inbox/InboxList.jsx'

import './assets/App.css'

function App() {
  // State for tracking inbox items
  const [inboxItems, setInboxItems] = useState([])

  // Function to remove an item from the inbox
  const removeFromInbox = (id) => {
    setInboxItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Function to add a new item to the inbox
  const addInboxItem = (item) => {
    // For simplicity, using timestamp as ID, consider using a more robust ID system
    const newId = Date.now().toString() 
    const newItem = { id: newId, ...item }
    setInboxItems((prevItems) => [...prevItems, newItem])
  }

  // TODO: Implement the logic to handle the drop of an item onto the calendar
  // This should include validation and updating both the calendar and inbox state if necessary
  const onDropToCalendar = (item, date) => {
    // Implement the logic to add the item as an event to the calendar here
    // This may include defining an 'addEventToCalendar' function and calling it
  }

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <InboxList 
          inboxItems={inboxItems} 
          removeItem={removeFromInbox} 
          addItem={addInboxItem} 
        />
        <MyCalendar 
          onDropEvent={onDropToCalendar}
          // Pass any other necessary props
        />
      </DndProvider>
    </div>
  )
}

export default App
