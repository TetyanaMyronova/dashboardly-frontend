import React, {Component} from 'react';
import './CreateBoard.css';
import  Api from '../../api.js'

export default class CreateBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _handleCreateBoard = (e) => {
        e.preventDefault();
        // console.log(this.refs.title.value,  this.refs.description.value)
        Api.createBoard()
    }

    render() {
        let {show} = this.props;
        return (
            <div className={`createBoard ${show ? "show" : ""}`}>
                <h1>Create New Board</h1>
                <form onSubmit={this._handleCreateBoard}>
                    <input ref="title"/>
                    <hr/>
                    <textarea ref="description"/>
                    <hr/>
                    <button type="submit">Create Board</button>
                    <hr/>
                </form>
            </div>
        )
    }

}
