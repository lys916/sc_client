import { combineReducers } from 'redux';
// import { VenueReducer, ItemReducer } from './venue';
import { customFoodReducer, dailyFoodIntakeReducer } from './foodReducer';

console.log('com', combineReducers);

const rootReducer = combineReducers({
    customFood: customFoodReducer,
    dailyFoodIntake: dailyFoodIntakeReducer
});

export default rootReducer;
