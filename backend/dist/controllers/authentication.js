"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const authrouter = require('express').Router();
const authDb = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('json-web-token');
const { User } = authDb;
authrouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User.findOne({
        where: { email: req.body.email }
    });
    if (!user || !(yield bcrypt.compare(req.body.password, user.passwordDigest))) {
        res.status(404).json({
            message: `Could not find a user with the provided username and password`
        });
    }
    else {
        const result = yield jwt.encode(process.env.JWT_SECRET, { id: user.userId });
        res.json({ user: user, token: result.value });
    }
}));
authrouter.get('/profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(req.currentUser);
}));
module.exports = authrouter;
