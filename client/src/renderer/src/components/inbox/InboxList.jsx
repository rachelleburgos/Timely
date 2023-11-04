import { useState } from 'react'
import PropTypes from 'prop-types'

import InboxItem from './InboxItem.jsx'

function InboxList({ inboxItems = [], onDragStart }) {
  const [newInboxItem, setNewInboxItem] = useState('')
  const [inboxList, setInboxList] = useState(inboxItems)

  function handleAddInboxItem() {
    if (newInboxItem.trim() !== '') {
      setInboxList([...inboxList, { title: newInboxItem }])
      setNewInboxItem('')
    }
  }

  function handleRemoveInboxItem(index) {
    const newInboxList = [...inboxList]
    newInboxList.splice(index, 1)
    setInboxList(newInboxList)
  }

  // Define moveItem function here
  function moveItem(dragIndex, hoverIndex) {
    const dragItem = inboxList[dragIndex]
    const hoverItem = inboxList[hoverIndex]
    // Swap the items in the array
    let updatedInboxList = [...inboxList]
    updatedInboxList[dragIndex] = hoverItem
    updatedInboxList[hoverIndex] = dragItem

    setInboxList(updatedInboxList)
  }

  return (
    <div>
      <h2>Inbox</h2>
      <div>
        <input type="text" value={newInboxItem} onChange={(e) => setNewInboxItem(e.target.value)} />
        <button onClick={handleAddInboxItem}>Add Item</button>
      </div>
      {inboxList.length === 0 ? (
        <p>No items to display</p>
      ) : (
        <ul>
          {inboxList.map((item, index) => (
            <InboxItem
              key={index}
              item={item}
              index={index} // Pass the index prop to InboxItem
              onRemove={() => handleRemoveInboxItem(index)}
              onDragStart={onDragStart}
              moveItem={moveItem} // Pass the moveItem function to InboxItem
            />
          ))}
        </ul>
      )}
    </div>
  )
}

InboxList.propTypes = {
  inboxItems: PropTypes.array,
  onDragStart: PropTypes.func.isRequired
}

export default InboxList
