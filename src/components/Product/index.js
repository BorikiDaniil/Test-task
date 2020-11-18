import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import axios from "axios";
import {useDispatch} from "react-redux";
import {getProducts} from "../../redux/actions/productsActions";

const url = process.env.REACT_APP_BD_URL

export const Product = ({product}) => {
  const {title, description, discount, end_date_discount, id, image, price} = product
  const dispatch = useDispatch()

  const getDaysToEndDiscount = () => {
    if(end_date_discount && discount) {
      const date = moment(new Date(), "YYYY-MM-DD");
      const discountEndDate = moment(end_date_discount,"YYYY-MM-DD");
      return discountEndDate.diff(date, 'days') + 1
    }
  };

  const removeProduct = async (id) => {
    try {
      await axios.delete(`${url}/products/${id}.json`)
      dispatch(getProducts())
    }
    catch (e) {
      console.log(e)
    }
  };

  return (
      <div className="card">
        <div className='card_image'>
        <img className="card-img-top" src={image.imagePreviewUrl} alt="image" />
        </div>
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">{description}
              </p>
            {
              getDaysToEndDiscount() > 0 ?
                  <div className='mb-3'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <h5>Price</h5>
                      <span className='old_price'>{price}</span>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                      <button type="button" className="btn btn-danger discount">{discount}% off</button>
                      <span>due to {getDaysToEndDiscount()} days</span>
                      <h5 className='mb-0'>{+price - price * (discount / 100)}</h5>
                    </div>
                  </div>:
                  <div className='d-flex justify-content-between mb-3'>
                    <h5>Price</h5>
                    <h5>{price}</h5>
                  </div>
            }
            <div className='card_actions'>
              <Link to={`/product/${id}`} className="btn btn-primary">Edit</Link>
              <button type="button" className="btn btn-danger" onClick={e => removeProduct(id)}>Remove</button>
            </div>
          </div>
      </div>
  );
};