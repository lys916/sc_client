import uuidv1 from 'uuid/v1';
import { toggleEditing } from '../actions/foodAction';
// import { } from '../actions/foodAction';

const customFoods = [
	{
		name: 'Chicken Breast',
		amount: 1,
		measurement: 'cup',
		fat: 3,
		carb: 0,
		protein: 45,
		id: 1,
		active: false,
		editing: false
	},
	{
		name: 'Brocolli',
		amount: 1,
		measurement: 'cup',
		fat: 0.2,
		carb: 15, 
		protein: 1,
		id: 2,
		active: false,
		editing: false
	},
	{
		name: 'Coconut',
		amount: 1,
		measurement: 'cup',
		fat: 0.2,
		carb: 15, 
		protein: 1,
		id: 3,
		active: false,
		editing: false
	},
	{
		name: 'Medium white rice',
		amount: 1,
		measurement: 'cup',
		fat: 0.2,
		carb: 41, 
		protein: 1,
		id: 4,
		active: false,
		editing: false
	},{
		name: 'Protein shake',
		amount: 1,
		measurement: 'scoop',
		fat: 3,
		carb: 2,
		protein: 35,
		id: 5,
		active: false,
		editing: false
	},{
		name: 'Chicken Breast',
		amount: 1,
		measurement: 'cup',
		fat: 3,
		carb: 0,
		protein: 45,
		id: 1,
		active: false,
		editing: false
	},
	{
		name: 'Brocolli',
		amount: 1,
		measurement: 'cup',
		fat: 0.2,
		carb: 15, 
		protein: 1,
		id: 2,
		active: false,
		editing: false
	},
	{
		name: 'Coconut',
		amount: 1,
		measurement: 'cup',
		fat: 0.2,
		carb: 15, 
		protein: 1,
		id: 3,
		active: false,
		editing: false
	},
	{
		name: 'Medium white rice',
		amount: 1,
		measurement: 'cup',
		fat: 0.2,
		carb: 41, 
		protein: 1,
		id: 4,
		active: false,
		editing: false
	},{
		name: 'Protein shake',
		amount: 1,
		measurement: 'scoop',
		fat: 3,
		carb: 2,
		protein: 35,
		id: 5,
		active: false,
		editing: false
	},{
		name: 'Chicken Breast',
		amount: 1,
		measurement: 'cup',
		fat: 3,
		carb: 0,
		protein: 45,
		id: 1,
		active: false,
		editing: false
	},
	{
		name: 'Brocolli',
		amount: 1,
		measurement: 'cup',
		fat: 0.2,
		carb: 15, 
		protein: 1,
		id: 2,
		active: false,
		editing: false
	},
	{
		name: 'Coconut',
		amount: 1,
		measurement: 'cup',
		fat: 0.2,
		carb: 15, 
		protein: 1,
		id: 3,
		active: false,
		editing: false
	},
	{
		name: 'Medium white rice',
		amount: 1,
		measurement: 'cup',
		fat: 0.2,
		carb: 41, 
		protein: 1,
		id: 4,
		active: false,
		editing: false
	},{
		name: 'Protein shake',
		amount: 1,
		measurement: 'scoop',
		fat: 3,
		carb: 2,
		protein: 35,
		id: 5,
		active: false,
		editing: false
	},{
		name: 'Chicken Breast',
		amount: 1,
		measurement: 'cup',
		fat: 3,
		carb: 0,
		protein: 45,
		id: 1,
		active: false,
		editing: false
	},
	{
		name: 'Brocolli',
		amount: 1,
		measurement: 'cup',
		fat: 0.2,
		carb: 15, 
		protein: 1,
		id: 2,
		active: false,
		editing: false
	},
	{
		name: 'Coconut',
		amount: 1,
		measurement: 'cup',
		fat: 0.2,
		carb: 15, 
		protein: 1,
		id: 3,
		active: false,
		editing: false
	},
	{
		name: 'Medium white rice',
		amount: 1,
		measurement: 'cup',
		fat: 0.2,
		carb: 41, 
		protein: 1,
		id: 4,
		active: false,
		editing: false
	},{
		name: 'Protein shake',
		amount: 1,
		measurement: 'scoop',
		fat: 3,
		carb: 2,
		protein: 35,
		id: 5,
		active: false,
		editing: false
	}
	];
	const initCustom = {originalCustomFoods: customFoods, modalCustomFoods: customFoods};

	const customFoodReducer = (state = initCustom, action) => {
		switch (action.type) {
			// case 'RESET_ACTIVE':
			// 	// reset state active
			// 	const copyFood = Object.assign([], state.modalCustomFoods);
			// 	copyFood.forEach(food=>{
			// 		food.active = false;
			// 	});
			// 	return {...state, modalCustomFoods: copyFood}

			// case 'TOGGLE_ACTIVE':
			// 	const toggleActive = state.modalCustomFoods.map(food=>{
			// 		if(food.id === action.payload){
			// 			food.active = !food.active
			// 		}
			// 		return food;
			// 	});
			// 	return {...state, modalCustomFoods: toggleActive}

			// case 'TOGGLE_EDITING':
			// 	const toggleEditing = state.modalCustomFoods.map(food=>{
			// 		if(food.id === action.payload){
			// 			food.editing = !food.editing
			// 		}
			// 		return food;
			// 	});
			// 	return {...state, modalCustomFoods: toggleEditing}

			default:
				return state;
		}
	};

