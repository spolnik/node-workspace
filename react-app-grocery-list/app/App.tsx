import * as React from 'react';
import {render} from 'react-dom';
import {GroceryList} from './GroceryList';

class App extends React.Component<{},{}> {
    render() {
        return (
            <GroceryList />
        );
    }
}

render(<App />, document.getElementById('root'));
