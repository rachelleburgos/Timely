//  TODO:
//  - Add event details modal
//  - Add edit event modal
//  - Add delete event modal
//  - Drag and drop events
//  - Choose event times
//    - Beginning and end times, including all day events
//    - Drag from todo list to calendar
//    - Date picker
//    - Database integration
//    - Show one year's months at a time (popup, multi-month view)

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

  const addInboxItem = (title) => {
    const newId = Date.now().toString() // for simplicity, using timestamp as ID
    const newItem = { id: newId, title: title }
    setInboxItems((prevItems) => [...prevItems, newItem])
  }
  // Inside your App component
  return (
    <DndProvider backend={HTML5Backend}>
      {/* Make sure to pass the inboxItems state to InboxList */}
      <InboxList
        inboxItems={inboxItems}
        onRemoveFromInbox={removeFromInbox}
        onAddToInbox={addInboxItem}
      />

      <MyCalendar onRemoveFromInbox={removeFromInbox} />
    </DndProvider>
  )
}

export default App
