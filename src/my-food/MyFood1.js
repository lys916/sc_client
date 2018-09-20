import React from 'react';
import { connect } from 'react-redux';
import { searchCustomFoods } from '../actions/foodAction';
import './styleMyFood1.css';

class MyFood1 extends React.Component {

	state = {
		showMenu: null
	}
	
	handleSearch = (event)=>{
		this.props.searchCustomFoods(event.target.value);
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

	render(){
		return (
			<div className="mf">
					<div className="sticky">
					{/* SEARCH COMPONENT */}
					<div className="search">
						<input placeholder="Search" onChange={this.handleSearch}/>
						<i className="material-icons">search</i>
					</div>

                <div className="title">
                    <div className="nut align-left">Amount</div>
                    <div className="nut">Fat</div>
                    <div className="nut">Carb</div>
                    <div className="nut">Protein</div>
                    <div className="nut">Calories</div>
                </div>
					 </div>
					 { this.props.customFoods.map((food, index)=>{
						 let cal = (food.fat * 9)+(food.carb*4)+(food.protein*4);
                    return (
							  <div style={{position: 'relative'}}>
                        <div className={`food ${this.state.showMenu === index ? 'move-food' : null}`}>

                            <div className={`food-name align-left`}>
									 	<div className="add">
                            		<i className="material-icons add inline float-left">add_circle_outline</i>
                              </div>
										<div className="text inline float-left">
											{food.name}<span> +2</span></div>
										<div className="arrow" onClick={()=>{this.handleShowMenu(index)}}>
                              	<i className="material-icons arrow float-right inline">arrow_back</i>
										</div>
                            </div>

                            <div className="amounts">
                                <div className="amount align-left">1 cup</div>
                                <div className="amount">{food.fat}</div>
                                <div className="amount">{food.carb}</div>
                                <div className="amount">{food.protein}</div>
                                <div className="amount"> {Math.ceil((food.fat * 9)+(food.carb*4)+(food.protein*4))}</div>
                            </div>
                        </div>
								{/* MENU */}
								<div className={`menu ${this.state.showMenu === index ? 'z-1' : 'reset-z'}`}>
								<div className={`edit icon`}>
									 <i className="material-icons">create</i>
									 <div className="menu-text">Edit</div>
								</div>
								<div className={`delete icon`} onClick={()=>{this.handleDeleteFood(food._id)}}>
									 <i className="material-icons">delete_outline</i>
									 <div className="menu-text">Delete</div>
								</div>
						  </div>
						  </div>
                    );
					 })}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
        customFoods: state.customFoods
	} 
}

export default connect(mapStateToProps, { searchCustomFoods })(MyFood1);