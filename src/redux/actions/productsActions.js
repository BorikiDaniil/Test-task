import {LIST} from '../types';
import axios from "axios";
const url = process.env.REACT_APP_BD_URL

const getProducts = () => {
  return async dispatch => {
    const productList = []
    let response = (await axios.get(`${url}/products.json`))
    response = response && response.data ? response.data : {}
    for (let value of Object.keys(response)) {
      response[value].id = value
      productList.push(response[value])
    }
    await dispatch({type: LIST, payload: productList})
  }
}

export {
  getProducts
}
