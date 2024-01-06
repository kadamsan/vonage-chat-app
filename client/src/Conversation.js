import React from 'react';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    this.createConversation = this.createConversation.bind(this);
  }
  
  createConversation() {
    this.props.app.newConversation().then(conv => {
      conv.join().then(member => {
        this.setState({
          conversation: conv
        });
      });
    });
  }
  
  render() {
    if (this.state.conversation) {
      return (
        <div className="conversation">Joined conversation!</div>
      );
    } else {
      return (
        <div className="conversation">
          <button 
            onClick={this.createConversation} 
            disabled={!this.props.loggedIn}>Start conversation</button>
        </div>
      );
    }
  }
  
    
};

export default Conversation;
