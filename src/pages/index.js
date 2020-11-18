import React, {useEffect, useState, useMemo} from 'react';
import {ProductsList} from "../components/ProductsList";
import {useHistory} from "react-router-dom";

import {useDispatch, useStore} from "react-redux";
import {getProducts} from '../redux/actions/productsActions';

export const List = () => {
  const history = useHistory()
  const [list, setList] = useState([])

  const dispatch = useDispatch()
  const storage = useStore()

  storage.subscribe(() => setList(storage.getState().booking.products))

  useMemo(() => {
    if(!localStorage.getItem('token')) history.push('/login')
  },[]);

  useEffect(() => {
     getList()
  },[]);

  const getList = async() => {
    await dispatch(getProducts())
    setList(storage.getState().booking.products)
  };

  return <>
    <h1>Products</h1>
    <ProductsList list={list.length ? list : []}/>
  </>
}