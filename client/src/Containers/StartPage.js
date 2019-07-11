import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userInfo } from '../redux/actions';
import axios from 'axios';
import MainPage from './MainPage';
import LoginPage from './LoginPage';

class StartPage extends Component {

  state = {
    auth: 'loading'
  }

  componentWillMount() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');  
    if(!email || !password) {
      this.setState({auth: 'failed'});
    }
    axios.post('/api/signIn', { loginEmail: email, password }).then(resp => {
      const state = (resp.data && resp.data.status && resp.data.status === 'success') ?
        { auth: 'success' } :
        { auth: 'failed' };
      this.props.userInfo(resp.data.user);
      this.setState(state);
    }).catch(error => this.setState({auth: 'failed'}));
  }

  render() {
    const { auth } = this.state;
    if(auth === 'loading') {
      return (<div className="App">LOADING...</div>)
    } else if(auth === 'success') {
      return (<MainPage />)
    } else {
      return (<LoginPage push={(v) => this.props.history.go(v)} />)
    }
  }
}

const mapStateToProps = state => { return {userInfo : state.userInfo} }
const mapDispatchToProps = dispatch => {
  return {
    userInfo: (info) => dispatch(userInfo(info)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
