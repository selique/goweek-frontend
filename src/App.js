import React, { Component } from 'react';
// importando do react dom
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './pages/Login';
import Timeline from './pages/Timeline';

class App extends Component {
  render() {
    return (
      // react router dom => caminho da url amigável
      <BrowserRouter>
      {/* garantir q apenas uma rota seja chamada em uma página */}
        <Switch>
          {/* chamada de componente de login na raiz => http://dominio.com/login */}
          {/* property exact para garantir abrir o primeiro componente */}
          <Route path="/" exact component={Login} />
          {/* chamada de componente de timeline => http://dominio.com/timeline */}
          <Route path="/timeline" component={Timeline} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
