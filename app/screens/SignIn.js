import React from 'react';
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { onSignIn } from '../auth';

export default ({ navigation }) => (
  <KeyboardAvoidingView
    style={styles.container}
    behavior={'padding'}
    style={{ flex: 1 }}
    keyboardVerticalOffset={50}
    enabled
  >
    <View style={{ paddingVertical: 20 }}>
      <Card>
        <FormLabel>Email</FormLabel>
        <FormInput placeholder="Email address..." />
        <FormLabel>Password</FormLabel>
        <FormInput secureTextEntry placeholder="Password..." />

        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="SIGN IN"
          onPress={() => {
            onSignIn().then(() => navigation.navigate('Messages'));
          }}
        />
      </Card>
    </View>
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
