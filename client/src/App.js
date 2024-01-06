import React from 'react';
import User from './User';
import Conversation from './Conversation';

import nexmoClient from 'nexmo-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      chats: [
        {
          id: 'CON-123e456c-5ff0-789c-8a11-e4a56a7b8c90',
          name: 'nice chat'
        },
        {
          id: 'CON-2c34ecec-f567-8e90-bf1d-23e4567e890a',
          name: 'serious business'
        }
      ]
    };
    
    this.login = this.login.bind(this);
    this.getJWT = this.getJWT.bind(this);
    this.userUpdated = this.userUpdated.bind(this);
  }
    
  login() {
    /*let nexmo = new nexmoClient();
    nexmo.createSession(this.state.token).then(app => {
      this.setState({
        app: app
      });
    });*/
  }
  

  getJWT(username) {
    fetch('/getJWT', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: username})
    })
    .then(results => results.json())
    .then(data => {
      this.setState({
        token: data.jwt
      });
      this.login();
    });
  }
  
  userUpdated(user) {
    if (user.username) {
      this.getJWT(user.username);
    }
  }

  render() {
    return (
      <div className="nexmo">
        <User onUpdate={this.userUpdated} />
        <Conversation app={this.state.app} loggedIn={!!this.state.token} />
      </div>
    );
  }
  
    
};

export default App;