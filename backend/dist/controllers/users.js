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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const db = require("../models");
const bcrypt = require('bcrypt');
const { User } = db;
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _a = req.body, { password } = _a, rest = __rest(_a, ["password"]);
    const user = yield User.create(Object.assign(Object.assign({}, rest), { role: 'reviewer', passwordDigest: yield bcrypt.hash(password, 10) }));
    res.json(user);
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User.findAll();
    res.json(users);
}));
module.exports = router;
