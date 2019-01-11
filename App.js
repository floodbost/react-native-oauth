import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { authorize } from 'react-native-app-auth'

const config = {
  issuer: 'https://accounts.google.com',
  clientId: 'CLIENT_ID',
  redirectUrl: 'REDIRECT_URL',
  scopes: ['openid', 'profile']
}

export default class App extends Component {
  async _authorize () {
    try {
      // Make request to Google to get token
      const authState = await authorize(config)

      console.log({ authState })
    } catch (error) {
      console.log('error', error)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Button style={styles.login} onPress={this._authorize} title='Login' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  login: {
    color: '#841584'
  }
})
