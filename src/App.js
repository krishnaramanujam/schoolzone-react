import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import Stafflogin from './modules/auth/stafflogin/Stafflogin';
import HomeScreen from './modules/homescreen/HomeScreen';


import './App.css';

function App() {
  return (
    <div>
      
      <Router>
          
          <Switch>
              <Route path="/homescreen" exact>
                  <HomeScreen/>
              </Route>
              <Route path="/" exact>
                  <HomeScreen/>
              </Route>
              <Route path="/auth/login" exact>
                  <Stafflogin/>
              </Route>
              <Route path="/auth" exact>
                  <Stafflogin/>
              </Route>
              <Redirect to='/' />
          </Switch>

      </Router>
    </div>
  );
}

export default App;
