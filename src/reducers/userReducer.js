
import { SIGN_UP, LOGGED_IN, LOGGED_OUT, SEARCH } from '../actions/userAction';
// initial user state
let userInit = {
	// logged_in: false,
	// userName: '',
	// userId: '',
	// goal: {}
}
// if user exists in local storage, assign username to user initial name
const user = JSON.parse(localStorage.getItem('user'));
console.log('initial user', user);
if(user){
	console.log(true);
	userInit = user;
}

const userReducer = (state = userInit, action) => {
	switch (action.type) {

		case LOGGED_IN:

		return action.payload

        case LOGGED_OUT:
		return {}

		case 'SAVED_GOAL':
		return action.payload

		default:
		return state;
	}
};

export default userReducer;