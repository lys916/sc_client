
import {  } from '../actions/userAction';
import {  } from '../actions/foodAction';

const initOthers = {
    isLoading: false,
	loadingMessage: null,
	loadingCustomFood: false
}

const otherReducer = (state = initOthers, action) => {
	switch (action.type) {

		case 'SIGNING_UP':
			return {...state, isLoading: true, loadingMessage: 'Signing up...'}
			
		case 'SIGNED_UP': 
			return {...state, isLoading: false, loadingMessage: null}

		case 'LOGGING_IN':
			return {...state, isLoading: true, loadingMessage: 'Logging in...'}
			
		case 'LOGGED_IN': 
			return {...state, isLoading: false, loadingMessage: null}

		case 'GETTING_DAILY_FOODS':
			return {...state, isLoading: true}

		case 'GOT_DAILY_FOODS': 
			return {...state, isLoading: false}
		
		
		case 'GETTING_CUSTOM_FOODS':
			return {...state, loadingCustomFood: true}

		case 'GOT_CUSTOM_FOODS': 
			return {...state, loadingCustomFood: false}


		default:
		return state;
	}
};

export default otherReducer;