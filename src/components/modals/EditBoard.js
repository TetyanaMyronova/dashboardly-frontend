import React, {Component} from 'react';
import onClickOutside from 'react-onclickoutside';

import './EditBoard.css';
var limitOfDescriptionValue = 80;

class EditBoard extends Component {
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

    handleClickOutside = () => {
        this.setState({
            id: 0,
            title: '',
            description: ''
        });
        this.props.closeEditBoard();
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
        if ((event.target.value !== this.state.descriptionValue) && (event.target.value.length <= limitOfDescriptionValue)) {
            this.setState({
                descriptionValue: event.target.value
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
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
                <h1>Edit Board</h1>
                <h2 className="error">{this.state.error}</h2>
                <div>
                    <form className="editBoardForm" onSubmit={this._handleEditBoard}>
                        <input ref="title" onInput={this.handleTitleInput} value={this.state.titleValue}/>
    
                        <textarea
                            ref="description"
                            onInput={this.handleDescriptionInput}
                            value={this.state.descriptionValue}
                        />
                        <div className="descriptionCounter">
                            <p style={{
                                color: 'darkblue',
                                textAlign: 'right'
                            }}> {limitOfDescriptionValue - this.state.descriptionValue.length}/{this.state.descriptionValue.length}</p>
                        </div>
                        <div className="editBoardButton">
                            <button type="submit">Edit Board</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }

}

export default onClickOutside(EditBoard);