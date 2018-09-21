import React, { Component } from 'react';
import MyFood1 from './my-food/MyFood1';
import Tabs from './tabs/Tabs';
import Profile from './profile/Profile';
import CreateFood from './create-food/CreateFood';
import Login from './login-signup/Login';
import Signup from './login-signup/Signup';
import Admin from './admin/Admin';
import DailyIntake from './daily-intake/DailyIntake';
import TestList from './test-components/TestList';
// import { BrowserRouter as Router, Route, } from 'react-router-dom';
import { Router, Route } from 'react-router-dom';
import configureHistory from './configureHistory.js';
import './App.css';
import { connect } from 'react-redux';
import RequireAuth from './HOC/requireAuth';
import Loader from './loader/Loader';

const history = configureHistory();

class App extends Component {
  state = {
    showModal: false,
    editedCustomFoods: this.props.modalCustomFoods,
    errorMessage: null
  }

  render() {
    console.log('App.js renders');
    return (
      <div className="App">

        <Router history={history}>
          <div>
            {/* {this.props.others.isLoading ? 
              <Loader message={this.props.others.loadingMessage}/> 
              : null 
            } */}

            <Route path='/myfood' component={RequireAuth(MyFood1)} />
            <Route path='/' exact component={RequireAuth(DailyIntake)} />
            <Route path='/test' component={RequireAuth(TestList)} />
            <Route path='/profile' component={RequireAuth(Profile)} />
            <Route path='/create' component={RequireAuth(CreateFood)} />
            <Route path="/" component={Tabs} />
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/admin' exact component={Admin} />
          </div>
        </Router>

      </div>
    );
  }
}
export default App;
// const mapStateToProps = (state) => {
// 	return {
//     others: state.others
// 	} 
// }

// export default connect(mapStateToProps, { })(App);
