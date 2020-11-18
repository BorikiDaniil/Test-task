import React from "react";
import {Product} from '../Product'

export const ProductsList = ({list}) => {
  return <div className='products_list'>
    {list.map(product => {
      return <Product product={product} key={product.id}/>
    })}
  </div>
};