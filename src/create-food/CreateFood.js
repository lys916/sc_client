import React from 'react';
import { connect } from 'react-redux';
import SearchBar from '../search-bar/SearchBar';
import List from './List';
import CreateForm from './CreateForm';
import SelectedFood from './SelectedFood';
import {createCustomFood} from '../actions/foodAction';

import './styleCreateFood.css';
import '../my-food/styleMyFood.css';
class CreateFood extends React.Component {
    state = {
		showPage: false,
		selectedFood: null,
		showList: false,
		systemFoods: this.props.systemFoods,
		creating: false,
		name: '',
		measurement: 'cup',
		amount: '1',
		fat: '',
		carb: '',
		protein: '',
		searchTerm: ''
    }
    componentDidMount(){
		setTimeout(()=>{
			this.setState({showPage: true});
		},0);
	}

	handleSearch = (event)=>{
		this.setState({searchTerm: event.target.value});
		if(event.target.value.length > 0){
			this.setState({selectedFood: null});
			const searchFoods = this.props.systemFoods.filter(food=>{
		
				if(food.name.toLowerCase().includes(event.target.value.toLowerCase())){
					return food;
				}
				return null;
			});

			const fromScratch = [{
				name: "No food available from your search",
			}]

			if(searchFoods.length > 0){
				this.setState({systemFoods: searchFoods.slice(0, 10), showList: true});
			}else{
				this.setState({systemFoods: fromScratch, showList: true});
			}
			
		}else{
			this.setState({showList: false});
		}
	}

	handleSelectFood = (food)=>{
		if(food.measurements){
			const {fat, carb, protein } = food[food.measurements[0]];
			this.setState({
				selectedFood: food, 
				name: food.name, 
				showList: false,
				measurement: food.measurements[0],
				fat, carb, protein,
				searchTerm: '',
				creating: true
			});
		}else{
			this.setState({
				creating: true, 
				searchTerm: '', 
				showList: false,
				name: '',
				fat: '', carb: '', protein: ''
			});
		}
	}

	handleOnChange = (event)=>{
		console.log(event.target.value);
		this.setState({[event.target.name]: event.target.value});
	}

	handleCancelCreate = ()=>{
		this.setState({creating: false, selectedFood: false})
	}

	handleCreateFood = (event)=>{
		event.preventDefault();
		const {name, measurement, fat, carb, protein, amount} = this.state;
		const user = this.props.user._id;
		this.props.createCustomFood({name, measurement, fat, carb, protein, user, amount})
		this.setState({showList: false, creating: false, name: '', selectedFood: null});
	}

	render(){
		console.log('state system food', this.state.systemFoods);
		return (
			<div className={`cf ${this.state.showPage ? 'show-create-page' : null}`}>
            <SearchBar handleSearch={this.handleSearch} searchTerm={this.state.searchTerm}/>
				<br/>
				{this.state.showList ? 
				<List list={this.state.systemFoods} handleSelectFood={this.handleSelectFood}/>
				: null }

				


				{/* Should change this component to smart component */}
				{this.state.creating || this.props.others.creatingCustomFood ?
					<CreateForm
						handleCreateFood={this.handleCreateFood}
						handleOnChange={this.handleOnChange}
						handleCancelCreate={this.handleCancelCreate}
						handleCreateFood={this.handleCreateFood} 
						fat={this.state.fat} carb={this.state.carb} 
						protein={this.state.protein} 
						amount={this.state.amount}
						name={this.state.name}
						creating={this.props.others.creatingCustomFood}/>
						: null
				}


				{this.state.creating ? 
						<div></div> 
						: 
						<button onClick={()=>{this.setState({creating: true, searchTerm: '', showList: false, name: this.state.searchTerm})}}>Create food manually</button>}
				
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		systemFoods: state.systemFoods,
		others: state.others
	} 
	
}

export default connect(mapStateToProps, { createCustomFood })(CreateFood);