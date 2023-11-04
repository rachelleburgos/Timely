import { useState, useCallback, useEffect } from 'react'
import update from 'immutability-helper'
import PropTypes from 'prop-types'
import InboxItem from './InboxItem.jsx'

const InboxList = ({ inboxItems, onRemoveFromInbox, onAddToInbox }) => {
  const [items, setItems] = useState(inboxItems)
  const [newItemTitle, setNewItemTitle] = useState('')

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
    setItems(inboxItems)
  }, [inboxItems])

  const handleAddItem = (e) => {
    e.preventDefault()
    if (newItemTitle.trim() !== '') {
      onAddToInbox(newItemTitle)
      setNewItemTitle('')
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
        <button type="submit">Add</button>
      </form>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <InboxItem
              key={item.id}
              item={item}
              index={index}
              moveItem={moveItem}
              onRemove={onRemoveFromInbox}
            />
          ))}
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
  onAddToInbox: PropTypes.func.isRequired
}

export default InboxList
