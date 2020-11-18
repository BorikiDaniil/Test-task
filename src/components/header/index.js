import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {signUp} from '../../redux/actions/authActions';


export const Header = () => {
  const router = useHistory()
  const dispatch = useDispatch()

  const logout = async () => {
    await dispatch(signUp())
    router.push('/login')
  };

  return <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
    <Link className="navbar-brand" to='/'>Products</Link>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav justify-content-between w-100">
        <li className="nav-item">
          <Link className="nav-link" to='/product/new'>New product</Link>
        </li>
        <div className='d-flex'>
          <li className="nav-item">
            <Link className="nav-link" to='/login'>Login</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={e => logout()}>Logout</a>
          </li>
        </div>
      </ul>
    </div>
  </nav>
}