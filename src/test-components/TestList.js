import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './styleTest.css';
const list = [
    {id: 1, todo: 'Take trash'},
    {id: 2, todo: 'Buy Milk'}
]
class TestList extends Component {

// state = {
//     todos: list
//   };

//   delete = (id)=>{
//       const deleted = this.state.todos.filter(todo=>{
//         return id !== todo.id;
//       });
//       this.setState({todos: deleted});
//     }

//   render() {
//     return (
//           <TransitionGroup>
//             {this.state.todos.map(({ id, todo }) => (
//               <CSSTransition
//                 key={id}
//                 timeout={1000}
//                 classNames="fade"
//               >
//                 <div onClick={() => {this.delete(id)}}>
//                   {todo}
//                 </div>
//               </CSSTransition>
//             ))}
//           </TransitionGroup>
//     );
//   }


    state = {
      todos: list
    }
    delete = (id)=>{
      const deleted = this.state.todos.filter(todo=>{
        return id !== todo.id;
      });
      this.setState({todos: deleted});
    }
  render() {
    return (
        <TransitionGroup>
        {
          this.state.todos.map(todo=>{
            return (

                <CSSTransition key={todo.id} timeout={1000} classNames="fade">
                  <div onClick={()=>{this.delete(todo.id)}}>{todo.todo}</div>
                </CSSTransition>

            );
          })
        }
        </TransitionGroup>
    );
  }
}

export default TestList;
