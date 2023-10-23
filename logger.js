const form = document.getElementById('login')
form.addEventListener('submit', login)

// 1. send data as JSON (common with JS)
// 2. send data as urlencoded
async function login(event) {
  //prevent the webpage from refreshing, a form's default event refreshes
  event.preventDefault()
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const result = await fetch('http://localhost:9999/api/login', {
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
    console.log('Got the token: ', result.data)
    localStorage.setItem('token', result.data)
    alert('Success')
    window.ipcRender.send('message:loginShow')
  } else {
    alert(result.error)
  }
}