import React from 'react';
import {LoginForm} from '../../components/login'

export const Login = () => {
  return <>
  <h1 className='mb-5'>Login</h1>
    <LoginForm isLogin={true}/>
  </>
}