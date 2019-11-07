import React from 'react';
import { connect } from 'react-redux';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      product: {},
      attributesColor: [],
      attributesSize: [],
      color: '',
      a_size: ''
    }
    this.addTocart = this.addTocart.bind(this);
  }

  async componentDidMount() {
    const response = await fetch(`https://backendapi.turing.com/products/${this.props.product_id}/details`);
    const product = await response.json();
    const attributes = await fetch(`https://backendapi.turing.com/attributes/inProduct/${this.props.product_id}`);
    const c_attrib = await attributes.json();
    let color = new Array();
    let a_size = new Array();
    c_attrib.map(attribute => {
      if (attribute.attribute_name === "Color") {
        color.push(attribute);
      } else {
        a_size.push(attribute);
      }
    });
    this.setState({
      product: product[0],
      attributesColor: color,
      attributesSize: a_size,
      loaded: true
    });
  }

  async addTocart() {
    let product = this.state.product;
    const duplicate = this.props.shopcart.some((cart) => {
      if (cart.product_id == product.product_id) return true;
      return false;
    })

    if (duplicate) {
      alert('Item already in cart. To increase cart item, click on the cart icon on the top right to increase the quantity for this item');
      return
    }

    if (!this.props.cart_id) {
      let get_cart_id = await fetch('https://backendapi.turing.com/shoppingcart/generateUniqueId');
      let cart_id = await get_cart_id.json();
      this.props.setCartId(cart_id);
      localStorage.setItem('cart_id', cart_id);
    }

    let price = product.discounted_price > 0 ? product.discounted_price : product.price;
    let add = await fetch('https://backendapi.turing.com/shoppingcart/add', {
      method: 'POST',
      body: `cart_id=${this.props.cart_id}&product_id=${product.product_id}&attributes=${encodeURIComponent(this.state.color + ':' + this.state.a_size)}`,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).catch(e => console.log('ERROR', e))
    let response = await add.json();

    this.props.addTocart(
      {
        product_id: product.product_id, name: product.name, price: price, quantity: 1, attribute: this.state.color + ':' + this.state.a_size
      }
    );
    localStorage.setItem('carts', JSON.stringify(response));
    this.props.onRequestClose();
  }

  render() {
    return (
      <>
        {
          !this.state.loaded ?
            <div className="spinner-border text-dark" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            :
            <div className="col-md-12 col-sm-12">
              <div className="row">
                <div className="col-md-3 col-sm-12 justify-content-center">
                  <div className="row px-0 justify-content-center mt-4">
                    <img
                      src={`/product_images/${this.state.product.image}`}
                      alt=""
                    />
                  </div>
                  <div className="mt-2">
                    <img
                      src={`/product_images/${this.state.product.image}`}
                      alt=""
                      className="col col-md-6 border-0"
                    />
                    <img
                      src={`/product_images/${this.state.product.image_2}`}
                      alt=""
                      className="col col-md-6 border-0"
                    />
                  </div>
                </div>
                <div className="col">
                  <h3 className="font-weight-bold">{this.state.product.name}</h3>
                  <span className="font-weight-bold text-danger">
                    {
                      this.state.product.discounted_price > 0 ?
                        <span><del><small>&#036; {this.state.product.price}</small></del> &#036;{this.state.product.discounted_price}</span>
                        :
                        <span> &#036;{this.state.product.price}</span>
                    }
                  </span>
                  <br /><br />
                  {this.state.product.description}
                  {
                    this.state.attributesColor.length > 0 ?
                      <div className="product-color mt-3">
                        <span className="text-muted font-weight-bold">Color</span>
                        <div className="color-choose">
                          {
                            this.state.attributesColor.map(color => {
                              let c = color.attribute_value.toLowerCase();
                              return <div key={color.attribute_value_id}>
                                <span onClick={() => this.setState({ color: 'Color:' + color.attribute_value })} style={{ backgroundColor: c }}></span>
                              </div>
                            })
                          }
                        </div>
                      </div>
                      : ''
                  }
                  {
                    this.state.attributesSize.length > 0 ?
                      <div>
                        <span className="text-muted font-weight-bold">Size</span>
                        <div className="mt-3">
                          {
                            this.state.attributesSize.map(a_size => <span onClick={() => this.setState({ a_size: 'Size:' + a_size.attribute_value })} key={a_size.attribute_value_id} className="border border-danger p-2 mr-2 text-danger font-weight-bold">{a_size.attribute_value}</span>)
                          }
                        </div>
                      </div>
                      : ''
                  }
                  <div className="col text-right mt-3">
                    <button onClick={this.addTocart} className="btn btn-danger text-light" style={{ borderRadius: "1rem" }}>Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col text-center">
                  Leave a Review <br />
                  <textarea style={{ width: "80%", height: "75px" }}></textarea>
                </div>
              </div>
            </div>
        }
      </>
    )
  }
}


let mapStateToProps = (state) => {
  return {
    cart_id: state.cart_id,
    shopcart: state.shopcart
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    setCartId: (cart_id) => {
      dispatch({ type: 'SET_CART_ID', payload: cart_id });
    },
    addTocart: (shoppingcart) => {
      dispatch({ type: 'ADD_TO_CART', payload: shoppingcart });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);