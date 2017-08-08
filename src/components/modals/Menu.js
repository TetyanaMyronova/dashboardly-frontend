import React, {Component} from 'react';
import {Link} from 'react-router';
import onClickOutside from 'react-onclickoutside';
import auth from '../../auth';
import {browserHistory as history} from 'react-router';
import './Menu.css';


class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            email: '',
            avatarUrl: ''
        }
        this._handleLogout = this._handleLogout.bind(this);
    }

    handleClickOutside = () => {
        this.props.closeMenu();
    }

    _handleLogout(e) {
        e.preventDefault();
        auth.logout();
        // this.props.router.push('/');
        this.props.closeMenu();
        history.push('/');
    }

    fetchUser() {
        auth.getUser()
            .then(res => {
                this.updateUser(res);
            })
    }

    updateUser(user) {
        if (this.state.id !== user.id) {
            this.setState({
                id: user.id,
                email: user.email,
                avatarUrl: user.avatarurl
            })
        }
    }

    componentDidUpdate() {
        const isLoggedIn = auth.isLoggedIn()
        if (isLoggedIn && this.state.id === 0) {
            this.fetchUser();
        } else if (!isLoggedIn) {
            this.updateUser({
                id: 0,
                email: '',
                avatarUrl: ''
            })
        }
    }

    render() {
        let {closeMenu, show} = this.props
        const isLoggedIn = auth.isLoggedIn()
        console.log(this.state.email);
        return (
            <div className={`menu ${show ? "show" : ""}`}>

                <div className="menu__header">
                    <img src={this.state.avatarUrl} alt="profile-pic" className="menu__avatar"/>
                    {isLoggedIn ? <p className="menu__user">{this.state.email}</p>: null}
                </div>

                <div className="menu__list">

                    <Link to="/" className="menu__item" onClick={closeMenu}>
                        Home
                    </Link>

                    {!isLoggedIn ?
                        <Link to="/login" className="menu__item" onClick={closeMenu}>
                            Login
                        </Link>
                        : null}

                    {!isLoggedIn ?
                        <Link to="/signup" className="menu__item" onClick={closeMenu}>
                            Signup
                        </Link>
                        : null}

                    {isLoggedIn ?
                        <button className="menu__item logoutbutton" onClick={this._handleLogout}>Logout</button>
                        : null}
                </div>

            </div>
        );
    }

}

export default onClickOutside(Menu);
