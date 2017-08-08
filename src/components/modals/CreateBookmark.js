import React, {Component} from 'react';
import './CreateBookmark.css';
import  api from '../../api.js';
// import {browserHistory as history, Router} from 'react-router';

export default class CreateBookmark extends Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
            callbackFromParent: '',
            boardId: 0

        }
        this.state = {
            error: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            // navigated!
            // console.log('Check props' + this.props.location);
        }
    }

    _handleCreateBookmark = (e) => {
        e.preventDefault();
        console.log(this.props.boardId);
        if (this.refs.title.value.length > 0 && this.refs.description.value.length > 0 && this.refs.url.value.length > 0) {
            api.createBookmark(this.props.boardId, this.refs.title.value, this.refs.url.value, this.refs.description.value)
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
            <div className={`createBookmark ${show ? "show" : ""}`}>
                <h1>Create New Bookmark</h1>
                <form onSubmit={this._handleCreateBookmark}>
                    <p>Title: </p>
                    <input ref="title" placeholder="Bookmark title"/>
                    <hr/>
                    <p>Bookmark URL: </p>
                    <input ref="url" placeholder="Bookmark url"/>
                    <hr/>
                    <h2 className="error">{this.state.error}</h2>
                    <p>Description: </p>
                    <textarea ref="description" placeholder="Description of the bookmark"/>
                    <hr/>
                    <button type="submit">Create Bookmark</button>
                    <hr/>
                </form>
            </div>
        );
    }

}
