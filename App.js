import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { authorize } from 'react-native-app-auth'



export default class App extends Component {
	
  state = {
	result: null  
  }
  
  constructor(props) {
	super(props);
	this._authorize = this._authorize.bind(this);
  }
  
  
  async _authorize (provider = 'google') {
    try {
		
		let config;
		
		switch(provider) {
			case 'google':
				config = {
				  issuer: 'https://accounts.google.com',
				  clientId: '254083460174-kfnpu05u8t44822dekgbjdehr1jdg0ph.apps.googleusercontent.com',
				  redirectUrl: 'com.myauthapp:/oauth', //'com.myauthapp:/oauth',
				  scopes: ['openid', 'profile', 'email']
				};
			break;
			
			case 'facebook':
				config = {
				  serviceConfiguration: {
					  authorizationEndpoint: 'https://www.facebook.com/dialog/oauth',
					  tokenEndpoint: ``
					},
					clientId: '392709821576081',
					redirectUrl: 'com.myauthapp:/oauth',
					scopes: ['email']
				};
			break;
		}
		
		
		
      // Make request to Google to get token
      const authState = await authorize(config);
	  
	  console.log('access token', authState.accessToken);
	  
	  fetch(`http://zolaku-api.nevsky.tech/v1/web/oauth/cb/${provider}?access_token=${authState.accessToken}`)
		.then(res => res.json())
		.then((response) => {
			console.log('response', response);
			revoke(config, {
			  tokenToRevoke: authState.accessToken
			});
			this.setState({result: response});
		});

      console.log({ authState })
    } catch (error) {
      console.log('error', error)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Button style={styles.login} onPress={(e) => this._authorize('google')} title='Login Google' />
        <Button style={styles.login} onPress={(e) => this._authorize('facebook')} title='Login Facebook' />
		<Text>{JSON.stringify(this.state.result, null, 2)}</Text>
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
