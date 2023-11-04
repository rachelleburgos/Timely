import { useRef } from 'react' // Add useRef here
import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd'

function InboxItem({ item, index, onRemove, moveItem }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'todo',
    item: { id: item.id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const [, drop] = useDrop({
    accept: 'todo',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    }
  })

  const ref = useRef(null) // Now useRef is defined
  const dragDropRef = drag(drop(ref))

  return (
    <li ref={dragDropRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {item.title}
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  )
}

InboxItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  moveItem: PropTypes.func.isRequired
}

export default InboxItem
