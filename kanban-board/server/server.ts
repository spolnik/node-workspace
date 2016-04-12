import * as restify from "restify";
import {Card} from "./Card";
import NeDBDataStore = require("nedb");

let db = new NeDBDataStore({filename: 'kanbanDb.json', autoload: true});

let server = restify.createServer();
server.use(restify.CORS());
server.use(restify.bodyParser());

server.get('/cards', (req, res, next) => {

    db.find<Card>({}, (err, docs) => {
        next.ifError(err);
        res.send(200, docs);
        next();
    });
});

server.post('/cards/:cardId/tasks', (req, res, next) => {
    let cardId: number = Number(req.params.cardId);
    let newTask = JSON.parse(req.body);

    db.findOne<Card>({id: cardId}, (err, doc) => {
        next.ifError(err);
        doc.tasks.push(newTask);
        db.update({id: cardId}, doc, {}, (err) => {
            next.ifError(err);
            res.send(200, newTask);
            next();
        });
    });
});

server.del('/cards/:cardId/tasks/:taskId', (req, res, next) => {
    let cardId: number = Number(req.params.cardId);
    let taskId: number = Number(req.params.taskId);

    db.findOne<Card>({id: cardId}, (err, doc) => {
        next.ifError(err);

        let taskIndex = doc.tasks.findIndex((task) => task.id === taskId);
        doc.tasks.splice(taskIndex, 1);
        db.update({id: cardId}, doc, {}, (err, numReplaced) => {
            next.ifError(err);
            res.send(200, numReplaced);
            next();
        });
    });
});

server.put('/cards/:cardId/tasks/:taskId', (req, res, next) => {
    let cardId: number = Number(req.params.cardId);
    let taskId: number = Number(req.params.taskId);

    db.findOne<Card>({id: cardId}, (err, doc) => {
        next.ifError(err);
        let currentTask = doc.tasks.find((task) => task.id === taskId);
        currentTask.done = JSON.parse(req.body).done;
        db.update({id: cardId}, doc, {}, (err, numReplaced) => {
            next.ifError(err);
            res.send(200, numReplaced);
            next();
        });

    });
});

server.put('/cards/:cardId', (req, res, next) => {
    let cardId: number = Number(req.params.cardId);
    let card: Card = JSON.parse(req.body);

    db.findOne<Card>({id: cardId}, (err, doc) => {
        next.ifError(err);
        db.update({id: cardId}, card, {}, (err) => {
            next.ifError(err);
            res.send(200, card);
            next();
        });
    })
});

server.post('/cards', (req, res, next) => {
    let card: Card = JSON.parse(req.body);

    db.insert(card, (err, newDoc) => {
        next.ifError(err);
        res.send(200, newDoc);
        next();
    });
});

server.listen(3000, () => {
    console.log(`${server.name} listening at ${server.url}`);
});