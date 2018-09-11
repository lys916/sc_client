import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions/userAction';
import { Link } from 'react-router-dom';
import Loader from '../loader/Loader';



class Login extends React.Component {
  state = {
    name: '',
    password: ''
  }

  handleSignIn = () => {
      this.props.signIn(this.state, this.props.history);
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
        <div className="title">Log-in</div>
        <input name="name" value={this.state.email} 
        placeholder="Username" onChange={this.handleOnChange}/><br />

        <input name="password" type="password" value={this.state.value} 
        placeholder="Password" onChange={this.handleOnChange}/><br />

        <button className="signin" onClick={() => {this.handleSignIn()}}>Submit</button><br />
        <div className="have-account">Don't have an account?</div>
        <Link to="/signup"><button>Sign up</button></Link><br />
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

export default connect(mapStateToProps, {signIn})(Login);