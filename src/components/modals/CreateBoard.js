import React, {Component} from 'react';
import './CreateBoard.css';
import  api from '../../api.js'

export default class CreateBoard extends Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
            callbackFromParent: '',
        }
        this.state = {
            error: '',
        };
    }

    _handleCreateBoard = (e) => {
        e.preventDefault();
        if (this.refs.title.value.length > 0 && this.refs.description.value.length > 0) {
        api.createBoard(this.refs.title.value, this.refs.description.value)
            .then(res => {
                this.props.callbackFromParent(res.body)
                if (this.state.error !== '') {
                    this.setState({error: ''})
                }
            })
            .catch(err => this.setState(console.error))
        } else {
            this.setState({error: "Please enter a title and description"})
        }
    }

    render() {
        let {show} = this.props;
        return (
            <div className={`createBoard ${show ? "show" : ""}`}>
                <h1>Create New Board</h1>
                <form onSubmit={this._handleCreateBoard}>
                    <p>Title: </p>
                    <input ref="title" placeholder="Board title"/>
                    <hr/>
                    <h2 className="error">{this.state.error}</h2>
                    <p>Description: </p>
                    <textarea ref="description" placeholder="Description of the board"/>
                    <hr/>
                    <button type="submit">Create Board</button>
                    <hr/>
                </form>
            </div>
        )
    }

}
