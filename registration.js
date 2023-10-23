const form = document.getElementById('reg-form')
form.addEventListener('submit', registerUser)

// 1. send data as JSON (common with JS)
// 2. send data as urlencoded
async function registerUser(event) {
  //prevent the webpage from refreshing, a form's default event refreshes
  event.preventDefault()
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const result = await fetch('http://localhost:9999/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  }).then((res) => res.json())

  if (result.status === 'ok'){
    // everything is good
    alert('Success')
  } else {
    alert(result.error)
  }
}