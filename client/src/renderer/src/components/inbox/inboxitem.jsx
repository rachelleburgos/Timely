import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import PropTypes from 'prop-types'

const ItemType = 'INBOX_ITEM'

const InboxItem = ({ item, index, moveItem, onRemove }) => {
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: ItemType,
    hover(draggedItem) {
      if (draggedItem.id !== item.id) {
        moveItem(draggedItem.index, index)
        draggedItem.index = index // Update the index for performance optimization
      }
    }
  })

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { ...item, index }, // Pass the current index for reordering
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  drag(drop(ref)) // Initialize both drag and drop on the ref

  return (
    <li ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {item.title}
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  )
}

InboxItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default InboxItem
