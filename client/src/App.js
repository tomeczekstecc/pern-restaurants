import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RestaurantContextProvider } from './context/RestaurantContext';
import { HomePage, RestaurantDetail, UpdatePage } from './pages';

function App() {
  return (
    <RestaurantContextProvider>
      <div className='container'>
        <Router>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/restaurants/:id' component={RestaurantDetail} />
            <Route
              exact
              path='/restaurants/:id/update'
              component={UpdatePage}
            />
          </Switch>
        </Router>
      </div>{' '}
    </RestaurantContextProvider>
  );
}

export default App;
