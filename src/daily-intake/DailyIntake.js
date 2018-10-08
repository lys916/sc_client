import React from 'react';
import { connect } from 'react-redux';
import AmountIntake from './AmountIntake';
import FoodIntake from './FoodIntake';
import GoalIntake from './GoalIntake';
// import { Button, Modal } from 'react-bootstrap';
import DailyDate1 from './DailyDate1';
import { searchCustomFoods, getDailyFoods, addToDaily, deleteFood, getCustomFoods} from '../actions/foodAction';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import Moment from 'react-moment';
import 'moment-timezone';
import GoalModal from './GoalModal';

function getDateString(diffDay=0){
	const date = new Date();
	const day = date.getDate() + diffDay;
	const month = date.getMonth();
	const year = date.getFullYear();
	const currentDate = day.toString() + (month + 1).toString() + year.toString();
	return currentDate;
}

Date.prototype.addDays = function(days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

class DailyIntake extends React.Component {
	state = {
		showMenu: null,
		showModal: false,
		errorMessage: null,
		showIntakePage: false,
		currentDate: '',
		showGoalModal: false,
		day: 0,
		mouseDown: '',
		mouseUp: ''
	}

	// static getDerivedStateFromProps(props, state){
	// 	alert();
		
	// 	// const copyState = props.customFoods.map(food=>{
	// 	// 	return {...food};
	// 	// });
	// 	return {...state, editedCustomFoods: props.customFoods}
	// }

	componentDidMount(){
		if(this.props.user.username){
			this.props.getDailyFoods(getDateString(0), this.props.user.username);
		}

		setTimeout(()=>{
			this.setState({showIntakePage: true});
		},0);
	}

	handleShowMenu = (index)=>{
		const i = this.state.showMenu;
		if(i === null || i !== index){
			this.setState({showMenu: index });
		}
		if(i === index){
			this.setState({showMenu: null});
		}
	}

	handleDeleteFood = (id)=>{
		this.props.deleteFood(id);
		this.setState({showMenu: null});
	}

	handleShowModal = ()=>{
		this.setState({showModal: true}, ()=>{
			this.props.getCustomFoods(this.props.user._id);
		});
	}
	handleHideModal = ()=>{
		this.props.resetToggle();
		this.setState({showModal: false, errorMessage: null});
	}
	handleAddToDaily = ()=>{
		let selected = false;
		const foods = this.props.customFoods;
		// checking to see if there is any food selected
		for(let i = 0; i<foods.length; i++){
			if(foods[i].active){
				selected = true;
				break;
			}
		}

		if(selected){
			// parse out the selected food
			const selectedFoods = []
			this.props.customFoods.forEach(food=>{
				if(food.active){
					selectedFoods.push({
						name: food.name,
						measurement: food.measurement,
						fat: food.fat,
						carb: food.carb,
						protein: food.protein,
						amount: food.amount,
						dateString: getDateString(this.state.day),
						userName: this.props.user.username
					});
				}
			});
			this.props.addToDaily(selectedFoods);
			this.setState({showModal: false, errorMessage: null});
		}else{
			this.setState({errorMessage: 'Atleast 1 food must be selected.'});
		}
	}

	// ASSIGN ORIGINAL CUSTOM FOOD TO STATE AT COMPONENT MOUNT TO CLEAN UP THE CODE

	// handleToggleEditing = (id)=>{
	// 	this.props.toggleEditing(id);
	// }
	// handleToggleSaving = (id)=>{
	// 	this.props.toggleSaving(id);
	// }
	// handleToggleActive = (id)=>{
	// 	this.props.toggleActive(id);
	// }

	// handleOnChange = (event, id)=>{
	// 	const data = {
	// 		name: event.target.name,
	// 		value: event.target.value,
	// 		_id: id
	// 	}
	// 	this.props.amountOnChange(data);
	// }

	// handleSearch = (event)=>{
	// 	this.props.searchCustomFoods(event.target.value);
	// }

	showGoalModal = ()=>{
		this.setState({showGoalModal: true});
	}

	hideGoalModal = ()=>{
		this.setState({showGoalModal: false});
	}

	handleSetDay = (day)=>{
		const setDay = this.state.day + day;
		const userName = this.props.user.username;
		this.setState({day: setDay}, ()=>{
			console.log('date string', getDateString(this.state.day));
			this.props.getDailyFoods(getDateString(this.state.day), userName);
		});
	}
	handleSort = (event)=>{
		console.log('SORTING BY', event.target.value);
	}

	handleMouseDown = (spot)=>{
		console.log('MOUSE IS DOWN!');
		this.setState({mouseDown: spot});
	}

	handleMouseUp = ()=>{
		this.setState({mouseDown: ''});
	}

	render(){
		let fat = 0;
		let carb = 0;
		let protein = 0;
		this.props.dailyFoodIntake.forEach(food=>{
			fat += Math.ceil(Number(food.fat));
			carb += Math.ceil(Number(food.carb));
			protein += Math.ceil(Number(food.protein));
		})

		const date = new Date();
		const dateToFormat = date.addDays(this.state.day);
		return (
			<div className={`daily-intake ${this.state.showIntakePage ? 'show-intake-page' : null}`}>

				{/* make everything insdie this div stick to the top */}
				<div style={{position: 'sticky', top: '0px', zIndex: '2', paddingBottom: '23px', backgroundColor: 'white'}}>

					{/* date component */}
					<DailyDate1 
						mouseDown={this.state.mouseDown} 
						mouseUp={this.state.mouseUp} 
						handleMouseDown={this.handleMouseDown} 
						handleMouseUp={this.handleMouseUp} 
						handleSetDay={this.handleSetDay} 
						dateToFormat={dateToFormat} 
						username={this.props.user.username}
					/>
					
					{/* goal component */}
					<GoalIntake fat={fat} carb={carb} protein={protein} showModal={this.state.showModal} user={this.props.user} handleShowGoalModal={this.showGoalModal}/>

					{/* amount of food eaten so far */}
					<AmountIntake 
						fat={fat} carb={carb} 
						protein={protein} 
						user={this.props.user}
					/>
				</div>

				{/* individual food list */}
				<FoodIntake 
					handleDeleteFood={this.handleDeleteFood} 
					handleShowMenu={this.handleShowMenu} 
					showMenu={this.state.showMenu} 
					foods={this.props.dailyFoodIntake}
					isLoading={this.props.isLoading}
				/>

				{/* show this when user haven't added any daily food */}
				<div className="tab-tobegin">
					{this.props.dailyFoodIntake.length < 1 && !this.props.isLoading ? 'You have no daily food' : null}
				</div>

				{/* when used haven't set their goals -  modal */}
				<GoalModal history={this.props.history} user={this.props.user} handleShowGoalModal={this.showGoalModal} handleHideGoalModal={this.hideGoalModal} showGoalModal={this.state.showGoalModal}/>
				
				{/* <div className="add-button" onClick={this.handleShowModal}>
					<i className="material-icons">add</i>
				</div> */}

				{/* <FoodModal 
					toggleActive={this.handleToggleActive} 
					customFoods={this.props.customFoods} 
					showModal={this.state.showModal} 
					handleHide={this.handleHideModal}
					addToDaily={this.handleAddToDaily}
					toggleEditing={this.handleToggleEditing}
					handleOnChange={this.handleOnChange}
					errorMessage={this.state.errorMessage}
					handleSearch={this.handleSearch}
					handleSort={this.handleSort} 
				/> */}
				
				<br/><br/><br/>
				
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		dailyFoodIntake: state.dailyFoodIntake,
		customFoods: state.customFoods,
		user: state.user,
		isLoading: state.others.isLoading
	} 
}

export default connect(mapStateToProps, {getDailyFoods, deleteFood, addToDaily, getCustomFoods, searchCustomFoods })(DailyIntake);