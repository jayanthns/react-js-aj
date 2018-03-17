import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import loginReducer from './store/reducers/loginReducer';

const rootReducer = combineReducers({
  login: loginReducer
});

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
