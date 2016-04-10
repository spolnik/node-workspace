import * as restify from "restify";
import {Card} from "./Card";
import NeDBDataStore = require("nedb");

let db = new NeDBDataStore();

let cardsList: Card[] = [
    {
        id: 1,
        title: "Read the Book",
        description: "I should read the **whole** book",
        color: '#BD8D31',
        status: "in-progress",
        tasks: []
    },
    {
        id: 2,
        title: "Write some code",
        description: "Code along with the samples in the book. The complete source can be found at [github](https://github.com/pro-react)",
        color: "#3A7E28",
        status: "todo",
        tasks: [
            {
                id: 1,
                name: "ContactList Example",
                done: true
            },
            {
                id: 2,
                name: "Kanban Example",
                done: false
            },
            {
                id: 3,
                name: "My own experiments",
                done: false
            }
        ]
    },
    {
        id: 919,
        title: "Add some refs",
        description: "Add some references about react tutorials to awesome list",
        color: "#e0fd00",
        status: "done",
        tasks: []
    }
];

db.insert(cardsList);

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

server.listen(3000, () => {
    console.log(`${server.name} listening at ${server.url}`);
});