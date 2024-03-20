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
const router = require('express').Router();
const { Place, Comment, User } = require("../models");
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
        return res.status(403).json({ message: 'You are not allowed to add a place' });
    }
    if (!req.body.pic) {
        req.body.pic = 'http://placekitten.com/400/400';
    }
    if (!req.body.city) {
        req.body.city = 'Anytown';
    }
    if (!req.body.state) {
        req.body.state = 'USA';
    }
    const place = yield Place.create(req.body);
    res.json(place);
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const places = yield Place.findAll();
    res.json(places);
}));
router.get('/:placeId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let placeId = Number(req.params.placeId);
    if (isNaN(placeId)) {
        res.status(404).json({ message: `Invalid id "${placeId}"` });
    }
    else {
        const place = yield Place.findOne({
            where: { placeId: placeId },
            include: {
                association: 'comments',
                include: 'author'
            }
        });
        if (!place) {
            res.status(404).json({ message: `Could not find place with id "${placeId}"` });
        }
        else {
            res.json(place);
        }
    }
}));
router.put('/:placeId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (((_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.role) !== 'admin') {
        return res.status(403).json({ message: 'You are not allowed to edit places' });
    }
    let placeId = Number(req.params.placeId);
    if (isNaN(placeId)) {
        res.status(404).json({ message: `Invalid id "${placeId}"` });
    }
    else {
        const place = yield Place.findOne({
            where: { placeId: placeId },
        });
        if (!place) {
            res.status(404).json({ message: `Could not find place with id "${placeId}"` });
        }
        else {
            Object.assign(place, req.body);
            yield place.save();
            res.json(place);
        }
    }
}));
router.delete('/:placeId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    if (((_c = req.currentUser) === null || _c === void 0 ? void 0 : _c.role) !== 'admin') {
        return res.status(403).json({ message: 'You are not allowed to delete places' });
    }
    let placeId = Number(req.params.placeId);
    if (isNaN(placeId)) {
        res.status(404).json({ message: `Invalid id "${placeId}"` });
    }
    else {
        const place = yield Place.findOne({
            where: {
                placeId: placeId
            }
        });
        if (!place) {
            res.status(404).json({ message: `Could not find place with id "${placeId}"` });
        }
        else {
            yield place.destroy();
            res.json(place);
        }
    }
}));
router.post('/:placeId/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const placeId = Number(req.params.placeId);
    req.body.rant = req.body.rant ? true : false;
    const place = yield Place.findOne({
        where: { placeId: placeId }
    });
    if (!place) {
        res.status(404).json({ message: `Could not find place with id "${placeId}"` });
    }
    if (!req.currentUser) {
        return res.status(404).json({ message: `You must be logged in to leave a rant or rave.` });
    }
    const comment = yield Comment.create(Object.assign(Object.assign({}, req.body), { authorId: req.currentUser.userId, placeId: placeId }));
    res.send(Object.assign(Object.assign({}, comment.toJSON()), { author: req.currentUser }));
}));
router.delete('/:placeId/comments/:commentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    let placeId = Number(req.params.placeId);
    let commentId = Number(req.params.commentId);
    if (isNaN(placeId)) {
        res.status(404).json({ message: `Invalid id "${placeId}"` });
    }
    else if (isNaN(commentId)) {
        res.status(404).json({ message: `Invalid id "${commentId}"` });
    }
    else {
        const comment = yield Comment.findOne({
            where: { commentId: commentId, placeId: placeId }
        });
        if (!comment) {
            res.status(404).json({ message: `Could not find comment with id "${commentId}" for place with id "${placeId}"` });
        }
        else if (comment.authorId !== ((_d = req.currentUser) === null || _d === void 0 ? void 0 : _d.userId)) {
            res.status(403).json({ message: `You do not have permission to delete comment "${comment.commentId}"` });
        }
        else {
            yield comment.destroy();
            res.json(comment);
        }
    }
}));
module.exports = router;
