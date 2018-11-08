import React from 'react';
import { daisy } from '../assets/daisy.png';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { DirectLine } from 'botframework-directlinejs';

const directLine = new DirectLine({
  secret: 'AvY37YSRftY.cwA.Sms.JGgTwgGZb-NOT346gl1Hg0otOltyHMYr0nPqmpHXPk0'
});

// all params to include in reply from bot, the adaptive cards are also in the messages
const botMessageToGiftedMessage = botMessage => ({
  ...botMessage,
  _id: botMessage.id,
  createdAt: botMessage.timestamp,
  user: {
    _id: 2,
    name: 'Daisy Bot',
    avatar: daisy
  }
  // image: 'https://placeimg.com/140/140/any'
});

// sends user info to bot
function giftedMessageToBotMessage(message) {
  return {
    from: { id: 1, name: 'Emma' },
    type: 'message',
    text: message.text
  };
}

export default class Messages extends React.Component {
  state = {
    messages: [],
    sentMessage: null
  };

  constructor(props) {
    super(props);
    // full bot reply, includes all messages sent
    directLine.activity$.subscribe(botMessage => {
      console.log(botMessage); // - shows carousel and replies i.e. all messages in state
      if (botMessage.text === this.state.sentMessage) {
        return;
      }
      // console.log(botMessage.attachments, 'hello from NC!');
      const newMessage = botMessageToGiftedMessage(botMessage);
      this.setState({
        messages: [newMessage, ...this.state.messages]
      });
    });
  }

  // Sends messages from the user to the Bot and console.logs if sending was successful or not
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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={'padding'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={50}
        enabled
      >
        <View style={styles.container}>
          <GiftedChat
            user={{ _id: 1 }}
            messages={this.state.messages}
            onSend={this.onSend}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

// Styling for messages
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

// Reduce function to get cards?
// if (botMessage.attachments === true) {
//   const cardMessage = botMessage.attachments.reduce((message, acc) => {
//     return message += acc;
//   }, {
//     _id: botMessage.id,
//       text: '',
//       createdAt: botMessage.timestamp,
//       user: {
//         _id: 2,
//         name: 'React Native',
//         avatar: 'https://placeimg.com/140/140/any'
//       },
//       image:
//         botMessage.attachments[0].content.body[0].columns[1].items[0].url});
// }


