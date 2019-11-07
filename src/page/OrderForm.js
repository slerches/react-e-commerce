import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import countryList from '../assets/countryList';

class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      togglespinner: 'text-hide',
      shippingRegion: [],
      shippingOptions: [],
      shipping_id: 1,
      tax_id: 1,
      statusMsg: '',
      dissableOrderButton: false
    }

    this.placeOrder = this.placeOrder.bind(this);
    this.getShippingOptions = this.getShippingOptions.bind(this);
  }

  async getShippingOptions(e) {
    this.setState({ togglespinner: '' })
    const response = await fetch(`https://backendapi.turing.com/shipping/regions/${e.target.value}`);
    const json = await response.json();
    this.setState({ shippingOptions: json, togglespinner: 'text-hide' })
  }

  placeOrder(e) {
    e.preventDefault();
    this.setState({ togglespinner: '' });

    fetch("https://backendapi.turing.com/orders", {
      method: 'POST',
      body: `cart_id=${this.props.cart_id}&shipping_id=${this.state.shipping_id}&tax_id=${this.state.tax_id}`,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'user-key': this.props.accessToken
      }
    }).then(res => res.json())
      .then(response => {
        if (response.error) {
          this.setState({ statusMsg: response.error.message });
          setTimeout(() => this.setState({ statusMsg: '' }), 4500);
          return;
        }
        this.setState({ statusMsg: response.message, togglespinner: 'text-hide', dissableOrderButton: true });
        this.props.emptyCart();
      })
      .catch(error => {
        this.setState({ togglespinner: 'text-hide', statusMsg: "Process failed." });
      });
  }

  async componentDidMount() {
    const response = await fetch('https://backendapi.turing.com/shipping/regions');
    const json = await response.json();
    this.setState({ shippingRegion: json });
  }
  render() {
    return (
      <>
        <form onSubmit={this.placeOrder}>
          <div className="form-group row mt-3">
            <label htmlFor="address1" className="col-sm-2 col-form-label">Address 1</label>
            <div className="col-sm-10">
              <input type="text" className="form-control border-light" id="address1" placeholder="Address 1" required />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="address2" className="col-sm-2 col-form-label">Address 2</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="address2" placeholder="Address 2" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="city" className="col-sm-2 col-form-label">City</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="city" placeholder="City" required />
            </div>
            <label htmlFor="region" className="col-sm-2 col-form-label">Region</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="city" placeholder="Region" required />
            </div>
            <label htmlFor="postalcode" className="col-sm-2 col-form-label">Postal Code</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="postalcode" placeholder="Postal Code" required />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="country" className="col-sm-2 col-form-label">Country</label>
            <div className="col-sm-10">
              <select className="form-control" id="city">
                <option value="0">Please Choose a Country</option>
                {
                  countryList.map(country => <option key={country.code} value={country.code}>{country.name}</option>)
                }
              </select>
            </div>
            <label htmlFor="shippingregion" className="col-sm-2 col-form-label">Shipping Region</label>
            <div className="col-sm-10">
              <select className="form-control" id="shippingregion" onChange={this.getShippingOptions}>
                {
                  this.state.shippingRegion.map(sRegion => <option key={sRegion.shipping_region_id} value={sRegion.shipping_region_id}>{sRegion.shipping_region}</option>)
                }
              </select>
            </div>
            <label htmlFor="shippingoptions" className="col-sm-2 col-form-label">Shipping Options</label>
            <div className="col-sm-10">
              <select className="form-control" id="shippingoptions" onChange={(e) => { this.setState({ shipping_id: e.target.value }) }}>
                {
                  this.state.shippingOptions.map(options => <option key={options.shipping_id} value={options.shipping_id}>{options.shipping_type}</option>)
                }
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-2">
              <button type="submit" className="btn btn-primary" disabled={this.state.dissableOrderButton}>Place Order</button>
            </div>
            <div className={`spinner-border text-dark ${this.state.togglespinner}`} role="status">
              <span className="sr-only">Loading...</span><span>{this.state.statusMsg}</span>
            </div>
          </div>
        </form>
      </>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    quantity: state.quantity,
    totalCost: state.totalCost,
    cart_id: state.cart_id,
    accessToken: state.userInfo.accessToken
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    emptyCart: () => dispatch({ type: 'EMPTY_CART' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);