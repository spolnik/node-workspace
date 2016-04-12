import * as restify from "restify";
import {Card, Task} from "./Card";
import NeDBDataStore = require("nedb");
import CardRepository from "./CardRepository";
import {sendResponse, sendError} from "./utils";

let db = new NeDBDataStore({filename: 'kanbanDb.json', autoload: true});
let cardRepository = new CardRepository(db);

let server = restify.createServer();
server.use(restify.CORS());
server.use(restify.bodyParser());

server.get('/cards', (req, res, next) => {
    cardRepository
        .findAll()
        .then(sendResponse(res, next))
        .catch(sendError);
});

server.post('/cards/:cardId/tasks', (req, res, next) => {
    let cardId = Number(req.params.cardId);
    let newTask: Task = JSON.parse(req.body);

    cardRepository
        .addTask(cardId, newTask)
        .then(sendResponse(res,next))
        .catch(sendError);
});

server.del('/cards/:cardId/tasks/:taskId', (req, res, next) => {
    let cardId = Number(req.params.cardId);
    let taskId = Number(req.params.taskId);

    cardRepository
        .deleteTask(cardId, taskId)
        .then(sendResponse(res, next))
        .catch(sendError);
});

server.put('/cards/:cardId/tasks/:taskId', (req, res, next) => {
    let cardId = Number(req.params.cardId);
    let taskId = Number(req.params.taskId);
    let status = Boolean(JSON.parse(req.body).done);

    cardRepository
        .updateTaskStatus(cardId, taskId, status)
        .then(sendResponse(res, next))
        .catch(sendError);
});

server.put('/cards/:cardId', (req, res, next) => {
    let cardId: number = Number(req.params.cardId);
    let card: Card = JSON.parse(req.body);

    cardRepository
        .updateCard(cardId, card)
        .then(sendResponse(res, next))
        .catch(sendError);
});

server.post('/cards', (req, res, next) => {
    let card: Card = JSON.parse(req.body);

    cardRepository
        .addCard(card)
        .then(sendResponse(res, next))
        .catch(sendError);
});

server.listen(3000, () => {
    console.log(`${server.name} listening at ${server.url}`);
});