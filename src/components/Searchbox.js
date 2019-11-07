import React from "react";
import { connect } from "react-redux";

let Searchbox = props => {
  let query_string;
  let $ = window.$;

  $(document).ready(function () {
    $('[data-toggle="popover"]').popover();
  });

  let searchProducts = e => {
    $('[data-toggle="popover"]').popover("show");
    e.preventDefault();
    const fetchPromise = fetch(
      `https://backendapi.turing.com/products/search?query_string=${
      query_string.value
      }&limit=${props.itemsPerPage}`
    );
    fetchPromise
      .then(response => {
        return response.json();
      })
      .then(products => {
        console.log(products);
        props.onFetchProducts(products);
        $('[data-toggle="popover"]').popover("hide");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <form className="form-inline my-2 my-lg-0" onSubmit={searchProducts}>
        <input
          ref={input => (query_string = input)}
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search anything"
          aria-label="Search"
          style={{ borderRadius: "1rem" }}
        />
      </form>
    </>
  );
};

let mapStateToProps = state => {
  return {
    products: state.products,
    totalProducts: state.totalProducts,
    itemsPerPage: state.itemsPerPage
  };
};

let mapDispatchToProps = dispatch => {
  return {
    onFetchProducts: data => {
      const action = { type: "UPDATE_PRODUCT_LIST", payload: data };
      dispatch(action);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Searchbox);
