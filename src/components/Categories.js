import React, { useEffect, useRef, useState } from "react";
import { NavLink } from 'react-router-dom';


let Categories = props => {
  const [categories, setCategories] = useState([]);

  let didRun = useRef(false);

  let getCategories = () => {
    const fetchPromise = fetch("https://backendapi.turing.com/categories");
    fetchPromise
      .then(response => {
        return response.json();
      })
      .then(cat => {
        setCategories(cat.rows);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (!didRun.current) {
      getCategories();
      didRun.current = true;
    }
  });

  return (
    <nav className="nav flex-column">
      <NavLink key={0} to="/" className="btn btn-secondary mb-2 btn-sm btn-block">All Categories</NavLink>
      {
        categories.map((cat) => {
          return <NavLink key={cat.category_id} to={`/${cat.name.toLowerCase()}`} activeStyle={{ borderBottom: "3px solid red" }} className="nav-link pl-0">{cat.name}</NavLink>;
        })
      }
    </nav>
  );
};

export default Categories;
