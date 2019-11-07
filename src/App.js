import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import "./Main.scss";

import Main from "./Sections/Main";
import Menu from "./components/Menu";
import Topnav from './components/Topnav';
import CartList from './page/CartList';
import OrderForm from './page/OrderForm';

let pageNotFound = () => {
  return (
    <div class="row">
      <div class="col-md-12">
        <div class="error-template">
          <h1>
            Oops!</h1>
          <h2>
            404 Not Found</h2>
          <div class="error-details">
            Sorry, an error has occured, Requested page not found!
                </div>
          <div class="error-actions">
            <Link to="/" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"></span>
              Take Me Home </Link><a href="#" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-envelope"></span> Contact Support </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="container">
      <Router>
        <Topnav />
        <Menu />
        <div>
          <Switch>
            <Route path="/cartlist" component={CartList} />
            <Route path="/order" component={OrderForm} />
            <Route path="/:categoryName?" component={Main} exact={true} />
            <Route component={pageNotFound} />
          </Switch>
        </div>

        <div
          className="jumbotron mb-0"
          style={{
            backgroundImage: 'url("Images/images-shoe2.png")',
            backgroundSize: "cover",
            height: "322px"
          }}
        >
          <h1 className="display-4 text-light">Converse</h1>
          <p className="lead text-light">
            Explore styles tough enough to <br />
            handle all your workouts
          </p>
        </div>
        <div className="col py-3">
          <div className="row">
            <div className="col-sm mt-2">
              <span className="text-uppercase font-weight-bold text-align-content-center">subscribe for shop news,updates and special offers</span>
            </div>
            <div className="col-sm text-right">
              <input className="py-1 w-75" type="text" placeholder=" Your e-mail here" style={{ borderRadius: "1rem" }} /> <button className="btn btn-danger text-light" style={{ borderRadius: "1rem" }}>Subscribe</button>
            </div>
          </div>
        </div>

        <div className="jumbotron bg-dark pt-5">
          <div className="lead text-light text-center">
            <div className="row">
              <div className="col-sm">
                Women
              </div>
              <div className="col-sm">
                Men
              </div>
              <div className="col-sm">
                Kids
              </div>
              <div className="col-sm">
                Shoes
              </div>
              <div className="col-sm">
                Brands
              </div>
            </div>
          </div>

          <div className="lead text-light text-center">
            <i className="fa fa-facebook-square fa-2x social"></i> &nbsp;
            <i className="fa fa-twitter-square fa-2x social"></i> &nbsp;
            <i className="fa fa-google-plus-square fa-2x social"></i> &nbsp;
            <i className="fa fa-envelope-square fa-2x social"></i>
          </div>
          <div className="lead text-muted text-center mt-3">
            <div>&copy;2016 shopmate Ltd . Contact . Privacy policy</div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
