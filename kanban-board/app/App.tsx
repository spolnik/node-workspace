import * as React from 'react';
import {render} from 'react-dom';
import createBrowserHistory = require("history/lib/createBrowserHistory");
import KanbanBoardContainer from './components/KanbanBoardContainer';
import KanbanBoard from "./components/KanbanBoard";
import {Router, Route} from "react-router";
import NewCard from "./components/NewCard";
import EditCard from "./components/EditCard";

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
