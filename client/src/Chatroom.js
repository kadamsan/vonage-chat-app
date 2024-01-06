import React from 'react';
import styles from './Chatroom.css';

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    
    this.joinConversation = this.joinConversation.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.setInput = this.setInput.bind(this);
    this.sendInput = this.sendInput.bind(this);
  }
  
  joinConversation(evt) {
    let select = evt.target;
    this.props.app.getConversation(select.value).then(conv => {
      conv.on('text', this.onMessage);
      conv.join();
      this.setState({
        conversation: conv
      });
    });
  }
  
  onMessage(sender, message) {
    let newMessages = this.state.messages.concat({
      key: message.id,
      sender: sender.display_name,
      text: message.body.text
    });
    this.setState({
      messages: newMessages
    });
  }

  
  setInput(evt) {
    this.setState({
      input: evt.target.value
    });
  }
  
  sendInput(evt) {
    this.state.conversation.sendText(this.state.input).then(() => {
      this.setState({
        input: null
      });
    });
    evt.target.previousSibling.value = '';
  }

  
  render() {
    if (this.state.conversation) {
        let messagePane = [];
        
        if (this.state.messages.length) {
            this.state.messages.forEach(msg => {
            messagePane.push(<p key={msg.key} className="message"><b>{msg.sender}:</b>{msg.text}</p>);
            });
        }
        
        return (
            <div className="conversation">
            <div className="messages">
                {messagePane}
            </div>
            <div className="input">
                <textarea onBlur={evt => this.setInput(evt)} />
                <button onClick={evt => this.sendInput(evt)}>Chat</button>
            </div>
            </div>
        );
    } else {
        let opts = [<option key="0">-</option>];
        this.props.chats.forEach(chat => {
            opts.push(<option key={chat.id} value={chat.id}>{chat.name}</option>);
        });
        
        return (
            <div className="conversation">
            <label>Choose a chat to join: 
                <select onChange={evt => this.joinConversation(evt)}>
                {opts}
                </select>
            </label>
            </div>
        );
    }
  }

};

export default Chatroom;
