import axios from 'axios';
const serverROOT = 'https://sc-back.herokuapp.com';
// const serverROOT = 'http://localhost:5000';

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

export const addSystemFood = (food) => {
	return (dispatch) => {
	 axios.post(`${serverROOT}/systemFood/addFood`, food).then(res => {
		 dispatch({
			 type: 'ADDED_SYSTEM_FOOD',
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

export const updateCustomFood = (food) => {
	console.log('UPDATE THIS, ', food);
	return (dispatch) => {
	 axios.post(`${serverROOT}/customFood/updateFood`, food).then(res => {
		 dispatch({
			 type: 'UPDATED_CUSTOM_FOOD',
			 payload: res.data
		 });
	 });
 }
}
