import React from 'react';
import { connect } from 'react-redux';
import { addSystemFood } from '../actions/foodAction';
import { Link } from 'react-router-dom';
import Loader from '../loader/Loader';
import './styleAdmin.css';
const units = ['cup', 'oz', 'tbsp', 'tsp', 'gram', 'lb', 'scoop', 'inch', 'medium', 'large', 'small'];

class Admin extends React.Component {
  state = {
    systemFoods: this.props.systemFoods, 
    name: '',
    selectedFood: null,
    showDropDown: false,
    measurement: 'cup',
	amount: 1,
	fat: '',
	carb: '',
    protein: '',
    scratch: false,
    addingNewUnit: false,
    newUnit: '',
    newFat: '',
    newCarb: '',
    newProtein: '',
	 editingUnit: null,
	 addingNewFood: false
  }

//   handleSignIn = () => {
//       this.props.signIn(this.state, this.props.history);
//   }

//   handleOnChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   }

redirectUser = ()=>{
  console.log('redirecting');
    setTimeout(()=>{
        this.props.history.push('/');
    }, 2000);
}

handleOnChange = (event, type)=>{
	if(!type){
		this.setState({[event.target.name]: event.target.value});
	}
	else if(event.target.value.length > 0 && type === 'search'){
		this.setState({[event.target.name]: event.target.value, selectedFood: null});
   	const searchFoods = this.props.systemFoods.filter(food=>{
  
      if(food.name.toLowerCase().includes(event.target.value.toLowerCase())){
        return food;
      }
      return null;
    });

    const fromScratch = [{
      name: "ADD NEW SYSTEM FOOD",
      // measurements: ['cup', 'oz', 'gram', 'tsp', 'tbsp'],
      // cup: {fat: 0, carb: 0, protein: 0},
      // oz: {fat: 0, carb: 0, protein: 0},
      // gram: {fat: 0, carb: 0, protein: 0},
      // tsp: {fat: 0, carb: 0, protein: 0},
      // tbsp: {fat: 0, carb: 0, protein: 0}
    }]

    if(searchFoods.length > 0){
      this.setState({systemFoods: searchFoods.slice(0, 10), showDropDown: true, addingNewFood: false});
    }else{
      this.setState({systemFoods: [], showDropDown: false, addingNewFood: true});
    }
    
  }else{
    this.setState({showDropDown: false, name: ''});
  }

}

  handleSelectFood = (food)=>{
    if(food.measurements){
      this.setState({
		  selectedFood: food,
		  showDropDown: false,
		  name: food.name
      });
    }else{
      this.setState({addingNewFood: true, name: ''});
    }
  }

	toggleAddNewUnit = ()=>{
		this.setState({addingNewUnit: !this.state.addingNewUnit});
	}

	handleEditUnit = (unit)=>{
		this.setState({editingUnit: unit});
	}

	handleSaveEditUnit = ()=>{
		// send new unit to db for update
		this.setState({editingUnit: null});
	}

	handleSaveNewFood = ()=>{
		// save new food
		console.log(this.state);
		const newFood = {
			name: this.state.name,
			measurements: [this.state.measurement],
			[this.state.measurement]: {
				fat: this.state.newFat,
				carb: this.state.newCarb,
				protein: this.state.newProtein
			}
		}

		this.props.addSystemFood(newFood);
		this.setState({addingNewFood: false, name: ''});
	}
	onChangeEditFood = (event)=>{
		console.log('editing', this.state.selectedFood[this.state.editingUnit]);
		const {selectedFood, editingUnit} = this.state;
		const updatedSelectedFood = {...selectedFood, [editingUnit]: {...selectedFood[editingUnit], [event.target.name]:event.target.value}}
		this.setState({
			selectedFood: updatedSelectedFood
		});
	}

