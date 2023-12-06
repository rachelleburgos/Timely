/**
 * @file useDraggable.js
 * @brief Custom React hook to integrate FullCalendar's Draggable functionality.
 *
 * Enables drag-and-drop features for specified elements within a React component.
 * This hook initializes FullCalendar's Draggable for elements that match the provided
 * itemSelector within the ref's current DOM element. It also defines a default eventData
 * function to extract the necessary data from draggable elements, which can be overridden
 * by a custom function.
 *
 * @param {Object} ref React ref object pointing to the container element.
 * @param {Object} options Configuration options including itemSelector and eventData.
 * @returns None
 */

import { useEffect } from 'react'
import { Draggable } from '@fullcalendar/interaction'

export const useDraggable = (ref, { itemSelector = '.draggable-event', eventData }) => {
  useEffect(() => {
    let draggable

    if (ref.current) {
      const draggableOptions = {
        itemSelector,
        eventData:
          eventData ||
          function (eventEl) {
            return {
              title: eventEl.innerText,
              id: eventEl.getAttribute('data-id')
            }
          }
      }

      draggable = new Draggable(ref.current, draggableOptions)
    } else {
      console.error('useDraggable: ref.current is not defined.')
    }

    // Cleanup function to remove Draggable when the component unmounts
    return () => {
      if (draggable) {
        draggable.destroy()
      }
    }
  }, [ref, itemSelector, eventData]) // Dependencies: ref, itemSelector, eventData

  // Add any other logic or return values if needed
}
