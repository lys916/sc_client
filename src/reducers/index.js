import { combineReducers } from 'redux';
// import { VenueReducer, ItemReducer } from './venue';
import { customFoodReducer, dailyFoodIntakeReducer, systemFoodReducer } from './foodReducer';
import userReducer from './userReducer';
import otherReducer from './otherReducer';

const rootReducer = combineReducers({
    customFoods: customFoodReducer,
    dailyFoodIntake: dailyFoodIntakeReducer,
    user: userReducer,
    systemFoods: systemFoodReducer,
    others: otherReducer
});

export default rootReducer;
