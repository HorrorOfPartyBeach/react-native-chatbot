import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { DirectLine } from 'botframework-directlinejs';

const directLine = new DirectLine({
  secret: 'AvY37YSRftY.cwA.Sms.JGgTwgGZb-NOT346gl1Hg0otOltyHMYr0nPqmpHXPk0'
});

// reply from bot
const botMessageToGiftedMessage = botMessage => ({
  // if(botMessage.text === this.state.sentMessage) {
  //   return;
  //   }
  ...botMessage,
  _id: botMessage.id,
  createdAt: botMessage.timestamp,
  user: {
    _id: 2,
    name: 'React Native',
    avatar: 'https://placeimg.com/140/140/any'
  } //.then(console.log(botMessage))
});

// sends user info to bot??
function giftedMessageToBotMessage(message) {
  return {
    from: { id: 1, name: 'User' },
    type: 'message',
    text: message.text
  };
}

export default class App extends React.Component {
  state = {
    messages: [],
    sentMessage: null
  };

  constructor(props) {
    super(props);
    directLine.activity$.subscribe(botMessage => {
      // console.log(botMessage); - shows carousel etc, also the echoed input
      if (botMessage.text === this.state.sentMessage) {
        return;
      }
      const newMessage = botMessageToGiftedMessage(botMessage);
      this.setState({ messages: [newMessage, ...this.state.messages] });
    });
  }

  onSend = messages => {
    this.setState({ messages: [...messages, ...this.state.messages] });
    messages.forEach(message => {
      this.setState({ sentMessage: message.text });
      directLine
        .postActivity(giftedMessageToBotMessage(message))
        .subscribe(
          () => console.log('success'),
          () => console.log('this totally failed')
        );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          user={{
            _id: 1
          }}
          messages={this.state.messages}
          onSend={this.onSend}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
