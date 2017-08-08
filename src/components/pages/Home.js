import React, {Component} from 'react';
import api from '../../api';
import BoardCard from '../elements/BoardCard';
import AddButton from '../elements/AddButton';
import auth from '../../auth';
import './Home.css';


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

        console.log('Home new board infro' + JSON.stringify(newBoardInfo));
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
                {auth.isLoggedIn() ? <AddButton callbackFromParent={this.newBoard}/> : null}
            </div>
        );
    }

}
