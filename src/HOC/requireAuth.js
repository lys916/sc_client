import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ComposedComponent => {
  class RequireAuth extends Component {
    componentDidMount() {
      // check if user is not logged then push user to signup page
      if (!this.props.user._id) {
        this.props.history.push('/login');
      }
    }

    render() {
      // if user is logged in, return ComposedComponent ( whichever component that was passed in when calling RequireAuth in App.js )
      return !this.props.user._id ? null : <ComposedComponent {...this.props}/>
    }
  }

  const mapStateToProps = state => {
    return {
      user: state.user
    };
  };

  return connect(mapStateToProps)(RequireAuth);
};
