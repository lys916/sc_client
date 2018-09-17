import React from 'react';
import { connect } from 'react-redux';
import './styleMyFood.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createCustomFood, getCustomFoods, getSystemFoods,  deleteCustomFood } from '../actions/foodAction';

class MyFood extends React.Component {
	state = {
		name: '',
		measurement: 'cup',
		amount: 1,
		fat: '',
		carb: '',
		protein: '',
		showDropDown: false,
		showPage: false,
		systemFoods: this.props.systemFoods,
		selectedFood: null,
		showMenu: null,
		scratch: false
	}
	componentDidMount(){
		this.props.getCustomFoods(this.props.user._id);
		this.props.getSystemFoods();
		setTimeout(()=>{
			this.setState({showPage: true});
		},0);
	}
	handleOnChange = (event, type)=>{
		this.setState({[event.target.name]: event.target.value});

		if(event.target.value.length > 0 && type === 'search'){
			this.setState({selectedFood: null});
			const searchFoods = this.props.systemFoods.filter(food=>{
		
				if(food.name.toLowerCase().includes(event.target.value.toLowerCase())){
					return food;
				}
				return null;
			});

			const fromScratch = [{
				name: "No food available. CREATE FROM SCRATCH.",
				// measurements: ['cup', 'oz', 'gram', 'tsp', 'tbsp'],
				// cup: {fat: 0, carb: 0, protein: 0},
				// oz: {fat: 0, carb: 0, protein: 0},
				// gram: {fat: 0, carb: 0, protein: 0},
				// tsp: {fat: 0, carb: 0, protein: 0},
				// tbsp: {fat: 0, carb: 0, protein: 0}
			}]

			if(searchFoods.length > 0){
				this.setState({systemFoods: searchFoods, showDropDown: true});
			}else{
				this.setState({systemFoods: fromScratch, showDropDown: true});
			}
			
		}else{
			this.setState({showDropDown: false});
		}
		
		// calculate nutritient base on the amount input
		if(Number(event.target.value) > 0 && type === 'amount'){
			const { selectedFood, measurement } = this.state;
			let { fat, carb, protein } = selectedFood[measurement];
			fat = fat * Number(event.target.value);
			carb = carb * Number(event.target.value);
			protein = protein * Number(event.target.value);

			// trim float number
			if(fat.toString().includes('.')){
				fat = fat.toFixed(1);
			}
			if(carb.toString().includes('.')){
				carb = carb.toFixed(1);
			}
			if(protein.toString().includes('.')){
				protein = protein.toFixed(1);
			}

			this.setState({fat, carb, protein});
		}

		if(event.target.value === '' && type === 'amount'){
			this.setState({fat: 0, carb: 0, protein: 0});
		}
	}
	
	handleSelectFood = (food)=>{
		if(food.measurements){
			const {fat, carb, protein } = food[food.measurements[0]];
			this.setState({
				selectedFood: food, 
				name: food.name, 
				showDropDown: false,
				measurement: food.measurements[0],
				fat, carb, protein
			});
		}else{
			this.setState({scratch: true});
		}
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
		this.props.deleteCustomFood(id);
		this.setState({showMenu: null});
	}

	handleCreateFood = ()=>{
		const {name, measurement, fat, carb, protein, amount} = this.state;
		const user = this.props.user._id;
		this.props.createCustomFood({name, measurement, fat, carb, protein, user, amount})
		this.setState({showDropDown: false, scratch: false, name: '', selectedFood: null});
	}

	handleCancelCreateFood = ()=>{
		this.setState({scratch: false, name: '', showDropDown: false, selectedFood: null});
	}

