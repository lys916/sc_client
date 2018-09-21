import React from 'react';
import { connect } from 'react-redux';
import {  getCustomFoods, getSystemFoods, getDailyFoods } from '../actions/foodAction';

import './styleTabs.css';
function getDateString(diffDay=0){
	const date = new Date();
	const day = date.getDate() + diffDay;
	const month = date.getMonth();
	const year = date.getFullYear();
	const currentDate = day.toString() + (month + 1).toString() + year.toString();
	return currentDate;
}

class Tabs extends React.Component {
	state = {
		active: ''
	}
	componentDidMount(){
		if(this.props.user._id){
			this.props.getDailyFoods(getDateString(0), this.props.user.username);
			this.props.getCustomFoods(this.props.user._id);
			this.props.getSystemFoods();
			this.setState({active: this.props.location.pathname});
		}

	}
	setActive = (tab)=>{
		this.setState({active: tab}, ()=>{
			this.props.history.push(`${tab}`);
		});
	}

	handleMouseDown = (spot)=>{
		console.log('MOUSE IS DOWN!');
		this.setState({mouseDown: spot});
	}

	handleMouseUp = ()=>{
		this.setState({mouseDown: ''});
	}
	
	render(){
		
		console.log('Tabs renders');
		if(!this.props.user._id){
			return null;
		}
		return (
			<div className="tabs">
				<div className={`border-right tab
					${this.state.active === '/' ? 'tab-active' : null}
					${this.state.mouseDown === 'daily' ? 'mouse-down' : 'mouse-up'}`}
					onClick={()=>{this.setActive('/')}}
					onMouseDown={()=>{this.handleMouseDown('daily')}} 
					onMouseUp={this.handleMouseUp}
				>
					<i className="material-icons">view_day</i>
					<div className="tab-name">Daily Intake</div>
				</div>

				<div className={`border-right tab 
					${this.state.active === '/myfood' ? 'tab-active' : null}
					${this.state.mouseDown === 'food' ? 'mouse-down' : 'mouse-up'}`}
					onClick={()=>{this.setActive('/myfood')}}
					onMouseDown={()=>{this.handleMouseDown('food')}} 
					onMouseUp={this.handleMouseUp}
				>

					<i className="material-icons">fastfood</i>
					<div className="tab-name">My Foods</div>
				</div>

				<div className={`border-right tab 
					${this.state.active === '/create' ? 'tab-active' : null}
					${this.state.mouseDown === 'create' ? 'mouse-down' : 'mouse-up'}`}
					onClick={()=>{this.setActive('/create')}}
					onMouseDown={()=>{this.handleMouseDown('create')}} 
					onMouseUp={this.handleMouseUp}
				>
					<i className="material-icons">control_point_duplicate</i>
					<div className="tab-name">Create Food</div>
				</div>

				<div className={`border-right tab 
					${this.state.active === '/profile' ? 'tab-active' : null}
					${this.state.mouseDown === 'profile' ? 'mouse-down' : 'mouse-up'}`}
					onClick={()=>{this.setActive('/profile')}}
					onMouseDown={()=>{this.handleMouseDown('profile')}} 
					onMouseUp={this.handleMouseUp}
				>
					<i className="material-icons">person</i>
					<div className="tab-name">Profile</div>
				</div>
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

export default connect(mapStateToProps, { getCustomFoods, getSystemFoods, getDailyFoods })(Tabs);