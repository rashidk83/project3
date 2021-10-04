const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')

function isValidPassword(pass) {
    if (pass.length < 8) {
        return false
    }
        return true
}

router.post('/signup', (req, res) => {
    const { email, password, } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists with that usernam" })
            }
            if (!isValidPassword(password)) {
                return res.status(422).json({ error: "Invalid password, password must be 8 characters or greater" })
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password: hashedpassword,
                    })
                    user.save()
                        .then(user => {
                            res.json({ user: { user } })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
        })
        .catch(err => {
            console.log(err)
        })
})

// LOGIN authentication
router.post('/login', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "Please add Username or password" })
    }
    // find user by email entered
    User.findOne({ email: email })
        .then(savedUser => {
            // if no email
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Username or Password" })
            }
            // otherwise compare password
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    // successfull match
                    if (doMatch) {
                        res.json({ user: { savedUser } })
                    }
                    // does not match anything in database
                    else {
                        return res.status(422).json({ error: "Invalid Username or password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

module.exports = router