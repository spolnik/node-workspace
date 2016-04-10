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

    addTask(cardId: number, taskName: string) {

    }

    deleteTask(cardId: number, taskId: number, taskIndex: number) {
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: { $splice: [[taskIndex, 1]] }
            }
        });

        this.setState({cards: nextState});

        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete'
        });
    }

    toggleTask(cardId: number, taskId: number, taskIndex: number) {
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

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