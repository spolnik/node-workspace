import * as restify from "restify";


let cardsList = [
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
];

let server = restify.createServer();
server.use(restify.CORS());
server.use(restify.bodyParser());

server.get('/cards', (req, res, next) => {
    res.send(cardsList);
    res.send(204);
    next();
});

server.del('/cards/:cardId/tasks/:taskId', (req, res, next) => {
    let cardId: number = Number(req.params.cardId);
    let taskId: number = Number(req.params.taskId);

    let currentCard = cardsList.find((card) => card.id === cardId);

    let deletedTask = currentCard.tasks.splice(taskId, 1);
    res.send(deletedTask);
    res.send(204);
    next();
});

server.put('/cards/:cardId/tasks/:taskId', (req, res, next) => {
    let cardId: number = Number(req.params.cardId);
    let taskId: number = Number(req.params.taskId);

    let currentCard = cardsList.find((card) => card.id === cardId);
    let currentTask = currentCard.tasks.find((task) => task.id === taskId);

    currentTask.done = JSON.parse(req.body).done;
    res.send(currentTask.done);
    res.send(204);
    next();
});

server.listen(3000, () => {
    console.log(`${server.name} listening at ${server.url}`);
});