import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Item from "../components/ProductItem";
import Jumbotron from "../components/Jumbotron";
import ReactPaginate from "react-paginate";
import Categories from '../components/Categories';
import ProductDetails from '../components/ProductDetails';

import Modal from 'react-modal';

import { Observable } from 'rxjs';

let Main = props => {
  let currentPage = 1;
  let didRun = useRef(false);

  const [param, setParam] = useState('/');
  const [gotCat, setGotCat] = useState(false);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [product_id, setProductId] = useState(0);
  //const [closeModal, setcloseModal] = useState()

  let customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '60%',
      transform: 'translate(-50%, -50%)'
    }
  };

  let getProducts = () => {
    let url = `https://backendapi.turing.com/products?page=${currentPage}&limit=${props.itemsPerPage}`;
    if (props.match.params.categoryName !== undefined && props.match.url !== '/') {
      url = `https://backendapi.turing.com/products/inCategory/${props.categories[props.match.params.categoryName]}?page=${currentPage}&limit=${props.itemsPerPage}`;
    }

    const fetchPromise = fetch(url);
    fetchPromise
      .then(response => {
        return response.json();
      })
      .then(products => {
        props.onFetchProducts(products);
      });
  };

  let closeModal = () => {
    setmodalIsOpen(false);
  }

  useEffect(() => {
    if (!didRun.current) {
      const obResult = Observable.create(observer => {
        fetch('https://backendapi.turing.com/categories')
          .then(response => response.json()) // or text() or blob() etc.
          .then(data => {
            observer.next(data);
            observer.complete();
          })
          .catch(err => observer.error(err));
      });

      obResult.subscribe(data => {
        let categoriesObj = new Object();
        data.rows.map(cat => {
          categoriesObj[cat.name.toLowerCase()] = cat.category_id;
        });
        props.setCategoriesPageNames(categoriesObj);
        getProducts();
        setParam(props.match.url);
        setGotCat(true);
      });
      didRun.current = true;
    }

    if (param !== props.match.url) {
      if (gotCat) {
        getProducts();
        setParam(props.match.url);
      }
    }

  });

  let changePage = params => {
    currentPage = params.selected + 1;
    getProducts();
  };

  return (
    <>
      <Jumbotron />
      <div className="col-sm d-flex justify-content-center">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={props.totalProducts}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={changePage}
          containerClassName={"pagination"}
          subContainerClassName={"page pagination"}
          activeClassName={"active"}
        />
      </div>
      <div className="row">
        <div className="col-md-2 col-sm-12">
          <Categories />
        </div>
        <div className="col-md-10 col-sm-12">
          {
            props.products.map((product) => {
              return <div key={product.product_id} className="col-md-3 mb-4 float-left"><a className="text-decoration-none text-dark" onClick={() => {
                setmodalIsOpen(true);
                setProductId(product.product_id);
              }} href="#i"><Item {...product} /></a></div>;
            })
          }
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
      >
        <ProductDetails onRequestClose={closeModal} product_id={product_id} />
      </Modal>
    </>
  );
};

let mapStateToProps = state => {
  return {
    products: state.products,
    totalProducts: state.totalProducts,
    itemsPerPage: state.itemsPerPage,
    currentPage: state.currentPage,
    categories: state.categories
  };
};

let mapDispatchToProps = dispatch => {
  return {
    onFetchProducts: data => {
      const action = { type: "UPDATE_PRODUCT_LIST", payload: data };
      dispatch(action);
    },
    setCategoriesPageNames: catObj => {
      const action = { type: "SET_CATEGORIES_PAGE_NAMES", payload: catObj };
      dispatch(action);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
