import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Modal from 'react-modal';
import UserProfile from './UserProfile';


class Signin extends React.Component {
  constructor(props) {
    super(props);
    let tmpusername = '';
    if (props.userInfo.customer) {
      tmpusername = props.userInfo.customer.name;
    }

    this.state = {
      loggedin: tmpusername ? true : false,
      error: '',
      modalIsOpen: false,
      toggleLogin: false,
      customername: tmpusername
    }

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onLogout = this.onLogout.bind(this);

    this.customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };
  }
  $ = window.$;
  email = '';
  password = '';



  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  onLogout() {
    localStorage.clear();
    this.setState({ loggedin: false });
    this.props.onLogout();
    this.props.emptyCart();
  }

  onSubmitForm = (e) => {
    e.preventDefault();

    fetch("https://backendapi.turing.com/customers/login", {
      method: 'POST',
      body: `email=${this.email.value}&password=${encodeURIComponent(this.password.value)}`,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => res.json())
      .then(response => {
        if (response.error) {
          this.setState({ error: response.error.message });
          setTimeout(() => this.setState({ error: '' }), 4500);
          return;
        }
        //this.setState({ label: response.customer.name });
        localStorage.setItem('userInfo', JSON.stringify(response));
        this.$('#signIn').modal('toggle');
        this.setState({ customername: response.customer.name, loggedin: true })
        this.props.onSetUserInfo(response);
      })
      .catch(error => this.setState({ error }));
  }


  notLabel() {
    return <>
      <a href="#signIn" className="text-danger font-weight-bold" data-toggle="modal" aria-haspopup="true" aria-expanded="false" role="button">Sign In</a>
      <div id="signIn" className="modal fade">
        <div className="modal-dialog modal-login">
          <div className="modal-content">
            <form method="post" onSubmit={this.onSubmitForm}>
              <div className="modal-header">
                <h4 className="modal-title">Login</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="email" className="form-control" ref={(input) => this.email = input} required="required" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="password" className="form-control" ref={(input) => this.password = input} required="required" />
                </div>
              </div>
              <div className="modal-footer">
                <span className="text-danger pull-left">{this.state.error}</span>
                <input type="submit" className="btn btn-primary pull-right" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  }

  activeLabel() {
    return <>
      <span className="dropdown">
        <button className="btn btn-link dropdown-toggle text-danger font-weight-bold pl-0" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.customername}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
          <nav className="nav flex-column pl-2">
            <NavLink className="text-dark" to=""><i className="fa fa-shopping-bag fa-fw"></i>My Bag</NavLink>
            <NavLink onClick={this.openModal} className="text-dark" to=""><i className="fa fa-user-circle-o fa-fw"></i>My Profile</NavLink>
            <NavLink onClick={this.onLogout} className="text-dark" to=""><i className="fa fa-sign-out fa-fw"></i>My Logout</NavLink>
          </nav>
        </div>
      </span>
    </>
  }
  render() {
    return (
      <>
        {
          this.state.loggedin ?
            this.activeLabel()
            :
            this.notLabel()
        }
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          style={this.customStyles}
        >
          <UserProfile />
        </Modal>

      </>
    )
  }
}

let mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  }
}

let mapDsipatchToProps = (dispatch) => {
  return {
    onSetUserInfo: (userInfo) => {
      dispatch({ type: 'SET_USER_INFO', payload: userInfo });
    },
    onLogout: () => {
      dispatch({ type: 'LOGUT' });
    },
    emptyCart: () => dispatch({ type: 'EMPTY_CART' })
  }
}
export default connect(mapStateToProps, mapDsipatchToProps)(Signin);