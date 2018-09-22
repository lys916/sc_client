import React from 'react';
import { connect } from 'react-redux';
import SearchBar from '../search-bar/SearchBar';
import { searchCustomFoods, addToDaily, deleteCustomFood } from '../actions/foodAction';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Loader from '../loader/Loader';
import './styleMyFood1.css';

function getDateString(diffDay = 0) {
	const date = new Date();
	const day = date.getDate() + diffDay;
	const month = date.getMonth();
	const year = date.getFullYear();
	const currentDate = day.toString() + (month + 1).toString() + year.toString();
	return currentDate;
}

class MyFood1 extends React.Component {

	state = {
		showMenu: null,
		day: 0,
		adding: null
	}



	handleShowMenu = (index) => {
		const i = this.state.showMenu;
		if (i === null || i !== index) {
			this.setState({ showMenu: index });
		}
		if (i === index) {
			this.setState({ showMenu: null });
		}
	}

	handleSearch = (event) => {
		this.props.searchCustomFoods(event.target.value);
	}

	handleAddToDaily = (food, index) => {
		const toAdd = {
			name: food.name,
			measurement: food.measurement,
			fat: food.fat,
			carb: food.carb,
			protein: food.protein,
			amount: food.amount,
			dateString: getDateString(this.state.day),
			userName: this.props.user.username
		}
		this.setState({ adding: index }, () => {
			this.props.addToDaily(toAdd);
		});
		// let selected = false;
		// const foods = this.props.customFoods;
		// // checking to see if there is any food selected
		// for(let i = 0; i<foods.length; i++){
		// 	if(foods[i].active){
		// 		selected = true;
		// 		break;
		// 	}
		// }

		// if(selected){
		// 	// parse out the selected food
		// 	const selectedFoods = []
		// 	this.props.customFoods.forEach(food=>{
		// 		if(food.active){
		// 			selectedFoods.push({
		// 				name: food.name,
		// 				measurement: food.measurement,
		// 				fat: food.fat,
		// 				carb: food.carb,
		// 				protein: food.protein,
		// 				amount: food.amount,
		// 				dateString: getDateString(this.state.day),
		// 				userName: this.props.user.username
		// 			});
		// 		}
		// 	});
		// 	this.props.addToDaily(selectedFoods);
		// 	this.setState({showModal: false, errorMessage: null});
		// }else{
		// 	this.setState({errorMessage: 'Atleast 1 food must be selected.'});
		// }
	}

	resetAdding = () => {
		setTimeout(() => { this.setState({ adding: null }) }, 2000);
	}

	handleDeleteFood = (id) => {
		this.props.deleteCustomFood(id);
		this.setState({ showMenu: null });
	}

	render() {
		// const custom = this.props.customFoods;

		// const cus = this.props.dailyFoods.map(food=>{
		// 	console.log(food.name);
		// 	for(let i = 0; i < custom.length; i++){
		// 		if(food.name === custom[i].name){
		// 			alert(food.name);
		// 			if(custom[i].add){
		// 				alert('have add');
		// 				return {...custom[i], add: custom[i].add + 1}
		// 			}else{
		// 				alert('have no add');
		// 				return {...custom[i], add: 1}
		// 			}
		// 		}
		// 		break;
		// 	}
		// 	return null;
		// });
		// console.log('custom after', cus);

		return (
			<div className="mf">
				<div className="sticky">
					<SearchBar handleSearch={this.handleSearch} />
					<div className="title">
						<div className="nut align-left">Amount</div>
						<div className="nut">Fat</div>
						<div className="nut">Carb</div>
						<div className="nut">Protein</div>
						<div className="nut">Calories</div>
					</div>
				</div>
				<TransitionGroup>
					{this.props.customFoods.map((food, index) => {

						return (
							<CSSTransition key={food._id} timeout={400} classNames="fade">
							

								<div style={{ position: 'relative' }}>
									{this.props.others.addingToDaily && this.state.adding === index ? <Loader style={{ marginTop: '3px' }} message={'Adding...'}/> : null}

									{/* <div className={`you-added ${this.props.others.addedToDaily && this.state.adding === index ? 'show-you-added' : 'hide-you-added'}`}>Added to daily intake</div> */}
									
									{/* <div className={`you-added ${this.props.others.addedToDaily && this.state.adding === index ? 'show-you-added' : 'hide-you-added'}`}>Added to daily intake</div>

									{this.props.others.addedToDaily && this.state.adding === index ?
										<div>
											{this.resetAdding()}
										</div> : null} */}


									<div className={`food ${this.state.showMenu === index ? 'move-food' : null}`}>
										<div className={`food-name align-left`}>

											<div onClick={() => { this.handleAddToDaily(food, index) }} className="add">
												<i className="material-icons addt">add_circle_outline</i>
											</div>

											<div className="text" onClick={() => { this.handleShowMenu(index) }}>
												{food.name}<span> {food.add ? `+${food.add}` : null}</span>
											</div>

											<div className="arrow" onClick={() => { this.handleShowMenu(index) }}>
												<i className={`material-icons arrow ${this.state.showMenu === index ? 'rotate-i' : null}`}>arrow_back</i>
											</div>

										</div>

										<div className="amounts">
											<div className="amount align-left">{food.amount} {food.measurement}</div>
											<div className="amount">{food.fat}</div>
											<div className="amount">{food.carb}</div>
											<div className="amount">{food.protein}</div>
											<div className="amount"> {Math.ceil((food.fat * 9) + (food.carb * 4) + (food.protein * 4))}</div>
										</div>
									</div>

									{/* MENU */}
									<div className={`menu reset-z ${this.state.showMenu === index ? 'z-1' : null}`}>
										<div className={`edit icon`}>
											<i className="material-icons">create</i>
											<div className="menu-text">Edit</div>
										</div>
										<div className={`delete icon`} onClick={() => { this.handleDeleteFood(food._id) }}>
											<i className="material-icons">delete_outline</i>
											<div className="menu-text">Delete</div>
										</div>
									</div>
								</div>
							</CSSTransition>
						);

					})}
				</TransitionGroup>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		customFoods: state.customFoods,
		dailyFoods: state.dailyFoodIntake,
		others: state.others
	}
}

export default connect(mapStateToProps, { searchCustomFoods, addToDaily, deleteCustomFood })(MyFood1);