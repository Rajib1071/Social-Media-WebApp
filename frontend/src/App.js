import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
// Import other components as needed

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* Add more routes for other components */}
      </Switch>
    </Router>
  );
};

export default App;
