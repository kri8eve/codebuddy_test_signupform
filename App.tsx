/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';


import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Navigation from './navigation'
import { SafeAreaView } from 'react-native';
import {SignUpProvider} from './providers/SignUpProvider';
function App(): JSX.Element {
 
  return (
    <SafeAreaView style={{flex:1,backgroundColor: '#fff'}}>
        <Navigation/>
    </SafeAreaView>
    
    
  );
}



export default App;
