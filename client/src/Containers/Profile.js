import React, { Component } from 'react';
import { userInfo } from '../redux/actions';
import { connect } from 'react-redux';
import axios from 'axios';

class Profile extends Component {
  state = {
    firstName: this.props.user.profile.firstName,
    secondName: this.props.user.profile.secondName,
    email: this.props.user.email,
    statusProfile: '',
    oldPassword: '',
    newPassword: '',
    statusPassword: ''
  }
  saveProfile() {
    const { firstName, secondName, email } = this.state;
    axios.post('/api/changeProfile', { email, firstName, secondName }).then(resp => {
      const state = (resp.data && resp.data.status && resp.data.status === 'success') ?
        { statusProfile: 'success', firstName, secondName } :
        { statusProfile: 'failed' };
      let u = this.props.user;
      u.profile.firstName = firstName;
      u.profile.secondName = secondName;
      this.props.userInfo(u)
      this.setState(state);
      
    }).catch(error => this.setState({statusProfile: 'failed'}));
  }
  changePassword() {
    const { email, oldPassword } = this.state;
    const newPassword = this.state.newPassword;
    if(oldPassword !== newPassword && oldPassword.length >= 6) {
      axios.post('/api/changePassword', { email, oldPassword, newPassword }).then(resp => {
        const state = (resp.data && resp.data.status && resp.data.status === 'success') ?
          { statusPassword: 'success' } :
          { statusPassword: 'failed' };
        this.setState(state);
      }).catch(error => this.setState({statusPassword: 'failed'}));
    } else {
      this.setState({statusPassword: 'Min password length 6'})
    }
  }

  render() {
    const { statusProfile, statusPassword } = this.state;
    const profileMess = statusProfile.length > 0 ?
      (<div className={'info'}>{statusProfile}</div>) :
      '';

    const passwordMess = statusPassword.length > 0 ?
      (<div className={'info'}>{statusPassword}</div>) :
      '';
      
    return (
      <div className="content-profile">
        <div className="profile-header">Profile</div>
        <div>First name</div>
        <input
          value={this.state.firstName}
          onChange={e => this.setState({ firstName: e.target.value })}
          type='text'
          maxLength='25'></input>
          
        <div>Second name</div>
        <input
          value={this.state.secondName}
          onChange={e => this.setState({ secondName: e.target.value })}
          type='text'
          maxLength='25'></input>
        
        <button onClick={() => this.saveProfile()} className='sign-button save-button'>Save</button>
        {profileMess}
        

        <div className='label-old-password'>Old password</div>
        <input
          value={this.state.oldPassword}
          onChange={e => this.setState({ oldPassword: e.target.value })}
          type='password'
          maxLength='25'></input>
          
        <div>New password</div>
        <input
          value={this.state.newPassword}
          onChange={e => this.setState({ newPassword: e.target.value })}
          type='password'
          maxLength='25'></input>
        
        <button onClick={() => this.changePassword()} className='sign-button change-button'>Change</button>
        {passwordMess}
      </div>
    );
  }
}

const mapState = state => { 
  return { user : state.userInfo } 
}
const mapDispatch = dispatch => {
  return {
    userInfo: (info) => dispatch(userInfo(info)),
  }
}

export default connect(
  mapState, 
  mapDispatch
)(Profile);

