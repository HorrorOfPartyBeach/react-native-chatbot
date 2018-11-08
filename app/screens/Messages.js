import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView
  // Platform,
  // StatusBar
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { DirectLine } from 'botframework-directlinejs';
//import daisy from '../assets/clipart1571496257.png';

const directLine = new DirectLine({
  secret: 'AvY37YSRftY.cwA.Sms.JGgTwgGZb-NOT346gl1Hg0otOltyHMYr0nPqmpHXPk0'
});

// const keyboardVerticalOffset =
//   Platform.OS === 'android' ? StatusBar.currentHeight : 0;

// all params to include in reply from bot, think the carousel is in the messages somewhere here. Maybe? Dunno.

const botMessageToGiftedMessage = botMessage =>
  botMessage.attachments
    ? {
        text:
          botMessage.attachments[0].content.body[0].columns[0].items[1].text +
          '\n' +
          '🏠 ' +
          botMessage.attachments[0].content.body[0].columns[0].items[2].text +
          '\n' +
          '📱' +
          botMessage.attachments[0].content.body[0].columns[0].items[3].text.replace(
            '+44 ',
            '0'
          ) +
          '\n' +
          '⭐⭐⭐⭐⭐' +
          '\n' +
          '__________________________',
        image:
          botMessage.attachments[0].content.body[0].columns[1].items[0].url,

        _id: botMessage.id,
        createdAt: botMessage.timestamp,
        user: {
          _id: 2,
          name: 'React Native',
          avatar:
            'https://photos.gograph.com/thumbs/CSP/CSP834/daisy-flower-clip-art-vector_k8340445.jpg'
        }
      }
    : {
        ...botMessage,
        _id: botMessage.id,
        createdAt: botMessage.timestamp,
        user: {
          _id: 2,
          name: 'React Native',
          avatar:
            'https://photos.gograph.com/thumbs/CSP/CSP834/daisy-flower-clip-art-vector_k8340445.jpg'
        }
      };

// sends user info to bot
function giftedMessageToBotMessage(message) {
  return {
    from: { id: 1, name: 'User' },
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
    // the full bot reply, seems to include all messages sent
    directLine.activity$.subscribe(botMessage => {
      // - shows carousel and replies etc. Basically this is all messages in state
      if (botMessage.text === this.state.sentMessage) {
        return;
      }
      console.log(
        botMessage.attachments !== undefined
          ? botMessage.attachments[0].content.body[0].columns[1].items[0].url
          : 'nothing'
      );
      const newMessage = botMessageToGiftedMessage(botMessage);
      this.setState({ messages: [newMessage, ...this.state.messages] });
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
