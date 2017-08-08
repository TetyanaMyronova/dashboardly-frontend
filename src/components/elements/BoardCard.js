import React, {Component} from 'react';
import {Link} from 'react-router';
import './BoardCard.css';
// import EditBoard from '../modals/EditBoard';

export default class BoardCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    editBoard = (e) => {
        e.preventDefault();
        // console.log(`Editing boardId=${this.props.id}`);
        this.props.callbackEditBoard(this.props);
    }

    render() {
        let {title, description, id} = this.props
        return (
            <div className="board-card">
                <Link to={`/boards/${id}`}>
                    <div>
                        <h2>{ title }</h2>
                        <p>{ description }</p>
                        <hr/>
                    </div>
                </Link>
                <button type="click" onClick={this.editBoard}>Edit</button>
            </div>
        );
    }

}
