import axios from 'axios';
// export const NEW_POST = 'NEW_POST';
// export const FETCHED_POSTS = 'FETCHED_POSTS';

export const deleteFood = (id) => {
    return ({
        type: 'DELETE_INTAKE',
        payload: id
    });
}
// export const toggleActive = (id) => {
//     console.log("toggling");
//     return ({
//         type: 'TOGGLE_ACTIVE',
//         payload: id
//     });
// }
export const toggleEditing = (id) => {
    console.log("toggl editing");
    return ({
        type: 'TOGGLE_EDITING',
        payload: id
    });
}
export const addToDaily = (food) => {
    console.log("adding to daily", food);
    return ({
        type: 'ADD_TO_DAILY',
        payload: food
    });
}
// export const resetActive = () => {
//     return ({
//         type: 'RESET_ACTIVE'
//     });
// }

// export const fetchPosts = (term) => {
//   return (dispatch) => {
//     if(term.id){
//       axios.get(`http://localhost:5000/api/post/${term.id}`).then(res => {
//         dispatch({
//           type: FETCHED_POSTS,
//           payload: res.data
//         });
//       });
//     }
//     if(term.food){
//       axios.get(`http://localhost:5000/api/post?search=${term.food}`).then(res => {
//         dispatch({
//           type: FETCHED_POSTS,
//           payload: res.data
//         });
//       });
//     }
    

    // if(search){
    //   axios.get(`http://localhost:5000/api/post?search=${search}`).then(res => {
    //     dispatch({
    //       type: FETCHED_POSTS,
    //       payload: res.data
    //     });
    //   });
    // }else{
      
    // }
//   }
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
