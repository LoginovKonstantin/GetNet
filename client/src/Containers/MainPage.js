import React, { Component } from 'react';
import axios from 'axios';

class MainPage extends Component {

  state = {
    page: 'default'
  }
  
  logout() {
    localStorage.clear();
    window.location.href = '/';
  }

  render() {
    const { page } = this.state;
    const content = page === 'orders' ?
      (<div>Orders</div>) :
      page === 'balance' ?
      (<div>Balance</div>) :  
      (<div>Profile</div>);
    return (
      <div className="MainPage">
        <div className='header'>
          <div onClick={() => this.setState({ page: 'profile' })}>Profile</div>
          <div onClick={() => this.setState({ page: 'orders' })}>Orders</div>
          <div onClick={() => this.setState({ page: 'balance' })}>Balance</div>
          <div onClick={() => this.logout()}>Exit</div>
        </div>
        <div>{content}</div>
      </div>
    );
  }
}

export default MainPage;
