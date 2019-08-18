import React, {Component} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Setting from './components/Setting';
import Question from './components/Question';
import Result from './components/Result';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route exact path='/' component={Setting} />
            <Route path='/question' component={Question} />
            <Route path='/result' component={Result} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