  render() {
	 console.log('SELECTED FOOD', this.state.selectedFood);
	 console.log('editing unit', this.state.editingUnit);
    return (
      <div className="admin">
        { this.props.user.admin ? 
          <div>
				 <div>
					Total systom food: {this.props.systemFoods.length}
				</div>
            <form>
						  <input className="search-input" type="text" name="name" placeholder="Enter to add or edit system food" onChange={(e)=>{this.handleOnChange(e, 'search')}} autoComplete="off" value={this.state.name}/>
            </form>

				{/* ADDING NEW FOOD COMPONENT */}
				{this.state.addingNewFood ? 
					<div className="admin-nutrition">
						<div className="unit">
						1 <select className="select-measure" name="measurement" onChange={this.handleOnChange}>
							{units.map(unit=>{
								return (
									<option value={unit}>{unit}</option>
								);
							})}
							</select>
						</div>
						<br/>
						Fat: <input name="newFat" value={this.state.newFat} onChange={this.handleOnChange}/>
						Carb: <input name="newCarb" value={this.state.newCarb} onChange={this.handleOnChange}/>
						Protein: <input name="newProtein" value={this.state.newProtein} onChange={this.handleOnChange}/>
						<br/><br/>
						<button onClick={this.handleSaveNewFood}>Save</button>
					</div> 
					: 
					null
				}
            
            { this.state.selectedFood ? 
							// IF FOOD IS SELECTED, SHOW THE AMOUNT AND MEASUREMENT ELEMENTS
							<div className="admin-custom-food">
                {this.state.selectedFood.measurements.map(mea=>{
                  
                  return (
                    <div className="admin-nutrition">
                      <div className="unit">1 {mea}</div>
                      <div className="nuts">

                        Fat: <input name="fat" onChange={this.onChangeEditFood} disabled={this.state.editingUnit === mea ? null : 'true'} value={this.state.selectedFood[mea].fat}/> 

                        Carb: <input disabled={this.state.editingUnit === mea ? null : 'true'} value={this.state.selectedFood[mea].carb}/>
                        Protein: <input disabled={this.state.editingUnit === mea ? null : 'true'} value={this.state.selectedFood[mea].protein}/>
                        <br/><br/>
                        {this.state.editingUnit === mea ?
									<button onClick={this.handleSaveEditUnit}>Save</button> 
									: 
									<button onClick={()=>{this.handleEditUnit(mea)}}>Edit</button>}
                        
                      </div>
                    </div>
                  );
                })}
                
                {this.state.addingNewUnit ? 
                <div className="admin-nutrition">
                  <div className="unit">
                  1 <select className="select-measure" name="measurement" onChange={this.handleOnChange}>
                      { units.map(unit=>{
                        return (
                          !this.state.selectedFood[unit] ? <option value={unit}>{unit}</option> : null
                        );
                      })}
                    </select>
                  </div>
                  <div className="nuts">
                    Fat: <input placeholder="#"/>
                    Carb: <input placeholder="#"/>
                    Protein: <input placeholder="#"/><br/><br/>
                    <button onClick={this.toggleAddNewUnit}>Cancel</button>
                    <button>Save</button>
                  </div>
                  
                </div> 
                : null
                }

                <button onClick={this.toggleAddNewUnit}>Add new unit</button>
							</div> 
							: 
							null
            }
            
				{/* DROP DOWN LIST */}
            <div className="drop-down">
            {	this.state.showDropDown ? 
              this.state.systemFoods.map(food=>{
                return (
                  <div className="food" key={food._id} onClick={()=>{this.handleSelectFood(food)}}>{food.name}</div>
                )
              }) : null
            }

            { this.state.selectedFood ?
              // IF FOOD IS SELECTED, SHOW CREATE AND CANCEL BUTTON
              <div>
                <div className="create-button" onClick={this.handleCreateFood}>
                  Create
                </div>
                <div className="cancel-button" onClick={this.handleCancelCreateFood}>
                  Cancel
                </div>
              </div> : null
            }
          
					</div>
          </div> 
          : 
          <div>You are not an admin. Redirecting...{ this.redirectUser() }</div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    systemFoods: state.systemFoods
  } 
}

export default connect(mapStateToProps, {addSystemFood})(Admin);