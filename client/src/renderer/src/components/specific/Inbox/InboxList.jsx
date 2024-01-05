import PropTypes from 'prop-types'

import InboxItem from './components/InboxItem/InboxItem'

const InboxList = ({ events, setEvents }) => {
  return (
    <div id="inbox-list">
      <h2>Inbox</h2>
    </div>
  )
}

InboxList.propTypes = {
  events: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired
}

export default InboxList
