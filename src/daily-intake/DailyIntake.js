import React from 'react';
import { connect } from 'react-redux';
import AmountIntake from './AmountIntake';
import FoodIntake from './FoodIntake';
import GoalIntake from './GoalIntake';
import { Button, Modal } from 'react-bootstrap';
import FoodModal from './FoodModal';
import Tabs from '../tabs/Tabs';
import { addToDaily, deleteFood} from '../actions/foodAction';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class DailyIntake extends React.Component {
	state = {
		showMenu: null,
		showModal: false,
    	editedCustomFoods: this.props.modalCustomFoods,
		errorMessage: null,
		showIntakePage: false
	}

	componentDidMount(){
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
		this.setState({showModal: false, editedCustomFoods: this.props.modalCustomFoods, errorMessage: null});
	}
	handleAddToDaily = ()=>{
		let selected = false;
		const foods = this.state.editedCustomFoods;
		for(let i = 0; i<foods.length; i++){
		console.log('looking for active');
		if(foods[i].active){
			selected = true;
			break;
		}
		}
		if(selected){
		this.props.addToDaily(this.state.editedCustomFoods);
		this.setState({showModal: false, editedCustomFoods: this.props.modalCustomFoods, errorMessage: null});
		}else{
		this.setState({errorMessage: 'Atleast 1 food must be selected.'});
		}
	}
	handleToggleEditing = (index)=>{
	const foodObject = Object.assign({}, this.state.editedCustomFoods[index]);
	foodObject.editing = !foodObject.editing;
	const copyFoods = Object.assign([], this.state.editedCustomFoods);
	copyFoods[index] = foodObject;
	this.setState({editedCustomFoods: copyFoods});
	}
	handleToggleActive = (index)=>{
	const foodObject = Object.assign({}, this.state.editedCustomFoods[index]);
	foodObject.active = !foodObject.active;
	const copyFoods = Object.assign([], this.state.editedCustomFoods);
	copyFoods[index] = foodObject;
	this.setState({editedCustomFoods: copyFoods});
	}

	handleOnChange = (event, index)=>{
	const copyFood = Object.assign({}, this.state.editedCustomFoods[index]);
	copyFood[event.target.name] = event.target.value;
	const copyFoods = Object.assign([], this.state.editedCustomFoods);
	copyFoods[index] = copyFood;

	this.setState({
		editedCustomFoods: copyFoods
	});
	
	}

	handleSearch = (event)=>{
	const searchResults = this.props.modalCustomFoods.filter(food=>{
		if(food.name.toLowerCase().includes(event.target.value)){
		return food;
		}
	});
	this.setState({editedCustomFoods: searchResults});
	}

	render(){
		console.log('PROPS', this.props);
		let fat = 0;
		let carb = 0;
		let protein = 0;
		this.props.dailyFoodIntake.forEach(food=>{
			fat += Number(food.fat);
			carb += Number(food.carb);
			protein += Number(food.protein);
		})
		return (
			<div className={`daily-intake ${this.state.showIntakePage ? 'show-intake-page' : null}`}>
				
                <GoalIntake fat={fat} carb={carb} protein={protein} showModal={this.state.showModal}/>
                <AmountIntake fat={fat} carb={carb} protein={protein}/>
				<div className="my-daily-intake">
					My Daily Intake
				</div>
				<div className="tab-tobegin">
					{this.props.dailyFoodIntake.length < 1 ? 'Tab add button to begin' : null}
				</div>
                <FoodIntake handleDeleteFood={this.handleDeleteFood} handleShowMenu={this.handleShowMenu} showMenu={this.state.showMenu} foods={this.props.dailyFoodIntake}/>
				
				<div className="add-button" onClick={this.handleShowModal}>
					<i className="material-icons">add</i>
				</div>

				<FoodModal 
				toggleActive={this.handleToggleActive} 
				customFoods={this.state.editedCustomFoods} 
				showModal={this.state.showModal} 
				handleHide={this.handleHideModal}
				addToDaily={this.handleAddToDaily}
				toggleEditing={this.handleToggleEditing}
				handleOnChange={this.handleOnChange}
				errorMessage={this.state.errorMessage}
				handleSearch={this.handleSearch} />
				
				<br/><br/><br/><br/><br/>
				
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log('daily intake list', state.dailyFoodIntake);
	return {
		dailyFoodIntake: state.dailyFoodIntake,
		modalCustomFoods: state.customFood.modalCustomFoods
	} 
}

export default connect(mapStateToProps, { deleteFood, addToDaily })(DailyIntake);