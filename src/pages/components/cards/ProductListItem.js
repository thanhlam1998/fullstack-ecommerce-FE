import React from "react";
import { Link } from "react-router-dom";

const ProductListItem = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product;
  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item d-flex justify-content-between align-items-start">
        Price
        <span className="label label-default label-pill ">$ {price}</span>
      </li>

      {category && (
        <li className="list-group-item d-flex justify-content-between align-items-start">
          Category
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill ">
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item d-flex justify-content-between align-items-start">
          Sub Categories
          <div>
            {subs.map((s) => (
              <Link
                to={`/subs/${s.slug}`}
                className="label ms-2 label-default label-pill ">
                {s.name}
              </Link>
            ))}
          </div>
        </li>
      )}

      <li className="list-group-item d-flex justify-content-between align-items-start">
        Shipping
        <span className="label label-default label-pill ">{shipping}</span>
      </li>

      <li className="list-group-item d-flex justify-content-between align-items-start">
        Color
        <span className="label label-default label-pill ">{color}</span>
      </li>

      <li className="list-group-item d-flex justify-content-between align-items-start">
        Brand
        <span className="label label-default label-pill ">{brand}</span>
      </li>

      <li className="list-group-item d-flex justify-content-between align-items-start">
        Available
        <span className="label label-default label-pill ">{quantity}</span>
      </li>

      <li className="list-group-item d-flex justify-content-between align-items-start">
        Sold
        <span className="label label-default label-pill ">{sold}</span>
      </li>
    </ul>
  );
};

export default ProductListItem;
