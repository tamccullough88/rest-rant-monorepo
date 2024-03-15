import { Request, Response } from 'express';


const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req: { body: { [x: string]: any; password: any } }, res: { json: (arg0: any) => void }) => {
    let { password, ...rest } = req.body;
    const user = await User.create({
        ...rest,
        role: 'reviewer',
        passwordDigest: await bcrypt.hash(password, 10)
    })
    res.json(user)
})


router.get('/', async (req: any, res: { json: (arg0: any) => void }) => {
    const users = await User.findAll()
    res.json(users)
})

module.exports = router