import React, {Component} from 'react';
import onClickOutside from 'react-onclickoutside';
import './Setting.css';

// import auth from '../../auth';

class Setting extends Component {
  constructor(props) {
    super(props);
    this.defaultProps = {
      boardId: 0
    };
    this.state = {
    };
  }
  
  handleClickOutside = () => {
    this.props.closeSetting();
  }
  
  callEditBoard = () => {
    this.props.callbackEditBoard();
  }
  
  render() {
    // const isLoggedIn = auth.isLoggedIn();
    let {show} = this.props;
    return (
      <div className={`setting ${show ? "show" : ""}`}>
        <button type="click" onClick={this.callEditBoard}>Edit Board</button>
        <button type="click" >Delete Board</button>
      </div>
    );
  }
}

export default onClickOutside(Setting);