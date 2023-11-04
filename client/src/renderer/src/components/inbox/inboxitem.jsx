import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import PropTypes from 'prop-types'

const ItemType = 'INBOX_ITEM'

const InboxItem = ({ item, index, moveItem, onRemove, onDropToCalendar }) => {
  // Added onDropToCalendar prop
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
    item: { id: item.id, title: item.title, duration: item.duration }, // You can add more item properties if needed
    end: (draggedItem, monitor) => {
      const dropResult = monitor.getDropResult()
      if (draggedItem && dropResult) {
        // Call the onDropToCalendar function with the dragged item and drop result
        onDropToCalendar(draggedItem, dropResult)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  drag(drop(ref)) // Initialize both drag and drop on the ref

  return (
    <li ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {item.title} - {item.duration} mins
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  )
}

InboxItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onDropToCalendar: PropTypes.func.isRequired // Add PropTypes for the new prop
}

export default InboxItem
