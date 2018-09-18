import axios from 'axios';
// const serverROOT = 'https://sc-back.herokuapp.com';
const serverROOT = 'http://localhost:5000';


// export const NEW_POST = 'NEW_POST';
// export const FETCHED_POSTS = 'FETCHED_POSTS';

// export const deleteFood = (id) => {
//     return ({
//         type: 'DELETE_INTAKE',
//         payload: id
//     });
// }
// export const toggleActive = (id) => {
//     console.log("toggling");
//     return ({
//         type: 'TOGGLE_ACTIVE',
//         payload: id
//     });
// }
export const toggleEditing = (id) => {
    return ({
        type: 'TOGGLE_EDITING',
        payload: id
    });
}

export const toggleSaving = (id) => {
    return ({
        type: 'TOGGLE_SAVING',
        payload: id
    });
}

export const toggleActive = (id) => {
	return ({
		 type: 'TOGGLE_ACTIVE',
		 payload: id
	});
}

export const amountOnChange = (data) => {
	return ({
		 type: 'AMOUNT_ON_CHANGE',
		 payload: data
	});
}



export const resetToggle = () => {
	return ({
		 type: 'RESET_TOGGLE',
	});
}

export const addToDaily = (foods) => {
	console.log('action adding daily food', foods);
	 return (dispatch) => {
		dispatch({
			type: 'ADDING_TO_DAILY'
		});
		axios.post(`${serverROOT}/dailyFood/createFood`, foods).then(res => {
			dispatch({
				type: 'ADDED_TO_DAILY',
				payload: res.data
			});
		});
	}
}

export const createCustomFood = (food) => {
	console.log('action create custom food', food);
	return (dispatch) => {
	  dispatch({
		  type: 'CREATING_CUSTOM_FOOD'
	  });
	  axios.post(`${serverROOT}/customFood/createFood`, food).then(res => {
		  dispatch({
			  type: 'CREATED_CUSTOM_FOOD',
			  payload: res.data
		  });
	  });
  }
}

export const searchCustomFoods = (term) => {
	return ({
		 type: 'SEARCH_CUSTOM_FOODS',
		 payload: term
	});
}

export const getDailyFoods = (date, userName) => {
	console.log('action get daily food, date', date);
	console.log('action get daily food, name', userName);
  	return (dispatch) => {
		  dispatch({type: 'GETTING_DAILY_FOODS'});
		axios.get(`${serverROOT}/dailyFood/getFoods`, {params: {date, userName}}).then(res => {
			console.log('got daily food', res.data);
			dispatch({
				type: 'GOT_DAILY_FOODS',
				payload: res.data
			});
		});
	}
}

export const getCustomFoods = (userId) => {
	return (dispatch) => {
	 axios.get(`${serverROOT}/customFood/getFoods`, {params: {userId}}).then(res => {
		 dispatch({
			 type: 'GOT_CUSTOM_FOODS',
			 payload: res.data
		 });
	 });
 }
}

export const getSystemFoods = () => {
	return (dispatch) => {
	 axios.get(`${serverROOT}/systemFood/getFoods`).then(res => {
		 dispatch({
			 type: 'GOT_SYSTEM_FOODS',
			 payload: res.data
		 });
	 });
 }
}

export const deleteFood = (id) => {
	return (dispatch) => {
	 axios.delete(`${serverROOT}/dailyFood/deleteFood`, {params: {id}}).then(res => {
		 dispatch({
			 type: 'DELETED_DAILY_FOOD',
			 payload: res.data
		 });
	 });
 }
}

export const deleteCustomFood = (id) => {
	return (dispatch) => {
	 axios.delete(`${serverROOT}/customFood/deleteFood`, {params: {id}}).then(res => {
		 dispatch({
			 type: 'DELETED_CUSTOM_FOOD',
			 payload: res.data
		 });
	 });
 }
}

// export const getCustomFood = (user) => {
// 	console.log('getting custom foods');
// 	return (dispatch) => {
// 	 axios.get(`http://localhost:5000/customFoods`, user).then(res => {
// 		 dispatch({
// 			 type: 'GOT_CUSTOM_FOODS',
// 			 payload: res.data
// 		 });
// 	 });
//  }
// }

// export const getSystemFood = () => {
// 	return (dispatch) => {
// 	 axios.get(`http://localhost:5000/systemFoods}`).then(res => {
// 		 dispatch({
// 			 type: 'GOT_SYSTEM_FOODS',
// 			 payload: res.data
// 		 });
// 	 });
//  }
// }

// export const signIn = (user) => {
//   if(user.email !== '' || user.password !== ''){
//     return (dispatch) => {
//       axios.post('http://localhost:5000/api/user/login', user)
//       .then(res => {
//         if(res.status === 200){
//           localStorage.setItem('user', res.data.name);
//           dispatch({
//             type: LOGGED_IN,
//             payload: res.data.name
//           });          
//         }
//       });
//     }
//   }
// }
