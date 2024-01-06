import React from 'react';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    this.createUser = this.createUser.bind(this);
    this.setUsername = this.setUsername.bind(this);
  };
  
  createUser() {
    fetch('/createUser', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: this.state.username})
    })
    .then(results => results.json())
    .then(data => { 
      this.setState({
        userId: data.id
      }, () => this.props.onUpdate(this.state));
    });
  }

  
  setUsername(evt) {
    this.setState({
      username: evt.target.value
    });
  }
  
  render() {
    if (this.state.userId) {
      return (
        <div className="userinfo userconnected">
          Connected as <span className="username">{this.state.username}</span>
        </div>
      );
    } else {
      return (
        <div className="userinfo">
          <input type="text" onChange={evt => this.setUsername(evt)} />
          <button onClick={this.createUser}>Create user</button>
        </div>
      );
    }
  }
  
    
};

export default User;
