//package
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//Components
import Header  from './Components/Header';
import Produtos from './Components/Productos';
import NuevoProducto from './Components/NuevoProducto';
import EditarProducto from './Components/EditarProducto';

//ReduxI
import { Provider  } from 'react-redux'
import  store from './store';

function App() {
  return (
    <Router>
    <Provider store = {store}>
      <Header/>
      <div className="container mt-5">
          <Switch>
            <Route exact path="/" component={Produtos}/>
            <Route exact path="/productos/nuevo" component={NuevoProducto}/>
            <Route exact path="/productos/editar/:id" component={EditarProducto}/>
          </Switch>
      </div>
      </Provider>
    </Router>
  );
}

export default App;
