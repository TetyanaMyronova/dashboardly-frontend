import React, {Component} from 'react';
import './BookmarkCard.css';
import auth from '../../auth';

export default class BookmarkCard extends Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
            ownerId: 0
        }
        this.state = {};
    }

    editBookmark = (e) => {
        e.preventDefault();
        // console.log(`Editing boardId=${this.props.id}`);
        this.props.callbackEditBookmark(this.props);
    }

    render() {
        let {title, description, url} = this.props;
        //console.log('This is Bookmark Card' + JSON.stringify(this.props));
        return (
            <div className="bookmark-card">
                <a href={url}>
                    <div>
                        <h2>{ title }</h2>
                        <p>{ description }</p>
                    </div>
                    <img src={url} alt={title}/>
                </a>
                <div className="edit">
                    {auth.isLoggedIn() ? (+this.props.ownerId === +localStorage.id? <button type="click" onClick={this.editBookmark}>Edit</button> : null) : null}
                </div>
            </div>

        );
    }

}
