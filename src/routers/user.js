const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')
const multer = require('multer')
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account')
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
        // cb(new Error('File must be a PDF'))
        // cb(undefined,true)
        // cb(undefined,false)
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        console.log(user)
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user: user.getPublicProfile(), token })
    } catch (e) {
        res.status(400).send(e)
    }

})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }

})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        console.log(req)
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }

})
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.delete('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/:id/avatar', upload.single('avatar'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})
router.patch('/users/me', auth, async (req, res) => {
    const _id = req.user._id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid request' })
    }

    try {
        // const user = await User.findByIdAndUpdate(_id, req.body, {
        //     new: true,
        //     runValidators: true
        // })
        // const user = await User.findById(_id)
        updates.forEach((update) => {
            console.log(req.user[update])
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.status(201).send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        console.log(req.user)
        sendCancellationEmail(req.user.email, req.user.name)
        res.status(201).send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router