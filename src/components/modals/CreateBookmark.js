import React, {Component} from 'react';
import onClickOutside from 'react-onclickoutside';

import './CreateBookmark.css';
import  auth from '../../auth.js';

var limitOfDescriptionValue = 80;

class CreateBookmark extends Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
            callbackFromParent: '',
            boardId: 0

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
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            // navigated!
            // console.log('Check props' + this.props.location);
        }
    }

    _handleCreateBookmark = (e) => {
        e.preventDefault();
        console.log("BoardId=",this.props.boardId);
        if (this.refs.title.value.length > 0 && this.refs.url.value.length > 0) {
            auth.createBookmark(this.props.boardId, this.refs.title.value, this.refs.url.value, this.refs.description.value)
                .then(res => {
                    this.props.callbackFromParent(res);
                    if (this.state.error !== '') {
                        this.setState({error: ''});
                    }
                })
                .catch(err => this.setState(console.error));
        } else {
            this.setState({error: "Please enter a Title, URL, and Description"});
        }
    }


    render() {
        let {show} = this.props;
        return (
            <div className={`createBookmark ${show ? "show" : ""}`}>
                <h1>Create New Bookmark</h1>
                <h2 className="error">{this.state.error}</h2>
                <div>
                    <form className="createBookmarkForm" onSubmit={this._handleCreateBookmark}>
                        <input ref="title" placeholder="Title"/>
                        <input ref="url" placeholder="URL"/>
                        
                        <textarea
                            ref="description"
                            placeholder="Description"
                            onInput={this.handleDescriptionInput}
                            value={this.state.descriptionValue}
                        />
                        <div className="descriptionCounter">
                            <p style={{color: 'darkblue', textAlign: 'right'}}> {limitOfDescriptionValue - this.state.descriptionValue.length}/{this.state.descriptionValue.length}</p>
                        </div>
                        <div className="createBookmarkButton">
                            <button type="submit">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}


export default onClickOutside(CreateBookmark);