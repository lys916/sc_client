import React, { Component } from 'react';
import MyFood from './my-food/MyFood';
import Tabs from './tabs/Tabs';
import Profile from './profile/Profile';
import Calendar from './calendar/Calendar';
import Login from './login-signup/Login';
import Signup from './login-signup/Signup';
import DailyIntake from './daily-intake/DailyIntake';
import TestList from './test-components/TestList';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import RequireAuth from './HOC/requireAuth';
import Loader from './loader/Loader';

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

        <Router>
          <div>
            {/* {this.props.others.isLoading ? 
              <Loader message={this.props.others.loadingMessage}/> 
              : null 
            } */}

            <Route path='/myfood' component={RequireAuth(MyFood)} />
            <Route path='/' exact component={RequireAuth(DailyIntake)} />
            <Route path='/test' component={RequireAuth(TestList)} />
            <Route path='/profile' component={RequireAuth(Profile)} />
            <Route path='/calendar' component={RequireAuth(Calendar)} />
            <Route path="/" component={Tabs} />
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={Signup} />
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
