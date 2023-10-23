const form = document.getElementById('reset')
form.addEventListener('submit', login)

// 1. send data as JSON (common with JS)
// 2. send data as urlencoded
async function login(event) {
  //prevent the webpage from refreshing, a form's default event refreshes
  event.preventDefault()
  const password = document.getElementById('password').value

  const result = await fetch('http://localhost:9999/api/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      newpassword: password,
      // local storage for token is usually frowned upon but if you are
      // doing everything correctly then bad actors shouldn't be able to 
      // scope into certain data.

      // XSS -> CSP .., santizing the user input, ...

      token: localStorage.getItem('token')
    })
  }).then((res) => res.json())

  if (result.status === 'ok'){
    // everything is good
    alert('Success')
  } else {
    alert(result.error)
  }
}