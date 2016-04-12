"use strict";
const React = require("react");
require("whatwg-fetch");
const update = require("react-addons-update");
const constants_1 = require("./../constants");
const utils_1 = require("./../utils");
class KanbanBoardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
        this.updateCardStatus = utils_1.throttle(this.updateCardStatus.bind(this), null);
        this.updateCardPosition = utils_1.throttle(this.updateCardPosition.bind(this), 500);
    }
    componentDidMount() {
        fetch(constants_1.API_URL + '/cards')
            .then((response) => response.json())
            .then((responseData) => {
            this.setState({ cards: responseData });
        }).catch((error) => {
            console.log('Error fetching and parsing data', error);
        });
    }
    findCardIndex(cardId) {
        return this.state.cards.findIndex((card) => card.id === cardId);
    }
    addTask(cardId, taskName) {
        let prevState = this.state;
        let cardIndex = this.findCardIndex(cardId);
        let newTask = { id: Date.now(), name: taskName, done: false };
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: { $push: [newTask] }
            }
        });
        this.setState({ cards: nextState });
        fetch(`${constants_1.API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            body: JSON.stringify(newTask)
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error("Server response wasn't OK");
            }
        }).then((responseData) => {
            newTask.id = responseData.id;
            this.setState({ cards: nextState });
        }).catch((error) => {
            console.log(error);
            this.setState(prevState);
        });
    }
    deleteTask(cardId, taskId, taskIndex) {
        let cardIndex = this.findCardIndex(cardId);
        let prevState = this.state;
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: { $splice: [[taskIndex, 1]] }
            }
        });
        this.setState({ cards: nextState });
        fetch(`${constants_1.API_URL}/cards/${cardId}/tasks/${taskId}`, {
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
    toggleTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        let cardIndex = this.findCardIndex(cardId);
        let newDoneValue = false;
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {
                            $apply: (done) => {
                                newDoneValue = !done;
                                return newDoneValue;
                            }
                        }
                    }
                }
            }
        });
        this.setState({ cards: nextState });
        fetch(`${constants_1.API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            body: JSON.stringify({ done: newDoneValue })
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Server response wasn't OK");
            }
        }).catch((error) => {
            console.log(error);
            this.setState(prevState);
        });
    }
    addCard(card) {
        let prevState = this.state;
        if (!card.id) {
            card = Object.assign({}, card, { id: Date.now() });
        }
        let nextState = update(this.state.cards, { $push: [card] });
        this.setState({ cards: nextState });
        fetch(`${constants_1.API_URL}/cards`, {
            method: 'post',
            body: JSON.stringify(card)
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error("Server response wasn't OK");
            }
        }).then((responseData) => {
            card.id = responseData.id;
            this.setState({ cards: nextState });
        }).catch((error) => {
            console.log(error);
            this.setState(prevState);
        });
    }
    updateCard(card) {
        let prevState = this.state;
        let cardIndex = this.findCardIndex(card.id);
        let nextState = update(this.state.cards, { [cardIndex]: { $set: card } });
        this.setState({ cards: nextState });
        fetch(`${constants_1.API_URL}/cards/${card.id}`, {
            method: "put",
            body: JSON.stringify(card)
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Server response wasn’t OK");
            }
        }).catch((error) => {
            console.error("Fetch error:", error);
            this.setState(prevState);
        });
    }
    updateCardStatus(cardId, listId) {
        let cardIndex = this.findCardIndex(cardId);
        let card = this.state.cards[cardIndex];
        if (card.status !== listId) {
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: { $set: listId }
                    }
                }
            }));
        }
    }
    updateCardPosition(cardId, afterId) {
        if (cardId === afterId)
            return;
        let cardIndex = this.findCardIndex(cardId);
        let card = this.state.cards[cardIndex];
        let afterIndex = this.findCardIndex(afterId);
        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [cardIndex, 1],
                    [afterIndex, 0, card]
                ]
            }
        }));
    }
    persistCardDrag(cardId, status) {
        let cardIndex = this.findCardIndex(cardId);
        let card = this.state.cards[cardIndex];
        fetch(`${constants_1.API_URL}/cards/${cardId}`, {
            method: 'put',
            body: JSON.stringify(card)
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Server response wasn't OK");
            }
        }).catch((error) => {
            console.error("Fetch error: ", error);
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: { $set: status }
                    }
                }
            }));
        });
    }
    render() {
        return this.props.children && React.cloneElement(this.props.children, {
            cards: this.state.cards,
            taskCallbacks: {
                addTask: this.addTask.bind(this),
                deleteTask: this.deleteTask.bind(this),
                toggleTask: this.toggleTask.bind(this)
            },
            cardCallbacks: {
                updateStatus: this.updateCardStatus.bind(this),
                updatePosition: utils_1.throttle(this.updateCardPosition.bind(this), 500),
                persistCardDrag: this.persistCardDrag.bind(this),
                addCard: this.addCard.bind(this),
                updateCard: this.updateCard.bind(this)
            }
        });
    }
    ;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = KanbanBoardContainer;
//# sourceMappingURL=KanbanBoardContainer.js.map