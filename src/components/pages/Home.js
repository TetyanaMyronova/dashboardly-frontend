import React, {Component} from 'react';
import api from '../../api';
import BoardCard from '../elements/BoardCard';
import AddButton from '../elements/AddButton';
import auth from '../../auth';
import './Home.css';
import {browserHistory as history} from 'react-router';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: []
        };
    }

    componentDidMount() {
        this._fetchBoards();
    }

    _fetchBoards = () => {
        api.getBoardsList()
            .then(res => {
                this.setState({boards: res.body.boards})
            })
            .catch(console.error)
    }

    newBoard = (newBoardInfo) => {
        let newBoardList = this.state.boards;
        newBoardList.push(newBoardInfo);
        this.setState({
            boards: newBoardList
        })
        //this.goToNewBoard(newBoardInfo.id); need to be revised later # complete task 4
    }

    goToNewBoard = (boardId) => {
        history.push(`/boards/${boardId}`);
    }

    render() {
        let {boards} = this.state;
        return (
            <div className="home">
                { boards.map(b =>
                    <BoardCard
                        key={b.id}
                        id={b.id}
                        title={b.title}
                        description={b.description}
                        updatedAt={b.updatedAt}
                    />
                )}
                {auth.isLoggedIn() ? <AddButton typeOfElement="Board" callbackFromParent={this.newBoard}/> : null}
            </div>
        );
    }

}
