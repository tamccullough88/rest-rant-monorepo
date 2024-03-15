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
const db = require("../models");
const jwt = require('json-web-token');
const { User } = db;
function defineCurrentUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [method, token] = req.headers.authorization.split(' ');
            if (method == 'Bearer') {
                const result = yield jwt.decode(process.env.JWT_SECRET, token);
                const { id } = result.value;
                let user = yield User.findOne({
                    where: {
                        userId: id
                    }
                });
                req.currentUser = user;
            }
            next();
        }
        catch (err) {
            req.currentUser = null;
            next();
        }
    });
}
module.exports = defineCurrentUser;
