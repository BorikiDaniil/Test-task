import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";

import {useDispatch, useStore} from "react-redux";
import {register, login} from '../../redux/actions/authActions';

export const LoginForm = ({isLogin}) => {

  const router = useHistory()

  const dispatch = useDispatch()
  const storage = useStore()

  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    isLogin ? await dispatch(login(email, password)) : await dispatch(register(email, password))
    setError(storage.getState().authentication.error)
    setLoading(storage.getState().authentication.loginBtnLoading)
    if(!storage.getState().authentication.error) router.push('/')
  };

  return <form onSubmit={(e) => handleSubmit(e)}>
    { error.length ? <div className="alert alert-danger" role="alert">
      {error}
    </div> : <></> }
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email"
               className="form-control"
               id="exampleInputEmail1"
               aria-describedby="emailHelp"
               placeholder="Enter email"
               onChange={e => {setEmail(e.target.value)}}
        />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
            else.
          </small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            aria-describedby="passwordHelp"
            onChange={e => {setPassword(e.target.value)}}
        />
        <small id="passwordHelp" className="text-muted">
          Must be more than 6 characters long.
        </small>
      </div>
    {isLogin ? <div className='mb-3'>
      If you haven`t an account please <Link to='/registration'>register</Link>
    </div> : <> </>}
      <div>
        <button
            type="submit"
            className="btn btn-primary mx-auto d-block"
        >
          {
            isLoading ?
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
              <></>
          }
          {
            isLogin ? 'Login' : 'Registration'
          }
        </button>
      </div>
    </form>
};