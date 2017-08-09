import React, {Component} from 'react';
import api from '../../api';
//import BookmarkCard from '../elements/BookmarkCard';
import auth from '../../auth';
import AddButton from '../elements/AddButton';
import './Board.css';
import EditBookmark from '../modals/EditBookmark';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            bookmarks: [],
            updatedAt: "",
            ownerId: 0,
            editBookmarkInfo: {
                id: 0,
                title: "",
                description: "",
                url: ""
            },
            isEditBookmarkOpen: false
        };
    }
  
  componentDidMount() {
    this.fetchBoardData()
  }

    fetchBoardData = () => {
        //console.log(`Params of board  ${this.props.params.id}`)
        Promise.all([
            api.getBoard(this.props.params.id),
            api.getBookmarks(this.props.params.id)

        ])
            .then(res => {
                this.setState({
                    title: res[0].body.title,
                    description: res[0].body.description,
                    bookmarks: res[1].body.bookmarks,
                    ownerId: res[0].body.ownerId
                })
            })
            .catch(console.error)
    }

  newBookmark = (newBookmarkInfo) => {
      let newBookmarkList = this.state.bookmarks;
      newBookmarkList.push(newBookmarkInfo);
      this.setState({
          bookmarks: newBookmarkList
      })
  }

    summonEditBookmark = (bookmarkInfo) => {
        //This is the function for the [Edit] button on the board
        //console.log(`Home's board info=${JSON.stringify(boardInfo)}`);

        //summon board information with the caller board's information
        if (bookmarkInfo) {
            if (bookmarkInfo.id !== this.state.editBookmarkInfo.id
                || bookmarkInfo.title !== this.state.editBookmarkInfo.title
                || bookmarkInfo.description !== this.state.editBookmarkInfo.description
                || bookmarkInfo.url !== this.state.editBookmarkInfo.url) {

                this.setState({
                    editBookmarkInfo: bookmarkInfo
                })
                this.renderEditBookmark(bookmarkInfo);
            }
        }
        //console.log(`Home is rendering board ${JSON.stringify(boardInfo)}`);
    }

    editBookmark = (bookmarkInfo) => {
        console.log(`Board bookmark Info callback ${JSON.stringify(bookmarkInfo)}`);
        api.updateBookmark(bookmarkInfo.id, bookmarkInfo.title, bookmarkInfo.description, bookmarkInfo.url)
            .then(result => {
                console.log(result);
                let updatedBookmarks = this.state.bookmarks.map(bookmark => {
                    //console.log(`Bookmark ID ${bookmark.id} = ${result.body.id}`);
                        if (+bookmark.id === +result.body.id) {
                            return result.body;
                        } else {
                            return bookmark;
                        }
                    }
                )
                this.setState({
                    bookmarks: updatedBookmarks,
                    isEditBookmarkOpen: false

                })
            })

    }

    renderEditBookmark = (bookmarkInfo) => {
        //Render only if we have board information, summoned from an edit button
        this.setState({
            isEditBookmarkOpen: true

        })
    }


  render() {
    let { bookmarks } = this.state;
      //console.log(`Rendering=${JSON.stringify(this.state.bookmarks)}`);
    return (
      <div className="board">
        { bookmarks.map(b =>
          <BookmarkCard
            key={b.id}
            id={b.id}
            ownerId={this.state.ownerId}
            title={b.title}
            description={b.description}
            url={b.url}
            callbackEditBookmark={this.summonEditBookmark}
          />
        )}
          {auth.isLoggedIn() ? <AddButton typeOfElement="Bookmark" callbackFromParent={this.newBookmark}/> : null}
          <EditBookmark show={this.state.isEditBookmarkOpen} bookmarkInfo={this.state.editBookmarkInfo} callbackEditBookmark={this.editBookmark}/>
      </div>
    );
  }

}
