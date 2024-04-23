import './App.css';
import Token from './pages/token';
import Data from './pages/data';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  return (
    <div>
      <Router>
      <Switch>
        <Route exact path="/">
          <Token />
        </Route>
        <Route path="/data">
          <Data />
        </Route>
      </Switch>
    </Router>
    </div>    
  );
}

export default App;
