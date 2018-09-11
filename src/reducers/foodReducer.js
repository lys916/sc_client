

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

		// case 'SEARCH_CUSTOM_FOODS':
			// const searchResults = cacheCustomFoods.filter(food=>{
			// if(food.name.toLowerCase().includes(action.payload.toLowerCase())){
			// 	return food;
			// }
		// });

		// return searchResults;

		case 'GOT_CUSTOM_FOODS':
			action.payload.forEach(food=>{
				cacheCustomFoods.push({...food})
			});
			return action.payload;
		
		case 'DELETED_CUSTOM_FOOD':
			const deleted = state.filter(food=>{
				return food._id !== action.payload._id;
			});
			return deleted;

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

const systemFoods = [
	{
		name: 'Chicken Breast Cooked',
		measurements: ['cup', 'oz'],
		cup: {
			fat: 3,
			carb: 0,
			protein: 40
		},
		oz: {
			fat: 1,
			carb: 0,
			protein: 10
		},
		id: 1,
	},
	{
		name: 'Chicken Breast Raw',
		measurements: ['cup', 'oz'],
		cup: {
			fat: 4,
			carb: 0,
			protein: 45
		},
		oz: {
			fat: 1,
			carb: 0,
			protein: 10
		},
		id: 2,
	},
	{
		name: 'brocolli cooked',
		measurements: ['cup'],
		cup: {
			fat: .3,
			carb: 10,
			protein: 1
		},
		id: 3,
	}
];

const systemFoodReducer = (state = systemFoods, action) => {
	switch (action.type) {
		case 'GOT_SYSTEM_FOODS':
			return action.payload;
		default:
			return state;
	}
};


export { customFoodReducer, dailyFoodIntakeReducer, systemFoodReducer }
