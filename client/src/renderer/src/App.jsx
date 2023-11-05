import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import MyCalendar from './components/calendar/Calendar.jsx'
// import InboxList from './components/inbox/InboxList.jsx'

import './assets/App.css'

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <MyCalendar />
      </DndProvider>
    </div>
  )
}

export default App
