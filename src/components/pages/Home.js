import React, {Component} from 'react';
import api from '../../api';
import BoardCard from '../elements/BoardCard';
import AddButton from '../elements/AddButton';
import EditBoard from '../modals/EditBoard';
import auth from '../../auth';
import './Home.css';
// import {browserHistory as history} from 'react-router';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
            callbackEditBoard: '',
            callbackDeleteBoard: ''
        }
        this.state = {
            boards: [],
            editBoardInfo: {
                id: 0,
                title: "",
                description: ""
            },
            isEditBoardOpen: false
        };
    }

    closeEditBoard = () =>  this.setState({isEditBoardOpen: false})

    componentDidMount() {
        this._fetchBoards();
    }

    // componentDidUpdate() {
    //     console.log('home updated');
    // }

    _fetchBoards = () => {
        api.getBoardsList()
            .then(res => {
                console.log(`boards=${JSON.stringify(res.body.boards)}`);
                this.setState({boards: res.body.boards});
            })
            .catch(console.error);
    }

    newBoard = (newBoardInfo) => {
        let newBoardList = this.state.boards;
        newBoardList.push(newBoardInfo);
        this.setState({
            boards: newBoardList
        });
        //this.goToNewBoard(newBoardInfo.id); need to be revised later # complete task 4
    }

    // goToNewBoard = (boardId) => {
    //     history.push(`/boards/${boardId}`);
    // }

    summonEditBoard = (boardInfo) => {
        //This is the function for the [Edit] button on the board
        //console.log(`Home's board info=${JSON.stringify(boardInfo)}`);

        //summon board information with the caller board's information
        if (boardInfo) {
            if (boardInfo.id !== this.state.editBoardInfo.id
            || boardInfo.title !== this.state.editBoardInfo.title
            || boardInfo.description !== this.state.editBoardInfo.description) {

                this.setState({
                    editBoardInfo: boardInfo
                });
                this.renderEditBoard(boardInfo);
            }
        }
        //console.log(`Home is rendering board ${JSON.stringify(boardInfo)}`);
    }

    editBoard = (boardInfo) => {
        api.updateBoard(boardInfo.id, boardInfo.title, boardInfo.description)
            .then(result => {
                // console.log(`Checking return of res ${JSON.stringify(result.body)}`);
               let updatedBoards = this.state.boards.map(board => {
                        if (board.id === result.body.id) {
                           return result.body;
                        } else {
                            return board;
                        }
                    }
                );
                this.setState({
                    boards: updatedBoards,
                    isEditBoardOpen: false

                });
            });
    }

    deleteBoard = (boardId) => {
        //console.log(boardId);
        api.deleteBoard(boardId)
            .then(res => {
                let updatedBoards = this.state.boards.filter(board => {
                   return board.id !== boardId;
                });
                this.setState({
                    boards: updatedBoards
                })
            })

    }

    renderEditBoard = (boardInfo) => {
        //Render only if we have board information, summoned from an edit button
        this.setState({
            isEditBoardOpen: true
        });
    }


    render() {
        let {boards} = this.state;
        //console.log(`Rendering=${JSON.stringify(this.state.boards)}`);
        return (
            <div className="home">
                <div className="boardCards">
                    { boards.map(b =>
                        <BoardCard
                            key={b.id}
                            id={b.id}
                            ownerId={b.ownerId}
                            title={b.title}
                            description={b.description}
                            updatedAt={b.updatedAt}
                            callbackEditBoard={this.summonEditBoard}
                            callbackDeleteBoard={this.deleteBoard}
                        />
                    )}
                </div>
                <div>
                    {auth.isLoggedIn() ? <AddButton typeOfElement="Board" callbackFromParent={this.newBoard}/> : null}
                </div>
                <div className={`editContainer ${this.state.isEditBoardOpen ? "show" : ""}`}>
                    <EditBoard show={this.state.isEditBoardOpen} boardInfo={this.state.editBoardInfo} closeEditBoard={this.closeEditBoard} callbackEditBoard={this.editBoard}/>
                </div>
            </div>
        );
    }

}
