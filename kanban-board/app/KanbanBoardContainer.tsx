import * as React from "react";
import {KanbanBoard, CardModel} from "./KanbanBoard";
import "whatwg-fetch";
import update = require("react-addons-update");

interface KanbanBoardState {
    cards: CardModel[]
}

export interface KanbanBoardCallbacks {
    addTask: (cardId: number, taskName: string) => void;
    deleteTask: (cardId: number, taskId: number, taskIndex: number) => void;
    toggleTask: (cardId: number, taskId: number, taskIndex: number) => void;
}

const API_URL = 'http://localhost:3000';

export class KanbanBoardContainer extends React.Component<{}, KanbanBoardState> implements KanbanBoardCallbacks {

    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
    }

    componentDidMount() {
        fetch(API_URL + '/cards')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({cards: responseData})
            }).catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    }

    private findCardIndex(cardId: number) {
        return this.state.cards.findIndex((card) => card.id === cardId);
    }

    addTask(cardId: number, taskName: string) {
        let prevState = this.state;
        let cardIndex = this.findCardIndex(cardId);

        let newTask = {id:Date.now(), name: taskName, done: false};
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$push: [newTask] }
            }
        });

        this.setState({cards: nextState});

        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            body: JSON.stringify(newTask)
        }).then(
            (response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            }
        ).then(
            (responseData) => {
                newTask.id = responseData.id;
                this.setState({cards: nextState});
        }).catch((error) => {
            console.log(error);
            this.setState(prevState);
        });
    }

    deleteTask(cardId: number, taskId: number, taskIndex: number) {
        let cardIndex = this.findCardIndex(cardId);
        let prevState = this.state;

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: { $splice: [[taskIndex, 1]] }
            }
        });

        this.setState({cards: nextState});

        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete'
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Server response wasn't OK");
            }
        }).catch((error) => {
            console.log(error);
            this.setState(prevState);
        });
    }

    toggleTask(cardId: number, taskId: number, taskIndex: number) {
        let prevState = this.state;
        let cardIndex = this.findCardIndex(cardId);
        let newDoneValue = false;

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: { $apply: (done) => {
                            newDoneValue = !done;
                            return newDoneValue;
                        }}
                    }
                }
            }
        });

        this.setState({cards: nextState});

        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            body: JSON.stringify({done: newDoneValue})
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Server response wasn't OK");
            }
        }).catch((error) => {
            console.log(error);
            this.setState(prevState);
        });
    }

    render() {
        return <KanbanBoard cards={this.state.cards}
                            taskCallbacks = {{
                                toggleTask: this.toggleTask.bind(this),
                                deleteTask: this.deleteTask.bind(this),
                                addTask: this.addTask.bind(this)
                            }} />
    }
}