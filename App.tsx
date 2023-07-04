import 'react-native-url-polyfill/auto'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Button, TextInput } from 'react-native'
import * as Linking from 'expo-linking'
import {
  isRedirectFromJoyID,
  getRedirectResult,
  initConfig,
  generateAuthURL,
  generateSignMessageURL,
  // import this if you want to sign EVM transaction
  // generateSignEvmTransactionURL,
  DappRequestType,
  type AuthResponseData
} from '@joyid/react-native'
import { useEffect, useState } from 'react'

initConfig({
  name: 'React Native Example',
  logo: 'https://fav.farm/%F0%9F%86%94'
})

// this is the URL that JoyID will redirect to,
// in real world, you should define deep link URL for your app
// ref: https://reactnative.dev/docs/linking
const redirectURL = Linking.createURL('/')

const Auth = () => {
  return (
    <Button
      title='Auth'
      onPress={() => {
        const joyidUrl = generateAuthURL(redirectURL)
        Linking.openURL(joyidUrl)
      }}
    />
  )
}

const Sign: React.FC<{ address: string }> = ({ address }) => {
  const [text, onChangeText] = React.useState('Hello World!');
  return (
    <>
      <TextInput
        value={text}
        onChangeText={onChangeText}
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
      />
      <Button
        title='Sign'
        onPress={() => {
          const joyidUrl = generateSignMessageURL(redirectURL, text, address)
          Linking.openURL(joyidUrl)
          alert('See console for result')
        }}
      />
    </>
  )
}

export default function App() {
  const redirectFrom = Linking.useURL()
  const [authData, setAuthData] = useState < AuthResponseData | null>(null)
  useEffect(() => {
    if (redirectFrom && isRedirectFromJoyID(redirectFrom)) {
      const res = getRedirectResult(redirectFrom, DappRequestType.Auth)
      if (res && res.error == null) {
        if (res.type === DappRequestType.Auth) {
          setAuthData(res.data)
        } else {
          console.log('Sign result:', res.data)
        }
      } else {
        console.log('Error', res?.error)
      }
    }
  }, [redirectFrom])
  return (
    <View style={styles.container}>
      {authData ? <Sign address={authData.address} /> : <Auth />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
