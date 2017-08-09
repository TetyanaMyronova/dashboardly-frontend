import React, {Component} from 'react';
<<<<<<< HEAD
=======
// import {Link} from 'react-router';
>>>>>>> cd7a0732cd8f296c4b43c4a75abd1ef0857bfadb
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
                <hr/>
                {auth.isLoggedIn() ? (+this.props.ownerId === +localStorage.id? <button type="click" onClick={this.editBookmark}>Edit</button> : null) : null}
            </div>

        );
    }

}
