import React from 'react';
import CreateBoard from '../modals/CreateBoard';
import CreateBookmark from '../modals/CreateBookmark';
import './AddButton.css';

export default class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
            callbackFromParent: '',
            typeOfElement: '',
            boardId: 0

        };
        this.state = {
            isCreateElementOpen: false
        };
    }

    createElementClick = (e) => {
       e.preventDefault();
        this.setState({isCreateElementOpen: !this.state.isCreateElementOpen});
        //console.log('test');
    }

    closeCreateElement=()=> this.setState({isCreateElementOpen: false})

    newBoard = (newBoardInfo) => {
        //console.log(`New board created [AddButton] with info= ${JSON.stringify(newBoardInfo)}`);
        this.props.callbackFromParent(newBoardInfo);
        this.setState({
            isCreateElementOpen: false
        });
    }

    newBookmark = (newBookmarkInfo) => {
        //console.log(newBoardInfo);
        this.props.callbackFromParent(newBookmarkInfo);
        this.setState({
            isCreateElementOpen: false
        });
    }

    newElement() {
        if (this.props.typeOfElement === 'Board') {
            return <CreateBoard show={this.state.isCreateElementOpen} closeCreateElement={this.closeCreateElement} callbackFromParent={this.newBoard}></CreateBoard>;
        } else if (this.props.typeOfElement === 'Bookmark'){
            return <CreateBookmark boardId={this.props.boardId} show={this.state.isCreateElementOpen} closeCreateElement={this.closeCreateElement} callbackFromParent={this.newBookmark}/>;
        } else {
            return <div> Empty</div>;
        }
    }

    render() {
        return (
            <div className={`add-interface ${this.state.isCreateElementOpen ? "show" : ""}`}>
                <div className={`add-button ${this.state.isCreateElementOpen ? "hide" : ""}`}>
                    <i className="fa fa-plus fa-2x" onClick={this.createElementClick}/>
                </div>
                {this.newElement()}
            </div>
        );
    }

}






