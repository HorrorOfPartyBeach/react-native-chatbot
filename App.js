import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { DirectLine } from 'botframework-directlinejs';

const directLine = new DirectLine({
  secret: 'AvY37YSRftY.cwA.Sms.JGgTwgGZb-NOT346gl1Hg0otOltyHMYr0nPqmpHXPk0'
});

const botMessageToGiftedMessage = botMessage => ({
  ...botMessage,
  _id: botMessage.id,
  createdAt: botMessage.timestamp,
  user: {
    _id: 2,
    name: 'React Native',
    avatar: 'https://placeimg.com/140/140/any'
  }
});

function giftedMessageToBotMessage(message) {
  return {
    from: { id: 1, name: 'Emma' },
    name: 'Emma',
    avatar: 'https://placeimg.com/140/140/any',
    type: 'message',
    text: message.text
  };
}

export default class App extends React.Component {
  state = {
    messages: []
  };

  constructor(props) {
    super(props);
    directLine.activity$.subscribe(botMessage => {
      const newMessage = botMessageToGiftedMessage(botMessage);
      this.setState({ messages: [newMessage, ...this.state.messages] });
    });
  }

  onSend = messages => {
    this.setState({ messages: [...messages, ...this.state.messages] });
    messages.forEach(message => {
      directLine
        .postActivity(giftedMessageToBotMessage(message))
        .subscribe(() => console.log('success'), () => console.log('this totally failed'));
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

// export default class App extends React.Component {
//   state = {
//     messages: []
//   };

//   componentWillMount() {
//     this.setState({
//       messages: [
//         {
//           _id: 1,
//           text: 'Hello developer',
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: 'React Native',
//             avatar: 'https://placeimg.com/140/140/any'
//           }
//         }
//       ]
//     });
//   }

// onSend(messages = []) {
//   this.setState(previousState => ({
//     messages: GiftedChat.append(previousState.messages, messages)
//   }));
// }

//   render() {
//     return (
//       <View style={styles.container}>
//         <GiftedChat
//           messages={this.state.messages}
//           onSend={messages => this.onSend(messages)}
//           user={{ _id: 1 }}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   }
// });
