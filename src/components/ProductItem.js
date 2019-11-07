import React from "react";

let Item = props => {
  let text_truncate = function (str, length, ending) {
    if (length == null) {
      length = 80;
    }
    if (ending == null) {
      ending = "...";
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };

  return (
    <>
      <div className="card" style={{ height: "350px" }}>
        <div className="card-body text-center">
          <p>
            <strong>{props.name}</strong>
          </p>
          <img
            src={`/product_images/${props.thumbnail}`}
            className="mb-3"
            alt=""
          />
          <p className="card-text">{text_truncate(props.description)}</p>
          <p className="card-title pricing-card-title bottom">
            {
              props.discounted_price > 0 ?
                <span> &#036;{props.discounted_price} <del><small className="text-muted">&#036; {props.price}</small></del></span>
                :
                <span> &#036;{props.price}</span>
            }
          </p>
        </div>
      </div>
    </>
  );
};

export default Item;
