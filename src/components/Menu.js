import React from "react";
import Searchbox from "../components/Searchbox";
import { NavLink } from 'react-router-dom';


let Menu = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="col-md-3">
            <NavLink className="navbar-brand text-danger text-uppercase font-weight-bold" to="/">shopmate</NavLink>
          </div>
          <div className="col-md-6">
            <button className="btn btn-link text-light">Women</button>
            <button className="btn btn-link text-light">Men</button>
            <button className="btn btn-link text-light">Kids</button>
            <button className="btn btn-link text-light">Shoes</button>
            <button className="btn btn-link text-light">Brands</button>
          </div>
          <div className="col-md-3 text-right">
            <Searchbox />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
