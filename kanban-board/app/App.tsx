import * as React from 'react';
import {render} from 'react-dom';
import createBrowserHistory = require("history/lib/createBrowserHistory");
import KanbanBoardContainer from './KanbanBoardContainer';
import KanbanBoard from "./KanbanBoard";
import {Router, Route} from "react-router";
import NewCard from "./NewCard";
import EditCard from "./EditCard";

render((
    <Router history={createBrowserHistory()}>
        <Route component={KanbanBoardContainer}>
            <Route path="/" component={KanbanBoard}>
                <Route path="new" component={NewCard} />
                <Route path="edit/:card_id" component={EditCard} />
            </Route>
        </Route>
    </Router>
), document.getElementById('root'));
