import React from 'react';
import { connect } from 'react-redux';
import AmountIntake from './AmountIntake';
import FoodIntake from './FoodIntake';
import GoalIntake from './GoalIntake';
import { Button, Modal } from 'react-bootstrap';
import FoodModal from './FoodModal';
import DailyDate from './DailyDate';
import { searchCustomFoods, addToDaily, deleteFood, getDailyFood, getCustomFoods, toggleActive, toggleEditing, resetToggle, amountOnChange} from '../actions/foodAction';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Moment from 'react-moment';
import 'moment-timezone';
import GoalModal from './GoalModal';

function getDateString(){
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	const currentDate = day.toString() + (month + 1).toString() + year.toString();
	return currentDate;
}

class DailyIntake extends React.Component {
	state = {
		showMenu: null,
		showModal: false,
		errorMessage: null,
		showIntakePage: false,
		currentDate: '',
		showGoalModal: false
	}

	// static getDerivedStateFromProps(props, state){
	// 	alert();
		
	// 	// const copyState = props.customFoods.map(food=>{
	// 	// 	return {...food};
	// 	// });
	// 	return {...state, editedCustomFoods: props.customFoods}
	// }

	componentDidMount(){
		this.props.getDailyFood(getDateString());

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
		console.log('handle delete', id);
		this.props.deleteFood(id);
		this.setState({showMenu: null});
	}

	handleShowModal = ()=>{
		this.setState({showModal: true});
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
			console.log('looking for active');
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
						dateString: getDateString()
					});
				}
			});
			console.log('selected', selectedFoods);
			this.props.addToDaily(selectedFoods);
			this.setState({showModal: false, errorMessage: null});
		}else{
			this.setState({errorMessage: 'Atleast 1 food must be selected.'});
		}
	}

	// ASSIGN ORIGINAL CUSTOM FOOD TO STATE AT COMPONENT MOUNT TO CLEAN UP THE CODE

	handleToggleEditing = (id)=>{
		this.props.toggleEditing(id);
	}
	handleToggleActive = (id)=>{
		this.props.toggleActive(id);
	}

	handleOnChange = (event, id)=>{
		const data = {
			name: event.target.name,
			value: event.target.value,
			_id: id
		}
		this.props.amountOnChange(data);
	}

	handleSearch = (event)=>{
		console.log('handle search custom food', event.target.value);
		this.props.searchCustomFoods(event.target.value);
	}

	showGoalModal = ()=>{
		this.setState({showGoalModal: true});
	}

	hideGoalModal = ()=>{
		this.setState({showGoalModal: false});
	}


	render(){
		let fat = 0;
		let carb = 0;
		let protein = 0;
		this.props.dailyFoodIntake.forEach(food=>{
			fat += Number(food.fat);
			carb += Number(food.carb);
			protein += Number(food.protein);
		})

		// date formatter
		const dateToFormat = new Date();
		return (
			<div className={`daily-intake ${this.state.showIntakePage ? 'show-intake-page' : null}`}>
				<DailyDate dateToFormat={dateToFormat}/>

                <GoalIntake fat={fat} carb={carb} protein={protein} showModal={this.state.showModal} user={this.props.user} handleShowGoalModal={this.showGoalModal}/>

				<AmountIntake 
					fat={fat} carb={carb} 
					protein={protein} 
					user={this.props.user}
				/>

				<div className="my-daily-intake">
					<div>My Daily Intake</div>
				</div>
				<div className="tab-tobegin">
					{this.props.dailyFoodIntake.length < 1 ? 'Tab add button to begin' : null}
				</div>

				<GoalModal history={this.props.history} user={this.props.user} handleShowGoalModal={this.showGoalModal} handleHideGoalModal={this.hideGoalModal} showGoalModal={this.state.showGoalModal}/>

				<FoodIntake 
					handleDeleteFood={this.handleDeleteFood} 
					handleShowMenu={this.handleShowMenu} 
					showMenu={this.state.showMenu} 
					foods={this.props.dailyFoodIntake}
				/>
				
				<div className="add-button" onClick={this.handleShowModal}>
					<i className="material-icons">add</i>
				</div>

				<FoodModal 
					toggleActive={this.handleToggleActive} 
					customFoods={this.props.customFoods} 
					showModal={this.state.showModal} 
					handleHide={this.handleHideModal}
					addToDaily={this.handleAddToDaily}
					toggleEditing={this.handleToggleEditing}
					handleOnChange={this.handleOnChange}
					errorMessage={this.state.errorMessage}
					handleSearch={this.handleSearch} 
				/>
				
				<br/><br/><br/><br/><br/>
				
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log('USER', state.user);
	return {
		dailyFoodIntake: state.dailyFoodIntake,
		customFoods: state.customFoods,
		user: state.user
	} 
}

export default connect(mapStateToProps, {toggleEditing, deleteFood, addToDaily, getDailyFood, getCustomFoods, toggleActive, resetToggle, searchCustomFoods, amountOnChange })(DailyIntake);