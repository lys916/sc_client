import React from 'react';
import { connect } from 'react-redux';
import { signUp} from '../actions/userAction';
import { Link } from 'react-router-dom';
import Loader from '../loader/Loader';


import './styleLoginSignup.css';

class SignUp extends React.Component {
  state = {
    name: '',
    password: ''
  }
  handleSignUp = () => {
      this.props.signUp(this.state, this.props.history); 
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  render() {
    return (
      <div className="ls">
        {this.props.others.isLoading ? 
              <Loader message={this.props.others.loadingMessage}/> 
              : null 
            }
        <div className="title">Sign-up</div>
        <input type="text" name="name" value={this.state.name} 
        placeholder="Username" onChange={this.handleOnChange}/><br />

        <input type="password" name="password" value={this.state.password} 
        placeholder="Password" onChange={this.handleOnChange}/><br />

        <button onClick={() => {this.handleSignUp()}}>Sign up</button><br />
        <div className="have-account">Already have an account? <Link to="/">Log in</Link></div>
        
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    others: state.others
  } 
}

export default connect(mapStateToProps, {signUp})(SignUp);