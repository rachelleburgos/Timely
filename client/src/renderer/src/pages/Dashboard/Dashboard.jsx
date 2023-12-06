// import { useState, useEffect, useCallback } from 'react'

import Calendar from '../../components/Calendar/Calendar'
import InboxList from '../../components/Inbox/InboxList'

function Dashboard() {
  return (
    <div>
      <Calendar />
      <InboxList />
    </div>
  )
}

export default Dashboard
