import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
   rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
   applyMiddleware(thunk)
);

ReactDOM.render(
   <Provider store={store}>
        <div className="body">
            <div className="mobile-version">
                Desktop version of this app is not available at this time, resize your browser to view in a mobile version.
            </div>
            <App />
        </div>
   </Provider>, 
   document.getElementById('root')
);
registerServiceWorker();


