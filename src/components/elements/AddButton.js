import React from 'react';
import CreateBoard from '../modals/CreateBoard';

export default class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
            callbackFromParent: ''
        }
        this.state = {
            isCreateBoardOpen: false
        };
    }

    createBoardClick = (e) => {
       e.preventDefault();
        this.setState({isCreateBoardOpen: !this.state.isCreateBoardOpen})
        //console.log('test');
    }

    closeCreateBoard=()=> this.setState({isCreateBoardOpen: false})

    newBoard = (newBoardInfo) => {
        //console.log(newBoardInfo);
        this.props.callbackFromParent(newBoardInfo);
        this.setState({
            isCreateBoardOpen: false
        })
    }

    render() {
        return (
            <div className="add-button">
                <i className="fa fa-plus fa-2x" onClick={this.createBoardClick}/>
                <CreateBoard show={this.state.isCreateBoardOpen} closeCreateBoard={this.closeCreateBoar} callbackFromParent={this.newBoard}></CreateBoard>
            </div>
        )
    }

}






