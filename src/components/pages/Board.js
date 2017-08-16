import React, {Component} from 'react';
import api from '../../api';
import BookmarkCard from '../elements/BookmarkCard';
import auth from '../../auth';
import AddButton from '../elements/AddButton';
import './Board.css';
import Setting from '../modals/Setting';
import EditBoard from '../modals/EditBoard';
import EditBookmark from '../modals/EditBookmark';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
            callbackDeleteBookmark: ''
        };
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
            isSettingOpen: false,
            isEditBoardOpen: false,
            isEditBookmarkOpen: false
        };
    }

  
  closeSetting = () => this.setState({isSettingOpen: false})
  
  closeEditBoard = () => this.setState({isEditBoardOpen: false})
  
  closeEditBookmark = () =>  this.setState({
        editBookmarkInfo: {
            id: 0,
            title: "",
            description: "",
            url: ""
        },
        isEditBookmarkOpen: false
  })
  
  componentDidMount() {
    this.fetchBoardData();
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
                });
            })
            .catch(console.error);
    }
    
    renderEditBoard = () => {
        
    }
    
    editBoard = (boardInfo) => {
        
    }

    newBookmark = (newBookmarkInfo) => {
      let newBookmarkList = this.state.bookmarks;
      newBookmarkList.push(newBookmarkInfo);
      this.setState({
          bookmarks: newBookmarkList
      });
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
                });
                this.renderEditBookmark();
            }
        }
        //console.log(`Home is rendering board ${JSON.stringify(boardInfo)}`);
    }

    editBookmark = (bookmarkInfo) => {
        //console.log(`Board bookmark Info callback ${JSON.stringify(bookmarkInfo)}`);
        auth.updateBookmark(bookmarkInfo.id, bookmarkInfo.title, bookmarkInfo.url, bookmarkInfo.description)
            .then(result => {
                //console.log(result);
                let updatedBookmarks = this.state.bookmarks.map(bookmark => {
                    //console.log(`Bookmark ID ${bookmark.id} = ${result.body.id}`);
                        if (+bookmark.id === +result.body.id) {
                            return result.body;
                        } else {
                            return bookmark;
                        }
                    }
                );
                this.setState({
                    bookmarks: updatedBookmarks,
                    isEditBookmarkOpen: false

                });
            });
    }

    deleteBookmark = (bookmarkId) => {
        //console.log(boardId);
        auth.deleteBookmark(bookmarkId)
            .then(res => {
                let updatedBookmarks = this.state.bookmarks.filter(bookmark => {
                    return bookmark.id !== bookmarkId;
                });
                this.setState({
                    bookmarks: updatedBookmarks
                });
            });

    }

    renderEditBookmark = () => {
        //Render only if we have board information, summoned from an edit button
        this.setState({
            isEditBookmarkOpen: true
        });
    }


  render() {
    let { bookmarks, isSettingOpen } = this.state;
      //console.log(`Rendering=${JSON.stringify(this.state.bookmarks)}`);
    return (
      <div className="board">
        {auth.isLoggedIn() ? (+auth.getUserId()=== +this.state.ownerId ? <i className="fa fa-cog fa-2x settings-icon"
            onClick={() => this.setState({isSettingOpen: !isSettingOpen})}
        /> : null) :null}
        <Setting 
            boardId={this.props.params.id} 
            show={isSettingOpen} 
            closeSetting={this.closeSetting} 
            callbackEditBoard={this.renderEditBoard} 
            callbackDeleteBoard={this.deleteBoard}
        />
        
        <div className="bookmarkCards">
            { bookmarks.map(b =>
              <BookmarkCard
                key={b.id}
                id={b.id}
                ownerId={this.state.ownerId}
                title={b.title}
                description={b.description}
                url={b.url}
                callbackEditBookmark={this.summonEditBookmark}
                callbackDeleteBookmark={this.deleteBookmark}

              />
            )}
              {auth.isLoggedIn() ? (+auth.getUserId()=== +this.state.ownerId ? <AddButton boardId={this.props.params.id} typeOfElement="Bookmark" callbackFromParent={this.newBookmark}/> : null) : null}
        </div>
        <div className={`editContainer ${this.state.isEditBookmarkOpen ? "show" : ""}`}>
            <EditBookmark
                show={this.state.isEditBookmarkOpen}
                bookmarkInfo={this.state.editBookmarkInfo}
                closeEditBookmark={this.closeEditBookmark}
                callbackEditBookmark={this.editBookmark}/>
        </div>
        <div className={`editContainer ${this.state.isEditBoardOpen ? "show" : ""}`}>
            <EditBoard
                show={this.state.isEditBoardOpen}
                boardInfo={{title: this.state.title, description: this.state.description}}
                closeEditBoard={this.closeEditBoard}
                callbackEditBoard={this.editBoard}
            />
        </div>
      </div>
    );
  }

}