	render(){
		return (
			<div className={`my-food ${this.state.showPage ? 'show-my-food-page' : null}`}>

			{/* SEARCH FOOD COMPONENT */}
			{ !this.state.scratch ? 
				<div className="search-food">
					<div className="food-title">Create New Food</div>
					<form>
						<input className="search-input" type="text" name="name" placeholder="Search Food Database" onChange={(e)=>{this.handleOnChange(e, 'search')}} autoComplete="off" value={this.state.name}/>

						{ this.state.selectedFood ? 
							<div className="amount">
								<input name="amount" value={this.state.amount} onChange={(e)=>{this.handleOnChange(e, 'amount')}} placeholder="Amount"/>

								<select className="select-measure" name="measurement" onChange={this.handleOnChange}>
									{ this.state.selectedFood.measurements.map(meas=>{
										return <option value={meas}>{meas}</option>
									})}
								</select>

							</div> 
							: 
							null
						}
					</form>
					<div className="drop-down">
					{	this.state.showDropDown ? 
						this.state.systemFoods.map(food=>{
							return (
								<div className="food" onClick={()=>{this.handleSelectFood(food)}}>{food.name}</div>
							)
						}) : null
					}
					</div>

					{ this.state.selectedFood && !this.state.scratch ? 
						<div className="nutritients">
							<div className="fat nutrient">
								<div className="title">Fat</div>
								<div className="amount">{this.state.fat}</div>
							</div>
							<div className="carb nutrient">
								<div className="title">Carb</div>
								<div className="amount">{this.state.carb}</div>
							</div>
							<div className="protein nutrient">
								<div className="title">Protein</div>
								<div className="amount">{this.state.protein}</div>
							</div>
						</div> : null
					}
					{ this.state.selectedFood && this.state.scratch ? 
						<div className="nutritients">
							<div className="fat nutrient">
								<div className="title">Fat</div>
								<div className="amount">
								
								<input name="fat" value={this.state.fat} onChange={this.handleOnChange} placeholder="Fat"/>
								
								</div>
							</div>
							<div className="carb nutrient">
								<div className="title">Carb</div>
								<div className="carb">
								<input name="carb" value={this.state.carb} onChange={this.handleOnChange} placeholder="Carb"/>
								</div>
							</div>
							<div className="protein nutrient">
								<div className="title">Protein</div>
								<div className="protein">
								<input name="protein" value={this.state.fat} onChange={this.handleOnChange} placeholder="Protein"/>
								</div>
							</div>
						</div> : null
					}

					{ this.state.selectedFood ? 
						<div>
						<div className="create-button" onClick={this.handleCreateFood}>
							Create
						</div>
						<div className="cancel-button" onClick={this.handleCancelCreateFood}>
							Cancel
						</div>
						</div> : null
					}
					<br/>
				</div> : null
			}



			{/* FROM SCRATCH FOOD COMPONENT */}
			{/* { this.state.scratch ? 
				<div className="search-food">
					<div className="food-title">Create New Food</div>
					<form>
						<input className="search-input" type="text" name="name" placeholder="Enter food name" onChange={this.handleOnChange} autoComplete="off" value={this.state.name}/>


						<div className="amount">
							<input name="amount" value={this.state.amount} onChange={this.handleOnChange} placeholder="Amount"/>

							<select className="select-measure" name="measurement" onChange={this.handleOnChange}>
								<option value="cup">cup</option>
								<option value="oz">oz</option>
								<option value="gram">gram</option>
								<option value="tsp">tsp</option>
								<option value="tbsp">tbsp</option>
								<option value="lb">lb</option>
							</select>
						</div> 
							
					</form>



						<div className="nutritients">
							<div className="fat nutrient">
								<div className="title">Fat</div>
								<div className="amount">
									<input name="fat" value={this.state.fat} onChange={this.handleOnChange} placeholder="Fat"/>
								</div>
							</div>
							<div className="carb nutrient">
								<div className="title">Carb</div>
								<div className="amount">
									<input name="carb" value={this.state.carb} onChange={this.handleOnChange} placeholder="Carb"/>
								</div>
							</div>
							<div className="protein nutrient">
								<div className="title">Protein</div>
								<div className="amount">
									<input name="protein" value={this.state.protein} onChange={this.handleOnChange} placeholder="Protein"/>
								</div>
							</div>
						</div>
						<div className="create-button" onClick={this.handleCreateFood}>
							Create
						</div>
						<div className="cancel-button" onClick={this.handleCancelCreateFood}>
							Cancel
						</div>
						
					<br/>
				</div> : null
			} */}




				{/* MY CUSTOM FOOD COMPONENT */}
				<div className="custom-foods">
					<div className="food-title">My Foods</div>
					<TransitionGroup>
            { this.props.customFoods.map((food, index)=>{
                return (
                    <CSSTransition key={food._id} timeout={300} classNames="fade">
                    <div className="food-intake">
                        <div className="food-header">
                            <div className="food-name">
                                {food.name} - {food.amount} {food.measurement}
                            </div>
                            <div className="food-cal">
                                {(food.fat * 9)+(food.carb*4)+(food.protein*4)} Cal.
                            </div>
                        </div>

                        <div className="food-nutrition">
                            <div className={`food-fcp ${this.state.showMenu === index ? 'move-food-fcp' : null}`}>
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
                            <div className={`edit-delete ${this.state.showMenu === index ? 'reset-z' : null}`}>
                                <div className={`edit`}>
                                    <i className="material-icons">edit</i>
                                </div>
                                <div className={`delete`} onClick={()=>{this.handleDeleteFood(food._id)}}>
                                    <i className="material-icons">delete</i>
                                </div>
                            </div>
                            <div className="more-vert" onClick={()=>{this.handleShowMenu(index)}}>
                                    <i className="material-icons">more_horiz</i>
                            </div>
                        </div>

                    </div>
                    </CSSTransition>
                )
            })}
            </TransitionGroup>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		customFoods: state.customFoods,
		systemFoods: state.systemFoods,
		user: state.user
	} 
}

export default connect(mapStateToProps, { createCustomFood, getCustomFoods, deleteCustomFood, getSystemFoods })(MyFood);