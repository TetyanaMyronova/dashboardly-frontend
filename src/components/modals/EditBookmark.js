import React, {Component} from 'react';
import './EditBoard.css';
// import  api from '../../api.js'

export default class EditBoard extends Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
            callbackEditBoard: '',
            show: false,
            boardInfo: {
                id: 0,
                title: '',
                description: ''
            }

        }
        this.state = {
            error: '',
            id: this.props.boardInfo.id,
            titleValue: this.props.boardInfo.title,
            descriptionValue: this.props.boardInfo.description
        };
    }

    _handleEditBoard = (e) => {
        e.preventDefault();
        this.props.callbackEditBoard({
            id: this.state.id,
            title: this.state.titleValue,
            description: this.state.descriptionValue
        });

    }

    handleTitleInput = (event) => {
        if (event.target.value !== this.state.titleValue) {
            this.setState({
                titleValue: event.target.value
            })
        }
    }

    handleDescriptionInput = (event) => {
        if (event.target.value !== this.state.descriptionValue) {
            this.setState({
                descriptionValue: event.target.value
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        //console.log(`EditBoardUpdated curProps ${JSON.stringify(this.props)}`);
        //console.log(`prevProps=${JSON.stringify(prevProps)}`);
        if (prevProps.boardInfo.id !== this.props.boardInfo.id) {
            this.setState({
                id: this.props.boardInfo.id,
                titleValue: this.props.boardInfo.title,
                descriptionValue: this.props.boardInfo.description
            })
        }
    }

    render() {
        let {show} = this.props;
        return (
            <div className={`editBoard ${show ? "show" : ""}`}>
                <h1>Edit New Board</h1>
                <form onSubmit={this._handleEditBoard}>
                    <p>Title: </p>
                    <input ref="title" onInput={this.handleTitleInput} value={this.state.titleValue}/>
                    <hr/>
                    <h2 className="error">{this.state.error}</h2>
                    <p>Description: </p>
                    <textarea ref="description" onInput={this.handleDescriptionInput} value={this.state.descriptionValue}/>
                    <hr/>
                    <button type="submit">Edit Board</button>
                    <hr/>
                </form>
            </div>
        )
    }

}
