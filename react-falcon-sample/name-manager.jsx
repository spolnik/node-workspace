'use strict';

let React = require('react'),
    ReactDom = require('react-dom'),
    NameAdder = require('./name-adder.jsx'),
    NameList = require('./names-list.jsx');

class NameManager extends React.Component {

    handleNameAdded() {
        this.refs.namesList.update();
    }

    render() {
        return <div>
            <NameAdder onAdded={this.handleNameAdded.bind(this)} />
            <NameList ref="namesList" />
        </div>;
    }
}

ReactDom.render(<NameManager />, document.querySelector('#demo'));