import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {deleteFood} from '../actions/foodAction';

import { connect } from 'react-redux';

class FoodIntake extends React.Component {
	state = {
		showMenu: null
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
		console.log('id', id);
		this.props.deleteFood(id);
		this.setState({showMenu: null});
	}

	render() {
		return (
			<div className="mf" style={{position: 'relative'}}>
               <div className="title" style={{position: 'sticky', top: '199px', borderTop: '1px solid #dedede', zIndex: '2', background: 'white'}}>
                  <div className="nut align-left">Amount</div>
                  <div className="nut">Fat</div>
                  <div className="nut">Carb</div>
                  <div className="nut">Protein</div>
                  <div className="nut">Calories</div>
				</div>
				{!this.props.isLoading ?
					<TransitionGroup>
						{this.props.dailyFoods.map((food, index) => {
							return (
								<CSSTransition key={food._id} timeout={300} classNames="fade">
									<div style={{ position: 'relative' }}>
										<div className={`food ${this.state.showMenu === index ? 'move-food' : null}`}>
											<div className="food-name align-left">

												{/* <div className="add">
													<i className="material-icons addt">add_circle_outline</i>
												</div> */}

												<div className="text" onClick={() => { this.handleShowMenu(index) }}>
													{food.name}
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
											<div className={`edit icon`} onClick={() => {  }}>
												<i onClick={() => {  }} className="material-icons">create</i>
												<div className="menu-text">Edit</div>
											</div>
											<div className={`delete icon`} onClick={() => { this.handleDeleteFood(food._id) }}>
												<i className="material-icons">delete_outline</i>
												<div className="menu-text">Delete</div>
											</div>
										</div>
									</div>
								</CSSTransition>
							)
						})}
					</TransitionGroup>
					:
					<div className="spinner-gif"><img src="./spinner.gif" /></div>
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		dailyFoods: state.dailyFoodIntake,
		// customFoods: state.customFoods,
		// user: state.user,
		isLoading: state.others.isLoading
	}
}

export default connect(mapStateToProps, {deleteFood})(FoodIntake);

{/* <div className="food-intake">
                        <div className="food-header">
                            <div className="food-name">
                                {food.name} - {food.amount} {food.measurement}
                            </div>
                            <div className="food-cal">
                                {(food.fat * 9)+(food.carb*4)+(food.protein*4)} Cal.
                            </div>
                        </div>

                        <div className="food-nutrition">
                            <div className={`food-fcp ${showMenu === index ? 'move-food-fcp' : null}`}>
                                <div className="nutrition-name">
                                    <div className="food-cell">Fat</div>
                                    <div className="food-cell">Carb</div>
                                    <div className="food-cell">Protein</div>
                                </div>
                                <div className="nutrition-amount">
                                    <div className="food-cell">{food.fat}</div>
                                    <div className="food-cell">{food.carb}</div>
                                    <div className="food-cell">{food.protein}</div>
                                </div>
                            </div>
                            <div className={`edit-delete ${showMenu === index ? 'reset-z' : null}`}>
                                <div className={`edit`}>
                                    <i className="material-icons">edit</i>
                                </div>
                                <div className={`delete`} onClick={()=>{handleDeleteFood(food._id)}}>
                                    <i className="material-icons">delete</i>
                                </div>
                            </div>
                            <div className="more-vert" onClick={()=>{handleShowMenu(index)}}>
                                    <i className="material-icons">more_horiz</i>
                            </div>
                        </div>

                    </div> */}