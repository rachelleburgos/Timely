const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Connect to the database
mongoose.connect('mongodb://127.0.0.1/login-app-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

// Client -> Server: Your client must authenticate who it is
// WHY? Server is central computer you control 
// Client (john) -> a computer you do not control

// 1. Client proves itself on request (JWT)
//      -The data/secret is not changable
// 2. Client-Server share a secret (COOKIE)

// THIS TOKEN MUST BE KEPT AS SECRET!!!
// DO NOT LEAK AND HIDE IT LATER!!!

JWT_SECRET = 'ijhfhjkahfo9wa@!*#9LN*@LHlnLDFHo!@*)(*njnlIJHIWnflj'

// Change user password
app.post('/api/change-password', async (req, res) => {
    const { token, newpassword: plainTextPassword } = req.body
    
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid paessword' })
    }

    if (plainTextPassword.length < 5) {
        return res.json({ 
            status: 'error', 
            error: 'Password too small, it should be at least 6 characters'
        })
    }

    try {
        const user = jwt.verify(token, JWT_SECRET)
        
        const _id = user.id

        const password = await bcrypt.hash(plainTextPassword, 5)

        await User.updateOne(
            { _id },
            {
                $set: { password }
            }
        )
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: ';))' })
    }
})

// Login for existing users
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).lean()

    if(!user) {
        return res.json({ status: 'error', error: 'Invalid username/password'})
    }

    if(await bcrypt.compare(password, user.password)) {
        // the username, password combo success
        const token = jwt.sign({ 
            id: user._id, 
            email: user.email 
            }, 
            JWT_SECRET
        )
        return res.json({ status: 'ok', data: token })
    }
    
    res.json({ status: 'error', error: 'Invalid username/password' })
})

// This is to create a user account, no duplicates
app.post('/api/register', async (req, res) => {
    const { email, password: plainTextPassword } = req.body

    if (!email || typeof email !== 'string') {
        return res.json({ status: 'error', error: 'Invalid email' })
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if (plainTextPassword.length < 5) {
        return res.json({ 
            status: 'error', 
            error: 'Password too small, it should be at least 6 characters'
        })
    }
    
    const password = await bcrypt.hash(plainTextPassword, 5)

    try {
        const response = await User.create({
            email,
            password
        })
        console.log('User successfully created: ', response)
    } catch(error) {
        if(error.code === 11000){
            // dup key
            return res.json({ status: 'error', error: 'Email already in use' })
        }
        throw error
    }
    // console.log(await bcrypt.hash(password, 10))
    // hash the passwords, we will use bcrypt
    // 1. The collision shouldn't happen
    // 2. algorithm should be slow to prepare data leaks. if the 
    //    algorithm is slow then it is harder to bruteforce
    res.json({ status: 'ok' })
})

app.listen(9999, () => {
    console.log('Server up at 9999')
})