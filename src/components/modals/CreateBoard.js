import React, {Component} from 'react';
import onClickOutside from 'react-onclickoutside';

import './CreateBoard.css';
// import  api from '../../api.js';
import  auth from '../../auth.js';
var limitOfDescriptionValue = 80;

class CreateBoard extends Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
            callbackFromParent: '',
        }
        this.state = {
            error: '',
            descriptionValue: ''

        };
    }

    handleClickOutside = () => {
        this.props.closeCreateElement();
    }

    handleDescriptionInput = (event) => {
        if ((event.target.value !== this.state.descriptionValue) && (event.target.value.length <= limitOfDescriptionValue)) {
            this.setState({
                descriptionValue: event.target.value
            });
        }
    }

    _handleCreateBoard = (e) => {
        e.preventDefault();
        if (this.refs.title.value.length > 0 && this.refs.description.value.length <= limitOfDescriptionValue) {
            auth.createBoard(this.refs.title.value, this.state.descriptionValue)
            .then(res => {
                if (this.state.error !== '') {
                    this.setState({error: ''});
                };
                this.setState({
                    descriptionValue: ''
                })
                this.refs.title.value = '';
                //console.log(`From Createboard with res=${JSON.stringify(res)}`);
                this.props.callbackFromParent(res);

            })
            .catch(err => this.setState(console.error));
        } else {
            this.setState({error: "Please enter a title and description"});
        }
    }

    render() {
        let {show} = this.props;
        return (
            <div className={`createBoard ${show ? "show" : ""}`}>
                <h1>Create New Board</h1>
                <h2 className="error">{this.state.error}</h2>
                <div>
                    <form className="createBoardForm" onSubmit={this._handleCreateBoard}>
                        <input ref="title" placeholder="Title"/>
    
                        <textarea
                            ref="description"
                            placeholder="Description"
                            onInput={this.handleDescriptionInput}
                            value={this.state.descriptionValue}
                        />
                        <div className="descriptionCounter">
                            <p style={{
                                color: 'darkblue',
                                textAlign: 'right'
                            }}>
                                {limitOfDescriptionValue - this.state.descriptionValue.length}/{this.state.descriptionValue.length}
                            </p>
                        </div>
                        <div className="createBoardButton">
                            <button type="submit">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default onClickOutside(CreateBoard);