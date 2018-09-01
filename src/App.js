import React, { Component } from 'react';
import MyFood from './my-food/MyFood';
import Tabs from './tabs/Tabs';
import Profile from './profile/Profile';
import Calendar from './calendar/Calendar';
import DailyIntake from './daily-intake/DailyIntake';
import TestList from './test-components/TestList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    showModal: false,
    editedCustomFoods: this.props.modalCustomFoods,
    errorMessage: null
  }

  // componentDidMount(){
  //   const copyFoods = [...this.props.modalCustomFoods];
  //   this.setState({modalCustomFoods: copyFoods});
  // }

  

  render() {
    
    return (
      <div className="App">

        <Router>
          <div>
            <Route path='/myfood' component={MyFood} />
            <Route path='/' exact component={DailyIntake} />
            <Route path='/test' component={TestList} />
            <Route path='/' component={Tabs} />
            <Route path='/profile' component={Profile} />
            <Route path='/calendar' component={Calendar} />
          </div>
        </Router>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
        
	} 
}

export default connect(mapStateToProps, { })(App);
