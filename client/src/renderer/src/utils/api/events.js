const fetchEvents = async () => {
  const apiUrl = process.env.REACT_APP_API_URL
  if (!apiUrl) {
    console.error('REACT_APP_API_URL is not defined')
    return // Handle the error appropriately
  }

  const response = await fetch(`${apiUrl}/api/events`)
  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }
  return response.json()
}

export default fetchEvents
