import React, {Component} from 'react';
import onClickOutside from 'react-onclickoutside';

import './EditBookmark.css';
var limitOfDescriptionValue = 80;

class EditBookmark extends Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
            callbackEditBookmark: '',
            show: false,
            bookmarkInfo: {
                id: 0,
                title: '',
                description: '',
                url: ''
            }
        };
        
        this.state = {
            error: '',
            id: this.props.bookmarkInfo.id,
            titleValue: this.props.bookmarkInfo.title,
            descriptionValue: this.props.bookmarkInfo.description,
            urlValue:  this.props.bookmarkInfo.url,
        };
    }

    handleClickOutside = () => {
        this.props.closeEditBookmark();
    }

    _handleEditBookmark = (e) => {
        e.preventDefault();
        //console.log(JSON.stringify(this.defaultProps));
        this.props.callbackEditBookmark({
            id: this.state.id,
            title: this.state.titleValue,
            description: this.state.descriptionValue,
            url: this.state.urlValue
        });

    }

    handleTitleInput = (event) => {
        if (event.target.value !== this.state.titleValue) {
            this.setState({
                titleValue: event.target.value
            });
        }
    }

    handleDescriptionInput = (event) => {
        if ((event.target.value !== this.state.descriptionValue) && (event.target.value.length <= limitOfDescriptionValue)) {
            this.setState({
                descriptionValue: event.target.value
            });
        }
    }

    handleUrlInput = (event) => {
        if (event.target.value !== this.state.urlValue) {
            this.setState({
                urlValue: event.target.value
            });
        }
    }

    componentDidUpdate(prevProps, prevState){
        //console.log(`EditBoardUpdated curProps ${JSON.stringify(this.props)}`);
        //console.log(`prevProps=${JSON.stringify(prevProps)}`);
        if (prevProps.bookmarkInfo.id !== this.props.bookmarkInfo.id) {
            this.setState({
                id: this.props.bookmarkInfo.id,
                titleValue: this.props.bookmarkInfo.title,
                descriptionValue: this.props.bookmarkInfo.description,
                urlValue: this.props.bookmarkInfo.url
            });
        }
    }

    render() {
        let {show} = this.props;
        return (
            <div className={`editBookmark ${show ? "show" : ""}`}>
                <h1>Edit Bookmark</h1>
                <h2 className="error">{this.state.error}</h2>
                <div>
                    <form className="editBookmarkForm" onSubmit={this._handleEditBookmark}>
                        <input ref="title" onInput={this.handleTitleInput} value={this.state.titleValue}/>
                        <input ref="url" onInput={this.handleUrlInput} value={this.state.urlValue}/>
                        
                        <textarea
                            ref="description"
                            onInput={this.handleDescriptionInput}
                            value={this.state.descriptionValue}
                        />
                        <div className="descriptionCounter">
                            <p style={{color: 'darkblue', textAlign: 'right'}}> {limitOfDescriptionValue - this.state.descriptionValue.length}/{this.state.descriptionValue.length}</p>
                        </div>
                        <div className="editBookmarkButton">
                            <button type="submit">Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default onClickOutside(EditBookmark);