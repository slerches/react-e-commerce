import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="col-md-3 text-right">
          <NavLink to="/cartlist" className="text-dark text-decoration-none">
            <span id="ex4">
              <span className="p1 fa-stack fa-2x has-badge" data-count={this.props.quantity}>
                <i className="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse" data-count="4b"></i>
              </span>
            </span>
            Your Bag <span className="text-danger font-weight-bold">${this.props.totalCost.toFixed(2)}</span>
          </NavLink>
        </div>
      </>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    quantity: state.quantity,
    totalCost: state.totalCost
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);