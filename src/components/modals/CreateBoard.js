import React, {Component} from 'react';
import onClickOutside from 'react-onclickoutside';

import './CreateBoard.css';
import  api from '../../api.js'

class CreateBoard extends Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
            callbackFromParent: '',
        }
        this.state = {
            error: '',
        };
    }
    
    handleClickOutside = () => {
        this.props.closeCreateElement();
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
                <form className="createBoardForm" onSubmit={this._handleCreateBoard}>
                    <p>Title: </p>
                    <input ref="title" placeholder="Board title"/>
                    <hr/>
                    <h2 className="error">{this.state.error}</h2>
                    <p>Description: </p>
                    <textarea ref="description" placeholder="Description of the board"/>
                    <div className="createBoardButton">
                        <button type="submit">Create Board</button>
                    </div>
                </form>
            </div>
        )
    }

}

export default onClickOutside(CreateBoard);