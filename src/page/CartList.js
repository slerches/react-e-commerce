import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class CartList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: this.props.totalCost
    }
  }

  remove(cartID) {
    this.props.rempveItem(cartID)
  }

  listCart() {
    return this.props.shopcart.map((cart, iIndex) => {
      let bgColor = iIndex % 2 == 0 ? 'bg-light' : ''
      return <div key={iIndex} className={`row ${bgColor} py-2`}>
        <div className="col-sm-1"><a href="#d" className="text-dark text-decoration-none" onClick={() => this.remove(cart.product_id)}><span className="row small"><i className="fa fa-times text-danger"></i>Remove</span></a></div>
        <div className="col-sm-3">{cart.name}</div>
        <div className="col-sm-3">{cart.attribute}</div>
        <div className="col-sm-1">${Number(cart.price).toFixed(2)}</div>
        <div className="col-sm-2">

          <div className="input-group col-12 pl-0">
            <span className="input-group-btn">
              <button onClick={() => this.props.decreaseQty(iIndex)} type="button" className="btn btn-danger btn-number btn-sm" data-type="minus" data-field="quant[2]">
                <span className="fa fa-minus"></span>
              </button>
            </span>
            <span className="col-4 text-center">{cart.quantity}</span>
            <span className="input-group-btn">
              <button onClick={() => this.props.increaseQty(iIndex)} type="button" className="btn btn-danger btn-number btn-sm" data-type="plus" data-field="quant[2]">
                <span className="fa fa-plus"></span>
              </button>
            </span>
          </div>
        </div>
        <div className="col-sm-1">${(cart.price * cart.quantity).toFixed(2)}</div>
      </div>
    });
  }

  render() {
    return (
      <>
        <div className="row mt-5 mb-4">
          <div className="col-sm-4">
            <button onClick={() => this.props.emptyCart()} type="button" className="btn btn-danger">EMPTY CART</button>
          </div>
          <div className="col-sm-4 flex-column text-center text-danger font-weight-bold">
            Total: ${this.props.totalCost.toFixed(2)}
          </div>
          <div className="col-sm-4 text-right">
            <NavLink to="/order" role="button" className="btn btn-danger">PLACE ORDER</NavLink>
          </div>
        </div>
        <div className="row font-weight-bold">
          <div className="col-sm-1"></div>
          <div className="col-sm-3">Name</div>
          <div className="col-sm-3">Attributes</div>
          <div className="col-sm-1">Price</div>
          <div className="col-sm-2">Quantity</div>
          <div className="col-sm-1">Subtotal</div>
        </div>
        {this.listCart()}
        <div className="row my-2">&nbsp;</div>
      </>
    )
  }
}


let mapStateToProps = (state) => {
  return {
    shopcart: state.shopcart,
    totalCost: state.totalCost
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    increaseQty: (catIndex) => {
      dispatch({ type: 'INCREASE_QTY', payload: catIndex })
    },
    decreaseQty: (catIndex) => {
      dispatch({ type: 'DECREASE_QTY', payload: catIndex });
    },
    rempveItem: (cartID) => {
      dispatch({ type: 'REMOVE_CART', payload: cartID });
    },
    emptyCart: () => dispatch({ type: 'EMPTY_CART' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);