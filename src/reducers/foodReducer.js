

// import { } from '../actions/foodAction';

let cacheCustomFoods = [];
const customFoodReducer = (state = [], action) => {

	switch (action.type) {
		
		case 'TOGGLE_ACTIVE':
			const copyActive = state.map(food=>{

				if(food._id === action.payload){
					food.active = !food.active;
					return food;
				}
				return food;
			});

			return copyActive;

		case 'TOGGLE_EDITING':
			const copyEditing = state.map(food=>{
				if(food._id === action.payload){
					food.editing = !food.editing;
					return food;
				}else{
					food.editing = false;
				}
				return food;
			});

			return copyEditing;

		case 'AMOUNT_ON_CHANGE':
			const copyOnChange = state.map(food=>{
				if(food._id === action.payload._id){
					food[action.payload.name] = action.payload.value;
					return food;
				}
				return food;
			});
			return copyOnChange;

		case 'RESET_TOGGLE':
			const resetToggle = state.map(food=>{
				food.editing = false;
				food.active = false;
				return food;
			});
			return resetToggle;

		case 'CREATED_CUSTOM_FOOD':
			return [...state, action.payload]

		case 'SEARCH_CUSTOM_FOODS':
			console.log('SEARCH TERM', action.payload);
			if(action.payload === ''){
				console.log('BLANK');
				return cacheCustomFoods;
			}
			const searchResults = cacheCustomFoods.filter(food=>{
			if(food.name.toLowerCase().includes(action.payload.toLowerCase())){
				console.log('SEARCH FOUND!!');
				return food;
			}
		});

		return searchResults;

		case 'GOT_CUSTOM_FOODS':
			const preCache = action.payload.map(food=>{
				return {...food};
			});
			cacheCustomFoods = preCache;
			console.log('INITIAL CACHE', cacheCustomFoods);
			return action.payload;
		
		case 'DELETED_CUSTOM_FOOD':
			const deleted = state.filter(food=>{
				return food._id !== action.payload._id;
			});
			return deleted;

			case 'UPDATED_CUSTOM_FOOD':
			const updated = state.map(food=>{
				if(food._id === action.payload._id){
					return action.payload;
				}
				return food;
			});
			return updated;

		default:
			return state;
	}
};

const dailyFoodIntakeReducer = (state = [], action) => {
	switch (action.type) {

		case 'GOT_DAILY_FOODS': 
			return action.payload;

		case 'ADDED_TO_DAILY':
			return state.concat(action.payload);

		case 'DELETED_DAILY_FOOD':
			const deleted = state.filter(food=>{
				return food._id !== action.payload._id;
			});
			return deleted;
		default:
			return state;
	}
};

const systemFoods = [];

const systemFoodReducer = (state = systemFoods, action) => {
	switch (action.type) {
		case 'GOT_SYSTEM_FOODS':

			return action.payload;

		case 'ADDED_SYSTEM_FOOD':
			console.log('added system food', action.payload);
			return [...state, action.payload]

		default:
			return state;
	}
};


export { customFoodReducer, dailyFoodIntakeReducer, systemFoodReducer }
