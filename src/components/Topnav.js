import React from 'react';
import { connect } from 'react-redux';

import Signin from './Signin';
import Signup from './Signup';
import Cart from './Cart';

class Topnav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: props.isLoggedIn
    }
  }

  labeledStatement() {
    if (!this.props.isLoggedIn) {
      return <span> or <Signup /></span>
    }
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light topnavbar">
          <button className="btn btn-link text-light">&nbsp;</button>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#topbar"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="topbar">
            <div className="col-md-3">
              Hi! <Signin />
              {
                this.labeledStatement()
              }
            </div>
            <div className="col-md-6 text-center">
              Daily Deals &nbsp; &nbsp; Sell &nbsp; &nbsp; help & Contact
            </div>
            <Cart />
          </div>
        </nav>
      </>
    )
  }
}

let mapStateTopProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

let mapDispatchTopProps = () => {
  return {

  }
}
export default connect(mapStateTopProps, mapDispatchTopProps)(Topnav);