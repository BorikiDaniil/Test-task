import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Login} from './pages/auth/login'
import {Registration} from "./pages/auth/registrations";
import {List} from "./pages";
import {Header} from "./components/header";
import {Product} from "./pages/product";


function App() {
  return (
      <BrowserRouter>
        <Header />
        <div className="container pt-4">
          <Switch>
            <Route path={'/login'} component={Login}/>
            <Route path={'/registration'} component={Registration}/>
            <Route path={'/'} exact component={List}/>
            <Route path={'/product/:id'} component={Product}/>
          </Switch>
        </div>
      </BrowserRouter>
  )
}

export default App;
