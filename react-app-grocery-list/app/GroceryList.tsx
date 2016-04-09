import * as React from 'react';

export class GroceryList extends React.Component<{}, {}> {
    render() {
        return (
            <ul>
                <ListItem quantity="1" name="Bread" />
                <ListItem quantity="6" name="Eggs" />
                <ListItem quantity="2" name="Milk" />
            </ul>
        );
    }
}

interface ListItemProps {
    quantity: string;
    name: string;
}

class ListItem extends React.Component<ListItemProps, {}> {
    render() {
        return (
            <li>
                {this.props.quantity}x {this.props.name}
            </li>
        );
    }
}