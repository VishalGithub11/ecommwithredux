import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  removeSelectedProduct,
  selectedProduct,
} from "../redux/actions/productAction";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const product = useSelector((state) => state.product);
  console.log(product);

  const { productId } = useParams();
  const dispatch = useDispatch();

  console.log(productId);

  const fetchProductDetail = async () => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
    dispatch(selectedProduct(response));
  };

  useEffect(() => {
    if (productId && productId !== "") {
      fetchProductDetail();

      return () => dispatch(removeSelectedProduct());
    }
  }, [productId]);

  const { image, category, description, title, price } = product;

  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={image} />
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <a className="ui teal tag label">${price}</a>
                </h2>
                <h3 className="ui brown block header">{category}</h3>
                <p>{description}</p>
                <div
                  className="ui negative vertical animated button"
                  tabIndex="0"
                >
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
