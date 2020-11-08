import React, {Component} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Setting from './components/Setting';
import Question from './components/Question';
import Comment from './components/comment/Comment';


class App extends Component {
  componentDidMount(){
    document.title = "Alex Maths World"
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route exact path='/' component={Setting} />
            <Route path='/question' component={Question} />
            <Route path='/comment' component={Comment} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
