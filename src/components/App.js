import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import Menu from './modals/Menu';
import './App.css';
import api from '../api'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isMenuOpen: false,
            path: '/',
            title: 'Dashboardly',
            boardId: 0
        }
    }

    closeMenu = () => this.setState({isMenuOpen: false})

    componentDidUpdate() {
        if (this.state.path !== browserHistory.getCurrentLocation().pathname) {
            let newPath = browserHistory.getCurrentLocation().pathname;
            let boardId = parseInt(newPath.replace('/boards/', ''));
            if (newPath !== '/') {
                api.getBoard(boardId)
                    .then(res => {
                        this.setState({
                            path: newPath,
                            title: res.body.title
                        })
                    })
            } else {
                this.setState({
                    path: newPath,
                    title: 'Dashboardly'
                })
            }
        }
    }

    render() {
        let {isMenuOpen} = this.state
        return (
            <div className="App">
                <div className="App-navbar">
                    <i className="fa fa-bars fa-2x menu-icon"
                       onClick={() => this.setState({isMenuOpen: !isMenuOpen})}
                    />
                    <Link to="/" className="App-navbar__title">{this.state.title}</Link>
                    <i className="fa fa-cog fa-2x settings-icon"/>
                </div>

                <Menu show={isMenuOpen} closeMenu={this.closeMenu}/>

                {this.props.children}

            </div>
        );
    }
}

export default App;
