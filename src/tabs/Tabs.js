import React from 'react';
import { connect } from 'react-redux';
import {  getCustomFoods, getSystemFoods } from '../actions/foodAction';

import './styleTabs.css';

class Tabs extends React.Component {
	state = {
		active: ''
	}
	componentDidMount(){
		this.props.getCustomFoods(this.props.user._id);
		this.props.getSystemFoods();
		this.setState({active: this.props.location.pathname});
	}
	setActive = (tab)=>{
		
		this.setState({active: tab}, ()=>{
			console.log('thisprop', this.props);
			this.props.history.push(`${tab}`);
		});
	}
	
	render(){
		if(!this.props.user){
			return null;
		}
		return (
			<div className="tabs">
				<div className={`border-right tab ${this.state.active === '' ? 'tab-active' : null}`} onClick={()=>{this.setActive('/')}}>Intake</div>

				<div className={`border-right tab ${this.state.active === '/calendar' ? 'tab-active' : null}`} onClick={()=>{this.setActive('/calendar')}}>Calendar</div>

				<div className={`border-right tab ${this.state.active === '/myfood' ? 'tab-active' : null}`} onClick={()=>{this.setActive('/myfood')}}>Foods</div>

				<div className={`border-right tab ${this.state.active === '/profile' ? 'tab-active' : null}`} onClick={()=>{this.setActive('/profile')}}>Profile</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		customFoods: state.customFoods,
		user: state.user
	} 
}

export default connect(mapStateToProps, { getCustomFoods, getSystemFoods })(Tabs);