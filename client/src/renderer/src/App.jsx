// import Versions from './components/Versions'
// import icons from './assets/icons.svg'

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

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import MyCalendar from './components/calendar/calendar.jsx'
import InboxList from './components/inbox/inbox.jsx'

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <InboxList />
        <MyCalendar />
      </DndProvider>
    </>
  )
}

export default App
