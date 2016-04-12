import {Card, Task} from "./Card";
import NeDBDataStore = require("nedb");

export default class CardRepository {

    constructor(public db: NeDBDataStore) {
    }

    findAll(): Promise<Card[]> {
        return new Promise<Card[]>((resolve, reject) => {

            this.db.find<Card>({}, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }

    addTask(cardId: number, newTask: Task): Promise<Task> {
        return new Promise<Task>((resolve, reject) => {

            this.db.findOne<Card>({id: cardId}, (err, doc) => {
                if (err) {
                    reject(err);
                }

                doc.tasks.push(newTask);
                this.updateTask(cardId, doc, newTask).then(resolve).catch(reject);
            });
        });
    }

    deleteTask(cardId: number, taskId: number): Promise<Task> {
        return new Promise<Task>((resolve, reject) => {
            this.db.findOne<Card>({id: cardId}, (err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    let taskIndex = doc.tasks.findIndex((task) => task.id === taskId);
                    let removedTask = doc.tasks.splice(taskIndex, 1);
                    this.updateTask(cardId, doc, removedTask[0]);
                }
            });
        });
    }

    updateTaskStatus(cardId: number, taskId: number, status: boolean): Promise<Task> {
        return new Promise<Task>((resolve, reject) => {
            this.db.findOne<Card>({id: cardId}, (err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    let currentTask = doc.tasks.find((task) => task.id === taskId);
                    currentTask.done = status;
                    this.updateTask(cardId, doc, currentTask);
                }
            });
        });
    }

    updateCard(cardId: number, card: Card): Promise<Card> {
        return new Promise<Card>((resolve, reject) => {
            this.db.update({id: cardId}, card, {}, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(card);
                }
            });
        });
    }

    addCard(card: Card): Promise<Card> {
        return new Promise<Card>((resolve, reject) => {
            this.db.insert(card, (err, newDoc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(newDoc);
                }
            });
        });
    }

    private updateTask(cardId: number, card: Card, task: Task): Promise<Task> {
        return new Promise<Task>((resolve, reject) => {
            this.db.update({id: cardId}, card, {}, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(task);
                }
            });
        });
    }
}
