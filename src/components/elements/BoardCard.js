import React, {Component} from 'react';
import {Link} from 'react-router';
import './BoardCard.css';
import auth from '../../auth';

export default class BoardCard extends Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
            ownerId: 0,
        }
        this.state = {};
    }

    editBoard = (e) => {
        e.preventDefault();
        // console.log(`Editing boardId=${this.props.id}`);
        console.log(`This is basic on EditBoard ${JSON.stringify(this.props)}`);
        this.props.callbackEditBoard(this.props);
    }

    deleteBoard = (e) => {
        e.preventDefault();
        console.log(`This is basic on DeleteBoard ${JSON.stringify(this.props)}`);
        this.props.callbackDeleteBoard(this.props.id);
    }

    render() {
        let {title, description, id} = this.props;
        return (
            <div className="board-card">
                <Link to={`/boards/${id}`}>
                    <div>
                        <h2>{ title }</h2>
                        <p>{ description }</p>
                    </div>
                </Link>
                <div className="edit">
                    {auth.isLoggedIn() ? (+this.props.ownerId === +localStorage.id? <button type="click" onClick={this.editBoard}>Edit</button> : null) : null}
                    {auth.isLoggedIn() ? (+this.props.ownerId === +localStorage.id? <button type="click" onClick={this.deleteBoard}>Delete</button> : null) : null}
                </div>
            </div>
        );
    }

}
