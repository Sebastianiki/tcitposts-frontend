import React from 'react';
import Home from './components/Home'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className='container mt-5'>
          <Switch>
            <Route exact path='/' component={Home}/>
          </Switch> 
        </div>
      </Provider>
    </Router>
  );
}

export default App;
