import { Request, Response } from 'express';

const authrouter = require('express').Router()
const authDb = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')

const { User }: any = authDb



authrouter.post('/', async (req: Request, res: Response) => {

    let user: any = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({
            message: `Could not find a user with the provided username and password`
        })
    } else {
        const result = await jwt.encode(process.env.JWT_SECRET, { id: user.userId })
        res.json({ user: user, token: result.value })
    }
})


authrouter.get('/profile', async (req: { currentUser: any; }, res: { json: (arg0: any) => void; }) => {
    res.json(req.currentUser)
})




module.exports = authrouter