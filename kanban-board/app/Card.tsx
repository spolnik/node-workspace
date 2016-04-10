import * as React from "react";
import * as marked from "marked";
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {DragSource} from "react-dnd";
import {CheckList} from "./CheckList";
import {CardModel} from "./KanbanBoard";
import {KanbanBoardCardCallbacks, KanbanBoardTaskCallbacks} from "./interfaces";
import {CARD} from "./constants";

interface CardState {
    showDetails: boolean;
}

interface CardProps {
    card: CardModel;
    taskCallbacks: KanbanBoardTaskCallbacks;
    cardCallbacks: KanbanBoardCardCallbacks;
    connectDragSource: Function;
}

class Card extends React.Component<CardProps, CardState> {

    constructor(props: CardProps) {
        super(props);
        this.state = {
            showDetails: false
        };
    }

    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails});
    }

    render() {
        const { connectDragSource } = this.props;

        let cardDetails;

        if (this.state.showDetails) {
            cardDetails = <div className="card__details">
                <span dangerouslySetInnerHTML={{__html:marked(this.props.card.description)}}/>
                <CheckList cardId={this.props.card.id}
                           tasks={this.props.card.tasks}
                           taskCallbacks={this.props.taskCallbacks}
                />
            </div>;
        }

        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.card.color
        };

        const cardClassName = this.state.showDetails ? "card__title card__title--is-open" : "card__title";

        return connectDragSource(
            <div className="card">
                <div style={sideColor}></div>
                <div className={cardClassName} onClick={this.toggleDetails.bind(this)}>
                    {this.props.card.title}
                </div>
                <ReactCSSTransitionGroup transitionName="toggle"
                                         transitionEnterTimeout={250}
                                         transitionLeaveTimeout={250}>
                    {cardDetails}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

const cardDragSpec = {
    beginDrag(props: CardProps) {
        return {
            id: props.card.id
        };
    }
};

let collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    };
};

export default DragSource(CARD, cardDragSpec, collectDrag)(Card);