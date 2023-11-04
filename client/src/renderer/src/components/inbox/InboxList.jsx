import { useState, useCallback, useEffect } from 'react'
import update from 'immutability-helper'
import PropTypes from 'prop-types'
import InboxItem from './InboxItem.jsx'

const InboxList = ({
  inboxItems,
  onRemoveFromInbox,
  onAddToInbox,
  onDropToCalendar // Added the onDropToCalendar prop
}) => {
  const [items, setItems] = useState(inboxItems)
  const [newItemTitle, setNewItemTitle] = useState('')
  const [newItemDuration, setNewItemDuration] = useState(0)

  const moveItem = useCallback((dragIndex, hoverIndex) => {
    setItems((prevItems) =>
      update(prevItems, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevItems[dragIndex]]
        ]
      })
    )
  }, [])

  useEffect(() => {
    // Log to see if any unexpected items are present
    console.log('inboxItems updated:', inboxItems)
    setItems(inboxItems)
  }, [inboxItems])

  const handleAddItem = (e) => {
    e.preventDefault()
    if (newItemTitle.trim() !== '') {
      onAddToInbox({ title: newItemTitle, duration: Number(newItemDuration) })
      setNewItemTitle('')
      setNewItemDuration(0) // Reset to default value
    }
  }

  return (
    <>
      <h1>Inbox</h1>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
          placeholder="Add new item..."
        />
        <input
          type="number"
          value={newItemDuration}
          onChange={(e) => setNewItemDuration(Number(e.target.value))}
          placeholder="Duration in minutes"
        />

        <button type="submit">Add</button>
      </form>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => {
            // Check if item is undefined and log error if it is
            if (!item || typeof item.id === 'undefined') {
              console.error('Invalid item:', item)
              // Optionally return null or a placeholder component to avoid crashing
              return null
            }
            return (
              <InboxItem
                key={item.id}
                item={item}
                index={index}
                moveItem={moveItem}
                onRemove={onRemoveFromInbox}
                onDropToCalendar={onDropToCalendar} // Passing the function to InboxItem
              />
            )
          })}
        </ul>
      ) : (
        <p>No items in the inbox.</p>
      )}
    </>
  )
}

InboxList.propTypes = {
  inboxItems: PropTypes.array.isRequired,
  onRemoveFromInbox: PropTypes.func.isRequired,
  onAddToInbox: PropTypes.func.isRequired,
  onDropToCalendar: PropTypes.func.isRequired // Add PropTypes for the new prop
}

export default InboxList
