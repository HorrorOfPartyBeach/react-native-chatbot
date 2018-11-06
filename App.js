// import React from 'react';
// import { StyleSheet } from 'react-native';
// , View, KeyboardAvoidingView
// import Messages from './components/Messages';
// import Login from './components/Login';
import App from './app/index';
export default App;

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isUserLoggedIn: false
//     };
//   }

//   render() {
//     if (!this.state.isUserLoggedIn) {
//       return (
//         <KeyboardAvoidingView
//           style={styles.container}
//           behavior="padding"
//           enabled
//         >
//           <View style={styles.container}>
//             {/* <Text>Why is this not working??</Text> */}
//             <Login
//               login={this.onLogin}
//               isUserLoggedIn={this.state.isUserLoggedIn}
//             />
//           </View>
//         </KeyboardAvoidingView>
//       );
//     } else if (this.state.isUserLoggedIn) {
//       return (
//         <KeyboardAvoidingView
//           style={styles.container}
//           behavior="padding"
//           enabled
//         >
//           <View style={styles.container}>
//             {/* <Text>hello, how are you</Text> */}
//             <Messages />
//           </View>
//         </KeyboardAvoidingView>
//       );
//     }
//   }
// }

// // Styling for messages
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   }
// });
