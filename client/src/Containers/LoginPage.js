import React, { Component } from 'react';
import axios from 'axios';

export default class LoginPage extends Component {
  state = {
    loginEmail: '',
    password: '',
    registrationEmail: '',
    email: '',
    error: '',
    errorLogin: '',
    message: '',
    regBtn: '',
    auth: 'loading'
  }
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  signIn() {
    const { loginEmail, password } = this.state;
    const props = this.props;
    if (this.isValidEmail(loginEmail)) {
      axios.post('/api/signIn', { loginEmail, password }).then(resp => {
        if(resp.data && resp.data.status && resp.data.status === 'success') {
          localStorage.setItem('email', loginEmail);
          localStorage.setItem('password', password);
          props.push("/");
        } else {
          this.setState({ errorLogin: 'incorrect email || password' });
        }
      }).catch(error => this.setState({ errorLogin: 'try later...' + error }));
    } else {
      this.setState({ errorLogin: 'invalid email' })
    }
  }
  registration() {
    const email = this.state.registrationEmail;
    if (this.isValidEmail(email)) {
      this.setState({ regBtn: 'loading' });
      axios.post('/api/registration', { email }).then(resp => {
        const respObject = (resp.data && resp.data.message && resp.data.message === 'check mail') ?
          ({ message: 'check your mail', error: '', regBtn: '' }) :
          ({ error: 'this mail exist', message: '', regBtn: '' });
          this.setState(respObject);
      }).catch(error => this.setState({ error: 'try later...', message: '', regBtn: '' }));
    } else {
      this.setState({ error: 'invalid email' })
    }
  }
  render() {
    const { error, message, regBtn, errorLogin, auth } = this.state;
    const errorLoginBlock = errorLogin.length > 0 ?
      (<div className={'error'}>{errorLogin}</div>) :
      '';
    const errorBlock = error.length > 0 ?
      (<div className={'error'}>{error}</div>) :
      '';
    const messageBlock = message.length > 0 ?
      (<div className={'success'}>{message}</div>) :
      '';
    const registrationButton = regBtn === 'loading' ? 
      (<button className='reg-button dis-btn' disabled>Loading...</button>) :
      (<button className='reg-button' onClick={() => this.registration()}>Registration</button>);

    // if(auth === 'loading') return (<div className="App">LOADING...</div>)
    // else 
    return (
      <div className="App">
        {/* Login */}
        <div className='login-form'>
          <div>Email address</div>
          <input
            value={this.state.loginEmail}
            onChange={e => this.setState({ loginEmail: e.target.value })}
            type='text'
            maxLength='25'></input>
          <div>Password</div>
          <input
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type='password'
            maxLength='25'></input>
          <button
            className='sign-button'
            onClick={() => this.signIn()}>Sign in</button>
          {errorLoginBlock}
        </div>

        {/* Registration */}
        <div className='login-form'>
          <div>Email address</div>
          <input
            value={this.state.registrationEmail}
            onChange={e => this.setState({ registrationEmail: e.target.value })}
            type='text'
            maxLength='25'></input>
          {registrationButton}
          {messageBlock}
          {errorBlock}
        </div>
      </div>
    );
  }
}