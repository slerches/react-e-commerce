import React from "react";

let Jumbotron = () => {
  let jb_content = [
    ["Accessories", "Hoodies & Sweatshirts", "Leather Jackets"],
    ["ASOS Basic Tops", "Jackets & Coats", "Long Sleeve T-Shirts"],
    ["Bags", "Jeans", "Loungewear"],
    ["Caps & Hats", "Jewellery", "Oversized & Longline"],
    ["Gifts", "Joggers", "Polo Shirts"],
    ["Grooming", "Jumpers & Cardigans", "Shirts"]
  ];
  return (
    <div
      className="jumbotron pt-4"
      style={{
        backgroundImage: 'url("Images/Images-modal4.png")',
        backgroundSize: "cover"
      }}
    >
      <h1
        className="display-4 font-weight-bold"
        style={{ fontFamily: "Times New Roman" }}
      >
        Mens wear
      </h1>
      <div className="lead text-light">
        {jb_content.map((row, index) => {
          return (
            <div key={index} className="row">
              <div className="col-md-4 col-sm-12">{row[0]}</div>
              <div className="col-md-4 col-sm-12">{row[1]}</div>
              <div className="col-md-4 col-sm-12">{row[2]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Jumbotron;