const dailyIntake = [
];

const dailyFoodIntakeReducer = (state = dailyIntake, action) => {
	switch (action.type) {
		case 'ADD_TO_DAILY':
			const copyState = [...state]
			action.payload.forEach(food=>{
				if(food.active){
					const { name, amount, measurement, fat, carb, protein } = food
					const newFood = {
						name,
						amount,
						measurement,
						fat,
						carb,
						protein,
						id: uuidv1()
					}
					copyState.unshift(newFood);
				}
			});
			return copyState;

		case 'DELETE_INTAKE':
			const deleted = state.filter(food=>{
				return food.id !== action.payload;
			});
			return deleted;
		default:
			return state;
	}
};

// const initItem = {
// 	allItems: [],
// 	autoCompleteItems: [],
// 	searchLoading: false,
// 	searchItems: [],
// 	nearbyItems: [],
// 	nearbyLoading: false,
// 	menuLoading: false,
// 	menu: [],
// 	addingPhoto: false,
// 	itemLoading: true,
// 	viewItem: {place:{}, photos:[{}], reviews: [], totalRatings: null, loc: {coordinates: []}}
// }

// const ItemReducer = (state = initItem, action) => {
// 	switch (action.type) {
// 		case 'FETCHED_ITEMS':
// 			return {...state, allItems: action.payload}

// 		case 'GOT_MENU':
// 			return {...state, menu: action.payload, menuLoading: false}

// 		case 'GOT_ITEM':
// 			return {...state, viewItem: action.payload, itemLoading: false}

// 		case 'MENU_LOADING':
// 			return {...state, menuLoading: true}

// 		case 'ITEM_LOADING':
// 			return {...state, itemLoading: true}

// 		case 'NEARBY_LOADING':
// 			return {...state, nearbyLoading: true}

// 		case 'NEARBY_ITEMS':
// 			return {...state, nearbyItems: action.payload, nearbyLoading: false}

// 		case 'NEARBY_DISTANCE':
// 		const copyNearby = Object.assign([], state.nearbyItems);
// 			copyNearby.forEach((item, index)=>{
// 				item.distance = action.payload[index]
// 			});
// 			return {...state, nearbyItems: copyNearby}

// 		case 'SEARCH_LOADING':
// 			return {...state, searchLoading: true}

// 		case 'SEARCHED_ITEMS':
// 			return {...state, searchItems: action.payload, photoLoading: false, searchLoading: false}

// 		case 'UPDATED_ITEM':
// 			return {...state, viewItem: action.payload, addingPhoto: false}


// 		default:
// 			return state;
// 	}
// };


export { customFoodReducer, dailyFoodIntakeReducer }
