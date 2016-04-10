import * as React from "react";
import {KanbanBoard, CardModel} from "./KanbanBoard";
import "whatwg-fetch";

interface KanbanBoardState {
    cards: CardModel[]
}

const API_URL = 'http://localhost:3000';

export class KanbanBoardContainer extends React.Component<{}, KanbanBoardState> {

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

    render() {
        return <KanbanBoard cards={this.state.cards} />
    }
}