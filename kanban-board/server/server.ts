import * as restify from "restify";
import {Card} from "./Card";
import NeDBDataStore = require("nedb");
import {CardModel} from "../app/KanbanBoard";

let db = new NeDBDataStore({ filename: 'kanbanDb.json', autoload: true});

let server = restify.createServer();
server.use(restify.CORS());
server.use(restify.bodyParser());

server.get('/cards', (req, res, next) => {

    db.find<Card>({}, (err, docs) => {
        if (err) {
            next(err);
        } else {
            res.send(docs);
            res.send(200);
            next();
        }
    });
});

server.post('/cards/:cardId/tasks', (req, res, next) => {
    let cardId: number = Number(req.params.cardId);
    let newTask = JSON.parse(req.body);

    db.findOne<Card>({id: cardId}, (err, doc) => {
        if (err) {
            next(err);
        } else {
            doc.tasks.push(newTask);
            db.update({id: cardId}, doc, {}, (err, numReplaced) => {
                if (err) {
                    next(err);
                } else {
                    res.send(newTask);
                    res.send(200);
                    next();
                }
            });
        }
    });
});

server.del('/cards/:cardId/tasks/:taskId', (req, res, next) => {
    let cardId: number = Number(req.params.cardId);
    let taskId: number = Number(req.params.taskId);

    db.findOne<Card>({id: cardId}, (err, doc) => {
        if (err) {
            next(err);
        } else {
            let taskIndex = doc.tasks.findIndex((task) => task.id === taskId);
            doc.tasks.splice(taskIndex, 1);
            db.update({id: cardId}, doc, {}, (err, numReplaced) => {
                if (err) {
                    next(err);
                } else {
                    res.send(200);
                    next();
                }
            });
        }
    });
});

server.put('/cards/:cardId/tasks/:taskId', (req, res, next) => {
    let cardId: number = Number(req.params.cardId);
    let taskId: number = Number(req.params.taskId);

    db.findOne<Card>({id: cardId}, (err, doc) => {
        if (err) {
            next(err);
        } else {
            let currentTask = doc.tasks.find((task) => task.id === taskId);
            currentTask.done = JSON.parse(req.body).done;
            db.update({id: cardId}, doc, {}, (err, numReplaced) => {
                if (err) {
                    next(err);
                } else {
                    res.send(200);
                    next();
                }
            });
        }
    });
});

server.put('/cards/:cardId', (req, res, next) => {
    let cardId: number = Number(req.params.cardId);
    let card: CardModel = JSON.parse(req.body);

    db.findOne<Card>({id: cardId}, (err, doc) => {
        if (err) {
            next(err);
        } else {
            db.update({id: cardId}, card, {}, (err, numReplaced) => {
                if (err) {
                    next(err);
                } else {
                    res.send(200);
                    next();
                }
            });
        }
    })
});

server.post('/cards', (req, res, next) => {
    let card: CardModel = JSON.parse(req.body);

    db.insert(card, (err, newDoc) => {
        if (err) {
            next(err);
        } else {
            res.send(newDoc);
            res.send(200);
            next();
        }
    });
});

server.listen(3000, () => {
    console.log(`${server.name} listening at ${server.url}`);
});